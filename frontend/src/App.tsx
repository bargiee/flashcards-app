import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import StartPage from './pages/StartPage';
import NotFoundPage from './pages/NotFoundPage';
import CreateSetPage from './pages/CreateSetPage';
import HomePage from './pages/HomePage';
import LibraryPage from './pages/LibraryPage';
import PrivateRoute from './routes/PrivateRoute';
import AppToaster from './components/AppToaster';

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<StartPage />} />
                <Route path="/start" element={<StartPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route
                    path="/home"
                    element={
                        <PrivateRoute>
                            <HomePage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/library"
                    element={
                        <PrivateRoute>
                            <LibraryPage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/create"
                    element={
                        <PrivateRoute>
                            <CreateSetPage />
                        </PrivateRoute>
                    }
                />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <AppToaster />
        </>
    );
}
export default App;
