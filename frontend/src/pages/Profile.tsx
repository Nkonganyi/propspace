import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import InputField from "../components/InputField";
import ImageUploadInput from "../components/ImageUploadInput";
import { PhoneIcon, CheckCircleIcon, AlertCircleIcon } from "../components/icons";

export default function Profile() {
  const { user, updateUser } = useAuth();
  const [username, setUsername] = useState(user?.username || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [avatar, setAvatar] = useState(user?.avatar || "");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const initials = (user?.username || "?").trim().charAt(0).toUpperCase();

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await api.put("/users/profile", {
        username,
        phone,
        avatar,
      });

      if (user) {
        updateUser({
          ...user,
          username: res.data.username,
          phone: res.data.phone,
          avatar: res.data.avatar,
        });
      }

      setMessage("Profile updated successfully!");
    } catch (err: any) {
      setError(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      await api.put("/users/password", {
        oldPassword,
        newPassword,
      });

      setMessage("Password updated successfully!");
      setOldPassword("");
      setNewPassword("");
    } catch (err: any) {
      setError(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-shell py-12 sm:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-8 text-center sm:text-left">
          Profile Settings
        </h1>

        {/* Account overview card */}
        <div className="surface-card p-6 sm:p-8 mb-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
          {avatar ? (
            <img
              src={avatar}
              alt="Avatar preview"
              className="w-20 h-20 rounded-full object-cover border-4 border-primary-100 shadow-sm flex-shrink-0"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-2xl font-bold shadow-sm flex-shrink-0">
              {initials}
            </div>
          )}
          <div>
            <h2 className="text-xl font-bold text-slate-900">{user?.username}</h2>
            <p className="text-slate-500 mt-1">{user?.email}</p>
            {user?.phone && (
              <p className="text-slate-500 mt-1 flex items-center justify-center sm:justify-start gap-1.5">
                <PhoneIcon className="w-4 h-4" /> {user.phone}
              </p>
            )}
          </div>
        </div>

        {message && (
          <div className="alert-success mb-6">
            <CheckCircleIcon className="w-4 h-4 shrink-0" /> {message}
          </div>
        )}

        {error && (
          <div className="alert-error mb-6">
            <AlertCircleIcon className="w-4 h-4 shrink-0" /> {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Update profile */}
          <div className="surface-card p-7 sm:p-8">
            <h2 className="text-lg font-bold text-slate-900 mb-6">Update Profile</h2>
            <form onSubmit={handleUpdateProfile} className="space-y-5">
              <InputField
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <InputField
                label="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <ImageUploadInput
                label="Avatar"
                value={avatar}
                onChange={setAvatar}
                placeholder="https://example.com/avatar.jpg"
              />

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-full py-3.5"
              >
                {loading ? "Updating..." : "Update Profile"}
              </button>
            </form>
          </div>

          {/* Change password */}
          <div className="surface-card p-7 sm:p-8">
            <h2 className="text-lg font-bold text-slate-900 mb-6">Change Password</h2>
            <form onSubmit={handleChangePassword} className="space-y-5">
              <InputField
                label="Current Password"
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
              <InputField
                label="New Password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="At least 6 characters"
                required
              />

              <button
                type="submit"
                disabled={loading}
                className="btn btn-success w-full py-3.5"
              >
                {loading ? "Updating..." : "Change Password"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
