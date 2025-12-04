import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import ProductsPage from "./pages/ProductsPage/ProductsPage";
import SingleProductPage from "./pages/singleProductPage/SingleProductPage";
import OrdersPage from "./pages/OrdersPage/OrdersPage";
import CalculatorPage from "./pages/CalculatorPage/CalculatorPage";
import SingleOrderPage from "./pages/SingleOrderPage/SingleOrderPage";
import TransactionsPage from "./pages/ReportsPage/ReportsPage";
import ReportsPage from "./pages/ReportsPage/ReportsPage";
import InventoryPage from "./pages/InventoryPage/InventoryPage";
import ReturnsPage from "./pages/ReturnsPage/ReturnsPage";
import LoyaltyPage from "./pages/LoyaltyPage/LoyaltyPage";
import RawMaterialsPage from "./pages/RawMaterialsPage/RawMaterialsPage";
import ExternalMaterialsPage from "./pages/ExternalMaterialsPage/ExternalMaterialsPage";
import SettingsPage from "./pages/SettingsPage/SettingsPage";
import { Toaster } from "./components/ui/sonner";


function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,
          element: <ProductsPage />
        },
        {
          path: '/products/:id',
          element: <SingleProductPage />
        },
        {
          path: '/orders',
          element: <OrdersPage />
        },
        {
          path: '/orders/:id',
          element: <SingleOrderPage />
        },
        {
          path: '/calculator',
          element: <CalculatorPage />
        },
        {
          path: '/reports',
          element: <ReportsPage />
        },
        {
          path: '/inventory',
          element: <InventoryPage />
        },
        {
          path: '/returns',
          element: <ReturnsPage />
        },
        {
          path: '/loyalty',
          element: <LoyaltyPage />
        },
        {
          path: '/raw-materials',
          element: <RawMaterialsPage />
        },
        {
          path: '/external-materials',
          element: <ExternalMaterialsPage />
        },
        {
          path: '/settings',
          element: <SettingsPage />
        }
      ]

    },
  ]);


  return (
    <>
      <Toaster position="top-center" richColors />
      <RouterProvider router={router} />
    </>
  )
}

export default App

