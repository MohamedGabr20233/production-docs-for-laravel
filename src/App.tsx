import { Provider } from "react-redux";
import { store } from "./store";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import Troubleshooting from "./pages/Troubleshooting";
import UsefulCommands from "./pages/UsefulCommands";
import NotFound from "./pages/NotFound";
import { IntegrationLayout } from "./layouts/IntegrationLayout";
import { NotificationsPage } from "./pages/integration/Notifications";

const queryClient = new QueryClient();

const App = () => (
  <Provider store={store}>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter basename={import.meta.env.BASE_URL}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/troubleshooting" element={<Troubleshooting />} />
              <Route path="/commands" element={<UsefulCommands />} />
              {/* Integration routes with nested layout */}
              <Route path="/integration" element={<IntegrationLayout />}>
                <Route index element={null} />
                <Route path="notifications" element={<NotificationsPage />} />
              </Route>
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  </Provider>
);

export default App;
