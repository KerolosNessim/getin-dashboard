"use client";
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import ProductReportCard from "../ProductCard/ProductReportCard";


const ProductsReportDetailes = () => {
  const products = [
    {
      name: "Iced Latte",
      category: "Cold Drinkes",
      orders: 150,
      sellingPrice: 40,
      cost: 18,
      rate: "29%",
    },
    {
      name: "Hot Cappuccino",
      category: "Hot Drinkes",
      orders: 90,
      sellingPrice: 35,
      cost: 15,
      rate: "18%",
    },
    {
      name: "Espresso",
      category: "Hot Drinkes",
      orders: 25,
      sellingPrice: 20,
      cost: 6,
      rate: "5%",
    },
    {
      name: "Iced Latte",
      category: "Cold Drinkes",
      orders: 150,
      sellingPrice: 40,
      cost: 18,
      rate: "29%",
    },
    {
      name: "Hot Cappuccino",
      category: "Hot Drinkes",
      orders: 90,
      sellingPrice: 35,
      cost: 15,
      rate: "18%",
    },
    {
      name: "Espresso",
      category: "Cold Drinkes",
      orders: 25,
      sellingPrice: 20,
      cost: 6,
      rate: "5%",
    },
  ];

  const mostSelling = products.reduce((a, b) => (a.orders > b.orders ? a : b));
  const leastSelling = products.reduce((a, b) => (a.orders < b.orders ? a : b));

  return (
    <div className="space-y-6 p-4">

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-main-gold/20 border-main-gold border-l-4">
          <CardHeader>
            <CardTitle className="text-main-green text-xl font-semibold">Most Selling</CardTitle>
          </CardHeader>
          <CardContent className="text-main-green font-semibold">
            {mostSelling.name} ({mostSelling.orders} orders)
          </CardContent>
        </Card>

        <Card className="bg-main-gold/20 border-main-gold border-l-4">
          <CardHeader>
            <CardTitle className="text-main-green text-xl font-semibold">Least Selling</CardTitle>
          </CardHeader>
          <CardContent className="text-main-green font-semibold">
            {leastSelling.name} ({leastSelling.orders} orders)
          </CardContent>
        </Card>

        <Card className="bg-main-gold/20 border-main-gold border-l-4">
          <CardHeader>
            <CardTitle className="text-main-green text-xl font-semibold">Total Products</CardTitle>
          </CardHeader>
          <CardContent className="text-main-green font-semibold">
            {products.length}
          </CardContent>
        </Card>

        <Card className="bg-main-gold/20 border-main-gold border-l-4">
          <CardHeader>
            <CardTitle className="text-main-green text-xl font-semibold">Top Category</CardTitle>
          </CardHeader>
          <CardContent className="text-main-green font-semibold">
            Hot Drinkes
          </CardContent>
        </Card>
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product, i) => (
          <ProductReportCard key={i} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsReportDetailes;
