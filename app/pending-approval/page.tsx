import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";

export default async function PendingApprovalPage() {
  const session = await auth();

  // If not logged in at all, kick them back to login
  if (!session) {
    redirect("/api/auth/signin");
  }

  const user = session.user as any;

  // If somehow an approved user gets here, bounce them to the login portal
  if (user?.status === "APPROVED") {
    redirect("/login-agri");
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center space-y-6">
        
        {/* Icon / Status Badge */}
        <div className="mx-auto w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center border border-amber-100">
          <svg 
            className="w-8 h-8 text-amber-600 animate-pulse" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
        </div>

        {/* Heading & Subtitle */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Approval Pending
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            Thank you for registering, <span className="font-semibold text-slate-900">{user?.name || "Partner"}</span>. 
            Your agricultural profile and credentials have been submitted for administrative review.
          </p>
        </div>

        {/* Account Details Box */}
        <div className="bg-slate-50 rounded-xl p-4 text-left border border-slate-100 space-y-2">
          <div className="flex justify-between text-xs text-slate-500">
            <span>Email Address:</span>
            <span className="font-medium text-slate-700">{user?.email}</span>
          </div>
          <div className="flex justify-between text-xs text-slate-500">
            <span>Status:</span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
              PENDING REVIEW
            </span>
          </div>
        </div>

        {/* Instruction Note */}
        <p className="text-xs text-slate-500">
          You will receive access to the protected dashboards and your unique Agri ID once an administrator approves your submission.
        </p>

        {/* Sign Out Button */}
        <form 
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/api/auth/signin" });
          }}
        >
          <button
            type="submit"
            className="w-full py-2.5 px-4 border border-slate-300 rounded-xl text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
          >
            Sign Out
          </button>
        </form>

      </div>
    </main>
  );
}