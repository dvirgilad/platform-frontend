import { useThumbnail } from "@hooks/thumbnail/useThumbnail";
import React, { useMemo } from "react";
import { thumbnails } from "./thumbnails";

type AllThumbnailsProps = {
  newThumbnail: number;
  setNewThumbnail: React.Dispatch<React.SetStateAction<number>>;
};

const AllThumbnails = ({
  newThumbnail,
  setNewThumbnail,
}: AllThumbnailsProps) => {
  const { thumbnail: currentThumbnail, chooseThumbnail } = useThumbnail();
  return (
    <div className="flex items-start content-start gap-x-[9px] self-stretch flex-wrap">
      {thumbnails.map((thumbnail) => {
        if (thumbnail.index !== currentThumbnail) {
          return (
            <div
              onClick={() => {
                chooseThumbnail(thumbnail.index);
              }}
              key={thumbnail.index}
              className={`hover:cursor-pointer flex p-1.5 justify-center items-center bg-mono/basic-13 border-solid border rounded-full grow ${
                thumbnail.index === newThumbnail
                  ? "border-green/basic-6"
                  : "border-mono/basic-13"
              }`}
            >
              {thumbnail.icon}
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default AllThumbnails;
