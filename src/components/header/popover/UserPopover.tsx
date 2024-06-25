import React, { useCallback, useState } from "react";
import ArrowDown from "@/assets/arrow-down.svg?react";
import ArrowUp from "@/assets/arrow-up.svg?react";
import Typography from "@/components/typography/Typography";
import getFirstLetter from "@utils/getFirstLetter";
import { dynamicThumbnailLoader } from "@utils/dynamicComponentLoader";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@hooks/useAuth";
import { ActionMenuItem } from "@components/menu/items";
import ActionMenu from "@components/menu/ActionMenu/ActionMenu";
import ColorModal from "./modal/ColorModal";
import { useThumbnail } from "@hooks/thumbnail/useThumbnail";
import { thumbnails } from "./modal/thumbnails";

type UserPopoverProps = {
  user: string;
};

const menuItems: (
  thumbnail: number,
  signOut: () => void,
  showColorModal: () => void
) => ActionMenuItem[] = (thumbnail, signOut, showColorModal) => [
  {
    label: (
      <>
        <div className="relative flex justify-start items-center px-[6px] py-[5px] gap-4">
          <div className="w-5 h-5 flex justify-center items-center">
            {dynamicThumbnailLoader(thumbnail)}
          </div>
          <Typography variant="body-md" className="text-mono/basic-4">
            Change color
          </Typography>
        </div>
      </>
    ),
    action: showColorModal,
  },
  { label: "divider" },
  {
    label: (
      <div className="relative flex justify-start items-center px-[6px] py-[5px] gap-4">
        <Typography variant="body-md" className="text-mono/basic-4">
          Sign out
        </Typography>
      </div>
    ),
    action: signOut,
  },
];

const UserPopover = React.memo(({ user }: UserPopoverProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showColorModal, setShowColorModal] = useState(false);
  const [target, setTarget] = useState<HTMLDivElement | null>(null);

  const ToggleColorModal = () => {
    setShowColorModal(!showColorModal);
    setMenuOpen(false);
  };

  const HandleSignOut = () => {
    signOut();
    queryClient.removeQueries();
  };

  const { thumbnail } = useThumbnail();
  const { signOut } = useAuth();
  const queryClient = useQueryClient();
  const getFirstLetterOfUser = useCallback(() => getFirstLetter(user), [user]);

  return (
    <>
      <div className="place-self-end flex items-center h-full pr-5.5">
        <div className="relative flex justify-center items-center">
          {thumbnails.find((thmb) => thmb.index === thumbnail)?.icon}
          <div className="text-white absolute inset-0 flex justify-center items-center">
            {getFirstLetterOfUser().toUpperCase()}
          </div>
        </div>
        <div
          className="group flex items-center cursor-pointer justify-between"
          onClick={() => {
            setMenuOpen(!menuOpen);
          }}
        >
          <Typography
            variant="body-md"
            className="text-mono/basic-4 pl-3 group-hover-white"
          >
            {user}
          </Typography>
          <Typography className="text-mono/basic-4 group-hover-white">
            {menuOpen ? <ArrowUp /> : <ArrowDown />}
          </Typography>
        </div>
        <div ref={setTarget}></div>
        {menuOpen && (
          <ActionMenu
            items={menuItems(thumbnail, HandleSignOut, ToggleColorModal)}
            isOpen={true}
            target={target}
          />
        )}
      </div>
      {showColorModal && <ColorModal setShowModal={setShowColorModal} />}
    </>
  );
});
export default UserPopover;
