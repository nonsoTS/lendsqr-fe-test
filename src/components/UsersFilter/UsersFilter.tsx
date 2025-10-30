import type { UsersFilterProps } from "../../utils/interfaces";
import styles from "./UsersFilter.module.scss";

export default function UsersFilter({
  showFilterDropdown,
  filterRef,
  handleFilterChange,
  handleResetFilters,
  handleFilterSubmit,
  filters,
}: UsersFilterProps) {


    
  return (
    <>
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
                onChange={(e) => handleFilterChange("username", e.target.value)}
              />
            </div>

            <div className={styles.filterField}>
              <label>Email</label>
              <input
                type="email"
                placeholder="Email"
                value={filters.email}
                onChange={(e) => handleFilterChange("email", e.target.value)}
              />
            </div>

            <div className={styles.filterField}>
              <label>Date</label>
              <input
                type="date"
                placeholder="Date"
                value={filters.date}
                onChange={(e) => handleFilterChange("date", e.target.value)}
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
                onChange={(e) => handleFilterChange("status", e.target.value)}
              >
                <option value="">Select</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
                <option value="blacklisted">Blacklisted</option>
              </select>
            </div>

            <div className={styles.filterActions}>
              <button className={styles.btnReset} onClick={handleResetFilters}>
                Reset
              </button>
              <button className={styles.btnFilter} onClick={handleFilterSubmit}>
                Filter
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
