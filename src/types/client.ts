export interface Client {
  id: number;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  isBlocked: boolean;
  lastLogin: string;
  ordersCount: number;
  ordersTotal: number;
  createdAt: string;
}

export interface Pagination {
  currentPage: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

export interface ClientsResponse {
  clients: Client[];
  pagination: Pagination;
}

export interface ClientTableProps {
  clients: Client[];
  pagination: Pagination;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  loading?: boolean;
}
