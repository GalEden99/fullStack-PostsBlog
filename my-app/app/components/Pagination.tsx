//pagination component
import React from "react";
import PageButton from "./PageButton";

export default function Pagination(props: {
  page: number;
  onClick: (id: number) => void;
  numPages: number;
}) {
  const currPage = props.page;
  const totalPages = props.numPages;
  const paginationLen = totalPages > 5 ? 5 : totalPages;
  //const firstPage = (totalPages > 3) ? currPage - 2 : 1;
  const firstPage = Math.min(Math.max(1, currPage - 2), totalPages - 4);

  return (
    <div className="pagination">
      <button name="first" onClick={() => props.onClick(1)}>
        First
      </button>
      <button
        name="previous"
        onClick={() => props.page > 1 && props.onClick(props.page - 1)}
      >
        &laquo;
      </button>
      {[...Array(paginationLen)].map((_, i) => (
        <PageButton
          key={firstPage + i}
          page={firstPage + i}
          shownPage={currPage}
          onClick={() => props.onClick(firstPage + i)}
        />
      ))}
      <button
        name="next"
        onClick={() => props.page < totalPages && props.onClick(props.page + 1)}
      >
        &raquo;
      </button>
      <button name="last" onClick={() => props.onClick(totalPages)}>
        Last
      </button>
    </div>
  );
}
