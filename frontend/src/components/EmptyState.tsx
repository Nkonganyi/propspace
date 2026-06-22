type EmptyStateProps = {
  icon: string;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
};

export default function EmptyState({ icon, title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="relative text-center py-20 px-6 surface-card mx-auto max-w-2xl overflow-hidden">
      <div className="blob absolute -top-10 left-1/2 -translate-x-1/2 w-48 h-48 bg-primary-100"></div>
      <div className="relative z-10">
        <div className="w-20 h-20 mx-auto rounded-2xl bg-primary-50 flex items-center justify-center text-4xl mb-6">
          {icon}
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-3">{title}</h3>
        <p className="text-slate-500 max-w-md mx-auto">{description}</p>
        {actionLabel && onAction && (
          <button onClick={onAction} className="btn btn-primary mt-8">
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
}
