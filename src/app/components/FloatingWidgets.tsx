'use client';

import { useState, useRef, useEffect } from 'react';
import { FaWhatsapp, FaTimes, FaPaperPlane, FaRobot } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 300);
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
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', content: 'An error occurred. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @keyframes chatOpen {
          from { opacity: 0; transform: translateY(16px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0)   scale(1);    }
        }
        @keyframes fabPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(124,58,237,0.45); }
          50%       { box-shadow: 0 0 0 10px rgba(124,58,237,0); }
        }
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40%           { transform: translateY(-6px); opacity: 1; }
        }
        .chatbox { animation: chatOpen 0.3s ease-out both; }
        .fab-pulse { animation: fabPulse 2.5s infinite; }
        .bounce-1 { animation: bounce 1.2s 0s infinite; }
        .bounce-2 { animation: bounce 1.2s 0.15s infinite; }
        .bounce-3 { animation: bounce 1.2s 0.3s infinite; }
        .msg-area::-webkit-scrollbar { width: 4px; }
        .msg-area::-webkit-scrollbar-track { background: transparent; }
        .msg-area::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 4px; }
      `}</style>

      <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[9999] flex flex-col items-end gap-3">

        {/* ═══ Chat Window ═══ */}
        {isOpen && (
          <div
            className="chatbox flex flex-col overflow-hidden mb-2"
            style={{
              width: 'min(400px, calc(100vw - 40px))',
              height: 'min(620px, calc(100vh - 140px))',
              borderRadius: '20px',
              background: '#0d0b1a',
              boxShadow: '0 25px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(139,92,246,0.15)',
            }}
          >

            {/* ── Header ── */}
            <div
              className="shrink-0"
              style={{
                background: 'linear-gradient(135deg, #6d28d9 0%, #4f46e5 60%, #7c3aed 100%)',
                padding: '20px',
                borderBottom: '1px solid rgba(255,255,255,0.15)',
                marginBottom: '1px'
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                    style={{
                      background: 'rgba(255,255,255,0.18)',
                      border: '1.5px solid rgba(255,255,255,0.3)',
                    }}
                  >
                    <FaRobot className="text-white text-[22px]" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-[17px] leading-snug" style={{ marginBottom: '2px' }}>Ecotrustia AI</h3>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                      <span className="text-white/60 text-[12px] font-medium">Online</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Close chat"
                >
                  <FaTimes className="text-[15px]" />
                </button>
              </div>
            </div>

            {/* ── Messages ── */}
            <div className="msg-area flex-1 overflow-y-auto overflow-x-hidden flex flex-col gap-4" style={{ padding: '20px' }}>
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className="max-w-[85%] text-[14px] leading-[1.7] break-words"
                    style={msg.role === 'user' ? {
                      padding: '12px 16px',
                      background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
                      color: '#fff',
                      borderRadius: '16px 16px 4px 16px',
                    } : {
                      padding: '12px 16px',
                      background: 'rgba(255,255,255,0.06)',
                      color: 'rgba(255,255,255,0.88)',
                      borderRadius: '16px 16px 16px 4px',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}
                  >
                    {msg.role === 'assistant' ? (
                      <div className="[&_p]:mb-3 last:[&_p]:mb-0 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-3 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-3 [&_li]:mb-1.5 [&_strong]:font-semibold [&_strong]:text-white [&_a]:text-violet-400 [&_a]:underline hover:[&_a]:text-violet-300 [&_code]:bg-black/20 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-[13px] [&_pre]:bg-black/20 [&_pre]:p-3 [&_pre]:rounded-lg [&_pre]:my-3 [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_h1]:text-lg [&_h1]:font-bold [&_h1]:mb-2 [&_h2]:text-base [&_h2]:font-bold [&_h2]:mb-2 [&_h3]:text-[15px] [&_h3]:font-bold [&_h3]:mb-2">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {msg.content}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      <span>{msg.content}</span>
                    )}
                  </div>
                </div>
              ))}

              {/* Typing */}
              {isLoading && (
                <div className="flex justify-start">
                  <div
                    className="flex items-center gap-[5px]"
                    style={{
                      padding: '12px 20px',
                      background: 'rgba(255,255,255,0.06)',
                      borderRadius: '16px 16px 16px 4px',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}
                  >
                    <span className="bounce-1 w-2 h-2 rounded-full bg-violet-400 inline-block" />
                    <span className="bounce-2 w-2 h-2 rounded-full bg-violet-400 inline-block" />
                    <span className="bounce-3 w-2 h-2 rounded-full bg-violet-400 inline-block" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* ── Quick Replies ── */}
            {messages.length === 1 && (
              <div className="flex flex-wrap gap-2.5" style={{ padding: '0 20px 20px 20px' }}>
                {['Our Services', 'AI Solutions', 'Get a Quote'].map((q) => (
                  <button
                    key={q}
                    onClick={() => { setInput(q); inputRef.current?.focus(); }}
                    className="text-[14px] font-medium rounded-full whitespace-nowrap transition-colors hover:bg-white/10"
                    style={{
                      padding: '10px 18px',
                      color: 'rgba(255,255,255,0.7)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      background: 'rgba(255,255,255,0.04)',
                    }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* ── Input ── */}
            <div className="shrink-0" style={{ padding: '16px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <form onSubmit={handleSend} className="flex items-center" style={{ gap: '12px' }}>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  className="flex-1 min-w-0 text-[14px] text-white placeholder-white/30 outline-none rounded-xl transition-colors"
                  style={{
                    padding: '14px 16px',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'rgba(139,92,246,0.4)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255,255,255,0.1)';
                  }}
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="rounded-xl flex items-center justify-center text-white shrink-0 transition-opacity disabled:opacity-30"
                  style={{
                    width: '46px',
                    height: '46px',
                    background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
                  }}
                >
                  <FaPaperPlane className="text-sm" />
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ═══ FAB Buttons ═══ */}
        <div className="flex flex-col items-center gap-3">
          {/* Chat FAB */}
          <div className="relative group">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Open AI Chatbot"
              className="fab-pulse w-[60px] h-[60px] rounded-full flex items-center justify-center text-white transition-transform duration-200 hover:scale-110 active:scale-95"
              style={{
                background: isOpen
                  ? 'linear-gradient(135deg, #4f46e5, #7c3aed)'
                  : 'linear-gradient(135deg, #7c3aed, #6d28d9)',
                boxShadow: '0 8px 32px rgba(124,58,237,0.4)',
              }}
            >
              {isOpen ? <FaTimes className="text-xl" /> : <FaRobot className="text-[26px]" />}
            </button>
            {!isOpen && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-emerald-400 border-2 border-[#0f172a] flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping absolute" />
              </span>
            )}
            <span
              className="absolute right-full mr-3 top-1/2 -translate-y-1/2 text-[12px] font-medium text-white px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
              style={{ background: 'rgba(0,0,0,0.8)' }}
            >
              {isOpen ? 'Close chat' : 'Ask AI Assistant'}
            </span>
          </div>

          {/* WhatsApp FAB */}
          <div className="relative group">
            <a
              href="https://wa.me/971557888645"
              target="_blank"
              rel="noopener noreferrer"
              className="w-[60px] h-[60px] rounded-2xl flex items-center justify-center text-white transition-transform duration-200 hover:scale-110 active:scale-95"
              style={{
                background: 'linear-gradient(135deg, #25D366, #128C7E)',
                boxShadow: '0 8px 28px rgba(37,211,102,0.3)',
              }}
            >
              <FaWhatsapp className="text-[30px]" />
            </a>
            <span
              className="absolute right-full mr-3 top-1/2 -translate-y-1/2 text-[12px] font-medium text-white px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
              style={{ background: 'rgba(0,0,0,0.8)' }}
            >
              Chat on WhatsApp
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
