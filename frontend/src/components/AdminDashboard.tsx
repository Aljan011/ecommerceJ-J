"use client";

import { useStore } from "@/hooks";

export const AdminDashboard = () => {
  const { auth } = useStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50 dark:from-gray-900 dark:via-slate-900 dark:to-gray-950 p-6 md:p-10">
      {/* Welcome Header */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl p-8 md:p-12 mb-8 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full">
                <span className="text-white text-sm font-medium">
                  Admin Dashboard
                </span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
              Welcome back,{" "}
              <span className="text-yellow-300">
                {auth.meEntity?.name || "Admin"}
              </span>
              !
            </h1>
            <p className="text-lg text-white/90 max-w-2xl">
              Manage your store, track orders, and analyze performance from your
              personalized dashboard.
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Stat Card 1 */}
          <div className="group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </div>
              <span className="text-green-500 text-sm font-semibold">+12%</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              2,547
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Total Orders
            </p>
          </div>

          {/* Stat Card 2 */}
          <div className="group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <span className="text-green-500 text-sm font-semibold">+8%</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              $45,678
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Revenue</p>
          </div>

          {/* Stat Card 3 */}
          <div className="group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <span className="text-green-500 text-sm font-semibold">+24%</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              1,892
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Customers
            </p>
          </div>

          {/* Stat Card 4 */}
          <div className="group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
              <span className="text-green-500 text-sm font-semibold">+5%</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              432
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Products</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Recent Activity
              </h2>
              <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium transition-colors duration-200">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {[
                {
                  icon: "📦",
                  title: "New order received",
                  time: "2 minutes ago",
                  color: "bg-blue-100 dark:bg-blue-900/30",
                },
                {
                  icon: "👤",
                  title: "New customer registered",
                  time: "15 minutes ago",
                  color: "bg-green-100 dark:bg-green-900/30",
                },
                {
                  icon: "⭐",
                  title: "Product reviewed",
                  time: "1 hour ago",
                  color: "bg-yellow-100 dark:bg-yellow-900/30",
                },
                {
                  icon: "💰",
                  title: "Payment received",
                  time: "2 hours ago",
                  color: "bg-purple-100 dark:bg-purple-900/30",
                },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
                >
                  <div
                    className={`w-12 h-12 ${activity.color} rounded-xl flex items-center justify-center text-xl`}
                  >
                    {activity.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900 dark:text-white font-medium">
                      {activity.title}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions Panel */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  icon: "M12 4v16m8-8H4",
                  label: "Add Product",
                  gradient: "from-blue-500 to-cyan-500",
                },
                {
                  icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
                  label: "View Orders",
                  gradient: "from-purple-500 to-pink-500",
                },
                {
                  icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
                  label: "Customers",
                  gradient: "from-orange-500 to-red-500",
                },
                {
                  icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
                  label: "Analytics",
                  gradient: "from-green-500 to-emerald-500",
                },
              ].map((action, index) => (
                <button
                  key={index}
                  className="group relative p-6 rounded-xl bg-gradient-to-br hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                  style={{
                    background: `linear-gradient(to bottom right, var(--tw-gradient-stops))`,
                  }}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-100`}
                  ></div>
                  <div className="relative z-10">
                    <svg
                      className="w-8 h-8 text-white mb-3 group-hover:scale-110 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={action.icon}
                      />
                    </svg>
                    <p className="text-white font-semibold text-sm">
                      {action.label}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
