user.jsx

import { useState, useEffect } from 'react';

const API = 'http://localhost:8080/api/users';
const emptyForm = { name: '', email: '', role: 'Student', status: 'Active', password: '' };

function User() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState('');
  const [password, setPassword] = useState("");


  const loadUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch(API);
      if (!res.ok) throw new Error();
      setUsers(await res.json());
      setError('');
    } catch {
      setError('Could not load users. Is the backend running on port 8080?');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setFormError('');
    setShowForm(true);
  };

  const openEdit = (u) => {
    setEditingId(u.id);
    setForm({ name: u.name, email: u.email, role: u.role, status: u.status });
    setFormError('');
    setShowForm(true);
  };

  const closeForm = () => setShowForm(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    const isEdit = editingId !== null;
    try {
      const res = await fetch(isEdit ? `${API}/${editingId}` : API, {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setFormError(
          data?.errors
            ? Object.values(data.errors).join(', ')
            : data?.message || 'Something went wrong'
        );
        return;
      }
      closeForm();
      loadUsers();
    } catch {
      setFormError('Could not reach the server');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this user?')) return;
    const res = await fetch(`${API}/${id}`, { method: 'DELETE' });
    if (res.ok) setUsers(users.filter((u) => u.id !== id));
  };

  return (
    <div>
      
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Users</h2>
          <p className="text-slate-500 text-sm">Manage everyone who can access the system</p>
        </div>
        <button
          onClick={openAdd}
          className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-slate-700"
        >
          + Add User
        </button>
      </div>

    
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white border rounded-lg p-4">
          <p className="text-slate-500 text-sm">Total users</p>
          <p className="text-2xl font-bold">{users.length}</p>
        </div>
        <div className="bg-white border rounded-lg p-4">
          <p className="text-slate-500 text-sm">Active</p>
          <p className="text-2xl font-bold">{users.filter((u) => u.status === 'Active').length}</p>
        </div>
        <div className="bg-white border rounded-lg p-4">
          <p className="text-slate-500 text-sm">Inactive</p>
          <p className="text-2xl font-bold">{users.filter((u) => u.status === 'Inactive').length}</p>
        </div>
      </div>

      
      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded-lg px-3 py-2 w-full max-w-sm mb-4"
      />

      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

      
      <div className="bg-white border rounded-lg overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-100 text-slate-600">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan="5" className="px-4 py-6 text-center text-slate-500">Loading...</td>
              </tr>
            )}
            {!loading && filtered.map((u) => (
              <tr key={u.id} className="border-t">
                <td className="px-4 py-3 font-medium">{u.name}</td>
                <td className="px-4 py-3">{u.email}</td>
                <td className="px-4 py-3">{u.role}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    u.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {u.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button onClick={() => openEdit(u)} className="text-blue-600 mr-3">Edit</button>
                  <button onClick={() => handleDelete(u.id)} className="text-red-600">Delete</button>
                </td>
              </tr>
            ))}
            {!loading && filtered.length === 0 && (
              <tr>
                <td colSpan="5" className="px-4 py-6 text-center text-slate-500">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">{editingId ? 'Edit User' : 'Add User'}</h3>

            {formError && <p className="text-red-600 text-sm mb-3">{formError}</p>}

            <label className="block text-sm mb-1">Name</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="border rounded-lg px-3 py-2 w-full mb-3"
            />

            <label className="block text-sm mb-1">Email</label>
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="border rounded-lg px-3 py-2 w-full mb-3"
            />
            <input
             type="password"
             placeholder="Password"
             value={password}
             onChange={(e) => setPassword(e.target.value)}
             required
           />

            <div className="grid grid-cols-2 gap-3 mb-5">
              <div>
                <label className="block text-sm mb-1">Role</label>
                <select
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="border rounded-lg px-3 py-2 w-full"
                >
                  <option>Admin</option>
                  <option>Teacher</option>
                  <option>Student</option>
                </select>
              </div>
              <div>
                <label className="block text-sm mb-1">Status</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className="border rounded-lg px-3 py-2 w-full"
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3.2">
              <button type="button" onClick={closeForm} className="px-4 py-2 text-sm border rounded-lg">
                Cancel
              </button>
              <button type="submit" className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-slate-700">
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default User;