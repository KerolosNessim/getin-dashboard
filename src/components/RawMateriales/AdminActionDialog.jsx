import { CheckCircle } from 'lucide-react';
import React, { useState } from 'react'
import { Textarea } from '../ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import StatusBadge from './StatusBadge';
import { Button } from '../ui/button';
import { materialsRequests } from '@/data';
import { toast } from 'sonner';
const AdminActionDialog = ({selectedRequest}) => {
  const [isAdminDialogOpen, setIsAdminDialogOpen] = useState(false);
  const [adminNotes, setAdminNotes] = useState('');
  const [requests, setRequests] = useState(materialsRequests);

  // Handle Accept Request
  const handleAcceptRequest = () => {
    if (!selectedRequest) return;

    const updatedRequests = requests.map(r =>
      r.id === selectedRequest.id
        ? { ...r, status: 'accepted', adminResponse: adminNotes || 'Request accepted' }
        : r
    );
    setRequests(updatedRequests);
    setIsAdminDialogOpen(false);
    toast.success('Request accepted successfully');
  };

  // Handle Reject Request
  const handleRejectRequest = () => {
    if (!selectedRequest) return;
    const updatedRequests = requests.map(r =>
      r.id === selectedRequest.id
        ? { ...r, status: 'rejected', adminResponse: adminNotes || 'Request rejected' }
        : r
    );
    setRequests(updatedRequests);
    setIsAdminDialogOpen(false);
    toast.error('Request rejected');
  };
  // Handle Deliver Request
  const handleDeliverRequest = () => {
    if (!selectedRequest) return;

    // Update Request Status
    const updatedRequests = requests.map(r =>
      r.id === selectedRequest.id
        ? {
          ...r,
          status: 'delivered',
          adminResponse: adminNotes || 'Delivered successfully',
          date: new Date().toLocaleString('en-GB', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
          })
        }
        : r
    );
    setRequests(updatedRequests);

    // Update Inventory Quantity
    const updatedMaterials = materials.map(item => {
      if (item.name === selectedRequest.materialName) {
        return { ...item, quantity: item.quantity + selectedRequest.quantity };
      }
      return item;
    });
    setMaterials(updatedMaterials);

    setIsAdminDialogOpen(false);
    toast.success(`Request ${selectedRequest.id} marked as Delivered. Inventory updated.`);
  };
  return (
    <Dialog open={isAdminDialogOpen} onOpenChange={setIsAdminDialogOpen}>
      <DialogTrigger asChild>
        <Button
          className="bg-main-green hover:bg-main-green/90 text-white"
          onClick={() => setIsAdminDialogOpen(true)}
        >
          Manage Request
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl text-main-green flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            Manage Request
          </DialogTitle>
          <DialogDescription>
            Accept, reject, or mark this request as delivered.
          </DialogDescription>
        </DialogHeader>

        {selectedRequest && (
          <div className="space-y-6 py-4">
            {/* Request Info Card */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Request ID</span>
                <span className="font-semibold text-gray-900">{selectedRequest.id}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Material</span>
                <span className="font-semibold text-gray-900">{selectedRequest.materialName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Quantity</span>
                <span className="font-medium text-gray-900">{selectedRequest.quantity}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Date</span>
                <span className="font-medium text-gray-900">{selectedRequest.date}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Current Status</span>
                <StatusBadge status={selectedRequest.status} />
              </div>
            </div>

            {/* Admin Notes */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Admin Notes (Optional)</label>
              <Textarea
                placeholder="Add notes or reason for your action..."
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                className="border-main-green/30 focus:border-main-green resize-none"
                rows={3}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2">
              <Button
                onClick={handleAcceptRequest}
                className="bg-blue-600 hover:bg-blue-700 text-white w-full"
                disabled={selectedRequest.status === 'accepted' || selectedRequest.status === 'delivered'}
              >
                Accept Request
              </Button>

              <Button
                onClick={handleDeliverRequest}
                className="bg-main-green hover:bg-main-green/90 text-main-gold w-full"
                disabled={selectedRequest.status === 'delivered' || selectedRequest.status === 'rejected'}
              >
                Mark as Delivered
              </Button>

              <Button
                onClick={handleRejectRequest}
                variant="destructive"
                className="w-full"
                disabled={selectedRequest.status === 'rejected' || selectedRequest.status === 'delivered'}
              >
                Reject Request
              </Button>
            </div>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => setIsAdminDialogOpen(false)}>Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AdminActionDialog