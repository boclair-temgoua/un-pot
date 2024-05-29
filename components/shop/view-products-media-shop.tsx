/* eslint-disable jsx-a11y/anchor-is-valid */
import { HtmlParser } from '@/utils/html-parser';
import { useRouter } from 'next/router';
import 'react-h5-audio-player/lib/styles.css';
import { ButtonInput, CopyShareLink } from '../ui-setting';

import { CreateOrUpdateOneCartAPI } from '@/api-site/cart';
import { ProductModel } from '@/types/product';
import { AlertDangerNotification, formatePrice } from '@/utils';
import { LockKeyholeIcon, ShareIcon } from 'lucide-react';
import ReactPlayer from 'react-player';
import { useInputState } from '../hooks';
import { ListCarouselProductUpload } from './list-carousel-product-upload';

type Props = {
  item: ProductModel;
};

const ViewProductsMediaShop = ({ item }: Props) => {
  const { query, pathname, push } = useRouter();
  const { linkHref, isOpen, setIsOpen, loading, setLoading, userStorage } =
    useInputState();

  const { mutateAsync: saveMutation } = CreateOrUpdateOneCartAPI({
    onSuccess: () => {},
    onError: (error?: any) => {},
  });

  const addToCart = async (itemCard: any) => {
    try {
      setLoading(true);
      if (userStorage?.id) {
        push(`/checkouts/${item?.id}/product`);
      } else {
        push(`/login${pathname ? `?redirect=${linkHref}` : ''}`);
      }
    } catch (error: any) {
      setLoading(false);
      AlertDangerNotification({
        text: `${error.response.data.message}`,
      });
    }
  };

  return (
    <>
      <div
        key={item?.id}
        className="mt-8 overflow-hidden rounded-lg bg-white dark:bg-[#121212]"
      >
        <div className="p-8 sm:px-8 sm:py-7">
          {item?.uploadsImages?.length > 0 ? (
            <div className="group relative mx-auto mt-2 justify-center text-center">
              {/* <ListCarouselUpload
                uploads={item?.uploadsImages}
                folder="product"
                height={400}
                className={`object-cover`}
              /> */}

              <ListCarouselProductUpload
                product={item}
                uploads={item?.uploadsImages}
                folder="product"
                height={400}
                className={`object-cover blur-3xl transition-all duration-200 group-hover:scale-110`}
                // className={`object-cover ${
                //   item?.whoCanSee === 'MEMBERSHIP' &&
                //   item?.isValidSubscribe !== 1
                //     ? 'blur-xl'
                //     : ''
                // }`}
              />
            </div>
          ) : null}

          <div className="mx-auto mt-4 justify-center text-center">
            <ButtonInput
              type="button"
              variant="primary"
              className="w-full"
              size="lg"
              onClick={() => {
                addToCart(item);
              }}
              loading={loading}
              icon={<LockKeyholeIcon className="mr-2 size-6" />}
            >
              Unlock media
            </ButtonInput>
          </div>

          {item?.title ? (
            <div className="mt-2 text-xl font-bold">{item?.title ?? ''}</div>
          ) : null}

          <div className="relative mt-4 shrink-0 cursor-pointer">
            <div className="flex items-center">
              <div className="flex shrink-0 items-center font-bold">
                <p className="text-2xl">
                  {formatePrice({
                    currency: `${item?.currency?.code}`,
                    value: Number(item?.priceDiscount ?? 0),
                    isDivide: false,
                  })}
                </p>

                {item?.enableDiscount ? (
                  <>
                    <p className="ml-2 text-xl text-red-500">
                      <del>
                        {formatePrice({
                          currency: `${item?.currency?.code}`,
                          value: Number(item?.price ?? 0),
                          isDivide: false,
                        })}
                        {item?.price ?? ''}
                      </del>
                    </p>
                  </>
                ) : null}
              </div>

              <div className="ml-auto">
                <CopyShareLink
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  link={`${process.env.NEXT_PUBLIC_SITE}/shop/${item?.slug}`}
                  buttonDialog={
                    <ButtonInput
                      className="ml-1.5 text-gray-600 hover:text-gray-400 focus:ring-gray-900"
                      variant="ghost"
                      size="icon"
                      type="button"
                      icon={<ShareIcon className="size-6" />}
                    />
                  }
                />
              </div>
            </div>
          </div>

          {item?.description ? (
            <div
              className={`group relative text-sm font-normal text-gray-600 dark:text-gray-300`}
            >
              <span className={`ql-editor`}>
                <HtmlParser html={String(item?.description ?? '')} />
              </span>
            </div>
          ) : null}

          {item?.urlMedia ? (
            <div className={`mx-auto mt-1`}>
              <ReactPlayer
                className={`mr-auto`}
                url={item?.urlMedia}
                height="350px"
                width="100%"
                controls
              />
            </div>
          ) : null}

          {/* <div className="mt-2 flex items-center font-medium text-gray-600">
         
          </div> */}

          {/* <ListComments
            model="PRODUCT"
            modelIds={['PRODUCT']}
            take={6}
            userVisitorId={userStorage?.id}
            organizationId={item?.organizationId}
            productId={item?.id}
          /> */}
        </div>
      </div>
    </>
  );
};

export { ViewProductsMediaShop };
