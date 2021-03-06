const router = require('express').Router();
const fileSystem = require('fs');
const path = './memory/memory.json';

router.post('/memory', (req, res) => {
    if (!req.body) return res.sendStatus(400);
    if (!req.body?.calculation) return res.sendStatus(400);

    //readFile&writeFile is async, keeping the server async , if using ...Sync, should use trycatch 
    const writeFile = () => {
        fileSystem.readFile(path, (err, data) => {
            console.log(err) //file does not exist
            if (err) return res.sendStatus(500); // error occured
            let memoryArray = JSON.parse(data);
            memoryArray.push(req.body);
            fileSystem.writeFile(path, JSON.stringify(memoryArray), (err, result) => {
                if (err) return res.sendStatus(500); // error occured;
            });
        });
    }

    //not recommended to use .access() / .exists() before readFile or any kind of modification
    const isFile = fileSystem.existsSync(path); //stops everything until returns w boolean answer

    if (isFile) {
        writeFile();
        res.status(200).json("Equation added to memory");
    } else {
        fileSystem.appendFile(path, '[]', function (err) {
            if (err) return res.sendStatus(500); // error occured
        });
        writeFile();
        res.status(200).json("Equation added to memory");
    }
    res.status(500).json("Couldn't add to memory.")
})

router.get('/memory', (req, res) => {
    fileSystem.readFile(path, (err, data) => {
        if (err) return res.sendStatus(500); // error occured
        memoryArray = JSON.parse(data);
        res.status(200).json(memoryArray);
    });
})

module.exports = router;