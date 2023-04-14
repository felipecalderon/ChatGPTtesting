import FormChat from "@/components/formChat";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div>
      <main className={styles.main}>
        <FormChat />
      </main>
    </div>
  );
}