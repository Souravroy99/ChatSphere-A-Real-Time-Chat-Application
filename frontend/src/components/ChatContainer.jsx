import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import styled from "styled-components";
import Logout from "./Logout";
import ChatInput from "./ChatInput";
import Loading from "../assets/loader.gif";

export default function ChatContainer({ currentChat, currentUser, socket }) {
  const [isLoading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    try {
      const fetchAllMessages = async () => {
        const response = await fetch(`http://localhost:5000/api/message/getMsg`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ from: currentUser._id, to: currentChat._id }),
        });

        const data = await response.json();

        console.log(data);

        setMessages(data.projectMessages);
        setIsLoading(false);
      };
      
      if(currentUser) {
        fetchAllMessages();
      }

    } catch (error) {
      toast.error("Server Error!");
    }
  }, [currentChat, currentUser]);

  const handleSendMsg = async (msg) => {
    try {
      const response = await fetch(`http://localhost:5000/api/message/addMsg`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg, from: currentUser._id, to: currentChat._id }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.msg);

        socket.current.emit("send-msg", {
          to: currentChat._id,
          from: currentUser._id,
          message: msg,
        });

        const msgs = [...messages];
        msgs.push({ fromSelf: true, message: msg });
        setMessages(msgs);
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      toast.error("Server Error!");
    }
  };

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

          {isLoading ? (
            <div className="chat-messages">
              <img src={Loading} alt="Loading" width={"10rem"} className='loading'/>
            </div>
          ) : (
            <div className="chat-messages">
              {messages.length === 0 ? (
                <h1 style={{ color: 'white' }}>No Messages!</h1>
              ) : (
                messages.map((message, index) => {
                  return (
                    <div key={index}>
                      <div className={`message ${message.fromSelf ? "sended" : "received"}`}>
                        <div className="content">
                          <p>{message.message}</p>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}

          <ChatInput handleSendMsg={handleSendMsg} />
        </Container>
      )}

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
        transition:Bounce
        bodyClassName="toastBody"
      />
    </>
  );
}

const Container = styled.div`
  padding-top: 1rem;
  display: grid;
  ${'' /* grid-template-rows: 10% 78% 12%; */}
  grid-template-rows: 4rem 30rem 3rem;
  

  gap: 0.1rem;
  @media(min-width: 720px) and (max-width: 1080%){
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: rebeccapurple;
      color: white;
      padding: 1.5rem 2rem; 
      margin: -1rem 0 1rem 0;
      .user-details {
          display: flex;
          align-items: center;
          gap: 1rem;
          .avatar {
              img {
                  height: 3rem;
              }
          }
          .username {
              h3 {
                  color: lime;
                  word-break: break-all;
                  overflow: hidden;
              }
          }
      }
  }

  .chat-messages {
    &::-webkit-scrollbar {
      width: 0.2rem;
      height: 0.2rem;
      &-thumb {
        background-color: #aff000;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .loading{
      width: 25rem;
      margin-left: 10rem;
    }
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    overflow: auto;
    .message {
        display: flex;
        align-items: center;
        .content {
            max-width: 65%;
            overflow-wrap: break-word;
            padding: 1rem;
            font-size: 1rem;
            border-radius: 10px;
            margin-bottom: 0.5rem;
            color: white;
        }
    }
    .sended {
        justify-content: flex-end;
        .content {
            background-color: rebeccapurple;
            color: white;
        }
    }
    .received {
        justify-content: flex-start;
        .content {
            color: white;
            background-color: blue;
        }
    }
  }
`;
