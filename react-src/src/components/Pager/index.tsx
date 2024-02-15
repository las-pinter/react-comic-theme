import WithConsumer, { IConsumerProps } from '../../wrappers/WithConsumer';

const Pager = ({ ctxState }: IConsumerProps): JSX.Element => {
    function postsNextClicked() {
        ctxState.postsNextClicked();
    }

    function postsPreviousClicked() {
        ctxState.postsPreviousClicked();
    }

    let thePager = <></>;

    if (ctxState.totalPages > 1) {
        thePager = (
            <div className="pager">
                <button
                    disabled={ctxState.currentPage <= 1}
                    onClick={postsPreviousClicked}
                >
                    Previous
                </button>
                <button
                    disabled={ctxState.currentPage >= ctxState.totalPages}
                    onClick={postsNextClicked}
                >
                    Next
                </button>
                <div className="pager-text">
                    Page{' '}
                    <span dangerouslySetInnerHTML={{ __html: ctxState.currentPage.toString() }} />
                    {' '}/{' '}
                    <span dangerouslySetInnerHTML={{ __html: ctxState.totalPages.toString() }} />
                </div>
            </div>
        );
    }

    return thePager;
}

export default WithConsumer(Pager);