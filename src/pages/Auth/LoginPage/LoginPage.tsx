import { Link, useNavigate } from "react-router";
import styles from "./LoginPage.module.scss";
import { useFormik } from "formik";
import { LOGIN_ROUTE, USERS_ROUTE } from "../../../utils/routes";
import { useState } from "react";
import { initialLoginValues } from "../../../utils/initialValues";
import { loginValidationSchema } from "../../../utils/validationSchema";
import Spinner from "../../../components/Spinner/Spinner";
import { useAppDispatch } from "../../../redux/hooks";
import { login } from "../../../redux/user/userSlice";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [togglePassword, setTogglePassword] = useState(true);

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    initialValues: initialLoginValues,
    validationSchema: loginValidationSchema,
    onSubmit: (_, { setSubmitting }) => {
      setTimeout(() => {
        setSubmitting(false);
        navigate(USERS_ROUTE.link);
        dispatch(login());
      }, 2000);
    },
  });

  const changeTogglePassword = () => {
    setTogglePassword(!togglePassword);
  };

  return (
    <div>
      <div className={styles.formHeader}>
        <p className={styles.formHeaderH1}>Welcome!</p>
        <p className={styles.formHeaderP}>Enter details to login.</p>
      </div>
      <div className={styles.formElements}>
        <div className={styles.emailDiv}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          {errors.email && touched.email && (
            <span className={styles.inputError}>{errors.email}</span>
          )}
        </div>

        <div className={styles.passwordDiv}>
          <div className={styles.passwordInput}>
            <input
              type={togglePassword ? "password" : "text"}
              name="password"
              placeholder="Password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <p onClick={() => changeTogglePassword()}>
              {togglePassword ? "SHOW" : "HIDE"}
            </p>
          </div>

          {errors.password && touched.password && (
            <span className={styles.inputError}>{errors.password}</span>
          )}
        </div>

        <Link to={LOGIN_ROUTE.link} className={styles.forgotPassword}>
          Forgot PASSWORD?{" "}
        </Link>

        <button
          className={styles.formButton}
          onClick={() => handleSubmit()}
          disabled={isSubmitting}
        >
          {isSubmitting ? <Spinner /> : "LOG IN"}
        </button>

        <Link to=''  className={styles.signUp}>Already have an account? Sign up</Link>
      </div>
    </div>
  );
}
