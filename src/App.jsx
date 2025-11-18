import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import ProductsPage from "./pages/ProductsPage/ProductsPage";
import SingleProductPage from "./pages/singleProductPage/SingleProductPage";
import OrdersPage from "./pages/OrdersPage/OrdersPage";
import CalculatorPage from "./pages/CalculatorPage/CalculatorPage";
import SingleOrderPage from "./pages/SingleOrderPage/SingleOrderPage";
import TransactionsPage from "./pages/ReportsPage/ReportsPage";
import ReportsPage from "./pages/ReportsPage/ReportsPage";

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
        }
      ]

    },
  ]);


  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App

