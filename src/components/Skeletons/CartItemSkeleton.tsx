import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";

export default function CartItemSkeleton() {
  return (
    <>
      {Array.from({ length: 3 }).map((_, index) => (
        <TableRow
          key={index}
          className="grid grid-cols-[39.15%_17.29%_25.77%_14.79%_3%] items-center"
        >
          <TableCell className="pr-8 py-5 pl-0">
            <div className="flex items-center gap-5">
              <Skeleton className="w-[125px] h-[125px] rounded-md" />
              <Skeleton className="h-5 w-[60%]" />
            </div>
          </TableCell>

          <TableCell className="pr-5 py-5 pl-0">
            <Skeleton className="h-5 w-16" />
          </TableCell>

          <TableCell className="pr-5 py-5 pl-0">
            <Skeleton className="h-9 w-[150px] rounded-md" />
          </TableCell>

          <TableCell className="pr-5 py-5 pl-0">
            <Skeleton className="h-5 w-16" />
          </TableCell>

          <TableCell className="p-0">
            <Skeleton className="h-5 w-5 rounded-sm" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}