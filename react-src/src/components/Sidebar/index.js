import React,
{
    useEffect,
    useState
} from 'react';
import Axios from 'axios';

import './index.css'

const Sidebar = ({ sidebarId }) => {
    const [sidebar, setSidebar] = useState([]);

    useEffect(() => {
        let url = '/wp-json/wp/v2/widgets?sidebar=' + sidebarId;

        Axios.get(url).then((response) => {
            setSidebar(response.data);
        }).catch(() => {
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sidebarId])

    return (
        <>
            {
                sidebar.map((item, i) => {
                    return <div key={sidebarId + "_" + item['id']} className="sidebar-item" dangerouslySetInnerHTML={{ __html: item['rendered'] }}></div>
                })
            }
        </>
    );
};

export default Sidebar;