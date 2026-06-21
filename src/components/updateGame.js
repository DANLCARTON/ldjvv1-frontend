import { useState } from "react"
import { getPlatforms, getSeries, getStatuses, updateGame } from "../firebase/firebase"
import "../styles/addGame.css"

const platforms = Object.values(await getPlatforms() ?? [])
const statuses = Object.values(await getStatuses() ?? [])
const series = Object.values(await getSeries() ?? [])

export function UpdateGame (props) {

    const {index, gamelist} = props

    const [message, setMessage] = useState("")

    const currentGame = gamelist.filter((game) => game.index === index)[0]

    console.log("currentGame", currentGame)

    const handleSubmit = async (e) => {
        setMessage("Ajout d'un nouveau jeu...")
        console.log("td update game e target value", e.target.index.value)
        console.log("td update game e target value", e.target.name.value)
        console.log("td update game e target value", e.target.platformId.value)
        console.log("td update game e target value", e.target.statusId.value)
        console.log("td update game e target value", e.target.purchaseDate.value)
        console.log("td update game e target value", e.target.releaseDate.value)
        console.log("td update game e target value", e.target.startDate.value)
        console.log("td update game e target value", e.target.endDate.value)
        console.log("td update game e target value", e.target.seriesId.value)
        e.preventDefault()
        await updateGame ({
            index: e.target.index.value,
            name: e.target.name.value,
            platformId: e.target.platformId.value,
            statusId: e.target.statusId.value,
            purchaseDate: e.target.purchaseDate.value,
            releaseDate: e.target.releaseDate.value,
            startDate: e.target.startDate.value,
            endDate: e.target.endDate.value,
            seriesId: e.target.seriesId.value
        }).then((response) => {
            console.log("response update game", response)
            setMessage(response)
            setTimeout(() => {
                window.location.reload()
            }, 500)
        })
    }

    

    return <div className="add-game">
        <form onSubmit={(e) => handleSubmit(e)}>
            <div className="field">
                <label htmlFor='index'>N°</label>
                <input type='number' name="index" value={currentGame.index} disabled required></input>
            </div>
            <div className="field">
                <label htmlFor='name'>Nom du jeu</label>
                <input type='text' name="name" placeholder="Super Mario Bros." defaultValue={currentGame.name} required></input>
            </div>
            <div className="field">
                <label htmlFor='platformId'>Plateforme</label>
                <select name='platformId'>
                    {platforms.map((platform, index) => (
                        <option key={index} defaultValue={platform.index} value={platform.index} selected={platform.index === currentGame.platformId}>{platform.name}</option>
                    ))}
                </select>
            </div>
            <div className="field">
                <label htmlFor='statusId'>Statut</label>
                <select name='statusId'>
                    {statuses.map((status, index) => (
                        <option key={index} defaultValue={status.index} value={status.index} selected={status.index === currentGame.statusId}>{status.name}</option>
                    ))}
                </select>
            </div>

            
            <div className="field">
                <label htmlFor='purchaseDate'>Date d'achat</label>
                <input type='date' name="purchaseDate" defaultValue={currentGame.purchaseDate}></input>
            </div>
            <div className="field">
                <label htmlFor='releaseDate'>Date de sortie</label>
                <input type='date' name="releaseDate" defaultValue={currentGame.releaseDate}></input>
            </div>
            <div className="field">
                <label htmlFor='startDate'>Date de début</label>
                <input type='date' name="startDate" defaultValue={currentGame.startDate}></input>
            </div>
            <div className="field">
                <label htmlFor='endDate'>Date de fin</label>
                <input type='date' name="endDate" defaultValue={currentGame.endDate}></input>
            </div>
            
            <div className="field">
                <label htmlFor='seriesId'>Série</label>
                <select name='seriesId'>
                    <option>---</option>
                    {series.map((serie, index) => (
                        <option key={index} defaultValue={serie.index} value={serie.index} selected={serie.index === currentGame.seriesId}>{serie.name}</option>
                    ))}
                </select>
            </div>

            <input type="submit" value="Mettre à jour" />
            {message !== "" && <pre>{message}</pre>}
        </form>
    </div>
}