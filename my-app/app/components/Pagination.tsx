//pagination component
import React from "react";

export default function Pagination(props: {
  page: number;
  onClick: (id: number) => void;
}) {
  // console.log(props);
  // console.log(props.page);
  // console.log(props.onChange);

  return (
    <div className="pagination">
      <a href="#">&laquo;</a>
      <a id="1" href="#" onClick={() => props.onClick(1)}>
        1
      </a>
      <a id="2" href="#" className="active" onClick={() => props.onClick(2)}>
        2
      </a>
      <a id="3" href="#" onClick={() => props.onClick(3)}>
        3
      </a>
      <a id="4" href="#" onClick={() => props.onClick(4)}>
        4
      </a>
      <a id="5" href="#" onClick={() => props.onClick(5)}>
        5
      </a>
      <a id="6" href="#" onClick={() => props.onClick(6)}>
        6
      </a>
      <a href="#">&raquo;</a>
    </div>
  );
}
