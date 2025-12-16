const Card = ({ children, className = '', ...props }) => {
  return (
    <div
      className={`bg-dark-100 border border-dark-200 rounded-lg p-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
