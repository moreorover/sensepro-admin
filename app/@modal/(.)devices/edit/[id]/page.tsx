import DeviceForm from "@/components/DeviceForm";
import { Modal } from "@/components/Modal";
import { getDevice } from "@/data-access/device";

export default async function EditDeviceModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const device = await getDevice(id);

  if (!device?.id) {
    return (
      <Modal title="Not found" description="No Customer Found for that ID">
        <div className="p-8 max-w-md space-y-2">
          <h1 className="text-2xl">No Device Found for that ID.</h1>
        </div>
      </Modal>
    );
  }

  return (
    <Modal title="Update Device" description="Update device as needed.">
      <div className="p-2 max-w-md">
        <DeviceForm device={device} />
      </div>
    </Modal>
  );
}
