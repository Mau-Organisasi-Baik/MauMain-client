import { useEffect, useState } from "react"
import { AdminReservationCard } from "../../components/AdminReservationCard"
import { FlatList, ScrollView } from 'react-native'
import axios from "axios"
import { BASE_URL } from "../../helpers/BASE_URL"
import { access_token } from "../../helpers/AccessToken"
export const AdminReservation = () => {
    const [reservations, setReservations] = useState([])
    useEffect(() => {
        const asyncFn = async() => {
            const token = await access_token()
            const {data} = await axios.get(`${BASE_URL}/admin/reservations`, {
                headers : {
                    'Authorization' : `Bearer ${token}`
                }
            })
            setReservations(data.data.reservations)
        }
        asyncFn()
    }, [])
    console.log(reservations);
    return (
        <>
       <FlatList
            data={reservations}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <AdminReservationCard reservation={item} />}
        />
        {/* <ScrollView>
        
        <AdminReservationCard/>
        <AdminReservationCard/>
        <AdminReservationCard/>
        </ScrollView> */}
        </>
    )
}