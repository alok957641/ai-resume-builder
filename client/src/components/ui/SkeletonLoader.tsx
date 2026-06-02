export default function DashboardSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-8 animate-pulse">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[1,2,3].map(i => (
          <div key={i} className="h-20 bg-gray-200 rounded-2xl" />
        ))}
      </div>
      {/* Cards */}
      <div className="grid grid-cols-3 gap-5">
        {[1,2,3,4,5,6].map(i => (
          <div key={i} className="bg-gray-200 rounded-2xl h-52" />
        ))}
      </div>
    </div>
  );
}

export function ResumeSkeleton() {
  return (
    <div className="bg-white p-8 animate-pulse space-y-4">
      <div className="h-8 bg-gray-200 rounded w-1/3" />
      <div className="h-4 bg-gray-200 rounded w-2/3" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
      <div className="h-32 bg-gray-200 rounded mt-6" />
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-4 bg-gray-200 rounded w-2/3" />
    </div>
  );
}