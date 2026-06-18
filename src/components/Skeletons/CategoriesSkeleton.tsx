export default function CategoriesSkeleton() {
  return (
    <>
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="flex justify-center items-center flex-col px-4 mb-5"
        >
          <div className="w-[135px] h-[135px] rounded-full bg-gray-200 animate-pulse" />

          <div className="w-[100px] h-5 mt-5 rounded bg-gray-200 animate-pulse" />
        </div>
      ))}
    </>
  );
}
