import { useState } from "react"
import { addPlatform, addSeries, addStatus } from "../firebase/firebase"

import "../styles/addGame.css"

export function AddSeries () {

    const [message, setMessage] = useState("")

    const handleSubmit = async (e) => {
        setMessage("Ajout d'une nouvelle série...")
        e.preventDefault()
        await addSeries ({
            index: e.target.index.value,
            name: e.target.name.value
        }).then((response) => {
            console.log("response add series ", response)
            setMessage(response)
            setTimeout(() => {
                window.location.reload()
            }, 1500)
        })
    }

    return <div className="add-game">
        <form onSubmit={(e) => handleSubmit(e)}>
            <div className="field">
                <label htmlFor='index'>Index : </label>
                <input type='text' name="index" placeholder="smb" required></input>
            </div>
            <div className="field">
                <label htmlFor='name'>Nom</label>
                <input type='text' name="name" placeholder="Super Mario Bros." required></input>
            </div>
            <input type="submit" value="Ajouter" />
            {message !== "" && <pre>{message}</pre>}
        </form>
    </div>
}