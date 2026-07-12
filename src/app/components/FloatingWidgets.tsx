'use client';

import { useState, useRef, useEffect } from 'react';
import { FaWhatsapp, FaRobot, FaTimes, FaPaperPlane } from 'react-icons/fa';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function FloatingWidgets() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hello! I am the Ecotrustia AI Assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      const data = await response.json();

      if (response.ok && data.reply) {
        setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
      } else {
        setMessages((prev) => [...prev, { role: 'assistant', content: 'Sorry, I am having trouble connecting right now. Please try again later.' }]);
      }
    } catch (error) {
      setMessages((prev) => [...prev, { role: 'assistant', content: 'An error occurred. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-4">
      {/* Chat Window */}
      {isOpen && (
        <div className="bg-[#111827]/90 backdrop-blur-xl border border-white/10 rounded-2xl w-[350px] h-[500px] sm:h-[600px] flex flex-col shadow-2xl overflow-hidden mb-4 animate-in fade-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary/80 to-secondary/80 p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <FaRobot className="text-xl" />
              <span className="font-semibold">Ecotrustia AI</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:text-white/70 transition">
              <FaTimes />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`max-w-[85%] rounded-xl p-3 text-sm ${
                  msg.role === 'user'
                    ? 'bg-primary text-white self-end rounded-tr-sm'
                    : 'bg-white/5 border border-white/10 text-gray-200 self-start rounded-tl-sm'
                }`}
              >
                {msg.content}
              </div>
            ))}
            {isLoading && (
              <div className="bg-white/5 border border-white/10 text-gray-200 self-start rounded-tl-sm rounded-xl p-3 text-sm flex gap-1">
                <span className="animate-bounce">.</span>
                <span className="animate-bounce delay-100">.</span>
                <span className="animate-bounce delay-200">.</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 border-t border-white/10 bg-black/20">
            <form onSubmit={handleSend} className="flex gap-2 relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="w-full bg-white/5 border border-white/10 rounded-full py-3 px-4 text-sm text-white focus:outline-none focus:border-primary/50 transition pr-12"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary/80 text-white rounded-full p-2 transition disabled:opacity-50"
              >
                <FaPaperPlane className="text-sm" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Buttons */}
      <div className="flex flex-col gap-3 items-center">
        {/* Chatbot Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-[60px] h-[60px] bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white shadow-[0_5px_20px_rgba(139,92,246,0.4)] hover:scale-110 transition-transform duration-300 z-[100] group relative"
          aria-label="Open AI Chatbot"
        >
          {isOpen ? <FaTimes className="text-2xl" /> : <FaRobot className="text-2xl" />}
          
          {/* Tooltip */}
          <span className="absolute right-full mr-4 bg-black/80 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none">
            {isOpen ? 'Close Chat' : 'Ask AI Assistant'}
          </span>
        </button>

        {/* WhatsApp Button (Moved from page.tsx) */}
        <a 
          href="https://wa.me/971557888645" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-[60px] h-[60px] bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-[0_5px_20px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform duration-300 z-[100] group relative"
        >
          <FaWhatsapp className="text-[32px]" />
          
          {/* Tooltip */}
          <span className="absolute right-full mr-4 bg-black/80 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none">
            Chat on WhatsApp
          </span>
        </a>
      </div>
    </div>
  );
}
