"use client";

import FacilityForm from "@/components/FacilityForm";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function EditFacilityButton({ facility }: { facility: Facility }) {
    const { data: session } = useSession();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    if (session?.user?.role !== "admin") return null;

    const handleCompleted = () => {
        setIsOpen(false);
        router.refresh();
    };

    return (
        <>
            <Button variant="contained" size="small" onClick={() => setIsOpen(true)}>
                Edit
            </Button>
            <Dialog open={isOpen} onClose={() => setIsOpen(false)} fullWidth maxWidth="sm">
                <DialogTitle className="text-2xl! font-semibold! text-blue-700!">Edit Facility</DialogTitle>
                <DialogContent>
                    <FacilityForm facility={facility} onCompleted={handleCompleted} />
                </DialogContent>
            </Dialog>
        </>
    );
}
