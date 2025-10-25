import { User, NewUserFormData } from "@/types/user";

const API_BASE_URL = "https://jsonplaceholder.typicode.com";

export const userService = {
  async getAllUsers(): Promise<User[]> {
    const response = await fetch(`${API_BASE_URL}/users`);
    if (!response.ok) throw new Error("Failed to fetch users");
    return response.json();
  },

  async getUserById(id: number): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/users/${id}`);
    if (!response.ok) throw new Error("Failed to fetch user");
    return response.json();
  },

  // Local storage operations for added users
  getLocalUsers(): User[] {
    const stored = localStorage.getItem("localUsers");
    return stored ? JSON.parse(stored) : [];
  },

  addLocalUser(userData: NewUserFormData): User {
    const localUsers = this.getLocalUsers();
    const newUser: User = {
      id: Date.now(), // Use timestamp as unique ID
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      company: {
        name: userData.company,
      },
    };
    
    localUsers.push(newUser);
    localStorage.setItem("localUsers", JSON.stringify(localUsers));
    return newUser;
  },

  async getAllUsersWithLocal(): Promise<User[]> {
    const apiUsers = await this.getAllUsers();
    const localUsers = this.getLocalUsers();
    return [...localUsers, ...apiUsers];
  },
};
