import { Outlet } from "react-router";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./DashboardLayout.module.scss";
import SideNav from "../../components/SideNav/SideNav";
import { useRef, useState } from "react";
import useClickOutside from "../../hooks/useClickOutside";

export default function DashboardLayout() {
  const navRef = useRef<HTMLDivElement | null>(null);
  const [showNav, setShowNav] = useState(false);

  const toggleMenu = () => {
    setShowNav(!showNav);
  };

  useClickOutside(navRef, () => setShowNav(false));

  return (
    <div className={styles.dashMain}>
      <Navbar toggleMenu={() => toggleMenu()} />

      <div className={styles.dashboard}>
        <div
          ref={navRef}
          className={`${styles.sideNav} ${showNav && styles.showNavBar}`}
        >
          <SideNav showNav={showNav} />
        </div>
        <div className={styles.main}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
