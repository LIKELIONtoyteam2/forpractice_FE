const Button = ({
  type = "button",
  onClick,
  children,
  variant = "primary", // 기본값 primary
  disabled = false,
  className = "",
  active,
}) => {
  // 공통 스타일
  const baseStyles =
    "px-3 py-2 rounded-full font-main transition-all duration-200 active:scale-95 cursor-pointer inline-flex items-center justify-center";

  //  스타일
  const variants = {
    primary: "bg-primary text-white border-none",
    secondary: "bg-white text-primary border border-primary",
    disabled:
      "bg-gray2 text-black border-none cursor-not-allowed pointer-events-none",
  };

  // disabled가 true로 들어오면 강제로 disabled 스타일 적용
  const finalVariant = disabled ? "disabled" : variant;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[finalVariant]} ${
        active
          ? "bg-primary text-white" // 선택됐을 때
          : "bg-dark10 text-dark border-gray3 border" // 선택 안 됐을 때
      } ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
