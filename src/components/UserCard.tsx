import { User } from "@/types/user";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Building2, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface UserCardProps {
  user: User;
}

export const UserCard = ({ user }: UserCardProps) => {
  const navigate = useNavigate();

  return (
    <Card className="group hover:shadow-card-hover transition-all duration-300 cursor-pointer animate-fade-in">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
              {user.name}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">@{user.username || user.email.split("@")[0]}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-foreground">
          <Mail className="h-4 w-4 text-muted-foreground" />
          <span className="truncate">{user.email}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-foreground">
          <Phone className="h-4 w-4 text-muted-foreground" />
          <span>{user.phone}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-foreground">
          <Building2 className="h-4 w-4 text-muted-foreground" />
          <span className="truncate">{user.company.name}</span>
        </div>
        <Button
          onClick={() => navigate(`/user/${user.id}`)}
          className="w-full mt-4 group-hover:bg-primary group-hover:text-primary-foreground"
          variant="secondary"
        >
          View Details
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </CardContent>
    </Card>
  );
};
