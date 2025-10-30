import axios from "axios";
import UsersTable from "../../../components/UsersTable/UsersTable";
import styles from "./UsersPage.module.scss";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { UserProps } from "../../../utils/interfaces";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { updateAllUsers } from "../../../redux/user/userSlice";
import { shallowEqual } from "react-redux";

export default function UsersPage() {
  const dispatch = useAppDispatch();
  const { filteredUsers } = useAppSelector(
    (state) => ({
      filteredUsers: state.user.filteredUsers || [],
    }),
    shallowEqual
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [loadingData, setLoadingData] = useState<boolean>(false);

  const fetchUsers = useCallback(async () => {
    setLoadingData(true);

    await axios
      .get(import.meta.env.VITE_API_URL, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_BEARER}`,
        },
      })
      .then(function (response) {
        if (response.status === 200) {
          dispatch(updateAllUsers({ allUsers: [...response.data] }));
        } else {
          throw Error;
        }
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .catch(function (error: any) {
        console.log(error);
        setCurrentPage(1);
        dispatch(updateAllUsers({ users: [] }));
      })
      .finally(function () {
        setLoadingData(false);
      });
  }, [dispatch]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const activeUsers = useMemo(() => {
    return filteredUsers.filter((item: UserProps) => item?.status === "Active")
      .length;
  }, [filteredUsers]);

  const OVERVIEW = [
    {
      icon: "/icons/icon-4.svg",
      title: "Users",
      value: filteredUsers?.length,
    },
    {
      icon: "/icons/icon-3.svg",
      title: "Active Users",
      value: activeUsers,
    },
    {
      icon: "/icons/icon-2.svg",
      title: "Users with Loans",
      value: "253",
    },
    {
      icon: "/icons/icon-1.svg",
      title: "Users with Savings",
      value: "453",
    },
  ];

  console.log("filteredUsers===", filteredUsers.length);

  return (
    <div className={styles.container}>
      <p className={styles.pageTitle}>Users</p>

      <div className={styles.overview}>
        {OVERVIEW.map((item, i) => (
          <div key={i} className={styles.insight}>
            <img src={item.icon} alt="" />
            <p className={styles.title}>{item.title}</p>
            <p className={styles.value}>
              {loadingData ? <Skeleton width={20} /> : item.value}
            </p>
          </div>
        ))}
      </div>

      <UsersTable
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        loadingData={loadingData}
        setLoadingData={setLoadingData}
      />
    </div>
  );
}
