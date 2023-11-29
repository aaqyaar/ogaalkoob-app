enum PurchaseStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

// Enum for Status
enum Status {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

// Enum for RoleName
enum RoleName {
  ADMIN = "ADMIN",
  SUBSCRIBER = "SUBSCRIBER",
}

// Define the Genre interface
interface Genre {
  id: string
  name: string
  books: Book[]
  createdAt: Date
  updatedAt: Date
}

// Define the Book interface
interface Book {
  id: string
  title: string
  author: string
  publishedDate: Date
  isbn: string
  photos: string[]
  price: number
  description: string
  genre: Genre[]

  pdfUrl: string
  audioUrl: string

  isDeleted: boolean
  deletedBy: string | null
  purchases: Purchase[]

  deletedAt: Date | null
  createdAt: Date
  updatedAt: Date
}

// Define the Purchase interface
interface Purchase {
  id: string
  purchaseDate: Date
  amount: number
  userId: string
  user: User
  books: Book[]
  status: PurchaseStatus

  createdAt: Date
  updatedAt: Date
}

interface User {
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
interface PasswordReset {
  id: string
  resetCode: string
  resetCodeExpiry: Date
  userId: string
  user: User
  changedAt: Date
}

// Define the Role interface
interface Role {
  id: string
  name: RoleName
  users: User[]

  createdAt: Date
  updatedAt: Date
}

// Export the interfaces
export { Book, Genre, Purchase, User, PasswordReset, Role, Status, RoleName, PurchaseStatus }
