import { Modal } from "@/components/Modal";
import RuleDevicesForm from "@/components/RuleDevicesForm";
import {
  getDevicesAllowdInRulesForControllerId,
  getRule,
  getRuleDevices,
} from "@/data-access/rule";

export default async function EditCustomerModal({
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

  const ruleDevices = await getRuleDevices(id);
  const selectedDevices = ruleDevices.map((ruleDevice) => ruleDevice.deviceId);
  const devicesAllowedInThisRule = await getDevicesAllowdInRulesForControllerId(
    rule?.controllerId
  );

  return (
    <Modal
      title="Update Rule Devices"
      description="Update rule devices as needed."
    >
      <div className="p-2 max-w-md">
        <RuleDevicesForm
          ruleId={rule.id}
          devices={devicesAllowedInThisRule}
          selectedDevices={selectedDevices}
        />
      </div>
    </Modal>
  );
}
