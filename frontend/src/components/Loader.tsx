export default function Loader() {
  return (
    <div className="flex items-center justify-center min-h-[200px]" role="status" aria-label="Loading">
      <div className="flex gap-2">
        <div
          className="w-3.5 h-3.5 bg-primary rounded-full animate-bounce"
          style={{ animationDelay: "0ms" }}
        ></div>
        <div
          className="w-3.5 h-3.5 bg-primary rounded-full animate-bounce"
          style={{ animationDelay: "150ms" }}
        ></div>
        <div
          className="w-3.5 h-3.5 bg-primary rounded-full animate-bounce"
          style={{ animationDelay: "300ms" }}
        ></div>
      </div>
    </div>
  );
}
