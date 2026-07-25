import { useState } from "react"
import { addGame, getPlatforms, getSeries, getStatuses } from "../firebase/firebase"
import "../styles/addGame.css"

const platforms = Object.values(await getPlatforms() ?? [])
const statuses = Object.values(await getStatuses() ?? [])
const series = Object.values(await getSeries() ?? [])

    export function AddGame (props) {

        const {nextIndex} = props

        const [message, setMessage] = useState("")

        const [collectionFlag, setCollectionFlag] = useState(false)
        const [DLCFlag, setDLCFlag] = useState(false)
        const [episodicFlag, setEpisodicFlag] = useState(false)

        const [collectionLength, setCollectionLength] = useState(0)
        const [DLCLength, setDLCLength] = useState(0)
        const [episodicLength, setEpisodicLength] = useState(0)

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
                    collectionGamesList.push({name: name, statusId: statusId})
                }
            }

            if (DLCFlag) {
                for (let i = 0; i < DLCLength; i++) {
                    const name = formData.get(`DLCSubGameName|${i}`)
                    const statusId = formData.get(`DLCSubGameStatusId|${i}`)  
                    DLCGamesList.push({name: name, statusId: statusId})
                }
            }

            if (episodicFlag) {
                for (let i = 0; i < episodicLength; i++) {
                    const name = formData.get(`episodicSubGameName|${i}`)
                    const statusId = formData.get(`episodicSubGameStatusId|${i}`)  
                    episodicGamesList.push({name: name, statusId: statusId})
                }
            }

            console.log("collectionGamesList : " ,collectionGamesList)
            console.log("DLCGamesList : " ,DLCGamesList)
            console.log("episodicGamesList : " ,episodicGamesList)

            setMessage("Ajout d'un nouveau jeu...")
            await addGame ({
                index: e.target.index.value,
                name: e.target.name.value,
                platformId: e.target.platformId.value,
                statusId: e.target.statusId.value,
                purchaseDate: e.target.purchaseDate.value,
                releaseDate: e.target.releaseDate.value,
                startDate: e.target.startDate.value,
                endDate: e.target.endDate.value,
                seriesId: e.target.seriesId.value,
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

        const handleAddSubGame = (listName) => {
            if (listName === "collection") setCollectionLength(collectionLength+1)
            if (listName === "dlc") setDLCLength(DLCLength+1)
            if (listName === "episodic") setEpisodicLength(episodicLength+1)
        } 

        const handleDeleteSubGame = (listName) => {
            if (listName === "collection") setCollectionLength(collectionLength > 0 ? collectionLength-1 : 0)
            if (listName === "dlc") setDLCLength(DLCLength > 0 ? DLCLength-1 : 0)
            if (listName === "episodic") setEpisodicLength(episodicLength > 0 ? episodicLength-1 : 0)
        } 

        return <div className="add-game">
            <form onSubmit={(e) => handleSubmit(e)}>
                <section>
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
                    <div className="field">
                        <label htmlFor='statusId'>Statut</label>
                        <select name='statusId'>
                            {statuses.map((status, index) => (
                                <option key={index} value={status.index}>{status.name}</option>
                            ))}
                        </select>
                    </div>

                    
                    <div className="field">
                        <label htmlFor='purchaseDate'>Date d'achat</label>
                        <input type='date' name="purchaseDate"></input>
                    </div>
                    <div className="field">
                        <label htmlFor='releaseDate'>Date de sortie</label>
                        <input type='date' name="releaseDate"></input>
                    </div>
                    <div className="field">
                        <label htmlFor='startDate'>Date de début</label>
                        <input type='date' name="startDate"></input>
                    </div>
                    <div className="field">
                        <label htmlFor='endDate'>Date de fin</label>
                        <input type='date' name="endDate"></input>
                    </div>
                    
                    <div className="field">
                        <label htmlFor='seriesId'>Série</label>
                        <select name='seriesId'>
                            <option>---</option>
                            {series.map((serie, index) => (
                                <option key={index} value={serie.index}>{serie.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="field checkbox-field">
                        <input type="checkbox" name="collectionFlag" id="collectionFlag" onClick={(() => setCollectionFlag(!collectionFlag))}></input>
                        <label htmlFor='collectionFlag'>Est une compilation de jeux</label>
                    </div>

                    <div className="field checkbox-field">
                        <input type="checkbox" name="DLCFlag" id="DLCFlag" onClick={(() => setDLCFlag(!DLCFlag))}></input>
                        <label htmlFor='DLCFlag'>Contient des DLC</label>
                    </div>

                    <div className="field checkbox-field">
                        <input type="checkbox" name="episodicFlag" id="episodicFlag" onClick={(() => setEpisodicFlag(!episodicFlag))}></input>
                        <label htmlFor='episodicFlag'>Est un jeu épisodique</label>
                    </div>

                    <input type="submit" value="Ajouter" />

                    {message !== "" && <pre>{message}</pre>}

                </section>

                {(collectionFlag || DLCFlag || episodicFlag) && <div className="sub-games">


                    {collectionFlag && <div className="sub-games-list">
                        <h3>Compilation</h3>    

                        <div className='add-button-container'>
                            <button onClick={(() => handleAddSubGame("collection"))}>+</button>
                            <p>Ajouter un jeu</p>
                        </div>

                        {Array.from({length: collectionLength}).map((_, index) => (
                            <div class="sub-game">
                                <input type="text" name={"collectionSubGameName|"+index} placeholder="nom" required></input>
                                <select name={"collectionSubGameStatusId|"+index}>
                                    {statuses.map((status, index) => (
                                        <option key={index} value={status.index}>{status.name}</option>
                                    ))}
                                </select>
                            </div>
                        ))}

                        {collectionLength > 0 && <div className='add-button-container'>
                            <button onClick={(() => handleDeleteSubGame("collection"))}>-</button>
                            <p>Retirer un jeu</p>
                        </div>}
                        
                    </div>}



                    {DLCFlag && <div className="sub-games-list">
                        <h3>Liste de DLC</h3>    

                        <div className='add-button-container'>
                            <button onClick={(() => handleAddSubGame("dlc"))}>+</button>
                            <p>Ajouter un DLC</p>
                        </div>

                        <span class="precision">Idéalement, inclure le jeu de base sous le nom "jeu de base"</span>

                        {Array.from({length: DLCLength}).map((_, index) => (
                            <div class="sub-game">
                                <input type="text" name={"DLCSubGameName|"+index} placeholder="nom" required></input>
                                <select name={"DLCSubGameStatusId|"+index}>
                                    {statuses.map((status, index) => (
                                        <option key={index} value={status.index}>{status.name}</option>
                                    ))}
                                </select>
                            </div>
                        ))}

                        {DLCLength > 0 && <div className='add-button-container'>
                            <button onClick={(() => handleDeleteSubGame("dlc"))}>-</button>
                            <p>Retirer un DLC</p>
                        </div>}
                        
                    </div>}



                    {episodicFlag && <div className="sub-games-list">
                        <h3>Épisodes</h3>    

                        <div className='add-button-container'>
                            <button onClick={(() => handleAddSubGame("episodic"))}>+</button>
                            <p>Ajouter un épisode</p>
                        </div>

                        {Array.from({length: episodicLength}).map((_, index) => (
                            <div class="sub-game">
                                <input type="text" name={"episodicSubGameName|"+index} placeholder="nom" required></input>
                                <select name={"episodicSubGameStatusId|"+index}>
                                    {statuses.map((status, index) => (
                                        <option key={index} value={status.index}>{status.name}</option>
                                    ))}
                                </select>
                            </div>
                        ))}

                        {episodicLength > 0 && <div className='add-button-container'>
                            <button onClick={(() => handleDeleteSubGame("episodic"))}>-</button>
                            <p>Retirer un épisode</p>
                        </div>}
                        
                    </div>}

                </div>}
            </form>
        </div>
    }