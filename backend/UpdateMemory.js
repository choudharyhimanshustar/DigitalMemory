const express = require('express');
const router = express.Router();
const Memories = require('./models/Memories');
const { uploadMedia } = require('./Services/Cloudinary')
router.put('/:id', async (req, res) => {
    try {
        const { title, category, emotions } = req.body;
        const multimedia = req.files ? req.files.multimedia : null;
        let multimediaUrl = null;
        console.log(multimedia);
        if (multimedia != null) {
            try {
                multimediaUrl = await uploadMedia(multimedia.tempFilePath);
            } catch (uploadError) {
                console.error('Error uploading media:', uploadError);
                return res.status(500).send({ message: 'Error uploading media', error: uploadError });
            }
        }
        console.log(multimediaUrl)
        const memory = await Memories.findByIdAndUpdate(req.params.id, {
            title,
            multimedia: multimediaUrl,
            category,
            emotions
        }, { new: true });

        if (!memory) {
            return res.status(404).send({ message: 'Memory not found' });
        }

        res.send({ message: 'Memory updated successfully', memory });
    } catch (error) {
        res.status(500).send({ message: 'Error updating memory', error });
    }
});
router.patch('/:id/:favStatus', async (req, res) => {
    const { id, favStatus } = req.params;
    console.log(id);
    console.log(favStatus);
    try {
        const memory = await Memories.findByIdAndUpdate(
            id,
            { favorite: favStatus },
            { new: true });
        res.json({ memory });

    } catch (error) {
        res.json(error);
    }
})
module.exports = router;