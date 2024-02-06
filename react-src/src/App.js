import React from 'react';
import {
    BrowserRouter as Router,
    Navigate,
    Route,
    Routes
} from 'react-router-dom';

import './index.css';

import PageRouter from './pages/PageRouter';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<PageRouter />} />
                <Route path="/:slug" element={<PageRouter />} />
                <Route path="/page/:slug" element={<PageRouter />} />
                <Route path="/comic/*" element={<PageRouter />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
}

export default App;