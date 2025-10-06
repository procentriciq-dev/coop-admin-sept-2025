import { useState, useCallback, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Upload, X, FileText, File, Loader2, CheckCircle2, FileImage, Trash2 } from "lucide-react";

interface FileWithPreview {
  id: string;
  file: File;
  preview?: string;
  status: 'pending' | 'uploading' | 'completed' | 'error';
  progress?: number;
  error?: string;
}

interface UploadDocumentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUploadComplete?: (files: File[]) => void;
  maxFiles?: number;
  maxSizeMB?: number;
}

export function UploadDocumentDialog({
  open,
  onOpenChange,
  onUploadComplete,
  maxFiles = 5,
  maxSizeMB = 2,
}: UploadDocumentDialogProps) {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const MAX_SIZE = maxSizeMB * 1024 * 1024;

  // Clean up object URLs when component unmounts or files change
  useEffect(() => {
    return () => {
      files.forEach(file => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
  }, [files]);

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      // Reset state when dialog closes
      setTimeout(() => {
        setFiles([]);
        setError(null);
        setIsUploading(false);
      }, 300);
    }
    onOpenChange(newOpen);
  };

  const handleFileChange = useCallback((selectedFiles: FileList | null) => {
    if (!selectedFiles || selectedFiles.length === 0) return;

    setError(null); // Clear previous errors
    const filesArray = Array.from(selectedFiles);
    const remainingSlots = maxFiles - files.length;
    
    if (remainingSlots <= 0) {
      setError(`You can only upload up to ${maxFiles} files in total.`);
      return;
    }

    // Only take as many files as we have slots for
    const filesToAdd = filesArray.slice(0, remainingSlots);
    
    const newFiles: FileWithPreview[] = [];
    const errors: string[] = [];

    filesToAdd.forEach(file => {
      // Check file size
      if (file.size > MAX_SIZE) {
        errors.push(`File too large (max ${maxSizeMB}MB): ${file.name}`);
        return;
      }

      // Create file object with preview if it's an image
      newFiles.push({
        id: Math.random().toString(36).substring(2, 9),
        file,
        preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
        status: 'pending',
        progress: 0
      });
    });

    // Show errors if any
    if (errors.length > 0) {
      setError(prev => prev ? prev + '\n' + errors.join('\n') : errors.join('\n'));
      if (newFiles.length === 0) return;
    }

    setFiles(prev => [...prev, ...newFiles]);
  }, [files.length, maxFiles, maxSizeMB, MAX_SIZE]);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileChange(e.dataTransfer.files);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileChange(e.target.files);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeFile = (fileId: string) => {
    setFiles(prev => {
      const fileToRemove = prev.find(f => f.id === fileId);
      if (fileToRemove?.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return prev.filter(f => f.id !== fileId);
    });
  };

  const clearAllFiles = () => {
    setFiles(prev => {
      prev.forEach(file => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview);
        }
      });
      return [];
    });
  };

  const uploadFiles = async () => {
    if (files.length === 0) return;

    setIsUploading(true);
    setError(null);
    
    try {
      // Simulate file upload with progress
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // Skip already uploaded files
        if (file.status === 'completed') continue;

        // Update file status to uploading
        setFiles(prev => prev.map((f, idx) => 
          idx === i 
            ? { ...f, status: 'uploading', progress: 0 }
            : f
        ));

        // Simulate upload progress with variable increments
        for (let progress = 0; progress <= 100; progress += Math.random() * 30) {
          await new Promise(resolve => setTimeout(resolve, 200 + Math.random() * 300));
          const currentProgress = Math.min(progress, 100);
          setFiles(prev => prev.map((f, idx) => 
            idx === i ? { ...f, progress: currentProgress } : f
          ));
          if (currentProgress === 100) break;
        }

        // Mark as completed
        setFiles(prev => prev.map((f, idx) => 
          idx === i 
            ? { ...f, status: 'completed', progress: 100 }
            : f
        ));
      }

      // Call the callback with the actual File objects
      if (onUploadComplete) {
        onUploadComplete(files.map(f => f.file));
      }
    } catch (error) {
      setError('An error occurred during upload. Please try again.');
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const getFileIcon = (file: File) => {
    if (!file) return <File className="h-5 w-5 text-gray-500" />;
    
    if (file.type.startsWith('image/')) {
      return <FileImage className="h-5 w-5 text-blue-500" />;
    }
    
    const extension = file.name.split('.').pop()?.toLowerCase();
    
    // Common file type icons
    const iconMap: Record<string, JSX.Element> = {
      // Documents
      'pdf': <FileText className="h-5 w-5 text-red-500" />,
      'doc': <FileText className="h-5 w-5 text-blue-600" />,
      'docx': <FileText className="h-5 w-5 text-blue-600" />,
      'txt': <FileText className="h-5 w-5 text-gray-600" />,
      'rtf': <FileText className="h-5 w-5 text-blue-800" />,
      
      // Spreadsheets
      'xls': <FileText className="h-5 w-5 text-green-600" />,
      'xlsx': <FileText className="h-5 w-5 text-green-600" />,
      'csv': <FileText className="h-5 w-5 text-green-500" />,
      
      // Presentations
      'ppt': <FileText className="h-5 w-5 text-orange-500" />,
      'pptx': <FileText className="h-5 w-5 text-orange-500" />,
      
      // Archives
      'zip': <File className="h-5 w-5 text-yellow-500" />,
      'rar': <File className="h-5 w-5 text-yellow-600" />,
      '7z': <File className="h-5 w-5 text-yellow-700" />,
      'tar': <File className="h-5 w-5 text-yellow-600" />,
      'gz': <File className="h-5 w-5 text-yellow-600" />,
      
      // Media
      'mp3': <File className="h-5 w-5 text-purple-500" />,
      'wav': <File className="h-5 w-5 text-purple-500" />,
      'mp4': <File className="h-5 w-5 text-purple-600" />,
      'mov': <File className="h-5 w-5 text-purple-600" />,
      'avi': <File className="h-5 w-5 text-purple-600" />,
      
      // Code
      'js': <FileText className="h-5 w-5 text-yellow-400" />,
      'jsx': <FileText className="h-5 w-5 text-yellow-400" />,
      'ts': <FileText className="h-5 w-5 text-blue-400" />,
      'tsx': <FileText className="h-5 w-5 text-blue-400" />,
      'json': <FileText className="h-5 w-5 text-yellow-500" />,
      'html': <FileText className="h-5 w-5 text-orange-500" />,
      'css': <FileText className="h-5 w-5 text-blue-500" />,
      'scss': <FileText className="h-5 w-5 text-pink-500" />,
      'py': <FileText className="h-5 w-5 text-blue-600" />,
      'java': <FileText className="h-5 w-5 text-red-600" />,
      'c': <FileText className="h-5 w-5 text-blue-700" />,
      'cpp': <FileText className="h-5 w-5 text-blue-700" />,
      'cs': <FileText className="h-5 w-5 text-purple-700" />,
      'go': <FileText className="h-5 w-5 text-cyan-500" />,
      'rs': <FileText className="h-5 w-5 text-orange-700" />,
      'php': <FileText className="h-5 w-5 text-indigo-500" />,
      'rb': <FileText className="h-5 w-5 text-red-500" />,
      'swift': <FileText className="h-5 w-5 text-orange-500" />,
      'kt': <FileText className="h-5 w-5 text-orange-500" />,
      'dart': <FileText className="h-5 w-5 text-blue-400" />,
    };
    
    return iconMap[extension as keyof typeof iconMap] || <File className="h-5 w-5 text-gray-500" />;
  };

  const getFileTypeInfo = (file: File) => {
    if (file.type.startsWith('image/')) {
      return 'Image';
    }
    
    const extension = file.name.split('.').pop()?.toLowerCase() || '';
    const typeMap: Record<string, string> = {
      // Documents
      'pdf': 'PDF Document',
      'doc': 'Word Document',
      'docx': 'Word Document',
      'txt': 'Text File',
      'rtf': 'Rich Text',
      
      // Spreadsheets
      'xls': 'Excel Spreadsheet',
      'xlsx': 'Excel Spreadsheet',
      'csv': 'CSV File',
      
      // Presentations
      'ppt': 'PowerPoint',
      'pptx': 'PowerPoint',
      
      // Archives
      'zip': 'ZIP Archive',
      'rar': 'RAR Archive',
      '7z': '7-Zip Archive',
      'tar': 'TAR Archive',
      'gz': 'GZIP Archive',
      
      // Media
      'mp3': 'Audio File',
      'wav': 'Audio File',
      'mp4': 'Video File',
      'mov': 'Video File',
      'avi': 'Video File',
    };
    
    return typeMap[extension] || `${extension.toUpperCase()} File`;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-hidden flex flex-col [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Upload Bulk Document
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-6 flex-1 overflow-y-auto">
          <div 
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragging ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Upload className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">
                  {isDragging ? 'Drop your files here' : 'Drag and drop your files here'}
                </p>
                <p className="text-sm text-muted-foreground">
                  All file types are supported
                </p>
                <p className="text-xs text-muted-foreground">
                  • Max file size: {maxSizeMB}MB per file
                </p>
                <p className="text-xs text-muted-foreground">
                  • Max files: {maxFiles}
                </p>
              </div>

              <div className="flex items-center gap-3 w-full max-w-xs">
                <div className="h-px bg-border flex-1" />
                <span className="text-sm text-muted-foreground">or</span>
                <div className="h-px bg-border flex-1" />
              </div>

              <div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleInputChange}
                  className="hidden"
                  accept="*"
                  multiple
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                >
                  Select Files
                </Button>
              </div>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-destructive/10 border border-destructive/50 text-destructive text-sm rounded-md">
              {error.split('\n').map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          )}

          {files.length > 0 && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-medium">
                  Selected Files ({files.length}/{maxFiles})
                </h4>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFiles}
                  disabled={isUploading}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Clear All
                </Button>
              </div>
              <div className="space-y-2 max-h-60 overflow-y-auto pr-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {files.map((file) => (
                  <div 
                    key={file.id}
                    className="border rounded-lg p-3 flex items-start gap-3 relative group"
                  >
                    <div className="flex-shrink-0 relative">
                      {file.preview ? (
                        <div className="w-12 h-12 rounded border overflow-hidden bg-muted">
                          <img 
                            src={file.preview} 
                            alt={file.file.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded border flex items-center justify-center bg-muted">
                          {getFileIcon(file.file)}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <div className="truncate pr-4">
                          <p className="text-sm font-medium truncate" title={file.file.name}>
                            {file.file.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatFileSize(file.file.size)} • {getFileTypeInfo(file.file)}
                          </p>
                        </div>
                        <button 
                          type="button" 
                          className="text-muted-foreground hover:text-destructive flex-shrink-0 transition-colors"
                          onClick={() => removeFile(file.id)}
                          disabled={isUploading}
                          aria-label="Remove file"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="mt-2">
                        <div className="flex justify-between items-center text-xs text-muted-foreground mb-1">
                          {file.status === 'completed' ? (
                            <span className="text-green-600 flex items-center gap-1">
                              <CheckCircle2 className="h-3 w-3" />
                              Uploaded
                            </span>
                          ) : file.status === 'uploading' ? (
                            <span className="text-blue-600 flex items-center gap-1">
                              <Loader2 className="h-3 w-3 animate-spin" />
                              Uploading... {file.progress}%
                            </span>
                          ) : (
                            <span>Ready to upload</span>
                          )}
                        </div>
                        {(file.status === 'uploading' || file.status === 'completed') && (
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className={`h-full transition-all duration-300 ${
                                file.status === 'completed' ? 'bg-green-500' : 'bg-blue-500'
                              }`}
                              style={{ width: `${file.progress}%` }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="mt-6 border-t pt-4">
          <Button 
            variant="outline" 
            onClick={() => handleOpenChange(false)}
            disabled={isUploading}
          >
            Cancel
          </Button>
          <Button 
            onClick={uploadFiles}
            disabled={files.length === 0 || isUploading}
            className="bg-[#1DD3B0] hover:bg-[#12b89a] text-white"
          >
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              `Upload ${files.length} File${files.length !== 1 ? 's' : ''}`
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}