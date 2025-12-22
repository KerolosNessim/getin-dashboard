import  { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

const AddPointsDialog = ({ employeesData, historyData, setEmployeesData, setHistoryData, setIsAddPointsOpen, isAddPointsOpen }) => {
  // New Points Form State
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [pointsAmount, setPointsAmount] = useState("");
  const [pointsReason, setPointsReason] = useState("");
  const [pointsNotes, setPointsNotes] = useState("");

  // Handle Add Points
  const handleAddPoints = ({}) => {
    if (!selectedEmployeeId || !pointsAmount || !pointsReason) return;

    const employee = employeesData.find(e => e.id.toString() === selectedEmployeeId);
    if (!employee) return;

    const points = parseInt(pointsAmount);

    // Update Employee Points
    const updatedEmployees = employeesData.map(emp => {
      if (emp.id === employee.id) {
        return { ...emp, points: emp.points + points };
      }
      return emp;
    });
    setEmployeesData(updatedEmployees);

    // Add to History
    const newHistoryItem = {
      id: historyData.length + 1,
      employeeId: employee.id,
      employeeName: employee.name,
      points: points,
      reason: pointsReason,
      type: "manual",
      date: new Date().toISOString().slice(0, 16).replace("T", " "),
      notes: pointsNotes,
    };
    setHistoryData([newHistoryItem, ...historyData]);

    // Reset and Close
    setIsAddPointsOpen(false);
    setSelectedEmployeeId("");
    setPointsAmount("");
    setPointsReason("");
    setPointsNotes("");
  };
  return (
    <Dialog open = { isAddPointsOpen } onOpenChange = { setIsAddPointsOpen } >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-main-green">Award Points</DialogTitle>
          <DialogDescription>
            Manually award points to an employee for good performance.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Employee</label>
            <Select value={selectedEmployeeId} onValueChange={setSelectedEmployeeId}>
              <SelectTrigger className="border-main-green/30 w-full">
                <SelectValue placeholder="Select employee" />
              </SelectTrigger>
              <SelectContent>
                {employeesData.map(emp => (
                  <SelectItem key={emp.id} value={emp.id.toString()}>
                    {emp.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Points Amount</label>
            <Input
              type="number"
              placeholder="e.g. 50"
              value={pointsAmount}
              onChange={(e) => setPointsAmount(e.target.value)}
              className="border-main-green/30"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Reason</label>
            <Select value={pointsReason} onValueChange={setPointsReason}>
              <SelectTrigger className="border-main-green/30 w-full">
                <SelectValue placeholder="Select reason" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Punctuality">Punctuality (Opening on time)</SelectItem>
                <SelectItem value="Extra Shift">Extra Shift</SelectItem>
                <SelectItem value="Customer Compliment">Customer Compliment</SelectItem>
                <SelectItem value="Exceptional Performance">Exceptional Performance</SelectItem>
                <SelectItem value="Cleanliness">Cleanliness & Hygiene</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Notes (Optional)</label>
            <Textarea
              placeholder="Additional details..."
              value={pointsNotes}
              onChange={(e) => setPointsNotes(e.target.value)}
              className="border-main-green/30"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => setIsAddPointsOpen(false)}>Cancel</Button>
          <Button
            onClick={handleAddPoints}
            className="bg-main-green hover:bg-main-green/90 text-main-gold"
            disabled={!selectedEmployeeId || !pointsAmount || !pointsReason}
          >
            Award Points
          </Button>
        </div>
      </DialogContent>
      </Dialog>
  )
}

export default AddPointsDialog