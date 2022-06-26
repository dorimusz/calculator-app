const router = require('express').Router();
const fileSystem = require('fs');
const path = './memory/memory.json';

router.post('/memory', (req, res) => {
    if (!req.body) return res.sendStatus(400);
    if (!req.body?.calculation || !req.body?.result || !req.body?.timestamp) return res.sendStatus(400);

    const writeFile = () => {
        //readFile is async, keeping the server async 
        fileSystem.readFile(path, (err, data) => {
            console.log(err) //file does not exist
            if (err) return res.sendStatus(500); // error occured
            let memoryArray = JSON.parse(data);
            memoryArray.push(req.body);
            console.log(typeof (memoryArray))
            fileSystem.writeFile(path, JSON.stringify(memoryArray), (err, result) => {
                if (err) return res.sendStatus(500); // error occured;
            });
        });
    }

    //not recommended to use .access() / .exists() before readFile or any kind of modification
    const isFile = fileSystem.existsSync(path); //stops everything until returns w boolean answer

    if (isFile) {
        writeFile();
    } else {
        fileSystem.appendFile(path, '[]', function (err) {
            if (err) return res.sendStatus(500); // error occured

        });
        writeFile();
    }

    res.status(200).json("Equation added to memory");
})


router.get('/memory', (req, res) => {
    res.send('Hello World on new route!');
})

module.exports = router;