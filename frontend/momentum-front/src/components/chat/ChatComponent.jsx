import React, { useEffect, useState } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

export default function ChatComponent() {
    const [client, setClient] = useState(null);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");


    useEffect(() => {
        const stompClient = new Client({
            webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
            onConnect: () => {
                console.log("Connected to WebSocket");

                stompClient.subscribe('/topic/messages', (message) => {
                    setMessages(prev => [...prev, message.body]);
                });
            },
        });

        stompClient.activate();
        setClient(stompClient);

        return () => stompClient.deactivate();
    }, []);

    const sendMessage = () => {
        if (client && client.connected) {
            const message = {
                content: input,
                timestamp: new Date().toISOString()
            }
            client.publish({
                destination: "/app/chat",
                body: JSON.stringify(message)
            });
            setInput("");
        }
    };

    return (
        <div>
            <h2>Chat</h2>
            <input
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Type message"
            />
            <button onClick={sendMessage}>Send</button>
            <ul>
                {messages.map((msg, i) => <li key={i}>{msg}</li>)}
            </ul>
        </div>
    );
}
