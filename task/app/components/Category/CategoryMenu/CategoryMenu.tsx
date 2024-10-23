import { useState } from "react";
import styles from "./categoryMenu.module.css";
import { useNotes } from "@/Context";
import { Button, CategoryListItem, NewCategory } from "@/components";

interface P {
  onCategorySelect: (id: number) => void;
  selectedCategory?: number;
}

export const CategoryMenu = ({ selectedCategory, onCategorySelect }: P) => {
  const [categoryName, setCategoryName] = useState<string | undefined>();
  const { categories, addCategory } = useNotes();
  return (
    <div className={styles.categoriesMenu}>
      {categoryName === undefined ? (
        <Button
          isBig
          actionType="create"
          buttonName="Create category"
          onClick={() => {
            setCategoryName("");
          }}
        />
      ) : (
        <NewCategory
          onCancel={() => {
            setCategoryName(undefined);
          }}
          onChange={(value) => {
            setCategoryName(value);
          }}
          onSubmit={() => {
            addCategory(categoryName);
            setCategoryName(undefined);
          }}
        />
      )}
      <div className={styles.categories}>
        {categories.map((el) => (
          <CategoryListItem
            isOpen={selectedCategory === el.id}
            category={el}
            onCategorySelect={(id: number) => {
              setCategoryName(undefined);
              onCategorySelect(id);
            }}
          />
        ))}
      </div>
    </div>
  );
};
