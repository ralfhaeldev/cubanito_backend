
export class JwtPayload {
  id: string;
  sub?: string;
  nombre?: string;
  email?: string;
  rol?: string;
  sedeId?: string | null;
}