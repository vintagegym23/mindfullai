import React from 'react';
import { Quote } from 'lucide-react';
import Card from '../ui/Card';

interface QuoteOfDayProps {
  quote?: string;
  author?: string;
}

// Array of wellness quotes
const wellnessQuotes = [
  {
    quote: "Self-care is not self-indulgence, it's self-preservation.",
    author: "Audre Lorde"
  },
  {
    quote: "You don't have to control your thoughts. You just have to stop letting them control you.",
    author: "Dan Millman"
  },
  {
    quote: "Mental health is not a destination, but a process. It's about how you drive, not where you're going.",
    author: "Noam Shpancer"
  },
  {
    quote: "You are not your illness. You have an individual story to tell. You have a name, a history, a personality.",
    author: "Julian Seifter"
  },
  {
    quote: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    author: "Nelson Mandela"
  },
  {
    quote: "Happiness can be found even in the darkest of times, if one only remembers to turn on the light.",
    author: "J.K. Rowling"
  },
  {
    quote: "There is hope, even when your brain tells you there isn't.",
    author: "John Green"
  }
];

// Get a random quote
const getRandomQuote = () => {
  const randomIndex = Math.floor(Math.random() * wellnessQuotes.length);
  return wellnessQuotes[randomIndex];
};

const QuoteOfDay: React.FC<QuoteOfDayProps> = ({ 
  quote, 
  author 
}) => {
  // If no quote provided, use a random one
  const quoteData = quote && author ? { quote, author } : getRandomQuote();

  return (
    <Card className="bg-white dark:bg-gray-800">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center space-x-2">
          <Quote className="h-5 w-5 text-accent-500" />
          <h3 className="text-sm font-medium text-gray-900 dark:text-white">Thought of the Day</h3>
        </div>
        
        <blockquote className="relative">
          <p className="text-gray-700 dark:text-gray-300 text-lg italic leading-relaxed">
            "{quoteData.quote}"
          </p>
          <footer className="mt-2 text-right text-sm text-gray-600 dark:text-gray-400">
            — {quoteData.author}
          </footer>
        </blockquote>
      </div>
    </Card>
  );
};

export default QuoteOfDay;