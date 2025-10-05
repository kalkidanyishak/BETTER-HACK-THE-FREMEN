'use client';

import { useState, useEffect } from 'react';
import { authClient } from '@/lib/auth-client'; // Adjust path to your auth client setup

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  banned: boolean;
  // Add other fields as needed
}

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    role: 'user',
  });
  const [updatingUserId, setUpdatingUserId] = useState<string | null>(null);

  // Fetch users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data, error } = await authClient.admin.listUsers({
        query: {
          limit: 50,
          sortBy: 'name',
          sortDirection: 'asc',
        },
      });
      if (error) {
        setError(error.message);
        return;
      }
      setUsers(data?.users || []);
    } catch (err) {
      setError('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Create user
  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await authClient.admin.createUser({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        role: formData.role,
      });
      if (error) {
        setError(error.message);
        return;
      }
      setShowCreateModal(false);
      setFormData({ email: '', password: '', name: '', role: 'user' });
      fetchUsers();
    } catch (err) {
      setError('Failed to create user');
    }
  };

  // Delete user
  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    try {
      const { error } = await authClient.admin.removeUser({
        userId,
      });
      if (error) {
        setError(error.message);
        return;
      }
      fetchUsers();
    } catch (err) {
      setError('Failed to delete user');
    }
  };

  // Set role
  const handleSetRole = async (userId: string, newRole: string) => {
    try {
      const { error } = await authClient.admin.setRole({
        userId,
        role: newRole,
      });
      if (error) {
        setError(error.message);
        return;
      }
      fetchUsers();
    } catch (err) {
      setError('Failed to update role');
    }
  };

  // Ban user
  const handleBanUser = async (userId: string, banned: boolean) => {
    try {
      if (banned) {
        const { error } = await authClient.admin.unbanUser({
          userId,
        });
        if (error) {
          setError(error.message);
          return;
        }
      } else {
        const { error } = await authClient.admin.banUser({
          userId,
          banReason: 'Admin action',
          // Optional: banExpiresIn: 60 * 60 * 24 * 7, // 1 week
        });
        if (error) {
          setError(error.message);
          return;
        }
      }
      fetchUsers();
    } catch (err) {
      setError('Failed to update ban status');
    }
  };

  if (loading) return <div>Loading users...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">User Management</h1>
      <button
        onClick={() => setShowCreateModal(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Create New User
      </button>

      <table className="min-w-full border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b bg-gray-50 dark:bg-gray-800">Name</th>
            <th className="py-2 px-4 border-b bg-gray-50 dark:bg-gray-800">Email</th>
            <th className="py-2 px-4 border-b bg-gray-50 dark:bg-gray-800">Role</th>
            <th className="py-2 px-4 border-b bg-gray-50 dark:bg-gray-800">Banned</th>
            <th className="py-2 px-4 border-b bg-gray-50 dark:bg-gray-800">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b dark:border-gray-700">
              <td className="py-2 px-4">{user.name}</td>
              <td className="py-2 px-4">{user.email}</td>
              <td className="py-2 px-4">
                <select
                  value={user.role}
                  onChange={(e) => handleSetRole(user.id, e.target.value)}
                  className="border rounded px-2 py-1 bg-white dark:bg-gray-800 text-black dark:text-white"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
              <td className="py-2 px-4">
                <input
                  type="checkbox"
                  checked={user.banned}
                  onChange={(e) => handleBanUser(user.id, e.target.checked)}
                  className="rounded border-gray-300 dark:bg-gray-800"
                />
              </td>
              <td className="py-2 px-4">
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded mr-2"
                >
                  Delete
                </button>
                {/* Add more actions like Update User if needed */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Create User Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-96 text-black dark:text-white">
            <h2 className="text-xl font-bold mb-4">Create New User</h2>
            <form onSubmit={handleCreateUser}>
              <div className="mb-4">
                <label className="block mb-1">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border rounded px-2 py-1 bg-white dark:bg-gray-700 text-black dark:text-white"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full border rounded px-2 py-1 bg-white dark:bg-gray-700 text-black dark:text-white"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Password</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full border rounded px-2 py-1 bg-white dark:bg-gray-700 text-black dark:text-white"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Role</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full border rounded px-2 py-1 bg-white dark:bg-gray-700 text-black dark:text-white"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="mr-2 px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}