const router = require('express').Router();
const fileSystem = require('fs');

router.post('/addMem', (req, res) => {
    if (!req.body) return res.sendStatus(400);
    if (!req.body?.calculation || !req.body?.result || !req.body?.timestamp) return res.sendStatus(400);

    fileSystem.readFile('./memory/memory.json', function (err, data) {
        let memoryArray = JSON.parse(data);
        console.log(memoryArray, "array, line 10");
        memoryArray.push(req.body);
        console.log(memoryArray, "memory array var");
        fileSystem.writeFileSync('./memory/memory.json', JSON.stringify(memoryArray));
    });

    res.sendStatus(200).json("Added to memory");
})


router.get('/readMem', (req, res) => {
    res.send('Hello World on new route!');
})

module.exports = router;