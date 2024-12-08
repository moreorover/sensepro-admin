import DeviceTypeForm from "@/components/deviceType-form";
import { Modal } from "@/components/Modal";

export default async function NewCustomerModal() {
  const deviceType = { name: "" };

  return (
    <Modal title="New Device Type" description="Create device type as needed.">
      <div className="p-2 max-w-md">
        <DeviceTypeForm deviceType={deviceType} />
      </div>
    </Modal>
  );
}
