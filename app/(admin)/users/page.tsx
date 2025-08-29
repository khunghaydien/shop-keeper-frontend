'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import BasicTableOne from "@/components/tables/BasicTableOne";
import SearchInput from "@/components/common/SearchInput";
import StatusChip from "@/components/common/StatusChip";
import ActionButtons from "@/components/common/ActionButtons";
import Button from "@/components/ui/button/Button";
import { formatDateToLocale } from "@/ultils/format-date";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchUsersAsync, setSearchTerm } from "@/store/slices/usersSlice";
import { User } from "@/services/user-services";
import { useModalContext } from "@/context/ModalContext";
import CreateUser from "@/components/admin/users/CreateUser";
import UpdateUser from "@/components/admin/users/UpdateUser";
import DeleteUser from "@/components/admin/users/DeleteUser";

export default function UsersPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { filteredData: users, isLoading, error, searchTerm } = useAppSelector((state) => state.users);
  const { openModal } = useModalContext();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    dispatch(fetchUsersAsync());
  }, [dispatch]);

  if (error) throw new Error("Lỗi khi tải danh sách người dùng");

  const handleView = (userId: string) => {
    router.push(`/users/${userId}`);
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    openModal(<UpdateUser user={user} onSuccess={() => dispatch(fetchUsersAsync())} />);
  };

  const handleDelete = (user: User) => {
    setSelectedUser(user);
    openModal(<DeleteUser user={user} onSuccess={() => dispatch(fetchUsersAsync())} />);
  };

  const handleCreate = () => {
    setSelectedUser(null);
    openModal(<CreateUser onSuccess={() => dispatch(fetchUsersAsync())} />);
  };

  const columns = [
    { header: "ID", accessor: "id" as keyof User },
    { header: "Name", accessor: "name" as keyof User },
    { header: "Phone", accessor: "phone" as keyof User },
    { header: "Email", accessor: "email" as keyof User },
    { header: "Caprover Instance", accessor: "caprover_instance" as keyof User },
    { header: "N8N Instance", accessor: "n8n_instance" as keyof User },
    { header: "Role", accessor: "role" as keyof User },
    {
      header: "Status",
      accessor: "status" as keyof User,
      render: (value: string) => <StatusChip status={value} />
    },
    { header: "Created At", accessor: "created_at" as keyof User, render: (value: string) => formatDateToLocale(value) },
    { header: "Updated At", accessor: "updated_at" as keyof User, render: (value: string) => formatDateToLocale(value) },
    {
      header: "Action",
      accessor: "id" as keyof User,
      render: (value: string, row: User) => (
        <ActionButtons
          onView={() => handleView(value)}
          onEdit={() => handleEdit(row)}
          onDelete={() => handleDelete(row)}
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
