import "./Pagination.scss";

type TPaginationProps = {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPage: number;
};

const Pagination = ({
  currentPage,
  setCurrentPage,
  totalPage,
}: TPaginationProps) => {
  return (
    <ul className="pagination">
      <li className={`page-item ${currentPage === 1 && "disabled"}`}>
        <button
          className="page-link"
          onClick={() => setCurrentPage(currentPage - 1)}
        ></button>
      </li>

      {currentPage > 3 && (
        <>
          <li className="page-item">
            <button className="page-link" onClick={() => setCurrentPage(1)}>
              1
            </button>
          </li>
          <li className="dotted page-item">
            <button className="page-link">
              <span>…</span>
            </button>
          </li>
        </>
      )}

      {currentPage > 1 && (
        <li className="page-item">
          <button
            className="page-link"
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            {currentPage - 1}
          </button>
        </li>
      )}
      <li className="page-item active">
        <button className="page-link">{currentPage}</button>
      </li>
      {currentPage < totalPage && (
        <li className="page-item">
          <button
            className="page-link"
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            {currentPage + 1}
          </button>
        </li>
      )}

      {totalPage - currentPage > 3 && (
        <>
          <li className="dotted page-item">
            <button className="page-link">
              <span>…</span>
            </button>
          </li>
          <li className="page-item">
            <button
              className="page-link"
              onClick={() => setCurrentPage(totalPage)}
            >
              {totalPage}
            </button>
          </li>
        </>
      )}

      <li className={`page-item ${currentPage === totalPage && "disabled"}`}>
        <button
          className="page-link"
          onClick={() => setCurrentPage(currentPage + 1)}
        ></button>
      </li>
    </ul>
  );
};

export default Pagination;
