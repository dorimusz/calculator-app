require("dotenv").config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
})

const memoryRoutes = require('./routes/memoryRoutes');
app.use('/api', memoryRoutes)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
