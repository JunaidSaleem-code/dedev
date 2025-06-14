import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Posts from './pages/Posts';
import Profile from './pages/Profile';
import AdminPanel from './pages/AdminPanel';
import Navbar from './components/Navbar';

const AppContainer = styled.div`
  min-height: 100vh;
  background: #f5f6fa;
  font-family: 'Segoe UI', sans-serif;
`;

function App() {
  return (
    <Router>
      <Navbar />
      <AppContainer>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </AppContainer>
    </Router>
  );
}

export default App;
