interface CardProps {
  title?: string;
  footer?: React.ReactNode;
  image?: string;
  variant?: 'simple' | 'shadow' | 'bordered';
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export type { CardProps };
