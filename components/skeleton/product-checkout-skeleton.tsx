import { Card } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

export const ProductCheckoutSkeleton = () => {
  return (
    <>
      <div className="py-8 lg:col-span-3 xl:col-span-4">
        <div className="mx-auto justify-center text-center">
          <Card className="w-full dark:border-gray-800 dark:bg-[#04080b]">
            <div className="p-8 sm:px-6 sm:py-4">
              <div className="mx-auto mt-4 justify-center text-center">
                <Skeleton className="h-52 w-full" />
              </div>

              <div className="mt-4 flex items-center">
                <Skeleton className="h-8 w-[250px] rounded-md" />
                <Skeleton className="ml-auto h-8 w-[250px] rounded-md" />
              </div>
              <div className="mt-4 flex items-center">
                <Skeleton className="h-8 w-full" />
              </div>
              <div className="mt-4 flex items-center">
                <Skeleton className="h-8 w-full" />
              </div>
              <div className="mt-4 flex items-center">
                <Skeleton className="h-8 w-[250px] rounded-md" />
                <Skeleton className="ml-auto h-8 w-[250px] rounded-md" />
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="lg:sticky lg:top-6 lg:order-2 lg:col-span-2">
        <Card className="mt-8 w-full dark:border-gray-800 dark:bg-[#04080b]">
          <div className="p-2">
            <div className="flex items-center space-x-2">
              <Skeleton className="size-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-3 w-[220px]" />
                <Skeleton className="h-3 w-[140px]" />
              </div>
            </div>
          </div>
          <div className="p-8 sm:px-6 sm:py-4">
            <div className="mt-4 flex items-center">
              <Skeleton className="h-6 w-32 rounded-md" />
              <Skeleton className="ml-auto h-6 w-32 rounded-md" />
            </div>
            <div className="mt-4 flex items-center">
              <Skeleton className="h-8 w-full" />
            </div>
            <div className="mt-4 flex items-center">
              <Skeleton className="h-8 w-full" />
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};
