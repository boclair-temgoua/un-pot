import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Select,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  NumberInput,
  ReactQuillInput,
  TextAreaInput,
  TextInput,
} from "../util/form";
import { ButtonInput } from "../templates/button-input";
import {
  AlertDangerNotification,
  AlertSuccessNotification,
} from "@/utils/alert-notification";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { SwitchInput } from "../util/form/switch-input";
import { ButtonCancelInput } from "../templates/button-cancel-input";
import { GetAllDiscountsAPI } from "@/api/discount";
import { SelectDiscountSearchInput } from "../discount/select-discount-search-input";
import Link from "next/link";
import { CommissionFormModel } from "@/types/commission";
import { CreateOrUpdateOneCommissionAPI } from "@/api/commision";
import { useRouter } from "next/router";

const { Option } = Select;

type Props = {
  commission?: any;
  uploadImages?: any;
  uploadFiles?: any;
};

const schema = yup.object({
  title: yup.string().required(),
  limitSlot: yup.number().nullable(),
  urlMedia: yup.string().url().nullable(),
  price: yup.number().required(),
  messageAfterPurchase: yup.string().nullable(),
  description: yup.string().nullable(),
  discountId: yup.string().when("isDiscount", (isDiscount, schema) => {
    if (isDiscount[0] === true) return schema.required("discount required");
    return schema.nullable();
  }),
});

