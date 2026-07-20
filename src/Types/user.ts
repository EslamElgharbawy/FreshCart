export type Userstate = {
  token: string | null;
  isLoggedIn: boolean;
  user: {
    id: string;
    name: string;
    role: string;
  } | null;
  authChecked: boolean;
  loading: boolean;
  error: string | null;
};
