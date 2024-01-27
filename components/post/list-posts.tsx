/* eslint-disable jsx-a11y/anchor-is-valid */
import { DeleteOnePostAPI } from '@/api-site/post';
import { PostModel, PostType } from '@/types/post';
import { AlertDangerNotification, AlertSuccessNotification } from '@/utils';
import { IconTypePost } from '@/utils/icon-type-post';
import { ReadMore } from '@/utils/read-more';
import { Tooltip } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import { AiOutlineCalendar } from 'react-icons/ai';
import { BiConversation } from 'react-icons/bi';
import { HiOutlineLockClosed } from 'react-icons/hi';
import {
  MdFavoriteBorder,
  MdOutlineDeleteOutline,
  MdOutlineModeEdit,
} from 'react-icons/md';
import { TbWorld } from 'react-icons/tb';
import { formateDateDayjs } from '../../utils/formate-date-dayjs';
import { useDialog } from '../hooks/use-dialog';
import { ButtonInput } from '../ui-setting';
import { ActionModalDialog } from '../ui-setting/shadcn';

type Props = {
  item?: PostModel;
  index: number;
};

const ListPosts: React.FC<Props> = ({ item, index }) => {
  const router = useRouter();
  const { isOpen, setIsOpen, loading, setLoading } = useDialog();

  const { mutateAsync: saveMutation } = DeleteOnePostAPI({
    onSuccess: () => {},
    onError: (error?: any) => {},
  });

  const deleteItem = async (item: any) => {
    setLoading(true);
    setIsOpen(true);
    try {
      await saveMutation({ postId: item?.id });
      AlertSuccessNotification({
        text: 'Post deleted successfully',
        className: 'info',
        gravity: 'top',
        position: 'center',
      });
      setLoading(false);
      setIsOpen(false);
    } catch (error: any) {
      setLoading(false);
      setIsOpen(true);
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
      <div key={index} className="flex items-center py-5">
        {/* <div className="relative flex-shrink-0 cursor-pointer">
            <Avatar
              size={100}
              shape="square"
              src={viewOneFileUploadAPI({ folder: 'commissions', fileName: String(dataImages?.data[0]?.path) })}
              alt={item?.title}
            />
          </div> */}

        <div className="min-w-0 flex-1 cursor-pointer">
          <div className="flex items-center text-gray-600">
            <button className="tex-sm">
              <AiOutlineCalendar />
            </button>
            <span className="ml-1.5 text-sm font-normal">
              {formateDateDayjs(item?.createdAt as Date)}
            </span>
          </div>

          <div className="mt-4 flex items-center">
            {item?.title ? (
              <p className="text-lg font-bold">
                <ReadMore html={String(item?.title ?? '')} value={100} />
              </p>
            ) : null}
          </div>

          <div className="mt-4 flex items-center font-medium text-gray-600">
            <span className="text-lg font-normal">
              <MdFavoriteBorder />
            </span>
            <span className="ml-1.5 text-sm">{item?.totalLike ?? 0}</span>

            <span className="ml-1.5 text-sm">
              <BiConversation />
            </span>
            <span className="ml-1.5 text-sm">{item?.totalComment ?? 0}</span>

            <span className="ml-1.5 text-sm">
              {item?.whoCanSee === 'PUBLIC' ? (
                <TbWorld />
              ) : (
                <HiOutlineLockClosed />
              )}
            </span>
            <span className="ml-1.5 text-sm font-normal">
              {item?.whoCanSee}
            </span>
            <span className="ml-1.5 text-sm">
              <IconTypePost type={item?.type as PostType} />
            </span>
            <span className="ml-1.5 text-sm font-normal">{item?.type}</span>
          </div>
        </div>

        <div className="py-4 text-right text-sm font-medium">
          <Tooltip placement="bottomRight" title={'Edit'}>
            <button
              onClick={() =>
                router.push(
                  `/posts/${
                    item?.id
                  }/edit?type=${item?.type.toLocaleLowerCase()}`,
                )
              }
              className="ml-2 text-lg text-gray-600 hover:text-indigo-600"
            >
              <MdOutlineModeEdit />
            </button>
          </Tooltip>

          <ActionModalDialog
            title="Delete?"
            loading={loading}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            onClick={() => deleteItem(item)}
            description="Are you sure you want to delete this?"
            buttonDialog={
              <ButtonInput
                className="text-lg text-gray-600 hover:text-red-600"
                variant="link"
                type="button"
              >
                <MdOutlineDeleteOutline />
              </ButtonInput>
            }
          />
        </div>
      </div>
    </>
  );
};

export { ListPosts };
