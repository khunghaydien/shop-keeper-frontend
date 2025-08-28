'use client'
import { useEffect } from 'react';
import BasicTableOne from "@/components/tables/BasicTableOne";
import SearchInput from "@/components/common/SearchInput";
import { formatDate } from "@/ultils/format-date";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchProductsAsync, setSearchTerm } from "@/store/slices/productsSlice";

export default function ProductsPage() {
    const dispatch = useAppDispatch();
    const { filteredData: products, isLoading, error, searchTerm } = useAppSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchProductsAsync());
    }, [dispatch]);

    if (error) throw new Error("Lỗi khi tải danh sách người dùng");

    const columns = [
        { header: "Name", accessor: "name" },
        {
            header: "Prompt",
            accessor: "prompt",
            render: (value: string) => (
                <div className="truncate max-w-[200px]" title={value}>
                    {value}
                </div>
            ),
        },
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
                        placeholder="Search by product name..."
                    />
                </div>

                {isLoading ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/70 dark:bg-gray-900/70 z-10">
                        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : (
                    <div className={isLoading ? "blur-sm pointer-events-none" : ""}>
                        <BasicTableOne data={products as any[]} columns={columns} />
                    </div>
                )}
            </div>
        </div>
    );
}
