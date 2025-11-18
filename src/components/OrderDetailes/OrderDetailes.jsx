import React from "react";
import {
  Clock,
  CheckCircle,
  MapPin,
  ShoppingBag,
  Calendar,
  DollarSign,
  Receipt,
} from "lucide-react";

const OrderDetails = ({ order }) => {

  const isCompleted = order?.status === "completed";
  const isCancelled = order?.status === "canceled";
  const textColor = isCompleted ? "text-main-green" : isCancelled ? "text-red-700" : "text-yellow-700";
  const borderColor = isCompleted ? "border-main-green" : isCancelled ? "border-red-500" : "border-main-gold";
  const bgColor = isCompleted ? 'bg-main-green/10' : isCancelled ? 'bg-red-50' : 'bg-main-gold/20';
  const formatDate = (dateTime) =>
    new Date(dateTime).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className={`border rounded-xl p-6 shadow-sm  border-l-4 ${borderColor} ${bgColor}`}>

      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className={`text-2xl font-bold flex items-center gap-2 ${textColor}`}>
            {isCompleted ? (
              <CheckCircle className="w-6 h-6" />
            ) : isCancelled ? (
              <Clock className="w-6 h-6 text-red-700" />
            ) : (
              <Clock className="w-6 h-6" />
            )}
            Order #{order?.orderNumber}
          </h2>
          <p className="text-main-green">{formatDate(order?.createdAt)}</p>
        </div>

        <span
          className={`px-4 py-1 rounded-full text-sm font-medium ${isCompleted ? 'bg-green-100 text-green-800' :
              isCancelled ? 'bg-red-100 text-red-800' :
                'bg-yellow-100 text-yellow-800'
            }`}
        >
          {order?.status?.charAt(0)?.toUpperCase() + order?.status?.slice(1)}
        </span>
      </div>

      {/* Order type */}
      <div className="flex items-center gap-3 text-gray-700 text-sm mb-4">
        {order?.type === "Delivery" ? (
          <MapPin className="w-4 h-4" />
        ) : (
          <ShoppingBag className="w-4 h-4" />
        )}
        <span className="font-medium">{order?.type}</span>

        <span className="mx-2">•</span>

        <Calendar className="w-4 h-4" />
        <span>{order?.pickupTime ? formatDate(order?.pickupTime) : "--"}</span>
      </div>

      {/* Items */}
      <div className="border-t pt-4">
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <Receipt className="w-5 h-5 text-main-green" />
          Items ({order?.itemsCount})
        </h3>

        <div className="space-y-2">
          {order?.items?.map((item, idx) => (
            <div
              key={idx}
              className="flex justify-between text-main-green p-2 rounded-md"
            >
              <span>{item.name} × {item.quantity}</span>
              <span className="font-medium">${item.price}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Totals */}
      <div className="border-t pt-4 mt-4">
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-main-green" />
          Payment Summary
        </h3>

        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="text-main-green">Subtotal</span>
            <span className="font-medium">${order?.totals?.subtotal}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-main-green">Discount</span>
            <span className="font-medium">-${order?.totals?.discount}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-main-green">User Paid</span>
            <span className="font-medium">${order?.totals?.userPaid}</span>
          </div>

          <div className="flex justify-between font-bold text-lg mt-2 pt-2 border-t">
            <span>Total</span>
            <span>${order?.totals?.finalAmount}</span>
          </div>
        </div>
      </div>

      {/* Note */}
      {order?.note && (
        <div className="border-t pt-4 mt-4">
          <h3 className="text-lg font-semibold mb-2">Note</h3>
          <p className="text-gray-700 bg-yellow-50 p-3 rounded-md border border-yellow-200">
            {order?.note}
          </p>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