const CreateOrUpdateFormCommission: React.FC<Props> = ({
  commission,
  uploadImages,
  uploadFiles,
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [hasErrors, setHasErrors] = useState<boolean | string | undefined>(
    undefined
  );

  const [fileList, setFileList] = useState<UploadFile[]>(uploadFiles ?? []);
  const [imageList, setImageList] = useState<UploadFile[]>(uploadImages ?? []);

  const {
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const watchIsLimitSlot = watch("isLimitSlot", false);
  const watchEnableDiscount = watch("enableDiscount", false);

  const { data: dataDiscounts } = GetAllDiscountsAPI();
  const discounts: any = dataDiscounts?.data;

  useEffect(() => {
    if (commission) {
      const fields = [
        "title",
        "price",
        "urlMedia",
        "isLimitSlot",
        "limitSlot",
        "description",
        "moreDescription",
        "isChooseQuantity",
        "enableDiscount",
        "discountId",
        "messageAfterPurchase",
      ];
      fields?.forEach((field: any) => setValue(field, commission[field]));
    }
  }, [commission, setValue]);

  const saveMutation = CreateOrUpdateOneCommissionAPI({
    onSuccess: () => {
      setHasErrors(false);
      setLoading(false);
    },
    onError: (error?: any) => {
      setHasErrors(true);
      setHasErrors(error.response.data.message);
    },
  });

  const onSubmit: SubmitHandler<CommissionFormModel> = async (
    data: CommissionFormModel
  ) => {
    setLoading(true);
    setHasErrors(undefined);
    try {

      const payload = { ...data };
      await saveMutation.mutateAsync({
        ...payload,
        commissionId: commission?.id,
      });
      setHasErrors(false);
      setLoading(false);
      AlertSuccessNotification({
        text: `Commission save successfully`,
        gravity: "top",
        className: "info",
        position: "center",
      });
    } catch (error: any) {
      setHasErrors(true);
      setLoading(false);
      setHasErrors(error.response.data.message);
      AlertDangerNotification({
        text: `${error.response.data.message}`,
        gravity: "top",
        className: "info",
        position: "center",
      });
    }
  };


  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-8 overflow-hidden bg-white border border-gray-200">
          <div className="px-4 py-5">
            <h2 className="text-base font-bold text-gray-900">
              {commission?.id ? "Update" : "Create a new"} commission
            </h2>

            <div className="grid grid-cols-1 mt-2 gap-y-5 gap-x-6">
              <div className="mt-2">
                <TextInput
                  label="Name*"
                  control={control}
                  type="text"
                  name="title"
                  placeholder="e.g. black and white sketch"
                  errors={errors}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 mt-2 gap-y-5 gap-x-6">
              <div className="mb-2">
                <NumberInput
                  control={control}
                  label="Price*"
                  type="number"
                  name="price"
                  placeholder="0"
                  errors={errors}
                  required
                  prefix={"€"}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 mt-4 gap-y-5 gap-x-6">
              <div className="mb-4">
                <Controller
                  name="attachment"
                  control={control}
                  render={({ field: { onChange } }) => (
                    <>
                      <div className="text-center justify-center mx-auto">
                        <Upload
                          name="attachment"
                          listType="picture"
                          maxCount={1}
                          className="upload-list-inline"
                          onChange={onChange}
                          accept=".png,.jpg,.jpeg"
                        >
                          <Button icon={<UploadOutlined />}>
                            Click to Upload
                          </Button>
                        </Upload>
                      </div>
                    </>
                  )}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 mt-2 gap-y-5 gap-x-6">
              <div className="mt-2">
                <ReactQuillInput
                  control={control}
                  label="Description*"
                  name="description"
                  placeholder="Write description"
                  errors={errors}
                />
                <span className="text-sm font-medium text-gray-600">
                  {`Describe in detail what buyers will receive when they make a purchase.`}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 mt-2 gap-y-5 gap-x-6">
              <div className="mt-2">
                <TextInput
                  label="Embed Media (optional)"
                  control={control}
                  type="text"
                  name="urlMedia"
                  placeholder="e.g. https://youtube.com/watch?v=abc123"
                  errors={errors}
                />
                <span className="text-sm font-medium text-gray-600">
                  {`Add a preview video, audio or other content to showcase your product to potential buyers`}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 mt-2 gap-y-5 gap-x-6">
              <div className="mt-2">
                <TextAreaInput
                  row={3}
                  control={control}
                  label="Confirmation message"
                  name="messageAfterPurchase"
                  placeholder="Success page confirmation"
                  errors={errors}
                />
                <span className="text-sm font-medium text-gray-600">
                  {`Buyers will see this message after payment. Use this to thank them, to give instructions or to give rewards.`}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 mt-2 gap-y-5 gap-x-6">
              <div className="mt-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Advanced settings
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 mt-2 gap-y-5 gap-x-6">


              <div className="sm:flex sm:items-center sm:justify-between sm:space-x-5">
                <div className="flex items-center flex-1 min-w-0">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900">
                      {" "}
                      Limit slots (optional){" "}
                    </p>
                    <p className="mt-1 text-sm font-medium text-gray-500">
                      A limited number of slots creates a sense of urgency and
                      also saves you from burn-out.
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 sm:space-x-6 pl-14 sm:pl-0 sm:justify-end sm:mt-0">
                  <button
                    type="button"
                    title=""
                    className="text-sm font-medium text-gray-400 transition-all duration-200 hover:text-gray-900"
                  >
                    {" "}
                  </button>
                  <div className="relative inline-flex flex-shrink-0 h-6 transition-all duration-200 ease-in-out bg-white border border-gray-200 rounded-full cursor-pointer w-11 focus:outline-none">
                    <SwitchInput
                      control={control}
                      name="isLimitSlot"
                      label=""
                    />
                  </div>
                </div>
              </div>
              {watchIsLimitSlot ? (
                <div className="mb-1">
                  <NumberInput
                    control={control}
                    label=""
                    type="number"
                    name="limitSlot"
                    placeholder="10"
                    errors={errors}
                    required
                  />
                </div>
              ) : null}

              <div className="sm:flex sm:items-center sm:justify-between sm:space-x-5">
                <div className="flex items-center flex-1 min-w-0">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900">
                      {" "}
                      Special price for members{" "}
                    </p>
                    <p className="mt-1 text-sm font-medium text-gray-500">
                      Offer a discounted extra price to attract new members and
                      to keep your current members engaged.
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 sm:space-x-6 pl-14 sm:pl-0 sm:justify-end sm:mt-0">
                  <button
                    type="button"
                    title=""
                    className="text-sm font-medium text-gray-400 transition-all duration-200 hover:text-gray-900"
                  >
                    {" "}
                  </button>
                  <div className="relative inline-flex flex-shrink-0 h-6 transition-all duration-200 ease-in-out bg-white border border-gray-200 rounded-full cursor-pointer w-11 focus:outline-none">
                    <SwitchInput
                      control={control}
                      name="allowChooseInventory"
                      label=""
                    />
                  </div>
                </div>
              </div>
              <div className="sm:flex sm:items-center sm:justify-between sm:space-x-5">
                <div className="flex items-center flex-1 min-w-0">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900">
                      {" "}
                      Allow buyer to choose a quantity{" "}
                    </p>
                    <p className="mt-1 text-sm font-medium text-gray-500">
                      Your supporters will be able to select the desired
                      quantity of this item. You will receive payment based on
                      the quantity they choose multiplied by your set price.
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 sm:space-x-6 pl-14 sm:pl-0 sm:justify-end sm:mt-0">
                  <button
                    type="button"
                    title=""
                    className="text-sm font-medium text-gray-400 transition-all duration-200 hover:text-gray-900"
                  >
                    {" "}
                  </button>
                  <div className="relative inline-flex flex-shrink-0 h-6 transition-all duration-200 ease-in-out bg-white border border-gray-200 rounded-full cursor-pointer w-11 focus:outline-none">
                    <SwitchInput
                      control={control}
                      name="isChooseQuantity"
                      label=""
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center mt-4 mb-4 space-x-4">
              <ButtonCancelInput
                shape="default"
                size="large"
                loading={loading}
                onClick={() => router.back()}
              >
                Cancel
              </ButtonCancelInput>
              <ButtonInput
                minW="fit"
                shape="default"
                type="submit"
                size="large"
                loading={loading}
                color="indigo"
              >
                Publish
              </ButtonInput>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export { CreateOrUpdateFormCommission };
