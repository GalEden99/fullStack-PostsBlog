import React, { ReactNode } from "react";

export default function ThemeButton(props: {
  onClick: () => void;
  text: ReactNode;
}) {
  return (
    <button
      onClick={props.onClick}
      className="change_theme"
      name="change_theme"
    >
      {props.text}
    </button>
  );
}
