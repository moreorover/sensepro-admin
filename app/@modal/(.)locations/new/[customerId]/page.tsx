import LocationForm from "@/app/locations/LocationForm";
import { Modal } from "@/components/Modal";

type Props = {
  params: Promise<{ locationId: string }>;
};

export default async function NewLocationModal({ params }: Props) {
  const { locationId: customerId } = await params;

  const location = { name: "", customerId };

  return (
    <Modal title="New location" description="Create location as needed.">
      <div className="p-2 max-w-md">
        <LocationForm location={location} />
      </div>
    </Modal>
  );
}
