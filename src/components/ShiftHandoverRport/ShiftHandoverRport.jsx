"use client";
import { getEmployeeAttendenceToday } from "@/api/attendence";
import { useQuery } from "@tanstack/react-query";
import EmployeeAttendenceCard from "../attendence/EmployeeAttendenceCard";

const ShiftHandoverCards = () => {
  const { data } = useQuery({
    queryKey: ["employees-attendence-today"],
    queryFn: () => getEmployeeAttendenceToday(),
  });
// data
  const employees = data?.employees ?? [];




  return (
    <div className="space-y-4">
      {/* =====================
          Quick Stats Section
      ===================== */}
      {/* <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        <Card className="bg-main-gold/20 border-main-gold border-l-4">
          <CardHeader>
            <CardTitle className="text-main-green text-xl font-semibold">Total Employees</CardTitle>
          </CardHeader>
          <CardContent className="text-main-green text-2xl font-semibold">{employees.length}</CardContent>
        </Card>

        <Card className="bg-main-gold/20 border-main-gold border-l-4">
          <CardHeader>
            <CardTitle className="text-main-green text-xl font-semibold">Total Orders</CardTitle>
          </CardHeader>
          <CardContent className="text-main-green text-2xl font-semibold">
            {employees.reduce((sum, emp) => sum + emp.orders, 0)}
          </CardContent>
        </Card>

        <Card className="bg-main-gold/20 border-main-gold border-l-4">
          <CardHeader>
            <CardTitle className="text-main-green text-xl font-semibold">Avg Hours</CardTitle>
          </CardHeader>
          <CardContent className="text-main-green text-2xl font-semibold">
            8:00
          </CardContent>
        </Card>
        <Card className="bg-main-gold/20 border-main-gold border-l-4">
          <CardHeader>
            <CardTitle className="text-main-green text-xl font-semibold">Raw Material Errors</CardTitle>
          </CardHeader>
          <CardContent className="text-main-green text-2xl font-semibold">
            3
          </CardContent>
        </Card>
      </div> */}

      <div className="grid grid-cols-1  lg:grid-cols-3 gap-4">
        {employees?.map(emp => (
          <EmployeeAttendenceCard key={emp.id} emp={emp} />
        ))}
      </div>

    </div>
  );
};

export default ShiftHandoverCards;
