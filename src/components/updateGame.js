import { useState } from "react"
import { getPlatforms, getSeries, getStatuses, updateGame } from "../firebase/firebase"
import "../styles/addGame.css"

const platforms = Object.values(await getPlatforms() ?? [])
const statuses = Object.values(await getStatuses() ?? [])
const series = Object.values(await getSeries() ?? [])

export function UpdateGame (props) {

    const {index, gamelist, access} = props

    const [message, setMessage] = useState("")

    const currentGame = gamelist.filter((game) => game.index === index)[0]

    console.log("currentGame", currentGame)

    const [collectionFlag, setCollectionFlag] = useState(currentGame.collectionFlag === "true")
    const [DLCFlag, setDLCFlag] = useState(currentGame.DLCFlag === "true")
    const [episodicFlag, setEpisodicFlag] = useState(currentGame.episodicFlag === "true")

    const [collectionLength, setCollectionLength] = useState(currentGame.collectionGames?.length ?? 0)
    const [DLCLength, setDLCLength] = useState(currentGame.DLCGames?.length ?? 0)
    const [episodicLength, setEpisodicLength] = useState(currentGame.episodicGames?.length ?? 0)

    const handleSubmit = async (e) => {
        e.preventDefault()

        let collectionGamesList = []
        let DLCGamesList = []
        let episodicGamesList = []

        const formData = new FormData(e.target)

        if (collectionFlag) {
            for (let i = 0; i < collectionLength; i++) {
                const name = formData.get(`collectionSubGameName|${i}`)
                const statusId = formData.get(`collectionSubGameStatusId|${i}`)
                collectionGamesList.push({name, statusId})
            }
        }

        if (DLCFlag) {
            for (let i = 0; i < DLCLength; i++) {
                const name = formData.get(`DLCSubGameName|${i}`)
                const statusId = formData.get(`DLCSubGameStatusId|${i}`)
                DLCGamesList.push({name, statusId})
            }
        }

        if (episodicFlag) {
            for (let i = 0; i < episodicLength; i++) {
                const name = formData.get(`episodicSubGameName|${i}`)
                const statusId = formData.get(`episodicSubGameStatusId|${i}`)
                episodicGamesList.push({name, statusId})
            }
        }

        console.log("collectionGamesList : ", collectionGamesList)
        console.log("DLCGamesList : ", DLCGamesList)
        console.log("episodicGamesList : ", episodicGamesList)

        setMessage("Mise à jour du jeu...")

        if (access) {
            await updateGame({
                index: currentGame.index,
                name: formData.get("name"),
                platformId: formData.get("platformId"),
                statusId: formData.get("statusId"),
                purchaseDate: formData.get("purchaseDate"),
                releaseDate: formData.get("releaseDate"),
                startDate: formData.get("startDate"),
                endDate: formData.get("endDate"),
                seriesId: formData.get("seriesId"),

                collectionFlag: collectionFlag ? "true" : "false",
                DLCFlag: DLCFlag ? "true" : "false",
                episodicFlag: episodicFlag ? "true" : "false",

                collectionGames: collectionGamesList,
                DLCGames: DLCGamesList,
                episodicGames: episodicGamesList
            }).then((response) => {
                setMessage(response)
                setTimeout(() => {
                    window.location.reload()
                }, 500)
            })
        }
    }

    // --- AJOUT / SUPPRESSION DE SOUS-JEUX ---
    const handleAddSubGame = (listName) => {
        if (listName === "collection") setCollectionLength(collectionLength + 1)
        if (listName === "dlc") setDLCLength(DLCLength + 1)
        if (listName === "episodic") setEpisodicLength(episodicLength + 1)
    }

    const handleDeleteSubGame = (listName) => {
        if (listName === "collection") setCollectionLength(collectionLength > 0 ? collectionLength - 1 : 0)
        if (listName === "dlc") setDLCLength(DLCLength > 0 ? DLCLength - 1 : 0)
        if (listName === "episodic") setEpisodicLength(episodicLength > 0 ? episodicLength - 1 : 0)
    }

    

    return <div className="add-game">
        <form onSubmit={(e) => handleSubmit(e)}>
            <section>

                <div className="field">
                    <label htmlFor='index'>N°</label>
                    <input type='number' name="index" value={currentGame.index} disabled required />
                </div>

                <div className="field">
                    <label htmlFor='name'>Nom du jeu</label>
                    {access 
                        ? <input type='text' name="name" defaultValue={currentGame.name} required />
                        : <input type='text' name="name" defaultValue={currentGame.name} required disabled />}
                </div>

                <div className="field">
                    <label htmlFor='platformId'>Plateforme</label>
                    <select name='platformId' defaultValue={currentGame.platformId} disabled={access ? false : true}>
                        {platforms.map((platform, index) => (
                            <option key={index} value={platform.index}>
                                {platform.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="field">
                    <label htmlFor='statusId'>Statut</label>
                    <select name='statusId' defaultValue={currentGame.statusId} disabled={access ? false : true}>
                        {statuses.map((status, index) => (
                            <option key={index} value={status.index}>
                                {status.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="field">
                    <label htmlFor='purchaseDate'>Date d'achat</label>
                    <input type='date' name="purchaseDate" defaultValue={currentGame.purchaseDate} disabled={access ? false : true} />
                </div>

                <div className="field">
                    <label htmlFor='releaseDate'>Date de sortie</label>
                    <input type='date' name="releaseDate" defaultValue={currentGame.releaseDate} disabled={access ? false : true} />
                </div>

                <div className="field">
                    <label htmlFor='startDate'>Date de début</label>
                    <input type='date' name="startDate" defaultValue={currentGame.startDate} disabled={access ? false : true} />
                </div>

                <div className="field">
                    <label htmlFor='endDate'>Date de fin</label>
                    <input type='date' name="endDate" defaultValue={currentGame.endDate} disabled={access ? false : true} />
                </div>

                <div className="field">
                    <label htmlFor='seriesId'>Série</label>
                    <select name='seriesId' defaultValue={currentGame.seriesId} disabled={access ? false : true} >
                        <option value="---">---</option>
                        {series.map((serie, index) => (
                            <option key={index} value={serie.index}>
                                {serie.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="field checkbox-field">
                    <input type="checkbox" name="collectionFlag" id="collectionFlag" defaultChecked={currentGame.collectionFlag === "true"} onClick={() => setCollectionFlag(!collectionFlag)} disabled={access ? false : true}/>
                    <label htmlFor='collectionFlag'>Est une compilation de jeux</label>
                </div>

                <div className="field checkbox-field">
                    <input type="checkbox" name="DLCFlag" id="DLCFlag" defaultChecked={currentGame.DLCFlag === "true"} onClick={() => setDLCFlag(!DLCFlag)} disabled={access ? false : true}/>
                    <label htmlFor='DLCFlag'>Contient des DLC</label>
                </div>

                <div className="field checkbox-field">
                    <input type="checkbox" name="episodicFlag" id="episodicFlag" defaultChecked={currentGame.episodicFlag === "true"} onClick={() => setEpisodicFlag(!episodicFlag)} disabled={access ? false : true}/>
                    <label htmlFor='episodicFlag'>Est un jeu épisodique</label>
                </div>

                {access && <input type="submit" value="Mettre à jour" />}

                {message !== "" && <pre>{message}</pre>}

            </section>

            {(collectionFlag || DLCFlag || episodicFlag) && (
                <div className="sub-games">

                    {collectionFlag && (
                        <div className="sub-games-list">
                            <h3>Compilation</h3>

                            {access && <div className='add-button-container'>
                                <button onClick={() => handleAddSubGame("collection")}>+</button>
                                <p>Ajouter un jeu</p>
                            </div>}

                            {Array.from({ length: collectionLength }).map((_, index) => (
                                <div className="sub-game" key={index}>
                                    <input type="text" name={"collectionSubGameName|" + index} placeholder="nom" defaultValue={currentGame.collectionGames?.[index]?.name} required disabled={access ? false : true} />
                                    <select name={"collectionSubGameStatusId|" + index} defaultValue={currentGame.collectionGames?.[index]?.statusId} disabled={access ? false : true} >
                                        {statuses.map((status, idx) => (
                                            <option key={idx} value={status.index}>
                                                {status.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            ))}

                            {access && collectionLength > 0 && (
                                <div className='add-button-container'>
                                    <button onClick={() => handleDeleteSubGame("collection")}>-</button>
                                    <p>Retirer un jeu</p>
                                </div>
                            )}
                        </div>
                    )}

                    {DLCFlag && (
                        <div className="sub-games-list">
                            <h3>Liste de DLC</h3>

                            {access && <div className='add-button-container'>
                                <button onClick={() => handleAddSubGame("dlc")}>+</button>
                                <p>Ajouter un DLC</p>
                            </div>}

                            <span className="precision">Idéalement, inclure le jeu de base sous le nom "jeu de base"</span>

                            {Array.from({ length: DLCLength }).map((_, index) => (
                                <div className="sub-game" key={index}>
                                    <input type="text" name={"DLCSubGameName|" + index} placeholder="nom" defaultValue={currentGame.DLCGames?.[index]?.name} required disabled={access ? false : true}/>
                                    <select name={"DLCSubGameStatusId|" + index} defaultValue={currentGame.DLCGames?.[index]?.statusId} disabled={access ? false : true}>
                                        {statuses.map((status, idx) => (
                                            <option key={idx} value={status.index}>
                                                {status.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            ))}

                            {access && DLCLength > 0 && (
                                <div className='add-button-container'>
                                    <button onClick={() => handleDeleteSubGame("dlc")}>-</button>
                                    <p>Retirer un DLC</p>
                                </div>
                            )}
                        </div>
                    )}

                    {episodicFlag && (
                        <div className="sub-games-list">
                            <h3>Épisodes</h3>

                            {access && <div className='add-button-container'>
                                <button onClick={() => handleAddSubGame("episodic")}>+</button>
                                <p>Ajouter un épisode</p>
                            </div>}

                            {Array.from({ length: episodicLength }).map((_, index) => (
                                <div className="sub-game" key={index}>
                                    <input type="text" name={"episodicSubGameName|" + index} placeholder="nom" defaultValue={currentGame.episodicGames?.[index]?.name} required disabled={access ? false : true}/>
                                    <select name={"episodicSubGameStatusId|" + index} defaultValue={currentGame.episodicGames?.[index]?.statusId} disabled={access ? false : true}>
                                        {statuses.map((status, idx) => (
                                            <option key={idx} value={status.index}>
                                                {status.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            ))}

                            {access && episodicLength > 0 && (
                                <div className='add-button-container'>
                                    <button onClick={() => handleDeleteSubGame("episodic")}>-</button>
                                    <p>Retirer un épisode</p>
                                </div>
                            )}
                        </div>
                    )}
    
                </div>
            )}
        </form>
    </div>

}