"use client";
import { Button, CategoryListItem, Search } from "./components";
import { NewCategory } from "./components/Category/NewCategory/NewCategory";
import { NoteListItem } from "./components/Notes/NoteListItem/NoteListItem";
import { TabTitle } from "./components/TabTitle/TabTitle";
// import styles from "./page.module.css";

export default function Home() {
  return (
    <div>
      <Button actionType="create" buttonName="Create Note" />
      <Button actionType="delete" buttonName="Delete Note" />
      <Button actionType="cancel" buttonName="Cancel" />
      <Button actionType="save" buttonName="Save Note" />

      <CategoryListItem notesCount={3} />
      <TabTitle />
      {/* <Search /> */}
      <NewCategory />
      {[1, 2, 3].map((el) => (
        <NoteListItem
          key={el}
          noteTitle="Lorem"
          noteText="Lorem ipsum is simply dummy text for the printingLorem ipsum is simply dummy text for the printing"
        />
      ))}
    </div>
  );
}
