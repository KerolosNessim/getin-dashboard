import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import ExternalOrderDialog from "./ExternalOrderDialog";
import AdminExternalDialog from "./AdminExternalDialog";
// import AdminActionDialog from "./AdminActionDialog";
// import MatiralOrderDialog from "./MatiralOrderDialog";

export const ExternalMaterialsColumns = [
  {
    accessorKey: "name",
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
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-transparent hover:text-main-gold"
        >
          Category
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        <span
          className="capitalize px-2 py-1 bg-gray-100 rounded-md text-xs text-gray-600"
        >
          {row.original.category}
        </span>
      )
    }
  },
  {
    accessorKey: "unit",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-left hover:bg-transparent hover:text-main-gold"
        >
          Unit
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "currentQuantity",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-left hover:bg-transparent hover:text-main-gold"
        >
          Quantity
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "maxQuantity",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-left hover:bg-transparent hover:text-main-gold"
        >
          Max Quantity
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "availableToOrder",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-left hover:bg-transparent hover:text-main-gold"
        >
          Available to Order
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        <Badge
          variant={row.original.availableToOrder ? 'default' : 'secondary'}
          className={row.original.availableToOrder ? 'bg-green-100 text-green-700 border-green-200' : 'bg-red-100 text-red-700 border-red-200'}
        >
          {row.original.availableToOrder ? 'Yes' : 'No'}
        </Badge>
      )
    }
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const selectedMaterial = row.original
      return (
        <ExternalOrderDialog selectedMaterial={selectedMaterial} />
      )
    },
  },
]
export const ExternalRequsetsColumns = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-left hover:bg-transparent hover:text-black"
        >
          Request ID
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "materialName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-left hover:bg-transparent hover:text-black"
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
          className="text-left hover:bg-transparent hover:text-black"
        >
          Quantity
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-left hover:bg-transparent hover:text-black"
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
          className="text-left hover:bg-transparent hover:text-black"
        >
          Status
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const status = row.original.status
      let styling = {}
      if (status === "pending") {
        styling = { status: 'pending', label: 'Pending', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' };
      } else if (status === "accepted") {
        styling = { status: 'accepted', label: 'Accepted', color: 'bg-green-100 text-green-700 border-green-200' };
      } else if (status === "rejected") {
        styling = { status: 'rejected', label: 'Rejected', color: 'bg-red-100 text-red-700 border-red-200' };
      } else if (status === "shipped") {
        styling = { status: 'shipped', label: 'Shipped', color: 'bg-blue-100 text-blue-700 border-blue-200' };
      } else if (status === "delivered") {
        styling = { status: 'delivered', label: 'Delivered', color: 'bg-green-100 text-green-700 border-green-200' };
      }
      return (
        <Badge className={styling.color}>{styling.label}</Badge>
      )
    }
  },
  {
    accessorKey: "adminResponse",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-left hover:bg-transparent hover:text-black"
        >
          Admin Response
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      )
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const selectedRequest = row.original
      return (
        <AdminExternalDialog selectedRequest={selectedRequest} />
      )
    }
  }
]
export const ExternalHistoryColumns = [
  {
    accessorKey: "itemName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-left hover:bg-transparent hover:text-black"
        >
          Item Name
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
          className="text-left hover:bg-transparent hover:text-black"
        >
          Quantity
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-left hover:bg-transparent hover:text-black"
        >
          Date
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-left hover:bg-transparent hover:text-black"
        >
          Type
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const type = row.original.type
      let styling = {}
      if (type === "in") {
        styling = { label: 'usage (+)', color: 'bg-green-100 text-green-700 border-green-200' };
      } else if (type === "out") {
        styling = { label: "Restock (-)", color: 'bg-red-100 text-red-700 border-red-200' };
      }
      return (
        <Badge className={styling.color}>{styling.label}</Badge>
      )
    }
  },
  {
    accessorKey: "performedBy",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-left hover:bg-transparent hover:text-black"
        >
          Performed By
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "notes",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-left hover:bg-transparent hover:text-black"
        >
          Notes
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      )
    },
  }

]
