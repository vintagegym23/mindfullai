import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MessageSquare, BarChart2, FileText } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Welcome to <span className="text-primary-500">Mindful AI</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Your compassionate companion for mental well-being. Chat with our AI, gain insights, and take steps towards a healthier mind.
            </p>
            <Link 
              to="/chat"
              className="inline-flex items-center px-6 py-3 bg-primary-500 text-white font-medium rounded-lg shadow-md hover:bg-primary-600 transition-colors duration-200"
            >
              Start a Conversation
              <MessageSquare className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How Mindful AI Helps You</h2>
            <p className="text-lg text-gray-600">
              Discover our key features designed to support your mental wellness journey
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Feature 1 */}
            <motion.div 
              className="bg-white rounded-xl shadow-soft p-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-8 w-8 text-primary-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">AI Chatbot</h3>
              <p className="text-gray-600">
                Engage in empathetic conversations with our AI, designed to listen and support you.
              </p>
            </motion.div>
            
            {/* Feature 2 */}
            <motion.div 
              className="bg-white rounded-xl shadow-soft p-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart2 className="h-8 w-8 text-primary-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Emotion Analysis</h3>
              <p className="text-gray-600">
                Visualize your emotional journey and understand trends over time through intuitive charts.
              </p>
            </motion.div>
            
            {/* Feature 3 */}
            <motion.div 
              className="bg-white rounded-xl shadow-soft p-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-primary-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Summary Reports</h3>
              <p className="text-gray-600">
                Receive personalized summaries of your sessions, highlighting key insights and progress.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-500 to-primary-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to start your wellness journey?</h2>
            <p className="text-xl mb-8 opacity-90">
              Begin chatting with Mindful AI today and take the first step towards better mental health.
            </p>
            <Link 
              to="/chat"
              className="inline-flex items-center px-6 py-3 bg-white text-primary-600 font-medium rounded-lg shadow-md hover:bg-gray-100 transition-colors duration-200"
            >
              Start Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;