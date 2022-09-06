import {
  ComponentProps,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Link, LinkProps } from 'react-scroll';

export default function DefaultLink({
  isTop,
  className,
  ref,
  ...props
}: LinkProps & { isTop?: boolean }) {
  const [isSelectedOverride, setOverride] = useState(false);

  const onScroll = useCallback(() => {
    const target = document.getElementById(props.to);
    if (!target) return;

    const top = target.getBoundingClientRect().top + window.scrollY;

    setOverride(isTop ? window.scrollY <= top : false);
  }, [props.to, isTop]);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [onScroll]);

  const classNames =
    className +
    (isSelectedOverride && props.activeClass ? ' ' + props.activeClass : '');

  useEffect(() => {
    onScroll();
  }, [onScroll]);

  return <Link className={classNames} {...props} />;
}
