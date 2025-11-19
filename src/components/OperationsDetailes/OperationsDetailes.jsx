"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const OperationsDetailes = () => {

  const stats = {
    totalSales: "12,540",
    ordersCount: 320,
    avgOrder: "39.2",
    peakHour: "7 PM",
    lowHour: "11 AM",
  };

  const products = [
    { name: "Latte", orders: 120, sales: 3600, rate: "32%",inStore:90,delivery:30 },
    { name: "Cappuccino", orders: 80, sales: 2400, rate: "21%",inStore: 55, delivery: 25 },
    { name: "Espresso", orders: 65, sales: 1300, rate: "17%", inStore: 60, delivery: 5 },
    { name: "Mocha", orders: 55, sales: 1650, rate: "15%", inStore: 46, delivery: 9 },
    { name: "Americano", orders: 40, sales: 800, rate: "10%", inStore: 20, delivery: 20 },
    { name: "Flat White", orders: 20, sales: 600, rate: "5%", inStore: 13, delivery: 7 },
  ];

  return (
    <div className="space-y-6 ">

      {/* =====================
          Quick Stats Section
      ===================== */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
        <Card className="bg-main-gold/20 border-main-gold border-l-4">
          <CardHeader>
            <CardTitle className="text-main-green text-xl font-semibold">Total Sales (₺)</CardTitle>
          </CardHeader>
          <CardContent className="text-main-green text-2xl font-semibold ">
            {stats.totalSales}
            <p className="text-sm text-gray-600 mt-1"> to yesterday: <span className="text-red-600">-31.74%</span></p>
          </CardContent>
        </Card>

        <Card className="bg-main-gold/20 border-main-gold border-l-4">
          <CardHeader>
            <CardTitle className="text-main-green text-xl font-semibold">Orders</CardTitle>
          </CardHeader>
          <CardContent className="text-main-green text-xl font-semibold">
            {stats.ordersCount}
            <p className="text-sm text-gray-600 mt-1"> to yesterday: <span className="text-green-600">+3.4</span></p>
          </CardContent>
        </Card>

        <Card className="bg-main-gold/20 border-main-gold border-l-4">
          <CardHeader>
            <CardTitle className="text-main-green text-xl font-semibold">AVG Order (₺)</CardTitle>
          </CardHeader>
          <CardContent className="text-main-green text-xl font-semibold">
            {stats.avgOrder}
            <p className="text-sm text-gray-600 mt-1"> to yesterday: <span className="text-red-600">-31.74%</span></p>
          </CardContent>
        </Card>

        <Card className="bg-main-gold/20 border-main-gold border-l-4">
          <CardHeader>
            <CardTitle className="text-main-green text-xl font-semibold">Peak Hour</CardTitle>
          </CardHeader>
          <CardContent className="text-main-green text-xl font-semibold">
            {stats.peakHour}
            <p className="text-sm text-gray-600 mt-1">yesterday: <span className="text-red-600">5 PM</span></p>

          </CardContent>
        </Card>

        <Card className="bg-main-gold/20 border-main-gold border-l-4">
          <CardHeader>
            <CardTitle className="text-main-green text-xl font-semibold">Lowest Hour</CardTitle>
          </CardHeader>
          <CardContent className="text-main-green text-xl font-semibold">
            {stats.lowHour}
              <p className="text-sm text-gray-600 mt-1">yesterday: <span className="text-red-600">9 AM</span></p>

          </CardContent>
        </Card>
      </div>

      {/* =====================
          Products Table
      ===================== */}
      <Card className="border-main-gold bg-main-gold/20 border-l-4">
        <CardHeader>
          <CardTitle className="text-main-green text-lg">Products Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full  text-left">
            <thead className="bg-main-green text-main-gold font-semibold ps-1">
              <tr className="text-main-gold border-b border-main-green">
                <th className="p-2 text-left">Product</th>
                <th className="p-2 text-left">Orders</th>
                <th className="p-2 text-left">Sales (EGP)</th>
                <th className="p-2 text-left">% of Total</th>
                <th className="p-2 text-left">In Store</th>
                <th className="p-2 text-left">Delivery</th>
              </tr>
            </thead>
            <tbody className="text-main-green font-semibold">
              {products.map((p, i) => (
                <tr
                  key={i}
                  className="border-b border-main-green/30 hover:bg-main-green/20 transition"
                >
                  <td className="p-2">{p.name}</td>
                  <td className="p-2">{p.orders}</td>
                  <td className="p-2">{p.sales}</td>
                  <td className="p-2">{p.rate}</td>
                  <td className="p-2">{p.inStore}</td>
                  <td className="p-2">{p.delivery}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

    </div>
  );
};

export default OperationsDetailes;
