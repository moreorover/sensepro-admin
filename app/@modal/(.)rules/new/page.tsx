"use client";

import { Modal } from "@/components/Modal";
import RuleForm from "@/components/RuleForm";
import { newRuleAtom } from "@/lib/atoms";
import { useAtomValue } from "jotai";

export default function NewDeviceModal() {
  const newRuleAtomValue = useAtomValue(newRuleAtom);
  const rule = {
    type: newRuleAtomValue.type,
    locationId: newRuleAtomValue.locationId,
    controllerId: newRuleAtomValue.controllerId,
  };

  return (
    <Modal title="New Rule" description="Create rule as needed.">
      <div className="p-2 max-w-md">
        <RuleForm rule={rule} />
      </div>
    </Modal>
  );
}
