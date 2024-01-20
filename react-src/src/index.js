import React from 'react';
import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'
import './index.css';

import MainPage from './templates/MainPage';
import Single from './templates/Single';

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <Router>
      <Routes>
        <Route exact path="/" element={<MainPage />} />
        <Route path="/:slug" element={<Single />} />
        <Route path="/page/:slug" element={<Single />} />
        <Route path="/comic/*" element={<Single />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  </StrictMode>
);
