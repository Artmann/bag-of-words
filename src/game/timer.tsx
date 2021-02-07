import { ReactElement, useEffect, useState } from 'react';

interface TimerProps {
  startedAt: number;
}

export default function Timer({ startedAt }: TimerProps): ReactElement {
  const [ elapsedTime, setElapsedTime ] = useState(0);

  useEffect(() => {
    const handle = setInterval(() => {
      const elapsed = Math.round((Date.now() - startedAt) / 100.0) / 10.0;

      setElapsedTime(elapsed);
    }, 40);

    return () => clearInterval(handle);
  }, [ startedAt ]);

  return(
    <div>
      { elapsedTime === Math.round(elapsedTime) ? `${ elapsedTime }.0` : elapsedTime }
    </div>
  );
}
