const express = require('express');
const CORS = require('cors');
const connection = require('./Backend/config/db');
const userRouter = require('./Backend/routes/user.router');
const blogRouter = require('./Backend/routes/blog.router');

require('dotenv').config();

const port = +process.env.port || 3000;
const app = express();
app.use(express.json());
app.use(CORS());

app.get("/", (req, res) => {
    res.send({
        msg: 'Welcome To Blog App (Full-Stack) (RN) Server Mock-6',
        Name: "RUshikesh Diliprao Bhomale",
        Student_Code: "fw25_348"
    })
})

app.use('/api', userRouter)
app.use('/api', blogRouter)

app.listen(port, async () => {
    try {
        await connection;
        console.log('Connected To DB')
    } catch (error) {
        console.log(error.message);
        console.log('Failed To Connect DB');
    }
    console.log(`Server Running At http://localhost:${port}`)
})