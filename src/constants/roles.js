import {
  LayoutDashboard,
  Users,
  Building2,
  Stethoscope,
  UserRound,
  CalendarDays,
  UserCircle,
  Mail,
} from 'lucide-react'

export const ROLES = {
    ADMIN: "Admin",
    DOCTOR: "Doctor",
    PATIENT: "Patient",
};

export const NAV_ITEMS = [
  {
    label: 'Dashboard',
    path: '/dashboard',
    icon: LayoutDashboard,
    roles: [ROLES.ADMIN, ROLES.DOCTOR, ROLES.PATIENT],
  },
  {
    label: 'Users',
    path: '/users',
    icon: Users,
    roles: [ROLES.ADMIN],
  },
  {
    label: 'Departments',
    path: '/departments',
    icon: Building2,
    roles: [ROLES.ADMIN],
  },
  {
    label: 'Doctors',
    path: '/doctors',
    icon: Stethoscope,
    roles: [ROLES.ADMIN],
  },
  {
    label: 'Patients',
    path: '/patients',
    icon: UserRound,
    roles: [ROLES.ADMIN],
  },
  {
    label: 'Appointments',
    path: '/appointments',
    icon: CalendarDays,
    roles: [ROLES.ADMIN, ROLES.DOCTOR,]
  },
  {
    label: 'Profile',
    path: '/profile',
    icon: UserCircle,
    roles: [ROLES.ADMIN, ROLES.DOCTOR, ROLES.PATIENT],
  },
  {label: "Contact",
  path: "/contact",
  icon: Mail,
  roles: [ROLES.ADMIN],
},
]

export const getNavItemsForRole = (role) =>
  NAV_ITEMS.filter((item) => item.roles.includes(role))

export const ROLE_COLORS = {
  [ROLES.ADMIN]: 'bg-blue-100 text-blue-700 border-blue-200',
  [ROLES.DOCTOR]: 'bg-green-100 text-green-700 border-green-200',
  [ROLES.PATIENT]: 'bg-purple-100 text-purple-700 border-purple-200',
};  