import { Users, SearchX } from "lucide-react";

interface EmptyStateProps {
  message: string;
  description?: string;
  icon?: "users" | "search";
}

export const EmptyState = ({ message, description, icon = "users" }: EmptyStateProps) => {
  const Icon = icon === "search" ? SearchX : Users;
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4 text-center px-4">
      <div className="rounded-full bg-muted p-6">
        <Icon className="h-12 w-12 text-muted-foreground" />
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-foreground">{message}</h3>
        {description && <p className="text-muted-foreground max-w-md">{description}</p>}
      </div>
    </div>
  );
};
