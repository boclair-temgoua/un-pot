/* eslint-disable jsx-a11y/anchor-is-valid */
import { GetInfiniteProductsAPI } from '@/api-site/product';
import { useInView } from 'react-intersection-observer';
import { ButtonLoadMore } from '../ui-setting';
import { ErrorFile } from '../ui-setting/ant/error-file';
import { LoadingFile } from '../ui-setting/ant/loading-file';
import { ListPublicShop } from './list-public-shop';

type Props = {
  organizationId: string;
};

export function PublicShop(props: Props) {
  const { organizationId } = props;
  const { ref, inView } = useInView();

  const {
    isLoading: isLoadingPosts,
    isError: isErrorPosts,
    data: dataPosts,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetInfiniteProductsAPI({
    take: 10,
    sort: 'DESC',
    organizationId,
    status: 'ACTIVE',
    modelIds: ['PRODUCT'],
    enableVisibility: 'TRUE',
  });

  return (
    <>
      {isLoadingPosts ? (
        <LoadingFile />
      ) : isErrorPosts ? (
        <ErrorFile title="404" description="Error find data please try again" />
      ) : Number(dataPosts?.pages[0]?.data?.total) <= 0 ? (
        ''
      ) : (
        dataPosts?.pages
          .flatMap((page: any) => page?.data?.value)
          .map((item, index) => <ListPublicShop item={item} key={index} />)
      )}

      <div className="mx-auto mt-6 justify-center text-center">
        {hasNextPage && (
          <ButtonLoadMore
            ref={ref}
            isFetchingNextPage={isFetchingNextPage}
            onClick={() => fetchNextPage()}
          />
        )}
      </div>
    </>
  );
}
