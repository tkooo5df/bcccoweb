import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, BookOpen, MessageSquare, BarChart3, Calendar, Settings } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Users',
      value: '2,543',
      description: '+12% from last month',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Active Courses',
      value: '47',
      description: '8 new this month',
      icon: BookOpen,
      color: 'text-green-600'
    },
    {
      title: 'Messages',
      value: '156',
      description: '23 unread',
      icon: MessageSquare,
      color: 'text-orange-600'
    },
    {
      title: 'Revenue',
      value: '€45,231',
      description: '+8% from last month',
      icon: BarChart3,
      color: 'text-purple-600'
    }
  ];

  const recentActivities = [
    { action: 'New user registration', user: 'John Doe', time: '2 minutes ago' },
    { action: 'Course completed', user: 'Jane Smith', time: '15 minutes ago' },
    { action: 'New message received', user: 'Mike Johnson', time: '1 hour ago' },
    { action: 'Payment processed', user: 'Sarah Wilson', time: '2 hours ago' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your training center.</p>
          </div>
          <div className="flex-shrink-0">
            <Button className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <p className="text-xs text-gray-600 mt-1">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Recent Activities */}
          <Card className="xl:col-span-2">
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>Latest activities in your training center</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{activity.action}</p>
                      <p className="text-xs text-gray-600 truncate">{activity.user}</p>
                    </div>
                    <span className="text-xs text-gray-500 flex-shrink-0">{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Frequently used actions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline" size="sm">
                <BookOpen className="w-4 h-4 mr-2" />
                Add New Course
              </Button>
              <Button className="w-full justify-start" variant="outline" size="sm">
                <Users className="w-4 h-4 mr-2" />
                Manage Users
              </Button>
              <Button className="w-full justify-start" variant="outline" size="sm">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Training
              </Button>
              <Button className="w-full justify-start" variant="outline" size="sm">
                <MessageSquare className="w-4 h-4 mr-2" />
                View Messages
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Revenue</CardTitle>
              <CardDescription>Revenue trends over the last 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                <p className="text-gray-500">Chart placeholder - Revenue trends</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Course Enrollment</CardTitle>
              <CardDescription>Student enrollment by course category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                <p className="text-gray-500">Chart placeholder - Enrollment data</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
