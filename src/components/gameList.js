import "../styles/gameList.css"

export function GameList (props) {

    let {gamelist, platformslist, statuseslist, setIndex, setUpdateGameModal} = props

    gamelist = gamelist.sort((a, b) => a.name.localeCompare(b.name));

    console.log("statuseslist", statuseslist)
    console.log("platformslist", platformslist)
    console.log("dkflskdmlf", statuseslist["100"].color)

    return <section id='gamelist'>

        {gamelist.map((game, index) => (
            <div 
                key={index}
                className={"game "}
                style={{
                    // borderImage: `linear-gradient(
                    //     135deg, 
                    //     ${platformslist[game.platformId].color},
                    //     ${game.statusId && statuseslist[game.statusId].color}
                    // )`,
                    // borderWidth: '2px',
                    // borderStyle: 'solid',
                    // padding: '5px',
                    boxShadow: `
                        -5px 0 10px ${platformslist[game.platformId].color},
                        5px 0 10px ${game.statusId && statuseslist[game.statusId].color}
                    `,
                    border: "2px solid",
                    borderColor: platformslist[game.platformId].color,
                    borderColor: game.statusId && statuseslist[game.statusId].color,
                    // boxShadow: `0 0 3px 3px ${game.statusId && statuseslist[game.statusId].color}`
                }}
                onClick={() => {
                    setIndex(game.index)
                    setUpdateGameModal(true)
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


                    // border: "2px solid",
                    // borderColor: platformslist[game.platformId].color,
                    // boxShadow: `0 0 5px 5px ${game.statusId && statuseslist[game.statusId].color}`