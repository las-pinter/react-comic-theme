import './index.css';
import './effects/index.css';

import {
    BrowserRouter as Router,
    Navigate,
    Route,
    Routes,
} from 'react-router-dom';

import PageRouter from './pages/PageRouter';

import ReactGA from 'react-ga4';

const App = () => {
    ReactGA.initialize('G-BS16XEB2VB');

    return (
        <Router>
            <Routes>
                <Route path="/" element={<PageRouter contextType={"mainPage"} />} />
                <Route path="/:slug" element={<PageRouter contextType={"post"} />} />
                <Route path="/page/:slug" element={<PageRouter contextType={"page"} />} />
                <Route path="/character/:slug" element={<PageRouter contextType={"character"} />} />
                <Route path="/comic/*" element={<PageRouter contextType={"comic"} />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
}

export default App;