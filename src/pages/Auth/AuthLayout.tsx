import styles from './AuthLayout.module.scss'
import { Outlet } from "react-router";


export default function AuthLayout() {
  return (
    <div className={styles.container}>
      <div className={styles.images}>
        <div className={styles.topImage}>
          <img src="images/logo.svg" alt="" />
        </div>
        <div className={styles.bottomImage}>
          <img src="images/sign-in.svg" alt="" />
        </div>
      </div>
      <div className={styles.formContainer}>
        <Outlet />
      </div>
    </div>
  )
}

