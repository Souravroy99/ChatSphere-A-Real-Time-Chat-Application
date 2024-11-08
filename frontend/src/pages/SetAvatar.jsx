import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Loader from "../assets/loader.gif";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Buffer } from "buffer";


export default function SetAvatar() {
    const url = "https://backend-chatsphere-a-real-time-chat.onrender.com" ;
    // const url = "http://localhost:5000" ;

    const [avatars, setAvatars] = useState([]) ;
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);
    const navigate = useNavigate();

    useEffect(() => {
        if(!localStorage.getItem('chat-app-user')){
            navigate('/login');
        }
    },[]);

    const api = "https://api.multiavatar.com/12345678";

    const setProfilePicture = async() => {
        if(selectedAvatar === undefined) {
            toast.warning("Please select an avatar");
        }
        else 
        {
            const user = await JSON.parse(localStorage.getItem("chat-app-user")); 

            console.log('Frontend SETAVATAR.JSX: ', user);

            const response = await fetch(`${url}/api/auth/setAvatar/${user._id}`, { 
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ image: avatars[selectedAvatar] }),
            })
            
            const data = await response.json();

            if(data.isSet) {     

                user.isAvatarImageSet = true;
                user.avatarImage = data.image;
                localStorage.setItem("chat-app-user", JSON.stringify(user));

                navigate('/');
            }
            else {
                toast.error("Error setting avatar. Please try again!");
            }
        } 
    };
    
    useEffect(() => {
        const fetchData = async() => {

            const data = []; // Learn the buffer & fetchData
            for(let i=0; i<5; i++) {
                const response = await fetch(`${api}/${Math.round(Math.random() * 1000)}`);
                const image = await response.text();  // Get the response text (SVG --> Scalable Vector Graphics)
                const buffer = Buffer.from(image);    // Convert the text to a buffer
                data.push(buffer.toString("base64")); // Convert the buffer to base64
            }
            setAvatars(data);
            setIsLoading(false);
        }
        fetchData();
    },[]);

  return (
    <>{
        isLoading 
        ? 
            <Container>
                <img src={Loader} alt="Loader.Gif" className="loader" />
            </Container>
        :
        (
            <Container>
                <div className="title-container">
                    <h1>
                        Pick an avatar as your profile picture
                    </h1>
                </div>
                <div className="avatars">
                    {
                        avatars.map((avatar, index) => {
                            return (
                                <div key={index} className={`avatar ${selectedAvatar === index ? "selected" : ""}`}>
                                    <img src={`data:image/svg+xml;base64,${avatar}`} alt="Avatar Image" onClick={() => setSelectedAvatar(index)} />
                                </div>
                            )
                        })
                    }
                </div>
                <button className="submit-btn" onClick={setProfilePicture}>Set as Profile Picture</button>
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
        transition: Bounce
        bodyClassName="toastBody"
      />
    </>
  )
}

const Container = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 3rem;
    background-color: #131324;
    height: 100vh;
    width: 100vw;
    .loader{
        max-inline-size: 100%;;
    }
    .title-container{
        h1{
            color: white;
        }
    }
    .avatars{
        display: flex;
        gap: 2rem;

        .avatar{
            border: 0.4rem solid transparent;
            padding: 0.4rem;
            border-radius: 5rem;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: 0.5s ease-in-out;
            img{
                height: 6rem;
            }
        }
        .selected{
            border: 0.4rem solid #4e0eff;
        }
    }
    .submit-btn{
        background-color: #997af0;
        color: white;
        padding: 1rem 2rem;
        border: none;
        font-weight: bold;
        cursor: pointer;
        border-radius: 0.4rem;
        font-size: 1rem;
        text-transform: uppercase;
        transition: 0.4s ease-in-out;
        &:hover{
            background-color: #4e0eff;
        }
    }
`;