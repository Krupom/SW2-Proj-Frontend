"use client"

import { DatePicker } from "@mui/x-date-pickers";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useEffect } from "react";

type DateReserveProps = {
    resetKey: number;
    initialSchedule?: BookingSchedule;
    onBookingChange: (bookingItem: BookingSchedule) => void;
};

export default function DateReserve({ resetKey, initialSchedule, onBookingChange }: DateReserveProps) {

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
        if (initialSchedule) {
            setBookingDate(dayjs(initialSchedule.bookingDate));
            setStartTime(dayjs(`2000-01-01T${initialSchedule.startTime}`));
            setDurationHours(initialSchedule.durationHours);
            return;
        }

        setBookingDate(null);
        setStartTime(null);
        setDurationHours(0.5);
    }, [
        resetKey,
        initialSchedule?.bookingDate,
        initialSchedule?.startTime,
        initialSchedule?.durationHours,
    ]);

    return (
        <div className="flex w-full flex-nowrap items-center justify-center gap-3 overflow-x-auto rounded-lg bg-slate-100 px-3 py-5">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker className="bg-white"
                    sx={{ width: 200, flexShrink: 0 }}
                    value={bookingDate}
                    onChange={(newDate) => setBookingDate(newDate)}
                />
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                    label="Start Time"
                    sx={{ width: 200, flexShrink: 0 }}
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
                sx={{ width: 180, flexShrink: 0 }}
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
