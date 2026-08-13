import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from '@google/genai';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: 'Hello! I am the Modina AI Assistant. How can I help you today?' },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { role: 'user', text: userMessage }]);
    setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `You are a helpful customer support assistant for Modina Rim & Parts Ltd., an auto parts manufacturing company. 
        Answer the following user query briefly and professionally. 
        User query: ${userMessage}`,
      });

      setMessages((prev) => [
        ...prev,
        { role: 'bot', text: response.text || 'I am sorry, I could not process that request.' },
      ]);
    } catch (error) {
      console.error('Chatbot error:', error);
      setMessages((prev) => [
        ...prev,
        { role: 'bot', text: 'Sorry, I am having trouble connecting right now. Please try again later.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-modina-red rounded-full flex items-center justify-center shadow-[var(--shadow-lg)] z-50 text-white hover:bg-modina-red-dark transition-all duration-300 ease-in-out"
      >
        <MessageSquare className="w-6 h-6" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 w-[350px] sm:w-[400px] h-[500px] bg-white border border-modina-border rounded-xl shadow-[var(--shadow-lg)] z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-white border-b border-modina-border p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-modina-red rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-modina-heading text-sm">Modina Assistant</h3>
                  <p className="text-xs text-modina-success flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-modina-success inline-block" />
                    Online
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setMessages([{ role: 'bot', text: 'Hello! I am the Modina AI Assistant. How can I help you today?' }])}
                  className="text-modina-muted hover:text-modina-red transition-colors duration-200 p-1 text-xs font-medium"
                  title="Clear chat"
                >
                  Clear
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-modina-muted hover:text-modina-red transition-colors duration-200 p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-modina-bg-alt">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      msg.role === 'user' ? 'bg-modina-heading' : 'bg-modina-red'
                    }`}
                  >
                    {msg.role === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
                  </div>
                  <div
                    className={`p-3 rounded-2xl max-w-[80%] text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-modina-red text-white rounded-tr-none'
                        : 'bg-white border border-modina-border text-modina-text rounded-tl-none shadow-[var(--shadow-sm)]'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-modina-red flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="p-3 rounded-2xl bg-white border border-modina-border text-modina-muted rounded-tl-none shadow-[var(--shadow-sm)] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-modina-subtle rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-modina-subtle rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <span className="w-1.5 h-1.5 bg-modina-subtle rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-modina-border">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value.slice(0, 500))}
                    placeholder="Type your message..."
                    maxLength={500}
                    className="w-full bg-modina-bg-alt border border-modina-border rounded-xl px-4 py-2.5 text-sm text-modina-text focus:outline-none focus:border-modina-red focus:ring-2 focus:ring-modina-red/20 transition-all duration-200 placeholder:text-modina-subtle"
                  />
                  {input.length > 400 && (
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-modina-subtle">{500 - input.length}</span>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="w-10 h-10 bg-modina-red rounded-full flex items-center justify-center text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-modina-red-dark transition-all duration-200 ease-in-out shrink-0"
                >
                  <Send className="w-4 h-4 ml-0.5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
