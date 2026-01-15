import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ProductReportCard = ({ product }) => {
  return (
    <Card className="bg-main-gold/20 border-main-gold border-l-4">
      <CardHeader className="flex items-center gap-2 p-0">
        <div className="size-12 shrink-0">
          <img
            src={"/coffee.png"}
            alt={"product"}
            className="w-full h-full object-contain"
          />
        </div>
        <div>
          <CardTitle className="text-main-green ">{product?.product_name}</CardTitle>
        </div>
      </CardHeader>

      <CardContent className="space-y-1  text-main-green ">
        {/* category */}
        <div className="flex justify-between">
          <span className="font-semibold">Category</span>
          <span className="text-main-green">{product?.category}</span>
        </div>
        {/* Sales & Orders */}
        <div className="flex justify-between">
          <span className="font-semibold">Orders</span>
          <span className="text-main-green">{product?.orders}</span>
        </div>

        {/* Price */}
        <div className="flex justify-between">
          <span className="font-semibold">Price</span>
          <span className="text-main-green">{product?.price} (₺) </span>
        </div>

        {/* Cost */}
        <div className="flex justify-between">
          <span className="font-semibold">Cost</span>
          <span className="text-main-green">{product?.cost} (₺) </span>
        </div>

        {/* Profit Margin */}
        <div className="flex justify-between">
          <span className="font-semibold">Profit</span>
          <span className="text-main-green">{product?.profit} (₺) </span>
        </div>

        {/* Rate */}
        <div className="flex justify-between">
          <span className="font-semibold">% of Total Sales</span>
          <span className="text-main-green">{product?.percent_of_total_sales}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductReportCard;
