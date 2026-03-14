// ScanResults placeholder
import { useParams } from "react-router-dom";
import { ScanStatus } from "@/components/ScanStatus";

const ScanResults = () => {
  const { id } = useParams();
  return (
    <div className="max-w-7xl mx-auto">
      <ScanStatus scanId={id} />
    </div>
  );
};

export default ScanResults;
