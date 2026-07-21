import { NavLink } from 'react-router-dom'
import { 
  Activity, 
  ChevronLeft, 
  ChevronRight, 
  X,
  LayoutDashboard,
  Users,
  Building2,
  Stethoscope,
  UserRound,
  CalendarDays,
  UserCircle,
  LogOut
} from 'lucide-react'
import useAuth from '../hooks/useAuth'
import { ROLE_COLORS, getNavItemsForRole } from '../constants/roles'

const Sidebar = ({ isOpen, isCollapsed, onClose, onToggleCollapse }) => {
  const { user, logout } = useAuth()
  const navItems = getNavItemsForRole(user?.role)

  const initials = user?.email
    ? user.email.slice(0, 2).toUpperCase()
    : 'AD'

  const displayName = user?.fullName || user?.name || (user?.email ? user.email.split('@')[0] : 'Administrator')

  return (
    <>
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex flex-col border-r border-gray-200 bg-white shadow-xl transition-all duration-300 dark:border-gray-700 dark:bg-gray-900 ${
            isCollapsed ? "w-20" : "w-64"
        } ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
        >
        {/* Header */}
           <div className="flex h-16 items-center justify-between border-b border-gray-200 px-4 dark:border-gray-700">          <div className={`flex items-center gap-2 ${isCollapsed ? 'justify-center w-full' : ''}`}>
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg">
            <Stethoscope className="h-5 w-5" />
            </div>
            {!isCollapsed && (
              <div>
                <p className="text-sm font-bold tracking-tight text-blue-600 dark:text-blue-400">
                HospitalCare
                </p>

                <p className="text-[10px] font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                HEALTHCARE PORTAL
                </p>
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-on-surface-variant hover:bg-primary/5 transition-colors lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                title={isCollapsed ? item.label : undefined}
                className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all duration-200 ${
                    isActive
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-700 hover:bg-blue-50 hover:text-blue-600 dark:text-gray-300 dark:hover:bg-blue-900/20 dark:hover:text-blue-400"
                } ${isCollapsed ? "justify-center px-2" : ""}`
                }
              >
                <Icon className="h-5 w-5 shrink-0" />
                {!isCollapsed && <span>{item.label}</span>}
              </NavLink>
            )
          })}
        </nav>

        {/* Administrative Profile Card at the Bottom */}
        {user && (
        <div className="border-t border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">         <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''}`}>
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-sm font-bold text-white shadow">
                {initials}
                </div>
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                    {displayName}
                    </p>
                  <p className="truncate text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    {user.role}
                    </p>
                </div>
              )}
            </div>
            
            {!isCollapsed && (
              <div className="mt-3 flex items-center justify-between gap-2">
                <span
                className={`inline-flex rounded-full border px-2 py-1 text-xs font-semibold ${
                    ROLE_COLORS[user.role] ||
                    "border-gray-200 bg-gray-100 text-gray-700"
                }`}
                >
                {user.role}
                </span>
                
                <button
                type="button"
                onClick={logout}
                className="rounded-lg p-2 text-gray-500 transition hover:bg-red-100 hover:text-red-600 dark:text-gray-400 dark:hover:bg-red-900/20"
                title="Logout"
                >
                <LogOut className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Collapse Button */}
        <div className="hidden border-t border-gray-200 p-3 dark:border-gray-700 lg:block">
        <button
            type="button"
            onClick={onToggleCollapse}
            className="flex w-full items-center justify-center rounded-xl p-2 text-gray-500 transition hover:bg-blue-50 hover:text-blue-600 dark:text-gray-400 dark:hover:bg-blue-900/20 dark:hover:text-blue-400"
        >
            {isCollapsed ? (
            <ChevronRight className="h-5 w-5" />
            ) : (
            <ChevronLeft className="h-5 w-5" />
            )}
        </button>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
