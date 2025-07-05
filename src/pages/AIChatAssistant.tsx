// src/components/AIChatAssistant.tsx
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mic, Send, Bot, X } from 'lucide-react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const AIChatAssistant = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [chat, setChat] = useState<{ role: string; content: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  const handleVoice = () => {
    resetTranscript();
    SpeechRecognition.startListening({ continuous: false });
  };

  useEffect(() => {
    if (!listening && transcript) {
      setInput(transcript);
    }
  }, [listening]);

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessage = { role: 'user', content: input };
    setChat((prev) => [...prev, newMessage]);
    setInput('');
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: newMessage }),
      });

      const data = await res.json();

      if (res.ok) {
        const reply = data.reply;
        setChat((prev) => [...prev, { role: 'assistant', content: reply }]);
        speak(reply);
      } else {
        setChat((prev) => [...prev, { role: 'assistant', content: 'AI error: ' + data.message }]);
      }
    } catch (err) {
      console.error(err);
      setChat((prev) => [...prev, { role: 'assistant', content: 'Network error. Try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Chat Icon */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg z-50"
      >
        <Bot />
      </button>

      {/* Chat Panel */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-24 right-6 bg-slate-800 text-white w-80 max-h-[70vh] rounded-xl shadow-lg flex flex-col z-50"
        >
          <div className="p-4 border-b border-slate-600 flex justify-between items-center">
            <h2 className="font-semibold">AI Chat Assistant</h2>
            <button onClick={() => setOpen(false)} className="hover:text-red-400">
              <X />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-2 text-sm">
            {chat.map((msg, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-lg ${msg.role === 'user' ? 'bg-blue-700 text-white self-end ml-auto' : 'bg-slate-700 text-white mr-auto'}`}
              >
                {msg.content}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          <div className="p-4 border-t border-slate-600 flex gap-2">
            <button
              onClick={handleVoice}
              className={`bg-slate-700 p-2 rounded hover:bg-slate-600 ${listening ? 'animate-pulse text-green-400' : ''}`}
            >
              <Mic />
            </button>
            <input
              className="flex-1 rounded px-3 py-2 bg-slate-700 placeholder-slate-400 text-white"
              placeholder="Ask something..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 p-2 rounded"
            >
              <Send />
            </button>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default AIChatAssistant;
