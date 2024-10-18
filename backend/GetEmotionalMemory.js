const express = require('express');
const router = express.Router();
const Memory = require('./models/Memories');
router.get('/:id/:emotions', async (req, res) => {
    const emotions = req.params.emotions;
    const id = req.params.id;
    console.log(emotions);
    try {
        let memories;
        if (emotions === "All") {
            memories = await Memory.find({ userId: id });
        } else {
            // Otherwise, find memories by userId and category
            memories = await Memory.find({ userId: id, emotions: emotions });
        }
        console.log(memories);

        res.status(200).json(memories);
    } catch (error) {
        console.log(error);
        res.json(error);
    }
})
module.exports = router;