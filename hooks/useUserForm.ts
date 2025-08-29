import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch } from '@/store/hooks';
import { createUserAsync, updateUserAsync } from '@/store/slices/usersSlice';
import { User, CreateUserData, UpdateUserData } from '@/services/user-services';

const userValidationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  phone: Yup.string().required('Phone is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  caprover_instance: Yup.string().optional(),
  n8n_instance: Yup.string().optional(),
  role: Yup.string().required('Role is required'),
  status: Yup.string().oneOf(['active', 'inactive']).required('Status is required'),
});

export const useUserForm = (user: User | null, onSuccess?: () => void) => {
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      name: user?.name || '',
      phone: user?.phone || '',
      email: user?.email || '',
      caprover_instance: user?.caprover_instance || '',
      n8n_instance: user?.n8n_instance || '',
      role: user?.role || '',
      status: (user?.status as 'active' | 'inactive') || 'active',
    },
    enableReinitialize: true,
    validationSchema: userValidationSchema,
    onSubmit: async (values) => {
      try {
        if (user) {
          // Update user
          await dispatch(updateUserAsync({ ...values, id: user.id! })).unwrap();
        } else {
          // Create user
          await dispatch(createUserAsync(values as CreateUserData)).unwrap();
        }
        onSuccess?.();
      } catch (error) {
        console.error('Failed to save user:', error);
      }
    },
  });

  const isSubmitting = formik.isSubmitting;
  const title = user ? 'Update User' : 'Create User';
  const submitButtonText = user ? 'Update' : 'Create';

  return {
    formik,
    isSubmitting,
    title,
    submitButtonText,
  };
};
