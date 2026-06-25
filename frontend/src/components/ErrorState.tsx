import { AlertCircleIcon } from "./icons";

type ErrorStateProps = {
  message?: string;
  onRetry?: () => void;
};

export default function ErrorState({
  message = "Something went wrong while loading this data. Please check your connection and try again.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="relative text-center py-20 px-6 surface-card mx-auto max-w-2xl overflow-hidden">
      <div className="relative z-10">
        <div className="w-20 h-20 mx-auto rounded-2xl bg-error-50 text-error-600 flex items-center justify-center mb-6">
          <AlertCircleIcon className="w-9 h-9" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-3">Couldn't load this</h3>
        <p className="text-slate-500 max-w-md mx-auto">{message}</p>
        {onRetry && (
          <button onClick={onRetry} className="btn btn-primary mt-8">
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}
