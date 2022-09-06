import { AnchorHTMLAttributes, DetailedHTMLProps } from 'react';
import { Link } from 'react-scroll';

export function OutLink({
  children,
  ...props
}: Pick<
  DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>,
  'href' | 'children'
>): JSX.Element {
  if (props.href?.startsWith('#')) {
    return (
      <Link to={props.href.substring(1)} smooth duration={500} {...props}>
        {children}
      </Link>
    );
  }
  return (
    <a target="_blank" rel="noreferrer" {...props}>
      {children} <i className="icon solid fa-external-link" />
    </a>
  );
}
