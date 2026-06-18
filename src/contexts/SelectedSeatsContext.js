import { createContext } from "react";

export const SelectedSeatsContext = createContext({
    vehicleID:null,
    seats:[]
});