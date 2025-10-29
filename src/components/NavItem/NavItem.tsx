import { NavLink } from "react-router";
import styles from "./NavItem.module.scss";
import type { NavItemProps } from "../../utils/interfaces";

export default function NavItem({
  icon,
  title,
  secondIcon,
  link,
}: NavItemProps) {
  const content = (
    <div className={styles.navContent}>
      <img src={icon} alt="" />
      <p>{title}</p>
      {secondIcon && <img src={secondIcon} alt="" />}
    </div>
  );

  return link ? (
    <NavLink
      to={link}
      className={({ isActive }) =>
        `${styles.navItem} ${isActive ? styles.picked : ""}`
      }
    >
      {content}
      <span className={styles.line}>&nbsp;</span>
    </NavLink>
  ) : (
    <div className={styles.navItem}>{content}</div>
  );
}
