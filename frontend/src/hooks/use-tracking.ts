import { useCallback } from 'react';
import { TrackOptions } from './use-tracking.types';

export const useTracking = () => {
  const track = useCallback(
    async ({ component, variant, action, metadata }: TrackOptions) => {
      try {
        await fetch('http://localhost:5000/api/components/track', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            component,
            variant,
            action,
            metadata,
          }),
        });
      } catch (error) {
        console.error('❌ Error enviando tracking:', error);
      }
    },
    []
  );

  return { track };
};
