import React from 'react';
import { FolderOpen, Images, Tag, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { mockProjects, mockCategories } from '../../mock';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const totalProjects = mockProjects.length;
  const totalImages = mockProjects.reduce((sum, p) => sum + p.imageCount, 0);
  const totalCategories = mockCategories.length - 1; // Exclude 'All Projects'

  const stats = [
    { label: 'Total Projects', value: totalProjects, icon: FolderOpen, color: 'bg-blue-500' },
    { label: 'Total Images', value: totalImages, icon: Images, color: 'bg-green-500' },
    { label: 'Categories', value: totalCategories, icon: Tag, color: 'bg-purple-500' },
    { label: 'Recent Activity', value: '12', icon: TrendingUp, color: 'bg-orange-500' }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's an overview of your portfolio.</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.label}
                </CardTitle>
                <div className={`${stat.color} p-2 rounded-lg`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Link to="/admin/projects">
              <Button className="bg-[#b8d71b] hover:bg-[#a0c018] text-black">
                <FolderOpen className="w-4 h-4 mr-2" />
                New Project
              </Button>
            </Link>
            <Link to="/admin/categories">
              <Button variant="outline">
                <Tag className="w-4 h-4 mr-2" />
                Manage Categories
              </Button>
            </Link>
            <Link to="/admin/settings">
              <Button variant="outline">
                <Images className="w-4 h-4 mr-2" />
                Upload Images
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Recent Projects */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockProjects.slice(0, 5).map((project) => (
              <div
                key={project.id}
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{project.title}</h3>
                  <p className="text-sm text-gray-600">{project.imageCount} images</p>
                </div>
                <Link to="/admin/projects">
                  <Button variant="ghost" size="sm">Edit</Button>
                </Link>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Live Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Portfolio Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#b8d71b] hover:underline font-medium"
            >
              View Live Portfolio →
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;