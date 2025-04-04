
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { 
  FileText, 
  Search, 
  Filter, 
  Trash2, 
  FileSpreadsheet, 
  FileImage, 
  Upload,
  LogOut,
  Plus,
  FileUp
} from 'lucide-react';

const AdminDocuments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [documents, setDocuments] = useState<any[]>([]);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [fileName, setFileName] = useState('');
  const [documentType, setDocumentType] = useState('');
  const [fileSize, setFileSize] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Mock document data
  const initialDocuments = [
    { 
      id: 1, 
      name: "Safety Manual 2025.pdf", 
      type: "Safety Manual", 
      size: "3.2 MB", 
      uploadDate: "Apr 1, 2025",
      fileType: "pdf"
    },
    { 
      id: 2, 
      name: "Risk Assessment Report.docx", 
      type: "Risk Assessment", 
      size: "1.8 MB", 
      uploadDate: "Mar 28, 2025",
      fileType: "docx"
    },
    { 
      id: 3, 
      name: "OSHA Compliance Checklist.xlsx", 
      type: "Inspection", 
      size: "0.9 MB", 
      uploadDate: "Mar 25, 2025",
      fileType: "xlsx"
    },
    { 
      id: 4, 
      name: "Incident Report Form.pdf", 
      type: "Incident Report", 
      size: "0.5 MB", 
      uploadDate: "Mar 22, 2025",
      fileType: "pdf"
    },
  ];

  useEffect(() => {
    // Check if admin is authenticated
    const isAuthenticated = localStorage.getItem('adminAuthenticated') === 'true';
    if (!isAuthenticated) {
      navigate('/admin/login');
      return;
    }
    
    // Load documents
    setDocuments(initialDocuments);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    navigate('/admin/login');
    toast({
      title: "Logged out",
      description: "You have been logged out of the admin portal"
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setFileName(file.name);
      setFileSize((file.size / (1024 * 1024)).toFixed(2) + ' MB');
    }
  };

  const handleAddDocument = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile || !documentType) {
      toast({
        title: "Missing information",
        description: "Please select a file and document type",
        variant: "destructive"
      });
      return;
    }
    
    const newDocument = {
      id: documents.length + 1,
      name: fileName,
      type: documentType,
      size: fileSize,
      uploadDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      fileType: fileName.split('.').pop() || ''
    };
    
    setDocuments([newDocument, ...documents]);
    setIsUploadOpen(false);
    setFileName('');
    setDocumentType('');
    setFileSize('');
    setSelectedFile(null);
    
    toast({
      title: "Document added",
      description: "The document has been successfully added"
    });
  };

  const handleDeleteDocument = (id: number) => {
    setDocuments(documents.filter(doc => doc.id !== id));
    toast({
      title: "Document deleted",
      description: "The document has been successfully removed"
    });
  };

  const filteredDocuments = documents.filter(doc => 
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.type.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'pdf':
        return <FileText className="h-5 w-5 text-red-500" />;
      case 'docx':
        return <FileText className="h-5 w-5 text-blue-500" />;
      case 'xlsx':
        return <FileSpreadsheet className="h-5 w-5 text-green-500" />;
      case 'jpg':
      case 'png':
        return <FileImage className="h-5 w-5 text-purple-500" />;
      default:
        return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <Layout>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Admin Document Management</h1>
          <p className="text-gray-600">Manage client access to safety documentation</p>
        </div>
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          Admin Logout
        </Button>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <CardTitle>Document Repository</CardTitle>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search documents..."
                  className="pl-8 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-safety hover:bg-safety-dark">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Document
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Document</DialogTitle>
                    <DialogDescription>
                      Upload a new document to the client portal
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleAddDocument} className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="documentType">Document Type</Label>
                      <Select value={documentType} onValueChange={setDocumentType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select document type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Safety Manual">Safety Manual</SelectItem>
                          <SelectItem value="Risk Assessment">Risk Assessment</SelectItem>
                          <SelectItem value="Inspection">Inspection Record</SelectItem>
                          <SelectItem value="Incident Report">Incident Report</SelectItem>
                          <SelectItem value="Training Material">Training Material</SelectItem>
                          <SelectItem value="Certification">Certification</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="fileUpload">Upload File</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                        <Input
                          id="fileUpload"
                          type="file"
                          className="hidden"
                          onChange={handleFileChange}
                        />
                        <Label htmlFor="fileUpload" className="cursor-pointer">
                          <div className="flex flex-col items-center">
                            <FileUp className="h-10 w-10 text-gray-400 mb-2" />
                            <span className="font-medium text-gray-900">Click to upload or drag and drop</span>
                            <span className="text-sm text-gray-500">PDF, DOC, DOCX, XLS, XLSX, JPG, PNG</span>
                          </div>
                        </Label>
                      </div>
                      {fileName && (
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                          Selected: {fileName} ({fileSize})
                        </div>
                      )}
                    </div>
                    
                    <DialogFooter>
                      <Button type="button" variant="outline" onClick={() => setIsUploadOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="submit" className="bg-safety hover:bg-safety-dark">
                        Add Document
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-safety-gray">
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Upload Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDocuments.length > 0 ? (
                  filteredDocuments.map((doc) => (
                    <TableRow key={doc.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          {getFileIcon(doc.fileType)}
                          <span className="ml-2">{doc.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{doc.type}</TableCell>
                      <TableCell>{doc.size}</TableCell>
                      <TableCell>{doc.uploadDate}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteDocument(doc.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      <div className="flex flex-col items-center justify-center text-gray-500">
                        <FileText className="h-8 w-8 mb-2" />
                        <p>No documents found</p>
                        {searchTerm && <p className="text-sm">Try adjusting your search</p>}
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default AdminDocuments;
