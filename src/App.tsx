import { Navigate, Route, Routes } from "react-router";
import { DASHBOARD_ROUTE, LOGIN_ROUTE, USERS_DETAILS_ROUTE, USERS_ROUTE } from "./utils/routes";
import { useAppSelector } from "./redux/hooks";
import AuthLayout from "./pages/Auth/AuthLayout";
import LoginPage from "./pages/Auth/LoginPage/LoginPage";
import DashboardLayout from "./pages/Dashboard/DashboardLayout";
import UsersPage from "./pages/Dashboard/Users/UsersPage";
import UserDetailsPage from "./pages/Dashboard/UserDetails/UserDetailsPage";
import NotFound from "./pages/NotFound/NotFound";
import OtherPages from "./pages/Dashboard/OtherPages/OtherPages";

function App() {
  const user = useAppSelector((state) => state.user.authenticated);

  return (
    <Routes>
      <Route index element={<p>Home Page</p>} />

      <Route element={<AuthLayout />}>
        <Route
          path={LOGIN_ROUTE.route}
          element={
            user ? <Navigate to={USERS_ROUTE.link} replace /> : <LoginPage />
          }
        />
      </Route>

      <Route
        path={DASHBOARD_ROUTE.route}
        element={
          user ? (
            <DashboardLayout />
          ) : (
            <Navigate to={LOGIN_ROUTE.link} replace />
          )
        }
      >
        <Route path={USERS_ROUTE.route} element={<UsersPage />} />
        <Route path={USERS_ROUTE.route} element={<UsersPage />} />
        <Route path={USERS_DETAILS_ROUTE.route} element={<UserDetailsPage />} />
        <Route path="*" element={<OtherPages />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
