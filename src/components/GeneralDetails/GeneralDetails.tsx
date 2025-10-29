import styles from "./GeneralDetails.module.scss";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function GeneralDetails({ userData }: any) {
  return (
    <div className={styles.detailsCard}>
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Personal Information</h3>
        <div className={styles.grid}>
          <div className={styles.field}>
            <label>FULL NAME</label>
            <p>{userData.personalInfo.fullName}</p>
          </div>
          <div className={styles.field}>
            <label>PHONE NUMBER</label>
            <p>{userData.personalInfo.phoneNumber}</p>
          </div>
          <div className={styles.field}>
            <label>EMAIL ADDRESS</label>
            <p>{userData.personalInfo.emailAddress}</p>
          </div>
          <div className={styles.field}>
            <label>BVN</label>
            <p>{userData.personalInfo.bvn}</p>
          </div>
          <div className={styles.field}>
            <label>GENDER</label>
            <p>{userData.personalInfo.gender}</p>
          </div>
          <div className={styles.field}>
            <label>MARITAL STATUS</label>
            <p>{userData.personalInfo.maritalStatus}</p>
          </div>
          <div className={styles.field}>
            <label>CHILDREN</label>
            <p>{userData.personalInfo.children}</p>
          </div>
          <div className={styles.field}>
            <label>TYPE OF RESIDENCE</label>
            <p>{userData.personalInfo.typeOfResidence}</p>
          </div>
        </div>
      </section>

      <div className={styles.separator}></div>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Education and Employment</h3>
        <div className={styles.grid}>
          <div className={styles.field}>
            <label>LEVEL OF EDUCATION</label>
            <p>{userData.education.levelOfEducation}</p>
          </div>
          <div className={styles.field}>
            <label>EMPLOYMENT STATUS</label>
            <p>{userData.education.employmentStatus}</p>
          </div>
          <div className={styles.field}>
            <label>SECTOR OF EMPLOYMENT</label>
            <p>{userData.education.sectorOfEmployment}</p>
          </div>
          <div className={styles.field}>
            <label>DURATION OF EMPLOYMENT</label>
            <p>{userData.education.durationOfEmployment}</p>
          </div>
          <div className={styles.field}>
            <label>OFFICE NAME</label>
            <p>{userData.education.officeName}</p>
          </div>
          <div className={styles.field}>
            <label>MONTHLY INCOME</label>
            <p>{userData.education.monthlyIncome}</p>
          </div>
          <div className={styles.field}>
            <label>LOAN REPAYMENT</label>
            <p>{userData.education.loanRepayment}</p>
          </div>
        </div>
      </section>

      <div className={styles.separator}></div>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Socials</h3>
        <div className={styles.grid}>
          <div className={styles.field}>
            <label>TWITTER</label>
            <p>{userData.socials.twitter}</p>
          </div>
          <div className={styles.field}>
            <label>FACEBOOK</label>
            <p>{userData.socials.facebook}</p>
          </div>
          <div className={styles.field}>
            <label>INSTAGRAM</label>
            <p>{userData.socials.instagram}</p>
          </div>
        </div>
      </section>

      <div className={styles.separator}></div>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Guarantor</h3>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {userData.guarantors.map((guarantor: any, index: number) => (
          <div key={index} className={styles.guarantorItem}>
            <div className={styles.grid}>
              <div className={styles.field}>
                <label>FULL NAME</label>
                <p>{guarantor.fullName}</p>
              </div>
              <div className={styles.field}>
                <label>PHONE NUMBER</label>
                <p>{guarantor.phoneNumber}</p>
              </div>
              <div className={styles.field}>
                <label>EMAIL ADDRESS</label>
                <p>{guarantor.emailAddress}</p>
              </div>
              <div className={styles.field}>
                <label>RELATIONSHIP</label>
                <p>{guarantor.relationship}</p>
              </div>
            </div>
            {index < userData.guarantors.length - 1 && (
              <div className={styles.separator}></div>
            )}
          </div>
        ))}
      </section>
    </div>
  );
}
