import React from 'react';
import { User } from '@/services/user-services';
import { useUserForm } from '@/hooks/useUserForm';
import InputField from '@/components/form/input/InputField';
import Select from '@/components/form/Select';
import Button from '@/components/ui/button/Button';
import { useModalContext } from '@/context/ModalContext';

interface UserFormProps {
    user: User | null;
    onSuccess?: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ user, onSuccess }) => {
    const { closeModal } = useModalContext();
    const { formik, isSubmitting, title, submitButtonText } = useUserForm(user, () => {
        onSuccess?.();
        closeModal();
    });

    const roleOptions = [
        { value: 'admin', label: 'Admin' },
        { value: 'user', label: 'User' },
        { value: 'moderator', label: 'Moderator' },
    ];

    const statusOptions = [
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' },
    ];

    return (
        <div className="w-full max-w-2xl mx-auto p-6">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                    {user ? 'Update user information' : 'Create a new user'}
                </p>
            </div>

            <form onSubmit={formik.handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div>
                        <InputField
                            label="Name"
                            name="name"
                            type="text"
                            placeholder="Enter user name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.name && formik.errors.name}
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <InputField
                            label="Phone"
                            name="phone"
                            type="tel"
                            placeholder="Enter phone number"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.phone && formik.errors.phone}
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <InputField
                            label="Email"
                            name="email"
                            type="email"
                            placeholder="Enter email address"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email && formik.errors.email}
                        />
                    </div>

                    {/* Role */}
                    <div>
                        <Select
                            label="Role"
                            name="role"
                            value={formik.values.role}
                            onChange={(value) => formik.setFieldValue('role', value)}
                            onBlur={formik.handleBlur}
                            error={formik.touched.role && formik.errors.role}
                            options={roleOptions}
                            placeholder="Select role"
                        />
                    </div>

                    {/* Status */}
                    <div>
                        <Select
                            label="Status"
                            name="status"
                            value={formik.values.status}
                            onChange={(value) => formik.setFieldValue('status', value)}
                            onBlur={formik.handleBlur}
                            error={formik.touched.status && formik.errors.status}
                            options={statusOptions}
                            placeholder="Select status"
                        />
                    </div>

                    {/* Caprover Instance */}
                    <div>
                        <InputField
                            label="Caprover Instance"
                            name="caprover_instance"
                            type="text"
                            placeholder="Enter caprover instance (optional)"
                            value={formik.values.caprover_instance}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.caprover_instance && formik.errors.caprover_instance}
                        />
                    </div>
                </div>
                {/* N8N Instance */}
                <div>
                    <InputField
                        label="N8N Instance"
                        name="n8n_instance"
                        type="text"
                        placeholder="Enter n8n instance (optional)"
                        value={formik.values.n8n_instance}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.n8n_instance && formik.errors.n8n_instance}
                    />
                </div>
                {/* Action Buttons */}
                <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={closeModal}
                        disabled={isSubmitting}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        loading={isSubmitting}
                    >
                        {submitButtonText}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default UserForm;
