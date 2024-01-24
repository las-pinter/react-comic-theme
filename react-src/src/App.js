import React from 'react';
import {
    BrowserRouter as Router,
    Navigate,
    Route,
    Routes
} from 'react-router-dom';

import './index.css';

import MainPage from './pages/MainPage';
import Post from './pages/Post';
import Page from './pages/Page';
import Comic from './pages/Comic';

import Navbar from "./components/Navbar";

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route exact path="/" element={<MainPage />} />
                <Route path="/:slug" element={<Post />} />
                <Route path="/page/:slug" element={<Page />} />
                <Route path="/comic/*" element={<Comic />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
}

export default App;