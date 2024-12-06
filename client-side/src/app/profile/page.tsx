"use client";
import {observer} from "mobx-react-lite"
import { useStore } from "../store/context"

function ProfilePage(){

    const {user} = useStore()

    console.log(">>>>>>>>>>>>", user)

    return(<div>
        Profile Page
        <div>
            {JSON.stringify(user)}
        </div>
    </div>
    )
}

export default observer(ProfilePage)
