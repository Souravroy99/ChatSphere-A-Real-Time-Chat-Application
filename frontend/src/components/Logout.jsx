import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import {BiPowerOff} from 'react-icons/bi';

export default function Logout() {
    const navigate = useNavigate() ;
    const handleClick = async() => {
        localStorage.clear();
        navigate('/login');
    }

  return (
    <Button onClick={handleClick}>
        <BiPowerOff />
    </Button>
  )
}
 
const Button = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #9a86f3;
    border-radius: 0.5rem;
    padding: 0.5rem;
    border: none;
    cursor: pointer;
    svg{
        font-size: 1.3rem;
        color: ebe7ff;
    }
`;