import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useOpenLocation } from "@/features/locations/hooks/use-open-location";
import {
  useDeleteLocation,
  useGetLocation,
  useUpdateLocation,
} from "@/features/locations/useLocationsApi";
import { useConfirm } from "@/hooks/use-confirm";
import { createLocationType } from "@/lib/apiSchema";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import { LocationForm } from "./locations-form";

type FormValues = z.input<typeof createLocationType>;

export const EditLocationSheet = () => {
  const { isOpen, onClose, id } = useOpenLocation();

  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this location"
  );

  const locationQuery = useGetLocation(id);
  const editMutation = useUpdateLocation(id);
  const deleteMutation = useDeleteLocation(id);
  const isPending = editMutation.isPending || deleteMutation.isPending;
  const isLoading = locationQuery.isLoading;
  const onSubmit = (values: FormValues) => {
    editMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const onDelete = async () => {
    const ok = await confirm();

    if (ok) {
      deleteMutation.mutate(undefined, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  const defaultValues = locationQuery.data
    ? {
        address: locationQuery.data.address,
      }
    : {
        address: "",
      };

  return (
    <>
      <ConfirmDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>Edit Location</SheetTitle>
            <SheetDescription>Edit an existing location.</SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="size-4 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <LocationForm
              id={id}
              onSubmit={onSubmit}
              disabled={isPending}
              defaultValues={defaultValues}
              onDelete={() => onDelete()}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};
