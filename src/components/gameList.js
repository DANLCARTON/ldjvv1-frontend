import "../styles/gameList.css"

export function GameList (props) {

    let {gamelist, platformslist} = props

    gamelist = gamelist.sort((a, b) => a.name.localeCompare(b.name));

    return <section id='gamelist'>

        {gamelist.map((game, index) => (
            <div 
                key={index}
                className={"game "}
                style={{
                    border: "2px solid",
                    borderColor: platformslist[game.platformId].color
                }}
            >
                <img src={game.cover} alt={game.name} />

                <p 
                    class='platform-name'
                    style={{
                        backgroundColor: platformslist[game.platformId].color
                    }}
                >{platformslist[game.platformId].name}</p>
                
                <p 
                    class='game-name'
                    style={{
                        backgroundColor: platformslist[game.platformId].color
                    }}
                >{game.name}</p>
            </div>
        ))}

    </section>

}