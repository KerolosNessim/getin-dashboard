import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle as DialogHeading,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const RawMaterialsCheck = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [actualQty, setActualQty] = useState("");
  const [error, setError] = useState("");

  const materials = [
    { id: 1, name: "Coffee Beans", expected: 80 },
    { id: 2, name: "Milk", expected: 25 },
    { id: 3, name: "Sugar", expected: 10 },
    { id: 4, name: "Chocolate Powder", expected: 12 },
  ];

  const [checks, setChecks] = useState({});

  const handleSave = () => {
    const entered = Number(actualQty);

    // ❗ Logic is EXTREMELY simple now
    if (entered > selectedItem.expected) {
      setError(`Actual quantity (${entered}) can't be more than expected (${selectedItem.expected}) - Please recheck`);
      return;
    }

    setError("");

    const diff = selectedItem.expected - entered;

    setChecks((prev) => ({
      ...prev,
      [selectedItem.id]: {
        actual: entered,
        diff,
        status: diff === 0 ? "ok" : "problem",
      },
    }));

    setActualQty("");
    setSelectedItem(null);
  };

  return (
    <div className="space-y-6">

      <Card className="border-main-gold bg-main-gold/20 border-l-4">
        <CardHeader>
          <CardTitle className="text-main-green text-xl font-semibold">
            Raw Materials Daily Settlement Check
          </CardTitle>
        </CardHeader>

        <CardContent>
          <table className="w-full text-left">
            <thead className="bg-main-green text-main-gold font-semibold">
              <tr>
                <th className="p-2">Material</th>
                <th className="p-2">Expected Qty</th>
                <th className="p-2">Actual Qty</th>
                <th className="p-2">Difference</th>
                <th className="p-2">Status</th>
                <th className="p-2"></th>
              </tr>
            </thead>

            <tbody className="text-main-green font-semibold">
              {materials.map((mat) => {
                const result = checks[mat.id];

                return (
                  <tr
                    key={mat.id}
                    className="border-b border-main-green/20 hover:bg-main-green/10 transition"
                  >
                    <td className="p-2">{mat.name}</td>
                    <td className="p-2">{mat.expected} kg</td>

                    <td className="p-2">
                      {result ? result.actual + " kg" : "-"}
                    </td>

                    <td className="p-2">
                      {result ? result.diff + " kg" : "-"}
                    </td>

                    <td className="p-2">
                      {result ? (
                        result.status === "ok" ? (
                          <span className="text-green-600">OK</span>
                        ) : (
                          <span className="text-red-600">Problem</span>
                        )
                      ) : (
                        "-"
                      )}
                    </td>

                    <td className="p-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            onClick={() => {
                              setSelectedItem(mat);
                              setActualQty("");
                              setError("");
                            }}
                            className="bg-main-green text-main-gold hover:bg-main-green/80"
                          >
                            Check
                          </Button>
                        </DialogTrigger>

                        {selectedItem?.id === mat.id && (
                          <DialogContent className="bg-white">
                            <DialogHeader>
                              <DialogHeading>Enter Actual Quantity</DialogHeading>
                            </DialogHeader>

                            <div className="space-y-2 py-2">
                              <p className="text-main-green font-semibold">
                                Material: {selectedItem.name}
                              </p>

                              <p className="text-main-green">
                                Expected: {selectedItem.expected} kg
                              </p>

                              <Input
                                type="number"
                                placeholder="Enter actual quantity..."
                                value={actualQty}
                                onChange={(e) => {
                                  setActualQty(e.target.value)
                                  setError("")
                                }}
                              />

                              {actualQty && (
                                <p className="text-main-green font-semibold">
                                  Difference:{" "}
                                  {selectedItem.expected - Number(actualQty)} kg
                                </p>
                              )}

                              {error && (
                                <div className="text-red-600 bg-red-100 p-2 rounded-md text-sm">
                                  {error}
                                </div>
                              )}
                            </div>

                            <DialogFooter>
                              <Button
                                onClick={handleSave}
                                className="bg-main-green hover:bg-main-green/90"
                              >
                                Save
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        )}
                      </Dialog>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardContent>
      </Card>

    </div>
  );
};

export default RawMaterialsCheck;
