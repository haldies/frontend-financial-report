import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiTrendingUp,
  FiBarChart2,
  FiAward,
  FiZap,
  FiDollarSign,
  FiMessageSquare,
  FiFileText,
  FiCheckCircle,
} from 'react-icons/fi';
import Header from '../component/Header';
import Footer from '../component/Footer';


export default function HomePage() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const navigate = useNavigate();
  const handleAnalyzeClick = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 1000);
    navigate('/chat');
  };

  return (
    <div className="min-h-screen bg-blue-50">
      <Header />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-500 to-blue-600 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20">
            <main className="flex justify-center mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 lg:mt-16 lg:px-8 xl:mt-20">
              <div className="sm:text-center ">
                <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                  <span className="block">Financial Report</span>
                  <span className="block text-blue-100">AI Chatbot Analysis</span>
                </h1>
                <p className="mt-3 text-base text-blue-100 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Our AI chatbot simplifies financial report analysis. Get instant insights, trends, and recommendations through natural conversation.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center">
                  <div className="rounded-md shadow">
                    <button
                      onClick={handleAnalyzeClick}
                      disabled={isAnalyzing}
                      className={`w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-50 md:py-4 md:text-lg md:px-10 transition-colors duration-200 ${isAnalyzing ? 'opacity-75 cursor-not-allowed' : ''
                        }`}
                    >
                      {isAnalyzing ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Analyzing...
                        </span>
                      ) : (
                        <>
                          <FiMessageSquare className="mr-2" />
                          Chat with AI Analyst
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-500 font-semibold tracking-wide uppercase">
              Features
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-blue-500 sm:text-4xl">
              Conversational Financial Analysis
            </p>
            <p className="mt-4 max-w-2xl text-xl text-blue-400 lg:mx-auto">
              Our AI chatbot understands your questions and provides detailed financial insights.
            </p>
          </div>

          <div className="mt-10">
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.name} className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-blue-500">
                      <feature.icon className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg leading-6 font-medium text-blue-500">
                      {feature.name}
                    </h3>
                    <p className="mt-2 text-base text-blue-400">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-12 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-12">
            <h2 className="text-base text-blue-400 font-semibold tracking-wide uppercase">
              How It Works
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-blue-500 sm:text-4xl">
              Simple Three-Step Process
            </p>
          </div>
          <div className="mt-10">
            <div className="grid gap-10 md:grid-cols-3">
              {howToUse.map((step) => (
                <div key={step.name} className="relative bg-white p-6 rounded-lg shadow-sm border border-blue-100">

                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-blue-500 mb-4">
                    <step.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-medium text-blue-500 mb-2">
                    {step.name}
                  </h3>
                  <p className="text-blue-400">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-400 to-blue-500">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              <span className="block">Ready to transform your</span>
              <span className="block text-blue-100">
                financial analysis workflow?
              </span>
            </h2>
            <p className="mt-3 max-w-3xl text-lg text-blue-100">
              Start your free trial today and experience AI-powered financial insights.
            </p>
          </div>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0 space-x-4">
            <div className="inline-flex rounded-md shadow">
              <button
                onClick={handleAnalyzeClick}
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-500 bg-white hover:bg-blue-50 transition-colors duration-200"
              >
                <FiMessageSquare className="mr-2" />
                Start Chatting
              </button>
            </div>
            <div className="inline-flex rounded-md shadow">
              <button className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-500 bg-opacity-60 hover:bg-opacity-70 transition-colors duration-200">
                <FiFileText className="mr-2" />
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

// Features data
const features = [
  {
    name: 'Natural Language Queries',
    description: 'Ask questions about your financial reports in plain English and get detailed answers.',
    icon: FiMessageSquare,
  },
  {
    name: 'Automated Insights',
    description: 'Get automatic highlights of key financial metrics and potential concerns.',
    icon: FiZap,
  },
  {
    name: 'Visual Analytics',
    description: 'Interactive charts and graphs generated from your financial data.',
    icon: FiBarChart2,
  },
  {
    name: 'Trend Analysis',
    description: 'Identify patterns and trends across multiple reporting periods.',
    icon: FiTrendingUp,
  },
  {
    name: 'Benchmarking',
    description: 'Compare your performance against industry standards.',
    icon: FiAward,
  },
  {
    name: 'Cash Flow Analysis',
    description: 'Detailed breakdowns of cash inflows and outflows.',
    icon: FiDollarSign,
  },
];

// How it works steps
const howToUse = [
  {
    name: 'Upload Your Reports',
    description: 'Securely upload your financial statements in PDF, Excel, or other formats.',
    icon: FiFileText,
  },
  {
    name: 'Chat with AI Analyst',
    description: 'Ask questions about your financial data in natural language.',
    icon: FiMessageSquare,
  },
  {
    name: 'Get Insights',
    description: 'Receive detailed analysis, visualizations, and recommendations.',
    icon: FiCheckCircle,
  },
];
