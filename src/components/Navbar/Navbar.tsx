import { FaRegBell } from "react-icons/fa";
import styles from "./Navbar.module.scss";
import { MdArrowDropDown, MdOutlineMenu } from "react-icons/md";
import type { NavbarProps } from "../../utils/interfaces";

export default function Navbar({ toggleMenu }: NavbarProps) {
  return (
    <div className={styles.navbar}>
      <div className={styles.firstHalf}>
        <div className={styles.navbarLogo}>
          <img src="/images/logo.svg" alt="" />

          <MdOutlineMenu onClick={() => toggleMenu()} />
        </div>

        <div className={styles.searchBar}>
          <input type="text" name="search" placeholder="Search for anything" />
          <span className={styles.searchIcon}>
            <img src="/icons/search.svg" alt="" />
          </span>
        </div>
      </div>

      <div className={styles.secondHalf}>
        <p className={styles.docs}>Docs</p>

        <span>
          <FaRegBell className={styles.notification} />
        </span>

        <div className={styles.dropdown}>
          <img className={styles.avatar} src="/icons/avatar.svg" alt="" />
          <p>Adedeji</p>
          <MdArrowDropDown className={styles.dropdownIcon} />
        </div>
      </div>
    </div>
  );
}
