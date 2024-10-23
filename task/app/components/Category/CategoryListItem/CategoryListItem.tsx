import React, { useState } from "react";
import {
  CaretDownFilled,
  CaretRightFilled,
  FolderFilled,
} from "@ant-design/icons";
import styles from "./categorylistitem.module.css";
import classNames from "classnames";
import { Category } from "@/Context";

interface P {
  isOpen: boolean;
  category: Category;
  onCategorySelect: (id: number) => void;
}

export const CategoryListItem = ({ isOpen, category, onCategorySelect }: P) => {
  return (
    <div
      className={classNames(styles.categoryWrapper, {
        [styles.open]: isOpen,
      })}
      onClick={() => onCategorySelect(category.id)}
    >
      <span className={styles.label}>
        <FolderFilled />
        {category.name} ({category.notes.length})
      </span>
      {isOpen ? <CaretRightFilled /> : <CaretDownFilled />}
    </div>
  );
};
