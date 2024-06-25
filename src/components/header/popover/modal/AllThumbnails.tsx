import { useThumbnail } from "@hooks/thumbnail/useThumbnail";
import { dynamicThumbnailLoader } from "@utils/dynamicComponentLoader";
import React, { useState } from "react";
const ThumbnailSvgs = [...Array(10).keys()].map((val) => {
  val += 1;
  return dynamicThumbnailLoader(val);
});
type AllThumbnailsProps = {
  newThumbnail: number;
  setNewThumbnail: React.Dispatch<React.SetStateAction<number>>;
};

const AllThumbnails = ({
  newThumbnail,
  setNewThumbnail,
}: AllThumbnailsProps) => {
  const { thumbnail } = useThumbnail();
  return (
    <>
      <div className="flex items-start content-start gap-x-[9px] self-stretch flex-wrap ">
        {ThumbnailSvgs.map((thumb, i) => {
          i += 1;

          if (i !== thumbnail) {
            return (
              <>
                <div
                  onClick={() => {
                    setNewThumbnail(i);
                  }}
                  key={i}
                  className={`hover:cursor-pointer flex p-1.5 justify-center items-center bg-mono/basic-13  border-solid border rounded-full grow ${i === newThumbnail ? "border-green/basic-6" : "border-mono/basic-13"}`}
                >
                  {thumb}
                </div>
              </>
            );
          }
        })}
      </div>
    </>
  );
};
export default AllThumbnails;
