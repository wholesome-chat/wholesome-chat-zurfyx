import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

type Fruit = "APPLE" | "PEARS";

wss.on("connection", (ws) => {
  console.info("Client connected");

  ws.on("message", (message) => {
    console.info("Received:", message.toString());
    ws.send(`Echo: ${message}`);
  });

  ws.on("close", () => {
    console.info("Client disconnected");
  });
});

console.info("WebSocket server is running on ws://localhost:8080");
