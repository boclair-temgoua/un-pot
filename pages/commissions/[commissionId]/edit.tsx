import { GetOneProductAPI } from '@/api-site/product';
import { GetUploadsAPI } from '@/api-site/upload';
import { CreateOrUpdateFormCommission } from '@/components/commission/create-or-update-form-commission';
import { useInputState } from '@/components/hooks';
import { LayoutDashboard } from '@/components/layouts/dashboard';
import { ErrorFile } from '@/components/ui-setting/ant/error-file';
import { LoadingFile } from '@/components/ui-setting/ant/loading-file';
import { PrivateComponent } from '@/components/util/private-component';
import { useRouter } from 'next/router';

const CommissionEdit = () => {
  const { userStorage: user } = useInputState();
  const { query } = useRouter();
  const productId = String(query?.commissionId);

  const {
    data: product,
    isError: isErrorProduct,
    isLoading: isLoadingProduct,
  } = GetOneProductAPI({
    productId,
    organizationId: user?.organizationId,
  });

  const {
    isError: isErrorImages,
    isLoading: isLoadingImages,
    data: uploadImages,
  } = GetUploadsAPI({
    organizationId: product?.organizationId,
    model: 'COMMISSION',
    uploadableId: productId,
    uploadType: 'image',
  });

  const dataTableCommission =
    isLoadingImages || isLoadingProduct ? (
      <LoadingFile />
    ) : isErrorImages || isErrorProduct ? (
      <ErrorFile
        title="404"
        description="Error find data please try again..."
      />
    ) : (
      <>
        {user?.organizationId && product?.id ? (
          <CreateOrUpdateFormCommission
            product={product}
            uploadImages={uploadImages}
          />
        ) : null}
      </>
    );

  return (
    <>
      <LayoutDashboard title={`${product?.title || 'Commission'}`}>
        <div className="mx-auto max-w-4xl py-6">
          <div className="mx-auto mt-8 px-4 sm:px-6 md:px-8">
            {dataTableCommission}
          </div>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default PrivateComponent(CommissionEdit);
