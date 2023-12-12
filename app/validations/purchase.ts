import * as z from "zod"

export const purchaseSchema = z.object({
  amount: z.number().min(0, "Amount is required and must be at least 0"),
  books: z.array(z.string()),
  userId: z.string().min(2, "User ID is required and must be at least 2 characters"),
  phoneNumber: z.string().min(2, "Phone number is required and must be at least 2 characters"),
  paymentMethod: z.enum(["CARD", "CASH", "MMT"]),
  purchaseDate: z.string(),
})

export const purchaseStatusSchema = z.object({
  status: z.enum(["COMPLETED", "CANCELLED", "PENDING"]),
  userId: z.string().min(2, "User ID is required and must be at least 2 characters"),
  purchaseId: z.string().min(2, "Purchase ID is required and must be at least 2 characters"),
})
