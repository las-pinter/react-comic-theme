import './index.css'

import { useEffect, useState } from 'react';
import Axios from 'axios';

interface ISidebadProps {
    sidebarId: string,
    background: boolean
}

const Sidebar = ({ sidebarId, background }: ISidebadProps): JSX.Element => {
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
                    return <div
                        key={sidebarId + "_" + item['id']}
                        className={"sidebar-item" + (background ? "" : "-no-background") + " container-style"}
                        dangerouslySetInnerHTML={{ __html: item['rendered'] }}
                    />
                })
            }
        </>
    );
};

export default Sidebar;