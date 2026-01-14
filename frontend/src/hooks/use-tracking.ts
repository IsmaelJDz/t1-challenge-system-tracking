import { useMutation } from '@tanstack/react-query';
import { TrackOptions } from './use-tracking.types';

const API_BASE_URL = 'http://localhost:5000';

export const useTracking = () => {
  const { mutate } = useMutation({
    mutationFn: async (data: TrackOptions) => {
      const res = await fetch(`${API_BASE_URL}/api/components/track`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error('Error tracking event');
      }

      return res.json();
    },
    onError: error => {
      console.error('❌ Error enviando tracking:', error);
    },
  });

  const track = (options: TrackOptions) => {
    mutate(options);
  };

  return { track };
};
