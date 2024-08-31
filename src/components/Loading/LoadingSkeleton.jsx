import { Skeleton } from "../../components/ui/skeleton";

const LoadingSkeleton = () => {
  return (
    <article className="relative flex w-full flex-col xl:mx-auto pt-10 px-4 min-h-full">
      <div className="relative mx-auto w-full post-template post-cards">
        <Skeleton className="w-full h-10 lg:w-[16.25rem] lg:max-w-[19.5rem] xl:w-full xl:max-w-[25rem] rounded-xl" />
        <div className="grid mt-8 gap-8 grid-cols-auto-fit-minmax !gap-x-8">
          <Skeleton className="min-w-[100px] flex-1 min-h-card snap-start max-h-cardLarge h-full rounded-2xl" />
          <Skeleton className="min-w-[100px] flex-1 min-h-card snap-start max-h-cardLarge h-full rounded-2xl" />
          <Skeleton className="min-w-[100px] flex-1 min-h-card snap-start max-h-cardLarge h-full rounded-2xl" />
        </div>
      </div>
    </article>
  );
};
export default LoadingSkeleton;
