import { Link } from 'react-router-dom';
import { Shield, Home, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const NotFound = () => (
  <div className="min-h-screen relative flex flex-col items-center justify-center px-4 text-center">
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 80 }}
      className="max-w-md"
    >
      {/* Glitchy 404 */}
      <div className="relative mb-8">
        <div className="text-[8rem] md:text-[10rem] font-display font-bold text-gradient leading-none select-none">
          404
        </div>
        <div className="absolute inset-0 text-[8rem] md:text-[10rem] font-display font-bold text-accent/20 leading-none select-none translate-x-1 translate-y-0.5">
          404
        </div>
      </div>

      <div className="mx-auto mb-6 h-16 w-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
        <Shield className="h-8 w-8 text-muted-foreground" />
      </div>

      <h1 className="text-2xl font-display font-bold text-foreground mb-3">Page Not Found</h1>
      <p className="text-muted-foreground mb-8 leading-relaxed">
        This sector is outside PulseGuard's monitored zone. The page you're looking for doesn't exist or has been moved.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white btn-primary btn-shine"
        >
          <Home className="h-4 w-4" />
          Back to Home
        </Link>
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-muted-foreground glass border border-white/10 hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Go Back
        </button>
      </div>
    </motion.div>
  </div>
);

export default NotFound;
