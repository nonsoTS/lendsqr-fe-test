import { useEffect, useState } from "react";
import styles from "./UserDetailsPage.module.scss";
import { useLocation, useNavigate, useParams } from "react-router";
import GeneralDetails from "../../../components/GeneralDetails/GeneralDetails";
import OtherTabs from "../../../components/OtherTabs/OtherTabs";
import { useAppSelector } from "../../../redux/hooks";

const TABS = [
  "General Details",
  "Documents",
  "Bank Details",
  "Loans",
  "Savings",
  "App and System",
];

export default function UserDetailsPage() {
  const allUsers = useAppSelector((state) => state.user.allUsers || []);
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const [activeTab, setActiveTab] = useState("General Details");
  const currentUser = allUsers.find((user) => user.id === params.id);

  const userData = {
    name: currentUser?.username,
    tier: "User's Tier",
    rating: 1,
    balance: "₦200,000.00",
    accountNumber: "9876543210",
    bank: "Providus Bank",
    personalInfo: {
      fullName: currentUser?.username,
      phoneNumber: currentUser?.phoneNumber,
      emailAddress: currentUser?.email,
      bvn: "07060780323",
      gender: "Female",
      maritalStatus: "Single",
      children: "None",
      typeOfResidence: "Parent's Apartment",
    },
    education: {
      levelOfEducation: "B.Sc",
      employmentStatus: "Employed",
      sectorOfEmployment: "FinTech",
      durationOfEmployment: "2 years",
      officeName: "Lendsqr",
      monthlyIncome: "₦200,000.00 - ₦400,000.00",
      loanRepayment: "40,000",
    },
    socials: {
      twitter: "@grace_effiom",
      facebook: currentUser?.username,
      instagram: "@grace_effiom",
    },
    guarantors: [
      {
        fullName: "Debby Ogana",
        phoneNumber: "07060780922",
        emailAddress: "debby@gmail.com",
        relationship: "Sister",
      },
      {
        fullName: "Debby Ogana",
        phoneNumber: "07060780922",
        emailAddress: "debby@gmail.com",
        relationship: "Sister",
      },
    ],
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBack = () => {
    const from = location.state?.from;
    if (from) {
      navigate(from);
    } else {
      navigate("/users");
    }
  };

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={handleBack}>
        <span>←</span> Back to Users
      </button>

      <div className={styles.header}>
        <h1 className={styles.title}>User Details</h1>
        <div className={styles.actions}>
          <button className={styles.blacklistBtn}>BLACKLIST USER</button>
          <button className={styles.activateBtn}>ACTIVATE USER</button>
        </div>
      </div>

      <div className={styles.userCard}>
        <div className={styles.userOverview}>
          <div className={styles.userProfile}>
            <div className={styles.avatar}>
              <img src="/icons/user.svg" alt="" />
            </div>
            <div className={styles.userInfo}>
              <h2>{userData.name}</h2>
              <p className={styles.accountNumber}>LSQFf587g90</p>
            </div>
          </div>

          <div className={styles.divider}></div>

          <div className={styles.userTier}>
            <p className={styles.label}>{userData.tier}</p>
            <div className={styles.stars}>
              {[1, 2, 3].map((star) => (
                <span
                  key={star}
                  className={
                    star <= userData.rating
                      ? styles.starFilled
                      : styles.starEmpty
                  }
                >
                  ★
                </span>
              ))}
            </div>
          </div>

          <div className={styles.divider}></div>

          <div className={styles.userBalance}>
            <h3>{userData.balance}</h3>
            <p>
              {userData.accountNumber}/{userData.bank}
            </p>
          </div>
        </div>

        <div className={styles.TABS}>
          {TABS.map((tab, index) => (
            <button
              key={index}
              className={`${styles.tab} ${
                tab === activeTab ? styles.tabActive : ""
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {activeTab === TABS[0] ? (
        <GeneralDetails userData={userData} />
      ) : (
        <OtherTabs />
      )}
    </div>
  );
}
