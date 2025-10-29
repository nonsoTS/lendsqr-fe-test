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
  id?: string,
  organization: string;
  username: string;
  email: string;
  dateJoined: string;
  phoneNumber: string;
  status: string;
}

export interface UsersTableProps {
  totalItems: number,
  currentPage: number,
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  itemsPerPage: number,
  setItemsPerPage: React.Dispatch<React.SetStateAction<number>>,
  loadingData: boolean
}
