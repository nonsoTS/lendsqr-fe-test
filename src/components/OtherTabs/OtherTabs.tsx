import styles from "./OtherTabs.module.scss";

export default function OtherTabs() {
  return (
    <div className={styles.detailsCard}>
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Other Tab</h3>
        <div className={styles.grid}>
          <div className={styles.field}>
            <label>INFO</label>
            <p>No info here</p>
          </div>
        </div>
      </section>
    </div>
  );
}
