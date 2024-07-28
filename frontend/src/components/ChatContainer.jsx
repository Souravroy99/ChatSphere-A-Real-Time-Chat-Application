import { useState } from "react";
import {ToastContainer, toast} from 'react-toastify';
import styled from "styled-components";
import Logout from "./Logout";
import ChatInput from "./ChatInput";
import Messages from "./Messages";

export default function ChatContainer({ currentChat, currentUser }) {
  
  const handleSendMsg = async(msg) => {
    try{
      const response = await fetch(`http://localhost:5000/api/message/addMsg`,{
        method:"POST",
        headers:{"Content-Type": "application/josn"},
        body: JSON.stringify({message: msg, from: currentUser._id, to: currentUser._id,}),
      });

      const data = await response.json();
      
      if(response.ok) {
        toast.success(data.msg) ;
      }
      else {
        toast.error(data.msg) ;
      }
    }
    catch(error){
      toast.error("Server Error!");
    }
  }

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

          <Messages />
          <ChatInput handleSendMsg={handleSendMsg}/>

        </Container>
      )};

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
                  color: white;
              }
          }
      }
  }
`;
