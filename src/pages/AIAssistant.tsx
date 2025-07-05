import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, X, Send } from 'lucide-react';

const sampleTips = [
  "Your engagement rate is high on weekends—try posting reels every Saturday!",
  "You’ve gained 150+ followers this week—keep up the consistency!",
  "Carousel posts are performing better—create more visual content.",
  "Your comment interaction is low—ask questions in captions to boost replies.",
];

const AIAssistant: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: "Hey 👋 I’m your growth assistant. Ask me how to improve your engagement!" }
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { sender: 'user', text: input }];
    // Simulate AI response from tips
    const botResponse = sampleTips[Math.floor(Math.random() * sampleTips.length)];
    setMessages([...newMessages, { sender: 'bot', text: botResponse }]);
    setInput('');
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-xl z-50"
      >
        {open ? <X size={22} /> : <Bot size={22} />}
      </motion.button>

      {/* Chat Window */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-20 right-6 w-80 bg-white shadow-2xl rounded-2xl border p-4 z-50"
        >
          <h3 className="text-lg font-bold text-blue-600 mb-2">AI Growth Assistant</h3>
          <div className="h-64 overflow-y-auto flex flex-col gap-2 text-sm mb-2 pr-1">
            {messages.map((msg, idx) => (
              <div key={idx} className={`p-2 rounded-lg ${msg.sender === 'bot' ? 'bg-gray-100 text-black self-start' : 'bg-blue-500 text-white self-end'}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              className="flex-1 border rounded-lg px-3 py-1 text-sm outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Ask something..."
            />
            <button onClick={sendMessage} className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700">
              <Send size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default AIAssistant;
