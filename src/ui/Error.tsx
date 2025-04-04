import { useNavigate, useRouteError } from "react-router-dom";

// Type guard for unknown data type
function isErrorObject(error: unknown): error is { data?: string; message?: string } {
  return typeof error === "object" && error !== null;
}

function Error() {
  const navigate = useNavigate();
  const error = useRouteError();

  const getErrorMessage = (error: unknown): string => {
    return isErrorObject(error) ? error.data || error.message || "An unexpected error occurred." : "An unexpected error occurred.";
  };

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{getErrorMessage(error)}</p>
      <button onClick={() => navigate(-1)}>&larr; Go back</button>
    </div>
  );
}

export default Error;
