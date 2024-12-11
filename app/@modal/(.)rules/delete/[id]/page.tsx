import { Modal } from "@/components/Modal";
import RuleDeleteForm from "@/components/RuleDeleteForm";
import { getRule } from "@/data-access/rule";

export default async function EditRuleModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const rule = await getRule(id);

  if (!rule?.id) {
    return (
      <Modal title="Not found" description="No Rule Found for that ID">
        <div className="p-8 max-w-md space-y-2">
          <h1 className="text-2xl">No Rule Found for that ID.</h1>
        </div>
      </Modal>
    );
  }

  return (
    <Modal title="Delete customer" description="Deleted customer as needed.">
      <div className="p-2 max-w-md">
        <RuleDeleteForm rule={rule} />
      </div>
    </Modal>
  );
}
