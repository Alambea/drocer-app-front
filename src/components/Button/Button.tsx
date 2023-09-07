interface ButtonProps {
  className?: string;
  actionOnClick: () => void;
  children: React.ReactElement | string;
}

const Button = ({
  className,
  actionOnClick,
  children,
}: ButtonProps): React.ReactElement => {
  return (
    <button className={`button ${className}`} onClick={actionOnClick}>
      {children}
    </button>
  );
};

export default Button;
