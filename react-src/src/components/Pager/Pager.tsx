import { useCallback } from "react";

interface IPagerProps {
    currentPage: number,
    totalPages: number,
    nextClickedCallback: Function,
    previousClickedCallback: Function
}

const Pager = ({ currentPage, totalPages, nextClickedCallback, previousClickedCallback }: IPagerProps): JSX.Element => {
    let handleNextClicked = useCallback(() => nextClickedCallback(), [nextClickedCallback]);
    let handlePreviousClicked = useCallback(() => previousClickedCallback(), [previousClickedCallback]);

    let thePager = <></>;

    if (totalPages > 1) {
        thePager = (
            <div className="pager container-style">
                <button
                    disabled={currentPage <= 1}
                    onClick={handlePreviousClicked}
                >
                    Previous
                </button>
                <button
                    disabled={currentPage >= totalPages}
                    onClick={handleNextClicked}
                >
                    Next
                </button>
                <div className="pager-text">
                    Page{' '}
                    <span dangerouslySetInnerHTML={{ __html: currentPage.toString() }} />
                    {' '}/{' '}
                    <span dangerouslySetInnerHTML={{ __html: totalPages.toString() }} />
                </div>
            </div>
        );
    }

    return thePager;
}

export default Pager;