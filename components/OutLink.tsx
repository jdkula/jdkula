import { AnchorHTMLAttributes, DetailedHTMLProps } from 'react';

export function OutLink({
  children,
  ...props
}: DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>): JSX.Element {
  if (props.href?.startsWith('#')) {
    return <a {...props}>{children}</a>;
  }
  return (
    <a target="_blank" rel="noreferrer" {...props}>
      {children} <i className="icon solid fa-external-link" />
    </a>
  );
}
