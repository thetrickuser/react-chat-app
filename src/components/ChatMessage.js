import React from "react";
import styles from "./ChatMessage.module.css";

const ChatMessage = ({ author, message, time, currentUser }) => {
  return (
    <div
      className={`${styles.message} ${
        currentUser === author ? styles.me : styles.other
      }`}
    >
      <div className={styles["message-content"]}>
        <p>{message}</p>
      </div>
      <div className={styles["message-metadata"]}>
        <p>{author}</p>
        <p>{time}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
