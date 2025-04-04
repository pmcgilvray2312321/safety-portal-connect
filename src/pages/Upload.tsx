
import { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Upload, FileText, File, X } from 'lucide-react';

const UploadPage = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [documentType, setDocumentType] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles([...files, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (files.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select at least one file to upload",
        variant: "destructive",
      });
      return;
    }
    
    if (!documentType) {
      toast({
        title: "Document type required",
        description: "Please select a document type",
        variant: "destructive",
      });
      return;
    }
    
    setIsUploading(true);
    
    // Simulate upload
    setTimeout(() => {
      setIsUploading(false);
      toast({
        title: "Upload successful",
        description: `${files.length} file(s) uploaded successfully`,
      });
      setFiles([]);
      setDocumentType("");
    }, 2000);
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    
    switch (extension) {
      case 'pdf':
        return <FileText className="h-5 w-5 text-red-500" />;
      case 'doc':
      case 'docx':
        return <FileText className="h-5 w-5 text-blue-500" />;
      case 'xls':
      case 'xlsx':
        return <FileText className="h-5 w-5 text-green-500" />;
      default:
        return <File className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Upload Safety Documents</h1>
        <p className="text-gray-600">Upload your safety documentation for secure storage and easy access.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Upload Files</CardTitle>
            <CardDescription>
              Supported file formats: PDF, DOC, DOCX, XLS, XLSX, JPG, PNG
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpload} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="documentType">Document Type</Label>
                <Select value={documentType} onValueChange={setDocumentType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select document type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="safety-manual">Safety Manual</SelectItem>
                    <SelectItem value="training-material">Training Material</SelectItem>
                    <SelectItem value="risk-assessment">Risk Assessment</SelectItem>
                    <SelectItem value="incident-report">Incident Report</SelectItem>
                    <SelectItem value="inspection">Inspection Record</SelectItem>
                    <SelectItem value="certification">Certification</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="fileUpload">Upload Files</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                  <Input
                    id="fileUpload"
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    multiple
                  />
                  <Label htmlFor="fileUpload" className="cursor-pointer">
                    <div className="flex flex-col items-center">
                      <Upload className="h-10 w-10 text-gray-400 mb-2" />
                      <span className="font-medium text-gray-900">Click to upload or drag and drop</span>
                      <span className="text-sm text-gray-500">Up to 10 files (max 20MB each)</span>
                    </div>
                  </Label>
                </div>
              </div>
              
              {files.length > 0 && (
                <div className="space-y-2">
                  <Label>Selected Files</Label>
                  <div className="border rounded-md divide-y">
                    {files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3">
                        <div className="flex items-center space-x-3">
                          {getFileIcon(file.name)}
                          <div>
                            <div className="font-medium">{file.name}</div>
                            <div className="text-xs text-gray-500">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </div>
                          </div>
                        </div>
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => removeFile(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <Button 
                type="submit" 
                className="w-full bg-safety hover:bg-safety-dark"
                disabled={isUploading}
              >
                {isUploading ? "Uploading..." : "Upload Documents"}
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Upload Guidelines</CardTitle>
            <CardDescription>
              Tips for better document management
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold">File Naming</h4>
              <p className="text-sm text-gray-600">
                Use descriptive names for your files to make them easier to find.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold">Document Types</h4>
              <p className="text-sm text-gray-600">
                Select the appropriate document type for better organization.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold">File Size</h4>
              <p className="text-sm text-gray-600">
                Files must be under 20MB. For larger files, compress them first.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold">Privacy</h4>
              <p className="text-sm text-gray-600">
                All uploaded documents are securely stored and accessible only to authorized personnel.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default UploadPage;
