// Placeholder for NotFound
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-9xl font-extrabold text-cyan-500/20">404</h1>
      <div className="absolute">
        <h2 className="text-3xl font-bold text-white mb-2">Página No Encontrada</h2>
        <p className="text-slate-400 mb-8 max-w-md mx-auto">
          Lo sentimos, la página que buscas no existe o ha sido movida.
        </p>
        <Button asChild className="bg-cyan-600 hover:bg-cyan-700">
          <Link to="/dashboard">Volver al Dashboard</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
