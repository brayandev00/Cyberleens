// StatusPage placeholder
const StatusPage = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto text-center py-20">
      <h1 className="text-3xl font-bold text-white">Estado del Sistema</h1>
      <div className="max-w-md mx-auto p-6 rounded-xl bg-slate-900 border border-slate-800">
        <div className="flex justify-between items-center">
          <span>API Backend</span>
          <span className="text-emerald-500">Operativo</span>
        </div>
      </div>
    </div>
  );
};

export default StatusPage;
