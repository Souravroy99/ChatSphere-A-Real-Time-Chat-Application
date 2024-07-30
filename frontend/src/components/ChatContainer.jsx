import { useState, useEffect } from 'react';
import {ToastContainer, toast} from 'react-toastify';
import styled from "styled-components";
import Logout from "./Logout";
import ChatInput from "./ChatInput";


export default function ChatContainer({ currentChat, currentUser, socket }) {
  
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    try {
      const fetchAllMessages = async() => {
        const response = await fetch(`http://localhost:5000/api/message/getMsg`, {
          method: "GET",
          headers:{"Content-Type": "application/json"},
          body: JSON.stringify({from: currentUser._id, to: currentChat._id}),        
        });

        const data = await response.json();

        setMessages(data.projectMessages) ; // IS this correct?
      }

      fetchAllMessages();
    }
    catch(error) {
      toast.error("Server Error!");
    }

  }, [currentChat]);

  const handleSendMsg = async(msg) => {
    try{ 
        const response = await fetch(`http://localhost:5000/api/message/addMsg`,{
        method:"POST",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify({message: msg, from: currentUser._id, to: currentChat._id,}),
      });

      const data = await response.json();
      
      if(response.ok) {
        toast.success(data.msg) ;

        socket.current.emit("send-msg", {
          to: currentChat._id,
          from: currentUser._id,
          message: msg,
        });

        // Need to study
        const msgs = [...messages];
        msgs.push({fromSelf: true, message: msg});
        setMessages(msgs);
      }

      else {
        toast.error(data.msg) ;
      }
    }
    catch(error){
      toast.error("Server Error!");
    }
  };

  // useEffect(() => {
  //   if(socket.current){
  //     socket.current.on("msg-receive", (msg) => {

  //     })
  //   }
  // })

  return (
    <> 
      {currentChat !== undefined && (
        <Container>
          <div className="chat-header">

            <div className="user-details">
              <div className="avatar">
                <img
                  src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                  alt="avatar"
                />
              </div>
              <div className="username">
                <h3>{currentChat.username}</h3>
              </div>
            </div>

            <Logout />
          </div>
          {/* <Messages /> */}

          <div className="chat-messages">
            {
              (messages.length>0) && (
                messages.map((message, index) => {
                  return (
                    <div key={index}>
                        <div className={`message ${message.fromSelf ? "sended" : "received"}`}>
                            <p>
                              {message.message}
                            </p>
                        </div>
                    </div>
                  )
                })
              ) 
            }
          </div>

          <ChatInput handleSendMsg={handleSendMsg}/>

        </Container>
      )
      }

      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={true}
        pauseOnHover={true}
        theme="dark"
        transition: Bounce
        bodyClassName="toastBody"
      />
    </>
  );
}


const Container = styled.div`
  padding-top: 1rem;
  display: grid;
  grid-template-rows: 10% 78% 12%;
  gap: 0.1rem;
  overflow: hidden;
  background-color: white;
  @media(min-width: 720px) and (max-width: 1080%){
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 2rem;
      .user-details
      {
          display: flex;
          align-items: center;
          gap: 1rem;
          .avatar{
              img{
                  height: 3rem;
              }
          }
          .username{
              h3{
                  color: black;
                  word-break: break-all;
                  overflow: hidden;
              }
          }
      }
  }

  .chat-messages{
    padding: 1rem 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    overflow: auto;
    .message{
        display: flex;
        align-items: center;
        .content{
            max-width: 40%;
            overflow-wrap: break-word;
            padding: 1rem;
            font-size: 1.1rem;
            color: #d1d1d1;
        }
    }
    .sended{
        justify-content: flex-end;
        .content{
            background-color: #4f04ff21;
        }
    }
    .received{
        justify-content: flex-start;
        .content{
            background-color: #9900ff20;
        }
    }
  }
`;
