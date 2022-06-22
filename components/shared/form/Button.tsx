interface Props {
  disabled?: boolean;
  label: string;
  type: "button" | "reset" | "submit";
  onClick?: () => void;
}
export const Button = ({ label, onClick, disabled, type }: Props) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={`${
        disabled ? "opacity-40" : ""
      } px-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in bg-indigo-600 rounded-lg shadow-md w-32 hover:bg-indigo-500 focus:ring-indigo-500 focus:ring-offset-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2`}
    >
      {label}
    </button>
  );
};
