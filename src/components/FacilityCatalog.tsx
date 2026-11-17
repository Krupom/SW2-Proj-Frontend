import Link from "next/link";
import DeleteFacilityButton from "./DeleteFacilityButton";
import EditFacilityButton from "./EditFacilityButton";

export default async function FacilityCatalog({ facilitiesJson }: { facilitiesJson: Promise<FacilityListResponse> }) {
    const facilities = await facilitiesJson;
    return (
        <div>
            Explore {facilities.count} sports facilities in our catalog.
            <div className="my-5 grid grid-cols-1 gap-4 text-left sm:grid-cols-2 lg:grid-cols-3">
                {facilities.data.map(facility =>
                    <article
                        className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
                        key={facility._id}
                    >
                        <Link href={`/facilities/${facility._id}`} className="block">
                            <h2 className="text-lg font-semibold text-slate-800">{facility.name}</h2>
                            <p className="mt-1 text-sm text-slate-600">Sport: {facility.sportType}</p>
                            <p className="text-sm text-slate-600">Location: {facility.location}</p>
                            <p className="text-sm text-slate-600">Capacity: {facility.capacity}</p>
                        </Link>
                        <div className="mt-2 flex items-center justify-between gap-2">
                            <p className="font-medium text-slate-800">${facility.hourlyRate.toFixed(2)} per hour</p>
                            <div className="flex gap-2">
                                <EditFacilityButton facility={facility} />
                                <DeleteFacilityButton facilityId={facility._id} />
                            </div>
                        </div>
                    </article>
                )}
            </div>
        </div>
    );
}
