const variants = {
  primary: 'bg-primary-500 text-white hover:bg-primary-600 shadow-soft',
  secondary: 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 shadow-soft',
  ghost: 'text-slate-600 hover:bg-slate-100',
  danger: 'bg-rose-50 text-rose-700 hover:bg-rose-100',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm gap-1.5 min-h-[36px]',
  md: 'px-4 py-2 text-sm gap-2 min-h-[40px]',
  lg: 'px-5 py-2.5 text-base gap-2 min-h-[44px]',
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled,
  ...props
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={`inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
