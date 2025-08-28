'use client'
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import InfoCard from "@/components/common/InfoCard";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchUsersAsync } from "@/store/slices/usersSlice";
import { User } from '@/services/user-services';

export default function UserDetailPage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { data: users, isLoading } = useAppSelector((state) => state.users);
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
    // TODO: Implement edit functionality
    console.log('Edit user:', userId);
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
