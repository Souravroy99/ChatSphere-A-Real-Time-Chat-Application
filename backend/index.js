require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./utilis/Database');
const userRouter = require('./routers/userRoute');
const messageRouter = require('./routers/messageRoute');

const {Server} = require("socket.io");


const app = express();

const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, PATCH, DELETE, HEAD",
    credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json()); 


app.use('/api/auth', userRouter);
app.use('/api/message', messageRouter);


const port = process.env.PORT;
connectDB()
.then(() => {
    
    const httpServer = app.listen(port, () => {
        console.log(`Successfully Running at: ${port}`);
    });


    //--------------------Socket.io connection--------------------//

    const io = new Server(httpServer, {
        cors: {
            origin: "http://localhost:5173",
            credentials: true,
        },
    }) 

    global.onlineUsers = new Map();

    io.on("connection", (socket) => {
        global.chatSocket = socket;

        // Receiver 1
        socket.on("add-user", (userId) => {
            onlineUsers.set(userId, socket.id)
        });

        // Receiver 2
        socket.on("send-msg", (data) => {
            const sendUserSocket = onlineUsers.get(data.to)
            if(sendUserSocket) {
                socket.to(sendUserSocket).emit("msg-receive", data.msg);
            }
        })

    })

});