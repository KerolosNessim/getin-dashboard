import ReturnsTable from "@/components/Returns/ReturnsTable";
import { returnColumns } from "@/components/Returns/columns";
import SectionHeader from "@/components/SctionHeader/SectionHeader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { inventory, returns } from "@/data";
import { useState } from "react";

export default function ReturnsPage() {
  // State Management
  const [returnsData, setReturnsData] = useState(returns);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // New Return Form State
  const [newItemId, setNewItemId] = useState("");
  const [newQuantity, setNewQuantity] = useState("");
  const [newReason, setNewReason] = useState("");
  const [newNotes, setNewNotes] = useState("");



  // Handle New Return Submission
  const handleSubmitReturn = () => {
    if (!newItemId || !newQuantity || !newReason) return;

    const selectedInventoryItem = inventory.find(item => item.id.toString() === newItemId);

    const newReturn = {
      id: returnsData.length + 1,
      returnNumber: `RET-00${returnsData.length + 1}`,
      itemId: parseInt(newItemId),
      itemName: selectedInventoryItem ? selectedInventoryItem.name : "Unknown Item",
      quantity: parseInt(newQuantity),
      unit: selectedInventoryItem ? selectedInventoryItem.unit : "unit",
      reason: newReason,
      status: "pending",
      requestedBy: "Current User", // In a real app, get from auth context
      requestDate: new Date().toISOString().slice(0, 16).replace("T", " "),
      approvedBy: null,
      approvalDate: null,
      refundAmount: 0, 
      notes: newNotes,
      images: [],
    };

    setReturnsData([newReturn, ...returnsData]);
    setIsDialogOpen(false);
    // Reset form
    setNewItemId("");
    setNewQuantity("");
    setNewReason("");
    setNewNotes("");
  };




  return (
    <div className="pb-4">
      <SectionHeader title="Returns & Refunds" />
      {/* New Return Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-main-green">Create Return Request</DialogTitle>
            <DialogDescription>
              Submit a new request to return raw materials or items.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Select Item</label>
              <Select value={newItemId} onValueChange={setNewItemId}>
                <SelectTrigger className="border-main-green/30 w-full">
                  <SelectValue placeholder="Select inventory item" />
                </SelectTrigger>
                <SelectContent>
                  {inventory.map(item => (
                    <SelectItem key={item.id} value={item.id.toString()}>
                      {item.name} (Current: {item.quantity} {item.unit})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Quantity</label>
                <Input
                  type="number"
                  placeholder="0"
                  value={newQuantity}
                  onChange={(e) => setNewQuantity(e.target.value)}
                  className="border-main-green/30"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Reason</label>
                <Select value={newReason} onValueChange={setNewReason}>
                  <SelectTrigger className="border-main-green/30 w-full">
                    <SelectValue placeholder="Select reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Damaged Packaging">Damaged Packaging</SelectItem>
                    <SelectItem value="Expired Product">Expired Product</SelectItem>
                    <SelectItem value="Poor Quality">Poor Quality</SelectItem>
                    <SelectItem value="Wrong Item Delivered">Wrong Item Delivered</SelectItem>
                    <SelectItem value="Over-ordered">Over-ordered</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Notes</label>
              <Select value={newNotes} onValueChange={setNewNotes}>
                <SelectTrigger className="border-main-green/30 w-full">
                  <SelectValue placeholder="Select note (optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Product arrived damaged">Product arrived damaged</SelectItem>
                  <SelectItem value="Expired before delivery">Expired before delivery</SelectItem>
                  <SelectItem value="Quality below standards">Quality below standards</SelectItem>
                  <SelectItem value="Wrong specifications">Wrong specifications</SelectItem>
                  <SelectItem value="Supplier error">Supplier error</SelectItem>
                  <SelectItem value="Customer complaint">Customer complaint</SelectItem>
                  <SelectItem value="Overstocked">Overstocked</SelectItem>
                  <SelectItem value="Not needed anymore">Not needed anymore</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button
              onClick={handleSubmitReturn}
              className="bg-main-green hover:bg-main-green/90 text-main-gold"
              disabled={!newItemId || !newQuantity || !newReason}
            >
              Submit Request
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <ReturnsTable columns={returnColumns} data={returnsData} setIsDialogOpen={setIsDialogOpen} />
    </div>
  );
}
