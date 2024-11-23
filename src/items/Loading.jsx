const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 to-purple-700">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
        <p className="mt-4 text-lg text-white font-semibold">
          Loading, please wait...
        </p>
      </div>
    </div>
  );
};

export default Loading;
