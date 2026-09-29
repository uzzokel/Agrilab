import { registerAgriProfile } from "./actions";
import { auth } from "@/auth";

export default async function RegisterAgriPage() {
  const session = await auth();
  const defaultEmail = session?.user?.email || "";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
      <div className="max-w-md w-full bg-white rounded-xl shadow-md p-8 border border-gray-100">
        
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Agricultural Profile Setup</h1>
          <p className="text-sm text-gray-600 mt-1">
            Complete your details to request your AgriUnique ID and PIN approval.
          </p>
        </div>

        <form action={registerAgriProfile} className="space-y-4">
          
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              name="name"
              type="text"
              required
              placeholder="e.g., John Adebayo"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 text-gray-900"
            />
          </div>

          {/* State */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              State
            </label>
            <input
              name="state"
              type="text"
              required
              placeholder="e.g., Lagos State, FCT Abuja"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 text-gray-900"
            />
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              defaultValue={defaultEmail}
              required
              placeholder="your.email@example.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 text-gray-900 bg-gray-50"
            />
          </div>

          {/* Chosen Password (6 Digits PIN) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Chosen PIN (6-Digit Number)
            </label>
            <input
              name="pin"
              type="password"
              maxLength={6}
              required
              placeholder="123456"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 text-gray-900 tracking-widest"
            />
            <span className="text-xs text-gray-500 mt-1 block">
              You will use this 6-digit PIN alongside your unique ID to log in later.
            </span>
          </div>

          {/* Designation Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Designation / Role
            </label>
            <select
              name="designation"
              required
              defaultValue=""
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 text-gray-900 bg-white"
            >
              <option value="" disabled>
                Select your designation
              </option>
              <option value="Field Officer">Field Officer</option>
              <option value="Facilitator">Facilitator</option>
              <option value="State PIU">State PIU</option>
              <option value="National PIU">National PIU</option>
              <option value="Extension Agent">Extension Agent</option>
              <option value="Consultant">Consultant</option>
              <option value="User (Farmer)">User (Farmer)</option>
              <option value="External Stakeholder">External Stakeholder (Indicate)</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2.5 rounded-lg font-medium hover:bg-green-700 transition duration-200 shadow-sm mt-2"
          >
            Submit for Admin Approval
          </button>

        </form>
      </div>
    </div>
  );
}