import { useLocalStorage } from "usehooks-ts";

export const useThumbnail = () => {
  const [thumbnail, setThumbnail] = useLocalStorage<number>("thumbnail", 1);
  const [chosenThumbnail, chooseThumbnail] = useLocalStorage<number>(
    "thumbnail",
    thumbnail
  );

  const setThumbnailp = () => setThumbnail(chosenThumbnail);

  return {
    setThumbnail,
    thumbnail,
    chosenThumbnail,
    chooseThumbnail,
  };
};
