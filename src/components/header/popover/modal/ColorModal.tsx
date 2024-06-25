import CloseIcon from "@/assets/x-close.svg?react";
import Button from "@components/button/Button";

import Modal from "@components/modal/Modal";
import Typography from "@components/typography/Typography";
import { dynamicThumbnailLoader } from "@utils/dynamicComponentLoader";
import React, { useState } from "react";
import AllThumbnails from "./AllThumbnails";
import { useThumbnail } from "@hooks/thumbnail/useThumbnail";

type ColorModalProps = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const ColorModal = React.memo(({ setShowModal }: ColorModalProps) => {
  const [newThumbnail, setNewThumbnail] = useState(0);
  const { setThumbnail, thumbnail } = useThumbnail();
  const handleChangeThumbnail = () => {
    if (newThumbnail !== 0) setThumbnail(newThumbnail);
    setShowModal(false);
  };
  return (
    <>
      <Modal darkenBackground={true}>
        <div className="flex flex-col w-[640px] items-center justify-center relative">
          <CloseIcon
            className="absolute top-4 right-4 cursor-pointer"
            onClick={() => setShowModal((prev) => !prev)}
          />
          <div className="bg-mono/basic-12 border border-mono/basic-10 w-fit flex flex-col py-8 px-10 rounded-md gap-5 shrink-0">
            <Typography
              variant="headline-lg"
              className="text-mono/basic-1 gap-2 mb-5 h-8"
            >
              Change thumbnail color
            </Typography>
            <div className="flex content-start items-start gap-x-[9px] gap-y-2 self-stretch flex-wrap">
              <Typography
                variant="headline-xs"
                className="text-mono/basic-1 w-full"
              >
                Current thumbnail:
              </Typography>
              <div className="flex p-1.5 items-start gap-2.5 border-green/basic-6 border-2 border-solid rounded-[32px]">
                {dynamicThumbnailLoader(thumbnail)}
              </div>
            </div>
            <div className="flex content-start items-start gap-2 flex-wrap ">
              <Typography
                variant="headline-xs"
                className="text-mono/basic-1 w-full"
              >
                Other thumbnails:
              </Typography>

              <AllThumbnails
                newThumbnail={newThumbnail}
                setNewThumbnail={setNewThumbnail}
              />

              <div className="flex items-center justify-between pt-3 h-13 w-full">
                <Button
                  onClick={handleChangeThumbnail}
                  variant="primary"
                  className="w-[140px]"
                >
                  Save Changes
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => setShowModal((prev) => !prev)}
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
});
export default ColorModal;
