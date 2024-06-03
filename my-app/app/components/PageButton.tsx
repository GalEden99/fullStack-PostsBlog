import React, { MouseEventHandler } from "react";

export default function PageButton(props: {
  key: number;
  page: number;
  shownPage: number;
  onClick: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button
      name={"page-" + props.page}
      key={props.key}
      id={props.page.toString()}
      onClick={props.onClick}
      className={props.page === props.shownPage ? "active" : ""}
    >
      {props.page}
    </button>
  );
}
