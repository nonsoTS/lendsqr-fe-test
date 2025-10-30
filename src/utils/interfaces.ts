export interface NavItemProps {
  icon: string;
  title: string;
  secondIcon?: string;
  link: string;
}

export interface NavGroupProps {
  title: string;
  links: NavItemProps[];
}

export interface OpenMenuProps {
  (): void;
}

export interface NavbarProps {
  toggleMenu: OpenMenuProps;
}

export interface UserProps {
  id?: string;
  organization: string;
  username: string;
  email: string;
  dateJoined: string;
  phoneNumber: string;
  status: string;
}

export interface UsersTableProps {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  itemsPerPage: number;
  setItemsPerPage: React.Dispatch<React.SetStateAction<number>>;
  loadingData: boolean;
  setLoadingData: React.Dispatch<React.SetStateAction<boolean>>;
  filteredUsers: UserProps[] | [];
  setFilteredUsers: React.Dispatch<React.SetStateAction<UserProps[] | []>>;
}

export interface FilterProps {
  organization?: string;
  username?: string;
  email?: string;
  date?: string;
  phoneNumber?: string;
  status?: string;
}

export interface UsersFilterProps {
  showFilterDropdown: boolean;
  filterRef: React.RefObject<HTMLDivElement | null>;
  filters: FilterProps;
  handleResetFilters: () => void;
  handleFilterSubmit: () => void;
  handleFilterChange: (field: string, value: string) => void;
}

export interface ActionMenuProps {
  menuRef: React.RefObject<HTMLDivElement | null>;
  activeMenuRow: number | null;
  index: number;
  row: UserProps;
  handleUserClick: (userId?: string) => void
}
