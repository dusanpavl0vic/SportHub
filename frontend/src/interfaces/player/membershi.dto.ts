export interface PlayerMembership {
  id: number;
  status: 'in_team' | 'pending' | 'left';
  joinedAt: string;
  leftAt: string | null;
  team: {
    id: number;
    name: string;
    city: string;
  };
}