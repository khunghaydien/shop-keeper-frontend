import React from 'react';
import Button from "@/components/ui/button/Button";
import { PencilIcon } from 'lucide-react';

interface InfoCardProps {
    title: string;
    data: Record<string, any>;
    onEdit: () => void;
}

export default function InfoCard({ title, data, onEdit }: InfoCardProps) {
    // Helper function to format field labels
    const formatFieldLabel = (key: string): string => {
        return key
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    // Helper function to format field values
    const formatFieldValue = (key: string, value: any): string => {
        if (value === null || value === undefined || value === '') {
            return '_';
        }

        // Handle date fields
        if (key.includes('_at') && value) {
            try {
                return new Date(value).toLocaleDateString();
            } catch {
                return '_';
            }
        }

        return value.toString();
    };

    // Helper function to render special fields like status
    const renderFieldValue = (key: string, value: any) => {
        if (key === 'status') {
            return (
                <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    {formatFieldValue(key, value)}
                </div>
            );
        }

        return (
            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {formatFieldValue(key, value)}
            </p>
        );
    };

    return (
        <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div className="w-full">
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
                        {title}
                    </h4>

                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
                        {Object.entries(data).map(([key, value]) => (
                            <div key={key}>
                                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                                    {formatFieldLabel(key)}
                                </p>
                                {renderFieldValue(key, value)}
                            </div>
                        ))}
                    </div>
                </div>

                <Button onClick={onEdit}>
                    <PencilIcon className="w-4 h-4" />
                    Edit
                </Button>
            </div>
        </div>
    );
}
