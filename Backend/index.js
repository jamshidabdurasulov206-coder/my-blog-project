const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('mogodb connected'))
    .catch(err => console.log(err));


app.get('/', (req, res) => {
    res.json({status: "Server is working"});
});

const userRouters = require('./routers/userRouters');
app.use('/api/users', userRouters);

const postrouters = require('./routers/postrouters');
app.use('/api', postrouters);




app.listen(port, () => console.log(`server running ${port} port`));