export default function Logo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0" y="5" width="30" height="30" rx="5" fill="#EAB308" />
      <path
        d="M15 12L10 25H13L15 20L17 25H20L15 12Z"
        fill="#000000"
      />
      <text x="40" y="28" fontFamily="Arial Black" fontSize="24" fontWeight="900" fill="#EAB308">
        XAU
      </text>
    </svg>
  );
}
