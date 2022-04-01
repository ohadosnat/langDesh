type SVGProps = React.SVGProps<SVGSVGElement>;

/**
 * Base SVG Component for Icons
 * @param props - SVG Props
 * @returns an SVG Element
 */
const SVGComponent = (props: SVGProps) => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {props.children}
  </svg>
);

// Auth Icons

export const EmailIcon = (props: SVGProps) => (
  <SVGComponent {...props}>
    <path
      d="M16.0004 20.9995C18.7618 20.9995 21.0004 18.7609 21.0004 15.9995C21.0004 13.2381 18.7618 10.9995 16.0004 10.9995C13.2389 10.9995 11.0004 13.2381 11.0004 15.9995C11.0004 18.7609 13.2389 20.9995 16.0004 20.9995Z"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22.6355 25.9995C20.4077 27.4781 17.7499 28.1703 15.0839 27.9663C12.4179 27.7624 9.8963 26.6739 7.91931 24.8737C5.94232 23.0735 4.62313 20.6646 4.17107 18.0293C3.71901 15.394 4.15997 12.6831 5.42398 10.327C6.68799 7.97079 8.70265 6.10422 11.1483 5.02341C13.5939 3.94261 16.3305 3.70948 18.9237 4.36103C21.5169 5.01257 23.8183 6.51147 25.4626 8.61988C27.107 10.7283 28.0001 13.3255 28.0003 15.9993C28.0003 18.7607 27.0003 20.9993 24.5003 20.9993C22.0003 20.9993 21.0003 18.7607 21.0003 15.9993V10.9993"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </SVGComponent>
);

export const PasswordIcon = (props: SVGProps) => (
  <SVGComponent {...props}>
    <path
      d="M11.646 15.3541C10.8751 13.4313 10.7918 11.3013 11.4101 9.32418C12.0284 7.34704 13.3103 5.64401 15.0393 4.50295C16.7683 3.3619 18.8382 2.85281 20.8992 3.06173C22.9602 3.27066 24.8858 4.18479 26.3507 5.6496C27.8155 7.11442 28.7296 9.04007 28.9385 11.1011C29.1474 13.1621 28.6383 15.232 27.4973 16.961C26.3562 18.6899 24.6532 19.9719 22.676 20.5902C20.6989 21.2084 18.5689 21.1251 16.6461 20.3542L16.6462 20.354L15.0002 22H12.0002V25H9.00024V28H4.00024V23L11.6462 15.354L11.646 15.3541Z"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      opacity="0.5"
      d="M22.5 10C22.7761 10 23 9.77614 23 9.5C23 9.22386 22.7761 9 22.5 9C22.2239 9 22 9.22386 22 9.5C22 9.77614 22.2239 10 22.5 10Z"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22.5 11C23.3284 11 24 10.3284 24 9.5C24 8.67157 23.3284 8 22.5 8C21.6716 8 21 8.67157 21 9.5C21 10.3284 21.6716 11 22.5 11Z"
      fill="black"
    />
  </SVGComponent>
);

export const NameIcon = (props: SVGProps) => (
  <SVGComponent {...props}>
    <path
      d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z"
      stroke="black"
      strokeWidth="2"
      strokeMiterlimit="10"
    />
    <path
      d="M16 20C18.7614 20 21 17.7614 21 15C21 12.2386 18.7614 10 16 10C13.2386 10 11 12.2386 11 15C11 17.7614 13.2386 20 16 20Z"
      stroke="black"
      strokeWidth="2"
      strokeMiterlimit="10"
    />
    <path
      d="M7.97485 24.9218C8.72812 23.4408 9.8765 22.1971 11.2929 21.3284C12.7093 20.4598 14.3384 20 16 20C17.6615 20 19.2906 20.4598 20.707 21.3284C22.1234 22.1971 23.2718 23.4407 24.0251 24.9217"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </SVGComponent>
);

// Input
export const SearchIcon = (props: SVGProps) => (
  <SVGComponent {...props}>
    <path
      d="M14.5 25C20.299 25 25 20.299 25 14.5C25 8.70101 20.299 4 14.5 4C8.70101 4 4 8.70101 4 14.5C4 20.299 8.70101 25 14.5 25Z"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21.9242 21.925L27.9993 28.0001"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </SVGComponent>
);

export const ClearIcon = (props: SVGProps) => (
  <SVGComponent {...props}>
    <path
      d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z"
      stroke="black"
      strokeWidth="2"
      strokeMiterlimit="10"
    />
    <path
      d="M20 12L12 20"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20 20L12 12"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </SVGComponent>
);

