export type UserRole = "user" | "admin";

export type SubscriptionPlan = "free" | "vip";

export interface JwtUser {
  sub: string;
  email: string;
  role: UserRole;
  subscriptionPlan: SubscriptionPlan;
}
