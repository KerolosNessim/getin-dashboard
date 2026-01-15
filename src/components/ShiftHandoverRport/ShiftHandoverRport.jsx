"use client";
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const ShiftHandoverCards = () => {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Ahmed Ali",
      attendance: "",
      departure: "",
      hours: 0,
      orders: 120,
      notes: "",
      rawMaterialErrors: [
        { item: "Coffee Beans", issue: "Short by 2 kg" },
        { item: "Milk", issue: "Spillage 1 liter" },
      ],
    },
    {
      id: 2,
      name: "Sara Mohamed",
      attendance: "",
      departure: "",
      hours: 0,
      orders: 95,
      notes: "",
      rawMaterialErrors: [],
    },
    {
      id: 3,
      name: "Hassan Youssef",
      attendance: "",
      departure: "",
      hours: 0,
      orders: 105,
      notes: "",
      rawMaterialErrors: [
        { item: "Sugar", issue: "Over usage 0.5 kg" },
      ],
    },
  ]);

  const handleNoteChange = (id, value) => {
    setEmployees(prev =>
      prev.map(emp => emp.id === id ? { ...emp, notes: value } : emp)
    );
  };

  const markAttendance = (id) => {
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setEmployees(prev =>
      prev.map(emp => emp.id === id ? { ...emp, attendance: time } : emp)
    );
  };

  const markDeparture = (id) => {
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setEmployees(prev =>
      prev.map(emp => {
        if (emp.id === id) {
          let hours = 0;
          if (emp.attendance) {
            const [attH, attM] = emp.attendance.split(":").map(Number);
            const attDate = new Date();
            attDate.setHours(attH, attM, 0, 0);
            hours = ((now - attDate) / (1000 * 60 * 60)).toFixed(2);
          }
          return { ...emp, departure: time, hours: Number(hours) };
        }
        return emp;
      })
    );
  };

  return (
    <div className="space-y-4">
      {/* =====================
          Quick Stats Section
      ===================== */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
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
      </div>

    <div className="grid grid-cols-1  lg:grid-cols-3 gap-4">
      {employees.map(emp => (
        <Card key={emp.id} className="border-main-gold bg-main-gold/20 border-l-4">
          <CardHeader className="flex justify-between items-center">
            <CardTitle className="text-main-green text-xl font-semibold">{emp.name}</CardTitle>
            <div className="space-x-2">
              <Button
                onClick={() => markAttendance(emp.id)}
                className="bg-main-green text-main-gold hover:bg-main-green/80"
                disabled={!!emp.attendance}
              >
                Attendance
              </Button>
              <Button
                onClick={() => markDeparture(emp.id)}
                className="bg-main-gold text-main-green hover:bg-main-gold/80"
                disabled={!emp.attendance || !!emp.departure}
              >
                Departure
              </Button>
            </div>
          </CardHeader>
          <CardContent className="text-main-green space-y-2">
            <p><strong>Attendance:</strong> {emp.attendance || "-"}</p>
            <p><strong>Departure:</strong> {emp.departure || "-"}</p>
            <p><strong>Hours Worked:</strong> {emp.hours}</p>
            <p><strong>Orders:</strong> {emp.orders}</p>

            <div>
              <strong>Notes:</strong>
              <Textarea
                value={emp.notes}
                onChange={(e) => handleNoteChange(emp.id, e.target.value)}
                placeholder="Add notes..."
                className="text-main-green bg-white mt-1 resize-none h-30"
                rows={2}
              />
            </div>

            <div>
              <strong>Raw Material Errors:</strong>
              {emp.rawMaterialErrors.length === 0 ? (
                <p className="text-green-600 mt-1">No errors</p>
              ) : (
                <ul className="list-disc pl-5 mt-1">
                  {emp.rawMaterialErrors.map((err, idx) => (
                    <li key={idx}>
                      <span className="font-semibold">{err.item}:</span> {err.issue}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
    </div>
  );
};

export default ShiftHandoverCards;
