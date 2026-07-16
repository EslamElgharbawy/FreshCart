import { ChevronRight } from "lucide-react";

export default function BreadcrumbSkeleton() {
  return (
    <section className="py-3 2xl:py-4 animate-pulse">
      <div className="flex flex-wrap items-center gap-2">
        <div className="h-4 w-12 rounded bg-gray-200" />

        <ChevronRight size={14} className="text-gray-300" />

        <div className="h-4 w-20 rounded bg-gray-200" />

        <ChevronRight size={14} className="text-gray-300" />

        <div className="h-4 w-24 rounded bg-gray-200" />

        <ChevronRight size={14} className="text-gray-300" />

        <div className="h-4 w-40 rounded bg-gray-200" />
      </div>
    </section>
  );
}
