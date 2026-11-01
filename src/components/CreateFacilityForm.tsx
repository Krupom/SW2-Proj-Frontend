"use client"
import { useState } from "react";
import createFacility from "@/libs/createFacility";
import { useSession } from "next-auth/react";

export default function CreateFacilityForm() {
    const { data: session } = useSession();
    const [newFormData, setNewFormData] = useState({
        name: "",
        sportType: "",
        location: "",
        capacity: 0,
        hourlyRate: 0,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setNewFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const token = session?.user?.token;

        if (!token) {
            console.error("User is not authenticated");
            return;
        }

        if(!newFormData.name || !newFormData.sportType || !newFormData.location || newFormData.capacity <= 0 || newFormData.hourlyRate <= 0) {
            setError(`Please fill in all fields with valid values. ${newFormData.name ? "" : "| Name is required "} ${newFormData.sportType ? "" : "| Sport Type is required "} ${newFormData.location ? "" : "| Location is required "} ${newFormData.capacity > 0 ? "" : "| Capacity must be greater than 0 "} ${newFormData.hourlyRate > 0 ? "" : "| Hourly Rate must be greater than 0"}`);
            setIsSubmitting(false);
            return;
        }

        try {
            await createFacility(newFormData, token);
            setNewFormData({
                name: "",
                sportType: "",
                location: "",
                capacity: 0,
                hourlyRate: 0,
            });
            alert("Facility created successfully!");
        } catch (error) {
            console.error("Error creating facility:", error);
            setError("Failed to create facility. Please try again.");
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-start p-4 ">
            <div className="text-xl text-blue-700">Create New Facility</div>
            <div className="flex items-center w-1/2 my-2">
                <label htmlFor="name" className="w-1/3">Name </label>
                <input type="text" id="name" name="name" className="w-2/3 border border-gray-300 rounded px-2 py-1" onChange={handleInputChange} value={newFormData.name} />
            </div>
            <div className="flex items-center w-1/2 my-2">
                <label htmlFor="sport-type" className="w-1/3">Sport Type </label>
                <input type="text" id="sport-type" name="sportType" className="w-2/3 border border-gray-300 rounded px-2 py-1" onChange={handleInputChange} value={newFormData.sportType} />
            </div>
            <div className="flex items-center w-1/2 my-2">
                <label htmlFor="location" className="w-1/3">Location </label>
                <input type="text" id="location" name="location" className="w-2/3 border border-gray-300 rounded px-2 py-1" onChange={handleInputChange} value={newFormData.location} />
            </div>
            <div className="flex items-center w-1/2 my-2">
                <label htmlFor="capacity" className="w-1/3">Capacity </label>
                <input type="number" id="capacity" name="capacity" className="w-2/3 border border-gray-300 rounded px-2 py-1" onChange={handleInputChange} value={newFormData.capacity} />
            </div>
            <div className="flex items-center w-1/2 my-2">
                <label htmlFor="hourly-rate" className="w-1/3">Hourly Rate </label>
                <input type="number" id="hourly-rate" name="hourlyRate" className="w-2/3 border border-gray-300 rounded px-2 py-1" onChange={handleInputChange} value={newFormData.hourlyRate} />
            </div>
            <button type="submit" className="rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Facility"}
            </button>
            {error && <div className="text-red-500">{error}</div>}
        </form>
    );
}
