// Lightweight stroke icon set (Lucide-style geometry, no external dependency).
// Every icon takes the same props so they can be swapped freely.

function Icon({ size = 20, children, ...rest }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  );
}

export const IconGraduationCap = (props) => (
  <Icon {...props}>
    <path d="M22 9 12 4 2 9l10 5 10-5Z" />
    <path d="M6 11.5V16c0 1.4 2.7 3 6 3s6-1.6 6-3v-4.5" />
    <path d="M22 9v5" />
  </Icon>
);

export const IconBook = (props) => (
  <Icon {...props}>
    <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H6.5A2.5 2.5 0 0 1 4 17.5v-13Z" />
    <path d="M4 17.5A2.5 2.5 0 0 1 6.5 15H20" />
  </Icon>
);

export const IconCode = (props) => (
  <Icon {...props}>
    <path d="m9 18-6-6 6-6" />
    <path d="m15 6 6 6-6 6" />
  </Icon>
);

export const IconBraces = (props) => (
  <Icon {...props}>
    <path d="M8 3H7a2 2 0 0 0-2 2v4l-2 3 2 3v4a2 2 0 0 0 2 2h1" />
    <path d="M16 3h1a2 2 0 0 1 2 2v4l2 3-2 3v4a2 2 0 0 1-2 2h-1" />
  </Icon>
);

export const IconAtom = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="1.6" />
    <ellipse cx="12" cy="12" rx="9.5" ry="4" />
    <ellipse cx="12" cy="12" rx="9.5" ry="4" transform="rotate(60 12 12)" />
    <ellipse cx="12" cy="12" rx="9.5" ry="4" transform="rotate(120 12 12)" />
  </Icon>
);

export const IconPalette = (props) => (
  <Icon {...props}>
    <path d="M12 21a9 9 0 1 1 9-9c0 2.2-1.8 3-3.4 3H16a2 2 0 0 0-1.4 3.4A2 2 0 0 1 12 21Z" />
    <circle cx="8" cy="10" r="1" />
    <circle cx="12" cy="7.5" r="1" />
    <circle cx="15.8" cy="10" r="1" />
  </Icon>
);

export const IconDatabase = (props) => (
  <Icon {...props}>
    <ellipse cx="12" cy="5.5" rx="7.5" ry="3" />
    <path d="M4.5 5.5v13c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3v-13" />
    <path d="M4.5 12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3" />
  </Icon>
);

export const IconServer = (props) => (
  <Icon {...props}>
    <rect x="3" y="3.5" width="18" height="7" rx="2" />
    <rect x="3" y="13.5" width="18" height="7" rx="2" />
    <path d="M7 7h.01M7 17h.01" />
  </Icon>
);

export const IconTerminal = (props) => (
  <Icon {...props}>
    <rect x="2.5" y="4" width="19" height="16" rx="2.5" />
    <path d="m7 9.5 2.5 2.5L7 14.5" />
    <path d="M12.5 15h4.5" />
  </Icon>
);

export const IconBrain = (props) => (
  <Icon {...props}>
    <path d="M12 5.5A3.5 3.5 0 0 0 5.2 6.7 3 3 0 0 0 4 12a3.4 3.4 0 0 0 1.4 5A3.5 3.5 0 0 0 12 18.5Z" />
    <path d="M12 5.5A3.5 3.5 0 0 1 18.8 6.7 3 3 0 0 1 20 12a3.4 3.4 0 0 1-1.4 5A3.5 3.5 0 0 1 12 18.5Z" />
  </Icon>
);

export const IconChart = (props) => (
  <Icon {...props}>
    <path d="M4 20V4" />
    <path d="M4 20h16" />
    <rect x="7.5" y="12" width="3" height="5" rx="1" />
    <rect x="13" y="8" width="3" height="9" rx="1" />
  </Icon>
);

export const IconSmartphone = (props) => (
  <Icon {...props}>
    <rect x="6" y="2.5" width="12" height="19" rx="3" />
    <path d="M10.5 18.5h3" />
  </Icon>
);

export const IconShield = (props) => (
  <Icon {...props}>
    <path d="M12 21c4.5-1.9 7-5.4 7-9.5V5.5L12 3 5 5.5v6c0 4.1 2.5 7.6 7 9.5Z" />
    <path d="m9.2 11.8 2 2 3.6-3.6" />
  </Icon>
);

