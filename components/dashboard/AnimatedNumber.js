import { useEffect, useState } from "react";

function mapValue(value, start1, stop1, start2, stop2) {
  let outgoing = start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
  return outgoing;
}

export default function AnimatedNumber({ value }) {
  const [current, setCurrent] = useState(value);

  // TODO:

  useEffect(() => {
    setCurrent(value);
  }, [value]);

  return <>{current}</>;
}
