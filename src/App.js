import io from "socket.io-client";
import { useState } from "react";
import Chat from "./components/Chat";
import styles from "./App.module.css";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const socket = io.connect(SERVER_URL);

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handleRoomIdChange = (event) => {
    setRoom(event.target.value);
  };
  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", { room, username });
      setShowChat(true);
    }
  };
  return (
    <div className={styles.App}>
      {!showChat && (
        <div className={styles["join-chat"]}>
          <h1>Join Chat</h1>
          <input
            type="text"
            placeholder="Username"
            onChange={handleUsernameChange}
          />
          <input
            type="text"
            placeholder="Room Id"
            onChange={handleRoomIdChange}
          />
          <button onClick={joinRoom}>Join Room</button>
        </div>
      )}
      {showChat && <Chat socket={socket} username={username} room={room} />}
    </div>
  );
}

export default App;
