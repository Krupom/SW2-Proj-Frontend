import Image from "next/image";
import getFacility from "@/libs/getFacility";
import Link from "next/link";

export default async function FacilityDetailPage({ params }: { params: Promise<{ fid: string }> }) {
    const { fid } = await params;
    const facilityDetail = await getFacility(fid);
    return (
        <main className="text-center p-5">
            <h1 className="text-2xl font-bold">{facilityDetail.data.name}</h1>
            <div className="flex flex-row my-5">
                <Image
                    src={facilityDetail.data.picture}
                    alt="Sports Facility Image"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="rounded-lg w-[30%]"
                />
                <div className="flex flex-col items-start">
                    <div className="text-md mx-5">
                        Name: {facilityDetail.data.name}
                    </div>
                    <div className="text-md mx-5">
                        Address: {facilityDetail.data.address}
                    </div>
                    <div className="text-md mx-5">
                        District: {facilityDetail.data.district}
                    </div>
                    <div className="text-md mx-5">
                        Province: {facilityDetail.data.province}
                    </div>
                    <div className="text-md mx-5">
                        Postal Code: {facilityDetail.data.postalcode}
                    </div>
                    <div className="text-md mx-5">
                        Tel: {facilityDetail.data.tel}
                    </div>
                    <div className="text-md mx-5">
                        Daily Rate: {facilityDetail.data.dailyrate}
                    </div>
                </div>
            </div>

            <Link
                href={`/booking?facility=${fid}`}
                className="inline-block rounded bg-blue-500 px-4 py-2 text-white! hover:bg-blue-700"
            >
                Book Facility
            </Link>

        </main>
    );
}
