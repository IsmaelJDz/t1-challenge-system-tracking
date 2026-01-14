interface CardProps {
  title?: string;
  footer?: React.ReactNode;
  image?: string;
  variant?: 'simple' | 'shadow' | 'bordered' | 'elevated' | 'outline';
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export type { CardProps };
