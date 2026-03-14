// AllScans placeholder
import { RecentScans } from "@/components/RecentScans";

const AllScans = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-white">Todos los Escaneos</h1>
        <p className="text-slate-400 text-lg">Historial completo de auditorías realizadas.</p>
      </div>
      <RecentScans />
    </div>
  );
};

export default AllScans;
