import React from "react";
import styles from "./modal.module.css";
const Modal = (props) => {
  return (
    <div>
      <div className={styles["modal-container"]} id="modal">
        <div className={styles["modal-object"]}>
          <p>{`${props.link !== undefined? props.link:""} ${props.note}`}</p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
