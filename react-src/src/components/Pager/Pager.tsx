import './index.css';

import { useCallback } from "react";

import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

interface IPagerProps {
    currentPage: number,
    totalPages: number,
    pagerChangedCallback: Function,
}

const Pager = ({ currentPage, totalPages, pagerChangedCallback }: IPagerProps): JSX.Element => {
    let handlePagerChanged = useCallback((value: number) => {
        pagerChangedCallback(value)
    }, [pagerChangedCallback]);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        handlePagerChanged(value);
    };

    return (
        <div className="pager container-style">
            <Stack spacing={2}>
                {
                    totalPages > 1
                        ?
                        <Pagination
                            count={totalPages}
                            page={currentPage}
                            size="large"
                            onChange={handleChange}
                            showFirstButton
                            showLastButton
                        />
                        :
                        <Pagination
                            count={5}
                            page={1}
                            size="large"
                            disabled
                            showFirstButton
                            showLastButton
                        />
                }
            </Stack>
        </div>
    );
}

export default Pager;