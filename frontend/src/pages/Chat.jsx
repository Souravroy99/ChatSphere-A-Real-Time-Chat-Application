import { useState, useEffect } from "react";
import styled from "styled-components";
import {useNavigate} from 'react-router-dom';
import Contacts from "../components/Contacts";


function Chat() {

  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
      if(!localStorage.getItem('chat-app-user')) {
        navigate('/login');
      }
      else {
          setCurrentUser(JSON.parse(localStorage.getItem("chat-app-user"))); 
      }
    },[]);
    
    
  useEffect(() => {
      if(currentUser) 
      {
          if(currentUser.isAvatarImageSet) 
            {
            const fetchAlluserDatas = async() => {
              const response = await fetch(`http://localhost:5000/api/auth/allUsers/${currentUser._id}`, {
                method: "GET",
              });

              const data = await response.json();
              setContacts(data.createdUser);
            }
            
            fetchAlluserDatas();
          }
          else {
            navigate('/setAvatar');
          }
      }
  },[currentUser]);


  return (
    <Container>
      <div className="container">
          <Contacts contacts={contacts} CurrentUser={currentUser}/>
      </div>
    </Container>
  )
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
  .container{
      height: 85vh;
      width: 85vw;
      background-color: #00000076;
      display: grid;
      grid-template-columns: 25% 75%;
      @media (min-width: 720px) and (max-width:1080px) {
          grid-template-columns: 35% 65%;
      }
      /* Change */
      /* @media (min-width: 360px) and (max-width:480px) {
          grid-template-columns: 25% 75%;
      } */
  }
`;

export default Chat