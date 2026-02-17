const Toast = ({ message, type }) => {
  if (!message) return null;

  const styles = {
    success: "bg-green-100 text-green-800 border border-green-200",
    error: "bg-red-100 text-red-800 border border-red-200",
    info: "bg-blue-100 text-blue-800 border border-blue-200",
  };

  return (
    <div className="fixed top-5 right-5 z-50">
      <div
        className={`px-5 py-3 rounded-xl shadow-lg text-sm font-medium ${styles[type]}`}
      >
        {message}
      </div>
    </div>
  );
};

export default Toast;