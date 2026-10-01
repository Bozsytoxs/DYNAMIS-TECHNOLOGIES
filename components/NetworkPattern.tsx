export default function NetworkPattern({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 560 360" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className={className}>
      <path d="M40 300L160 200L280 240L400 120L520 170M160 200L200 80L400 120M280 240L340 320L520 290M200 80L90 60M400 120L470 40" />
      {[[40,300],[160,200],[280,240],[400,120],[520,170],[200,80],[340,320],[520,290],[90,60],[470,40]].map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r="7" fill="currentColor" />)}
    </svg>
  );
}
