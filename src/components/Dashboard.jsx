import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Clock, 
  CheckCircle, 
  TrendingUp,
  Calendar,
  Zap,
  Trophy,
  Plus,
  Search,
  Settings,
  User,
  Bell,
  Target,
  Activity,
  Users,
  MoreHorizontal
} from 'lucide-react';
import viteLogo from '/vite.svg'

const TaskForge = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const changeTab= (tab) => {
    setActiveTab(tab);
    };
    const tabs=[
        { name: 'Dashboard', icon: <BarChart3 className="h-4 w-4" />, value: 'dashboard' },
        { name: 'Tasks', icon: <Target className="h-4 w-4" />, value: 'tasks' },
        { name: 'Calendar', icon: <Calendar className="h-4 w-4" />, value: 'calendar' },
        { name: 'Team', icon: <Users className="h-4 w-4" />, value: 'team' },
        { name: 'Analytics', icon: <Activity className="h-4 w-4" />, value: 'analytics' },
        { name: 'Settings', icon: <Settings className="h-4 w-4" />, value: 'settings' }

    ]
  
  // Mock data aligned with task management
  const [dashboardData, setDashboardData] = useState({
    totalTasks: 247,
    completedTasks: 189,
    inProgressTasks: 31,
    pendingTasks: 27,
    weeklyData: [
      { day: 'Mon', completed: 12, created: 15, inProgress: 8 },
      { day: 'Tue', completed: 18, created: 12, inProgress: 6 },
      { day: 'Wed', completed: 22, created: 20, inProgress: 12 },
      { day: 'Thu', completed: 15, created: 18, inProgress: 9 },
      { day: 'Fri', completed: 28, created: 25, inProgress: 15 },
      { day: 'Sat', completed: 8, created: 5, inProgress: 3 },
      { day: 'Sun', completed: 6, created: 4, inProgress: 2 }
    ],
    recentProjects: [
      { id: 1, name: 'Website Redesign', tasks: 24, completed: 18, color: 'bg-orange-500' },
      { id: 2, name: 'Mobile App', tasks: 31, completed: 12, color: 'bg-purple-500' },
      { id: 3, name: 'Marketing Campaign', tasks: 15, completed: 14, color: 'bg-green-500' }
    ],
    notifications: [
      { id: 1, text: 'Project deadline approaching in 2 days', time: '2h', type: 'warning' },
      { id: 2, text: 'New team member joined your workspace', time: '4h', type: 'info' },
      { id: 3, text: 'Weekly report is ready for review', time: '6h', type: 'success' },
      { id: 4, text: 'Task "Review mockups" was completed', time: '8h', type: 'success' }
    ]
  });

  const completionRate = Math.round((dashboardData.completedTasks / dashboardData.totalTasks) * 100);
  const maxValue = Math.max(...dashboardData.weeklyData.map(d => Math.max(d.completed, d.created, d.inProgress)));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
                <img src={viteLogo} alt="Vite Logo" className="h-8 w-8 mr-2" />
              <h1 className="text-xl font-bold text-gray-900">TaskForge.</h1>
              <span className="ml-8 text-lg font-semibold text-gray-900">Dashboard</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input 
                  type="text" 
                  placeholder="Search"
                  className="pl-10 pr-4 py-2 bg-gray-100 rounded-lg text-sm w-64 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <button className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white p-2 rounded-lg hover:opacity-90">
                <Search className="h-4 w-4" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Bell className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Settings className="h-5 w-5" />
              </button>
              <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
          <nav className="p-6">
            <div className="space-y-2">
                {tabs.map(tab=>{
                    return (
                    <button 
                        key={tab.value} 
                        className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg hover:bg-gray-50 hover:text-black ${activeTab === tab.value ? ' bg-gray-900 text-gray-100' : 'text-gray-600'}`}
                        onClick={() => changeTab(tab.value)}
                    >
                        {tab.icon}
                        {tab.name}
                    </button>
                    
                    )
                })}
        
            </div>
          </nav>

          {/* Upgrade Card */}
          <div className="mx-6 mt-8 p-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl text-white">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-3">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="font-semibold mb-1">Upgrade to Pro</h3>
            <p className="text-xs text-purple-100 mb-3">Unlock AI-powered features</p>
            <button className="w-full bg-white text-purple-600 py-2 px-3 rounded-lg text-sm font-medium hover:bg-gray-50">
              Upgrade
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Total Tasks */}
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Tasks</p>
                  <p className="text-3xl font-bold text-gray-900">{dashboardData.totalTasks}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                    <span className="text-xs text-green-500">+14% Inc</span>
                  </div>
                </div>
                <div className="relative w-16 h-16">
                  <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 32 32">
                    <circle cx="16" cy="16" r="12" fill="none" stroke="#e5e7eb" strokeWidth="2"/>
                    <circle 
                      cx="16" cy="16" r="12" fill="none" 
                      stroke="url(#purple-gradient)" strokeWidth="2"
                      strokeDasharray={`${completionRate * 0.75} 75`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-semibold text-purple-600">+74%</span>
                  </div>
                  <defs>
                    <linearGradient id="purple-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                  </defs>
                </div>
              </div>
            </div>

            {/* Completed Tasks */}
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Completed Tasks</p>
                  <p className="text-3xl font-bold text-gray-900">{dashboardData.completedTasks}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-3 w-3 text-yellow-500 mr-1" />
                    <span className="text-xs text-yellow-500">+60% Inc</span>
                  </div>
                </div>
                <div className="relative w-16 h-16">
                  <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 32 32">
                    <circle cx="16" cy="16" r="12" fill="none" stroke="#e5e7eb" strokeWidth="2"/>
                    <circle 
                      cx="16" cy="16" r="12" fill="none" 
                      stroke="#fbbf24" strokeWidth="2"
                      strokeDasharray="45 75"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-semibold text-yellow-600">+60%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* In Progress */}
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">In Progress</p>
                  <p className="text-3xl font-bold text-gray-900">{dashboardData.inProgressTasks}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-3 w-3 text-orange-500 mr-1" />
                    <span className="text-xs text-orange-500">+46% Dec</span>
                  </div>
                </div>
                <div className="relative w-16 h-16">
                  <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 32 32">
                    <circle cx="16" cy="16" r="12" fill="none" stroke="#e5e7eb" strokeWidth="2"/>
                    <circle 
                      cx="16" cy="16" r="12" fill="none" 
                      stroke="#f97316" strokeWidth="2"
                      strokeDasharray="35 75"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-semibold text-orange-600">+46%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Weekly Statistics Chart */}
            <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Statistics of Active Tasks</h3>
                <select className="text-sm border border-gray-200 rounded-lg px-3 py-1">
                  <option>Week</option>
                  <option>Month</option>
                </select>
              </div>
              
              <div className="h-64 flex items-end justify-between space-x-4">
                {dashboardData.weeklyData.map((day, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div className="w-full max-w-8 relative" style={{ height: '200px' }}>
                      <div className="absolute bottom-0 w-full flex space-x-1">
                        <div 
                          className="bg-gradient-to-t from-purple-500 to-purple-400 rounded-t"
                          style={{ 
                            height: `${(day.completed / maxValue) * 200}px`,
                            width: '30%'
                          }}
                        ></div>
                        <div 
                          className="bg-gradient-to-t from-yellow-500 to-yellow-400 rounded-t"
                          style={{ 
                            height: `${(day.created / maxValue) * 200}px`,
                            width: '30%'
                          }}
                        ></div>
                        <div 
                          className="bg-gradient-to-t from-orange-500 to-orange-400 rounded-t"
                          style={{ 
                            height: `${(day.inProgress / maxValue) * 200}px`,
                            width: '30%'
                          }}
                        ></div>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500 mt-2">{day.day}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex items-center justify-center space-x-6 mt-6">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-purple-500 rounded mr-2"></div>
                  <span className="text-xs text-gray-600">Completed</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded mr-2"></div>
                  <span className="text-xs text-gray-600">Created</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-orange-500 rounded mr-2"></div>
                  <span className="text-xs text-gray-600">In Progress</span>
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* User Profile */}
              <div className="bg-white rounded-xl p-6 border border-gray-100 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mx-auto mb-4"></div>
                <h3 className="font-semibold text-gray-900">Sarah Johnson</h3>
                <p className="text-sm text-gray-600">Product Manager</p>
                <div className="flex items-center justify-center mt-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-xs text-gray-600">San Francisco, US</span>
                </div>
              </div>

              {/* Active Projects */}
              <div className="bg-white rounded-xl p-6 border border-gray-100">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-gray-900">Active Projects</h3>
                  <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-1 rounded-lg">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  {dashboardData.recentProjects.map((project) => (
                    <div key={project.id} className={`${project.color} text-white p-4 rounded-xl relative overflow-hidden`}>
                      <div className="relative z-10">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-2xl font-bold">{project.completed}</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-6 h-3 bg-white/30 rounded-full peer peer-checked:after:translate-x-3 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-2 after:w-2 after:transition-all"></div>
                          </label>
                        </div>
                        <p className="text-sm font-medium">{project.name}</p>
                        <p className="text-xs opacity-90">Total Tasks: {project.tasks}</p>
                      </div>
                      <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full transform translate-x-8 -translate-y-8"></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notifications */}
              <div className="bg-white rounded-xl p-6 border border-gray-100">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-gray-900">Reminders</h3>
                  <Bell className="h-4 w-4 text-gray-400" />
                </div>
                
                <div className="space-y-3">
                  {dashboardData.notifications.map((notification) => (
                    <div key={notification.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        notification.type === 'warning' ? 'bg-yellow-500' :
                        notification.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                      }`}></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900">{notification.text}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskForge;