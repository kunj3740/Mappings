export interface SignupInput {
  name?: string;
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}