export function getRandomColor() {
 const colors = [
  '#FF6B6B',
  '#6BCB77',
  '#4D96FF',
  '#FFD93D',
  '#845EC2',
 ];
 return colors[Math.floor(Math.random() * colors.length)];
}
