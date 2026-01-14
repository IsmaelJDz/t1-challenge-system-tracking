import { useQuery, useMutation } from '@tanstack/react-query';

const API_BASE_URL = 'http://localhost:5000';

interface ComponentStats {
  _id: string;
  count: number;
}

export const useStats = () => {
  return useQuery({
    queryKey: ['stats'],
    queryFn: async (): Promise<ComponentStats[]> => {
      const res = await fetch(`${API_BASE_URL}/api/components/stats`);
      if (!res.ok) {
        throw new Error('Error fetching stats');
      }
      return res.json();
    },
    refetchInterval: 60000,
    refetchIntervalInBackground: true,
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
