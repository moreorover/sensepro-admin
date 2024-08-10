import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useOpenDevice } from "@/features/devices/hooks/use-open-device";
import { useDeleteDevice } from "@/features/devices/useDevicesApi";
import { useConfirm } from "@/hooks/use-confirm";
import { MoreHorizontal } from "lucide-react";

type Props = {
  deviceId: string;
};

export const DeviceEditButton = ({ deviceId }: Props) => {
  const openDeviceEdit = useOpenDevice();
  const deleteMutation = useDeleteDevice(deviceId);

  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this customer"
  );

  const handleDeviceDelete = async () => {
    const ok = await confirm();

    if (ok) {
      deleteMutation.mutate();
    }
  };

  return (
    <>
      <ConfirmDialog />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="outline" className="h-8 w-8">
            {/* <MoveVerticalIcon className="h-3.5 w-3.5" /> */}
            <MoreHorizontal className="size-4" />
            <span className="sr-only">More</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => openDeviceEdit.onOpen(deviceId)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleDeviceDelete()}>
            Delete
          </DropdownMenuItem>
          {/* <DropdownMenuItem>Export</DropdownMenuItem> */}
          {/* <DropdownMenuSeparator /> */}
          {/* <DropdownMenuItem>Decommission</DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
