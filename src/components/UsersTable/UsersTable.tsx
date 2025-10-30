import { useRef, useState } from "react";
import styles from "./UsersTable.module.scss";
import useClickOutside from "../../hooks/useClickOutside";
import { Link } from "react-router";
import { USERS_ROUTE } from "../../utils/routes";
import type { UserProps, UsersTableProps } from "../../utils/interfaces";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useAppSelector } from "../../redux/hooks";

export default function UsersTable({
  totalItems,
  currentPage,
  setCurrentPage,
  itemsPerPage,
  setItemsPerPage,
  loadingData,
}: UsersTableProps) {
  const users = useAppSelector((state) => state.user.users || []);
  const filterRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [activeMenuRow, setActiveMenuRow] = useState<number | null>(null);

  const [filters, setFilters] = useState({
    organization: "",
    username: "",
    email: "",
    date: "",
    phoneNumber: "",
    status: "",
  });

  const totalPages = Math.ceil(totalItems / itemsPerPage);

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

  const handleFilterChange = (field: string, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleFilterSubmit = () => {
    setShowFilterDropdown(false);
  };

  const handleResetFilters = () => {
    setFilters({
      organization: "",
      username: "",
      email: "",
      date: "",
      phoneNumber: "",
      status: "",
    });
  };

  const toggleMenu = (index: number | null) => {
    setActiveMenuRow(activeMenuRow === index ? null : index);
  };

  useClickOutside(
    filterRef,
    () => showFilterDropdown === true && setShowFilterDropdown(false)
  );
  useClickOutside(menuRef, () => setActiveMenuRow(null));

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
          onClick={() => setCurrentPage(page as number)}
        >
          {page}
        </button>
      );
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
                {showFilterDropdown && (
                  <div ref={filterRef} className={styles.filterDropdown}>
                    <div className={styles.filterForm}>
                      <div className={styles.filterField}>
                        <label>Organization</label>
                        <select
                          value={filters.organization}
                          onChange={(e) =>
                            handleFilterChange("organization", e.target.value)
                          }
                        >
                          <option value="">Select</option>
                          <option value="lendsqr">Lendsqr</option>
                          <option value="irorun">Irorun</option>
                          <option value="lendstar">Lendstar</option>
                        </select>
                      </div>

                      <div className={styles.filterField}>
                        <label>Username</label>
                        <input
                          type="text"
                          placeholder="User"
                          value={filters.username}
                          onChange={(e) =>
                            handleFilterChange("username", e.target.value)
                          }
                        />
                      </div>

                      <div className={styles.filterField}>
                        <label>Email</label>
                        <input
                          type="email"
                          placeholder="Email"
                          value={filters.email}
                          onChange={(e) =>
                            handleFilterChange("email", e.target.value)
                          }
                        />
                      </div>

                      <div className={styles.filterField}>
                        <label>Date</label>
                        <input
                          type="date"
                          placeholder="Date"
                          value={filters.date}
                          onChange={(e) =>
                            handleFilterChange("date", e.target.value)
                          }
                        />
                      </div>

                      <div className={styles.filterField}>
                        <label>Phone Number</label>
                        <input
                          type="tel"
                          placeholder="Phone Number"
                          value={filters.phoneNumber}
                          onChange={(e) =>
                            handleFilterChange("phoneNumber", e.target.value)
                          }
                        />
                      </div>

                      <div className={styles.filterField}>
                        <label>Status</label>
                        <select
                          value={filters.status}
                          onChange={(e) =>
                            handleFilterChange("status", e.target.value)
                          }
                        >
                          <option value="">Select</option>
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                          <option value="pending">Pending</option>
                          <option value="blacklisted">Blacklisted</option>
                        </select>
                      </div>

                      <div className={styles.filterActions}>
                        <button
                          className={styles.btnReset}
                          onClick={handleResetFilters}
                        >
                          Reset
                        </button>
                        <button
                          className={styles.btnFilter}
                          onClick={handleFilterSubmit}
                        >
                          Filter
                        </button>
                      </div>
                    </div>
                  </div>
                )}
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
                <td colSpan={7}>
                  <Skeleton count={7.5} />
                </td>
              </tr>
            ) : users.length > 0 ? (
              users.map((row: UserProps, index: number) => (
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
                      {activeMenuRow === index && (
                        <div ref={menuRef} className={styles.actionMenu}>
                          <Link to={`${USERS_ROUTE.link}/${row.id}`}>
                            <button className={styles.menuItem}>
                              <img src="/icons/view.svg" alt="" />
                              View Details
                            </button>
                          </Link>
                          <button className={styles.menuItem}>
                            <img src="/icons/delete.svg" alt="" />
                            Blacklist User
                          </button>
                          <button className={styles.menuItem}>
                            <img src="/icons/tick.svg" alt="" />
                            Activate User
                          </button>
                        </div>
                      )}
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
      {users.length > 0 && (
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
            <span>out of {totalItems}</span>
          </div>

          <div className={styles.paginationControls}>
            <button
              className={styles.paginationArrow}
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
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
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
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
