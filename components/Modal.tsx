import React, { forwardRef, ReactNode } from 'react';
import { Portal } from './Portal';

export function Modal({
  open,
  onClose,
  children,
}: {
  open?: boolean;
  onClose?: () => void;
  children?: ReactNode;
}) {
  return (
    <Portal>
      <div
        className="modal-backdrop"
        onClick={(e) => e.currentTarget === e.target && onClose?.()}
        data-open={open ?? false}
      >
        <div className="modal">{children}</div>
      </div>
    </Portal>
  );
}

function getLocation(
  curr: number,
  target?: number | null
): 'outleft' | 'edgeleft' | 'center' | 'edgeright' | 'outright' {
  if (target === null || target === undefined || curr === target) {
    return 'center';
  }

  if (curr === target - 1) {
    return 'edgeleft';
  } else if (curr < target) {
    return 'outleft';
  } else if (curr === target + 1) {
    return 'edgeright';
  } else if (curr > target) {
    return 'outright';
  } else {
    return 'center';
  }
}

export function ModalTicker({
  show,
  onClose,
  onSet,
  children,
}: {
  show?: number | null;
  onClose?: () => void;
  onSet?: (i: number) => void;
  children?: ReactNode[];
}) {
  return (
    <Portal>
      <div
        className="modal-backdrop"
        onClick={(e) => e.currentTarget === e.target && onClose?.()}
        data-open={typeof show === 'number'}
      >
        <div>
          {children?.map((child, i) => (
            <div
              className="modal"
              key={i}
              onClick={() => onSet?.(i)}
              data-location={getLocation(i, show)}
              style={{ cursor: i === show ? 'auto' : 'pointer' }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>
    </Portal>
  );
}
