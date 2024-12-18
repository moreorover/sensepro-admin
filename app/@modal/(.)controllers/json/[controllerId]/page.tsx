import CopyButton from "@/components/CopyButton";
import { Modal } from "@/components/Modal";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getControllerJson } from "@/data-access/controller";

export default async function ControllerJsonModal({
  params,
}: {
  params: Promise<{ controllerId: string }>;
}) {
  const { controllerId } = await params;

  const json = await getControllerJson(controllerId);

  if (!json?.controller?.id) {
    return (
      <Modal title="Not found" description="No Customer Found for that ID">
        <div className="p-8 max-w-md space-y-2">
          <h1 className="text-2xl">No Controller Found for that ID.</h1>
        </div>
      </Modal>
    );
  }

  const formattedJson = JSON.stringify(json, null, 2);

  return (
    <Modal
      title="Controller JSON"
      description="View Controller JSON configuration."
      dialogContentClassName="max-w-[90vw] max-h-[90vh] w-full h-full flex flex-col"
    >
      <ScrollArea className="h-[calc(90vh-200px)] w-full rounded-md border p-4">
        <pre className="text-sm">{formattedJson}</pre>
      </ScrollArea>
      <CopyButton text={formattedJson} variant="full" />
    </Modal>
  );
}
