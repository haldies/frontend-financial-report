import { Routes, Route } from 'react-router-dom';
import Chatbot from './page/ChatbotPage';
import HomePage from './page/HomePage';


function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/chat" element={<Chatbot/> } />
    </Routes>
  );
}

export default App;
