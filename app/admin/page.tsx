import type { Metadata } from "next"
import { AdminApp } from "@/components/admin/AdminApp"

export const metadata: Metadata = {
  title: "Event Console — IHH Healthcare",
  description: "Attendance list, seat tagging, programme and journey copy"
}

export default function AdminPage() {
  return <AdminApp />
}
