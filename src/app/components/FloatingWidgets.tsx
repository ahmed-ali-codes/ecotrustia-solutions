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
      {/* Chat Window */}
      {isOpen && (
        <div className="bg-[#0f172a]/80 backdrop-blur-2xl border border-white/10 rounded-[1.5rem] w-[350px] sm:w-[380px] h-[500px] sm:h-[600px] flex flex-col shadow-[0_10px_40px_rgba(0,0,0,0.5),0_0_30px_rgba(139,92,246,0.15)] overflow-hidden mb-4 animate-in fade-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary/90 to-secondary/90 p-4 flex justify-between items-center text-white border-b border-white/10 relative overflow-hidden shrink-0">
            <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
            <div className="flex items-center gap-3 relative z-10">
              <div className="bg-white/20 p-2.5 rounded-xl backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]">
                <FaRobot className="text-xl text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
              </div>
              <div>
                <h3 className="font-bold text-base leading-tight tracking-wide">Ecotrustia AI</h3>
                <p className="text-[10px] text-white/80 uppercase tracking-widest font-semibold flex items-center gap-1.5 mt-0.5"><span className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)] animate-pulse"></span> Online</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-2 rounded-full transition relative z-10">
              <FaTimes className="text-lg" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent relative">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`max-w-[85%] rounded-2xl p-4 text-[15px] leading-relaxed shadow-lg backdrop-blur-md ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-br from-primary to-[#7c3aed] text-white self-end rounded-tr-sm shadow-[0_8px_20px_rgba(139,92,246,0.25)] border border-primary/30'
                    : 'bg-white/10 border border-white/10 text-gray-100 self-start rounded-tl-sm shadow-[0_8px_20px_rgba(0,0,0,0.2)]'
                }`}
              >
                {msg.content}
              </div>
            ))}
            {isLoading && (
              <div className="bg-white/10 border border-white/10 text-gray-100 self-start rounded-2xl rounded-tl-sm shadow-[0_8px_20px_rgba(0,0,0,0.2)] backdrop-blur-md p-4 flex gap-1.5 items-center h-[52px]">
                <span className="w-1.5 h-1.5 bg-white/70 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-white/70 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></span>
                <span className="w-1.5 h-1.5 bg-white/70 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent relative shrink-0 pt-8">
            <form onSubmit={handleSend} className="flex gap-2 relative z-10">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-full py-3.5 px-5 text-sm text-white focus:outline-none focus:border-primary/80 focus:shadow-[0_0_15px_rgba(139,92,246,0.3)] focus:bg-white/15 transition-all pr-[52px] placeholder-white/40"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-gradient-to-r from-primary to-secondary hover:shadow-[0_0_15px_rgba(139,92,246,0.6)] hover:scale-105 text-white rounded-full p-2.5 transition-all disabled:opacity-50 disabled:shadow-none disabled:hover:scale-100"
              >
                <FaPaperPlane className="text-sm ml-[-2px] mt-[1px]" />
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
