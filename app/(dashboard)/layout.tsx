import { SheetProvider } from "@/providers/sheet-provider";
import { TooltipProvider } from "@radix-ui/react-tooltip";

type Props = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: Props) => {
  return (
    <>
      <TooltipProvider>
        <SheetProvider />
        <main className="px-3 lg:px-14">{children}</main>
      </TooltipProvider>
    </>
  );
};

export default DashboardLayout;
