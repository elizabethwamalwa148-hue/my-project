import { Link } from 'react-router-dom';
import { Users, GraduationCap, BookOpen, CalendarCheck } from 'lucide-react';

const stats = [
  { label: 'Total Students', value: 1240, change: '+4.2% this term', Icon: GraduationCap, color: 'bg-blue-100 text-blue-600' },
  { label: 'Teachers', value: 68, change: '+2 this month', Icon: Users, color: 'bg-green-100 text-green-600' },
  { label: 'Classes', value: 36, change: 'No change', Icon: BookOpen, color: 'bg-purple-100 text-purple-600' },
  { label: 'Attendance Today', value: '94%', change: '-1% vs yesterday', Icon: CalendarCheck, color: 'bg-orange-100 text-orange-600' },
];

const weeklyAttendance = [
  { day: 'Mon', percent: 95 },
  { day: 'Tue', percent: 92 },
  { day: 'Wed', percent: 96 },
  { day: 'Thu', percent: 90 },
  { day: 'Fri', percent: 88 },
];

const recentActivity = [
  { id: 1, text: 'New student enrolled: Mary Achieng (Form 2)', time: '10 min ago' },
  { id: 2, text: 'John Otieno marked attendance for Form 3B', time: '1 hour ago' },
  { id: 3, text: 'Term 3 exam timetable was published', time: '3 hours ago' },
  { id: 4, text: 'Fee payment received: KES 15,000', time: 'Yesterday' },
];

const upcomingEvents = [
  { id: 1, title: 'Parents meeting', date: 'Oct 8' },
  { id: 2, title: 'Mid-term exams begin', date: 'Oct 14' },
  { id: 3, title: 'Sports day', date: 'Oct 21' },
];

const quickActions = [
  { to: '/user', label: 'Manage users' },
  { to: '/analytics', label: 'View analytics' },
  { to: '/profile', label: 'My profile' },
  { to: '/settings', label: 'Settings' },
];

function Dashboard() {
  return (
    <div>
      
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <p className="text-slate-500 text-sm">Welcome back, here is what is happening today</p>
      </div>

    
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {stats.map(({ label, value, change, Icon, color }) => (
          <div key={label} className="bg-white border rounded-lg p-4 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-slate-500 text-sm">{label}</p>
              <p className="text-2xl font-bold">{value}</p>
              <p className="text-xs text-slate-400">{change}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      
        <div className="bg-white border rounded-lg p-6 lg:col-span-2">
          <h3 className="font-semibold mb-4">Attendance this week</h3>
          <div className="flex items-end justify-between gap-4 h-48">
            {weeklyAttendance.map(({ day, percent }) => (
              <div key={day} className="flex-1 flex flex-col items-center justify-end h-full">
                <span className="text-xs text-slate-500 mb-1">{percent}%</span>
                <div
                  className="w-full max-w-12 bg-slate-900 rounded-t-md"
                  style={{ height: `${percent}%` }}
                />
                <span className="text-sm mt-2">{day}</span>
              </div>
            ))}
          </div>
        </div>

        
        <div className="bg-white border rounded-lg p-6">
          <h3 className="font-semibold mb-4">Upcoming events</h3>
          <ul className="space-y-3">
            {upcomingEvents.map(({ id, title, date }) => (
              <li key={id} className="flex items-center justify-between text-sm">
                <span>{title}</span>
                <span className="px-2 py-1 rounded-full bg-slate-100 text-slate-600 text-xs">{date}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="bg-white border rounded-lg p-6 lg:col-span-2">
          <h3 className="font-semibold mb-4">Recent activity</h3>
          <ul className="divide-y">
            {recentActivity.map(({ id, text, time }) => (
              <li key={id} className="py-3 flex items-center justify-between text-sm">
                <span>{text}</span>
                <span className="text-slate-400 text-xs whitespace-nowrap ml-4">{time}</span>
              </li>
            ))}
          </ul>
        </div>

        
        <div className="bg-white border rounded-lg p-6">
          <h3 className="font-semibold mb-4">Quick actions</h3>
          <div className="grid gap-2">
            {quickActions.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="px-4 py-2 rounded-lg border text-sm hover:bg-slate-100 transition"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;