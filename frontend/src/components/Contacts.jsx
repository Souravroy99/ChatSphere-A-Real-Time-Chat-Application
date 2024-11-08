import { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.svg";

export default function Contacts({ contacts, currentUser, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    if (currentUser) {
      setCurrentUserImage(currentUser.avatarImage);
      setCurrentUserName(currentUser.username);
    }
  }, [currentUser]);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
      {currentUserImage && currentUserName && (
        <Container>
          <div className="brand">
            <img src={Logo} alt="Logo" />
            <h3>STROYBOOK</h3>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  key={index}
                  onClick={() => changeCurrentChat(index, contact)}
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                >
                  <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt="avatar"
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
          
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #080420;
  ${"" /* background: linear-gradient(145deg, #e6f7f2, #ffe4e1); */}

  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
    @media (min-width: 480px) and (max-width: 720px) {
      h3 {
        color: lime;
      }
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    padding: 0.1rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      height: 0.2rem;
      &-thumb {
        background-color: #a00fff;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #00ffaa;
      background: linear-gradient(145deg, violet, blue);

      color: black;
      &::-webkit-scrollbar {
        width: 0.2rem;
        height: 0.2rem;
        &-thumb {
          background-color: #0000ff;
          width: 0.1rem;
          border-radius: 1rem;
        }
      }
      min-height: 5rem;
      width: 90%;
      cursor: pointer;
      border-radius: 0.2rem;
      padding: 0.4rem;
      gap: 1rem;
      display: flex;
      align-items: center;
      transition: 0.4s ease-in-out;
      overflow: auto;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          word-break: break-all;
          ${"" /* color: white; */}
        }
      }
    }
    .selected {
      ${"" /* background: linear-gradient(145deg, violet, blue); */}
      ${"" /* background: linear-gradient(145deg,  lime , violet); */}

      background: rgb(0, 250, 0, 0.8);
    }
  }
  .current-user {
    &::-webkit-scrollbar {
      width: 0.2rem;
      height: 0.2rem;
      &-thumb {
        background-color: #0000ff;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: auto;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-outline-size: 100%;
      }
    }
    .username {
      h2 {
        word-break: break-all;
        padding: auto;
        color: white;
      }
    }
    @media (min-width: 720px) and (max-width: 2000px) {
      gap: 0.5rem;
      .username {
        font-size: 0.8rem;
      }
    }
  }
`;
