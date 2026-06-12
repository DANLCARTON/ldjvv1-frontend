import { useState } from "react"
import { addPlatform } from "../firebase/firebase"

import "../styles/addGame.css"

export function AddPlatform () {

    const [message, setMessage] = useState("")

    const handleSubmit = async (e) => {
        setMessage("Ajout d'une nouvelle plateforme...")
        e.preventDefault()
        console.log(e.target.index.value)
        await addPlatform ({
            index: e.target.index.value,
            name: e.target.name.value,
            color: e.target.color.value
        }).then((response) => {
            console.log(response)
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
                <input type='text' name="index" placeholder="ns2" required></input>
            </div>
            <div className="field">
                <label htmlFor='name'>Nom</label>
                <input type='text' name="name" placeholder="Nintendo Switch 2" required></input>
            </div>
            <div className="field">
                <label htmlFor='platformId'>Couleur associée</label>
                <input type='color' name="color" required></input>
            </div>
            <input type="submit" value="Ajouter" />
            {message !== "" && <pre>{message}</pre>}
        </form>
    </div>
}