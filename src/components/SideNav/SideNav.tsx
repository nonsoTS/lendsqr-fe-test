import { useAppDispatch } from "../../redux/hooks";
import { logout } from "../../redux/user/userSlice";
import type { NavGroupProps } from "../../utils/interfaces";
import { USERS_ROUTE } from "../../utils/routes";
import NavGroup from "../NavGroup/NavGroup";
import NavItem from "../NavItem/NavItem";
import styles from "./SideNav.module.scss";

const sideNavLinks = [
  {
    title: "CUSTOMERS",
    links: [
      {
        title: "Users",
        icon: "/icons/friends.svg",
        link: USERS_ROUTE.link,
      },
      {
        title: "Guarantors",
        icon: "/icons/users.svg",
        link: "/dashboard/guarantors",
      },
      {
        title: "Loans",
        icon: "/icons/sack.svg",
        link: "/dashboard/loans",
      },
      {
        title: "Decision Models",
        icon: "/icons/handshake.svg",
        link: "/dashboard/decision-models",
      },
      {
        title: "Savings",
        icon: "/icons/piggy.svg",
        link: "/dashboard/savings",
      },
      {
        title: "Loan Requests",
        icon: "/icons/money.svg",
        link: "/dashboard/loan-requests",
      },
      {
        title: "Whitelist",
        icon: "/icons/check.svg",
        link: "/dashboard/whitelist",
      },
      {
        title: "Karma",
        icon: "/icons/times.svg",
        link: "/dashboard/karma",
      },
    ],
  },
  {
    title: "BUSINESSES",
    links: [
      {
        title: "Organization",
        icon: "/icons/briefcase.svg",
        link: "/dashboard/organization",
      },
      {
        title: "Loan Products",
        icon: "/icons/money.svg",
        link: "/dashboard/loan-products",
      },
      {
        title: "Savings Products",
        icon: "/icons/bank.svg",
        link: "/dashboard/savings-products",
      },
      {
        title: "Fees and Charges",
        icon: "/icons/coins.svg",
        link: "/dashboard/fees-and-charges",
      },
      {
        title: "Transactions",
        icon: "/icons/icon.svg",
        link: "/dashboard/transactions",
      },
      {
        title: "Services",
        icon: "/icons/galaxy.svg",
        link: "/dashboard/services",
      },
      {
        title: "Service Account",
        icon: "/icons/cog.svg",
        link: "/dashboard/service-account",
      },
      {
        title: "Settlements",
        icon: "/icons/scroll.svg",
        link: "/dashboard/settlements",
      },
      {
        title: "Reports",
        icon: "/icons/chart.svg",
        link: "/dashboard/reports",
      },
    ],
  },
  {
    title: "SETTINGS",
    links: [
      {
        title: "Preferences",
        icon: "/icons/sliders.svg",
        link: "/dashboard/preferences",
      },
      {
        title: "Fees and Pricing",
        icon: "/icons/badge.svg",
        link: "/dashboard/fees-and-pricing",
      },
      {
        title: "Audit Logs",
        icon: "/icons/clipboard.svg",
        link: "/dashboard/audit-logs",
      },
    ],
  },
];

export default function SideNav({ showNav }: { showNav: boolean }) {
    const dispatch = useAppDispatch();
  
  return (
    <div className={styles.container}>
      {showNav && (
        <img className={styles.mobileLogo} src="/images/logo.svg" alt="" />
      )}

      <NavItem
        icon="/icons/briefcase.svg"
        title="Switch Organization"
        secondIcon="/icons/down.svg"
        link=""
      />

      <NavItem icon="/icons/home.svg" title="Dashboard" link="" />

      {sideNavLinks.map((item: NavGroupProps, i: number) => (
        <NavGroup key={i} title={item.title} links={item.links} />
      ))}

      <div className={styles.logoutDiv}>
        <div className={styles.logout} onClick={() => {dispatch(logout())}}>
          <NavItem icon="/icons/logout.svg" title="Logout" link="" />
        </div>

        <p className={styles.logoutP}>v1.2.0</p>
      </div>

    </div>
  );
}
