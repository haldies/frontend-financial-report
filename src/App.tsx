import { Routes, Route } from 'react-router-dom';
import HomePage from './page/HomePage';
import ChatbotPage from './page/ChatbotPage';


function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/chat" element={<ChatbotPage/> } />
  
    </Routes>
  );
}

export default App;
