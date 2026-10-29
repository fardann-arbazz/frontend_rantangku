import { CheckCircle2, Clock, Package2, XCircle } from "lucide-react";

  export const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: {
        label: "Menunggu",
        icon: Clock,
        className: "bg-yellow-100 text-yellow-700 border-yellow-200",
      },
      processing: {
        label: "Diproses",
        icon: Package2,
        className: "bg-blue-100 text-blue-700 border-blue-200",
      },
      delivered: {
        label: "Selesai",
        icon: CheckCircle2,
        className: "bg-green-100 text-green-700 border-green-200",
      },
      cancelled: {
        label: "Dibatalkan",
        icon: XCircle,
        className: "bg-red-100 text-red-700 border-red-200",
      },
    } as const;
    return (
      statusConfig[status as keyof typeof statusConfig] || statusConfig.pending
    );
  };