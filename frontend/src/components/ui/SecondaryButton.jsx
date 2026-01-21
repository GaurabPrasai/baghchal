const SecondaryButton = ({ onClick, children, loading, className = "" }) => (
  <button
    onClick={onClick}
    className={`w-full bg-transparent text-text-light border-2 border-border-muted rounded-lg py-4 px-4 text-lg font-semibold hover:bg-bg-surface hover:border-border-light transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-3 ${className}`}
  >
    {loading ? (
      <>
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
        <span>Please wait...</span>
      </>
    ) : (
      children
    )}{" "}
  </button>
);

export default SecondaryButton;
