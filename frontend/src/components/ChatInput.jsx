import { useState } from "react";
import styled from "styled-components";
import Picker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";

export default function ChatInput({ handleSendMsg }) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");

  const handleEmojiPickerHideAndShow = () => {
    setShowEmojiPicker((prev) => !prev);
  };

  const handleEmojiClick = (event) => {
    setMsg((prevMsg) => (prevMsg + event.emoji));
  };

  const sendChat = (e) => {
    e.preventDefault();
    
    if (msg.length > 0) {
        handleSendMsg(msg);
        setMsg(""); 
    } else {
      console.log("Type Something");
    }
  };

  return (
    <>
      <Container>
        <div className="button-container">
          <div className="emoji">
            <BsEmojiSmileFill onClick={handleEmojiPickerHideAndShow} />
            {showEmojiPicker && (
              <Picker className="emoji-picker-react emoji-scroll-wrapper emoji-categories emoji-search emoji-group" onEmojiClick={handleEmojiClick} />
            )}
          </div>
        </div>
        <form className="input-container" onSubmit={sendChat}>
          <input
            type="text"
            placeholder="Write your message here"
            value={msg}
            onChange={(event) => setMsg(event.target.value)}
          />
          <button className="submit">
            <IoMdSend />
          </button>
        </form>
      </Container>

    </>
  );
}


const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 5% 95%;
  background-color: #080420;
  padding: 0 2rem;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
      }
      .emoji-picker-react {
        position: absolute;
        top: -30rem;
        background-color: #080420;
        box-shadow: 0 5px 10px #9a86f3;
        border-color: #9a86f3;
        .emoji-scroll-wrapper::-webkit-scrollbar {
          background-color: #080420;
          width: 5px;
          &-thumb {
            background-color: #9a86f3;
          }
        }
        .emoji-categories {
          button {
            filter: contrast(0);
          }
        }
        .emoji-search {
          background-color: transparent;
          border-color: #9a86f3;
        }
        .emoji-group:before {
          background-color: #080420;
        }
      }
    }
  }
  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff34;
    input {
      width: 90%;
      ${'' /* height: 60%; */}
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;

      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.2rem 0.8rem;
      border-radius: 3rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9a86f3;
      border: none;
      cursor: pointer;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
        }
      }
      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }
`;