import './index.css'

import { createRef, useEffect, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import RestHandler from '../../rest/RestHandler';

type TSidebarItem = {
    id: string,
    id_base: string,
    rendered: string,
    sidebar: string,
    nodeRef: React.MutableRefObject<any>
};

type TSidebar = Array<TSidebarItem>;

interface ISidebadProps {
    sidebarId: string,
    background: boolean
};

const Sidebar = ({ sidebarId, background }: ISidebadProps): JSX.Element => {
    const [sidebar, setSidebar] = useState<TSidebar>([]);

    useEffect(() => {
        let url = '/wp-json/wp/v2/widgets?sidebar=' + sidebarId;

        RestHandler.get(url).then((response) => {
            let newSidebar: TSidebar = [];
            response.data.forEach((sidebarItem: TSidebarItem) => {
                let newSidebarItem = sidebarItem;
                newSidebarItem.nodeRef = createRef();
                newSidebar.push(newSidebarItem);
            })

            setSidebar(newSidebar);
        }).catch(() => {
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sidebarId])

    return (
        <TransitionGroup>
            {
                sidebar.map((item, i) => {
                    return (
                        <CSSTransition
                            classNames="fader"
                            timeout={3000}
                            nodeRef={item.nodeRef}
                            appear={true}
                            addEndListener={(done: () => void) => {
                                item.nodeRef.current?.addEventListener("transitionend", done, false);
                            }}
                            key={sidebarId + "_" + item.id}
                        >
                            <div
                                ref={item.nodeRef}
                                className={"sidebar-item" + (background ? " container-style" : "-no-background")}
                                dangerouslySetInnerHTML={{ __html: item.rendered }}
                            />
                        </CSSTransition>
                    )
                })
            }
        </TransitionGroup>

    );
};

export default Sidebar;