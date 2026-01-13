import { getEmployees } from "@/api/loyalty";
import { HistoryTable } from "@/components/HistoryTable/HistoryTable";
import AddPointsDialog from "@/components/Loyalty/AddPointsDialog";
import SectionHeader from "@/components/SctionHeader/SectionHeader";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowUpDown,
  Trophy
} from "lucide-react";
import { useMemo } from "react";

export default function LoyaltyPage() {
  // State
  const { data: employeesData } = useQuery({
    queryKey: ["employees"],
    queryFn: getEmployees
  })

  // const [isAddPointsOpen, setIsAddPointsOpen] = useState(false);
  const sortedEmployees = useMemo(() => {
    return employeesData?.data?.sort((a, b) => b.total_points - a.total_points);
  }, [employeesData]);

  // Top 3 Employees
  const topEmployees = sortedEmployees?.slice(0, 3);


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
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="text-left hover:bg-transparent hover:text-main-gold"
          >
            Email
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
      accessorKey: "total_points",
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
      accessorKey: "performance",
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
      cell: ({row}) => {
        return (
          <div className="w-full max-w-[120px]">
              <p className="text-main-green text-end mb-1">{row?.original?.performance} %</p>
            <Progress value={row?.original?.performance} className="h-1.5" />
          </div>
        )
      },

    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const selectedEmployee = row.original
        return (
          <AddPointsDialog selectedEmployee={selectedEmployee} />
        )
      },
    },
  ];



  return (
    <div className="pb-8 space-y-8">
      <SectionHeader title="Employee Loyalty & Points" />

      {/* Top Performers Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {topEmployees?.map((emp, index) => (
          <div
            key={emp.id}
            className={`relative overflow-hidden rounded-xl border p-6 flex flex-col items-center text-center shadow-sm transition-all hover:shadow-md
              ${index === 0 ? 'bg-linear-to-b from-yellow-50 to-white border-yellow-200' :
                index === 1 ? 'bg-linear-to-b from-gray-50 to-white border-gray-200' :
                  'bg-linear-to-b from-orange-50 to-white border-orange-200'
              }`}
          >
            <div className={`absolute top-0 right-0 p-2 rounded-bl-xl font-bold text-white
              ${index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-400'}`}>
              #{index + 1}
            </div>

            <div className="relative mb-4">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-lg
                ${index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-400'}`}>
                {emp?.name?.trim()?.[0] || ""}
              </div>
              {index === 0 && (
                <div className="absolute -top-2 -right-2 bg-yellow-400 text-white p-1.5 rounded-full shadow-sm ">
                  <Trophy className="w-5 h-5" />
                </div>
              )}
            </div>

            <h3 className="text-lg font-bold text-gray-800">{emp?.name}</h3>
            <p className="text-sm text-gray-500 mb-4">{emp?.role}</p>

            <div className="w-full space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Total Points</span>
                <span className="font-bold text-main-green text-lg">{emp?.total_points}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Orders</span>
                <span className="font-medium">{emp?.orders}</span>
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

        </div>
        <HistoryTable data={sortedEmployees || []} columns={columns} />
      </div>

    </div>
  );
}
