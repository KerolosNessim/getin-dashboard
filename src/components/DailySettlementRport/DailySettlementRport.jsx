import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RawMaterialsCheck from "../RawMaterialsCheck/RawMaterialsCheck";


const DailySettlementRport = () => {


  const summary = [
    { label: "Total Sales Today (₺)", value: "12,540" },
    { label: "Number of Orders", value: "200" },
    { label: "Total Discounts Today (₺)", value: "250" },
    { label: "Difference in Sales Compared to Yesterday", value: "+12%" },
  ];

  return (
    <div className="space-y-6">

      {/* ===========================
          Summary Section
      ============================ */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <Card  className="bg-main-gold/20 border-main-gold border-l-4">
          <CardHeader>
            <CardTitle className="text-main-green text-lg font-semibold">
              Total Sales Today (₺)
            </CardTitle>
          </CardHeader>
          <CardContent className="text-main-green text-2xl font-bold">
            12,540
            <p className="text-sm text-gray-600 mt-1"> to yesterday: <span className="text-green-600">+520 ₺</span></p>
          </CardContent>
        </Card>
        <Card  className="bg-main-gold/20 border-main-gold border-l-4">
          <CardHeader>
            <CardTitle className="text-main-green text-lg font-semibold">
              Orders
            </CardTitle>
          </CardHeader>
          <CardContent className="text-main-green text-2xl font-bold">
            200
            <p className="text-sm text-gray-600 mt-1"> to yesterday: <span className="text-red-600">-17</span></p>
          </CardContent>
        </Card>
        <Card  className="bg-main-gold/20 border-main-gold border-l-4">
          <CardHeader>
            <CardTitle className="text-main-green text-lg font-semibold">
              Total Discounts Today (₺)
            </CardTitle>
          </CardHeader>
          <CardContent className="text-main-green text-2xl font-bold">
            250
            <p className="text-sm text-gray-600 mt-1"> to yesterday: <span className="text-green-600">+39 ₺</span></p>
          </CardContent>
        </Card>
        <Card  className="bg-main-gold/20 border-main-gold border-l-4">
          <CardHeader>
            <CardTitle className="text-main-green text-lg font-semibold">
               Difference in Sales
            </CardTitle>
          </CardHeader>
          <CardContent className="text-main-green text-2xl font-bold">
            +12%
            <p className="text-sm text-gray-600 mt-1"> to yesterday: <span className="text-green-600">+3.4%</span></p>
          </CardContent>
        </Card>
      </div>
      {/* ===========================
          Raw Materials Check
      ============================ */}
      <RawMaterialsCheck />


    </div>
  );
};

export default DailySettlementRport
