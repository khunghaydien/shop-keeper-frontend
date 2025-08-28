'use client'
import { useEffect } from 'react';
import BasicTableOne from "@/components/tables/BasicTableOne";
import SearchInput from "@/components/common/SearchInput";
import { formatDate } from "@/ultils/format-date";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchPagesAsync, setSearchTerm } from "@/store/slices/pagesSlice";

export default function PagesPage() {
    const dispatch = useAppDispatch();
    const { filteredData: pages, isLoading, error, searchTerm } = useAppSelector((state) => state.pages);

    useEffect(() => {
        dispatch(fetchPagesAsync());
    }, [dispatch]);

    if (error) throw new Error("Lỗi khi tải danh sách người dùng");

    const columns = [
        { header: "Original Name", accessor: "page_name" },
        { header: "Original Id", accessor: "page_id" },
        { header: "Created At", accessor: "created_at", render: (value: string) => formatDate(value) },
        { header: "Updated At", accessor: "updated_at", render: (value: string) => formatDate(value) },
    ];

    return (
        <div>
            <div className="space-y-6 relative">
                {/* Search Input */}
                <div className="max-w-md">
                    <SearchInput
                        value={searchTerm}
                        onChange={(value) => dispatch(setSearchTerm(value))}
                        placeholder="Search by page name..."
                    />
                </div>

                {isLoading ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/70 dark:bg-gray-900/70 z-10">
                        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : (
                    <div className={isLoading ? "blur-sm pointer-events-none" : ""}>
                        <BasicTableOne data={pages as any[]} columns={columns} />
                    </div>
                )}
            </div>
        </div>
    );
}
