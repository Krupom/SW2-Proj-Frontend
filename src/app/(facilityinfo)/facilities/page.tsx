import getFacilities from "@/libs/getFacilities";
import FacilityCatalog from "@/components/FacilityCatalog";
import CreateFacilityButton from "@/components/CreateFacilityButton";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";

export default function Facilities() {
  const facilities = getFacilities();

  return (
    <main className="relative p-5 text-center">
      <h1 className="text-xl font-semibold">Select sports facility</h1>
      <div className="absolute right-5 top-5">
        <CreateFacilityButton />
      </div>
      <Suspense fallback={<p>Loading ... <LinearProgress /> </p>}>
        <FacilityCatalog facilitiesJson={facilities} />
      </Suspense>
    </main>
  );
}
