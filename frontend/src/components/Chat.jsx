import { useEffect, useRef, useState } from "react";
import api from "../services/api";
import socket from "../services/socket";

function Chat() {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(false);
  const [messages, setMessages] = useState([]);
  const [typingUser, setTypingUser] = useState("");
  const [text, setText] = useState("");
  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );
  const [joined, setJoined] = useState(
    !!localStorage.getItem("username")
  );

  const bottomRef = useRef(null);

  useEffect(() => {
    loadMessages();
    socket.on("typing", (user) => {
        setTypingUser(user);
        });

        socket.on("stopTyping", () => {
         setTypingUser("");
        });
        socket.on("onlineUsers", (users) => {
        setOnlineUsers(users);
      });
    socket.on("newMessage", (message) => {
      setMessages((prev) => [...prev, message]);

      setTimeout(() => {
        bottomRef.current?.scrollIntoView({
          behavior: "smooth",
        });
      }, 100);
    });

   return () => {
  socket.off("newMessage");
  socket.off("typing");
  socket.off("stopTyping");
  socket.off("onlineUsers");
};
  }, []);

  useEffect(() => {
   if (joined && username) {
      socket.emit("join", username);
   }
}, [joined, username]); 

  const loadMessages = async () => {
    const res = await api.get("/messages");
    setMessages(res.data);

    setTimeout(() => {
      bottomRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }, 100);
  };

  const sendMessage = async () => {
    if (!text.trim()) return;

    await api.post("/messages", {
      username,
      text,
      
    });
     socket.emit("stopTyping");

    setText("");
  };

  if (!joined) {
    return (
      <div className="login-container">
            <div className="login-card">
            <div className="logo">💬</div>

            <h1>Realtime Chat</h1>
          <p>Connect instantly with everyone</p>

          <input
            type="text"
            placeholder="Enter your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <button
            onClick={() => {
              if (!username.trim()) return;

              localStorage.setItem("username", username);
              setJoined(true);
              socket.emit("join", username);
            }}
          >
            Join Chat
          </button>
        </div>
        </div>
    );
  }

  return (
    <div className="chat-container">
        <div className="chat-header">
  <div className="header-left">
    <div className="avatar">💬</div>

    <div>
      <h2>Realtime Chat</h2>
      <span>Welcome, {username}</span>
    </div>
  </div>

  <div className="header-right">

    <div className="users-dropdown">

    <button
      className="users-btn"
      onClick={() => setShowUsers(!showUsers)}
    >
      👥 Online Users ({onlineUsers.length}) ▼
    </button>

    {showUsers && (
      <div className="users-menu">
        {onlineUsers.length === 0 ? (
          <p>No users online</p>
        ) : (
          onlineUsers.map((user) => (
            <div key={user} className="online-user">
              <span className="dot"></span>
              {user}
            </div>
          ))
        )}
      </div>
    )}

  </div>  
       
    

    <button
      className="logout"
      onClick={()=>{
      socket.emit("logout");

      localStorage.removeItem("username");

      window.location.reload();
      }}
    >
      Logout
    </button>
  </div>
</div>
      <div className="messages">
        {messages.length===0 && (
        <div className="empty-chat">
            No messages yet 👋
        </div>
)}
        {messages.map((msg) => (
          <div
  key={msg._id}
  className={
    msg.username === username
      ? "message-row own"
      : "message-row"
  }
>
  {msg.username !== username && (
    <div className="msg-avatar">
      {msg.username.charAt(0).toUpperCase()}
    </div>
  )}

  <div
    className={
      msg.username === username
        ? "message own-message"
        : "message"
    }
  >
    <b>{msg.username}</b>
    <p>{msg.text}</p>
    <small>{new Date(msg.createdAt).toLocaleTimeString()}</small>
  </div>
</div>
        ))}

        <div ref={bottomRef}></div>
      </div>
      {typingUser && typingUser !== username && (
  <div className="typing">
    ✍️ {typingUser} is typing...
  </div>
)}

      <div className="input-area">
        <input
          value={text}
          placeholder="Write your message..."
          onChange={(e) => {
        setText(e.target.value);

        if (e.target.value.trim()) {
        socket.emit("typing", username);
        } else {
        socket.emit("stopTyping");
        }
        }}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
        />

        <button onClick={sendMessage}>
            📤 Send
        </button>
       
      </div>
    </div>
  );
}

export default Chat;