import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Eye } from "lucide-react";
import { useState } from 'react'
import { Button } from "../ui/button";
import { DialogTrigger } from "@radix-ui/react-dialog";

const DetailesDialog = ({ selectedReturn }) => {
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const getStatusStyle = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-700 border-green-200";
      case "completed":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "rejected":
        return "bg-red-100 text-red-700 border-red-200";
      case "pending":
      default:
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
    }
  };
  return (
    <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
      <DialogTrigger>
          <Eye className="w-4 h-4" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-main-green flex items-center gap-2">
            <span>Return Details</span>
            <span className="text-sm font-normal text-gray-500">#{selectedReturn?.returnNumber}</span>
          </DialogTitle>
        </DialogHeader>

        {selectedReturn && (
          <div className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
              <div>
                <p className="text-xs text-gray-500 uppercase">Status</p>
                <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1 border ${getStatusStyle(selectedReturn.status)}`}>
                  <span className="capitalize">{selectedReturn.status}</span>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase">Date</p>
                <p className="font-medium text-gray-900 mt-1">{selectedReturn.requestDate}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">Item</span>
                <span className="font-medium">{selectedReturn.itemName}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">Quantity</span>
                <span className="font-medium">{selectedReturn.quantity} {selectedReturn.unit}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">Reason</span>
                <span className="font-medium">{selectedReturn.reason}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">Requested By</span>
                <span className="font-medium">{selectedReturn.requestedBy}</span>
              </div>
              {selectedReturn.refundAmount > 0 && (
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Refund Amount</span>
                  <span className="font-medium text-green-600">{selectedReturn.refundAmount} ₺</span>
                </div>
              )}
            </div>

            {selectedReturn.notes && (
              <div className="bg-yellow-50 p-3 rounded border border-yellow-100">
                <p className="text-xs text-yellow-700 font-semibold mb-1">Notes:</p>
                <p className="text-sm text-yellow-800">{selectedReturn.notes}</p>
              </div>
            )}
          </div>
        )}

        <div className="flex justify-end">
          <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default DetailesDialog