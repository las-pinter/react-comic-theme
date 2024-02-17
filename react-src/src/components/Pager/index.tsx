interface IPagerProps {
    currentPage: number,
    totalPages: number,
    nextClickedCallback: Function,
    previousClickedCallback: Function
}

const Pager = ({ currentPage, totalPages, nextClickedCallback, previousClickedCallback }: IPagerProps): JSX.Element => {
    const postsNextClicked = () => {
        nextClickedCallback();
    }

    const postsPreviousClicked = () => {
        previousClickedCallback();
    }

    let thePager = <></>;

    if (totalPages > 1) {
        thePager = (
            <div className="pager">
                <button
                    disabled={currentPage <= 1}
                    onClick={postsPreviousClicked}
                >
                    Previous
                </button>
                <button
                    disabled={currentPage >= totalPages}
                    onClick={postsNextClicked}
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