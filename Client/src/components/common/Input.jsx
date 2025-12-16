const Input = ({ 
  label, 
  type = 'text', 
  error, 
  className = '', 
  ...props 
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-dark-800 text-sm font-medium mb-2">
          {label}
        </label>
      )}
      <input
        type={type}
        className={`w-full px-4 py-3 bg-dark-100 border ${
          error ? 'border-red-500' : 'border-dark-200'
        } rounded-md text-dark-900 placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default Input;
