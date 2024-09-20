import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ChangeEvent, ReactNode, useState } from "react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

function DefaultImgHeader({ children }: { children: ReactNode }) {
  return (
    <legend className="sticky top-0 z-20 w-full px-2 py-2 text-3xl font-bold text-white bg-black border-b-2 border-white/50">
      {children}
    </legend>
  );
}

function DefaultImgSection({ children }: { children: ReactNode }) {
  return <div className="p-2 space-y-3">{children}</div>;
}

function DefaultImgTitle({ title }: { title: string }) {
  return (
    <>
      <h2 className="text-lg font-medium text-white md:text-xl">{title}</h2>
    </>
  );
}

function DefaultImgContainer({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("", className)}>{children}</div>;
}

function DefaultImg({
  id,
  handleChange,
  selectedBackground,
  imgUrl,
  className,
}: {
  id: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  selectedBackground: string;
  imgUrl: string;
  className?: string;
}) {
  return (
    <>
      <input
        id={id}
        type="radio"
        name="defaultCommunityBg"
        className="appearance-none"
        value={imgUrl}
        onChange={handleChange}
      />
      <label
        className={`${
          selectedBackground === imgUrl
            ? "border-secondary"
            : "border-transparent"
        } border-2 hover:border-secondary rounded hover:cursor-pointer`}
        htmlFor={id}
      >
        <img src={imgUrl} alt={id} className={cn("w-full h-full", className)} />
      </label>
    </>
  );
}

type DefaultImgSelectorProps = {
  children: ReactNode;
  resetDefaultImg: () => void;
  itemHasBeenSelected?: boolean;
  className?: string;
};

function DefaultImgSelector({
  children,
  resetDefaultImg,
  itemHasBeenSelected,
  className,
}: DefaultImgSelectorProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  return (
    <Dialog open={isDialogOpen}>
      <DialogTrigger
        onClick={openDialog}
        className="px-1 text-black rounded bg-secondary hover:bg-white/50 max-w-32 max-h-8"
      >
        Default Images
      </DialogTrigger>

      <DialogContent
        handleClose={closeDialog}
        className={`${className} bg-black p-0 border-2 border-white/50 overflow-y-scroll  max-w-screen-2xl scrollbar`}
      >
        <form action="" className="">
          <fieldset className="">{children}</fieldset>
          <div className="sticky bottom-0 z-50 flex justify-end gap-2 p-2 bg-black">
            <Button
              onClick={() => {
                closeDialog();
                resetDefaultImg();
              }}
              type="button"
              className=""
            >
              Cancel
            </Button>
            <Button
              disabled={!itemHasBeenSelected}
              onClick={() => {
                closeDialog();
              }}
              type="button"
            >
              Choose Background
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export {
  DefaultImgSelector,
  DefaultImgHeader,
  DefaultImgSection,
  DefaultImgTitle,
  DefaultImgContainer,
  DefaultImg,
};
