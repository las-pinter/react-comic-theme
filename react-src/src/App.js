import React from 'react';
import {
    BrowserRouter as Router,
    Navigate,
    Route,
    Routes
} from 'react-router-dom';
import './index.css';

import MainPage from './pages/MainPage';
import Single from './pages/Single';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<MainPage />} />
                <Route path="/:slug" element={<Single />} />
                <Route path="/page/:slug" element={<Single />} />
                <Route path="/comic/*" element={<Single />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
}

export default App;