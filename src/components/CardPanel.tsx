'use client';
import Card from "./Card";
import {useReducer} from "react";
import Link from "next/link";

export default function CardPanel() {

    const compareReducer = (compareList: Map<string, number>, action: { type: string; facilityName: string , rating: number }) => {
        switch (action.type) {
            case 'add':
                return new Map(compareList).set(action.facilityName, action.rating);
            case 'remove':
                const newMap = new Map(compareList);
                newMap.delete(action.facilityName);
                return newMap;
            default:
                return compareList;
        }
    }

    const [compareList, dispatchCompare] = useReducer(compareReducer, new Map<string, number>());

    //mock data for facilities
    const mockFacilities = [
        { fid: "001", facilityName: 'The Bloom Pavilion', imgSrc: '/img/bloom.jpg' },
        { fid: "002", facilityName: 'Spark Space', imgSrc: '/img/sparkspace.jpg' },
        { fid: "003", facilityName: 'The Grand Table ', imgSrc: '/img/grandtable.jpg' }
    ];

    return (
        <div>
            <div style={{ margin: '20px', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignContent: 'space-around', justifyContent: 'space-around' }}>
                {mockFacilities.map(facility =>
                    <Link className="w-[20%]" href={`/facilities/${facility.fid}`} key={facility.fid}>
                        <Card 
                            facilityName={facility.facilityName} 
                            imgSrc={facility.imgSrc} 
                            onCompare={(facilityName, rating) => dispatchCompare({ type: 'add', facilityName, rating: rating ?? 0 })}
                        />
                    </Link>
                )}
            </div>
            <div>Facility List with Ratings: {compareList.size} </div>
            {Array.from(compareList).map(([facilityName, rating]) => (
                <div key={facilityName} data-testid={`${facilityName}`} onClick={() => dispatchCompare({ type: 'remove', facilityName, rating: 0 })}>
                    <span>{facilityName}: {rating}</span>
                </div>
            ))}
        </div>
        
    )
}
