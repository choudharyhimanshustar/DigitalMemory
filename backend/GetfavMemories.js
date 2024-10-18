const Memory = require('./models/Memories');
const express = require('express');
const router = express.Router();
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
        const user = await Memory.find({ userId: id,favorite:true});
        console.log(user);
        res.json(user);
    } catch (error) {
        res.json(error);
    }
});
module.exports = router;