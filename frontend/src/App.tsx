import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Components/pages
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/pages/Home';
import AddJob from './components/pages/AddJob';
import Login from './components/pages/Login';
import JobDetail from './components/pages/JobDetail';
import Register from './components/pages/Register';
import UserDetail from './components/pages/UserDetail';
import { AboutUs, Contact, PrivacyPolicy } from './components/pages/static/static';
// Private Route
import PrivateRoute from './components/PrivateRoute';
// Context
import { AuthProvider } from './context/AuthContext';

// CSS
import './styles/globals.css';
// Routes
import {
    ROUTE_HOME,
    ROUTE_ADD_JOB,
    ROUTE_LOGIN,
    ROUTE_REGISTER,
    ROUTE_JOB_DETAIL,
    ROUTE_USER_DETAIL,
    ROUTE_ABOUT_US,
    ROUTE_PRIVACY_POLICY,
    ROUTE_CONTACT,
} from './constants/constants';

/**
 * The main application component that sets up routing, authentication context, and the overall layout.
 * The `AuthProvider` wraps the application to provide authentication context across all components.
 *
 * @component
 * @returns {JSX.Element} The rendered App component.
 */
const App: React.FC = () => {
    return (
        <AuthProvider>
            <Router>
                <div className="flex flex-col min-h-screen">
                    <Header />
                    <main className="flex-grow">
                        <Routes>
                            <Route path={ROUTE_HOME} element={<Home />} />
                            <Route
                                path={ROUTE_ADD_JOB}
                                element={
                                    <PrivateRoute>
                                        <AddJob />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path={ROUTE_USER_DETAIL}
                                element={
                                    <PrivateRoute>
                                        <UserDetail />
                                    </PrivateRoute>
                                }
                            />
                            <Route path={ROUTE_LOGIN} element={<Login />} />
                            <Route path={ROUTE_REGISTER} element={<Register />} />
                            <Route path={ROUTE_JOB_DETAIL} element={<JobDetail />} />
                            <Route path={ROUTE_ABOUT_US} element={<AboutUs />} />
                            <Route path={ROUTE_CONTACT} element={<Contact />} />
                            <Route path={ROUTE_PRIVACY_POLICY} element={<PrivacyPolicy />} />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </Router>
        </AuthProvider>
    );
};

export default App;
