import React from "react";

export default function Button(props: {name: string, id: number, onClick: (id: number) => void, page: number}){
    return (
        <button
        name={props.name}
        id={props.id.t}
        onClick={props.onClick}
        className={props.page === props.id ? "active" : ""}
    )
}


