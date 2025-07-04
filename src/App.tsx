
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ReduxProvider } from "./providers/ReduxProvider";
import { ErrorBoundary } from "./components/ui/error-boundary";
import { ThemeProvider } from "./components/ui/theme-provider";
import { BaseLayout } from "./layouts/BaseLayout";
import { ROUTES } from "./config/app.config";
import NotFound from "./pages/NotFound";

// Lazy load pages for better performance
import { lazy, Suspense } from "react";

const QuickOrderManagement = lazy(() => import("./pages/QuickOrderManagement"));
const TripExecutionManagement = lazy(() => import("./pages/TripExecutionManagement"));
const TripPlansSearchHub = lazy(() => import("./pages/TripPlansSearchHub"));
const DynamicPanelDemo = lazy(() => import("./pages/CreateTripPlan"));
const CreateQuickOrder = lazy(() => import("./pages/createQuickOrder"));

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

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
  </div>
);

const App = () => {
  console.log('🚀 App component initialized');

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <ReduxProvider>
          <QueryClientProvider client={queryClient}>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<BaseLayout />}>
                    <Route index element={
                      <Suspense fallback={<LoadingSpinner />}>
                        <QuickOrderManagement />
                      </Suspense>
                    } />
                    <Route path={ROUTES.HOME} element={
                      <Suspense fallback={<LoadingSpinner />}>
                        <QuickOrderManagement />
                      </Suspense>
                    } />
                    <Route path="/quick-order" element={
                      <Suspense fallback={<LoadingSpinner />}>
                        <QuickOrderManagement />
                      </Suspense>
                    } />
                    <Route path="/trip-execution" element={
                      <Suspense fallback={<LoadingSpinner />}>
                        <TripExecutionManagement />
                      </Suspense>
                    } />
                    <Route path="/trip-plans-search-hub" element={
                      <Suspense fallback={<LoadingSpinner />}>
                        <TripPlansSearchHub />
                      </Suspense>
                    } />
                    <Route path="/create-new-trip" element={
                      <Suspense fallback={<LoadingSpinner />}>
                        <DynamicPanelDemo />
                      </Suspense>
                    } />
                    <Route path="/create-quick-order" element={
                      <Suspense fallback={<LoadingSpinner />}>
                        <CreateQuickOrder />
                      </Suspense>
                    } />
                  </Route>
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </QueryClientProvider>
        </ReduxProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
