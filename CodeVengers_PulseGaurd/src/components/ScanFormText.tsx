import { useState, useRef } from 'react';
import { MessageSquareText, Loader2, Search, ImagePlus, X, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { motion, AnimatePresence } from 'framer-motion';

interface ScanFormTextProps {
  onScan: (text: string) => void;
  onScanImage: (file: File) => void;
  loading: boolean;
}

const ScanFormText = ({ onScan, onScanImage, loading }: ScanFormTextProps) => {
  const [text, setText] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (ev) => setImagePreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileRef.current) fileRef.current.value = '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (imageFile) {
      onScanImage(imageFile);
    } else if (text.trim()) {
      onScan(text.trim());
    }
  };

  return (
    <div className="glass-panel rounded-[2rem] p-8 h-full border border-white/10 shadow-xl relative overflow-hidden group hover:shadow-warning/20 hover:border-warning/20 transition-all flex flex-col">
      <div className="absolute top-0 right-0 p-8 opacity-5 transform translate-x-1/4 -translate-y-1/4 group-hover:scale-110 transition-transform duration-700 pointer-events-none">
        <MessageSquareText className="w-48 h-48 text-warning" />
      </div>

      <div className="relative z-10 flex flex-col h-full">
        <div className="mb-6 flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-[1.2rem] bg-gradient-to-br from-warning/20 to-warning/5 shadow-inner">
            <MessageSquareText className="h-7 w-7 text-warning" />
          </div>
          <div>
            <h3 className="text-xl font-black text-foreground tracking-tight">Inspect Content</h3>
            <p className="text-sm text-muted-foreground font-medium">
              Analyze messages, emails, or news screenshots.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 flex-1 flex flex-col justify-end">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste suspicious text or news headline here..."
            className="min-h-[120px] resize-none rounded-2xl bg-secondary/80 text-base border-white/5 focus-visible:ring-warning shadow-inner font-medium transition-all"
            disabled={!!imageFile}
          />

          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-border/50" />
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">OR UPLOAD</span>
            <div className="h-px flex-1 bg-border/50" />
          </div>

          <AnimatePresence mode="popLayout">
            {imagePreview ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="relative mx-auto rounded-2xl overflow-hidden shadow-lg border border-white/10">
                <img src={imagePreview} alt="Preview" className="h-32 w-full object-cover opacity-80" />
                <div className="absolute inset-0 bg-black/20" />
                <button
                  type="button"
                  onClick={clearImage}
                  className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-xl bg-black/50 backdrop-blur-md text-white shadow-xl hover:bg-destructive transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </motion.div>
            ) : (
              <motion.button
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                type="button"
                whileHover={{ scale: 1.02 }}
                onClick={() => fileRef.current?.click()}
                className="flex w-full items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-border/60 bg-secondary/30 py-5 text-sm font-bold text-muted-foreground transition-all hover:border-warning/40 hover:bg-warning/10 hover:text-warning"
              >
                <ImagePlus className="h-6 w-6" />
                Attach Screenshot
              </motion.button>
            )}
          </AnimatePresence>

          <input ref={fileRef} type="file" accept=".jpg,.jpeg,.png" onChange={handleImageChange} className="hidden" />

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              type="submit"
              disabled={loading || (!text.trim() && !imageFile)}
              className="w-full h-16 gap-3 rounded-2xl text-lg font-black shadow-lg shadow-warning/20 bg-gradient-to-r from-warning to-orange-500 border-0 text-white transition-all overflow-hidden relative"
            >
              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.div key="loading" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} className="flex items-center gap-2">
                    <Loader2 className="h-6 w-6 animate-spin" /> Deep Scanning Protocol...
                  </motion.div>
                ) : (
                  <motion.div key="idle" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} className="flex items-center gap-2">
                    <Zap className="h-6 w-6" /> Execute Scan
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </motion.div>
        </form>
      </div>
    </div>
  );
};

export default ScanFormText;
