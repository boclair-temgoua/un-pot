import { GetOneCartOrderAPI } from '@/api-site/cart';
import { GetOneProductAPI } from '@/api-site/product';
import { GetOneUserPublicAPI } from '@/api-site/user';
import { CartOrderFooterCart } from '@/components/cart/cart-order-footer-cart';
import { MediumFooter } from '@/components/footer/medium-footer';
import { useInputState } from '@/components/hooks';
import { LayoutUserPublicSite } from '@/components/layouts/user-public-site';
import { PublicShop } from '@/components/shop/public-shop';
import { ViewProductsMediaShop } from '@/components/shop/view-products-media-shop';
import { ProductSkeleton } from '@/components/skeleton/product-skeleton';
import { LoadingFile } from '@/components/ui-setting/ant';
import { ErrorFile } from '@/components/ui-setting/ant/error-file';
import { useRouter } from 'next/router';

const ShopUserPublic = () => {
  const { query, push } = useRouter();
  const { userStorage: userBayer, ipLocation } = useInputState();

  const {
    isLoading: isLoadingProduct,
    isError: isErrorProduct,
    data: product,
  } = GetOneProductAPI({
    enableVisibility: 'TRUE',
    buyerId: userBayer?.organizationId,
    productSlug: String(query?.productId),
  });

  const {
    isPending: isPendingUser,
    isError: isErrorUser,
    data: user,
  } = GetOneUserPublicAPI({
    username: product?.profile?.username,
    userVisitorId: userBayer?.id,
  });

  const {
    isPending: isPendingCartOrder,
    isError: isErrorCartOrder,
    data: cartOrder,
  } = GetOneCartOrderAPI({
    organizationSellerId: product?.organizationId,
  });

  return (
    <>
      <LayoutUserPublicSite title={`${product?.title || 'Shop'}`} user={user}>
        <div className="max-w-8xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="flow-root">
              {isLoadingProduct ? (
                <ProductSkeleton index={0} />
              ) : isErrorProduct ? (
                <ErrorFile
                  title="404"
                  description="Error find data please try again..."
                />
              ) : (
                <ViewProductsMediaShop item={product} />
              )}
            </div>
            <div className="flow-root">
              <div className="mt-8 overflow-hidden rounded-lg bg-white dark:bg-[#121212]">
                <div className="p-8 sm:px-8 sm:py-7">
                  <div className="grid grid-cols-1 gap-6 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8 xl:gap-3">
                    <PublicShop organizationId={product?.organizationId} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <MediumFooter />
        </div>

        {userBayer?.id && user?.id && cartOrder?.id ? (
          <CartOrderFooterCart user={user} cartOrder={cartOrder} />
        ) : null}
      </LayoutUserPublicSite>

      {isPendingUser && isPendingCartOrder ? <LoadingFile /> : null}

      {isErrorUser && isErrorCartOrder ? (
        <ErrorFile
          title="404"
          description="Error find data please try again"
          className="dark:text-white"
        />
      ) : null}
    </>
  );
};

export default ShopUserPublic;
