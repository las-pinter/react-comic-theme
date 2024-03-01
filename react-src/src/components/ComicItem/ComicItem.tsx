import './index.css';

import { ForwardedRef, forwardRef, useState } from "react";
import { Link } from "react-router-dom";

export type TComicItem = {
    name: string,
    slug: string,
    permalink: string,
    thumbnail: string
}

export interface IComicItemNodeRef extends TComicItem {
    nodeRef: React.MutableRefObject<any>
}

interface IArchiveComicItemProps {
    comic: TComicItem,
    number: number
}

const getHoverClass = (hoverItem: number) => {
    switch (hoverItem) {
        case 0:
            return "";
        case 1:
            return " hovered";
        case 2:
            return " non-hovered";
        default:
            return "";
    }
}

export const ArchiveComicItem = forwardRef(({ comic, number }: IArchiveComicItemProps, ref: ForwardedRef<any>): JSX.Element => {
    const [hover, setHover] = useState({
        itemWrapper: 0,
        item: 0,
        nameWrapper: 0,
        name: 0
    });

    return (
        <Link
            ref={ref}
            className={"archive-comic-item-wrapper" + getHoverClass(hover.itemWrapper)}
            to={comic.permalink}
            onMouseEnter={() => {
                setHover((prevState) => {
                    return {
                        ...prevState,
                        itemWrapper: 1
                    }
                })
            }}
            onMouseLeave={() => {
                setHover((prevState) => {
                    return {
                        ...prevState,
                        itemWrapper: 2
                    }
                })
            }}
        >
            <div
                className={"archive-comic-item" + getHoverClass(hover.item)}
                onMouseEnter={() => {
                    setHover((prevState) => {
                        return {
                            ...prevState,
                            item: 1
                        }
                    })
                }}
                onMouseLeave={() => {
                    setHover((prevState) => {
                        return {
                            ...prevState,
                            item: 2
                        }
                    })
                }}
            >
                <div className="archive-comic-item-thumbnail">
                    {
                        comic.thumbnail ?
                            <img
                                src={comic.thumbnail}
                                alt={comic.name}
                            /> :
                            <div className="gray-placeholder"></div>
                    }
                </div>
                <div
                    className={"archive-comic-item-name-wrapper container-vertical" + getHoverClass(hover.nameWrapper)}
                    onMouseEnter={() => {
                        setHover((prevState) => {
                            return {
                                ...prevState,
                                nameWrapper: 1
                            }
                        })
                    }}
                    onMouseLeave={() => {
                        setHover((prevState) => {
                            return {
                                ...prevState,
                                nameWrapper: 2
                            }
                        })
                    }}
                >
                    <div
                        className={"archive-comic-item-name" + getHoverClass(hover.name)}
                        title={comic.name}
                        onMouseEnter={() => {
                            setHover((prevState) => {
                                return {
                                    ...prevState,
                                    name: 1
                                }
                            })
                        }}
                        onMouseLeave={() => {
                            setHover((prevState) => {
                                return {
                                    ...prevState,
                                    name: 2
                                }
                            })
                        }}
                    >
                        {comic.name}
                    </div>
                </div>
                <div className="archive-comic-item-number-wrapper">
                    <div className="archive-comic-item-number">{number}</div>
                </div>
            </div>
        </Link>
    );
});

interface ICharacterComicItemProps {
    comic: TComicItem
}

export const CharacterComicItem = forwardRef(({ comic }: ICharacterComicItemProps, ref: ForwardedRef<any>): JSX.Element => {
    const [hover, setHover] = useState({
        itemWrapper: 0,
        item: 0,
        nameWrapper: 0,
        name: 0
    });

    return (
        <Link
            ref={ref}
            className={"character-comic-item-wrapper" + getHoverClass(hover.itemWrapper)}
            to={comic.permalink}
            onMouseEnter={() => {
                setHover((prevState) => {
                    return {
                        ...prevState,
                        itemWrapper: 1
                    }
                })
            }}
            onMouseLeave={() => {
                setHover((prevState) => {
                    return {
                        ...prevState,
                        itemWrapper: 2
                    }
                })
            }}
        >
            <div
                className={"character-comic-item" + getHoverClass(hover.item)}
                onMouseEnter={() => {
                    setHover((prevState) => {
                        return {
                            ...prevState,
                            item: 1
                        }
                    })
                }}
                onMouseLeave={() => {
                    setHover((prevState) => {
                        return {
                            ...prevState,
                            item: 2
                        }
                    })
                }}
            >
                <div className="character-comic-item-thumbnail">
                    {
                        comic.thumbnail ?
                            <img
                                src={comic.thumbnail}
                                alt={comic.name}
                            /> :
                            <div className="gray-placeholder"></div>
                    }
                </div>
                <div
                    className={"character-comic-item-name-wrapper container-vertical" + getHoverClass(hover.nameWrapper)}
                    onMouseEnter={() => {
                        setHover((prevState) => {
                            return {
                                ...prevState,
                                nameWrapper: 1
                            }
                        })
                    }}
                    onMouseLeave={() => {
                        setHover((prevState) => {
                            return {
                                ...prevState,
                                nameWrapper: 2
                            }
                        })
                    }}
                >
                    <div
                        className={"character-comic-item-name"+ getHoverClass(hover.name)}
                        title={comic.name}
                        onMouseEnter={() => {
                            setHover((prevState) => {
                                return {
                                    ...prevState,
                                    name: 1
                                }
                            })
                        }}
                        onMouseLeave={() => {
                            setHover((prevState) => {
                                return {
                                    ...prevState,
                                    name: 2
                                }
                            })
                        }}
                    >
                        {comic.name}
                    </div>
                </div>
            </div>
        </Link>
    );
});

export default ArchiveComicItem;