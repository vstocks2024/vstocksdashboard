"use client";

import { ColumnDef,
  getPaginationRowModel,
 } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DeleteButton from "./DeleteButton";



// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Vectors = {
  id: string;
  name: string;
  description: string;
  likes: number;
  shares: number;
  format: string;
  width:number;
  height:number;
  license:string;
  orientation:string;
  createdAt: Date;
  updatedAt: Date;
};

export const columns: ColumnDef<Vectors>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "Vector Id",
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex flex-row items-center justify-start bg-transparent hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "likes",
    header: "Likes",
  },
  {
    accessorKey: "shares",
    header: "Shared",
  },
  {
    accessorKey: "format",
    header: "Format",
  },
  {
    accessorKey: "width",
    header: "Width",
  },
  {
    accessorKey: "height",
    header: "Height",
  },
  {
    accessorKey: "license",
    header: "License",
  },
  {
    accessorKey: "orientation",
    header: "Orientation",
  },
  {
    accessorKey: "createdAt",
    header: "Created",
  },
  {
    accessorKey: "updatedAt",
    header: "Updated",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const vector = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel></DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(vector.id)}
            >
              Copy Vector ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link
                href={{
                  pathname: "/vectors/edit",
                  query: { vector: `${vector.id}` },
                  
                }}
              >
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
            <Button variant={"default"} className="w-full bg-green-500 text-white hover:bg-green-400" >Download</Button>
              </DropdownMenuItem>
            <DropdownMenuItem ><DeleteButton vector_id={vector.id}/></DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
