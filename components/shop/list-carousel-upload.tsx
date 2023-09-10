"use client"
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useRef } from "react";
import { Carousel, Image } from "antd";
import { UploadFolderType, UploadModel } from "@/types/upload";
import { ButtonCancelInput } from "../templates/button-cancel-input";
import { viewOneFileUploadAPI } from "@/api/upload";

type Props = {
  uploads: UploadModel[];
  folder: UploadFolderType;
};

const contentStyle: React.CSSProperties = {
  height: "100%",
  width: "100%",
  lineHeight: "50px",
  textAlign: "center",
  background: "#364d79",
};

const ListCarouselUpload: React.FC<Props> = ({ uploads, folder }) => {
  const ref = useRef();

  return (
    <>
      <>
        <Carousel
          autoplay
          dots={true}
          dotPosition={"top"}
          pauseOnDotsHover={true}
          pauseOnHover={true}
          draggable
        >
          {uploads && uploads?.length > 0 &&
            uploads?.map((item: any, index: number) => (
              <div key={index}>
                <Image
                  preview={false}
                  className="object-cover w-full h-full"
                  style={contentStyle}
                  src={`${viewOneFileUploadAPI({ folder: folder, fileName: item?.path })}`}
                  alt=""
                />
              </div>
            ))}
        </Carousel>
        {/* <div className="flex items-center mt-4 mb-4 space-x-4">
            <ButtonCancelInput shape="default" size="normal" loading={false}>
              Cancel
            </ButtonCancelInput>
            <ButtonCancelInput shape="default" size="normal" loading={false}>
              Cancel
            </ButtonCancelInput>
          </div> */}
      </>
    </>
  );
};

export default ListCarouselUpload;
