import { useContext, useEffect, useState } from "react"
import { AdminReservationCard } from "../../components/card/AdminReservationCard"
import { FlatList, ScrollView } from 'react-native'
import axios from "axios"
import { BASE_URL } from "../../helpers/BASE_URL"
import { access_token } from "../../helpers/AccessToken"
import { LoginContext } from "../../context/AuthContext"
export const AdminReservation = () => {
    const [reservations, setReservations] = useState([])
    const {userSession} = useContext(LoginContext)
    console.log(userSession);
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
    return (
        <>
       <FlatList
            data={reservations}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <AdminReservationCard reservation={item} />}
        />

        </>
    )
}