export const IconCloud = (props) => (
  <Icon {...props}>
    <path d="M7.5 18h9.5a3.5 3.5 0 0 0 .4-7A5.5 5.5 0 0 0 6.6 9.8 4.1 4.1 0 0 0 7.5 18Z" />
  </Icon>
);

export const IconLayers = (props) => (
  <Icon {...props}>
    <path d="m12 3 9 5-9 5-9-5 9-5Z" />
    <path d="m3 13 9 5 9-5" />
    <path d="m3 17 9 5 9-5" />
  </Icon>
);

export const IconPlus = (props) => (
  <Icon {...props}>
    <path d="M12 5v14M5 12h14" />
  </Icon>
);

export const IconEdit = (props) => (
  <Icon {...props}>
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z" />
  </Icon>
);

export const IconTrash = (props) => (
  <Icon {...props}>
    <path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14" />
    <path d="M10 11v5M14 11v5" />
  </Icon>
);

export const IconEye = (props) => (
  <Icon {...props}>
    <path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12Z" />
    <circle cx="12" cy="12" r="3" />
  </Icon>
);

export const IconEyeOff = (props) => (
  <Icon {...props}>
    <path d="M3 3l18 18" />
    <path d="M10.6 6.1A9.8 9.8 0 0 1 12 6c6 0 10 6 10 6a17 17 0 0 1-3.3 3.9" />
    <path d="M6.6 6.7A16.6 16.6 0 0 0 2 12s4 6 10 6a9.7 9.7 0 0 0 4.2-.9" />
    <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
  </Icon>
);

export const IconInbox = (props) => (
  <Icon {...props}>
    <path d="M3 13h4l2 3h6l2-3h4" />
    <path d="M5.5 5h13l3 8v5a1 1 0 0 1-1 1h-17a1 1 0 0 1-1-1v-5l3-8Z" />
  </Icon>
);

export const IconChalkboard = (props) => (
  <Icon {...props}>
    <rect x="2" y="4" width="20" height="12" rx="1.5" />
    <path d="M7 20h10M12 16v4" />
    <path d="M6 8h7" />
  </Icon>
);

export const IconAlertCircle = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7.5v5M12 16h.01" />
  </Icon>
);

export const IconCheck = (props) => (
  <Icon {...props}>
    <path d="m4 12.5 5 5L20 6.5" />
  </Icon>
);

export const IconCheckCircle = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="m8 12.2 2.6 2.6L16 9.4" />
  </Icon>
);

export const IconChevronDown = (props) => (
  <Icon {...props}>
    <path d="m6 9 6 6 6-6" />
  </Icon>
);

export const IconArrowRight = (props) => (
  <Icon {...props}>
    <path d="M4 12h15M13 6l6 6-6 6" />
  </Icon>
);

export const IconClock = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5.3l3.3 2" />
  </Icon>
);

export const IconSearch = (props) => (
  <Icon {...props}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m20 20-4.3-4.3" />
  </Icon>
);

export const IconMenu = (props) => (
  <Icon {...props}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Icon>
);

export const IconX = (props) => (
  <Icon {...props}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Icon>
);

export const IconUser = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="8" r="3.5" />
    <path d="M4.5 20a7.5 7.5 0 0 1 15 0" />
  </Icon>
);

export const IconUsers = (props) => (
  <Icon {...props}>
    <circle cx="9" cy="8" r="3.2" />
    <path d="M2.5 19.5a6.5 6.5 0 0 1 13 0" />
    <path d="M16 5.3a3.2 3.2 0 0 1 0 5.4M17.5 14.2a6.5 6.5 0 0 1 4 5.3" />
  </Icon>
);

export const IconTarget = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="8.5" />
    <circle cx="12" cy="12" r="4.5" />
    <circle cx="12" cy="12" r="1" />
  </Icon>
);

export const IconGlobe = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18" />
    <path d="M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18Z" />
  </Icon>
);

export const IconTrendingUp = (props) => (
  <Icon {...props}>
    <path d="m3 16 5.5-5.5 3.5 3.5L21 5" />
    <path d="M15 5h6v6" />
  </Icon>
);

export const IconSparkle = (props) => (
  <Icon {...props}>
    <path d="M12 3.5 13.9 9l5.6 2-5.6 2-1.9 5.5L10.1 13 4.5 11l5.6-2L12 3.5Z" />
    <path d="M18.5 3.5v3M20 5h-3" />
  </Icon>
);
