import React from 'react';
import WithConsumer from '../context/WithConsumer';

const Pager = ({ context }) => {

  function nextClicked() {
    context.nextClicked();
  }

  function previousClicked() {
    context.previousClicked();
  }

  let thePager = '';

  if (parseInt(context.totalPages) > 1 || context.appError) {
    thePager = (
      <div className="pager">
        <button
          disabled={context.currentPage <= 1}
          onClick={previousClicked}
        >
          Previous
        </button>
        <button
          disabled={context.currentPage >= context.totalPages}
          onClick={nextClicked}
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