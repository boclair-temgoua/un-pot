/* eslint-disable jsx-a11y/anchor-is-valid */
import { CreateOrUpdateOneCartAPI } from '@/api-site/cart';
import { ProductModel } from '@/types/product';
import { AlertDangerNotification, formatePrice } from '@/utils';
import { ReadMore } from '@/utils/read-more';
import { ShoppingCartIcon } from 'lucide-react';
import Link from 'next/link';
import { LoginModal } from '../auth/login-modal';
import { useInputState } from '../hooks';
import { ButtonInput } from '../ui-setting';
import { ListCarouselProductUpload } from './list-carousel-product-upload';

type Props = {
  item: ProductModel;
};

const ListPublicShop = ({ item }: Props) => {
  const { isOpen, setIsOpen, userStorage } = useInputState();

  const { mutateAsync: saveMutation } = CreateOrUpdateOneCartAPI({
    onSuccess: () => {},
    onError: (error?: any) => {},
  });

  const addToCart = async (itemCard: any) => {
    try {
      if (userStorage?.id) {
        await saveMutation({
          quantity: 1,
          productId: itemCard?.id,
          organizationId: itemCard?.organizationId,
        });
        // AlertSuccessNotification({
        //   text: `Product add to cart successfully`,
        // });
      } else {
        setIsOpen(true);
      }
    } catch (error: any) {
      AlertDangerNotification({
        text: `${error.response.data.message}`,
      });
    }
  };

  return (
    <>
      <div
        key={item?.id}
        className="flex flex-col overflow-hidden rounded-lg transition-all duration-300 hover:shadow-xl dark:bg-[#121212]"
      >
        {item?.uploadsImages?.length > 0 ? (
          <ListCarouselProductUpload
            product={item}
            uploads={item?.uploadsImages}
            folder="product"
            height={200}
            width="100%"
            className={`object-cover blur-xl transition-all duration-200 group-hover:scale-110`}
            // className={`object-cover ${
            //   item?.whoCanSee === 'MEMBERSHIP' &&
            //   item?.isValidSubscribe !== 1
            //     ? 'blur-xl'
            //     : ''
            // }`}
          />
        ) : null}

        <div className="flex flex-1 flex-col p-3">
          <div className="flex shrink-0 items-center font-bold">
            <p className="text-xl">
              {formatePrice({
                currency: `${item?.currency?.code}`,
                value: Number(item?.priceDiscount ?? 0),
                isDivide: false,
              })}
            </p>

            {item?.enableDiscount ? (
              <>
                <p className="ml-2 text-lg text-red-500">
                  <del>
                    {formatePrice({
                      currency: `${item?.currency?.code}`,
                      value: Number(item?.price ?? 0),
                      isDivide: false,
                    })}{' '}
                  </del>
                </p>
              </>
            ) : null}

            {/* <p
              onClick={() => {
                addToCart(item);
              }}
              className="ml-auto text-lg text-gray-900 dark:text-white cursor-pointer"
            >
              <BiCart className="h-10 w-10" />
            </p> */}

            <div className="ml-auto">
              <ButtonInput
                type="button"
                onClick={() => {
                  addToCart(item);
                }}
                variant="link"
                className="text-gray-700 dark:bg-[#121212]"
              >
                <ShoppingCartIcon className="size-8 hover:text-indigo-600" />
              </ButtonInput>
            </div>
          </div>

          <h3 className="duratin-200 mt-2 flex-1 text-sm font-bold text-gray-900 transition-all hover:text-blue-600 dark:text-white sm:text-base">
            <Link
              className="hover:text-blue-600"
              href={`/shop/${item?.slug}`}
              title={item?.title}
            >
              <ReadMore html={String(item?.title ?? '')} value={60} />
            </Link>
          </h3>
          {/* <p className="mt-2 text-base font-normal text-gray-600">
            <HtmlParser html={String(item?.description ?? '')} value={200} />
          </p> */}
          {/* <div className="sm:flex flex-col sm:items-end sm:justify-between">
            <div className="mt-2">
              <Button shape="circle" icon={<ShoppingCartOutlined />} />
            </div>
          </div> */}
        </div>
      </div>

      <LoginModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};
export { ListPublicShop };
