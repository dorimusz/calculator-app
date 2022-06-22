const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Hello World on new route!')
})

module.exports = router;