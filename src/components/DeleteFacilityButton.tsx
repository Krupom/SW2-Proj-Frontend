"use client";

import Button from "@mui/material/Button";
import deleteFacility from "@/libs/deleteFacility";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function FacilityDeleteButton({
  facilityId,
}: {
  facilityId: string;
}) {
  const { data: session } = useSession();
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  if (session?.user?.role !== "admin") return null;

  async function handleDelete() {
    if (!session?.user?.token) return;
    if (!window.confirm("Are you sure you want to delete this facility?")) return;

    setIsDeleting(true);
    try {
      await deleteFacility(facilityId, session.user.token);
      alert("Facility deleted successfully!");
      router.refresh();
    } catch (error: unknown) {
      alert(error instanceof Error ? error.message : "Failed to delete facility.");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <Button variant="contained" color="error" size="small" onClick={handleDelete} disabled={isDeleting}>
      {isDeleting ? "Deleting..." : "Delete"}
    </Button>
  );
}
