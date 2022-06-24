export function cn() {
    const args = Array.from(arguments);
    return args.filter(Boolean).join(' ');
}