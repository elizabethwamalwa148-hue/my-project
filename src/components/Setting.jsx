import { useState } from 'react';

function Toggle({ checked, onChange, label, description }) {
  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <p className="text-sm font-medium">{label}</p>
        {description && <p className="text-xs text-slate-500">{description}</p>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative w-11 h-6 rounded-full transition ${checked ? 'bg-slate-900' : 'bg-slate-300'}`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
            checked ? 'translate-x-5' : ''
          }`}
        />
      </button>
    </div>
  );
}

function Settings() {
  const [school, setSchool] = useState({
    name: 'Green Hills Secondary School',
    email: 'info@greenhills.ac.ke',
    phone: '+254 700 000 000',
    address: 'Nairobi, Kenya',
    academicYear: '2026',
    currentTerm: 'Term 3',
  });

  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    feeReminders: true,
    attendanceAlerts: true,
  });

  const [preferences, setPreferences] = useState({
    language: 'English',
    timezone: 'Africa/Nairobi',
    dateFormat: 'DD/MM/YYYY',
  });

  const [message, setMessage] = useState('');

  const inputClass =
    'border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-slate-400';

  const handleSchoolChange = (e) => setSchool({ ...school, [e.target.name]: e.target.value });
  const handlePrefChange = (e) => setPreferences({ ...preferences, [e.target.name]: e.target.value });
  const toggle = (key) => (value) => setNotifications({ ...notifications, [key]: value });

  const handleSave = (e) => {
    e.preventDefault();
    // Later: send school, notifications and preferences to your backend here
    setMessage('Settings saved successfully.');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <form onSubmit={handleSave} className="max-w-3xl">
      <h2 className="text-2xl font-bold mb-1">Settings</h2>
      <p className="text-slate-500 text-sm mb-6">Manage school information and system preferences</p>

      {message && (
        <div className="mb-4 px-4 py-3 rounded-lg bg-slate-100 text-slate-700 text-sm">{message}</div>
      )}

      
      <div className="bg-white border rounded-lg p-6 mb-6">
        <h3 className="font-semibold mb-4">School information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-sm mb-1">School name</label>
            <input name="name" value={school.name} onChange={handleSchoolChange} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input type="email" name="email" value={school.email} onChange={handleSchoolChange} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm mb-1">Phone</label>
            <input name="phone" value={school.phone} onChange={handleSchoolChange} className={inputClass} />
          </div>
          <div className="col-span-2">
            <label className="block text-sm mb-1">Address</label>
            <input name="address" value={school.address} onChange={handleSchoolChange} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm mb-1">Academic year</label>
            <input name="academicYear" value={school.academicYear} onChange={handleSchoolChange} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm mb-1">Current term</label>
            <select name="currentTerm" value={school.currentTerm} onChange={handleSchoolChange} className={inputClass}>
              <option>Term 1</option>
              <option>Term 2</option>
              <option>Term 3</option>
            </select>
          </div>
        </div>
      </div>

      
      <div className="bg-white border rounded-lg p-6 mb-6">
        <h3 className="font-semibold mb-2">Notifications</h3>
        <div className="divide-y">
          <Toggle label="Email notifications" description="Receive updates by email" checked={notifications.email} onChange={toggle('email')} />
          <Toggle label="SMS notifications" description="Receive updates by text message" checked={notifications.sms} onChange={toggle('sms')} />
          <Toggle label="Fee reminders" description="Remind parents about unpaid fees" checked={notifications.feeReminders} onChange={toggle('feeReminders')} />
          <Toggle label="Attendance alerts" description="Alert when a student is absent" checked={notifications.attendanceAlerts} onChange={toggle('attendanceAlerts')} />
        </div>
      </div>

    
      <div className="bg-white border rounded-lg p-6 mb-6">
        <h3 className="font-semibold mb-4">Preferences</h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm mb-1">Language</label>
            <select name="language" value={preferences.language} onChange={handlePrefChange} className={inputClass}>
              <option>English</option>
              <option>Kiswahili</option>
            </select>
          </div>
          <div>
            <label className="block text-sm mb-1">Timezone</label>
            <select name="timezone" value={preferences.timezone} onChange={handlePrefChange} className={inputClass}>
              <option>Africa/Nairobi</option>
              <option>UTC</option>
            </select>
          </div>
          <div>
            <label className="block text-sm mb-1">Date format</label>
            <select name="dateFormat" value={preferences.dateFormat} onChange={handlePrefChange} className={inputClass}>
              <option>DD/MM/YYYY</option>
              <option>MM/DD/YYYY</option>
              <option>YYYY-MM-DD</option>
            </select>
          </div>
        </div>
      </div>

      <button type="submit" className="bg-slate-900 text-white px-5 py-2 rounded-lg text-sm hover:bg-slate-700 mb-8">
        Save settings
      </button>

      
      <div className="border border-red-200 rounded-lg p-6">
        <h3 className="font-semibold text-red-700 mb-1">Danger zone</h3>
        <p className="text-sm text-slate-500 mb-4">These actions affect the whole system and cannot be undone.</p>
        <button
          type="button"
          onClick={() => window.confirm('Reset all settings to defaults?')}
          className="px-4 py-2 rounded-lg border border-red-300 text-red-700 text-sm hover:bg-red-50"
        >
          Reset settings
        </button>
      </div>
    </form>
  );
}

export default Settings;




