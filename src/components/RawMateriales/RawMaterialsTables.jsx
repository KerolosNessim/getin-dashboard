
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { getMaterialsCategories } from "@/api/materials"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useQuery } from "@tanstack/react-query"
import { Search } from "lucide-react"
import { useState } from "react"
import { Input } from "../ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { DataTablePagination } from "./TablePagination"



export function DataTable({
  columns,
  data,
}) {
  const [sorting, setSorting] = useState([])
  const [columnFilters, setColumnFilters] = useState([])
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
  })
  const { data: matrialsCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: getMaterialsCategories
  })

  const categories = [
    { value: 'all', label: 'All Categories' },
    ...(matrialsCategories?.map((cat) => ({ value: cat.name, label: cat.name })) || []),
  ];
  const status = data?.map((item) => item.status)
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  return (
    <div className="space-y-4">
      {/* Filters Section */}
      <div className="bg-white p-4 rounded-xl border border-main-green/20 shadow-sm flex flex-wrap gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-4 items-center flex-1">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Filter name..."
              value={(table.getColumn("name")?.getFilterValue() ?? "")}
              onChange={(event) =>
                table.getColumn("name")?.setFilterValue(event.target.value)
              }
              className="pl-9 border-main-green/30 focus:border-main-green"
            />
          </div>

          <Select
            value={categoryFilter}
            onValueChange={(value) => {
              setCategoryFilter(value);
              table.getColumn("category_name")?.setFilterValue(value === "all" ? undefined : value);
            }}
          >
            <SelectTrigger className="w-[180px] border-main-green/30">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={statusFilter}
            onValueChange={(value) => {
              setStatusFilter(value);
              table.getColumn("status")?.setFilterValue(value === "all" ? undefined : value);
            }}
          >
            <SelectTrigger className="w-[180px] border-main-green/30">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem key="all" value="all">
                All Status
              </SelectItem>
              {status.map((stat) => (
                <SelectItem key={stat} value={stat}>
                  {stat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="overflow-hidden rounded-md border ">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-main-green hover:bg-main-green ">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-main-gold">

                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} >

                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  )
}