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
    const date = new Date(msg.timestamp || msg.timestampDate || Date.now());
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
  const [currentUserId, setCurrentUserId] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const stompClient = useRef(null);

  const [usersFollowing, setUsersFollowing] = useState([]);
  const [showUsers, setShowUsers] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(false);

  // Función helper para obtener el otro usuario
  const getOtherUser = (conversation, currentUserId) => {
    return conversation.user1.id === currentUserId ? conversation.user2 : conversation.user1;
  };

  // Obtener el ID del usuario actual desde el token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setCurrentUserId(decoded.userId);
        console.log("Current user ID:", decoded.userId); // Debug
      } catch (error) {
        console.error("Error decodificando token:", error);
      }
    }
  }, []);

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

        // Asegurarse de que todos los mensajes tengan la propiedad fromMe correcta
        const conversationsWithFromMe = data.map(conv => ({
          ...conv,
          messages: (conv.messages || []).map(msg => ({
            ...msg,
            fromMe: msg.sender?.id === currentUserId || msg.senderId === currentUserId
          }))
        }));

        setConversations(conversationsWithFromMe);

        // Obtener información del usuario actual desde la primera conversación
        if (conversationsWithFromMe.length > 0) {
          setActiveChatId(conversationsWithFromMe[0].id);
          const firstConv = conversationsWithFromMe[0];
          const currentUserInfo = firstConv.user1.id === currentUserId ? firstConv.user1 : firstConv.user2;
          setCurrentUser(currentUserInfo);
        }

        console.log("Conversations loaded:", conversationsWithFromMe);
      } catch (error) {
        console.error("Error al cargar conversaciones:", error);
      }
    };

    if (currentUserId) {
      fetchConversations();
    }
  }, [currentUserId]);

  useEffect(() => {
    const connectWebSocket = () => {
      const socket = new SockJS("http://localhost:8080/ws");
      stompClient.current = Stomp.over(socket);

      stompClient.current.connect({}, () => {
        console.log("WebSocket connected");
        stompClient.current.subscribe("/user/queue/messages", (msg) => {
          const messageData = JSON.parse(msg.body);
          console.log("Mensaje recibido:", messageData);
          console.log("Current user ID:", currentUserId);

          // Actualizar las conversaciones con el nuevo mensaje
          setConversations(prevConversations => {
            return prevConversations.map(conv => {
              // Verificar si el mensaje pertenece a esta conversación
              const isMessageForThisConv =
                  (conv.user1.id === messageData.sender.id && conv.user2.id === messageData.receiver.id) ||
                  (conv.user1.id === messageData.receiver.id && conv.user2.id === messageData.sender.id);

              if (isMessageForThisConv) {
                // Crear el mensaje con el formato esperado
                const newMessage = {
                  ...messageData,
                  fromMe: messageData.sender.id === currentUserId,
                  text: messageData.content,
                  timestampDate: messageData.timestamp
                };

                console.log("New message added:", newMessage);
                console.log("Message fromMe:", newMessage.fromMe);
                console.log("Sender ID:", messageData.sender.id);
                console.log("Current User ID:", currentUserId);

                return {
                  ...conv,
                  messages: [...(conv.messages || []), newMessage]
                };
              }
              return conv;
            });
          });
        });
      });
    };

    if (currentUserId) {
      connectWebSocket();
    }

    return () => {
      if (stompClient.current) {
        stompClient.current.disconnect();
      }
    };
  }, [currentUserId]);

  const handleSend = () => {
    if (input.trim() && stompClient.current && stompClient.current.connected && activeChat && currentUserId) {
      // Usar la función helper para obtener el destinatario
      const recipientUser = getOtherUser(activeChat, currentUserId);

      const messageDTO = {
        content: input.trim(),
        timestamp: new Date().toISOString(),
        sender: { id: currentUserId, username: "" },
        receiver: { id: recipientUser.id, username: "" }
      };

      console.log("Enviando mensaje:", messageDTO);

      // Agregar el mensaje inmediatamente a la UI (optimistic update)
      const currentTimestamp = new Date().toISOString();
      const optimisticMessage = {
        ...messageDTO,
        fromMe: true,
        text: messageDTO.content,
        timestamp: currentTimestamp,
        timestampDate: currentTimestamp
      };

      setConversations(prevConversations => {
        return prevConversations.map(conv => {
          if (conv.id === activeChatId) {
            return {
              ...conv,
              messages: [...(conv.messages || []), optimisticMessage]
            };
          }
          return conv;
        });
      });

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
      const result = await createConversation(userId);
      console.log("Conversation created:", result);

      // Recargar conversaciones después de crear una nueva
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8080/api/conversations/allMyConversations", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();

        // Asegurarse de que todos los mensajes tengan la propiedad fromMe correcta
        const conversationsWithFromMe = data.map(conv => ({
          ...conv,
          messages: (conv.messages || []).map(msg => ({
            ...msg,
            fromMe: msg.sender?.id === currentUserId || msg.senderId === currentUserId
          }))
        }));

        setConversations(conversationsWithFromMe);
        // Activar la nueva conversación si existe
        if (result && result.id) {
          setActiveChatId(result.id);
        }
      }
    } catch (error) {
      console.error("Error creating conversation:", error);
    }
  };

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

          {conversations.map((conv) => {
            const otherUser = getOtherUser(conv, currentUserId);
            return (
                <div
                    key={conv.id}
                    className={`chat-contact ${conv.id === activeChatId ? "active" : ""}`}
                    onClick={() => setActiveChatId(conv.id)}
                >
                  <Avatar src={otherUser.profilePicture} alt={otherUser.displayUserName} />
                  <div className="contact-info">
                    <div className="contact-name">{otherUser.displayUserName}</div>
                    {conv.messages && conv.messages.length > 0 && (
                        <div className="contact-last">
                          {conv.messages[conv.messages.length - 1].content || conv.messages[conv.messages.length - 1].text}
                        </div>
                    )}
                  </div>
                </div>
            );
          })}
        </div>

        {/* Main Chat */}
        <div className="chat-main">
          <h2>
            {activeChat
                ? `Chat con ${getOtherUser(activeChat, currentUserId).displayUserName}`
                : "Selecciona una conversación"
            }
          </h2>
          <div className="chat-messages">
            {Object.entries(grouped).map(([date, msgs], i) => (
                <div key={i}>
                  <div className="date-label">{formatDateLabel(date)}</div>
                  {msgs.map((msg, idx) => {
                    console.log("Rendering message:", msg, "fromMe:", msg.fromMe); // Debug
                    return (
                        <Box
                            key={idx}
                            className={`chat-message-wrapper ${
                                msg.fromMe ? "chat-right-wrapper" : "chat-left-wrapper"
                            }`}
                        >
                          {/* Avatar para mensajes del otro usuario (izquierda) */}
                          {!msg.fromMe && (
                              <Avatar
                                  src={getOtherUser(activeChat, currentUserId).profilePicture}
                                  alt={getOtherUser(activeChat, currentUserId).displayUserName}
                                  className="chat-avatar"
                              />
                          )}

                          <Paper className={`chat-bubble ${msg.fromMe ? "chat-right" : "chat-left"}`}>
                            <div className="chat-text">{msg.text || msg.content}</div>
                            <div className="chat-time">
                              {new Date(msg.timestamp || msg.timestampDate || Date.now()).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </div>
                          </Paper>

                          {/* Avatar para mensajes míos (derecha) */}
                          {msg.fromMe && (
                              <Avatar
                                  src={currentUser?.profilePicture}
                                  alt={currentUser?.displayUserName}
                                  className="chat-avatar"
                              />
                          )}
                        </Box>
                    );
                  })}
                </div>
            ))}
          </div>
          <div className="chat-input-area">
            <TextField
                fullWidth
                placeholder="Escribe tu mensaje..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <ButtonNuestro variant="contained" text="Enviar" className="btn-primary" onClick={handleSend}>
            </ButtonNuestro>
          </div>
        </div>
      </Container>
  );
};

export default ChatApp;