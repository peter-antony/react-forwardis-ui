import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ReduxProvider } from "./providers/ReduxProvider";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ErrorBoundary } from "./components/molecules/ErrorBoundary/ErrorBoundary";
import TripExecutionManagement from "./pages/TripExecutionManagement";
import NotFound from "./pages/NotFound";
import { ROUTES } from "./config/app.config";
import Dashboard from "./pages/Dashboard";
import QuickOrderManagement from "./pages/QuickOrderManagement";
import DynamicPanelDemo from "./pages/CreateTripPlan";
import TripPlansSearchHub from "./pages/TripPlansSearchHub";
import CreateQuickOrder from "./pages/createQuickOrder";
import { QueryProvider } from './providers/QueryProvider';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
      retry: (failureCount, error: any) => {
        console.log('🔄 Query retry attempt:', failureCount, error?.message);
        return failureCount < 3;
      },
    },
    mutations: {
      retry: (failureCount, error: any) => {
        console.log('🔄 Mutation retry attempt:', failureCount, error?.message);
        return failureCount < 2;
      },
    },
  },
});

function App() {
  return (
    <QueryProvider>
      <ReduxProvider>
        <BrowserRouter>
          <ThemeProvider>
            <div className="min-h-screen bg-background">
              <Routes>
                <Route path="" element={<QuickOrderManagement />} />
                <Route path={ROUTES.HOME} element={<QuickOrderManagement />} />
                <Route path="/quick-order" element={<QuickOrderManagement />} />
                <Route path="/trip-execution" element={<TripExecutionManagement />} />
                <Route path="/trip-plans-search-hub" element={<TripPlansSearchHub />} />
                <Route path="/create-new-trip" element={<DynamicPanelDemo />} />
                <Route path="/create-quick-order" element={<CreateQuickOrder />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </ThemeProvider>
        </BrowserRouter>
      </ReduxProvider>
    </QueryProvider>
  );
}

export default App;
