import Link from "next/link";
import Card from "./Card"
export default async function FacilityCatalog({facilitiesJson}: { facilitiesJson: Promise<FacilityListResponse> }) {
    const facilities = await facilitiesJson;
    return (
        <div>
            Explore {facilities.count} sports facilities in our catalog.
            <div style={{ margin: '20px', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignContent: 'space-around', justifyContent: 'space-around' }}>
                {facilities.data.map(facility =>
                    <Link className="w-[20%]" href={`/facilities/${facility._id}`} key={facility._id}>
                        <Card 
                            facilityName={facility.name} 
                            imgSrc={facility.picture} 
                        />
                    </Link>
                )}
            </div>
        </div>
    );
}
