import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

interface ComponentStats {
  _id: string;
  count: number;
}

let socket: Socket | null = null;

const getSocket = () => {
  if (!socket) {
    socket = io(API_BASE_URL, {
      transports: ['websocket', 'polling'],
    });
  }
  return socket;
};

export const useStats = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const socket = getSocket();

    const handleStatsUpdate = (stats: ComponentStats[]) => {
      queryClient.setQueryData(['stats'], stats);
    };

    socket.on('stats-updated', handleStatsUpdate);

    return () => {
      socket.off('stats-updated', handleStatsUpdate);
    };
  }, [queryClient]);

  return useQuery({
    queryKey: ['stats'],
    queryFn: async (): Promise<ComponentStats[]> => {
      const res = await fetch(`${API_BASE_URL}/api/components/stats`);
      if (!res.ok) {
        throw new Error('Error fetching stats');
      }
      return res.json();
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
};

export const useExport = () => {
  return useMutation({
    mutationFn: async (): Promise<Blob> => {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE_URL}/api/components/export`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error('Error exporting data');
      }

      return res.blob();
    },
    onSuccess: blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `component-interactions-${new Date().toISOString()}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    },
  });
};
