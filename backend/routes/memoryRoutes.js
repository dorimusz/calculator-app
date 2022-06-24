const router = require('express').Router();
const fileSystem = require('fs');

router.post('/addMem', (req, res) => {
    // console.log(req.body)
    const equation = req.body;
    console.log(req.body)
    fileSystem.writeFileSync('./memory/memory.txt', JSON.stringify(equation));

    res.send("ok")
})


router.get('/readMem', (req, res) => {
    res.send('Hello World on new route!')
})

module.exports = router;