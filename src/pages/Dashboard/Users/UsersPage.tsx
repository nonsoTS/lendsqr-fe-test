import axios from "axios";
import UsersTable from "../../../components/UsersTable/UsersTable";
import styles from "./UsersPage.module.scss";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { UserProps } from "../../../utils/interfaces";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useAppDispatch } from "../../../redux/hooks";
import { updateUsers } from "../../../redux/user/userSlice";

export default function UsersPage() {
  const dispatch = useAppDispatch();
  const [totalData, setTotalData] = useState<[] | UserProps[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);
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
        console.log("response=== ", response);
        if (response.status === 200) {
          setTotalData(response.data);

          setTotalItems(response.data.length);
          const paginatedData = response.data.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
          );
          dispatch(updateUsers({ users: [...paginatedData] }));
        }
      })
      .catch(function (error) {
        console.log(error);
        setTotalItems(0);
        setCurrentPage(1);
        dispatch(updateUsers({ users: [] }));
      })
      .finally(function () {
        setLoadingData(false);
      });
  }, [currentPage, itemsPerPage, dispatch]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const activeUsers = useMemo(() => {
    return totalData.filter((item: UserProps) => item?.status === "Active");
  }, [totalData]);

  const OVERVIEW = [
    {
      icon: "/icons/icon-4.svg",
      title: "Users",
      value: totalItems,
    },
    {
      icon: "/icons/icon-3.svg",
      title: "Active Users",
      value: activeUsers?.length,
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
        totalItems={totalItems}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        loadingData={loadingData}
      />
    </div>
  );
}
