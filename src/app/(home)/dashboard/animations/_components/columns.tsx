"use client";

import { ColumnDef, getPaginationRowModel } from "@tanstack/react-table";
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
import EditAnimationButton from "./EditAnimationButton";
import DeleteAnimationButton from "./DeleteAnimationButton";

export type Animation_Url = {
  animation_id: string;
  name: string;
  description: string;
  animation_data: JSON[];
  likes: number;
  shares: number;
  format: string;
  license: string;
  orientation: string;
  thumbnail_url: string;
  createdAt: Date;
  updatedAt: Date;
};
export const columns: ColumnDef<Animation_Url>[] = [
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
    accessorKey: "animation_id",
    header: "Animation Id",
  },
  {
    accessorKey: "name",
    header: "Name",
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
    header: "Shares",
  },
  {
    accessorKey: "format",
    header: "Format",
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
      const animation_url = row.original;

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
              onClick={() => navigator.clipboard.writeText(animation_url.animation_id)}
            >
              Copy Vector ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <EditAnimationButton animation_id={animation_url.animation_id} />
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Button
              asChild
                variant={"default"}
                className="w-full bg-green-500 text-white hover:bg-green-400"
              >
                <a href={`${animation_url.thumbnail_url}`} download="newthumbnail">
                Download
                </a>
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <DeleteAnimationButton animation_id={animation_url.animation_id} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
