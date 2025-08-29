import React from 'react';
import UserForm from './UserForm';

interface CreateUserProps {
  onSuccess?: () => void;
}

const CreateUser: React.FC<CreateUserProps> = ({ onSuccess }) => {
  return <UserForm user={null} onSuccess={onSuccess} />;
};

export default CreateUser;
