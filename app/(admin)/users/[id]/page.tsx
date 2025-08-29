'use client'
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import InfoCard from "@/components/common/InfoCard";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchUsersAsync } from "@/store/slices/usersSlice";
import { User } from '@/services/user-services';
import { useModalContext } from '@/context/ModalContext';
import UpdateUser from '@/components/admin/users/UpdateUser';

export default function UserDetailPage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { data: users, isLoading } = useAppSelector((state) => state.users);
  const { openModal } = useModalContext();
  const [user, setUser] = useState<User | null>(null);

  const userId = params.id as string;

  useEffect(() => {
    dispatch(fetchUsersAsync());
  }, [dispatch]);

  useEffect(() => {
    if (users && users.length > 0) {
      const foundUser = users.find(u => u.id === userId);
      setUser(foundUser || null);
    }
  }, [users, userId]);

  const handleEdit = () => {
    if (user) {
      openModal(<UpdateUser user={user} onSuccess={() => dispatch(fetchUsersAsync())} />);
    }
  };

  return (
    <div className="w-full max-w-full">
      <div className="space-y-6">
        {/* User Information Card */}
        <InfoCard
          title="User Details"
          data={user || {}}
          onEdit={handleEdit}
        />
      </div>
    </div>
  );
}
