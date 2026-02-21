import React from 'react';

type Props = React.SVGProps<SVGSVGElement>;

const BrandLogo = ({ className, ...props }: Props) => (
  <svg
    viewBox="0 0 64 64"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
    {...props}
  >
    <defs>
      <radialGradient id="pgGlow" cx="50%" cy="50%" r="60%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.1" />
      </radialGradient>
    </defs>
    {/* Shield */}
    <path
      d="M32 4l18 6v16c0 12.15-7.62 22.37-18 26-10.38-3.63-18-13.85-18-26V10l18-6z"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      opacity="0.95"
    />
    {/* Pulse line */}
    <path
      d="M12 34h10l3-6 4 10 4-8 3 4h16"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinejoin="round"
      strokeLinecap="round"
    />
    {/* Glow */}
    <circle cx="32" cy="32" r="20" fill="url(#pgGlow)" />
  </svg>
);

export default BrandLogo;

