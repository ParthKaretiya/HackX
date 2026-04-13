import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { QrCode, Upload, Loader2, AlertCircle } from 'lucide-react';
import jsQR from 'jsqr';
import { toast } from 'sonner';

interface QRScannerProps {
  onScan: (data: string) => void;
}

export function QRScanner({ onScan }: QRScannerProps) {
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (!context) return;

        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0, img.width, img.height);

        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);

        if (code) {
          onScan(code.data);
          toast.success("QR Code detected successfully!");
        } else {
          toast.error("No QR code found in this image.");
        }
        setLoading(false);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileUpload}
      />
      
      <Button 
        variant="outline" 
        onClick={() => fileInputRef.current?.click()}
        disabled={loading}
        className="w-full h-32 flex flex-col items-center justify-center gap-3 border-dashed border-2 rounded-[2rem] hover:border-primary hover:bg-primary/5 transition-all group"
      >
        {loading ? (
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        ) : (
          <>
            <div className="p-4 bg-primary/10 rounded-2xl group-hover:scale-110 transition-transform">
              <QrCode className="h-8 w-8 text-primary" />
            </div>
            <div className="text-center">
              <p className="font-bold">Scan QR Code</p>
              <p className="text-xs text-muted-foreground">Upload an image of a QR code</p>
            </div>
          </>
        )}
      </Button>
    </div>
  );
}
