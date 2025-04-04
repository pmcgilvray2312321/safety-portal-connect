
import { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  FileCheck, 
  AlertTriangle, 
  Calendar, 
  Users, 
  Clock, 
  Bell, 
  ChevronRight, 
  FileText 
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const Dashboard = () => {
  const [compliancePercent] = useState(78);
  
  const upcomingTrainings = [
    { id: 1, title: "OSHA 30-Hour Safety Training", date: "April 15, 2025", status: "Scheduled" },
    { id: 2, title: "First Aid and CPR Certification", date: "April 22, 2025", status: "Pending" },
    { id: 3, title: "Fire Safety and Prevention", date: "May 5, 2025", status: "Scheduled" },
  ];
  
  const recentDocuments = [
    { id: 1, name: "2025 Safety Manual.pdf", date: "April 2, 2025", type: "PDF" },
    { id: 2, name: "Workplace Assessment Report.docx", date: "March 28, 2025", type: "DOCX" },
    { id: 3, name: "Emergency Protocols.pdf", date: "March 25, 2025", type: "PDF" },
    { id: 4, name: "OSHA Compliance Checklist.xlsx", date: "March 20, 2025", type: "XLSX" },
  ];
  
  const notifications = [
    { id: 1, message: "OSHA 30-Hour training deadline in 10 days", type: "warning" },
    { id: 2, message: "New safety documentation uploaded", type: "info" },
    { id: 3, message: "Team compliance report ready for review", type: "info" },
  ];

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Safety Dashboard</h1>
        <p className="text-gray-600">Welcome back. Here's an overview of your safety program.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Compliance Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <FileCheck className="h-8 w-8 text-safety mr-2" />
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-2xl font-bold">{compliancePercent}%</span>
                  <span className="text-xs text-gray-500">Goal: 100%</span>
                </div>
                <Progress value={compliancePercent} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Active Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-amber-500 mr-2" />
              <div>
                <div className="text-2xl font-bold">3</div>
                <div className="text-xs text-gray-500">Requires attention</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Upcoming Trainings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-blue-500 mr-2" />
              <div>
                <div className="text-2xl font-bold">5</div>
                <div className="text-xs text-gray-500">Next 30 days</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Team Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="h-8 w-8 text-green-500 mr-2" />
              <div>
                <div className="text-2xl font-bold">12</div>
                <div className="text-xs text-gray-500">Active users</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Recent Documents</CardTitle>
              <Button variant="ghost" size="sm" className="text-safety flex items-center">
                View All <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
            <CardDescription>Recently uploaded and accessed files</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentDocuments.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-gray-500 mr-3" />
                    <div>
                      <div className="font-medium">{doc.name}</div>
                      <div className="text-xs text-gray-500">Uploaded on {doc.date}</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">View</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Trainings</CardTitle>
              <CardDescription>Scheduled safety trainings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingTrainings.map((training) => (
                  <div key={training.id} className="flex items-start">
                    <div className="bg-safety-gray p-2 rounded-md mr-3">
                      <Clock className="h-5 w-5 text-safety" />
                    </div>
                    <div>
                      <div className="font-medium">{training.title}</div>
                      <div className="text-sm text-gray-500">{training.date}</div>
                      <div className="text-xs inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded-full mt-1">
                        {training.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">View All Trainings</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Recent alerts and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div key={notification.id} className="flex items-start">
                    <div className={`p-2 rounded-md mr-3 ${
                      notification.type === 'warning' ? 'bg-amber-100' : 'bg-blue-100'
                    }`}>
                      <Bell className={`h-5 w-5 ${
                        notification.type === 'warning' ? 'text-amber-500' : 'text-blue-500'
                      }`} />
                    </div>
                    <div className="font-medium">{notification.message}</div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">View All Notifications</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
