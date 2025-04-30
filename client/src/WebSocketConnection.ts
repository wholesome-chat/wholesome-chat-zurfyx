const HOST = "localhost";
const PORT = "8080";
class WebSocketConnection {
  #socket: WebSocket | null = null;
  #listeners: Set<(message: string) => void> = new Set();

  connect() {
    this.#socket = new WebSocket(`ws://${HOST}:${PORT}`);

    this.#socket.onopen = () => {
      console.info("WebSocket connection established");
    };

    this.#socket.onmessage = (event) => {
      console.info("Message received:", event.data);
      for (const listener of this.#listeners) {
        listener(event.data);
      }
    };

    this.#socket.onclose = () => {
      console.info("WebSocket connection closed");
    };

    this.#socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  }

  onMessage(fn: (message: string) => void) {
    this.#listeners.add(fn);
    return () => {
      this.#listeners.delete(fn);
    };
  }

  disconnect() {
    if (this.#socket != null) {
      this.#socket.close();
    }
  }

  sendMessage(message: string) {
    if (this.#socket && this.#socket.readyState === WebSocket.OPEN) {
      this.#socket.send(message);
      console.info("Message sent:", message);
    } else {
      console.warn("WebSocket is not open. Unable to send message.");
    }
  }
}

export default WebSocketConnection;
