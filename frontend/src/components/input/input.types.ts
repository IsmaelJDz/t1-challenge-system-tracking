interface InputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type'
> {
  label?: string;
  error?: string;
  success?: boolean;
  warning?: boolean;
  helperText?: string;
  size?: 'sm' | 'md' | 'lg';
  type?: 'text' | 'password' | 'email';
}

export type { InputProps };
