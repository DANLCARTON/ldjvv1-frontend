import './App.css';
import { getAllGames, getPlatforms, getStatus, getStatuses } from './firebase/firebase';
import { AddGame } from './components/addGame.js';

import "./firebase.js"
import { AddPlatform } from './components/addPlatform.js';
import { AddStatus } from './components/addStatus.js';
import { GameList } from './components/gameList.js';
import { useState } from 'react';

import "./styles/modal.css"
import { AddSeries } from './components/addSeries.js';
import { UpdateGame } from './components/updateGame.js';

const gamelist = await getAllGames() ?? []
const platformslist = await getPlatforms() ?? []
const statuseslist = await getStatuses() ?? []

function App() {

  const nextIndex = gamelist.length+1 

  const [index, setIndex] = useState(0)

  const [addGameModal, setAddGameModal] = useState(false)
  const [addPlatformModal, setAddPlatformModal] = useState(false)
  const [addStatusModal, setAddStatusModal] = useState(false)
  const [addSeriesModal, setAddSeriesModal] = useState(false)
  const [updateGameModal, setUpdateGameModal] = useState(false)

  return (
    <div className="App">

      <div className='buttons'>
        <button 
          class='add'
          onClick={() => setAddGameModal(true)}
        >+ Ajouter un nouveau jeu</button>
        <button 
          class='add'
          onClick={() => setAddPlatformModal(true)}
        >+ Ajouter une nouvelle plateforme</button>
        <button 
          class='add'
          onClick={() => setAddStatusModal(true)}
        >+ Ajouter un nouveau statut</button>
        <button 
          class='add'
          onClick={() => setAddSeriesModal(true)}
        >+ Ajouter une nouvelle série</button>
      </div>


      <GameList 
        gamelist={gamelist} 
        platformslist={platformslist} 
        statuseslist={statuseslist}
        setIndex={setIndex} 
        setUpdateGameModal={setUpdateGameModal} 
      />

      {addGameModal && <div className='modal add-game' onClick={() => {setAddGameModal(false)}}>
        <div onClick={(e) => {e.stopPropagation()}}>
          <AddGame nextIndex={nextIndex} />
        </div>
      </div>}

      {addPlatformModal && <div className='modal add-game' onClick={() => setAddPlatformModal(false)}>
        <div onClick={(e) => {e.stopPropagation()}}>
          <AddPlatform />
        </div>
      </div>}

      {addStatusModal && <div className='modal add-game' onClick={() => setAddStatusModal(false)}>
        <div onClick={(e) => {e.stopPropagation()}}>
          <AddStatus />
        </div>
      </div>}

      {addSeriesModal && <div className='modal add-game' onClick={() => setAddSeriesModal(false)}>
        <div onClick={(e) => {e.stopPropagation()}}>
          <AddSeries />
        </div>
      </div>}

      {updateGameModal && <div className='modal add-game' onClick={() => setUpdateGameModal(false)}>
        <div onClick={(e) => {e.stopPropagation()}}>
          <UpdateGame index={index} gamelist={gamelist}/>
        </div>
      </div>}
    </div>
  );
}

export default App;