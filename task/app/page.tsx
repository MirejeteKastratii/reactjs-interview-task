import styles from "./page.module.css";
import { CreateButton } from "./components/CreateButton";

export default function Home() {
  return (
    <div>
      <CreateButton>
        <p> Create a note</p>
      </CreateButton>
    </div>
  );
}
