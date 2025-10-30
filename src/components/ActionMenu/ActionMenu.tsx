import styles from "./ActionMenu.module.scss";
import type { ActionMenuProps } from "../../utils/interfaces";

export default function ActionMenu({
  menuRef,
  activeMenuRow,
  index,
  row,
  handleUserClick,
}: ActionMenuProps) {
  return (
    <>
      {activeMenuRow === index && (
        <div ref={menuRef} className={styles.actionMenu}>
          <button
            className={styles.menuItem}
            onClick={() => handleUserClick(row.id)}
          >
            <img src="/icons/view.svg" alt="" />
            View Details
          </button>
          <button className={styles.menuItem}>
            <img src="/icons/delete.svg" alt="" />
            Blacklist User
          </button>
          <button className={styles.menuItem}>
            <img src="/icons/tick.svg" alt="" />
            Activate User
          </button>
        </div>
      )}
    </>
  );
}
