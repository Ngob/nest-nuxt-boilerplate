
export interface User {
  id: string,
  username: string,
  email: string
}
export interface PasswordAuthenticatedUser extends User {
  password: string,
}
