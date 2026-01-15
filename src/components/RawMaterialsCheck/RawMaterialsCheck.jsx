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
import { HistoryTable } from "../HistoryTable/HistoryTable";
import { ArrowUpDown } from "lucide-react";

import { useQuery } from "@tanstack/react-query";
import { getMaterials } from "@/api/materials";

const RawMaterialsCheck = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [actualQty, setActualQty] = useState("");
  const [error, setError] = useState("");

  const { data: materialsData } = useQuery({
    queryKey: ["materials"],
    queryFn: getMaterials,
  });

  const materials = materialsData || [];

  const [checks, setChecks] = useState({});

  const handleSave = () => {
    const entered = Number(actualQty);
    const expected = Number(selectedItem.stock); // API uses 'stock' for expected qty

    if (entered > expected) {
      setError(`Actual quantity (${entered}) can't be more than expected (${expected}) - Please recheck`);
      return;
    }

    setError("");

    const diff = expected - entered;

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

  const tableData = materials.map((mat) => {
    const result = checks[mat.id];
    return {
      ...mat,
      name: mat.material_name,
      expected: mat.stock,
      actual: result ? result.actual : "-",
      diff: result ? result.diff : "-",
      status: result ? result.status : "-",
    };
  });

  const columns = [
    {
      accessorKey: 'name',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="text-left hover:bg-transparent hover:text-main-gold"
          >
            Material
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <span className="font-bold text-main-green">{row.original.name}</span>,
    },
    {
      accessorKey: 'expected',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="text-left hover:bg-transparent hover:text-main-gold"
          >
            Expected Qty
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <span className="font-bold text-main-green">{row.original.expected}</span>,
    },
    {
      accessorKey: 'actual',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="text-left hover:bg-transparent hover:text-main-gold"
          >
            Actual Qty
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <span className="font-bold text-main-green">{row.original.actual}</span>,
    },
    {
      accessorKey: 'diff',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="text-left hover:bg-transparent hover:text-main-gold"
          >
            Difference
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <span className="font-bold text-main-green">{row.original.diff}</span>,
    },
    {
      accessorKey: 'status',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="text-left hover:bg-transparent hover:text-main-gold"
          >
            Status
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const status = row.original.status;
        if (status === "ok") return <span className="text-green-600">OK</span>;
        if (status === "problem") return <span className="text-red-600">Problem</span>;
        return <span>-</span>;
      },
    },
    {
      accessorKey: 'action',
      header: "Action",
      cell: ({ row }) => {
        const mat = row.original;

        return (
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
        )
      }
    }
  ]



  return (
    <div className="space-y-6">

      <Card className="border-main-gold bg-main-gold/20 border-l-4">
        <CardHeader>
          <CardTitle className="text-main-green text-xl font-semibold">
            Raw Materials Daily Settlement Check
          </CardTitle>
        </CardHeader>

        <CardContent>
          <HistoryTable data={tableData} columns={columns} />

          <Dialog open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
            <DialogContent className="bg-white">
              <DialogHeader>
                <DialogHeading>Enter Actual Quantity</DialogHeading>
              </DialogHeader>

              {selectedItem && (
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
              )}

              <DialogFooter>
                <Button
                  onClick={handleSave}
                  className="bg-main-green hover:bg-main-green/90"
                >
                  Save
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

    </div>
  );
};

export default RawMaterialsCheck;
