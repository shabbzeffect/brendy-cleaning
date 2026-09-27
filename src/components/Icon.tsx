import type { SVGProps } from "react";

export const iconNames = [
  "home",
  "sparkles",
  "key",
  "building",
  "hammer",
  "bed",
  "check",
  "star",
  "phone",
  "mail",
  "pin",
  "clock",
  "shield",
  "leaf",
  "arrow",
  "menu",
  "close",
  "calendar",
  "quote",
] as const;

export type IconName = (typeof iconNames)[number];

type IconProps = Omit<SVGProps<SVGSVGElement>, "name"> & {
  name: IconName;
  size?: number;
};

const paths: Record<IconName, React.ReactNode> = {
  home: (
    <>
      <path d="M3 10.75 12 3.5l9 7.25" />
      <path d="M5.5 9.5V19a1.5 1.5 0 0 0 1.5 1.5h3v-5h4v5h3a1.5 1.5 0 0 0 1.5-1.5V9.5" />
    </>
  ),
  sparkles: (
    <>
      <path d="M12 3.2 13.7 7.6 18.1 9.3 13.7 11 12 15.4 10.3 11 5.9 9.3l4.4-1.7z" />
      <path d="m18.4 14.4.9 2.2 2.2.9-2.2.9-.9 2.2-.9-2.2-2.2-.9 2.2-.9z" />
      <path d="m5.2 14.6.7 1.7 1.7.7-1.7.7-.7 1.7-.7-1.7-1.7-.7 1.7-.7z" />
    </>
  ),
  key: (
    <>
      <circle cx="8" cy="12" r="3.6" />
      <path d="M11.6 12H21" />
      <path d="M17.4 12v3.2" />
      <path d="M20 12v2.2" />
    </>
  ),
  building: (
    <>
      <path d="M4 20.5V5.5A1.5 1.5 0 0 1 5.5 4h7A1.5 1.5 0 0 1 14 5.5v15" />
      <path d="M14 10.5h4.5A1.5 1.5 0 0 1 20 12v8.5" />
      <path d="M2.5 20.5h19" />
      <path d="M7 8h4M7 11.5h4M7 15h4" />
      <path d="M17 14h.01M17 17.5h.01" />
    </>
  ),
  hammer: (
    <>
      <path d="m14.8 3.7 5.5 5.5a1.6 1.6 0 0 1 0 2.3l-1.7 1.7-7.8-7.8 1.7-1.7a1.6 1.6 0 0 1 2.3 0Z" />
      <path d="m10.9 5.5 7.6 7.6" />
      <path d="M12.5 11.6 5.4 18.7a2 2 0 1 0 2.8 2.8l6.9-6.9" />
    </>
  ),
  bed: (
    <>
      <path d="M3 7v11" />
      <path d="M3 12h13.8a3.2 3.2 0 0 1 3.2 3.2V18H3" />
      <path d="M3 18h18" />
      <circle cx="7" cy="9.5" r="2" />
    </>
  ),
  check: <path d="m4.5 12.5 4.6 4.6L19.5 6.7" />,
  star: (
    <path
      fill="currentColor"
      stroke="none"
      d="M12 3.4 14.6 8.8l5.9.85-4.3 4.15 1.02 5.9L12 16.98 6.78 19.7l1.02-5.9-4.3-4.15 5.9-.85z"
    />
  ),
  phone: (
    <path d="M6.6 3.5h-2A1.6 1.6 0 0 0 3 5.2C3 13.6 10.4 21 18.8 21a1.6 1.6 0 0 0 1.7-1.6v-2a1.2 1.2 0 0 0-1-1.2l-3-.5a1.2 1.2 0 0 0-1.2.5l-.8 1a12.2 12.2 0 0 1-5.2-5.2l1-.8a1.2 1.2 0 0 0 .5-1.2l-.5-3a1.2 1.2 0 0 0-1.2-1Z" />
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m3.8 7 7.1 5.1a2 2 0 0 0 2.2 0L20.2 7" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-5.7 7-11a7 7 0 1 0-14 0c0 5.3 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.4V12l3.2 2" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3.2 5 6v6c0 4.3 3 7.5 7 8.8 4-1.3 7-4.5 7-8.8V6z" />
      <path d="m9 11.8 2.2 2.2 4-4.2" />
    </>
  ),
  leaf: (
    <>
      <path d="M20 4c-9 0-14 4.2-14 10.2A5 5 0 0 0 11 19.2c6 0 9-5.2 9-15.2Z" />
      <path d="M4.5 20c2.4-5 5.8-8.6 10.2-10.7" />
    </>
  ),
  arrow: (
    <>
      <path d="M4.5 12h14" />
      <path d="m13 6.5 5.5 5.5-5.5 5.5" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6.2 6.2 17.8 17.8M17.8 6.2 6.2 17.8" />,
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
      <path d="M3.5 10h17M8 3.5v3M16 3.5v3" />
      <path d="M8 14h.01M12 14h.01M16 14h.01M8 17.5h.01M12 17.5h.01" />
    </>
  ),
  quote: (
    <path
      fill="currentColor"
      stroke="none"
      d="M9.6 5.4c-3.4 1.5-5.6 4.4-5.6 8.2 0 3.2 1.7 5.2 4 5.2 1.9 0 3.3-1.4 3.3-3.3 0-1.8-1.2-3.1-2.9-3.1-.3 0-.6 0-.8.1.4-1.9 1.9-3.6 4-4.6zm9.2 0c-3.4 1.5-5.6 4.4-5.6 8.2 0 3.2 1.7 5.2 4 5.2 1.9 0 3.3-1.4 3.3-3.3 0-1.8-1.2-3.1-2.9-3.1-.3 0-.6 0-.8.1.4-1.9 1.9-3.6 4-4.6z"
    />
  ),
};

export default function Icon({ name, size = 24, className, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
      {...rest}
    >
      {paths[name]}
    </svg>
  );
}
