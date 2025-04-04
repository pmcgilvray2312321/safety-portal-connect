
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, FileCheck, Users, Award, Calendar, ArrowRight, Lock } from 'lucide-react';

const Index = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock login functionality
    if (email === 'admin@safety.com' && password === 'password') {
      toast({
        title: "Login successful",
        description: "Welcome to the Safety Portal"
      });
      setIsLoginOpen(false);
      navigate('/dashboard');
    } else {
      toast({
        title: "Login failed",
        description: "Invalid email or password",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Black top bar with login */}
      <div className="bg-safety-black text-white py-2 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="text-sm">
          Safety Professionals Portal
        </div>
        <div className="flex space-x-4">
          <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" className="text-white hover:text-safety-light">
                Client Login
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Login to Safety Portal</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleLogin} className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com" 
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-safety hover:bg-safety-dark">
                  Login
                </Button>
              </form>
            </DialogContent>
          </Dialog>
          <Button 
            variant="ghost" 
            className="text-white hover:text-safety-light flex items-center"
            onClick={() => navigate('/admin/login')}
          >
            <Lock className="mr-2 h-4 w-4" />
            Admin Portal
          </Button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-safety-black py-16 px-4 md:py-24">
        <div className="container mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Shield className="h-16 w-16 text-safety" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Safety Professional Portal
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Access your safety documents, training materials, and compliance records all in one secure location.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
              <DialogTrigger asChild>
                <Button className="bg-safety hover:bg-safety-dark text-white px-8 py-6 text-lg">
                  Client Login
                </Button>
              </DialogTrigger>
            </Dialog>
            <Button 
              variant="outline" 
              className="text-white border-white hover:bg-white/10 px-8 py-6 text-lg"
              onClick={() => navigate('/admin/login')}
            >
              Admin Access
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4" id="services">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Portal Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-safety-gray mb-4">
                <FileCheck className="h-6 w-6 text-safety" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Document Management</h3>
              <p className="text-gray-600">
                Securely upload, store, and access all your safety documentation in one place.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-safety-gray mb-4">
                <Calendar className="h-6 w-6 text-safety" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Training Schedule</h3>
              <p className="text-gray-600">
                View and manage your team's training schedule and certification records.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-safety-gray mb-4">
                <Users className="h-6 w-6 text-safety" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Team Management</h3>
              <p className="text-gray-600">
                Manage your safety team and their access to critical safety information.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-safety-gray mb-4">
                <Award className="h-6 w-6 text-safety" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Compliance Tracking</h3>
              <p className="text-gray-600">
                Stay on top of compliance requirements and track your progress.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-safety py-16 px-4" id="contact">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
            Contact us today to learn more about our safety portal and how it can benefit your organization.
          </p>
          <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
            <DialogTrigger asChild>
              <Button className="bg-white text-safety hover:bg-gray-100 px-8 py-6 text-lg font-medium">
                Access Portal <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </DialogTrigger>
          </Dialog>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-safety-black text-white py-8 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Shield className="h-8 w-8 text-safety mr-2" />
              <span className="text-xl font-bold">Safety Portal Connect</span>
            </div>
            <div className="flex flex-col md:flex-row gap-4 md:gap-8">
              <a href="#" className="text-gray-300 hover:text-white">Terms of Service</a>
              <a href="#" className="text-gray-300 hover:text-white">Privacy Policy</a>
              <a href="#" className="text-gray-300 hover:text-white">Contact Us</a>
            </div>
          </div>
          <div className="text-center mt-8 text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Safety Portal Connect. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
