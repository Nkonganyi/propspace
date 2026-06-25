import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { PhoneIcon, PlusIcon, HomeIcon, SettingsIcon, LogOutIcon } from "../components/icons";

export default function Dashboard() {
  const { user, logout } = useAuth();

  const initials = (user?.username || "?")
    .trim()
    .charAt(0)
    .toUpperCase();

  return (
    <div className="page-shell py-12 sm:py-20">
      <div className="container-page">
        {/* Welcome section */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-2">
            Welcome back, <span className="text-primary">{user?.username}</span>!
          </h1>
          <p className="text-slate-500">
            Here's what's happening with your PropSpace account.
          </p>
        </div>

        {/* User info card */}
        <div className="surface-card p-6 sm:p-8 mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover border-4 border-primary-100 shadow-sm flex-shrink-0"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-2xl font-bold shadow-sm flex-shrink-0">
                {initials}
              </div>
            )}

            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-bold text-slate-900">{user?.username}</h2>
              <p className="text-slate-500 mt-1">{user?.email}</p>
              {user?.phone && (
                <p className="text-slate-500 mt-1 flex items-center gap-1.5">
                  <PhoneIcon className="w-4 h-4" /> {user.phone}
                </p>
              )}
            </div>

            <Link to="/profile" className="btn btn-ghost shrink-0">
              Edit Profile
            </Link>
          </div>
        </div>

        {/* Quick actions */}
        <div>
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <Link
              to="/create"
              className="surface-card surface-card-hover flex flex-col items-center justify-center gap-3 px-6 py-8 text-center"
            >
              <span className="w-12 h-12 rounded-xl bg-primary-50 text-primary flex items-center justify-center">
                <PlusIcon className="w-6 h-6" />
              </span>
              <span className="font-semibold text-slate-900">Create New Listing</span>
            </Link>
            <Link
              to="/mine"
              className="surface-card surface-card-hover flex flex-col items-center justify-center gap-3 px-6 py-8 text-center"
            >
              <span className="w-12 h-12 rounded-xl bg-accent-50 text-accent-600 flex items-center justify-center">
                <HomeIcon className="w-6 h-6" />
              </span>
              <span className="font-semibold text-slate-900">My Listings</span>
            </Link>
            <Link
              to="/profile"
              className="surface-card surface-card-hover flex flex-col items-center justify-center gap-3 px-6 py-8 text-center"
            >
              <span className="w-12 h-12 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center">
                <SettingsIcon className="w-6 h-6" />
              </span>
              <span className="font-semibold text-slate-900">Manage Profile</span>
            </Link>
          </div>
        </div>

        {/* Logout, set apart visually from the primary actions above */}
        <div className="mt-10 pt-6 border-t border-slate-200 flex justify-end">
          <button
            onClick={logout}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-error-600 rounded-xl border border-error-200 hover:bg-error-50 transition-all duration-200 ease-in-out"
          >
            <LogOutIcon className="w-4 h-4" /> Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
