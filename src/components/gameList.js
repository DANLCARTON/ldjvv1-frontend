import "../styles/gameList.css"

export function GameList (props) {

    let {
        gamelist, 
        platformslist, 
        statuseslist, 
        serieslist, 
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

    // --- GROUPEMENT PAR PLATEFORME ---
    let groupedBy = null;

    if (sort === "platform") {
        groupedBy = gamelist.reduce((acc, game) => {
            const pid = game.platformId;
            if (!acc[pid]) acc[pid] = [];
            acc[pid].push(game);
            return acc;
        }, {});
    }

    if (sort === "status") {
        groupedBy = gamelist.reduce((acc, game) => {
            const pid = game.statusId;
            if (!acc[pid]) acc[pid] = [];
            acc[pid].push(game);
            return acc;
        }, {});
    }

    if (sort === "series") {
        groupedBy = gamelist.reduce((acc, game) => {
            const pid = game.seriesId;
            if (!acc[pid]) acc[pid] = [];
            acc[pid].push(game);
            return acc;
        }, {});
    }

    return (
        <section id='gamelist'>

            {sort === "platform" && (
                <div className='with-titles'>
                    {    Object.keys(groupedBy).map(platformId => (
                            <div key={platformId} className="group">

                                {/* Titre de la plateforme */}
                                <h2 
                                    className="group-title"
                                    style={{
                                        backgroundColor: platformslist[platformId].color,
                                    }}
                                    id={platformslist[platformId].index}
                                >
                                    {platformslist[platformId].name}
                                </h2>

                                <div className="group-games">

                                    {/* Jeux de la plateforme */}
                                    {groupedBy[platformId].map((game, index) => (
                                        <div 
                                            key={index}
                                            className="game"
                                            style={{
                                                boxShadow: `
                                                    -5px 0 10px ${platformslist[game.platformId].color},
                                                    5px 0 10px ${game.statusId && statuseslist[game.statusId].color}
                                                `,
                                                border: "2px solid",
                                                borderColor: game.statusId && statuseslist[game.statusId].color,
                                            }}
                                            onClick={() => {
                                                setIndex(game.index)
                                                setUpdateGameModal(true)
                                            }}
                                        >
                                            <img src={game.cover} alt={game.name} />

                                            <p 
                                                className='game-name'
                                                style={{
                                                    backgroundColor: platformslist[game.platformId].color
                                                }}
                                            >
                                                {game.name}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                            </div>
                        ))}
                </div>
            )}

            {sort === "status" && (
                <div className='with-titles'>
                    {    Object.keys(groupedBy).map(statusId => (
                            <div key={statusId} className="group">

                                {/* Titre de la plateforme */}
                                
                                {console.log("feur", statuseslist[statusId], statuseslist, statusId)}
                                <h2 
                                    className="group-title"
                                    style={{
                                        backgroundColor: statuseslist[statusId] && statuseslist[statusId].color,
                                    }}
                                    id={statuseslist[statusId] && statuseslist[statusId].index}
                                >
                                    {statuseslist[statusId] ? statuseslist[statusId].name : "Aucun statut"}
                                </h2>

                                <div className="group-games">

                                    {/* Jeux de la plateforme */}
                                    {groupedBy[statusId].map((game, index) => (
                                        <div 
                                            key={index}
                                            className="game"
                                            style={{
                                                boxShadow: `
                                                    -5px 0 10px ${platformslist[game.platformId].color},
                                                    5px 0 10px ${game.statusId && statuseslist[game.statusId].color}
                                                `,
                                                border: "2px solid",
                                                borderColor: game.statusId && statuseslist[game.statusId].color,
                                            }}
                                            onClick={() => {
                                                setIndex(game.index)
                                                setUpdateGameModal(true)
                                            }}
                                        >
                                            <img src={game.cover} alt={game.name} />

                                            <p 
                                                className='game-name'
                                                style={{
                                                    backgroundColor: platformslist[game.platformId].color
                                                }}
                                            >
                                                {game.name}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                            </div>
                        ))}
                </div>
            )}

            {sort === "series" && (
                <div className='with-titles by-series'>
                    {    Object.keys(groupedBy).map(seriesId => (
                            <div key={seriesId} className="group">

                                {/* Titre de la plateforme */}
                                
                                {console.log("feur", serieslist[seriesId], serieslist, seriesId)}
                                <h2 
                                    className="group-title"
                                    style={{
                                        backgroundColor: "white",
                                    }}
                                    id={serieslist[seriesId] && serieslist[seriesId].index}
                                >
                                    {serieslist[seriesId] ? serieslist[seriesId].name : "Aucune série"}
                                </h2>

                                <div className="group-games">

                                    {/* Jeux de la plateforme */}
                                    {groupedBy[seriesId].map((game, index) => (
                                        <div 
                                            key={index}
                                            className="game"
                                            style={{
                                                boxShadow: `
                                                    -5px 0 10px ${platformslist[game.platformId].color},
                                                    5px 0 10px ${game.statusId && statuseslist[game.statusId].color}
                                                `,
                                                border: "2px solid",
                                                borderColor: game.statusId && statuseslist[game.statusId].color,
                                            }}
                                            onClick={() => {
                                                setIndex(game.index)
                                                setUpdateGameModal(true)
                                            }}
                                        >
                                            <img src={game.cover} alt={game.name} />

                                            <p 
                                                className='game-name'
                                                style={{
                                                    backgroundColor: platformslist[game.platformId].color
                                                }}
                                            >
                                                {game.name}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                            </div>
                        ))}
                </div>
            )}

            {/* Mode normal (pas tri plateforme) */}
            {!["platform", "status", "series"].includes(sort) && <div className="without-titles">
            
                {gamelist.map((game, index) => (
                    <div 
                        key={index}
                        className="game"
                        style={{
                            boxShadow: `
                                -5px 0 10px ${platformslist[game.platformId].color},
                                5px 0 10px ${game.statusId && statuseslist[game.statusId].color}
                            `,
                            border: "2px solid",
                            borderColor: game.statusId && statuseslist[game.statusId].color,
                        }}
                        onClick={() => {
                            setIndex(game.index)
                            setUpdateGameModal(true)
                        }}
                    >
                        <img src={game.cover} alt={game.name} />

                        <p 
                            className='platform-name'
                            style={{
                                backgroundColor: platformslist[game.platformId].color
                            }}
                        >
                            {platformslist[game.platformId].name}
                        </p>

                        <p 
                            className='game-name'
                            style={{
                                backgroundColor: platformslist[game.platformId].color
                            }}
                        >
                            {game.name}
                        </p>
                    </div>
                ))}
            </div>}

        </section>
    );
}