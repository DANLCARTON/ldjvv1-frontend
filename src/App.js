import './App.css';
import { getAllGames, getPlatforms } from './firebase/firebase';
import { AddGame } from './components/addGame.js';

import "./firebase.js"
import { AddPlatform } from './components/addPlatform.js';
import { GameList } from './components/gameList.js';
import { useState } from 'react';

import "./styles/modal.css"

const gamelist = await getAllGames() ?? []
const platformslist = await getPlatforms() ?? []

console.log(gamelist);

function App() {

  const nextIndex = gamelist.length+1 

  const [addGameModal, setAddGameModal] = useState(false)
  const [addPlatformModal, setAddPlatformModal] = useState(false)

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
      </div>


      <GameList gamelist={gamelist} platformslist={platformslist}/>

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

      {}
    </div>
  );
}

export default App;