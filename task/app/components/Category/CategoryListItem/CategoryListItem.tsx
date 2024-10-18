import React, { useState } from "react";
import {
  CaretDownFilled,
  CaretRightFilled,
  FolderFilled,
} from "@ant-design/icons";
import styles from "./categorylistitem.module.css";
import classNames from "classnames";

interface P {
  notesCount: number;
}

export const CategoryListItem = ({ notesCount }: P) => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen((prev) => !prev);
  };
  return (
    <div
      className={classNames(styles.categoryWrapper, {
        [styles.open]: open,
      })}
      onClick={toggleOpen}
    >
      <span className={styles.label}>
        <FolderFilled />
        Category ({notesCount})
      </span>
      {open ? <CaretRightFilled /> : <CaretDownFilled />}
    </div>
  );
};
