import React, { useEffect } from "react";
import { useState } from "react";
import styles from "./Chat.module.css";
import ChatMessage from "./ChatMessage";

const Chat = ({ socket, username, room }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const handleMessageChange = (event) => {
    setCurrentMessage(event.target.value);
  };
  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
        id: new Date(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((prevList) => [...prevList, messageData]);
    }
  };

  useEffect(() => {
    console.log("socket changed");
    socket.on("recieve_message", (data) => {
      setMessageList((prevList) => [...prevList, data]);
    });

    return () => socket.removeListener("recieve_message");
  }, [socket]);
  return (
    <div>
      <div className={styles["chat-header"]}>
        <p>Live Chat</p>
      </div>
      <div className={styles["chat-body"]}>
        {messageList.map((data) => (
          <ChatMessage
            author={data.author}
            message={data.message}
            time={data.time}
            key={data.id}
            currentUser={username}
          />
        ))}
      </div>
      <div className={styles["chat-footer"]}>
        <input
          type="text"
          placeholder="your message"
          onChange={handleMessageChange}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
};

export default Chat;
