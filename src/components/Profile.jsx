import { useState } from 'react';

function loadUser() {
  try {
    return JSON.parse(localStorage.getItem('user')) || {};
  } catch {
    return {};
  }
}

function Profile() {
  
  const [user, setUser] = useState(loadUser);

  
  const [first, ...rest] = (user.name || '').split(' ');

  const [profile, setProfile] = useState({
    firstName: first || '',
    lastName: rest.join(' '),
    email: user.email || '',
    phone: user.phone || '',
    role: user.role || '',
    address: user.address || '',
  });

  const [passwords, setPasswords] = useState({
    current: '',
    next: '',
    confirm: '',
  });

  const [message, setMessage] = useState('');

  const initials = (
    `${profile.firstName[0] || ''}${profile.lastName[0] || ''}` ||
    (user.name?.[0] || '?')
  ).toUpperCase();

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    const updated = {
      ...user,
      name: `${profile.firstName} ${profile.lastName}`.trim(),
      email: profile.email,
      phone: profile.phone,
      address: profile.address,
    };
    
    localStorage.setItem('user', JSON.stringify(updated));
    setUser(updated);
    setMessage('Profile updated successfully.');
    setTimeout(() => setMessage(''), 3000);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwords.next.length < 6) {
      setMessage('New password must be at least 6 characters.');
      return;
    }
    if (passwords.next !== passwords.confirm) {
      setMessage('New passwords do not match.');
      return;
    }
    
    setPasswords({ current: '', next: '', confirm: '' });
    setMessage('Password changed successfully.');
    setTimeout(() => setMessage(''), 3000);
  };

  const inputClass =
    'border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-slate-400';

  return (
    <div className="max-w-3xl">
      <h2 className="text-2xl font-bold mb-1">My Profile</h2>
      <p className="text-slate-500 text-sm mb-6">Manage your personal information and password</p>

      {message && (
        <div className="mb-4 px-4 py-3 rounded-lg bg-slate-100 text-slate-700 text-sm">
          {message}
        </div>
      )}

      
      <div className="bg-white border rounded-lg p-6 flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-full bg-slate-900 text-white flex items-center justify-center text-xl font-bold">
          {initials}
        </div>
        <div>
          <p className="text-lg font-semibold">
            {profile.firstName} {profile.lastName}
          </p>
          <p className="text-slate-500 text-sm">{profile.email}</p>
          {profile.role && (
            <span className="inline-block mt-1 px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-700">
              {profile.role}
            </span>
          )}
        </div>
      </div>

      
      <form onSubmit={handleSave} className="bg-white border rounded-lg p-6 mb-6">
        <h3 className="font-semibold mb-4">Personal information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">First name</label>
            <input name="firstName" value={profile.firstName} onChange={handleProfileChange} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm mb-1">Last name</label>
            <input name="lastName" value={profile.lastName} onChange={handleProfileChange} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input type="email" name="email" value={profile.email} onChange={handleProfileChange} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm mb-1">Phone</label>
            <input name="phone" value={profile.phone} onChange={handleProfileChange} placeholder="+254 700 000 000" className={inputClass} />
          </div>
          <div className="col-span-2">
            <label className="block text-sm mb-1">Address</label>
            <input name="address" value={profile.address} onChange={handleProfileChange} placeholder="Nairobi, Kenya" className={inputClass} />
          </div>
        </div>
        <button type="submit" className="mt-4 bg-slate-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-slate-700">
          Save changes
        </button>
      </form>

      
      <form onSubmit={handlePasswordSubmit} className="bg-white border rounded-lg p-6">
        <h3 className="font-semibold mb-4">Change password</h3>
        <div className="grid gap-4 max-w-sm">
          <div>
            <label className="block text-sm mb-1">Current password</label>
            <input type="password" name="current" value={passwords.current} onChange={handlePasswordChange} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm mb-1">New password</label>
            <input type="password" name="next" value={passwords.next} onChange={handlePasswordChange} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm mb-1">Confirm new password</label>
            <input type="password" name="confirm" value={passwords.confirm} onChange={handlePasswordChange} className={inputClass} />
          </div>
        </div>
        <button type="submit" className="mt-4 bg-slate-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-slate-700">
          Update password
        </button>
      </form>
    </div>
  );
}

export default Profile;
