import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './app/contexts/theme/ThemeProvider';
import { Router } from './Router';
import { Toaster } from './components/ui/Sonner';
import { AuthProvider } from './app/contexts/Auth/AuthProvider';

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
      <AuthProvider>
        <ThemeProvider>
          <Router />

          <Toaster />
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
