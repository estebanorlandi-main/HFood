import styles from "./Loader.module.css";

function Loader(props) {
  return (
    <div className={styles.loader}>
      <div className={`${styles.dot} ${styles.dot1}`} />
      <div className={`${styles.dot} ${styles.dot2}`} />
      <div className={`${styles.dot} ${styles.dot3}`} />
    </div>
  );
}
export default Loader;
