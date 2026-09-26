export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-400 px-4 py-12">
      <div className="w-full max-w-md space-y-6 rounded-xl bg-white p-8 shadow-lg text-center">
        <div>
          <span className="inline-block rounded-full bg-amber-100 p-3 text-amber-600 mb-3">
            <svg
              className="h-8 w-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </span>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Access Restricted
          </h2>
          <p className="mt-3 text-sm text-gray-600 leading-relaxed">
            You must be signed in via Google and approved by an administrator to view features, the blog, or your dashboard. 
          </p>
          <p className="mt-2 text-xs text-gray-500">
            Please use the login button in the navigation bar above to get started.
          </p>
        </div>
      </div>
    </div>
  );
}