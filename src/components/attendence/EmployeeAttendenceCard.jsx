import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../ui/button";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateEmployeeAttendence, updateEmployeeDeparture } from "@/api/attendence";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const EmployeeAttendenceCard = ({ emp }) => {
  const [notes, setNotes] = useState("");
  const queryClient = useQueryClient();
// attendance
  const { mutate:attendance, isPending } = useMutation({
    mutationFn: (data) => updateEmployeeAttendence(data),
    onSuccess: (res) => {
      if (res?.status) {
        toast.success(res?.message || "Updated successfully");
        queryClient.invalidateQueries(["employees-attendence-today"]);
        setNotes("");
      } else {
        toast.error(res?.message || "Failed to update");
      }
    },
    onError: (error) => {
      toast.error(error?.message || "An error occurred");
    }
  });
  // departure
  const { mutate:departure, isPending:isPendingDeparture } = useMutation({
    mutationFn: (data) => updateEmployeeDeparture(data),
    onSuccess: (res) => {
      if (res?.status) {
        toast.success(res?.message || "Updated successfully");
        queryClient.invalidateQueries(["employees-attendence-today"]);
        setNotes("");
      } else {
        toast.error(res?.message || "Failed to update");
      }
    },
    onError: (error) => {
      toast.error(error?.message || "An error occurred");
    }
  });

  const handleAttendance = () => {
    attendance({
      employee_id: emp.employee_id,
      notes: notes || undefined
    });
  };

  const handleDeparture = () => {
    departure({
      employee_id: emp.employee_id,
      notes: notes || undefined
    });
  };

  return (
    <Card key={emp.id} className="border-main-gold bg-main-gold/20 border-l-4">
      <CardContent className="text-main-green space-y-2">
        <p><strong>Name:</strong> {emp?.employee_name}</p>
        <p><strong>Mail:</strong> {emp?.employee_email}</p>
        <p><strong>Orders:</strong> {emp?.orders}</p>
        <p><strong>Attendance:</strong> {emp?.attendance_time || "00:00"}</p>
        <p><strong>Departure:</strong> {emp?.departure_time || "00:00"}</p>
        <p><strong>Working Hours:</strong> {emp?.hours_worked || "00:00"}</p>
        <p><strong>Notes:</strong> {emp?.notes || "-"}</p>
        <div>
          <strong>Raw Material Errors:</strong>
          {emp?.material_errors && Object.keys(emp.material_errors).length > 0 ? (
            <ul className="list-disc pl-5 mt-1">
              {Object.entries(emp.material_errors).map(([item, issue]) => (
                <li key={item}>
                  <span className="font-semibold">{item}:</span> {issue}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-green-600 mt-1">No errors</p>
          )}
        </div>
        <div>
          <strong>Add Notes:</strong>
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add notes..."
            className="text-main-green bg-white mt-1 resize-none "
            rows={3}
          />
        </div>
        <div className="space-x-2">
          <Button
            onClick={handleAttendance}
            disabled={emp?.has_attendance || isPending}
            className="bg-main-green text-main-gold hover:bg-main-green/80"
          >
            {isPending ? <Loader2 className="animate-spin" /> : "Attendance"}
          </Button>
          <Button
            onClick={handleDeparture}
            disabled={emp?.has_departure || isPendingDeparture}
            className="bg-main-gold text-main-green hover:bg-main-gold/60"
          >
             {isPendingDeparture ? <Loader2 className="animate-spin" /> : "Departure"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default EmployeeAttendenceCard;