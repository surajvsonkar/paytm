import { useEffect, useState } from "react"
import Appbar from "../components/Appbar"
import Balance from "../components/Balance"
import Users from "../components/Users"
import axios from "axios"

export const Dashboard = () => {
    const [value, setValue] = useState()

    useEffect(()=> {
        axios.get("http://localhost:3000/api/v1/account/balance", {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("token")
            }
        })
        .then((res)=> {
            setValue(res.data.balance)
        })
    }, [])


    return <div>
        <Appbar />
        <div className="m-8">
            <Balance value={value} />
            <Users />
        </div>
    </div>
}