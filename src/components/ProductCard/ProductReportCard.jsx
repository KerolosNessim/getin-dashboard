import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ProductReportCard = ({ product }) => {
  return (
    <Card className="bg-main-gold/20 border-main-gold border-l-4">
      <CardHeader className="flex items-start gap-2 ">
        <div className="w-24 h-24 shrink-0">
          <img
            src={"/coffee.png"}
            alt={"product"}
            className="w-full h-full object-contain"
          />
        </div>
        <div>
          <CardTitle className="text-main-green text-lg">{product.name}</CardTitle>
          <p className="text-gray-600 text-sm">Strong and concentrated coffee served in small amounts</p>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 text-main-green">
        {/* category */}
        <div className="flex justify-between">
          <span className="font-semibold">Category</span>
          <span className="text-main-green">{product.category}</span>
        </div>
        {/* Sales & Orders */}
        <div className="flex justify-between">
          <span className="font-semibold">Orders</span>
          <span className="text-main-green">{product.orders}</span>
        </div>

        {/* Price */}
        <div className="flex justify-between">
          <span className="font-semibold">Price</span>
          <span className="text-main-green">{product.sellingPrice} (₺) </span>
        </div>

        {/* Cost */}
        <div className="flex justify-between">
          <span className="font-semibold">Cost</span>
          <span className="text-main-green">{product.cost} (₺) </span>
        </div>

        {/* Profit Margin */}
        <div className="flex justify-between">
          <span className="font-semibold">Profit</span>
          <span className="text-main-green">{product.sellingPrice - product.cost} (₺) </span>
        </div>

        {/* Rate */}
        <div className="flex justify-between">
          <span className="font-semibold">% of Total Sales</span>
          <span className="text-main-green">{product.rate}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductReportCard;
