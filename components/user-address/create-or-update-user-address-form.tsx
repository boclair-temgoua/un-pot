import { GetAllCountiesAPI } from '@/api-site/profile';
import { CreateOrUpdateOneUserAddressAPI } from '@/api-site/user-address';
import { UserAddressFormModel } from '@/types/user-address';
import { AlertDangerNotification } from '@/utils/alert-notification';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { useReactHookForm } from '../hooks/use-react-hook-form';
import { ButtonInput } from '../ui-setting';
import { SelectSearchInput } from '../ui-setting/ant';
import { TextInput } from '../ui-setting/shadcn';

type Props = {
  userAddress?: any;
  isEdit: boolean;
  setIsEdit: any;
};

const schema = yup.object({
  firstName: yup.string().required('first name is a required field'),
  lastName: yup.string().required('last name is a required field'),
  street1: yup.string().required('address is a required field'),
  city: yup.string().required('state is a required field'),
  country: yup.string().required('country is a required field'),
  cap: yup.string().required('cap is a required field'),
});

const CreateOrUpdateUserAddressForm = ({
  userAddress,
  setIsEdit,
  isEdit,
}: Props) => {
  const { back } = useRouter();
  const {
    control,
    setValue,
    handleSubmit,
    errors,
    loading,
    setLoading,
    hasErrors,
    setHasErrors,
  } = useReactHookForm({ schema });

  const { data: countries } = GetAllCountiesAPI();
  useEffect(() => {
    if (userAddress) {
      const fields = [
        'country',
        'url',
        'phone',
        'cap',
        'city',
        'firstName',
        'lastName',
        'street1',
        'street2',
        'description',
      ];
      fields?.forEach((field: any) => setValue(field, userAddress[field]));
    }
  }, [userAddress, setValue]);

  const { mutateAsync: saveMutation } = CreateOrUpdateOneUserAddressAPI({
    onSuccess: () => {
      setHasErrors(false);
      setLoading(false);
    },
    onError: (error?: any) => {
      setHasErrors(true);
      setHasErrors(error.response.data.message);
    },
  });

  const onSubmit: SubmitHandler<UserAddressFormModel> = async (
    payload: UserAddressFormModel,
  ) => {
    setLoading(true);
    setHasErrors(undefined);
    try {
      await saveMutation({
        ...payload,
        userAddressId: userAddress?.id,
      });
      setHasErrors(false);
      setLoading(false);
      setIsEdit((i: boolean) => !i);
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
      {/* {!isEdit ? ( */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
          <div className="mt-2">
            <TextInput
              label="First name"
              control={control}
              type="text"
              name="firstName"
              placeholder="First name"
              errors={errors}
              disabled={isEdit}
            />
          </div>

          <div className="mt-2">
            <TextInput
              label="Last name"
              control={control}
              type="text"
              name="lastName"
              placeholder="Last name"
              errors={errors}
              disabled={isEdit}
            />
          </div>
        </div>

        <div className="mt-2">
          <SelectSearchInput
            label="Counties"
            firstOptionName="Country"
            valueType="text"
            control={control}
            errors={errors}
            placeholder="Country"
            name="country"
            dataItem={countries}
          />
        </div>

        <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
          <div className="mt-2">
            <TextInput
              label="City"
              control={control}
              type="text"
              name="city"
              placeholder="City"
              errors={errors}
              disabled={isEdit}
            />
          </div>

          <div className="mt-2">
            <TextInput
              label=" Postal code "
              control={control}
              type="text"
              name="cap"
              placeholder="Postal code "
              errors={errors}
              disabled={isEdit}
            />
          </div>
        </div>

        <div className="mt-2">
          <TextInput
            label="Phone"
            control={control}
            type="text"
            name="phone"
            placeholder="Phone"
            errors={errors}
            disabled={isEdit}
          />
        </div>
        <div className="mt-2">
          <TextInput
            label="Address line 1"
            control={control}
            type="text"
            name="street1"
            placeholder="Address line 1"
            errors={errors}
            disabled={isEdit}
          />
        </div>

        {!isEdit ? (
          <div className="mt-4 flex items-center space-x-4">
            <ButtonInput
              size="lg"
              type="submit"
              variant="info"
              className="w-full"
              loading={loading}
            >
              Continue
            </ButtonInput>
          </div>
        ) : null}
      </form>
      {/* ) : null} */}
    </>
  );
};

export { CreateOrUpdateUserAddressForm };
