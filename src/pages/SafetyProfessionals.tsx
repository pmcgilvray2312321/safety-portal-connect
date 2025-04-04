
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Shield, FileCheck, Users, Award, ArrowRight, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const SafetyProfessionals = () => {
  const navigate = useNavigate();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [countDown, setCountDown] = useState(10);

  useEffect(() => {
    // If user wants to redirect automatically (for demo purposes, uncomment this)
    // const timer = setTimeout(() => {
    //   window.location.href = 'https://unitedallianceservices.com/services/united-safety-professionals/';
    // }, 10000);
    // return () => clearTimeout(timer);

    // Countdown timer for illustration
    if (isRedirecting && countDown > 0) {
      const interval = setInterval(() => {
        setCountDown((prev) => prev - 1);
      }, 1000);
      
      return () => clearInterval(interval);
    } else if (isRedirecting && countDown === 0) {
      window.location.href = 'https://unitedallianceservices.com/services/united-safety-professionals/';
    }
  }, [isRedirecting, countDown]);

  const handleRedirect = () => {
    window.location.href = 'https://unitedallianceservices.com/services/united-safety-professionals/';
  };

  return (
    <div className="min-h-screen bg-safety-gray flex flex-col">
      {/* Black header bar */}
      <div className="bg-safety-black text-white py-3 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center">
          <Shield className="h-6 w-6 text-safety mr-2" />
          <span className="font-bold">United Safety Professionals Portal</span>
        </div>
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            className="text-white hover:text-safety-light"
            onClick={() => navigate('/admin/login')}
          >
            Admin Portal
          </Button>
          <Button 
            variant="ghost" 
            className="text-white hover:text-safety-light"
            onClick={() => navigate('/')}
          >
            Client Portal
          </Button>
        </div>
      </div>

      <div className="container mx-auto py-12 px-4">
        <div className="text-center mb-12">
          <Shield className="h-16 w-16 text-safety mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold mb-4">United Safety Professionals</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Access our comprehensive safety services and document portal for safety professionals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card className="shadow-lg border-t-4 border-t-safety">
            <CardHeader>
              <CardTitle className="flex items-center">
                <ExternalLink className="h-6 w-6 text-safety mr-2" />
                Original Website
              </CardTitle>
              <CardDescription>
                Visit the official United Safety Professionals website
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-6 text-gray-600">
                Visit our main website to learn more about our comprehensive safety services, training programs, 
                and professional certifications.
              </p>
              {isRedirecting ? (
                <div className="text-center">
                  <p className="mb-2">Redirecting in {countDown} seconds...</p>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsRedirecting(false)}
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <Button 
                  className="w-full bg-safety hover:bg-safety-dark"
                  onClick={handleRedirect}
                >
                  Visit Official Website <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              )}
            </CardContent>
          </Card>

          <Card className="shadow-lg border-t-4 border-t-safety">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-6 w-6 text-safety mr-2" />
                Safety Portal
              </CardTitle>
              <CardDescription>
                Access the client portal with document management
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-6 text-gray-600">
                Our secure portal allows clients to access safety documents, training materials, and 
                certification records. Administrators can manage all client documents.
              </p>
              <div className="flex flex-col space-y-3">
                <Button 
                  className="w-full bg-safety hover:bg-safety-dark"
                  onClick={() => navigate('/')}
                >
                  Access Client Portal <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button 
                  variant="outline"
                  className="w-full border-safety text-safety hover:bg-safety/10"
                  onClick={() => navigate('/admin/login')}
                >
                  Admin Login
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-md mb-12">
          <h2 className="text-2xl font-bold mb-6">About United Safety Professionals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="mb-4 text-gray-700">
                United Safety Professionals provides comprehensive safety services to organizations across various industries.
                Our team of certified safety professionals helps clients maintain compliance with regulatory requirements and
                implement effective safety management systems.
              </p>
              <p className="text-gray-700">
                Through our portal, clients can access their safety documents, training materials, and 
                certification records at any time, from anywhere.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <FileCheck className="h-5 w-5 text-safety" />
                </div>
                <div className="ml-3">
                  <h3 className="font-medium">Document Management</h3>
                  <p className="text-sm text-gray-600">Secure storage and access for all safety documentation</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <Users className="h-5 w-5 text-safety" />
                </div>
                <div className="ml-3">
                  <h3 className="font-medium">Training Management</h3>
                  <p className="text-sm text-gray-600">Track and manage safety training requirements</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <Award className="h-5 w-5 text-safety" />
                </div>
                <div className="ml-3">
                  <h3 className="font-medium">Certification Tracking</h3>
                  <p className="text-sm text-gray-600">Monitor certification status and renewal requirements</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Button 
            size="lg"
            onClick={handleRedirect}
            className="bg-safety hover:bg-safety-dark"
          >
            Visit Official Website <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-safety-black text-white py-8 px-4 mt-auto">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Shield className="h-8 w-8 text-safety mr-2" />
              <span className="text-xl font-bold">United Safety Professionals</span>
            </div>
            <div className="flex flex-col md:flex-row gap-4 md:gap-8">
              <a href="#" className="text-gray-300 hover:text-white">Terms of Service</a>
              <a href="#" className="text-gray-300 hover:text-white">Privacy Policy</a>
              <a href="#" className="text-gray-300 hover:text-white">Contact Us</a>
            </div>
          </div>
          <div className="text-center mt-8 text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} United Safety Professionals. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SafetyProfessionals;
