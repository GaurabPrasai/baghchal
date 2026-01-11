const PrimaryButton = ({ onClick, children, loading, className = "" }) => (
  <button
    onClick={onClick}
    className={`w-full bg-[#f95e5e] text-white rounded-lg py-4 px-4 text-lg font-extrabold hover:bg-[#f96666] hover:shadow-lg hover:shadow-[#f95e5e]/30 flex items-center justify-center gap-3 ${className}`}
  >
    {loading ? (
      <>
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
        <span>Please wait...</span>
      </>
    ) : (
      children
    )}
  </button>
);

export default PrimaryButton;
