import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ReactQuillInput, TextInput, TextInputPassword } from "../util/form";
import { ButtonInput } from "../templates/button-input";
import { SelectSearchInput } from "../util/form/select-search-input";
import { PostFormModel, arrayWhoCanSees } from "@/types/post";
import { AlertDangerNotification, AlertSuccessNotification } from "@/utils";
import {
  CreateOrUpdateOnePostAPI,
  getCategoriesAPI,
  getOneFilePostAPI,
} from "@/api/post";
import { Avatar, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { SelectMultipleSearchInput } from "../util/form/select-multiple-search-input";
import { ButtonCancelInput } from "../templates/button-cancel-input";
import { useRouter } from "next/router";

type Props = {
  postId?: string;
  post?: any;
};

const schema = yup.object({
  title: yup.string().required(),
  description: yup.string().min(10, "minimum 3 symbols").required(),
  categories: yup.array().optional(),
});

const CreateOrUpdateFormPost: React.FC<Props> = ({ postId, post }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [hasErrors, setHasErrors] = useState<boolean | string | undefined>(
    undefined
  );
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const fetchCategories = async () => await getCategoriesAPI({ userId: "" });
  const { data: dataCategories } = useQuery(
    ["categories"],
    () => fetchCategories(),
    {
      refetchOnWindowFocus: false,
    }
  );
  const categories: any = dataCategories?.data;

  useEffect(() => {
    if (post) {
      const fields = [
        "title",
        "description",
        "whoCanSee",
        "type",
        "categories",
      ];
      fields?.forEach((field: any) => setValue(field, post[field]));
    }
  }, [post, postId, setValue]);

  // Create or Update data
  const saveMutation = CreateOrUpdateOnePostAPI({
    onSuccess: () => {
      setHasErrors(false);
      setLoading(false);
    },
    onError: (error?: any) => {
      setHasErrors(true);
      setHasErrors(error.response.data.message);
    },
  });

  const onSubmit: SubmitHandler<PostFormModel> = async (
    payload: PostFormModel
  ) => {
    setLoading(true);
    setHasErrors(undefined);
    const newPayload: PostFormModel = { ...payload, type: 'ARTICLE' }
    try {
      await saveMutation.mutateAsync({
        ...newPayload,
        postId: post?.id,
      });
      setHasErrors(false);
      setLoading(false);
      AlertSuccessNotification({
        text: "Image save successfully",
        className: "info",
        gravity: "top",
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
      <div className="border-gray-200 mt-4 lg:order-1 lg:col-span-3 xl:col-span-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flow-root">
            <div className="overflow-hidden bg-white border border-gray-200">
              <div className="px-4 py-5">
              <h2 className="text-base font-bold text-gray-900">
                  {post?.id ? "Update" : "Create a New"} Article
                </h2>

                {post?.image ? (
                  <div className="mt-2 text-center space-x-2">
                    <Avatar
                      size={200}
                      shape="square"
                      src={getOneFilePostAPI(String(post?.image))}
                      alt={post?.title}
                    />
                  </div>
                ) : null}

                <div className="mt-2">
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
                            accept=".mp3"
                          >
                            <Button icon={<UploadOutlined />}>
                              Click to Upload
                            </Button>
                          </Upload>
                        </div>
                      </>
                    )}
                  />
                  {/* {errors?.attachment && (
                                        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                                            {errors?.attachment?.message}
                                        </span>
                                    )} */}
                </div>

                <div className="mt-2">
                  <TextInput
                    control={control}
                    label="Title"
                    type="text"
                    name="title"
                    required
                    placeholder="Title"
                    errors={errors}
                  />
                </div>

                <div className="grid grid-cols-1 mt-2 sm:grid-cols-2 gap-y-5 gap-x-6">
                  <div className="mt-2">
                    <SelectSearchInput
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
                    <SelectMultipleSearchInput
                      mode="multiple"
                      label="Categories"
                      control={control}
                      errors={errors}
                      placeholder="Select categories"
                      name="categories"
                      dataItem={categories}
                    />
                    <div className="flex flex-col justify-between items-end">
                      <Button shape="default" type="link">
                        New Category
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="mt-2">
                  <ReactQuillInput
                    control={control}
                    label="Description"
                    name="description"
                    placeholder="Write description"
                    errors={errors}
                  />
                </div>

                <div className="mt-4">
                  <ButtonInput
                    shape="default"
                    type="submit"
                    size="large"
                    loading={loading}
                    color="indigo"
                  >
                    Save and Publish
                  </ButtonInput>
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
                    loading={false}
                    color="indigo"
                  >
                    Save as Draft
                  </ButtonInput>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export { CreateOrUpdateFormPost };
