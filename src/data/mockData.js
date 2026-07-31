// src/data/mockData.js

export const statsData = [
  {
    id: 1,
    title: "Total Revenue",
    value: "$84,254",
    change: "12.4%",
    trend: "up",
    icon: "FiDollarSign",
    color: "#4f46e5",
  },
  {
    id: 2,
    title: "Active Users",
    value: "12,847",
    change: "8.2%",
    trend: "up",
    icon: "FiUsers",
    color: "#10b981",
  },
  {
    id: 3,
    title: "Orders",
    value: "1,924",
    change: "3.1%",
    trend: "down",
    icon: "FiShoppingBag",
    color: "#f59e0b",
  },
  {
    id: 4,
    title: "Conversion Rate",
    value: "4.6%",
    change: "1.8%",
    trend: "up",
    icon: "FiTrendingUp",
    color: "#ec4899",
  },
];

export const activityData = [
  {
    id: 1,
    user: "Maria Chen",
    action: "commented on",
    target: "Redesign Landing Page",
    time: "5 minutes ago",
    avatar: "MC",
    color: "#4f46e5",
  },
  {
    id: 2,
    user: "James Wu",
    action: "completed",
    target: "API Integration Task",
    time: "32 minutes ago",
    avatar: "JW",
    color: "#10b981",
  },
  {
    id: 3,
    user: "Aisha Patel",
    action: "uploaded a file to",
    target: "Marketing Assets",
    time: "1 hour ago",
    avatar: "AP",
    color: "#f59e0b",
  },
  {
    id: 4,
    user: "Diego Ramirez",
    action: "moved",
    target: "Checkout Bug #221 to Review",
    time: "2 hours ago",
    avatar: "DR",
    color: "#ec4899",
  },
  {
    id: 5,
    user: "Sofia Novak",
    action: "created",
    target: "Q3 Roadmap",
    time: "4 hours ago",
    avatar: "SN",
    color: "#06b6d4",
  },
];

export const projectsData = [
  {
    id: 1,
    name: "Website Redesign",
    status: "In Progress",
    team: ["MC", "JW", "AP", "DR"],
    progress: 68,
    dueDate: "Aug 12, 2026",
  },
  {
    id: 2,
    name: "Mobile App Launch",
    status: "Review",
    team: ["SN", "MC"],
    progress: 91,
    dueDate: "Aug 3, 2026",
  },
  {
    id: 3,
    name: "Customer Portal",
    status: "Completed",
    team: ["DR", "AP", "JW"],
    progress: 100,
    dueDate: "Jul 20, 2026",
  },
  {
    id: 4,
    name: "Payment Gateway",
    status: "Pending",
    team: ["JW"],
    progress: 12,
    dueDate: "Sep 2, 2026",
  },
  {
    id: 5,
    name: "Analytics Dashboard",
    status: "In Progress",
    team: ["MC", "SN", "DR"],
    progress: 45,
    dueDate: "Aug 25, 2026",
  },
];

export const tasksData = [
  { id: 1, title: "Review pull request #142", completed: true },
  { id: 2, title: "Sync with design team on icons", completed: true },
  { id: 3, title: "Prepare Q3 investor summary", completed: false },
  { id: 4, title: "Fix mobile nav overlay bug", completed: false },
  { id: 5, title: "Write onboarding email copy", completed: false },
];

export const teamData = [
  {
    id: 1,
    name: "Maria Chen",
    role: "Product Designer",
    avatar: "MC",
    color: "#4f46e5",
    online: true,
  },
  {
    id: 2,
    name: "James Wu",
    role: "Backend Engineer",
    avatar: "JW",
    color: "#10b981",
    online: true,
  },
  {
    id: 3,
    name: "Aisha Patel",
    role: "Marketing Lead",
    avatar: "AP",
    color: "#f59e0b",
    online: false,
  },
  {
    id: 4,
    name: "Diego Ramirez",
    role: "Frontend Engineer",
    avatar: "DR",
    color: "#ec4899",
    online: true,
  },
];

// Meetings use real Date objects (dateObj) so the calendar can match them to days
const today = new Date();
const mk = (daysFromToday, hour, minute) => {
  const d = new Date(today);
  d.setDate(d.getDate() + daysFromToday);
  d.setHours(hour, minute, 0, 0);
  return d;
};

export const meetingsData = [
  {
    id: 1,
    title: "Sprint Planning",
    time: "10:00 AM",
    date: "Today",
    dateObj: mk(0, 10, 0),
    participants: ["MC", "JW", "AP", "DR"],
  },
  {
    id: 2,
    title: "Design Review",
    time: "2:30 PM",
    date: "Today",
    dateObj: mk(0, 14, 30),
    participants: ["MC", "SN"],
  },
  {
    id: 3,
    title: "Client Check-in",
    time: "11:00 AM",
    date: "Tomorrow",
    dateObj: mk(1, 11, 0),
    participants: ["JW", "DR", "AP"],
  },
  {
    id: 4,
    title: "1:1 with Manager",
    time: "9:00 AM",
    date: "in 3 days",
    dateObj: mk(3, 9, 0),
    participants: ["MC"],
  },
];

export const notificationsData = [
  {
    id: 1,
    type: "comment",
    title: "Maria Chen left a comment on Website Redesign",
    time: "5 min ago",
    read: false,
  },
  {
    id: 2,
    type: "mention",
    title: "James Wu mentioned you in Payment Gateway",
    time: "20 min ago",
    read: false,
  },
  {
    id: 3,
    type: "alert",
    title: "Server response time is above threshold",
    time: "1 hour ago",
    read: false,
  },
  {
    id: 4,
    type: "info",
    title: "Weekly analytics report is ready",
    time: "3 hours ago",
    read: true,
  },
];
