import "./App.css";
import { useState } from "react";

function App() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      setMessages((prev) => [...prev, input]);
      setInput("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="w-full max-w-md p-4 bg-white shadow-lg rounded-lg">
        <div className="h-64 overflow-y-auto border border-gray-300 rounded p-2 mb-4 bg-gray-50">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-2 mb-2 rounded ${
                index % 2 === 0
                  ? "bg-blue-100 text-blue-900"
                  : "bg-purple-100 text-purple-900"
              }`}
            >
              {msg}
            </div>
          ))}
        </div>
        <div className="flex">
          <input
            type="text"
            className="flex-1 p-3 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
          />
          <button
            className="p-3 bg-blue-600 text-white rounded-r hover:bg-blue-700 transition"
            onClick={handleSend}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
