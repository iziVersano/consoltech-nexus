import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Loader2, Eye, CheckCircle, X, Download } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface WarrantyRecord {
  customerName: string;
  email: string;
  product: string;
  serialNumber: string;
  invoiceUrl: string;
  invoiceFileName: string;
  createdAt: string;
}

interface InvoiceModalProps {
  invoiceUrl: string;
  fileName: string;
  onClose: () => void;
}

const InvoiceModal = ({ invoiceUrl, fileName, onClose }: InvoiceModalProps) => {
  const isPdf = invoiceUrl.toLowerCase().includes('.pdf');
  const isImage = /\.(jpg|jpeg|png|gif|webp)/i.test(invoiceUrl);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70" onClick={onClose}>
      <div
        className="bg-background border border-border rounded-lg max-w-4xl w-full max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="font-semibold truncate">{fileName || 'Invoice Preview'}</h3>
          <div className="flex items-center gap-2">
            <a
              href={invoiceUrl}
              download={fileName}
              className="px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded hover:bg-primary/90 flex items-center gap-1"
            >
              <Download className="h-4 w-4" />
              Download
            </a>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-muted rounded"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-4 min-h-[400px]">
          {isPdf ? (
            <iframe
              src={invoiceUrl}
              className="w-full h-[600px] border-0 rounded"
              title="Invoice PDF Preview"
            />
          ) : isImage ? (
            <div className="flex items-center justify-center">
              <img
                src={invoiceUrl}
                alt="Invoice"
                className="max-w-full max-h-[70vh] object-contain rounded"
              />
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <p>Preview not available for this file type.</p>
              <a
                href={invoiceUrl}
                download={fileName}
                className="mt-4 inline-block px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
              >
                Download File
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const WarrantyRecords = () => {
  const [records, setRecords] = useState<WarrantyRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<{ url: string; fileName: string } | null>(null);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/warranty`);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        const data = await response.json();
        setRecords(data);
      } catch (err) {
        console.error('Failed to fetch warranty records:', err);
        setError('Failed to load warranty records');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecords();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Warranty Records | Admin | Consoltech</title>
      </Helmet>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Success Banner */}
        <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center gap-3">
          <CheckCircle className="h-6 w-6 text-green-500" />
          <span className="text-green-500 font-medium">Warranty submission successful!</span>
        </div>

        <h1 className="text-3xl font-bold mb-6 gradient-text">Warranty Records</h1>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-3 text-muted-foreground">Loading records...</span>
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">{error}</div>
        ) : records.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">No warranty records found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left p-3 border border-border font-semibold">Customer Name</th>
                  <th className="text-left p-3 border border-border font-semibold">Product</th>
                  <th className="text-left p-3 border border-border font-semibold">Serial Number</th>
                  <th className="text-left p-3 border border-border font-semibold">Invoice</th>
                  <th className="text-left p-3 border border-border font-semibold">Date</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record, index) => (
                  <tr key={index} className="hover:bg-muted/30">
                    <td className="p-3 border border-border">{record.customerName}</td>
                    <td className="p-3 border border-border">{record.product}</td>
                    <td className="p-3 border border-border font-mono text-sm">{record.serialNumber}</td>
                    <td className="p-3 border border-border">
                      {record.invoiceUrl ? (
                        <button
                          onClick={() => setSelectedInvoice({ url: record.invoiceUrl, fileName: record.invoiceFileName })}
                          className="text-primary hover:underline flex items-center gap-1"
                        >
                          <Eye className="h-4 w-4" />
                          View Invoice
                        </button>
                      ) : (
                        <span className="text-muted-foreground">N/A</span>
                      )}
                    </td>
                    <td className="p-3 border border-border text-sm text-muted-foreground">
                      {record.createdAt ? new Date(record.createdAt).toLocaleDateString() : 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Invoice Preview Modal */}
      {selectedInvoice && (
        <InvoiceModal
          invoiceUrl={selectedInvoice.url}
          fileName={selectedInvoice.fileName}
          onClose={() => setSelectedInvoice(null)}
        />
      )}
    </div>
  );
};

export default WarrantyRecords;

