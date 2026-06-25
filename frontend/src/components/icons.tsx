// Hand-built, minimal line icons (stroke-based, 24x24, currentColor) used in
// place of emoji throughout the app. Pass a className for sizing/color, e.g.
// <SearchIcon className="w-5 h-5 text-primary" />.

type IconProps = { className?: string };

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function Logo({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <rect x="7.5" y="6.5" width="2.5" height="2.5" />
      <rect x="14" y="6.5" width="2.5" height="2.5" />
      <rect x="7.5" y="11" width="2.5" height="2.5" />
      <rect x="14" y="11" width="2.5" height="2.5" />
      <rect x="10" y="15.5" width="4" height="5.5" />
    </svg>
  );
}

export function LocationPinIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <path d="M12 21c-4-4.5-7-8.5-7-12a7 7 0 1 1 14 0c0 3.5-3 7.5-7 12z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}

export function HomeIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <path d="M4 11.5 12 4l8 7.5" />
      <path d="M5 10v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-9" />
      <path d="M9.5 20v-5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v5" />
    </svg>
  );
}

export function DollarIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.3 15.2c.4 1 1.6 1.6 2.8 1.6 1.7 0 3-.8 3-2.1 0-2.8-5.8-1.4-5.8-4.1 0-1.3 1.3-2.1 3-2.1 1.1 0 2.2.5 2.7 1.5" />
      <line x1="12" y1="6.3" x2="12" y2="7.6" />
      <line x1="12" y1="16.4" x2="12" y2="17.7" />
    </svg>
  );
}

export function SearchIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

export function PlusIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

export function SettingsIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <line x1="4" y1="6" x2="20" y2="6" />
      <circle cx="9" cy="6" r="2" fill="currentColor" stroke="none" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <circle cx="15" cy="12" r="2" fill="currentColor" stroke="none" />
      <line x1="4" y1="18" x2="20" y2="18" />
      <circle cx="7" cy="18" r="2" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function LogOutIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}

export function CheckCircleIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <circle cx="12" cy="12" r="9" />
      <path d="M8.3 12.5l2.5 2.5 5-5.2" />
    </svg>
  );
}

export function AlertCircleIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <circle cx="12" cy="12" r="9" />
      <line x1="12" y1="7.5" x2="12" y2="13" />
      <line x1="12" y1="16.3" x2="12" y2="16.4" strokeWidth={2.5} />
    </svg>
  );
}

export function XIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export function PhoneIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <path d="M21 16.9v2.6a1.6 1.6 0 0 1-1.75 1.6 15.8 15.8 0 0 1-6.9-2.46 15.6 15.6 0 0 1-4.8-4.8A15.8 15.8 0 0 1 5.1 6.75 1.6 1.6 0 0 1 6.7 5h2.6a1.6 1.6 0 0 1 1.6 1.38c.1.77.29 1.52.56 2.24a1.6 1.6 0 0 1-.36 1.69l-1.1 1.1a12.6 12.6 0 0 0 4.8 4.8l1.1-1.1a1.6 1.6 0 0 1 1.69-.36c.72.27 1.47.46 2.24.56A1.6 1.6 0 0 1 21 16.9z" />
    </svg>
  );
}

export function UploadIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <path d="M12 15.5V4" />
      <path d="M7.5 8.5 12 4l4.5 4.5" />
      <path d="M5 20h14" />
    </svg>
  );
}

export function ImageIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" stroke="none" />
      <path d="M21 15.5 16.5 11 6 21" />
    </svg>
  );
}

export function EditIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" />
    </svg>
  );
}

export function TrashIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <line x1="10" y1="11" x2="10" y2="17" />
      <line x1="14" y1="11" x2="14" y2="17" />
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  );
}

export function LinkIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <path d="M10 13a4.5 4.5 0 0 0 6.4.4l2-2a4.5 4.5 0 0 0-6.36-6.37l-1.15 1.14" />
      <path d="M14 11a4.5 4.5 0 0 0-6.4-.4l-2 2a4.5 4.5 0 0 0 6.36 6.37l1.14-1.14" />
    </svg>
  );
}
