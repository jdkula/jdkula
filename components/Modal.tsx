import { useGesture } from '@use-gesture/react';
import React, { forwardRef, ReactNode, useCallback } from 'react';
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

function ModalTickerElement({
  children,
  location,
  onClick,
  onSwipe,
  selected,
}: {
  children: ReactNode;
  location: string;
  onClick: () => void;
  onSwipe: (direction: number) => void;
  selected?: boolean;
}) {
  const bind = useGesture(
    {
      onDrag: (state) => {
        const [swipeX] = state.swipe;
        if (swipeX !== 0) {
          onSwipe(swipeX);
        }
      },
      onWheel: (state) => {
        const [dx] = state.direction;
        if (dx > 0) {
          onSwipe(-1);
        } else if (dx < 0) {
          onSwipe(1);
        }
      },
    },
    {
      enabled: selected,
      wheel: {
        axis: 'x',
        threshold: 500,
      },
    }
  );

  return (
    <div
      className="modal"
      onClick={onClick}
      data-location={location}
      style={{
        cursor: selected ? 'auto' : 'pointer',
        touchAction: selected ? 'none' : 'auto',
      }}
      {...bind()}
    >
      {children}
    </div>
  );
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
            <ModalTickerElement
              key={i}
              onClick={() => onSet?.(i)}
              onSwipe={(direction) =>
                i - direction >= 0 &&
                i - direction < children.length &&
                onSet?.(i - direction)
              }
              location={getLocation(i, show)}
              selected={i === show}
            >
              {child}
            </ModalTickerElement>
          ))}
        </div>
      </div>
    </Portal>
  );
}
