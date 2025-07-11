import { useEffect, useState } from "react";

export function useAnimatedNumber(target, duration = 800, steps = 20) {
  const [value, setValue] = useState(target);

  useEffect(() => {
    const diff = target - value;
    if (diff === 0) return;

    const increment = diff / steps;
    const interval = duration / steps;

    let current = value;
    const id = setInterval(() => {
      current += increment;

      if ((diff > 0 && current >= target) || (diff < 0 && current <= target)) {
        setValue(target);
        clearInterval(id);
      } else {
        setValue(Math.round(current));
      }
    }, interval);

    return () => clearInterval(id);
  }, [target]);

  return value;
}
