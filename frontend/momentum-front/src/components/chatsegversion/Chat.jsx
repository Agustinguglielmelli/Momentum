import { useState, useEffect, useRef } from "react";
import {
  Container,
  TextField,
  Button,
  Paper,
  Avatar,
  Box,
} from "@mui/material";
import "./Chat.css";
import SockJS from "sockjs-client";
import { CompatClient, Stomp } from "@stomp/stompjs";

// Utilidades para mostrar fechas
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
    const dateStr = date.toISOString().split("T")[0];
    if (!groups[dateStr]) groups[dateStr] = [];
    groups[dateStr].push(msg);
  });
  return groups;
};

const ChatApp = () => {
  const [input, setInput] = useState("");
  const [conversations, setConversations] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);

  const stompClient = useRef(null);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:8080/api/conversations", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Error al obtener las conversaciones");
        }

        const data = await response.json();
        setConversations(data);
        if (data.length > 0) {
          setActiveChatId(data[0].id);
        }
      } catch (error) {
        console.error("Error al cargar conversaciones:", error);
      }
    };

    fetchConversations();
  }, []);

  useEffect(() => {
    const connectWebSocket = () => {
      const socket = new SockJS("http://localhost:8080/ws");
      stompClient.current = Stomp.over(socket);

      stompClient.current.connect({}, () => {
        stompClient.current.subscribe("/user/private", (msg) => {
          const body = JSON.parse(msg.body);
          const updatedConvs = conversations.map((conv) => {
            if (conv.id === body.conversationId) {
              return { ...conv, messages: [...conv.messages, body] };
            }
            return conv;
          });
          setConversations(updatedConvs);
        });
      });
    };

    connectWebSocket();

    return () => {
      if (stompClient.current) {
        stompClient.current.disconnect();
      }
    };
  }, [conversations]);

  const handleSend = () => {
    if (input.trim() && stompClient.current && stompClient.current.connected) {
      const now = new Date();
      const message = {
        content: input.trim(),
        conversationId: activeChatId,
        timestampDate: now.toISOString(),
      };

      stompClient.current.send("/app/private-message", {}, JSON.stringify(message));
      setInput("");
    }
  };

  const activeChat = conversations.find((c) => c.id === activeChatId);
  const messages = activeChat?.messages || [];
  const grouped = groupMessagesByDate(messages);

  return (
    <Container maxWidth="lg" className="chat-layout">
      {/* Sidebar */}
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

      {/* Main Chat */}
      <div className="chat-main">
        <h2>{activeChat?.name || "Selecciona una conversación"}</h2>
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
                    <div className="chat-text">{msg.text || msg.content}</div>
                    <div className="chat-time">
                      {new Date(msg.timestampDate).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
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
