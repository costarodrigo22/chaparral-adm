import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './app/contexts/theme/ThemeProvider';
import { Router } from './Router';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
