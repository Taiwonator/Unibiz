import { ReactNode } from 'react';

type TagTypes = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'div';

interface TypeProps {
  children: ReactNode;
  size?: string;
  Tag?: TagTypes;
}

// Tag -> classNames

const Type: React.FC<TypeProps> = ({ children, Tag = 'div' }) => {
  return <Tag>{children}</Tag>;
};

export default Type;
