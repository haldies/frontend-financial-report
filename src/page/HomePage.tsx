import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiDollarSign,
  FiMessageSquare,
  FiFileText,
  FiCheckCircle,
  FiBookOpen,
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
    }, 0);
    navigate('/chat');
  };

  return (
    <div className="bg-gray-50">
      <Header />

      {/* Hero Section Utama */}
      <div className="relative bg-gradient-to-r pt-24 from-teal-600 to-emerald-700 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20">
            <main className="flex justify-center mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 lg:mt-16 lg:px-8 xl:mt-20">
              <div className="sm:text-center">
                <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                  <span className="block">Laporan Keuangan</span>
                  <span className="block text-teal-100">Analisis Chatbot AI</span>
                </h1>
                <p className="mt-3 text-base text-teal-100 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Chatbot AI kami menyederhanakan analisis laporan keuangan. Dapatkan wawasan instan, tren, dan rekomendasi melalui percakapan alami.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center">
                  <div className="rounded-md shadow">
                    <button
                      onClick={handleAnalyzeClick}
                      disabled={isAnalyzing}
                      className={`w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-teal-800 bg-teal-100 hover:bg-teal-50 md:py-4 md:text-lg md:px-10 transition-colors duration-200 ${
                        isAnalyzing ? 'opacity-75 cursor-not-allowed' : ''
                      }`}
                    >
                      {isAnalyzing ? (
                        <span className="flex items-center">
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-teal-800"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Menganalisis...
                        </span>
                      ) : (
                        <>
                          <FiMessageSquare className="mr-2" />
                          Chat dengan Analis AI
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
            <h2 className="text-base text-emerald-600 font-semibold tracking-wide uppercase">
              Fitur Utama
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-800 sm:text-4xl">
              Analisis Keuangan Percakapan
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-600 lg:mx-auto">
              Chatbot AI kami memahami pertanyaan Anda dan memberikan wawasan keuangan yang mendetail.
            </p>
          </div>

          <div className="mt-10 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-emerald-100 text-emerald-600">
                    <feature.icon className="h-6 w-6" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-800">
                    {feature.name}
                  </h3>
                  <p className="mt-2 text-base text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-12">
            <h2 className="text-base text-gray-600 font-semibold tracking-wide uppercase">
              Cara Kerja
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-800 sm:text-4xl">
              Proses Tiga Langkah Sederhana
            </p>
          </div>
          <div className="mt-10 grid gap-10 md:grid-cols-3">
            {howToUse.map((step) => (
              <div
                key={step.name}
                className="relative bg-white p-6 rounded-lg shadow-sm border border-gray-100"
              >
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-emerald-100 text-emerald-600 mb-4">
                  <step.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">
                  {step.name}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-teal-500 to-emerald-600">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <div
            style={{ transform: 'translateX(0)', opacity: 1, transitionDuration: '0.8s' }}
          >
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              <span className="block">Siap mengubah</span>
              <span className="block text-teal-100">
                alur kerja analisis keuangan Anda?
              </span>
            </h2>
            <p className="mt-3 max-w-3xl text-lg text-teal-100">
              Mulai uji coba gratis Anda hari ini dan rasakan wawasan keuangan yang didukung AI.
            </p>
          </div>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0 space-x-4">
            <div className="inline-flex rounded-md shadow">
              <button
                onClick={handleAnalyzeClick}
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-emerald-700 bg-white hover:bg-gray-50 transition-colors duration-200"
              >
                <FiMessageSquare className="mr-2" />
                Mulai Chatting
              </button>
            </div>
            <div className="inline-flex rounded-md shadow">
              <button className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-emerald-600 bg-opacity-80 hover:bg-opacity-90 transition-colors duration-200">
                <FiFileText className="mr-2" />
                Pelajari Lebih Lanjut
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

const features = [
  {
    name: 'Kueri Bahasa Alami',
    description: 'Ajukan pertanyaan tentang laporan keuangan Anda dan dapatkan jawaban terperinci.',
    icon: FiMessageSquare,
  },
  {
    name: 'Penjelasan Istilah Keuangan',
    description:
      'Chatbot membantu menjelaskan istilah dan konsep keuangan yang ada di laporan Anda secara sederhana dan mudah dipahami.',
    icon: FiBookOpen,
  },
  {
    name: 'Analisis Laporan Laba Rugi',
    description: 'Perincian mendetail tentang pendapatan, biaya, dan laba.',
    icon: FiDollarSign,
  },
];

const howToUse = [
  {
    name: 'Unggah Laporan Anda',
    description: 'Unggah laporan keuangan Anda dengan aman dalam format PDF',
    icon: FiFileText,
  },
  {
    name: 'Chat dengan Analis AI',
    description: 'Ajukan pertanyaan tentang data keuangan Anda dalam bahasa alami.',
    icon: FiMessageSquare,
  },
  {
    name: 'Dapatkan Wawasan',
    description: 'Terima analisis terperinci',
    icon: FiCheckCircle,
  },
];
