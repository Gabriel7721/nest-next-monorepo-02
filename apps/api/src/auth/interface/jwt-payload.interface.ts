export interface JwtPayload {
  sub: string;
  email: string;
  role: 'user' | 'admin';
  subscriptionPlan: 'free' | 'vip';
}
