require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./utilis/Database');
const userRouter = require('./routers/userRoute')

const app = express();

const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, PATCH, DELETE, HEAD",
    credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json()); 


app.use('/api/auth', userRouter);


const port = process.env.PORT;
connectDB()
.then(() => {
    app.listen(port, () => {
        console.log(`Successfully Running at: ${port}`);
    });
});