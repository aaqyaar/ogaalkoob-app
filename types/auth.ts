enum RoleName {
  ADMIN = "ADMIN",
  SUBSCRIBER = "SUBSCRIBER",
}
enum Status {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

type Role = {
  id: string
  name: RoleName
  createdAt: Date
  updatedAt: Date
}
type User = {
  id: string
  email: string
  password: string
  name: string
  status: Status
  roleId: string
  role: Role
}
export interface JwtPayload {
  id: string
  email: string
  role: Role["name"]
  status: string
}

export interface ILoginResponse {
  token: string
}

export interface IForgotPasswordResponse {
  message: string
}

export interface IVerifyCodeResponse {
  message: string
  userId: User["id"]
  email: User["email"]
}

export interface IResetPasswordResponse {
  message: string
}

export interface IUser extends User {}
