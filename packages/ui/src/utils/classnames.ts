export function cn(...args: (string | undefined)[]) {
  return Array.from(args).filter(Boolean).join(' ');
}
