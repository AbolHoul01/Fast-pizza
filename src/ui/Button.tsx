import { Link } from "react-router-dom";

interface ButtonProps {
  children: string | number;
  disabled: boolean;
  to: string;
  type: string;
}

function Button({ children, disabled, to, type }: ButtonProps) {
  const bace =
    "bg-yellow-400 uppercase font-semibold text-stone-800 inline-block tracking-wide rounded-full hover:bg-yellow-300 transition-colors duration-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:bg-yellow-300 focus:ring-offset-2 active:bg-yellow-500 disabled:cursor-not-allowed";

  const styles = {
    primary: bace + " py-3 px-4 md:px-6 md:py-4",
    small: bace + " py-2 px-4 text-xs md:px-5 md:py-2.5",
  };

  if (to)
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );

  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}

export default Button;
