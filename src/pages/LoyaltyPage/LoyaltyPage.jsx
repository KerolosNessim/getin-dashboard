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
  CheckCircle,
  ArrowUpDown
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
import { HistoryTable } from "@/components/HistoryTable/HistoryTable";
import AddPointsDialog from "@/components/Loyalty/AddPointsDialog";

export default function LoyaltyPage() {
  // State
  const [employeesData, setEmployeesData] = useState(
    employees
  );
  const [historyData, setHistoryData] = useState(
    pointsHistory
  );
  const [isAddPointsOpen, setIsAddPointsOpen] = useState(false);
  const sortedEmployees = useMemo(() => {
    return [...employeesData].sort((a, b) => b.points - a.points);
  }, [employeesData]);

  // Top 3 Employees
  const topEmployees = sortedEmployees.slice(0, 3);


  const columns = [
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="text-left hover:bg-transparent hover:text-main-gold"
          >
            Employee
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        )
      },

    },
    {
      accessorKey: "role",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="text-left hover:bg-transparent hover:text-main-gold"
          >
            Role
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        )
      },

    },
    {
      accessorKey: "points",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="text-left hover:bg-transparent hover:text-main-gold"
          >
            Points
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        )
      },

    },
    {
      accessorKey: "completedOrders",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="text-left hover:bg-transparent hover:text-main-gold"
          >
            Performance
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        )
      },
      cell: (row) => {
        const result = row.getValue("completedOrders");
        const progress = (result / 200) * 100;
        return (
          <div className="w-full max-w-[120px]">
            <div className="flex justify-between text-xs mb-1">
              <span>Orders</span>
              <span>{progress}</span>
            </div>
            <Progress value={progress} className="h-1.5" />
          </div>
        )
      },

    },
  ];



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
        <HistoryTable data={employeesData} columns={columns} />
      </div>
      <AddPointsDialog isAddPointsOpen={isAddPointsOpen} setIsAddPointsOpen={setIsAddPointsOpen} employeesData={employeesData} historyData={pointsHistory} setEmployeesData={setEmployeesData} setHistoryData={setHistoryData}/>

    </div>
  );
}
