import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import { io } from "socket.io-client";

function Chat() {
  const url = "https://backend-chatsphere-a-real-time-chat.onrender.com" ;
  // const url = "http://localhost:5000" ;


  const socket = useRef();

  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined); // Need to understand
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login");
    } else {
      setCurrentUser(JSON.parse(localStorage.getItem("chat-app-user")));
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(`${url}`);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser)  
    {
      if (currentUser.isAvatarImageSet) 
      {
        const fetchAlluserDatas = async () => {
          const response = await fetch(
            `${url}/api/auth/allUsers/${currentUser._id}`,
            {
              method: "GET",
            }
          );

          const data = await response.json();
          setContacts(data.allUsers);
        };

        fetchAlluserDatas();
      } 
      else 
      {
        navigate("/setAvatar");
      }
    }
  }, [currentUser]);

  const handleChatChange = (chat) => {
    // Need to understand
    setCurrentChat(chat);
  };


  return (
    <Container>
      <div className="container">
        <Contacts
          contacts={contacts} 
          currentUser={currentUser}
          changeChat={handleChatChange}
        />
        {
          isLoaded &&
          (
            currentChat === undefined ? ( <Welcome currentUser={currentUser} />) : (
            <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket}/>)
          )
        }
        
      </div>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #131324;
  gap: 1rem;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
    position: relative;

    /* Change */
    /* @media (min-width: 360px) and (max-width:480px) {
          grid-template-columns: 25% 75%;
      } */
  }
`;

export default Chat;