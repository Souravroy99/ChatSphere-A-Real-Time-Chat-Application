import { useState } from 'react';
import styled from 'styled-components';
import Picker from 'emoji-picker-react';
import { IoMdSend } from 'react-icons/io'
import { BsEmojiSmileFill } from 'react-icons/bs'


export default function ChatInput({handleSendMsg}) {

    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [msg, setMsg] = useState("");

    const handleEmojiPickerHideAndShow = () => {
        setShowEmojiPicker(!showEmojiPicker);
    }

    const handleEmojiClick = (event, emoji) => {
        let message = msg;
        message += emoji.emoji;
        setMsg(message);
    }

    const sendChat = (e) => {
        e.preventDefault();
        if(msg.length > 0) {
            handleSendMsg(msg);
            setMsg("");
        }
    }

  return (
    <Container>
        <div className="button-container">
            <div className="emoji">

                <BsEmojiSmileFill onClick={handleEmojiPickerHideAndShow}/>
                {
                    showEmojiPicker && <Picker onEmojiClick={handleEmojiClick}/>
                }

            </div>
        </div>
        <form className='input-container' onSubmit={(e) => sendChat(e)}>
            <input type="text" placeholder='type your message here' value={msg} onChange={(event) => setMsg(event.target.value)}/>
            <button className='submit'>
                <IoMdSend />
            </button>
        </form>
    </Container>
  )
}


const Container = styled.div`
    display:grid;
    grid-template-column: 5% 95%
    align-items: center;
    background-color: #080420;
    padding: 0 2rem;
    padding-bottom: 0.3rem;
    .button-container{
        display: flex;
        align-items: center;
        gap: 1rem;
        color: white;
        .emoji{
            position: relative;
            svg{         {/* What is SVG */}
                font-size: 1.5rem;
                color: yellow;
                cursor: pointer;
            }
            .emoji-picker-react{   {/* Where is the class name  */}
                position: absolute;
                top: -10rem ;
                background-color: #080420;
                box-shadow: 0 5px 10px #9a86f3;
                border-color: #9a86f3;
                .emoji-scroll-wrapper::-webkit-scrollbar{
                    background-color:#080420;
                    width:5px;
                    &-thumb{
                        background-color: #9186f3;
                    }
                }
                .emoji-catagories{
                    button{
                        filter: contrast(0);
                    }
                }
                .emoji-search(
                    background-color: transparent;
                    border-color: #9186f3;
                )
                .emoji-group:before{
                    background-color: #080420;
                }
            }
        }
    }

    .input-container{
        width: 100%;
        gap: 2rem;
        display: flex;
        align-items: center;
        background-color: #ffff34;
        input{
            width: 90%;
            height: 60%;
            background-color: transparent;
            padding-left: 1rem;
            font-size: 1.2rem;
            border: none;
            &::selection{
                background-color: #9a86f3;
            }
            &:focus{
                outline: none;
            }
            button{
                padding: 0.3rem 2rem;
                border-radius: 2rem ;
                background-color: #9a86f3;
                display: flex;
                justify-content: center;
                align-items: center;
                border: none;
                svg{
                    font-size: 2rem;
                    color: white;
                }
            }
        }
    }
`;
