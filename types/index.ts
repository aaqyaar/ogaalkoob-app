export enum PurchaseStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

// Enum for Status
export enum Status {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

// Enum for RoleName
export enum RoleName {
  ADMIN = "ADMIN",
  SUBSCRIBER = "SUBSCRIBER",
}

export enum PaymentMethod {
  CARD = "CARD",
  CASH = "CASH",
  MMT = "MMT",
}

// Define the Genre interface
export interface Genre {
  id: string
  name: string
  books: Book[]
  createdAt: Date
  updatedAt: Date
}

// Define the Book interface
export interface Book {
  id: string
  title: string
  author: string
  publishedDate: Date
  isbn: string
  photos: string[]
  price: number
  description: string
  genre: Genre[]

  pdfUrl?: string
  audioUrl?: string

  isDeleted?: boolean
  deletedBy?: string | null
  purchases?: Purchase[]

  deletedAt: Date | null
  createdAt: Date
  updatedAt: Date
}

// Define the Purchase interface
export interface Purchase {
  id: string
  purchaseDate: Date
  amount: number
  userId: string
  user: User
  books: Book[]
  status: PurchaseStatus
  paymentMethod: PaymentMethod
  phoneNumber: string
  createdAt: Date
  updatedAt: Date
}

export interface PurchaseCreationDTO {
  purchaseDate: string
  paymentMethod: "CARD" | "CASH" | "MMT"
  phoneNumber: string
  amount: number
  books: Book["id"][]
  userId: string
  id?: string
}

export interface User {
  id: string
  email: string
  password: string
  name: string
  status: Status
  isDeleted: boolean
  deletedBy: string | null
  roleId: string
  role: Role
  purchases: Purchase[]
  passwordReset: PasswordReset[]

  deletedAt: Date | null
  createdAt: Date
  updatedAt: Date
}

// Define the PasswordReset interface
export interface PasswordReset {
  id: string
  resetCode: string
  resetCodeExpiry: Date
  userId: string
  user: User
  changedAt: Date
}

// Define the Role interface
export interface Role {
  id: string
  name: RoleName
  users: User[]

  createdAt: Date
  updatedAt: Date
}

export interface UploadResult {
  message: string
  data: string[]
}
