import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  actionOnClick: () => void;
  children: React.ReactElement | string;
}

const Button = ({
  className,
  actionOnClick,
  children,
  disabled,
}: ButtonProps): React.ReactElement => {
  return (
    <button
      className={`button ${className}`}
      disabled={disabled}
      onClick={actionOnClick}
    >
      {children}
    </button>
  );
};

export default Button;
