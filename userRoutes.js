const express = require('express');
const router = new express.Router();

// fake user database.
const USERS = [{ id: 1, username: "Gan-PhaserFace" },
{ id: 2, username: "Taymingo" }]

// remember to prefix in app.js as /user.
router.get('/', (req, res) => {
    res.json({ users: USERS })
})

router.get('/:id', (req, res) => {
    // req.params.id returns a string so use the +ternary operator to turn to a num.
    const user = USERS.find(u => u.id === +req.params.id)
    res.json({ user })
})

module.exports = router;