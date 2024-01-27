import { CreateOrDeleteOneFollowerAPI } from '@/api-site/follow';
import { AlertDangerNotification } from '@/utils';
import React, { useState } from 'react';
import { LoginModal } from '../auth-modal/login-modal';
import { useDialog } from '../hooks/use-dialog';
import { ButtonInput } from '../ui-setting';

const CreateOrUpdateFormFollow: React.FC<{
  item?: any;
}> = ({ item }) => {
  const {
    isOpen: isOpenModalLogin,
    setIsOpen: setIsOpenModalLogin,
    userStorage,
    setLoading,
    hasErrors,
    setHasErrors,
  } = useDialog();
  const [isFollow, setIsFollow] = useState(item?.isFollow);

  // Create or Update data
  const { mutateAsync: saveMutation } = CreateOrDeleteOneFollowerAPI({
    onSuccess: () => {
      setHasErrors(false);
      setLoading(false);
    },
    onError: (error?: any) => {
      setHasErrors(true);
      setHasErrors(error.response.data.message);
    },
  });

  const followItem = async (item: any) => {
    try {
      {
        isFollow
          ? await saveMutation({
              followerId: item?.profile?.userId,
              action: 'DELETE',
            })
          : await saveMutation({
              followerId: item?.id,
              action: 'CREATE',
            });
      }
    } catch (error: any) {
      AlertDangerNotification({
        text: `${error.response.data.message}`,
        gravity: 'top',
        className: 'info',
        position: 'center',
      });
    }
  };

  return (
    <>
      {userStorage?.id ? (
        <>
          <ButtonInput
            type="button"
            variant={isFollow ? 'outline' : 'danger'}
            onClick={() => {
              followItem(item), setIsFollow((i: any) => !i);
            }}
          >
            {isFollow ? 'UnFollow' : 'Follow'}
          </ButtonInput>
        </>
      ) : (
        <ButtonInput
          type="button"
          variant="danger"
          onClick={() => {
            setIsOpenModalLogin(true);
          }}
        >
          Follow
        </ButtonInput>
      )}

      <LoginModal isOpen={isOpenModalLogin} setIsOpen={setIsOpenModalLogin} />
    </>
  );
};

export { CreateOrUpdateFormFollow };
