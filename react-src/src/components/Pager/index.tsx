import WithConsumer, { IConsumerProps } from '../../wrappers/WithConsumer';

const Pager = ({ context }: IConsumerProps): JSX.Element => {
    function postsNextClicked() {
        context.postsNextClicked();
    }

    function postsPreviousClicked() {
        context.postsPreviousClicked();
    }

    let thePager = <></>;

    if (context.totalPages > 1) {
        thePager = (
            <div className="pager">
                <button
                    disabled={context.currentPage <= 1}
                    onClick={postsPreviousClicked}
                >
                    Previous
                </button>
                <button
                    disabled={context.currentPage >= context.totalPages}
                    onClick={postsNextClicked}
                >
                    Next
                </button>
                <div className="pager-text">
                    Page{' '}
                    <span dangerouslySetInnerHTML={{ __html: context.currentPage.toString() }} />
                    {' '}/{' '}
                    <span dangerouslySetInnerHTML={{ __html: context.totalPages.toString() }} />
                </div>
            </div>
        );
    }

    return thePager;
}

export default WithConsumer(Pager);