import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import StartPage from './pages/StartPage';
import NotFoundPage from './pages/NotFoundPage';
import CreateSetPage from './pages/CreateSetPage';
import HomePage from './pages/HomePage';
import LibraryPage from './pages/LibraryPage';

function App() {
    return (
        <Routes>
            <Route path="/" element={<StartPage />} />
            <Route path="/start" element={<StartPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/create" element={<CreateSetPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/library" element={<LibraryPage />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}

export default App;
