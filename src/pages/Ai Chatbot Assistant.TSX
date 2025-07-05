import { useState } from 'react';
import { motion } from 'framer-motion';

const AIChatAssistant = () => {
  const [input, setInput] = useState('');
  const [chat, setChat] = useState([
    {
      role: 'assistant',
      content:
        "Hi! I'm your AI Growth Assistant 🌱. Ask me how to improve your likes, shares, impressions, or engagement rate!",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setChat([...chat, { role: 'user', content: input }]);
    setLoading(true);
    setInput('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      setChat((prev) => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (err) {
      setChat((prev) => [...prev, { role: 'assistant', content: '❌ Sorry, something went wrong.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-slate-900/70 border border-blue-800 p-6 rounded-xl shadow-md max-w-2xl mx-auto"
    >
      <h2 className="text-xl font-semibold text-white mb-4">🌼 AI Growth Assistant</h2>
      <div className="h-64 overflow-y-auto space-y-2 mb-4 bg-slate-800/50 p-3 rounded">
        {chat.map((msg, i) => (
          <div
            key={i}
            className={`text-sm px-3 py-2 rounded max-w-[90%] ${
              msg.role === 'assistant' ? 'bg-blue-800 text-white self-start' : 'bg-green-700 text-white self-end ml-auto'
            }`}
          >
            {msg.content}
          </div>
        ))}
        {loading && <div className="text-xs text-slate-400">Thinking...</div>}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 p-2 rounded bg-slate-800 text-white border border-slate-700"
          placeholder="Ask me how to grow 🌱..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 hover:bg-blue-500 transition text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
    </motion.div>
  );
};

export default AIChatAssistant;
