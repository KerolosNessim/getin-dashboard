import { ArrowUpDown } from "lucide-react";
import { Button } from "../ui/button";
import DetailesDialog from "./DetailesDialog";
import { Badge } from "../ui/badge";

export const returnColumns = [
  {
    accessorKey: "returnNumber",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-left hover:bg-transparent hover:text-main-gold"
        >
          Number
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        <div className="font-medium">
        {row.original.returnNumber}
        </div>
      )
    },
  },
  {
    accessorKey: "itemName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-left hover:bg-transparent hover:text-main-gold"
        >
          Name
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-left hover:bg-transparent hover:text-main-gold"
        >
          Quntity
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        <div className="font-medium">
        {row.original.quantity} {row.original.unit}
        </div>
      )
    },
  },
  {
    accessorKey: "reason",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-left hover:bg-transparent hover:text-main-gold"
        >
          Reason
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "requestDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-left hover:bg-transparent hover:text-main-gold"
        >
          Date
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "status",
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
      const status = row.original.status
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
        <Badge className={getStatusStyle(status)}>{status}</Badge>
      )
    }
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <DetailesDialog selectedReturn={row.original} />
    ),
  },
]