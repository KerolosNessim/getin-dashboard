import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import ProductReportCard from "../ProductCard/ProductReportCard";
import SectionHeader from "../SctionHeader/SectionHeader";


const ProductsReportDetailes = ({ reports }) => {
  return (
    <div className="space-y-6 p-4">

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-main-gold/20 border-main-gold border-l-4">
          <CardHeader>
            <CardTitle className="text-main-green text-xl font-semibold">Most Selling</CardTitle>
          </CardHeader>
          <CardContent className="text-main-green font-semibold">
            {reports?.summary?.most_selling?.product_name} <br />({reports?.summary?.most_selling?.orders} orders)
          </CardContent>
        </Card>

        <Card className="bg-main-gold/20 border-main-gold border-l-4">
          <CardHeader>
            <CardTitle className="text-main-green text-xl font-semibold">Least Selling</CardTitle>
          </CardHeader>
          <CardContent className="text-main-green font-semibold">
            {reports?.summary?.least_selling?.product_name} <br />({reports?.summary?.least_selling?.orders} orders)
          </CardContent>
        </Card>

        <Card className="bg-main-gold/20 border-main-gold border-l-4">
          <CardHeader>
            <CardTitle className="text-main-green text-xl font-semibold">Total Products</CardTitle>
          </CardHeader>
          <CardContent className="text-main-green font-semibold">
            {reports?.summary?.total_products}
          </CardContent>
        </Card>

        <Card className="bg-main-gold/20 border-main-gold border-l-4">
          <CardHeader>
            <CardTitle className="text-main-green text-xl font-semibold">Top Category</CardTitle>
          </CardHeader>
          <CardContent className="text-main-green font-semibold">
            {reports?.summary?.top_category}
          </CardContent>
        </Card>
      </div>

      {/* Product Cards */}
      <SectionHeader title="Products" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {reports?.products?.map((product, i) => (
          <ProductReportCard key={i} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsReportDetailes;
