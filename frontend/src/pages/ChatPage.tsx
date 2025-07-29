// src/pages/ChatPage.tsx
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import ChatMessage from '../components/chat/ChatMessage';
import ChatInput from '../components/chat/ChatInput';
import { Message } from '../types';
import { sendMessage, getMessages } from '../services/api';

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedSessionId = localStorage.getItem('chatSessionId');
    if (savedSessionId) {
      setSessionId(savedSessionId);
      getMessages(savedSessionId)
        .then(setMessages)
        .catch((error) => {
          console.error('Error loading messages:', error);
          localStorage.removeItem('chatSessionId');
          setSessionId(null);
        });
    } else {
      const welcomeMessage: Message = {
        id: 'welcome',
        content: "Hello! I'm Mindful AI, your AI companion for mental well-being. How are you feeling today?",
        sender: 'bot',
        timestamp: new Date().toISOString(),
      };
      setMessages([welcomeMessage]);
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await sendMessage(content, sessionId || undefined);

      if (!sessionId && response.session_id) {
        setSessionId(response.session_id);
        localStorage.setItem('chatSessionId', response.session_id);
      }

      const botMessage: Message = {
        id: Date.now().toString() + '-response',
        content: response.reply,
        sender: 'bot',
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: Date.now().toString() + '-error',
        content: 'Sorry, I encountered an error. Please try again.',
        sender: 'bot',
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateReport = async () => {
    try {
      const response = await fetch('http://localhost:5000/generate-report', { method: 'POST' });
      const result = await response.json();
      alert(result.status === 'success' ? 'Report generated! Visit the Reports page to view it.' : 'Failed to generate report.');
    } catch (error) {
      console.error(error);
      alert('An error occurred while generating the report.');
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px-72px)]">
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="container mx-auto flex items-center">
          <Link to="/" className="text-gray-600 hover:text-gray-900 mr-4">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-xl font-semibold">Chat with Mindful AI</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-gray-50 p-4">
        <div className="container mx-auto max-w-3xl">
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <ChatMessage message={message} />
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="container mx-auto max-w-3xl p-4">
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={handleGenerateReport}
        >
          Generate Report
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
