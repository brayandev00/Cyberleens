import { Link } from "react-router-dom";
import { Frown } from "lucide-react";

export default function NotFound() {
    return (
        <div className="h-full flex flex-col items-center justify-center text-center p-4">
            <Frown className="h-24 w-24 text-muted-foreground mb-6" />
            <h1 className="text-7xl font-bold mb-4">404</h1>
            <p className="mb-6 text-muted-foreground">Page not found.</p>
            <Link to="/" className="underline text-primary">Go back to Dashboard</Link>
        </div>
    );
}
