import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { scanLink } from '@/services/api';
import { ScanResultData } from '@/types/scan';
import {
  Baby,
  Search,
  Loader2,
  ShieldCheck,
  ShieldAlert,
  ExternalLink,
  ArrowLeft,
  AlertCircle,
  Info,
  Bell,
} from 'lucide-react';

const ChildScanPage = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScanResultData | null>(null);

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await scanLink(url.trim());
      setResult(res);
    } finally {
      setLoading(false);
    }
  };

  const isSafe = result?.safetyCategory === 'SAFE';
  const isBlocked = result && !isSafe;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section className="border-b border-border bg-gradient-to-b from-accent/30 to-background py-10 md:py-14">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
            <Baby className="h-8 w-8 text-primary" />
          </div>
          <h1 className="mb-2 text-3xl font-extrabold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            Child Mode – Check a Link
          </h1>
          <p className="mx-auto max-w-md text-lg text-muted-foreground">Paste any link you want to open. PulseGuard will check if it's safe first!</p>
        </div>
      </section>

      {/* Scanner */}
      <section className="py-10 md:py-14">
        <div className="container mx-auto max-w-lg px-4">
          {!result && (
            <div className="glass-card rounded-2xl p-6 md:p-8">
              <form onSubmit={handleScan} className="space-y-5">
                <Input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Paste the link here…"
                  className="h-14 rounded-xl bg-secondary/50 text-lg"
                  required
                />
                <Button
                  type="submit"
                  disabled={loading || !url.trim()}
                  size="lg"
                  className="w-full gap-2 rounded-xl text-lg font-bold shadow-md shadow-primary/20"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Checking…
                    </>
                  ) : (
                    <>
                      <Search className="h-5 w-5" />
                      Check and Open
                    </>
                  )}
                </Button>
                <p className="text-center text-sm text-muted-foreground">
                  <Info className="mr-1 inline h-3.5 w-3.5" />
                  If this link looks dangerous, we won't open it and we'll tell your parent.
                </p>
              </form>
            </div>
          )}

          {/* SAFE result */}
          {result && isSafe && (
            <div className="animate-fade-in-up space-y-6">
              <div className="rounded-2xl border-2 border-safe/40 bg-safe/5 p-6 text-center md:p-8">
                <ShieldCheck className="mx-auto mb-3 h-16 w-16 text-safe" />
                <h2 className="mb-2 text-2xl font-extrabold text-foreground md:text-3xl">
                  This link looks safe to open!
                </h2>
                <ul className="mx-auto mb-6 max-w-sm space-y-2 text-left">
                  {result.reasons.slice(0, 3).map((r, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                      <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-safe" />
                      {r}
                    </li>
                  ))}
                </ul>
                <a
                  href={result.input}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-safe px-8 py-3 text-lg font-bold text-safe-foreground shadow-lg transition-all hover:opacity-90"
                >
                  <ExternalLink className="h-5 w-5" />
                  Open Website
                </a>
              </div>
              <Button
                variant="outline"
                size="lg"
                onClick={() => { setResult(null); setUrl(''); }}
                className="w-full gap-2 rounded-xl"
              >
                <ArrowLeft className="h-4 w-4" />
                Check Another Link
              </Button>
            </div>
          )}

          {/* BLOCKED result */}
          {result && isBlocked && (
            <div className="animate-fade-in-up space-y-6">
              <div className="rounded-2xl border-2 border-dangerous/40 bg-dangerous/5 p-6 text-center md:p-8">
                <ShieldAlert className="mx-auto mb-3 h-16 w-16 text-dangerous" />
                <h2 className="mb-2 text-2xl font-extrabold text-foreground md:text-3xl">
                  This link looks dangerous. We blocked it.
                </h2>
                <p className="mx-auto mb-4 max-w-sm text-foreground/80">
                  This link looks like it might try to trick you or steal your information. Don't open it.
                </p>
                <ul className="mx-auto mb-4 max-w-sm space-y-2 text-left">
                  {result.reasons.slice(0, 3).map((r, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-dangerous" />
                      {r}
                    </li>
                  ))}
                </ul>
                <div className="rounded-xl border border-border bg-secondary/50 p-3 text-sm text-muted-foreground">
                  <Bell className="mr-1 inline h-4 w-4 text-primary" />
                  We'll let your parent know about this link.
                </div>
                <p className="mt-3 text-xs text-muted-foreground">In the future, PulseGuard will email or message your parent automatically when a dangerous link is blocked.</p>
              </div>
              <Button
                variant="outline"
                size="lg"
                onClick={() => { setResult(null); setUrl(''); }}
                className="w-full gap-2 rounded-xl"
              >
                <ArrowLeft className="h-4 w-4" />
                Check Another Link
              </Button>
            </div>
          )}
        </div>
      </section>

      <footer className="border-t border-border bg-background py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">© {new Date().getFullYear()} PulseGuard. Your personal internet safety shield.</div>
      </footer>
    </div>
  );
};

export default ChildScanPage;
