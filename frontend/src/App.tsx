import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Components/pages
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/pages/Home';
import AddJob from './components/pages/AddJob';
import Login from './components/pages/Login';
import Profile from './components/pages/Profile';
import JobDetail from './components/pages/JobDetail';
import Register from './components/pages/Register';
import { AuthProvider } from './context/AuthContext';
// CSS
import './styles/globals.css';
// Routes
import { ROUTE_HOME, ROUTE_ADD_JOB, ROUTE_LOGIN, ROUTE_PROFILE, ROUTE_REGISTER, ROUTE_JOB_DETAIL } from './constants/constants';

const App: React.FC = () => {
    return (
        <AuthProvider>
            <Router>
                <div className="flex flex-col min-h-screen">
                    <Header />
                    <main className="flex-grow">
                        <Routes>
                            <Route path={ROUTE_HOME} element={<Home />} />
                            <Route path={ROUTE_ADD_JOB} element={<AddJob />} />
                            <Route path={ROUTE_LOGIN} element={<Login />} />
                            <Route path={ROUTE_PROFILE} element={<Profile />} />
                            <Route path={ROUTE_REGISTER} element={<Register />} />
                            <Route path={ROUTE_JOB_DETAIL} element={<JobDetail />} />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </Router>
        </AuthProvider>
    );
};

export default App;
