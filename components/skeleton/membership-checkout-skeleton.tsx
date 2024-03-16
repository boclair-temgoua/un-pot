import { Skeleton } from '../ui/skeleton';

export const MembershipCheckoutSkeleton = () => {
  return (
    <>
      <div className="mx-auto justify-center text-center">
        <Skeleton className="h-4 w-[200px]" />
      </div>
      <div className="mt-4 mx-auto justify-center text-center">
        <Skeleton className="h-80 w-full" />
      </div>
      <div className="mt-4 space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>

      <div className="mt-6 flex items-center font-medium text-gray-600">
        <Skeleton className="h-14 w-full" />
      </div>
    </>
  );
};
