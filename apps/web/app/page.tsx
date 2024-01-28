"use client";

import { useState } from "react";
import classes from "./page.module.css";
import { useSocket } from "../context/SocketContext";

export default function Page(): JSX.Element {
  const { sendMessage } = useSocket();

  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<string[]>([]);

  const sendMessageHandler = (message: string) => {
    sendMessage(message);
  };

  return (
    <div>
      <div>
        <input
          onChange={(e) => setMessage(e.target.value)}
          className={classes["chat-input"]}
          placeholder="Message..."
        />
        <button
          onClick={(e) => sendMessageHandler(message)}
          className={classes["button"]}
        >
          Send
        </button>
      </div>
      <div>
        {messages.map((e: any) => (
          <li>{e}</li>
        ))}
      </div>
    </div>
  );
}
