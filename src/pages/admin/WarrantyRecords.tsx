import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Loader2, ExternalLink, CheckCircle } from 'lucide-react';

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

const WarrantyRecords = () => {
  const [records, setRecords] = useState<WarrantyRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
                        <a
                          href={record.invoiceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline flex items-center gap-1"
                        >
                          {record.invoiceFileName || 'View Invoice'}
                          <ExternalLink className="h-3 w-3" />
                        </a>
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
    </div>
  );
};

export default WarrantyRecords;

