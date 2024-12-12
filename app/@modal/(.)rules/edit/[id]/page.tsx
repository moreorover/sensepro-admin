import { Modal } from "@/components/Modal";
import RuleForm from "@/components/RuleForm";
import { getRule } from "@/data-access/rule";

export default async function EditDeviceModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const rule = await getRule(id);

  if (!rule?.id) {
    return (
      <Modal title="Not found" description="No Customer Found for that ID">
        <div className="p-8 max-w-md space-y-2">
          <h1 className="text-2xl">No Rule Found for that ID.</h1>
        </div>
      </Modal>
    );
  }

  return (
    <Modal title="Update Device" description="Update device as needed.">
      <div className="p-2 max-w-md">
        <RuleForm rule={rule} />
      </div>
    </Modal>
  );
}
