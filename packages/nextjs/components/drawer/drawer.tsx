import { cn } from "../../utils/utils";

interface Props {
  showSidebar: boolean;
  setShowSidebar: (showSidebar: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

const Drawer = ({ showSidebar, children, className }: Props) => {
  return (
    <>
      <div
        id="drawer"
        className={cn(
          `top-0 right-0   w-[100vw] md:w-[50vw] lg:w-[35vw]  bg-gray-200  z-50 fixed h-full  ease-in-out duration-300`,
          showSidebar ? "translate-x-0 " : "translate-x-full",
          className,
        )}
      >
        {children}
      </div>
    </>
  );
};

export default Drawer;
