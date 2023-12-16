import { AdminReservationCard } from "../components/AdminReservationCard"
import {ScrollView} from 'react-native'
export const AdminReservation = () => {
    return (
        <>
        <ScrollView>
        <AdminReservationCard/>
        <AdminReservationCard/>
        <AdminReservationCard/>
        <AdminReservationCard/>
        </ScrollView>
        </>
    )
}