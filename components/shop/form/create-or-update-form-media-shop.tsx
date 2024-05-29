import { CreateOrUpdateOneProductAPI } from '@/api-site/product';
import { SwitchInput } from '@/components/ui-setting/ant';
import { ProductFormModel, arrayWhoCanSees } from '@/types/product';
import {
  AlertDangerNotification,
  AlertSuccessNotification,
} from '@/utils/alert-notification';
import { filterImageAndFile } from '@/utils/utils';
import { UploadOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import { MoveLeftIcon } from 'lucide-react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { useUploadItem } from '../../hooks';
import { useReactHookForm } from '../../hooks/use-react-hook-form';
import { ButtonInput, ReactQuillInput } from '../../ui-setting';
import { SelectInput, TextAreaInput, TextInput } from '../../ui-setting/shadcn';
import { Label } from '../../ui/label';
import { useAuth } from '../../util/context-user';

const { Dragger } = Upload;

type Props = {
  product?: any;
  uploadImages?: any;
  uploadFiles?: any;
  refetch?: any;
};

const schema = yup.object({
  title: yup.string().required(),
  price: yup.number().required(),
  messageAfterPayment: yup.string().nullable(),
});

const CreateOrUpdateFormMediaShop = ({
  product,
  uploadImages,
  uploadFiles,
  refetch,
}: Props) => {
  const { profile } = useAuth() as any;
  const { push, back } = useRouter();
  const { fileList, imageList, handleImageChange, handleFileChange } =
    useUploadItem({ uploadFiles, uploadImages });

  const {
    watch,
    control,
    setValue,
    handleSubmit,
    errors,
    loading,
    setLoading,
    hasErrors,
    setHasErrors,
  } = useReactHookForm({ schema });

  const watchPrice = watch('price', '');
  const watchEnableVisibility = watch('enableVisibility', true);
  const watchProductType = watch('productType', 'PHYSICAL');

  useEffect(() => {
    if (product) {
      const fields = ['title', 'price', 'description', 'messageAfterPayment'];
      fields?.forEach((field: any) => setValue(field, product[field]));
    }
  }, [product, uploadFiles, uploadImages, setValue]);

  const { mutateAsync: saveMutation } = CreateOrUpdateOneProductAPI({
    onSuccess: () => {
      setHasErrors(false);
      setLoading(false);
    },
    onError: (error?: any) => {
      setHasErrors(true);
      setHasErrors(error.response.data.message);
    },
  });

  const onSubmit: SubmitHandler<ProductFormModel> = async (
    data: ProductFormModel,
  ) => {
    setLoading(true);
    setHasErrors(undefined);
    try {
      const { newFileLists, newImageLists } = filterImageAndFile({
        fileList,
        imageList,
      });

      const payload = {
        ...data,
        imageList,
        newFileLists,
        fileList,
        newImageLists,
      };
      await saveMutation({
        ...payload,
        tab: 'MEDIA',
        model: 'PRODUCT',
        productType: 'DIGITAL',
        productId: product?.id,
      });
      if (product?.id) {
        refetch();
      } else {
        push(`/shop/extras`);
      }
      setHasErrors(false);
      setLoading(false);
      AlertSuccessNotification({
        text: `Product save successfully`,
      });
    } catch (error: any) {
      setHasErrors(true);
      setLoading(false);
      setHasErrors(error.response.data.message);
      AlertDangerNotification({
        text: `${error.response.data.message}`,
      });
    }
  };

  return (
    <>
      <ButtonInput
        type="button"
        size="sm"
        variant="ghost"
        onClick={() => {
          back();
        }}
        icon={<MoveLeftIcon className="size-4" />}
      >
        Come back
      </ButtonInput>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-2 overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-[#121212]">
          <div className="px-4 py-5">
            <h2 className="text-base font-bold dark:text-white">
              {product?.id ? 'Update' : 'Create a new '} media
            </h2>

            <div className="mt-4">
              <TextInput
                label="Name"
                control={control}
                type="text"
                name="title"
                placeholder="Name"
                errors={errors}
              />
            </div>

            <div className="mt-4 py-2">
              <div className="mx-auto max-w-max">
                <Upload
                  multiple
                  name="attachmentImages"
                  listType="picture-card"
                  fileList={imageList}
                  onChange={handleImageChange}
                  accept=".png,.jpg,.jpeg,.gif"
                  maxCount={10}
                >
                  {imageList.length >= 10 ? null : (
                    <div className="text-center dark:text-white">
                      <UploadOutlined />
                      <div style={{ marginTop: 8 }}>Upload media</div>
                    </div>
                  )}
                </Upload>
              </div>
            </div>

            <div className="mt-4">
              <TextInput
                control={control}
                label="Price*"
                name="price"
                placeholder="Price"
                errors={errors}
                required
                type="number"
                pattern="[0-9]*"
                labelHelp={
                  <Label className="ml-auto block text-start text-lg font-bold dark:text-white">
                    {watchPrice ? watchPrice : null} {profile?.currency?.code}
                  </Label>
                }
              />
            </div>

            <div className="mt-4">
              <SelectInput
                firstOptionName="Choose who can see this post?"
                label="Who can see this post?"
                control={control}
                errors={errors}
                placeholder="Select who can see this post?"
                valueType="text"
                name="whoCanSee"
                dataItem={arrayWhoCanSees}
              />
            </div>

            <div className="mt-2">
              <ReactQuillInput
                control={control}
                label="Description"
                name="description"
                placeholder="Write description product"
                errors={errors}
              />
              <span className="text-sm font-medium text-gray-400">
                {`Provide a full description of the item that you are selling.`}
              </span>
            </div>

            <div className="mt-4">
              <TextAreaInput
                control={control}
                label="Confirmation message"
                name="messageAfterPayment"
                placeholder="Success page confirmation"
                errors={errors}
              />
              <span className="text-sm font-medium text-gray-400">
                {`Buyers will see this message after payment. Use this to thank them, to give instructions or to give rewards.`}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-5">
              <div className="sm:flex sm:items-center sm:justify-between sm:space-x-5">
                <div className="flex min-w-0 flex-1 items-center">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold dark:text-white">
                      Product {watchEnableVisibility ? 'visible' : 'invisible'}
                    </p>
                    <p className="mt-1 text-sm font-medium text-gray-500">
                      Make the product{' '}
                      {watchEnableVisibility ? 'visible' : 'invisible'} to the
                      public
                    </p>
                  </div>
                </div>

                <SwitchInput
                  control={control}
                  defaultValue={watchEnableVisibility}
                  name="enableVisibility"
                  label=""
                />
              </div>
            </div>

            <div className="my-4 flex items-center space-x-4">
              {/* <ButtonInput
                type="button"
                className="w-full"
                size="lg"
                variant="outline"
                onClick={() => back()}
              >
                Cancel
              </ButtonInput> */}
              <ButtonInput
                type="submit"
                className="w-full"
                size="lg"
                variant="info"
                loading={loading}
              >
                Save {watchEnableVisibility && 'and Publish'}
              </ButtonInput>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export { CreateOrUpdateFormMediaShop };
