import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useConfirm } from "@/hooks/use-confirm";
import { MoreHorizontal } from "lucide-react";
import { useOpenGroup } from "../hooks/use-open-group";
import { useDeleteGroup } from "../useGroupsApi";

type Props = {
  id: string;
  deleteDisabled: boolean;
};

export const GroupEditButton = ({ id, deleteDisabled }: Props) => {
  const openGroupEdit = useOpenGroup();
  const deleteMutation = useDeleteGroup(id);

  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this customer"
  );

  const handleGroupDelete = async () => {
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
          <DropdownMenuItem onClick={() => openGroupEdit.onOpen(id)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={deleteDisabled}
            onClick={() => handleGroupDelete()}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
