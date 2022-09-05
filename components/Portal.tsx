import {
  DetailedHTMLProps,
  HTMLProps,
  useEffect,
  useRef,
  useState,
} from 'react';
import ReactDOM from 'react-dom';

export function Portal({
  children,
  style,
}: Pick<
  DetailedHTMLProps<HTMLProps<HTMLDivElement>, HTMLDivElement>,
  'children' | 'style'
>) {
  const [portal, setPortal] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    const portal = document.createElement('div');
    Object.assign(portal.style, style);

    setPortal(portal);

    document.body.appendChild(portal);
    return () => {
      document.body.removeChild(portal);
    };
  }, [style]);

  if (portal == null) {
    return null;
  }

  return ReactDOM.createPortal(children, portal);
}
