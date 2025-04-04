
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { Shield, Menu } from 'lucide-react';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header = ({ toggleSidebar }: HeaderProps) => {
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
    <header className="w-full">
      <div className="bg-white border-b border-gray-200 py-3 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden" 
            onClick={toggleSidebar}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-safety" />
            <span className="font-bold text-xl">Safety Portal Connect</span>
          </div>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <a href="/" className="text-gray-600 hover:text-safety font-medium">Home</a>
          <a href="#services" className="text-gray-600 hover:text-safety font-medium">Services</a>
          <a href="#about" className="text-gray-600 hover:text-safety font-medium">About</a>
          <a href="#contact" className="text-gray-600 hover:text-safety font-medium">Contact</a>
        </div>
      </div>
      
      {/* Black top bar with login */}
      <div className="bg-safety-black text-white py-2 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="text-sm">
          Safety Professionals Portal
        </div>
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
      </div>
    </header>
  );
};

export default Header;
