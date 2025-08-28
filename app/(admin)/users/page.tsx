'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import BasicTableOne from "@/components/tables/BasicTableOne";
import SearchInput from "@/components/common/SearchInput";
import StatusChip from "@/components/common/StatusChip";
import ActionButtons from "@/components/common/ActionButtons";
import Button from "@/components/ui/button/Button";
import { formatDateToLocale } from "@/ultils/format-date";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchUsersAsync, setSearchTerm } from "@/store/slices/usersSlice";

export default function UsersPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { filteredData: users, isLoading, error, searchTerm } = useAppSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsersAsync());
  }, [dispatch]);

  if (error) throw new Error("Lỗi khi tải danh sách người dùng");

  const handleView = (userId: string) => {
    router.push(`/users/${userId}`);
  };

  const handleEdit = (userId: string) => {
    console.log('Edit user:', userId);
    // TODO: Implement edit user functionality
  };

  const handleDelete = (userId: string) => {
    console.log('Delete user:', userId);
    // TODO: Implement delete user functionality
  };

  const handleCreate = () => {
    console.log('Create new user');
    // TODO: Implement create user functionality
  };

  const columns = [
    { header: "ID", accessor: "id" },
    { header: "Name", accessor: "name" },
    { header: "Phone", accessor: "phone" },
    { header: "Email", accessor: "email" },
    { header: "Caprover Instance", accessor: "caprover_instance" },
    { header: "N8N Instance", accessor: "n8n_instance" },
    { header: "Role", accessor: "role" },
    {
      header: "Status",
      accessor: "status",
      render: (value: string) => <StatusChip status={value} />
    },
    { header: "Created At", accessor: "created_at", render: (value: string) => formatDateToLocale(value) },
    { header: "Updated At", accessor: "updated_at", render: (value: string) => formatDateToLocale(value) },
    {
      header: "Action",
      accessor: "id",
      render: (value: string) => (
        <ActionButtons
          onView={() => handleView(value)}
          onEdit={() => handleEdit(value)}
          onDelete={() => handleDelete(value)}
        />
      )
    },
  ];

  return (
    <div className="w-full max-w-full">
      <div className="space-y-6">
        {/* Search Input */}
        <div className="flex items-center justify-between gap-4 w-full">
          <div className="w-full max-w-md">
            <SearchInput
              value={searchTerm}
              onChange={(value) => dispatch(setSearchTerm(value))}
              placeholder="Search by name, email, or phone..."
            />
          </div>
          <Button onClick={handleCreate}>
            Create User
          </Button>
        </div>
        {/* Table Container */}
        <div className="w-full">
          <BasicTableOne
            data={users as any[]}
            columns={columns}
            loading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
