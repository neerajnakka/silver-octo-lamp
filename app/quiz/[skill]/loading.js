export default function Loading() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
            <div className="mx-auto max-w-4xl px-4">
                <div className="mb-8 animate-pulse">
                    <div className="flex items-center justify-between mb-4">
                        <div className="space-y-2">
                            <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded" />
                            <div className="h-4 w-64 bg-gray-200 dark:bg-gray-700 rounded" />
                        </div>
                        <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded-full" />
                    </div>
                    <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full" />
                </div>

                <div className="h-64 w-full bg-white dark:bg-gray-800 rounded-xl shadow-sm animate-pulse" />
            </div>
        </div>
    );
}
