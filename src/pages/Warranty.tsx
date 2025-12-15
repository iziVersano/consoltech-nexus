import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Upload, CheckCircle } from 'lucide-react';

// Use Azure backend API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const WARRANTY_ENDPOINT = `${API_BASE_URL}/warranty/register`;

const Warranty = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    productModel: 'Nintendo Switch 2',
    serialNumber: '',
    purchaseDate: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const validTypes = ['application/pdf', 'image/jpeg', 'image/png'];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!validTypes.includes(selectedFile.type)) {
        toast({ variant: "destructive", title: "סוג קובץ לא נתמך", description: "אנא העלו קובץ PDF, JPG או PNG" });
        return;
      }
      if (selectedFile.size > maxSize) {
        toast({ variant: "destructive", title: "הקובץ גדול מדי", description: "גודל מקסימלי: 5MB" });
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    // Validation
    if (!formData.fullName || !formData.email || !formData.phone || !formData.serialNumber || !formData.purchaseDate || !file) {
      toast({ variant: "destructive", title: "אנא מלאו את כל השדות הנדרשים" });
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      toast({ variant: "destructive", title: "כתובת אימייל לא תקינה" });
      return;
    }

    setIsSubmitting(true);

    try {
      const submitData = new FormData();
      submitData.append('fullName', formData.fullName);
      submitData.append('email', formData.email);
      submitData.append('phone', formData.phone);
      submitData.append('productModel', formData.productModel);
      submitData.append('serialNumber', formData.serialNumber);
      submitData.append('purchaseDate', formData.purchaseDate);
      submitData.append('invoice', file);

      const res = await fetch(WARRANTY_ENDPOINT, {
        method: "POST",
        body: submitData,
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setIsSuccess(true);
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          productModel: 'Nintendo Switch 2',
          serialNumber: '',
          purchaseDate: '',
        });
        setFile(null);
      } else {
        throw new Error(data.message || "Submission failed");
      }
    } catch (error) {
      console.error('Warranty submission error:', error);
      toast({ variant: "destructive", title: "אירעה שגיאה בשליחת הטופס", description: "אנא נסו שנית" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = "w-full px-4 py-3 bg-input rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-right";
  const labelClass = "block text-sm font-medium mb-2 text-right";

  return (
    <div dir="rtl" className="min-h-screen bg-background">
      <Helmet>
        <title>רישום אחריות - Nintendo Switch 2 | Consoltech</title>
        <meta name="description" content="טופס רישום אחריות למוצרי Nintendo Switch 2" />
        <html lang="he" />
      </Helmet>

      <div className="max-w-2xl mx-auto px-4 py-8 sm:py-16">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 gradient-text leading-tight">
            טופס רישום אחריות
          </h1>
          <h2 className="text-xl sm:text-2xl font-semibold text-primary mb-4">
            Nintendo Switch 2
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg px-2">
            אנא מלאו את הפרטים הבאים וצרפו חשבונית רכישה לצורך הפעלת האחריות.
          </p>
        </div>

        {/* Success Message */}
        {isSuccess ? (
          <div className="product-card text-center py-12">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
            <h2 className="text-2xl font-bold mb-4 text-green-500">הטופס נשלח בהצלחה.</h2>
            <p className="text-muted-foreground text-lg">
              נציג מטעמנו ייצור עמכם קשר במידת הצורך.
            </p>
            <Button 
              className="mt-8 btn-hero"
              onClick={() => setIsSuccess(false)}
            >
              שליחת טופס נוסף
            </Button>
          </div>
        ) : (
          /* Form */
          <div className="product-card">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <label className={labelClass}>שם מלא *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className={inputClass}
                  placeholder="הזינו את שמכם המלא"
                />
              </div>

              {/* Email */}
              <div>
                <label className={labelClass}>כתובת אימייל *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={inputClass}
                  placeholder="example@email.com"
                  dir="ltr"
                  style={{ textAlign: 'left' }}
                />
              </div>

              {/* Phone */}
              <div>
                <label className={labelClass}>מספר טלפון *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className={inputClass}
                  placeholder="050-1234567"
                  dir="ltr"
                  style={{ textAlign: 'left' }}
                />
              </div>

              {/* Product Model */}
              <div>
                <label className={labelClass}>דגם המוצר *</label>
                <input
                  type="text"
                  name="productModel"
                  value={formData.productModel}
                  onChange={handleChange}
                  required
                  className={inputClass}
                  placeholder="Nintendo Switch 2"
                />
              </div>

              {/* Serial Number */}
              <div>
                <label className={labelClass}>מספר סידורי (S/N) *</label>
                <input
                  type="text"
                  name="serialNumber"
                  value={formData.serialNumber}
                  onChange={handleChange}
                  required
                  className={inputClass}
                  placeholder="הזינו את המספר הסידורי"
                  dir="ltr"
                  style={{ textAlign: 'left' }}
                />
              </div>

              {/* Purchase Date */}
              <div>
                <label className={labelClass}>תאריך רכישה *</label>
                <input
                  type="date"
                  name="purchaseDate"
                  value={formData.purchaseDate}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>

              {/* File Upload */}
              <div>
                <label className={labelClass}>העלאת קובץ חשבונית *</label>
                <div className="relative">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                    className="hidden"
                    id="invoice-upload"
                  />
                  <label
                    htmlFor="invoice-upload"
                    className="flex items-center justify-center gap-3 w-full px-4 py-4 bg-input rounded-lg border-2 border-dashed border-border hover:border-primary cursor-pointer transition-colors"
                  >
                    <Upload className="h-5 w-5 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      {file ? file.name : 'בחרו קובץ (PDF, JPG, PNG)'}
                    </span>
                  </label>
                </div>
                <p className="text-xs text-muted-foreground mt-2 text-right">
                  גודל מקסימלי: 5MB
                </p>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="btn-hero w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>שולח...</span>
                  </>
                ) : (
                  <span>שליחת טופס</span>
                )}
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Warranty;

