import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function DataImport() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  return (
    <div className="min-h-[60vh]">
      <h1 className="text-2xl font-semibold mb-4">Data Import</h1>
      <Card className="p-6">
        <p className="text-sm text-muted-foreground mb-4">
          Upload a CSV or Excel file to import records.
        </p>
        <input
          type="file"
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          onChange={(e) => setSelectedFile(e.target.files?.[0] ?? null)}
          className="mb-4"
        />
        <div className="flex items-center gap-2">
          <Button
            disabled={!selectedFile}
            className="bg-[#1DD3B0] hover:bg-[#12b89a] text-white"
            onClick={() => {
              // Placeholder action
              alert(selectedFile ? `Importing: ${selectedFile.name}` : "No file selected");
            }}
          >
            Import
          </Button>
          <Button variant="outline" onClick={() => setSelectedFile(null)}>
            Clear
          </Button>
        </div>
      </Card>
    </div>
  );
}


