export function loadFromLocalStorage<T>(
 key: string,
): T | null {
 try {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
 } catch {
  return null;
 }
}

export function saveToLocalStorage<T>(
 key: string,
 state: T,
): void {
 try {
  localStorage.setItem(key, JSON.stringify(state));
 } catch {}
}
