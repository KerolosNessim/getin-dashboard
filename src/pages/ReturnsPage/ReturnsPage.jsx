import { useState, useMemo } from "react";
import { returns, inventory } from "@/data";
import SectionHeader from "@/components/SctionHeader/SectionHeader";
import {
  Search,
  Filter,
  Plus,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Eye
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function ReturnsPage() {
  // State Management
  const [returnsData, setReturnsData] = useState(returns);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedReturn, setSelectedReturn] = useState(null); // For viewing details
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  // New Return Form State
  const [newItemId, setNewItemId] = useState("");
  const [newQuantity, setNewQuantity] = useState("");
  const [newReason, setNewReason] = useState("");
  const [newNotes, setNewNotes] = useState("");

  // Filtered Returns
  const filteredReturns = useMemo(() => {
    let result = returnsData;

    if (searchQuery) {
      result = result.filter(item =>
        item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.returnNumber.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      result = result.filter(item => item.status === statusFilter);
    }

    return result;
  }, [returnsData, searchQuery, statusFilter]);

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
      refundAmount: 0, // Would be calculated based on price
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

  // Get Status Badge Style
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
    <div className="pb-4">
      <SectionHeader title="Returns & Refunds" />

      {/* Actions Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="flex flex-1 w-full md:w-auto gap-2">
          {/* Search */}
          <div className="relative flex-1 md:max-w-xs">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-main-green/50 w-4 h-4" />
            <Input
              placeholder="Search returns..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 border-main-green/30 focus:border-main-green"
            />
          </div>

          {/* Status Filter */}
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px] border-main-green/30">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* New Return Button */}
        <Button
          onClick={() => setIsDialogOpen(true)}
          className="bg-main-green hover:bg-main-green/90 text-main-gold"
        >
          <Plus className="w-4 h-4 " />
          New Return Request
        </Button>
      </div>

      {/* Returns Table */}
      <div className="bg-white rounded-lg border border-main-green/20 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-main-green text-main-gold">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold">Return</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Item</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Quantity</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Reason</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Date</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReturns.length > 0 ? (
                filteredReturns.map((item, index) => (
                  <tr
                    key={item.id}
                    className={`border-b border-main-green/10 hover:bg-main-gold/5 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                      }`}
                  >
                    <td className="px-4 py-3 font-medium text-main-green">{item.returnNumber}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900">{item.itemName}</span>
                        <span className="text-xs text-gray-500">{item.supplier}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {item.quantity} {item.unit}
                    </td>
                    <td className="px-4 py-3 text-gray-700">{item.reason}</td>
                    <td className="px-4 py-3 text-gray-500 text-sm">
                      {item.requestDate.split(' ')[0]}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusStyle(item.status)}`}>
                        <span className="capitalize">{item.status}</span>
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedReturn(item);
                          setIsViewDialogOpen(true);
                        }}
                        className="text-main-green hover:text-main-green/80 hover:bg-main-green/10"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-4 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <FileText className="w-12 h-12 text-gray-300" />
                      <p>No return requests found</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

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
                <SelectTrigger className="border-main-green/30">
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
                  <SelectTrigger className="border-main-green/30">
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
              <Textarea
                placeholder="Additional details about the return..."
                value={newNotes}
                onChange={(e) => setNewNotes(e.target.value)}
                className="border-main-green/30 min-h-[100px]"
              />
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

      {/* View Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
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
                    <span className="font-medium text-green-600">{selectedReturn.refundAmount} EGP</span>
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
    </div>
  );
}
