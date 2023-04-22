export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="flex space-x-2">
        <div className="w-4 h-4 bg-gray-400 rounded-full animate-bounce"></div>
        <div className="w-4 h-4 bg-gray-400 rounded-full animate-bounce200"></div>
        <div className="w-4 h-4 bg-gray-400 rounded-full animate-bounce400"></div>
      </div>
    </div>
  );
};
