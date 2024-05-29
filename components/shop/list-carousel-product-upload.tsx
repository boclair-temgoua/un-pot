'use client';
/* eslint-disable @next/next/no-img-element */
import { viewOneFileUploadAPI } from '@/api-site/upload';
import { UploadFolderType, UploadModel } from '@/types/upload';
import { Image } from 'antd';
import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
// import required modules
import { ProductModel } from '@/types/product';
import { ImageIcon } from 'lucide-react';
import { Pagination, Zoom } from 'swiper/modules';
import { useDetectConsoleHide } from '../hooks';
import { WhoCanSeeProductItem } from '../ui-setting';
import { Badge } from '../ui/badge';

type Props = {
  uploads: UploadModel[];
  folder: UploadFolderType;
  preview?: boolean;
  className?: string;
  alt?: string;
  data?: ProductModel;
  height?: string | number;
  width?: string | number;
};

const contentStyle: React.CSSProperties = {
  lineHeight: '50px',
  textAlign: 'center',
  // background: "#364d79",
};

export function ListCarouselProductUpload(props: Props) {
  const {
    uploads,
    folder,
    preview = false,
    alt,
    data,
    className = '',
    height = '100%',
    width = '100%',
  } = props;
  const { isConsoleOpen } = useDetectConsoleHide();
  const ref = useRef();

  return (
    <>
      {/* <div className="group">
        <div className="relative">
          <div className="aspect-w-16 aspect-h-9 block overflow-hidden rounded-xl">
            <img
              className="size-full object-cover transition-all duration-200 group-hover:scale-110"
              src="https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/blog-grid/6/thumbnail-1.png"
              alt=""
            />
          </div>
          <span className="absolute left-3 top-3 rounded bg-white px-3 py-2 text-xs font-bold uppercase tracking-widest text-gray-900">
            4 medias
          </span>
        </div>
      </div> */}

      <Swiper
        zoom={true}
        spaceBetween={50}
        slidesPerView={1}
        navigation={true}
        history={{
          key: 'slide',
        }}
        pagination={{ clickable: true }}
        modules={[Pagination, Zoom]}
        style={contentStyle}
        breakpoints={{
          320: {
            slidesPerView: 'auto',
            spaceBetween: 8,
          },
          // 640: {
          //   slidesPerView: 1,
          //   spaceBetween: 16,
          // }
        }}
      >
        {uploads &&
          uploads?.length > 0 &&
          uploads?.map((item: any, index: number) => (
            <SwiperSlide key={index}>
              <Image
                width={width}
                height={height}
                className={className}
                preview={preview}
                style={contentStyle}
                src={`${viewOneFileUploadAPI({
                  token: '3498929de',
                  folder: folder,
                  fileName: item?.path,
                })}`}
                alt={alt}
                loading="lazy"
              />

              <div className="absolute left-3 top-3">
                {data?.uploadsImages ? (
                  <Badge className="rounded-sm" variant={'secondary'}>
                    <ImageIcon className="size-3" />
                    <span className="ml-1.5">
                      {Number(data?.uploadsImages.length) >= 2
                        ? `${uploads?.length} medias`
                        : `${uploads?.length} media`}
                    </span>
                  </Badge>
                ) : null}

                {data?.uploadsFiles ? (
                  <Badge className="ml-2 rounded-sm" variant={'secondary'}>
                    <ImageIcon className="size-3" />
                    <span className="ml-1.5">
                      {Number(data?.uploadsFiles.length) >= 2
                        ? `${uploads?.length} files`
                        : `${uploads?.length} file`}
                    </span>
                  </Badge>
                ) : null}

                {/* <Badge
                  className="ml-2 cursor-pointer rounded-sm"
                  variant={'secondary'}
                  onClick={() => console.log('Okkkk')}
                >
                  <span className="ml-1.5">12/01/2024</span>
                </Badge> */}
              </div>

              {/* <span className="absolute left-3 top-3 rounded bg-white px-3 py-2 text-xs font-bold uppercase tracking-widest text-gray-900">
                {uploads?.length >= 2
                  ? `${uploads?.length} medias`
                  : `${uploads?.length} media`}
              </span> */}

              {data?.isUnlock !== 1 ? (
                <WhoCanSeeProductItem product={data} />
              ) : null}

              {/* {['MEMBERSHIP'].includes(String(post?.whoCanSee)) &&
              post?.isValidSubscribe !== 1 ? (
                <WhoCanSeeItem profile={post?.profile as any} />
              ) : null} */}
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
}
