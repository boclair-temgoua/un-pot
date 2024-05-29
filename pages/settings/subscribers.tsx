import { GetInfiniteFollowersAPI } from '@/api-site/follow';
import { useInputState } from '@/components/hooks/use-input-state';
import { LayoutDashboard } from '@/components/layouts/dashboard';
import { HorizontalNavSetting } from '@/components/setting/horizontal-nav-setting';
import { ListFollowers } from '@/components/setting/list-followers';
import { ButtonLoadMore, SearchInput } from '@/components/ui-setting';
import { LoadingFile } from '@/components/ui-setting/ant';
import { ErrorFile } from '@/components/ui-setting/ant/error-file';
import { PrivateComponent } from '@/components/util/private-component';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const Subscribers = () => {
  const { ref, inView } = useInView();
  const { search, handleSetSearch } = useInputState();

  const {
    isLoading: isLoadingFollowers,
    isError: isErrorFollowers,
    data: dataFollowers,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetInfiniteFollowersAPI({
    take: 10,
    sort: 'DESC',
    search,
  });

  const dataTableSubscribers = isLoadingFollowers ? (
    <LoadingFile />
  ) : isErrorFollowers ? (
    <ErrorFile title="404" description="Error find data please try again..." />
  ) : Number(dataFollowers?.pages[0]?.data?.total) <= 0 ? (
    ''
  ) : (
    dataFollowers?.pages
      .flatMap((page: any) => page?.data?.value)
      .map((item, index) => (
        <ListFollowers item={item} key={index} index={index} />
      ))
  );

  useEffect(() => {
    let fetching = false;
    if (inView && hasNextPage) {
      fetchNextPage();
    }
    const onScroll = async (event: any) => {
      const { scrollHeight, scrollTop, clientHeight } =
        event.target.scrollingElement;

      if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.5) {
        fetching = true;
        if (hasNextPage) await fetchNextPage();
        fetching = false;
      }
    };

    document.addEventListener('scroll', onScroll);
    return () => {
      document.removeEventListener('scroll', onScroll);
    };
  }, [fetchNextPage, hasNextPage, inView]);

  return (
    <>
      <LayoutDashboard title={'Subscribers'}>
        <div className="mx-auto max-w-5xl py-6">
          <div className="mx-auto mt-8 px-4 sm:px-6 md:px-8">
            <HorizontalNavSetting />

            <div className="flow-root">
              <div className="mt-8 overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-[#121212]">
                <div className="px-4 py-8">
                  <div className="sm:flex sm:items-center sm:justify-between">
                    <div className="mt-4 sm:mt-0">Subscribers</div>
                    <div className="mt-4 sm:mt-0">
                      <SearchInput
                        placeholder="Search by email, name"
                        onChange={handleSetSearch}
                      />
                    </div>
                  </div>

                  <div className="divide-y divide-gray-200 dark:divide-gray-800">
                    {dataTableSubscribers}
                  </div>
                </div>

                {hasNextPage && (
                  <div className="mx-auto mt-4 justify-center text-center">
                    <ButtonLoadMore
                      ref={ref}
                      isFetchingNextPage={isFetchingNextPage}
                      onClick={() => fetchNextPage()}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default PrivateComponent(Subscribers);
