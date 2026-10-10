export default function CategoryProductsSkeleton() {
    return (
        <div className="space-y-4">
            {/* Sort bar skeleton */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-end">
                <div className="w-36 h-8 bg-gray-100 animate-pulse rounded-lg" />
            </div>

            {/* Total count skeleton */}
            <div className="w-32 h-4 bg-gray-200 animate-pulse rounded px-1" />

            {/* Product Cards Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div
                        key={item}
                        className="bg-[#FAFCFA] rounded-2xl p-5 shadow-sm border border-gray-100/80 flex flex-col justify-between animate-pulse"
                    >
                        <div className="flex items-center">
                            <div className="w-12 h-12 rounded-xl bg-gray-200 shrink-0" />
                            <div className="space-y-2 px-3 w-full">
                                <div className="h-4 bg-gray-200 rounded w-3/4" />
                                <div className="h-3 bg-gray-200 rounded w-1/2" />
                            </div>
                        </div>

                        <div className="flex items-end justify-between mt-6">
                            <div className="space-y-1 w-1/2">
                                <div className="h-3 bg-gray-200 rounded w-1/3" />
                                <div className="h-5 bg-gray-200 rounded w-2/3" />
                            </div>
                            <div className="w-12 h-6 bg-gray-200 rounded-lg" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}