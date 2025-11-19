import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
const FinanceDtailes = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-4">

        {/*  Sales Amount Card */}
        <Card className="md:col-span-2 border border-l-4 border-main-gold bg-main-gold/20 ">
          <CardHeader >
            <CardTitle className="text-main-green text-xl font-semibold">Sales Amount (₺)</CardTitle>
          </CardHeader>
          <CardContent className='flex  items-center justify-between'>
            <p className="text-3xl font-semibold text-main-green">19,775.40</p>
            <div>
              <p className="text-sm text-gray-600 mt-1"> to yesterday: <span className="text-red-600">-31.74%</span></p>
              <p className="text-sm text-gray-600 mt-1"> to last month: <span className="text-green-600">+3.74%</span></p>
            </div>
          </CardContent>
        </Card>
        {/* Net Revenue Card */}
        <Card className="md:col-span-2 border border-l-4 border-main-gold bg-main-gold/20 ">
          <CardHeader >
            <CardTitle className="text-main-green text-xl font-semibold">Net Revenue (₺)</CardTitle>
          </CardHeader>
          <CardContent className='flex  items-center justify-between'>
            <p className="text-3xl font-semibold text-main-green"> 12211.44</p>
            <div>
              <p className="text-sm text-gray-600 mt-1"> to yesterday: <span className="text-red-600">-31.74%</span></p>
              <p className="text-sm text-gray-600 mt-1"> to last month: <span className="text-green-600">+3.74%</span></p>
            </div>
          </CardContent>
        </Card>
        {/* Discount Amount Card */}
        <Card className=" border border-l-4 border-main-gold bg-main-gold/20 ">
          <CardHeader >
            <CardTitle className="text-main-green text-xl font-semibold">Discount Amount (₺)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold text-main-green">7563.96</p>
            <div className='flex  items-center justify-between'>
              <p className="text-sm text-gray-600 mt-1"> to yesterday: <span className="text-red-600">-31.74%</span></p>
              <p className="text-sm text-gray-600 mt-1"> to last month: <span className="text-green-600">+3.74%</span></p>
            </div>
          </CardContent>
        </Card>
        {/* Valid Orders Count */}
        <Card className=" border border-l-4 border-main-gold bg-main-gold/20 ">
          <CardHeader>
            <CardTitle className="text-main-green text-xl font-semibold">Effective Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold text-main-green">724</p>
            <div className='flex  items-center justify-between'>
              <p className="text-sm text-gray-600 mt-1"> to yesterday: <span className="text-red-600">-12</span></p>
              <p className="text-sm text-gray-600 mt-1"> to last month: <span className="text-red-600">-268</span></p>
            </div>
          </CardContent>
        </Card>
        {/* Average Order Amount (Before Discount) Card */}
        <Card className=" border border-l-4 border-main-gold bg-main-gold/20 ">
          <CardHeader >
            <CardTitle className="text-main-green text-xl font-semibold">Average (Before Discount) (₺)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold text-main-green">27.31</p>
            <div className='flex  items-center justify-between'>
              <p className="text-sm text-gray-600 mt-1"> to yesterday: <span className="text-red-600">-31.74%</span></p>
              <p className="text-sm text-gray-600 mt-1"> to last month: <span className="text-green-600">+3.74%</span></p>
            </div>
          </CardContent>
        </Card>
        {/* Average Order Amount (after Discount) Card */}
        <Card className=" border border-l-4 border-main-gold bg-main-gold/20 ">
          <CardHeader >
            <CardTitle className="text-main-green text-xl font-semibold">Average (After Discount) (₺)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold text-main-green">16.87</p>
            <div className='flex  items-center justify-between'>
              <p className="text-sm text-gray-600 mt-1"> to yesterday: <span className="text-red-600">-31.74%</span></p>
              <p className="text-sm text-gray-600 mt-1"> to last month: <span className="text-green-600">+3.74%</span></p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Table Section */}
      <Card className="mt-4 border border-l-4 border-main-gold bg-main-gold/20 ">
        <CardHeader>
          <CardTitle className="text-main-green text-xl font-semibold ">statistics Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full  text-left">
              <thead className="bg-main-green text-main-gold font-semibold">
                <tr>
                  <th className="p-2">Source</th>
                  <th className="p-2">Total Sales</th>
                  <th className="p-2">Net Income</th>
                  <th className="p-2">Descount</th>
                  <th className="p-2">Orders</th>
                  <th className="p-2">Avg Before Discount</th>
                  <th className="p-2">Avg After Discount</th>
                </tr>
              </thead>
              <tbody className="text-main-green font-semibold">

                <tr className="border-b border-main-green/20">
                  <td className="p-2">In Store</td>
                  <td className="p-2">17,775.4</td>
                  <td className="p-2">11,211.44</td>
                  <td className="p-2">7,563.96</td>
                  <td className="p-2">700</td>
                  <td className="p-2">27.31</td>
                  <td className="p-2">16.87</td>
                </tr>
                <tr className="border-b border-main-green/20">
                  <td className="p-2">Delivery</td>
                  <td className="p-2">2,775.4</td>
                  <td className="p-2">1,211.44</td>
                  <td className="p-2">1,563.96</td>
                  <td className="p-2">24</td>
                  <td className="p-2">27.31</td>
                  <td className="p-2">16.87</td>
                </tr>


              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default FinanceDtailes
