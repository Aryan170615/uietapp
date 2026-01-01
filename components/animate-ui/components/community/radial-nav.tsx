'use client';

import * as React from 'react';
import { MousePointer2, type LucideIcon } from 'lucide-react';
import { motion, type Variants, type Transition } from 'motion/react';

/* ================= TYPES ================= */

type RadialNavProps = {
  size?: number;
  items: RadialNavItem[];
  menuButtonConfig?: MenuButtonConfig;
  defaultActiveId?: number;
  onActiveChange?: (id: number) => void;
};

type RadialNavItem = {
  id: number;
  icon: LucideIcon;
  label: string;
  angle: number;
};

type MenuButtonConfig = {
  iconSize?: number;
  buttonSize?: number;
  buttonPadding?: number;
};

/* ================= CONSTANTS ================= */

const defaultMenuButtonConfig: Required<MenuButtonConfig> = {
  iconSize: 20,
  buttonSize: 40,
  buttonPadding: 8,
};

const POINTER_BASE_DEG = 45;

const POINTER_ROT_SPRING = {
  type: 'spring',
  stiffness: 220,
  damping: 26,
} as const;

const BUTTON_MOTION_CONFIG = {
  initial: 'rest',
  variants: {
    rest: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  },
  transition: { type: 'spring', stiffness: 200, damping: 25 },
} as const;

const LABEL_TRANSITION: Transition = {
  type: 'spring',
  stiffness: 200,
  damping: 25,
};

/* ================= HELPERS ================= */

function getPolarCoordinates(angleDeg: number, r: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: r * Math.cos(rad), y: r * Math.sin(rad) };
}

function calculateIconOffset({
  buttonSize,
  iconSize,
  buttonPadding,
  bias = 0,
}: {
  buttonSize: number;
  iconSize: number;
  buttonPadding: number;
  bias?: number;
}) {
  const centerOffset = (buttonSize - iconSize) / 2;
  return centerOffset - buttonPadding + bias;
}

function withDefaults<T extends Record<string, any>>(
  defaults: T,
  overrides?: Partial<T>,
): T {
  return { ...defaults, ...overrides };
}

function normalizeDeg(a: number) {
  return ((a % 360) + 360) % 360;
}

function toNearestTurn(prev: number | undefined, target: number) {
  const b = normalizeDeg(target);
  if (prev === undefined) return b;
  const k = Math.round((prev - b) / 360);
  return b + 360 * k;
}

function useShortestRotation(target: number) {
  const prevRef = React.useRef<number | undefined>(undefined);
  return React.useMemo(() => {
    const next = toNearestTurn(prevRef.current, target);
    prevRef.current = next;
    return next;
  }, [target]);
}

/* ================= MENU BUTTON ================= */

function MenuButton({
  item,
  angle,
  isActive,
  onActivate,
  menuButtonConfig,
}: {
  item: RadialNavItem;
  angle: number;
  isActive?: boolean;
  onActivate?: () => void;
  menuButtonConfig: Required<MenuButtonConfig>;
}) {
  const { icon: Icon, label } = item;
  const { iconSize, buttonSize, buttonPadding } = menuButtonConfig;

  // 🔑 determines which side of the circle this item is on
  const isLeftSide = angle > 90 && angle < 270;

  const translateX = calculateIconOffset({
    ...menuButtonConfig,
    bias: -1,
  });

  return (
    <motion.button
      {...BUTTON_MOTION_CONFIG}
      initial={false}
      animate={isActive ? 'hover' : 'rest'}
      onClick={onActivate}
      type="button"
      role="menuitem"
      aria-pressed={!!isActive}
      aria-label={label}
      className="relative flex items-center justify-center rounded-full border border-neutral-800 dark:border-neutral-200 bg-background text-foreground"
      style={{
        height: buttonSize,
        width: buttonSize,
        padding: buttonPadding,
      }}
    >
      <Icon
        className="shrink-0"
        style={{
          height: iconSize,
          width: iconSize,
          transform: `translateX(${translateX}px)`,
        }}
      />

      {/* ===== LABEL (AUTO FLIP LEFT / RIGHT) ===== */}
      <motion.span
        variants={{
          rest: { opacity: 0, x: 0 },
          hover: {
            opacity: 1,
            x: isLeftSide ? -6 : 6,
          },
          tap: {
            opacity: 1,
            x: isLeftSide ? -6 : 6,
          },
        }}
        transition={LABEL_TRANSITION}
        className={`absolute whitespace-nowrap rounded-full bg-background/80 backdrop-blur px-2 py-0.5 text-sm
          ${isLeftSide ? 'right-full mr-2' : 'left-full ml-2'}
        `}
      >
        {label}
      </motion.span>
    </motion.button>
  );
}

/* ================= RADIAL NAV ================= */

function RadialNav({
  size = 280,
  items,
  menuButtonConfig,
  defaultActiveId,
  onActiveChange,
}: RadialNavProps) {
  const orbitRadius = size / 2 - 0.5;
  const [activeId, setActiveId] = React.useState<number | null>(
    defaultActiveId ?? null,
  );

  const handleActivate = React.useCallback(
    (id: number) => {
      setActiveId(id);
      onActiveChange?.(id);
    },
    [onActiveChange],
  );

  const baseAngle =
    (items.find((it) => it.id === activeId)?.angle ?? 0) + POINTER_BASE_DEG;

  const rotateAngle = useShortestRotation(baseAngle);

  const resolvedMenuButtonConfig = withDefaults(
    defaultMenuButtonConfig,
    menuButtonConfig,
  );

  return (
    <div
      role="menu"
      aria-label="Radial navigation"
      className="relative flex items-center justify-center rounded-full border border-neutral-800 dark:border-neutral-200 overflow-visible"
      style={{ width: size, height: size }}
    >
      {/* Pointer */}
      <motion.div
        initial={false}
        animate={{ rotate: rotateAngle }}
        transition={POINTER_ROT_SPRING}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        aria-hidden="true"
      >
        <MousePointer2 className="size-5 text-foreground" />
      </motion.div>

      {/* Buttons */}
      {items.map((item) => {
        const { id, angle } = item;
        const { x, y } = getPolarCoordinates(angle, orbitRadius);

        return (
          <div
            key={id}
            className="absolute"
            style={{
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <MenuButton
              item={item}
              angle={angle}
              isActive={activeId === id}
              onActivate={() => handleActivate(id)}
              menuButtonConfig={resolvedMenuButtonConfig}
            />
          </div>
        );
      })}
    </div>
  );
}

export {
  RadialNav,
  type RadialNavItem,
  type MenuButtonConfig,
  type RadialNavProps,
};
