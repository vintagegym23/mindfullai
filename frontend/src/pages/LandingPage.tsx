import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Shield, LineChart, Users, Activity, ArrowRight } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const LandingPage: React.FC = () => {
  return (
    <div className="page-transition">
      {/* Hero Section */}
      <section className="pt-32 pb-24 bg-gradient-to-b from-primary-50 to-white dark:from-gray-900 dark:to-gray-900">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
              Track Your Mental Wellness with <span className="text-primary-500">AI</span>
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
              Gain personalized insights, track your mental health progress, and receive AI-powered recommendations to improve your well-being.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/signup">
                <Button size="lg">
                  Get Started
                </Button>
              </Link>
              <Link to="/features">
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="heading-2 text-gray-900 dark:text-white mb-4">
              Comprehensive Mental Wellness Tools
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Our platform provides everything you need to monitor and improve your mental health.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <Card className="text-center p-8">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-300 mb-4">
                <Brain size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                AI-Powered Analysis
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Our advanced AI analyzes patterns in your mental health data to provide personalized insights.
              </p>
            </Card>

            {/* Feature 2 */}
            <Card className="text-center p-8">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-secondary-100 dark:bg-secondary-900/30 text-secondary-600 dark:text-secondary-300 mb-4">
                <Shield size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Private & Secure
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Your data is encrypted and protected. We prioritize your privacy and security.
              </p>
            </Card>

            {/* Feature 3 */}
            <Card className="text-center p-8">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-300 mb-4">
                <LineChart size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Comprehensive Tracking
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Track your moods, sleep patterns, stress levels, and other factors affecting your mental wellness.
              </p>
            </Card>

            {/* Feature 4 */}
            <Card className="text-center p-8">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-success-100 dark:bg-success-900/30 text-success-600 dark:text-success-300 mb-4">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Community Support
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Connect with others on similar journeys and access peer support when you need it.
              </p>
            </Card>

            {/* Feature 5 */}
            <Card className="text-center p-8">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-warning-100 dark:bg-warning-900/30 text-warning-600 dark:text-warning-300 mb-4">
                <Activity size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Personalized Plans
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Receive tailored recommendations and action plans based on your unique needs and goals.
              </p>
            </Card>

            {/* Feature 6 */}
            <Card className="text-center p-8">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-300 mb-4">
                <Brain size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Evidence-Based Approach
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Our methods are backed by scientific research and developed with mental health professionals.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="heading-2 text-gray-900 dark:text-white mb-4">
              Trusted by Thousands
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              See how Mindful AI has helped people improve their mental wellness.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 mr-4">
                  <img 
                    src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                    alt="User avatar" 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Sarah J.</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Marketing Executive</p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                "This app has completely changed how I approach my mental health. The insights are spot-on, and I love how it helps me identify patterns I wasn't aware of."
              </p>
            </Card>

            {/* Testimonial 2 */}
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 mr-4">
                  <img 
                    src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                    alt="User avatar" 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Michael T.</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Software Engineer</p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                "As someone who's always been skeptical of mental health apps, I'm impressed. The AI recommendations are thoughtful and have genuinely helped improve my daily habits."
              </p>
            </Card>

            {/* Testimonial 3 */}
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 mr-4">
                  <img 
                    src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                    alt="User avatar" 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Priya K.</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Healthcare Professional</p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                "I recommend Mindful AI to my patients. It's an excellent complementary tool that helps them track progress between sessions and provides valuable insights."
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600 dark:bg-primary-900">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Start Your Mental Wellness Journey Today
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Join thousands of users who have improved their mental health with Mindful AI.
            </p>
            <Link to="/signup">
              <Button size="lg" className="bg-white text-primary-600 hover:bg-primary-50">
                <span>Get Started</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;