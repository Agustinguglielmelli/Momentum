
import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Paper,
  Avatar,
  Box,
} from "@mui/material";
import "./Chat.css";

//para convertir fecha a Hoy / Ayer / DD/MM/YYYY
const formatDateLabel = (dateStr) => {
  const today = new Date();
  const msgDate = new Date(dateStr);
  const diffTime = today.setHours(0, 0, 0, 0) - msgDate.setHours(0, 0, 0, 0);
  const oneDay = 86400000;

  if (diffTime === 0) return "Hoy";
  if (diffTime === oneDay) return "Ayer";
  return msgDate.toLocaleDateString();
};

const groupMessagesByDate = (messages) => {
  const groups = {};
  messages.forEach((msg) => {
    const date = new Date(msg.timestampDate || Date.now());
    const dateStr = date.toISOString().split("T")[0]; // YYYY-MM-DD
    if (!groups[dateStr]) groups[dateStr] = [];
    groups[dateStr].push(msg);
  });
  return groups;
};

const ChatApp = () => {
  const [input, setInput] = useState("");
  //uso conversaciones de ejemplo por ahora, despues voy a traer conversacion de la db
  const [conversations, setConversations] = useState([
    {
      id: 1,
      name: "Juan",
      avatar: "https://i.pravatar.cc/40?img=3",
      lastMessage: "Hola, ¿cómo estás?",
      messages: [
        {
          text: "Hola, ¿cómo estás?",
          fromMe: false,
          timestamp: "14:30",
          timestampDate: "2025-05-12T14:30:00.000Z",
        },
        {
          text: "Bien, ¿y vos?",
          fromMe: true,
          timestamp: "14:31",
          timestampDate: "2025-05-12T14:31:00.000Z",
        },
      ],
    },
    {
      id: 2,
      name: "Lucía",
      avatar: "https://i.pravatar.cc/40?img=5",
      lastMessage: "Nos vemos mañana",
      messages: [
        {
          text: "Nos vemos mañana",
          fromMe: false,
          timestamp: "13:00",
          timestampDate: "2025-05-12T13:00:00.000Z",
        },
      ],
    },
  ]);
  const [activeChatId, setActiveChatId] = useState(1);

  const activeChat = conversations.find((c) => c.id === activeChatId);
  const messages = activeChat.messages;

  const handleSend = () => {
    if (input.trim()) {
      const now = new Date();
      const newMessage = {
        text: input.trim(),
        fromMe: true,
        timestamp: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        timestampDate: now.toISOString(),
      };
      const updatedConversations = conversations.map((conv) =>
        conv.id === activeChatId
          ? { ...conv, messages: [...conv.messages, newMessage] }
          : conv
      );
      setConversations(updatedConversations);
      setInput("");
    }
  };

  const grouped = groupMessagesByDate(messages);

  return (
    <Container maxWidth="lg" className="chat-layout">
      {/* Columna izquierda */}
      <div className="chat-sidebar">
        {conversations.map((conv) => (
          <div
            key={conv.id}
            className={`chat-contact ${conv.id === activeChatId ? "active" : ""}`}
            onClick={() => setActiveChatId(conv.id)}
          >
            <Avatar src={conv.avatar} alt={conv.name} />
            <div className="contact-info">
              <div className="contact-name">{conv.name}</div>
              <div className="contact-last">{conv.lastMessage}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Columna derecha */}
      <div className="chat-main">
        <h2>{activeChat.name}</h2>
        <div className="chat-messages">
          {Object.entries(grouped).map(([date, msgs], i) => (
            <div key={i}>
              <div className="date-label">{formatDateLabel(date)}</div>
              {msgs.map((msg, idx) => (
                <Box
                  key={idx}
                  className={`chat-message-wrapper ${
                    msg.fromMe ? "chat-right-wrapper" : "chat-left-wrapper"
                  }`}
                >
                  {!msg.fromMe && (
                    <Avatar
                      src={activeChat.avatar}
                      alt={activeChat.name}
                      className="chat-avatar"
                    />
                  )}
                  <Paper className={`chat-bubble ${msg.fromMe ? "chat-right" : "chat-left"}`}>
                    <div className="chat-text">{msg.text}</div>
                    <div className="chat-time">{msg.timestamp}</div>
                  </Paper>
                </Box>
              ))}
            </div>
          ))}
        </div>
        <div className="chat-input-area">
          <TextField
            fullWidth
            placeholder="Escribe tu mensaje..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleSend}>
            Enviar
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default ChatApp;
