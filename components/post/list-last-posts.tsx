/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Avatar, Image } from "antd";
import { PostModel } from "@/types/post";
import ListComments from "../comment/list-comments";
import { formateDMYHH } from "@/utils";
import { BiComment } from "react-icons/bi";
import {
  MdDeleteOutline,
  MdFavoriteBorder,
  MdOutlineModeEdit,
} from "react-icons/md";
import ReactPlayer from "react-player";
import { useRouter } from "next/router";
import { getOneFileGalleryAPI } from "@/api/post";
import { CreateOrUpdateFormLike } from "../like-follow/create-or-update-form-like";
import { HtmlParser } from "@/utils/html-parser";
import { IoShareOutline } from "react-icons/io5";
import { FiDownload } from "react-icons/fi";
import { useAuth } from "../util/context-user";
import Link from "next/link";
import { ReadMore } from "@/utils/read-more";

type Props = {
  item?: PostModel;
};

const ListLastPosts: React.FC<Props> = ({ item }) => {
  const userVisiter = useAuth() as any;
  const router = useRouter();
  return (
    <>
      {/* //   <div
        key={item?.id}
        className="mt-8 overflow-hidden bg-white shadow-2xl shadow-gray-400/60"
      >
        <div className="p-8 sm:py-7 sm:px-8">
          <div className="flex items-center">
            <div className="cursor-pointer">
              <p className="mt-1 text-sm font-medium text-gray-500">
                {formateDMYHH(item?.createdAt as Date)}
              </p>
            </div>

            <div className="ml-auto">
              <button
                title="Share"
                className="ml-2 text-gray-600 hover:text-gray-900 focus:ring-gray-900"
              >
                <IoShareOutline className="w-5 h-5" />
              </button>
              {item?.allowDownload ? (
                <button
                  title="Download"
                  className="ml-2 text-gray-600 hover:text-gray-900 focus:ring-gray-900"
                >
                  <FiDownload className="w-5 h-5" />
                </button>
              ) : null}

              {userVisiter?.id === item?.userId ? (
                <>
                  <button
                    onClick={() => router.push(`/posts/${item?.id
                      }/edit?type=${item?.type.toLocaleLowerCase()}`)}
                    title="Edit"
                    className="ml-2 text-gray-600 hover:text-indigo-400 focus:ring-indigo-400"
                  >
                    <MdOutlineModeEdit className="w-5 h-5" />
                  </button>

                  <button
                    // onClick={() => deleteItem(item)}
                    title="Delete"
                    className="ml-2 text-gray-600 hover:text-red-400 focus:ring-red-400"
                  >
                    <MdDeleteOutline className="w-5 h-5" />
                  </button>
                </>
              ) : null}
            </div>
          </div>

          {item?.urlMedia && ["VIDEO", "AUDIO"].includes(item?.type) ? (
            <div className="mt-2">
              <ReactPlayer
                className="mr-auto"
                url={item?.urlMedia}
                width="100%"
                height="400px"
                controls
              />
            </div>
          ) : null}

          {item?.image ? (
            <div className="mt-2">
              <Image
                width="100%"
                height="100%"
                preview={false}
                src={`${getOneFileGalleryAPI(String(item?.image))}`}
                alt={item?.title}
              />
            </div>
          ) : null}

          {item?.id ? (
            <Link
              href={`/${item?.profile?.username}/posts/${item?.slug}`}
              className="mt-4 text-lg font-bold text-gray-900 cursor-pointer"
            >
              {item?.title ?? ""}
            </Link>
          ) : null}

          <p className="mt-4 text-sm font-normal text-gray-600">
            <HtmlParser html={String(item?.description)} />
          </p>

          <div className="flex mt-4 items-center">
            <CreateOrUpdateFormLike typeLike="POST" item={item} />

            <button className="ml-3.5 text-lg font-bold">
              <BiComment />
            </button>
            <span className="ml-1.5 font-normal text-sm">
              {item?.totalComment ?? 0}
            </span>
          </div>
        </div>
    //   </div> */}
      <li key={item?.id} className="flex items-stretch justify-between space-x-2 py-7">
        <div className="flex-shrink-0">
          <Image
            height={65}
            preview={false}
            className="object-cover w-16 h-16 rounded-lg"
            src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/checkout/1/product-2.png"
            alt=""
          />
        </div>

        <div className="flex flex-col justify-between flex-1 ml-5">
          <div className="flex-1">
            {item?.id ? (
              <Link
                href={`/${item?.profile?.username}/posts/${item?.slug}`}
                className="text-sm font-bold text-gray-900 cursor-pointer"
              >
                {item?.title ?? ""}
              </Link>
            ) : null}

            <div className="flex mt-2 items-center text-gray-500">
              <button className="text-lg font-bold">
                <MdFavoriteBorder />
              </button>
              <span className="ml-1.5 font-normal text-sm">
                {item?.totalLike ?? 0}
              </span>

              <button className="ml-3.5 text-lg font-bold">
                <BiComment />
              </button>
              <span className="ml-1.5 font-normal text-sm">
                {item?.totalComment ?? 0}
              </span>
              <span className="ml-auto font-normal text-sm">
                {formateDMYHH(item?.createdAt as Date)}
              </span>
            </div>
          </div>
        </div>
      </li>

    </>
  );
};

export default ListLastPosts;
