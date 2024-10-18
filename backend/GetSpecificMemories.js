const express = require('express');
const router = express.Router();
const Memory = require('./models/Memories');
router.get('/:id/:categories', async (req, res) => {
    const category = req.params.categories;
    const id = req.params.id;
    console.log(id);
    console.log(category);
    try {
        let memories;
        if (category === "All") {
            memories = await Memory.find({ userId: id });
        } else {
            // Otherwise, find memories by userId and category
            memories = await Memory.find({ userId: id, category: category });
        }
        console.log(memories);

        res.status(200).json(memories);
    } catch (error) {
        console.log(error);
        res.json(error);
    }
})
module.exports = router;