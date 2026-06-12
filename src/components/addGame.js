import { useState } from "react"
import { addGame, getPlatforms } from "../firebase/firebase"
import "../styles/addGame.css"

const platforms = Object.values(await getPlatforms() ?? [])

export function AddGame (props) {

    const {nextIndex} = props

    const [message, setMessage] = useState("")

    console.log("platforms " + platforms)

    const handleSubmit = async (e) => {
        setMessage("Ajout d'un nouveau jeu...")
        e.preventDefault()
        console.log(e.target.index.value)
        await addGame ({
            index: e.target.index.value,
            name: e.target.name.value,
            platformId: e.target.platformId.value
        }).then((response) => {
            setMessage(response)
            setTimeout(() => {
                window.location.reload()
            }, 500)
        })
    }

    return <div className="add-game" onClick={() => console.log("skdlfsl")}>
        <form onSubmit={(e) => handleSubmit(e)} onClick={() => console.log("feur")}>
            <div className="field">
                <label htmlFor='index'>N°</label>
                <input type='number' name="index" value={nextIndex} disabled required></input>
            </div>
            <div className="field">
                <label htmlFor='name'>Nom du jeu</label>
                <input type='text' name="name" placeholder="Super Mario Bros." required></input>
            </div>
            <div className="field">
                <label htmlFor='platformId'>Plateforme</label>
                <select name='platformId'>
                    {platforms.map((platform, index) => (
                        <option key={index} value={platform.index}>{platform.name}</option>
                    ))}
                </select>
            </div>
            
            <input type="submit" value="Ajouter" />
            {message !== "" && <pre>{message}</pre>}
        </form>
    </div>
}