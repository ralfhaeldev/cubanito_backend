export interface LoginResponse {
  accessToken: string;
  user: {
    id: string;
    nombre: string;
    email: string;
    rol: string;
    sedeId: string | null;
  };
}
