import React from "react";
import ReactModal from "react-modal";

import { ModalProps } from "./types";
import "./Modal.css";

export const Modal: React.FC<ModalProps> = ({
  className,
  size = "xl",
  ...rest
}) => {
  const classes = ["modal"];

  if (size) {
    classes.push(`modal-${size}`);
  }

  if (className && typeof className === "string") {
    classes.push(className);
  }

  return (
    <ReactModal
      {...rest}
      ariaHideApp={false}
      className={classes.join(" ")}
      overlayClassName="modal-overlay"
    />
  );
};
