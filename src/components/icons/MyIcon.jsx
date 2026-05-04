const MyIcon = ({ className }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
    >
      <path
        d="M12 0C8.3181 0 5.33333 2.91015 5.33333 6.5C5.33333 10.0899 8.3181 13 12 13C15.6819 13 18.6667 10.0899 18.6667 6.5C18.6667 2.91015 15.6819 0 12 0Z"
        fill="currentColor"
      />
      <path
        d="M6.66667 15.6C2.98477 15.6 0 18.5101 0 22.1V23.4C0 24.8359 1.19391 26 2.66667 26H21.3333C22.8061 26 24 24.8359 24 23.4V22.1C24 18.5101 21.0152 15.6 17.3333 15.6H6.66667Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default MyIcon;
