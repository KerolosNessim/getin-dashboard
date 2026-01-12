import React, { useState } from 'react';
import { Clock, CheckCircle, MapPin, ShoppingBag, Calendar, Clock as ClockIcon, Eye, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GiCardExchange } from "react-icons/gi";
import { FaLocationPin, FaX } from "react-icons/fa6";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FaCheck, FaLocationArrow, FaPhone, FaTimes, FaUser } from 'react-icons/fa';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { changeOrderStatus } from '@/api/orders';
import { toast } from 'sonner';

// Format the date to be more readable
const formatDate = (dateTime) => {
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return new Date(dateTime).toLocaleDateString('en-US', options);
};
const OrderCard = ({ order, withStatusChangeButton = true }) => {
  const isCompleted = order.status === 'completed';
  const isCancelled = order.status === 'canceled';
  const bgColor = isCompleted ? 'bg-main-green/10' : isCancelled ? 'bg-red-50' : 'bg-main-gold/20';
  const textColor = isCompleted ? 'text-main-green' : isCancelled ? 'text-red-700' : 'text-yellow-700';
  const borderColor = isCompleted ? 'border-main-green' : isCancelled ? 'border-red-500' : 'border-main-gold';
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const { mutate: changeStatus, isPending } = useMutation({
    mutationFn: changeOrderStatus,
    onSuccess: (res) => {
      const msg = res?.message || res?.msg || "Status updated";
      toast.success(msg);
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (err) => {
      console.log(err);
    },
  });
  function handleStatusChange(status) {
    changeStatus({ order_id: order.id, status })
    setIsOpen(false);
  }
  return (
    <div className={`border rounded-lg p-4  ${bgColor} border-l-4 ${borderColor}-500 ${borderColor} transition-all hover:shadow-md`}>
      {/* order info */}
      <div className='space-y-4' >
        {/* order num and status */}
        <div className='flex items-center justify-between'>
          {/* order num */}
          <h3 className={`text-lg font-semibold ${textColor} flex items-center gap-2`}>
            {isCompleted ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <Clock className="w-5 h-5" />
            )}
            Order #{order?.order_num}
          </h3>
          {/* order status */}
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${isCompleted ? 'bg-green-100 text-green-800' :
            isCancelled ? 'bg-red-100 text-red-800' :
              'bg-yellow-100 text-yellow-800'
            }`}>
            {order?.status}
          </span>
        </div>
        {/* date and type  */}
        <div className='flex items-center justify-between'>
          {/* date */}
          <p className="text-sm text-gray-600">{formatDate(order?.created_at)}</p>
          {/* type */}
          <div className="flex items-center gap-1 text-sm text-gray-600 ">
            {order?.type === 'Delivery' ? (
              <MapPin className="w-4 h-4" />
            ) : (
              <ShoppingBag className="w-4 h-4" />
            )}
            <span>{order?.type}</span>
          </div>
        </div>
      </div>
      {/* order detailes */}
      <div className="border-t border-gray-200 pt-3 flex items-center justify-between">
        <div className="flex gap-2 text-sm mb-2">
          <span className="text-gray-600">Items</span>
          <span className="font-medium">{order?.count_items} items</span>
        </div>
        <div className="flex gap-2 text-sm">
          <span className="text-gray-600">Total</span>
          <span className="font-bold">₺{Number(order?.total_price).toFixed(2)}</span>
        </div>
      </div>
      {/* user detailes */}
      <div className="border-t border-gray-200 pt-3">
        <p className='font-semibold'>User Information </p>
        <div className="flex justify-between text-sm mb-2 text-gray-600">
          <div className='flex items-center gap-1'>
            <FaUser />
            <span >{order?.user_name}</span>
          </div>
          <div className='flex items-center gap-1'>
            <FaPhone className='rotate-90' />
            <span >{order?.user?.phone_number}</span>
          </div>
        </div>
        <p className='font-semibold'>Location Information </p>
        <div className="flex justify-between text-sm mb-2 text-gray-600">
          <div className='flex items-center gap-1'>
            <FaLocationPin />
            <span >{`${order?.user_location?.address_title}, building number ${order?.user_location?.building_number}`}</span>
          </div>
          <div className='flex items-center gap-1'>
            <FaPhone className='rotate-90' />
            <span >{order?.user_location?.phone_number}</span>
          </div>
        </div>

      </div>

      <div className="mt-4 flex justify-end gap-2">
        {
          withStatusChangeButton && (
            order.status === 'pending' && (
              <Dialog isOpen={isOpen}>
                <DialogTrigger className="px-4 py-2 rounded-md text-sm text-main-green font-medium flex items-center gap-1 bg-main-green/30 hover:bg-main-green/20">
                  <GiCardExchange />
                  Change Status
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader className={"space-y-4"}>
                    <DialogTitle className={"text-main-green text-xl font-bold text-center"}>Change order's status</DialogTitle>
                    <DialogDescription className="flex items-center justify-center gap-2">
                      <button disabled={isPending} className="px-4 py-2 rounded-md text-sm text-main-green font-medium flex items-center gap-1 bg-main-green/30 hover:bg-main-green/20"
                        onClick={() => handleStatusChange('completed')}>
                        {
                          isPending ?
                            <Loader2 className='animate-spin' />
                            :
                            <FaCheck />
                        }
                        Completed
                      </button>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            )
          )
        }
        <Link to={`/orders/${order.id}`} className={`px-4 py-2 rounded-md text-sm font-medium flex items-center gap-1 ${isCompleted ? 'text-main-green bg-main-green/30 hover:bg-main-green/20' :
          isCancelled ? 'text-red-600 bg-red-100 hover:bg-red-200' :
            'text-main-green bg-main-gold/40 hover:bg-main-gold/20'
          }`}>
          <Eye size={16} />
          View Details
        </Link>

      </div>
    </div>
  );
};

export default OrderCard;
