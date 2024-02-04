import React from 'react';
import { Link } from 'react-router-dom';

import WithConsumer from '../../context/WithConsumer';

import './index.css'

const Sidebar = ({ index, context }) => {
    return (
        <>
            <div className="sidebar-item">a</div>
            <div className="sidebar-item">b</div>
            <div className="sidebar-item">c</div>
            <div className="sidebar-item">d</div>
            <div className="sidebar-item">e</div>
            <div className="sidebar-item">f</div>
            <div className="sidebar-item">g</div>
        </>
    );
};

export default WithConsumer(Sidebar);