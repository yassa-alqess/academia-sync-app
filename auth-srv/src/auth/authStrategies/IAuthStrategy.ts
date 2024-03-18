export default interface IAuthStrategy {
  login(username: string, password: string): Promise<Record<string, any>>;
  register(user: Record<string, any>): Promise<Record<string, any>>;
  validateRegister(user: Record<string, any>): Promise<any>;
}
