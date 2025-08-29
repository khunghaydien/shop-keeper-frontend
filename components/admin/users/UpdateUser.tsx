import React from 'react';
import { User } from '@/services/user-services';
import UserForm from './UserForm';

interface UpdateUserProps {
  user: User;
  onSuccess?: () => void;
}

const UpdateUser: React.FC<UpdateUserProps> = ({ user, onSuccess }) => {
  return <UserForm user={user} onSuccess={onSuccess} />;
};

export default UpdateUser;
