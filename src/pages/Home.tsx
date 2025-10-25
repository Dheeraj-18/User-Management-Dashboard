import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "@/types/user";
import { userService } from "@/services/userService";
import { UserCard } from "@/components/UserCard";
import { SearchBar } from "@/components/SearchBar";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { EmptyState } from "@/components/EmptyState";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Home = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setIsLoading(true);
      const data = await userService.getAllUsersWithLocal();
      setUsers(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load users. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filteredUsers = useMemo(() => {
    if (!searchQuery.trim()) return users;
    
    const query = searchQuery.toLowerCase();
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
    );
  }, [users, searchQuery]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-primary text-primary-foreground shadow-lg">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">User Management Dashboard</h1>
              <p className="text-primary-foreground/90 mt-2">
                Manage and view all users in one place
              </p>
            </div>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Button
                onClick={() => navigate("/add-user")}
                size="lg"
                variant="secondary"
                className="w-fit"
              >
                <UserPlus className="mr-2 h-5 w-5" />
                Add New User
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search by name or email..."
          />
          {searchQuery && (
            <p className="text-sm text-muted-foreground mt-2">
              Found {filteredUsers.length} user{filteredUsers.length !== 1 ? "s" : ""}
            </p>
          )}
        </div>

        {/* User Grid */}
        {isLoading ? (
          <LoadingSpinner message="Loading users..." />
        ) : filteredUsers.length === 0 ? (
          <EmptyState
            message={searchQuery ? "No users found" : "No users yet"}
            description={
              searchQuery
                ? "Try adjusting your search query"
                : "Add your first user to get started"
            }
            icon={searchQuery ? "search" : "users"}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
