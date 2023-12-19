import { useContext, useEffect, useState } from "react"
import { AdminReservationCard } from "../../components/card/AdminReservationCard"
import { FlatList } from 'react-native'
import axios from "axios"
import { BASE_URL } from "../../helpers/BASE_URL"

import { LoginContext } from "../../context/AuthContext"

export const AdminReservation = () => {
    const [reservations, setReservations] = useState([])
    
    const {userInfo} = useContext(LoginContext)

    const token = userInfo.access_token
    useEffect(() => {
        const asyncFn = async() => {
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