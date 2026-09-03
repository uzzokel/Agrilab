import { auth } from "@/auth";
import { handleGoogleSignIn, handleSignOut } from "@/app/actions/auth-actions";

export default async function AuthButton() {
  const session = await auth();

  return (
    <div>
      {session?.user ? (
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium">{session.user.name}</span>
          <form action={handleSignOut}>
            <button
              type="submit"
              className="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 dark:bg-red-950/50 dark:text-red-400"
            >
              Sign Out
            </button>
          </form>
        </div>
      ) : (
        <form action={handleGoogleSignIn}>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700"
          >
            Sign In with Google
          </button>
        </form>
      )}
    </div>
  );
}