// Menu

export const ScholarHatIcon = (props: SVGProps) => (
  <SVGComponent {...props}>
    <path
      d="M1 12L16 4L31 12L16 20L1 12Z"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M23.5 30V16L16 12"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M27.5 13.8666V20.6817C27.5004 20.8975 27.4307 21.1075 27.3013 21.2801C26.4592 22.4006 22.9066 26.5 16 26.5C9.09339 26.5 5.54077 22.4006 4.69869 21.2801C4.56932 21.1075 4.49959 20.8975 4.5 20.6817V13.8666"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </SVGComponent>
);

export const ProfileIcon = (props: SVGProps) => (
  <SVGComponent {...props}>
    <path
      d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z"
      strokeWidth="2"
      strokeMiterlimit="10"
    />
    <path
      d="M16 20C18.7614 20 21 17.7614 21 15C21 12.2386 18.7614 10 16 10C13.2386 10 11 12.2386 11 15C11 17.7614 13.2386 20 16 20Z"
      strokeWidth="2"
      strokeMiterlimit="10"
    />
    <path
      d="M7.97485 24.9218C8.72812 23.4408 9.8765 22.1971 11.2929 21.3284C12.7093 20.4598 14.3384 20 16 20C17.6615 20 19.2906 20.4598 20.707 21.3284C22.1234 22.1971 23.2718 23.4407 24.0251 24.9217"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </SVGComponent>
);

// Misc

export const PlusCircleIcon = (props: SVGProps) => (
  <SVGComponent {...props}>
    <path
      d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z"
      strokeWidth="2"
      strokeMiterlimit="10"
    />
    <path
      d="M11 16H21"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 11V21"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </SVGComponent>
);

export const AboutIcon = (props: SVGProps) => (
  <SVGComponent {...props}>
    <path
      d="M16 20C18.7614 20 21 17.7614 21 15C21 12.2386 18.7614 10 16 10C13.2386 10 11 12.2386 11 15C11 17.7614 13.2386 20 16 20Z"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M26 5H6C5.44772 5 5 5.44772 5 6V26C5 26.5523 5.44772 27 6 27H26C26.5523 27 27 26.5523 27 26V6C27 5.44772 26.5523 5 26 5Z"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.22314 27C7.67684 25.0115 8.7923 23.236 10.3869 21.9643C11.9814 20.6926 13.9605 20 16.0001 20C18.0397 20 20.0188 20.6926 21.6134 21.9643C23.2079 23.236 24.3234 25.0115 24.7771 27"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </SVGComponent>
);

export const LangDeshIcon = (props: SVGProps) => (
  <SVGComponent {...props}>
    <path d="M32 8L62 24L32 39L2 24L32 8Z" fill="#B3EA3E" />
    <path
      d="M2 24L32 8L62 24L32 40L2 24Z"
      stroke="#1F422E"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M47 60V32L32 24"
      stroke="#1F422E"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M55 27.7333V41.3635C55.0008 41.7949 54.8614 42.2149 54.6026 42.5602C52.9185 44.8013 45.8132 52.9999 32 52.9999C18.1868 52.9999 11.0815 44.8013 9.39738 42.5602C9.13865 42.2149 8.99918 41.7949 9 41.3635V27.7333"
      stroke="#1F422E"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </SVGComponent>
);

// Sort
export const ArrowUpIcon = (props: SVGProps) => (
  <SVGComponent {...props}>
    <path d="M6 20L16 10L26 20" strokeLinecap="round" strokeLinejoin="round" />
  </SVGComponent>
);
export const ArrowDownIcon = (props: SVGProps) => (
  <SVGComponent {...props}>
    <path d="M26 12L16 22L6 12" strokeLinecap="round" strokeLinejoin="round" />
  </SVGComponent>
);

// Navigation
export const CircleExitIcon = (props: SVGProps) => (
  <SVGComponent {...props}>
    <path
      d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z"
      stroke="black"
      strokeWidth="2"
      strokeMiterlimit="10"
    />
    <path
      d="M12.4645 19.5355L19.5355 12.4645"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.4645 12.4645L19.5355 19.5355"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </SVGComponent>
);

export const ArrowLeftCircleIcon = (props: SVGProps) => (
  <SVGComponent {...props}>
    <path
      d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z"
      strokeWidth="2"
      strokeMiterlimit="10"
    />
    <path
      d="M15.2426 20.2426L11 16L15.2426 11.7574"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11 16H21"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </SVGComponent>
);
