interface Props {
  isLoading?: boolean;
  title: string | number;
  subTitle: string;
  icon?: any;
  iconColor?: string;
}

export const SimpleCard = ({
  title,
  isLoading,
  icon,
  subTitle,
  iconColor,
}: Props) => {
  if (isLoading) {
    return (
      <div className="relative w-full px-4 py-6 bg-gray-200 shadow animate-pulse rounded-xl dark:bg-gray-700">
        <p className="text-2xl text-gray-700 animate-pulse dark:text-white">
          -
        </p>
        <p className="text-sm text-gray-400 animate-pulse">-</p>
      </div>
    );
  }

  return (
    <div className="relative w-full px-4 py-6 bg-white shadow rounded-xl dark:bg-gray-700">
      <p className="text-2xl text-gray-700 dark:text-white">{title}</p>
      <p className="text-sm text-gray-400">{subTitle}</p>
      {icon && (
        <span className={`absolute p-4 rounded-full top-2 right-2`}>
          {icon}
        </span>
      )}
    </div>
  );
};
