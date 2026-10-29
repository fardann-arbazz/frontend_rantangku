import { CheckCircle2, RotateCw, ShieldCheck, XCircle } from "lucide-react";

export const getIconConfig = (verificationState: string) => {
  switch (verificationState) {
    case "success":
      return {
        icon: CheckCircle2,
        bgColor: "bg-green-100",
        iconColor: "text-green-600",
        title: "Email Terverifikasi!",
        description: "Akun Anda telah berhasil diverifikasi",
      };
    case "error":
      return {
        icon: XCircle,
        bgColor: "bg-red-100",
        iconColor: "text-red-600",
        title: "Verifikasi Gagal",
        description: "Kode OTP yang dimasukkan tidak valid",
      };
    case "verifying":
      return {
        icon: RotateCw,
        bgColor: "bg-blue-100",
        iconColor: "text-blue-600",
        title: "Memverifikasi...",
        description: "Mohon tunggu sebentar",
      };
    default:
      return {
        icon: ShieldCheck,
        bgColor: "bg-blue-100",
        iconColor: "text-blue-600",
        title: "Verifikasi Email",
        description: "Kami telah mengirim kode verifikasi ke",
      };
  }
};
