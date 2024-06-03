//pagination component
import React from "react";

export default function Pagination(props: {
  page: number;
  onClick: (id: number) => void;
}) {
  const currPage = props.page;
  const firstPage = currPage > 3 ? currPage - 2 : 1;
  const totalPages = 100000; // TODO: get total pages from API

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
      <button
        name={"page" + firstPage}
        id={firstPage.toString()}
        onClick={() => props.onClick(firstPage)}
        className={props.page === firstPage ? "active" : ""}
      >
        {firstPage}
      </button>
      <button
        name={"page" + (firstPage + 1)}
        id={(firstPage + 1).toString()}
        onClick={() => props.onClick(firstPage + 1)}
        className={props.page === firstPage + 1 ? "active" : ""}
      >
        {firstPage + 1}
      </button>
      <button
        name={"page" + (firstPage + 2)}
        id={(firstPage + 2).toString()}
        onClick={() => props.onClick(firstPage + 2)}
        className={props.page === firstPage + 2 ? "active" : ""}
      >
        {firstPage + 2}
      </button>
      <button
        name={"page" + (firstPage + 3)}
        id={(firstPage + 3).toString()}
        onClick={() => props.onClick(firstPage + 3)}
        className={props.page === firstPage + 3 ? "active" : ""}
      >
        {firstPage + 3}
      </button>
      <button
        name={"page" + (firstPage + 4)}
        id={(firstPage + 4).toString()}
        onClick={() => props.onClick(firstPage + 4)}
        className={props.page === firstPage + 4 ? "active" : ""}
      >
        {firstPage + 4}
      </button>
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
