import React,
{ useEffect } from 'react';

import './index.css'
import WithConsumer from '../../wrappers/WithConsumer';

const Sidebar = ({ context, sidebarId }) => {
    useEffect(() => {
        context.getSidebar(sidebarId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {
                (() => {
                    if (context.sidebars[sidebarId]) {
                        return context.sidebars[sidebarId].map((item, i) => {
                            return <div key={sidebarId + "_" + item['id']} className="sidebar-item" dangerouslySetInnerHTML={{ __html: item['rendered'] }}></div>
                        })
                    }
                })()
            }
        </>
    );
};

export default WithConsumer(Sidebar);