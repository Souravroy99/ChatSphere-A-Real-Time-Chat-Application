import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import LOGO from "../assets/loader.gif";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Login() {
  const url = "https://backend-chatsphere-a-real-time-chat.onrender.com" ;
  // const url = "http://localhost:5000" ;

  const navigate = useNavigate();

  const [values, setValues] = useState({
      username:"",
      password:"",
  }) 

  // If user logged in
  useEffect(() => {
    if(localStorage.getItem('chat-app-user')){
      navigate('/');
    }
  },[]);

  const handleSubmit = async(e) => {
    e.preventDefault();

    if(handleValidation()) {
        const response = await fetch(`${url}/api/auth/login`, {
            method: "POST",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify(values),
        })
 
        const data = await response.json(); 

        if(response.ok) {
            toast.success("Login successfully done");
            localStorage.setItem('chat-app-user', JSON.stringify(data.loginUser));
            console.log("Login.jsx: ", (data.loginUser));

            navigate('/');
        }
        else{
            toast.error(data.msg);
        }
    } 
  };

  const handleValidation = () => {
        const {password,  username} = values;
        if(password==="" || username==="") {
            toast.error("Username and Password are required");
            return false;
        }
        else {
            return true;
        }
  }

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setValues((prev) => ({
        ...prev,
        [name]: value
    }))
  };

  return (
    <>
      <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">

            <img src={LOGO} alt="LOGO" />
            <h1>StroyBook</h1>
            <img src={LOGO} alt="LOGO" />

          </div>
          <input
            type="text"
            name="username"
            placeholder="Username"
            min="3"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => handleChange(e)}
          />

          <button type="submit">Login User</button>
          <span>
            Don't have an account? <Link to="/register">Register</Link>
          </span>
        </form>
      </FormContainer>

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

const FormContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    background-color: #131324;
    .brand{
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        img{
            height: 5rem;
        }
        h1{
        color: white;
        text-transform: uppercase;
        }
    }
    form{
        display: flex;
        flex-direction: column;
        gap:2rem;
        background-color: #00000076 ;
        border-radius: 2rem;
        padding: 3rem 5rem;
        input{
            background-color: transparent;
            padding: 1rem;
            border: 0.1rem solid #4e0eff;
            border-radius: 0.4rem;
            color: white;
            width: 100%;
            font-size: 1rem;
            &:focus{
                border: 0.1rem solid #997af0;
                outline: none;
            }
        }

        button{
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
        span{
            color: white;
            text-transform: uppercase;
            a{
                color: #4e0eff;
                text-decoration: none;
                font-weight: bold;
            }
        }
    }
`;

export default Login;