import React from 'react';
import WithConsumer from '../../wrappers/WithConsumer';

const Pager = ({ context }) => {
    function postsNextClicked() {
        context.postsNextClicked();
    }

    function postsPreviousClicked() {
        context.postsPreviousClicked();
    }

    let thePager = '';

    if (parseInt(context.totalPages) > 1 || context.appError) {
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
                    <span dangerouslySetInnerHTML={{ __html: context.currentPage }} />
                    {' '}/{' '}
                    <span dangerouslySetInnerHTML={{ __html: context.totalPages }} />
                </div>
            </div>
        );
    }

    return thePager;
}

export default WithConsumer(Pager);