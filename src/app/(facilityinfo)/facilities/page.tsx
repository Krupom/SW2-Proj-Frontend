import getFacilities from "@/libs/getFacilities";
import FacilityCatalog from "@/components/FacilityCatalog";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";

export default function Facilities() {
  const facilities = getFacilities();

  return (
    <main className="text-center p-5">
      <h1 className="text-xl font-semibold">Select sports facility</h1>
      <Suspense fallback={<p>Loading ... <LinearProgress /> </p>}>
        <FacilityCatalog facilitiesJson={facilities} />
      </Suspense>
    </main>
  );
}
