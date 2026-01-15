import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import PublicRoute from "./components/ProtectedRoute/PublicRoute";
import { Toaster } from "./components/ui/sonner";
import CalculatorPage from "./pages/CalculatorPage/CalculatorPage";
import DailySettlementPage from './pages/DailySettlementPage/DailySettlementPage';
import ExternalMaterialsPage from "./pages/ExternalMaterialsPage/ExternalMaterialsPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import LoyaltyPage from "./pages/LoyaltyPage/LoyaltyPage";
import OrdersPage from "./pages/OrdersPage/OrdersPage";
import ProductsPage from "./pages/ProductsPage/ProductsPage";
import MaterialsPage from "./pages/RawMaterialsPage/MaterialsPage";
import ReportsPage from "./pages/ReportsPage/ReportsPage";
import ReturnsPage from "./pages/ReturnsPage/ReturnsPage";
import SettingsPage from "./pages/SettingsPage/SettingsPage";
import SingleOrderPage from "./pages/SingleOrderPage/SingleOrderPage";
import SingleProductPage from "./pages/singleProductPage/SingleProductPage";
import AttendencePage from './pages/AttendencePage/AttendencePage';


const queryClient = new QueryClient()

function App() {
  const router = createBrowserRouter([
    {
      path: '/login',
      element: <PublicRoute><LoginPage /></PublicRoute>
    },
    {
      path: '/',
      element: <ProtectedRoute><Layout /></ProtectedRoute>,
      children: [
        {
          index: true,
          element: <ProtectedRoute><ProductsPage /></ProtectedRoute>
        },
        {
          path: '/products/:id',
          element: <ProtectedRoute><SingleProductPage /></ProtectedRoute>
        },
        {
          path: '/orders',
          element: <ProtectedRoute><OrdersPage /></ProtectedRoute>
        },
        {
          path: '/orders/:id',
          element: <ProtectedRoute><SingleOrderPage /></ProtectedRoute>
        },
        {
          path: '/calculator',
          element: <ProtectedRoute><CalculatorPage /></ProtectedRoute>
        },
        {
          path: '/reports',
          element: <ProtectedRoute><ReportsPage /></ProtectedRoute>
        },
        {
          path: '/daily-settlement',
          element: <ProtectedRoute><DailySettlementPage /></ProtectedRoute>
        },
        {
          path: '/attendence',
          element: <ProtectedRoute><AttendencePage /></ProtectedRoute>
        },
        {
          path: '/returns',
          element: <ProtectedRoute><ReturnsPage /></ProtectedRoute>
        },
        {
          path: '/loyalty',
          element: <ProtectedRoute><LoyaltyPage /></ProtectedRoute>
        },
        {
          path: '/raw-materials',
          element: <ProtectedRoute><MaterialsPage /></ProtectedRoute>
        },
        {
          path: '/external-materials',
          element: <ProtectedRoute><ExternalMaterialsPage /></ProtectedRoute>
        },
        {
          path: '/settings',
          element: <ProtectedRoute><SettingsPage /></ProtectedRoute>
        }
      ]

    },
  ]);


  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-center" richColors />
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App

