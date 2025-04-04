
import { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  FileText, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Trash2, 
  FileSpreadsheet, 
  FileImage, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const DocumentsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDocument, setSelectedDocument] = useState<any>(null);
  
  const documents = [
    { 
      id: 1, 
      name: "Safety Manual 2025.pdf", 
      type: "Safety Manual", 
      size: "3.2 MB", 
      uploadedBy: "John Smith",
      uploadedDate: "Apr 1, 2025",
      fileType: "pdf"
    },
    { 
      id: 2, 
      name: "Risk Assessment Report.docx", 
      type: "Risk Assessment", 
      size: "1.8 MB", 
      uploadedBy: "Maria Johnson",
      uploadedDate: "Mar 28, 2025",
      fileType: "docx"
    },
    { 
      id: 3, 
      name: "OSHA Compliance Checklist.xlsx", 
      type: "Inspection", 
      size: "0.9 MB", 
      uploadedBy: "Robert Chen",
      uploadedDate: "Mar 25, 2025",
      fileType: "xlsx"
    },
    { 
      id: 4, 
      name: "Incident Report Form.pdf", 
      type: "Incident Report", 
      size: "0.5 MB", 
      uploadedBy: "John Smith",
      uploadedDate: "Mar 22, 2025",
      fileType: "pdf"
    },
    { 
      id: 5, 
      name: "Emergency Response Plan.pdf", 
      type: "Safety Manual", 
      size: "2.1 MB", 
      uploadedBy: "Sarah Williams",
      uploadedDate: "Mar 20, 2025",
      fileType: "pdf"
    },
    { 
      id: 6, 
      name: "Training Attendance Sheet.xlsx", 
      type: "Training Material", 
      size: "0.7 MB", 
      uploadedBy: "Maria Johnson",
      uploadedDate: "Mar 15, 2025",
      fileType: "xlsx"
    },
    { 
      id: 7, 
      name: "Safety Equipment Inventory.xlsx", 
      type: "Inventory", 
      size: "1.2 MB", 
      uploadedBy: "Robert Chen",
      uploadedDate: "Mar 10, 2025",
      fileType: "xlsx"
    },
    { 
      id: 8, 
      name: "Site Inspection Photos.jpg", 
      type: "Inspection", 
      size: "4.5 MB", 
      uploadedBy: "Sarah Williams",
      uploadedDate: "Mar 5, 2025",
      fileType: "jpg"
    },
  ];
  
  const filteredDocuments = documents.filter(doc => 
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase())
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
      <div className="mb-6">
        <h1 className="text-2xl font-bold">My Documents</h1>
        <p className="text-gray-600">Access and manage your safety documentation.</p>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <CardTitle>Document Repository</CardTitle>
            <div className="flex space-x-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search documents..."
                  className="pl-8 w-full md:w-auto"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <span className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Filter" />
                  </span>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Documents</SelectItem>
                  <SelectItem value="safety-manual">Safety Manuals</SelectItem>
                  <SelectItem value="risk-assessment">Risk Assessments</SelectItem>
                  <SelectItem value="inspection">Inspections</SelectItem>
                  <SelectItem value="training">Training Materials</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-safety-gray">
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Name</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Type</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Size</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Uploaded By</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Date</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredDocuments.map((doc) => (
                    <tr key={doc.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm">
                        <div className="flex items-center">
                          {getFileIcon(doc.fileType)}
                          <span className="ml-2">{doc.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">{doc.type}</td>
                      <td className="px-4 py-3 text-sm">{doc.size}</td>
                      <td className="px-4 py-3 text-sm">{doc.uploadedBy}</td>
                      <td className="px-4 py-3 text-sm">{doc.uploadedDate}</td>
                      <td className="px-4 py-3 text-sm text-right">
                        <div className="flex justify-end space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => setSelectedDocument(doc)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl">
                              <DialogHeader>
                                <DialogTitle>{selectedDocument?.name}</DialogTitle>
                              </DialogHeader>
                              <div className="p-6 bg-gray-100 rounded-md flex items-center justify-center min-h-[400px]">
                                <div className="text-center">
                                  {getFileIcon(selectedDocument?.fileType)}
                                  <p className="mt-4 text-gray-600">
                                    Preview not available. Please download the file to view its contents.
                                  </p>
                                  <Button className="mt-4 bg-safety hover:bg-safety-dark">
                                    <Download className="mr-2 h-4 w-4" />
                                    Download File
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {filteredDocuments.length === 0 && (
              <div className="p-8 text-center">
                <FileText className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium">No documents found</h3>
                <p className="mt-1 text-gray-500">Try adjusting your search terms.</p>
              </div>
            )}
            
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t">
              <div className="text-sm text-gray-500">
                Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredDocuments.length}</span> of <span className="font-medium">{filteredDocuments.length}</span> results
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" disabled>
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                <Button variant="outline" size="sm" disabled>
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default DocumentsPage;
