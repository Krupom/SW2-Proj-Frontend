"use client";

import Button from "@mui/material/Button";
import deleteFacility from "@/libs/deleteFacility";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function FacilityDeleteButton({
  facilityId,
}: {
  facilityId: string;
}) {
  const { data: session } = useSession();
  const router = useRouter();

  if (session?.user?.role !== "admin") return null;

  async function handleDelete() {
    if (!session?.user?.token) return;
    if (!window.confirm("Are you sure you want to delete this facility?")) return;

    await deleteFacility(facilityId, session.user.token);
    alert("Facility deleted successfully!");
    router.refresh();
  }

  return (
    <Button variant="contained" color="error" size="small" onClick={handleDelete}>
      Delete
    </Button>
  );
}
