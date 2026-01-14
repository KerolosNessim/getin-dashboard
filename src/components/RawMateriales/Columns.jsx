import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import AdminActionDialog from "./AdminActionDialog";
import MatiralOrderDialog from "./MatiralOrderDialog";

export const RowMaterialsColumns = [
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
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <img src={row?.original?.image} alt={row?.original?.name} className="size-12 object-contain" />
          <p>
            {row?.original?.name}
          </p>
        </div>
      )
    }
  },
  {
    accessorKey: "category_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-left hover:bg-transparent hover:text-main-gold"
        >
          Category
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      )
    },
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
    accessorKey: "current_quantity",
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
    accessorKey: "min",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-left hover:bg-transparent hover:text-main-gold"
        >
          Min Quantity
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "max",
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
      let styling;
      const status = row.original.stock;
      if (status =="out_stock") {
        styling = { status: 'out_stock', label: 'Out Stock', color: 'bg-red-100 text-red-700 border-red-200' };
      } else if (status =="low_stock") {
        styling = { status: 'low_stock', label: 'Low Stock', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' };
      }
      else {
        styling = { status: 'good', label: 'Good', color: 'bg-green-100 text-green-700 border-green-200' };
      }
      return (
        <Badge className={styling.color}>{styling.label}</Badge>
      )
    }
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const selectedMaterial = row.original
      return (
        <MatiralOrderDialog selectedMaterial={selectedMaterial} />
      )
    },
  },
]
export const RequsetsColumns = [
  {
    accessorKey: "request_id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-left hover:bg-transparent hover:text-main-gold"
        >
          Request ID
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      )
    },
  },
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
    accessorKey: "quantity",
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
    accessorKey: "date",
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
      let styling = {}
      if (status === "pending") {
        styling = { status: 'pending', label: 'Pending', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' };
      } else if (status === "approved") {
        styling = { status: 'approved', label: 'Approved', color: 'bg-green-100 text-green-700 border-green-200' };
      } else if (status === "reject") {
        styling = { status: 'rejected', label: 'Rejected', color: 'bg-red-100 text-red-700 border-red-200' };
      } else if (status === 'partially_approved') {
        styling = { status: 'partially_approved', label: 'Partially Approved', color: 'bg-blue-100 text-blue-700 border-blue-200' };
      } 
      
      if(status==null) return null
      return (
        <Badge className={styling.color}>{styling.label}</Badge>
      )
    }
  },
  {
    accessorKey: "admin_response",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-left hover:bg-transparent hover:text-main-gold"
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
        <AdminActionDialog selectedRequest={selectedRequest} />
      )
    }
  }
]
export const HistoryColumns = [
  {
    accessorKey: "item_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-left hover:bg-transparent hover:text-main-gold"
        >
          Item Name
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
          className="text-left hover:bg-transparent hover:text-main-gold"
        >
          Date
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
          Quantity
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "performed_by",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-left hover:bg-transparent hover:text-main-gold"
        >
          Performed By
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
          className="text-left hover:bg-transparent hover:text-main-gold"
        >
          Type
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        <Badge className={"bg-main-green text-main-gold"}>{row.original.type}</Badge>
      )
    }
  },
  {
    accessorKey: "notes",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-left hover:bg-transparent hover:text-main-gold"
        >
          Notes
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      )
    },
  }
]
