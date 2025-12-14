export function decounce<T extends (...args: unknown[]) => void>(fn: T, delay: number = 400) {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => fn(...args), delay);
  };
}
