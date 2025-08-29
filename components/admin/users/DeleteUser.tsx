import React from 'react';
import { User } from '@/services/user-services';
import { useAppDispatch } from '@/store/hooks';
import { deleteUserAsync } from '@/store/slices/usersSlice';
import { useModalContext } from '@/context/ModalContext';
import Button from '@/components/ui/button/Button';

interface DeleteUserProps {
  user: User;
  onSuccess?: () => void;
}

const DeleteUser: React.FC<DeleteUserProps> = ({ user, onSuccess }) => {
  const dispatch = useAppDispatch();
  const { closeModal } = useModalContext();
  const [isDeleting, setIsDeleting] = React.useState(false);

  const handleDelete = async () => {
    if (!user.id) return;
    
    setIsDeleting(true);
    try {
      await dispatch(deleteUserAsync(user.id)).unwrap();
      onSuccess?.();
      closeModal();
    } catch (error) {
      console.error('Failed to delete user:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <div className="text-center">
        {/* Warning Icon */}
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900 mb-4">
          <svg
            className="h-6 w-6 text-red-600 dark:text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>

        {/* Title */}
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          Delete User
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Are you sure you want to delete <span className="font-semibold">{user.name}</span>? 
          This action cannot be undone.
        </p>

        {/* User Info */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-6 text-left">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <p><span className="font-medium">Name:</span> {user.name}</p>
            <p><span className="font-medium">Email:</span> {user.email}</p>
            <p><span className="font-medium">Phone:</span> {user.phone}</p>
            <p><span className="font-medium">Role:</span> {user.role}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={closeModal}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="danger"
            onClick={handleDelete}
            disabled={isDeleting}
            loading={isDeleting}
          >
            Delete User
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUser;
