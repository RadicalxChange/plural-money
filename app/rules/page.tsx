import Rules from "@/content/rules.mdx"
import styles from "@/styles/contents.module.css";

export default async function Participants() {

  return (
    <main className="px-4 pb-4 lg:px-24 pt-12 min-h-screen-minus-header">
      <h1 className="text-left text-lg mb-12">Rules</h1>
      <div className={styles.contentBox}>
        <Rules />
      </div>
    </main>
  );
}
