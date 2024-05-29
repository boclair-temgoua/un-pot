import { GetOneProductAPI } from '@/api-site/product';
import { GetUploadsAPI } from '@/api-site/upload';
import { useInputState } from '@/components/hooks';
import { LayoutDashboard } from '@/components/layouts/dashboard';
import { CreateOrUpdateFormMediaShop } from '@/components/shop/form/create-or-update-form-media-shop';
import { CreateOrUpdateFormShop } from '@/components/shop/form/create-or-update-form-shop';
import { ErrorFile } from '@/components/ui-setting/ant/error-file';
import { LoadingFile } from '@/components/ui-setting/ant/loading-file';
import { PrivateComponent } from '@/components/util/private-component';
import { useRouter } from 'next/router';

const ShopEdit = () => {
  const { userStorage } = useInputState();
  const { query } = useRouter();
  const { tab } = query;
  const productId = String(query?.productId);

  const {
    data: product,
    isError: isErrorProduct,
    isLoading: isLoadingProduct,
    refetch,
  } = GetOneProductAPI({
    productId,
    organizationId: userStorage?.organizationId,
  });

  const {
    isLoading: isLoadingImageUploads,
    isError: isErrorImageUploads,
    data: uploadImages,
  } = GetUploadsAPI({
    organizationId: product?.organizationId,
    model: 'PRODUCT',
    uploadableId: productId,
    uploadType: 'image',
  });

  const {
    isLoading: isLoadingFileUploads,
    isError: isErrorFileUploads,
    data: uploadsFiles,
  } = GetUploadsAPI({
    organizationId: product?.organizationId,
    model: 'PRODUCT',
    uploadableId: productId,
    uploadType: 'file',
  });

  return (
    <>
      <LayoutDashboard title={`${product?.title || 'Shop'}`}>
        <div className="mx-auto max-w-4xl py-6">
          <div className="mx-auto mt-8 px-4 sm:px-6 md:px-8">
            {/* <HorizontalNavShop /> */}
            {isLoadingProduct ||
            isLoadingFileUploads ||
            isLoadingImageUploads ? (
              <LoadingFile />
            ) : isErrorProduct || isErrorFileUploads || isErrorImageUploads ? (
              <ErrorFile
                title="404"
                description="Error find data please try again..."
              />
            ) : (
              <>
                {tab === 'other' && product?.id ? (
                  <CreateOrUpdateFormShop
                    uploadFiles={uploadsFiles}
                    uploadImages={uploadImages}
                    product={product}
                    refetch={refetch}
                  />
                ) : null}

                {tab === 'media' && product?.id ? (
                  <CreateOrUpdateFormMediaShop
                    uploadFiles={uploadsFiles}
                    uploadImages={uploadImages}
                    product={product}
                    refetch={refetch}
                  />
                ) : null}
              </>
            )}
          </div>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default PrivateComponent(ShopEdit);
