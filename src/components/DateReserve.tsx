"use client"

import { DatePicker } from "@mui/x-date-pickers";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { Dayjs } from "dayjs";
import { useEffect } from "react";


export default function DateReserve({ resetKey, onBookingChange }: { resetKey: number; onBookingChange: (bookingItem: BookingSchedule) => void }) {

    const [bookingDate, setBookingDate] = useState<Dayjs | null>(null);
    const [startTime, setStartTime] = useState<Dayjs | null>(null);
    const [durationHours, setDurationHours] = useState<number>(0.5);

    useEffect(() => {
        const bookingItem: BookingSchedule = {
            bookingDate: bookingDate?.format("YYYY-MM-DD") || "",
            startTime: startTime?.format("HH:mm") || "",
            durationHours: durationHours
        };
        onBookingChange(bookingItem);
    }, [bookingDate, startTime, durationHours]);

    useEffect(() => {
        setBookingDate(null);
        setStartTime(null);
        setDurationHours(0.5);
    }, [resetKey]);

    return (
        <div className="bg-slate-100 rounded-lg gap-x-5 gap-y-2 w-fit px-10 py-5 flex flex-row justify-center">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker className="bg-white"
                    value={bookingDate}
                    onChange={(newDate) => setBookingDate(newDate)}
                />
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                    label="Start Time"
                    ampm={false}
                    format="HH:mm"
                    value={startTime}
                    onChange={(newValue) => setStartTime(newValue)}
                />
            </LocalizationProvider>

            <TextField
                variant="standard"
                name="Duration-Hours"
                label="Duration-Hours"
                type="number"
                value={durationHours}
                onChange={(e) => setDurationHours(Number(e.target.value))}
                slotProps={{
                    htmlInput: {
                        min: 0.5,
                        max: 2,
                        step: 0.5,
                    },
                }}
            />

        </div>


    );
}
