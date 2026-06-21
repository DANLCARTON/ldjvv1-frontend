import "../styles/gameList.css"

export function GameList (props) {

    let {
        gamelist, 
        platformslist, 
        statuseslist, 
        setIndex, 
        setUpdateGameModal, 
        sort
    } = props

    if (sort === "alpha") {
        gamelist = gamelist.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === "ldjvv1") {
        gamelist = gamelist.sort((a, b) => b.index - a.index)
    } else if (sort === "platform") {
        gamelist = gamelist.sort((a, b) =>  a.platformId.localeCompare(b.platformId))
    } else if (sort === "status") {
        gamelist = gamelist.sort((a, b) => {
            if (a.statusId == null) return 1
            if (b.statusId == null) return -1

            return a.statusId.localeCompare(b.statusId)
        })
    } else if (sort === "releaseDate") {
        gamelist = gamelist.sort((a, b) => {
            if (a.releaseDate == null) return 1
            if (b.releaseDate == null) return -1

            return a.releaseDate.localeCompare(b.releaseDate)
        })
    } else if (sort === "purchaseDate") {
        gamelist = gamelist.sort((a, b) => {
            if (a.purchaseDate == null) return 1
            if (b.purchaseDate == null) return -1

            return a.purchaseDate.localeCompare(b.purchaseDate)
        })
    } else if (sort === "series") {
        gamelist = gamelist.sort((a, b) => {
            if (a.seriesId == null) return 1
            if (b.seriesId == null) return -1

            return a.seriesId.localeCompare(b.seriesId)
        })
    } else {
        gamelist = gamelist.sort((a, b) => a.name.localeCompare(b.name));
    }

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
                    // borderColor: platformslist[game.platformId].color,
                    borderColor: game.statusId && statuseslist[game.statusId].color,
                    // boxShadow: `0 0 3px 3px ${game.statusId && statuseslist[game.statusId].color}`
                }}
                onClick={() => {
                    setIndex(game.index)
                    setUpdateGameModal(true)
                }}
            >
                <img src={game.cover} alt={game.name} />

                {["alpha", "ldjvv1", "platform", "series"].includes(sort) && <p 
                    class='platform-name'
                    style={{
                        backgroundColor: platformslist[game.platformId].color
                    }}
                >{platformslist[game.platformId].name}</p>}

                {sort === "releaseDate" && <p 
                    class='platform-name'
                    style={{
                        backgroundColor: platformslist[game.platformId].color
                    }}
                >{game.releaseDate}</p>}

                {sort === "purchaseDate" && <p 
                    class='platform-name'
                    style={{
                        backgroundColor: platformslist[game.platformId].color
                    }}
                >{game.purchaseDate}</p>}

                {game.statusId && sort === "status" && <p 
                    class='platform-name'
                    style={{
                        backgroundColor: statuseslist[game.statusId].color
                    }}
                >{statuseslist[game.statusId].name}</p>}
                
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