const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();



const app = express();

const userRouters = require('./routers/userRouters');
app.use('/api/users', userRouters);


const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('mogodb connected'))
    .catch(err => console.log(err));



app.get('/health', (req, res) => {
    console.log('request ');
    res.send('Jamshidbek');
});


app.listen(port, () => console.log(`server running ${port} port`));