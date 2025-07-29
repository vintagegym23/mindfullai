import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Message } from '../../types'; // fixed import path
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isBot = message.sender === 'bot';
  const timestamp = new Date(message.timestamp);

  return (
    <div className={`flex w-full mb-4 ${isBot ? 'justify-start' : 'justify-end'}`}>
      <div
        className={`flex max-w-[80%] ${
          isBot ? 'bg-white border border-gray-200' : 'bg-primary-500 text-white'
        } rounded-lg px-4 py-3 shadow-sm`}
      >
        <div className="flex-shrink-0 mr-3">
          {isBot ? (
            <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
              <Bot className="h-5 w-5 text-primary-500" />
            </div>
          ) : (
            <div className="w-8 h-8 rounded-full bg-primary-200 flex items-center justify-center">
              <User className="h-5 w-5 text-primary-700" />
            </div>
          )}
        </div>

        <div className="flex-1">
          <div className="flex items-center mb-1">
            <span className={`font-medium text-sm ${isBot ? 'text-gray-900' : 'text-white'}`}>
              {isBot ? 'Mindful AI' : 'You'}
            </span>
            <span className={`text-xs ml-2 ${isBot ? 'text-gray-500' : 'text-primary-200'}`}>
              {formatDistanceToNow(timestamp, { addSuffix: true })}
            </span>
          </div>

          <p className={`text-sm ${isBot ? 'text-gray-700' : 'text-white'}`}>
            {message.content}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
