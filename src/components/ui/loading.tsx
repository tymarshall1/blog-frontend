import loadingSpinner from "../../assets/loadingSpinner.gif";
function Loading() {
  return (
    <div className="flex items-center justify-center">
      <img src={loadingSpinner} alt="loading" />
    </div>
  );
}

export default Loading;
