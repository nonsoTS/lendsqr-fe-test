import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "./UsersTable.module.scss";
import useClickOutside from "../../hooks/useClickOutside";
import type {
  FilterProps,
  UserProps,
  UsersTableProps,
} from "../../utils/interfaces";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useAppSelector } from "../../redux/hooks";
import UsersFilter from "../UsersFilter/UsersFilter";
import ActionMenu from "../ActionMenu/ActionMenu";
import { shallowEqual } from "react-redux";
import { useLocation, useNavigate, useSearchParams } from "react-router";
import { USERS_ROUTE } from "../../utils/routes";

export default function UsersTable({
  currentPage,
  setCurrentPage,
  itemsPerPage,
  setItemsPerPage,
  loadingData,
  setLoadingData,
  filteredUsers,
  setFilteredUsers,
}: UsersTableProps) {
  // const dispatch = useAppDispatch();
  const { allUsers } = useAppSelector(
    (state) => ({
      allUsers: state.user.allUsers || [],
    }),
    shallowEqual
  );
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const isInitialized = useRef(false);
  const filterRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [activeMenuRow, setActiveMenuRow] = useState<number | null>(null);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const [filters, setFilters] = useState({
    organization: "",
    username: "",
    email: "",
    date: "",
    phoneNumber: "",
    status: "",
  });

  useClickOutside(
    filterRef,
    () => showFilterDropdown === true && setShowFilterDropdown(false)
  );
  useClickOutside(menuRef, () => setActiveMenuRow(null));

  const toggleMenu = (index: number | null) => {
    setActiveMenuRow(activeMenuRow === index ? null : index);
  };

  const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return styles.statusActive;
      case "inactive":
        return styles.statusInactive;
      case "pending":
        return styles.statusPending;
      case "blacklisted":
        return styles.statusBlacklisted;
      default:
        return "";
    }
  };

  const paginatedUsers = useMemo(() => {
    return filteredUsers.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [currentPage, itemsPerPage, filteredUsers]);

  // FILTER FUNCTIONALITY
  const applyFilters = useCallback(
    (filterValues: FilterProps) => {
      return allUsers.filter((item) => {
        const orgMatch =
          !filterValues.organization ||
          item.organization
            .toString()
            .toLowerCase()
            .includes(filterValues.organization.toLowerCase());

        const usernameMatch =
          !filterValues.username ||
          item.username
            .toString()
            .toLowerCase()
            .includes(filterValues.username.toLowerCase());

        const emailMatch =
          !filterValues.email ||
          item.email
            .toString()
            .toLowerCase()
            .includes(filterValues.email.toLowerCase());

        const dateMatch =
          !filterValues.date ||
          item.dateJoined
            .toString()
            .toLowerCase()
            .includes(filterValues.date.toLowerCase());

        const phoneMatch =
          !filterValues.phoneNumber ||
          item.phoneNumber
            .toString()
            .toLowerCase()
            .includes(filterValues.phoneNumber.toLowerCase());

        const statusMatch =
          !filterValues.status ||
          item.status
            .toString()
            .toLowerCase()
            .includes(filterValues.status.toLowerCase());

        return (
          orgMatch &&
          usernameMatch &&
          emailMatch &&
          dateMatch &&
          phoneMatch &&
          statusMatch
        );
      });
    },
    [allUsers]
  );

  useEffect(() => {
    // Only run once to prevent re-renders
    if (isInitialized.current) return;
    isInitialized.current = true;

    // Read URL parameters
    const urlFilters = {
      organization: searchParams.get("organization") || "",
      username: searchParams.get("username") || "",
      email: searchParams.get("email") || "",
      date: searchParams.get("date") || "",
      phoneNumber: searchParams.get("phoneNumber") || "",
      status: searchParams.get("status") || "",
    };

    setFilters(urlFilters);

    const page = searchParams.get("page");
    if (page) setCurrentPage(Number(page));

    const hasFilters = Object.values(urlFilters).some((val) => val !== "");

    if (hasFilters) {
      const filtered = applyFilters(urlFilters);
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(allUsers);
    }
  }, [searchParams, applyFilters, setFilteredUsers, setCurrentPage, allUsers]);

  const handleFilterChange = (field: string, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleFilterSubmit = () => {
    // Check if any filters are filled
    if (!Object.values(filters).some((item) => item !== "")) return;

    setLoadingData(true);

    const filteredValues = applyFilters(filters);

    // Update URL with current filters
    const params: Record<string, string> = {};
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params[key] = value;
    });
    params.page = "1";

    // This updates the URL
    setSearchParams(params);
    setFilteredUsers(filteredValues);
    setCurrentPage(1);
    setShowFilterDropdown(false);
    setLoadingData(false);
  };

  const handleResetFilters = () => {
    setLoadingData(true);
    setSearchParams({});
    setFilteredUsers(allUsers);
    setFilters({
      organization: "",
      username: "",
      email: "",
      date: "",
      phoneNumber: "",
      status: "",
    });
    setCurrentPage(1);
    setLoadingData(false);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSearchParams((prev) => {
      prev.set("page", page.toString());
      return prev;
    });
  };

  const renderPageNumbers = () => {
    const pages: (number | string)[] = [];
    // Number of pages to show on each side of current page
    const delta = 1;

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      const startPage = Math.max(2, currentPage - delta);
      const endPage = Math.min(totalPages - 1, currentPage + delta);

      if (startPage > 2) {
        pages.push("...");
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < totalPages - 1) {
        pages.push("...");
      }

      pages.push(totalPages);
    }

    return pages.map((page, index) => {
      if (page === "...") {
        return (
          <span key={`ellipsis-${index}`} className={styles.paginationEllipsis}>
            ...
          </span>
        );
      }
      return (
        <button
          key={page}
          className={`${styles.paginationNumber} ${
            currentPage === page ? styles.active : ""
          }`}
          onClick={() => handlePageChange(page as number)}
        >
          {page}
        </button>
      );
    });
  };

  // Navigate to user detail, passing current url
  const handleUserClick = (userId?: string) => {
    navigate(`${USERS_ROUTE.link}/${userId}`, {
      state: { from: location.pathname + location.search },
    });
  };

  return (
    <div className={styles.dataTableContainer}>
      <div className={styles.tableWrapper}>
        {/* DATA TABLE */}
        <table className={styles.dataTable}>
          <thead>
            <tr>
              <th>
                <div
                  className={styles.thContent}
                  onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                >
                  ORGANIZATION
                  <img src="/icons/filter.svg" alt="" />
                </div>

                {/* FILTERS */}
                <UsersFilter
                  showFilterDropdown={showFilterDropdown}
                  filterRef={filterRef}
                  filters={filters}
                  handleResetFilters={handleResetFilters}
                  handleFilterSubmit={handleFilterSubmit}
                  handleFilterChange={handleFilterChange}
                />
              </th>
              <th>
                <div
                  className={styles.thContent}
                  onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                >
                  USERNAME
                  <img src="/icons/filter.svg" alt="" />
                </div>
              </th>
              <th>
                <div
                  className={styles.thContent}
                  onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                >
                  EMAIL
                  <img src="/icons/filter.svg" alt="" />
                </div>
              </th>
              <th>
                <div
                  className={styles.thContent}
                  onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                >
                  PHONE NUMBER
                  <img src="/icons/filter.svg" alt="" />
                </div>
              </th>
              <th>
                <div
                  className={styles.thContent}
                  onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                >
                  DATE JOINED
                  <img src="/icons/filter.svg" alt="" />
                </div>
              </th>
              <th>
                <div
                  className={styles.thContent}
                  onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                >
                  STATUS
                  <img src="/icons/filter.svg" alt="" />
                </div>
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {loadingData ? (
              <tr>
                <td className={styles.loadingTd} colSpan={7}>
                  <Skeleton count={4.5} height={68} />
                </td>
              </tr>
            ) : paginatedUsers.length > 0 ? (
              paginatedUsers.map((row: UserProps, index: number) => (
                <tr key={index}>
                  <td>{row.organization}</td>
                  <td>{row.username}</td>
                  <td>{row.email}</td>
                  <td>{row.phoneNumber}</td>
                  <td>{row.dateJoined}</td>
                  <td>
                    <span
                      className={`${styles.statusBadge} ${getStatusClass(
                        row.status
                      )}`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td>
                    <div className={styles.menuContainer}>
                      <button
                        className={styles.menuButton}
                        onClick={() => toggleMenu(index)}
                      >
                        <img src="/icons/tridot.svg" alt="" />
                      </button>
                      <ActionMenu
                        menuRef={menuRef}
                        activeMenuRow={activeMenuRow}
                        index={index}
                        row={row}
                        handleUserClick={handleUserClick}
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className={styles.emptyTable}>
                  No users added yet...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      {paginatedUsers.length > 0 && (
        <div className={styles.pagination}>
          <div className={styles.paginationInfo}>
            <span>Showing</span>
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className={styles.itemsPerPage}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <span>out of {filteredUsers.length}</span>
          </div>

          <div className={styles.paginationControls}>
            <button
              className={styles.paginationArrow}
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M8.75 3.5L5.25 7L8.75 10.5"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </button>

            {renderPageNumbers()}

            <button
              className={styles.paginationArrow}
              onClick={() => handlePageChange(Math.max(1, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M5.25 3.5L8.75 7L5.25 10.5"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
