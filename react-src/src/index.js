import React from 'react';
import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'
import './index.css';

import Archive from './templates/Archive';
import Single from './templates/Single';

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <Router>
      <Routes>
        <Route exact path="/" element={<Archive />} />
        <Route path="/search/:term" element={<Archive />} />
        <Route path="/page/:slug" element={<Single />} />
        <Route path="/post/:slug" element={<Single />} />
        <Route path="/search/:slug" element={<Single />} />
        <Route path="/post/" element={<Navigate to="/" replace />} />
        <Route path="/page/" element={<Navigate to="/" replace />} />
        <Route path="/search/" element={<Navigate to="/" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  </StrictMode>
);
