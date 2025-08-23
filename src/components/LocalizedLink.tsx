import { Link, LinkProps } from 'react-router-dom';
import { i18n } from '@/lib/i18n';

interface LocalizedLinkProps extends Omit<LinkProps, 'to'> {
  to: string;
  children: React.ReactNode;
}

export const LocalizedLink = ({ to, children, ...props }: LocalizedLinkProps) => {
  const localizedPath = i18n.getLocalizedPath(to);
  
  return (
    <Link to={localizedPath} {...props}>
      {children}
    </Link>
  );
};