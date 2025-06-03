import { useState, useEffect, useRef } from "react";
import {
  Container,
  TextField,
  Paper,
  Avatar,
  Box,
  ListItem,
  Button,
  ListItemText,
  List,
} from "@mui/material";
import "./Chat.css";
import SockJS from "sockjs-client";
import { CompatClient, Stomp } from "@stomp/stompjs";
import {createConversation, listUsersFollowing} from "../../api/functions";
import ButtonNuestro from "../button/ButtonNuestro";
import {jwtDecode} from "jwt-decode";

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

  const [usersFollowing, setUsersFollowing] = useState([]);
  const [showUsers, setShowUsers] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(false);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:8080/api/conversations/allMyConversations", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Response:", response);

        if (!response.ok) {
          throw new Error("Error al obtener las conversaciones");
        }

        const data = await response.json();
        setConversations(data);
        if (data.length > 0) {
          setActiveChatId(data[0].id);
        }
        console.log(data)
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
        stompClient.current.subscribe("/user/queue/messages", (msg) => {
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
    if (input.trim() && stompClient.current && stompClient.current.connected && activeChat) {
      const now = new Date();
      const token = localStorage.getItem("token")
      const decoded = jwtDecode(token)
      const senderId = decoded.userId
      const activeChatUserId = activeChat ? activeChat.user2.id : null;
      const messageDTO = {
        content: input.trim(),
        timestamp: new Date().toISOString(),
        sender: { id: senderId, username: "" },
        receiver: { id: activeChatUserId, username: "" }
      };

      console.log(messageDTO)
      stompClient.current.send("/app/send-message", {}, JSON.stringify(messageDTO));
      setInput("");
    }
  };


  const activeChat = conversations.find((c) => c.id === activeChatId);
  const messages = activeChat?.messages || [];
  const grouped = groupMessagesByDate(messages);

  // Función para cargar usuarios al mostrar la lista
  const handleToggleUsers = async () => {
    if (!showUsers) {
      setLoadingUsers(true);
      try {
        const usersData = await listUsersFollowing();
        setUsersFollowing(usersData);
      } catch (error) {
        console.error("Error al traer usuarios:", error);
      } finally {
        setLoadingUsers(false);
      }
    }
    setShowUsers(!showUsers);
  };
  const startConversation = async (userId) => {
    try {
      const result = await createConversation(userId)
      console.log("Conversation created:", result);
    } catch (error) {
        console.error("Error creating conversation:", error);
    }
  }

  return (
      <Container maxWidth="lg" className="chat-layout">
        {/* Sidebar */}
        <div className="chat-sidebar">
          <h2>Conversaciones</h2>
          <div>
            <Button variant="contained" onClick={handleToggleUsers}>
              {showUsers ? "Ocultar usuarios" : "Mostrar usuarios"}
            </Button>

            {showUsers && (
                <Paper
                    elevation={3}
                    style={{ marginTop: 10, maxHeight: 200, overflowY: "auto", padding: 10 }}
                >
                  {loadingUsers ? (
                      <p>Cargando usuarios...</p>
                  ) : usersFollowing.length === 0 ? (
                      <p>No hay usuarios para mostrar</p>
                  ) : (
                      <List>
                        {usersFollowing.map((user) => (
                            <ListItem key={user.id} button>
                              <ListItemText primary={user.displayUserName || user.username || user.email} />
                              <ButtonNuestro className="btn-primary" text="Start conversation" onClick={() => startConversation(user.id)}></ButtonNuestro>
                            </ListItem>
                        ))}
                      </List>
                  )}
                </Paper>
            )}
          </div>

          {conversations.map((conv) => (
              <div
                  key={conv.id}
                  className={`chat-contact ${conv.id === activeChatId ? "active" : ""}`}
                  onClick={() => setActiveChatId(conv.id)}
              >
                <Avatar src={conv.user2.profilePicture} alt={conv.user2.profilePicture} />
                <div className="contact-info">
                  <div className="contact-name">{conv.user2.displayUserName}</div>
                  {conv.user2.messages != null && (
                      <div className="contact-last">{conv.user2.messages[0]}</div>
                  )}
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
            <ButtonNuestro variant="contained" text="Enviar" className="btn-primary" onClick={handleSend}>

            </ButtonNuestro>
          </div>
        </div>
      </Container>
  );
};

export default ChatApp;
