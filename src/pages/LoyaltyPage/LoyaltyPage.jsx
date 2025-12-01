import { useState, useMemo } from "react";
import { employees, pointsHistory } from "@/data";
import SectionHeader from "@/components/SctionHeader/SectionHeader";
import {
  Trophy,
  Star,
  TrendingUp,
  Award,
  Plus,
  History,
  User,
  Calendar,
  CheckCircle
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
import { Progress } from "@/components/ui/progress";

export default function LoyaltyPage() {
  // State
  const [employeesData, setEmployeesData] = useState(employees);
  const [historyData, setHistoryData] = useState(pointsHistory);
  const [isAddPointsOpen, setIsAddPointsOpen] = useState(false);

  // New Points Form State
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [pointsAmount, setPointsAmount] = useState("");
  const [pointsReason, setPointsReason] = useState("");
  const [pointsNotes, setPointsNotes] = useState("");

  // Sort employees by points (descending)
  const sortedEmployees = useMemo(() => {
    return [...employeesData].sort((a, b) => b.points - a.points);
  }, [employeesData]);

  // Top 3 Employees
  const topEmployees = sortedEmployees.slice(0, 3);
  const otherEmployees = sortedEmployees.slice(3);

  // Handle Add Points
  const handleAddPoints = () => {
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
    <div className="pb-8 space-y-8">
      <SectionHeader title="Employee Loyalty & Points" />

      {/* Top Performers Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {topEmployees.map((emp, index) => (
          <div
            key={emp.id}
            className={`relative overflow-hidden rounded-xl border p-6 flex flex-col items-center text-center shadow-sm transition-all hover:shadow-md
              ${index === 0 ? 'bg-linear-to-b from-yellow-50 to-white border-yellow-200' :
                index === 1 ? 'bg-linear-to-b from-gray-50 to-white border-gray-200' :
                  'bg-linear-to-b from-orange-50 to-white border-orange-200'
              }`}
          >
            {/* Rank Badge */}
            <div className={`absolute top-0 right-0 p-2 rounded-bl-xl font-bold text-white
              ${index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-400'}`}>
              #{index + 1}
            </div>

            {/* Avatar & Icon */}
            <div className="relative mb-4">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-lg
                ${index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-400'}`}>
                {emp.name.charAt(0)}
              </div>
              {index === 0 && (
                <div className="absolute -top-2 -right-2 bg-yellow-400 text-white p-1.5 rounded-full shadow-sm ">
                  <Trophy className="w-5 h-5" />
                </div>
              )}
            </div>

            <h3 className="text-lg font-bold text-gray-800">{emp.name}</h3>
            <p className="text-sm text-gray-500 mb-4">{emp.role}</p>

            <div className="w-full space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Total Points</span>
                <span className="font-bold text-main-green text-lg">{emp.points}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Orders</span>
                <span className="font-medium">{emp.completedOrders}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Attendance</span>
                <span className="font-medium">{emp.attendanceRate}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-main-green flex items-center gap-2">
            Employee Rankings
          </h2>
          <Button
            onClick={() => setIsAddPointsOpen(true)}
            className="bg-main-green hover:bg-main-green/90 text-main-gold"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Points
          </Button>
        </div>

        <div className="bg-white rounded-lg border border-main-green/20 overflow-hidden shadow-sm">
          <table className="w-full">
            <thead className="bg-main-green text-main-gold">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold">Rank</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Employee</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Role</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Points</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Performance</th>
              </tr>
            </thead>
            <tbody>
              {sortedEmployees.map((emp, index) => (
                <tr
                  key={emp.id}
                  className={`border-b border-main-green/10 hover:bg-main-gold/5 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                    }`}
                >
                  <td className="px-4 py-3 font-medium text-gray-500">#{index + 1}</td>
                  <td className="px-4 py-3 font-medium text-main-green">{emp.name}</td>
                  <td className="px-4 py-3 text-gray-600 text-sm">{emp.role}</td>
                  <td className="px-4 py-3 font-bold text-main-green">{emp.points}</td>
                  <td className="px-4 py-3">
                    <div className="w-full max-w-[120px]">
                      <div className="flex justify-between text-xs mb-1">
                        <span>Orders</span>
                        <span>{emp.completedOrders}</span>
                      </div>
                      <Progress value={(emp.completedOrders / 200) * 100} className="h-1.5" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Points Dialog */}
      <Dialog open={isAddPointsOpen} onOpenChange={setIsAddPointsOpen}>
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
                <SelectTrigger className="border-main-green/30">
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
                <SelectTrigger className="border-main-green/30">
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
    </div>
  );
}
