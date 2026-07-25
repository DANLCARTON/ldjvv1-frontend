export const getAllGames = async () => {
    try {
        const response = await fetch ("https://getgamelist-rzoj3yjecq-uc.a.run.app")
        const set = await response.json()
        return set
    } catch (error) {
        console.log("Error when getting game list" + error)
    }
}

export const addGame = async (params) => {
    console.log("addgame params index ", params.index)
    console.log("addgame params name ", params.name)
    console.log("addgame params platformId ", params.platformId)
    console.log("addgame params statusId ", params.statusId)
    console.log("addgame params purchaseDate ", params.purchaseDate)
    console.log("addgame params releaseDate ", params.releaseDate)
    console.log("addgame params startDate ", params.startDate)
    console.log("addgame params endDate ", params.endDate)
    console.log("addgame params seriesId ", params.seriesId)
    console.log("addgame params collectionFlag ", params.collectionFlag)
    console.log("addgame params DLCFlag ", params.DLCFlag)
    console.log("addgame params episodicFlag ", params.episodicFlag)
    console.log("addgame params collectionGames ", params.collectionGames)
    console.log("addgame params DLCGames ", params.DLCGames)
    console.log("addgame params episodicGames ", params.episodicGames)

    try {
        const response = await fetch("https://addgame-rzoj3yjecq-uc.a.run.app"+
            "?index="+params.index
            +"&name="+encodeURIComponent(params.name)
            +"&platformId="+params.platformId
            +"&statusId="+params.statusId
            +(params.purchaseDate ? "&purchaseDate="+params.purchaseDate : "")
            +(params.releaseDate ? "&releaseDate="+params.releaseDate : "")
            +(params.startDate ? "&startDate="+params.startDate : "")
            +(params.endDate ? "&endDate="+params.endDate : "")
            +(params.seriesId ? "&seriesId="+params.seriesId : "")
            +"&collectionFlag=" + params.collectionFlag
            +"&DLCFlag=" + params.DLCFlag
            +"&episodicFlag=" + params.episodicFlag
            +"&collectionGames=" + encodeURIComponent(JSON.stringify(params.collectionGames))
            +"&DLCGames=" + encodeURIComponent(JSON.stringify(params.DLCGames))
            +"&episodicGames=" + encodeURIComponent(JSON.stringify(params.episodicGames))
        )
        const message = await response.text()
        return message
    } catch (error) {
        return "Echec lors de l'ajout ->" + error
    }
}

export const getPlatform = async (params) => {
    try {
        const response = await fetch ("https://getplatform-rzoj3yjecq-uc.a.run.app"
            +"?index="+params.index
        )
        const set = await response.json()
        return set
    } catch (error) {
        console.log("Error when getting platform "+params.index)
    }
}

export const getPlatforms = async () => {
    try {    
        const response = await fetch ("https://getplatforms-rzoj3yjecq-uc.a.run.app")
        const set = await response.json()
        return set
    } catch (error) {
        console.log("Error when getting platforms "+error)
    }
}

export const addPlatform = async (params) => {
    try {
        const response = await fetch("https://addplatform-rzoj3yjecq-uc.a.run.app"
            +"?index="+encodeURIComponent(params.index)
            +"&name="+encodeURIComponent(params.name)
            +"&color="+encodeURIComponent(params.color)
        )
        const set = response.text()
        return set;
    } catch (error) {
        return "Echec lors de l'ajout -> " + error
    }
}

export const getStatus = async (params) => {
    try {
        const response = await fetch ("https://getstatus-rzoj3yjecq-uc.a.run.app"
            +"?index="+params.index
        )
        const set = await response.json()
        return set
    } catch (error) {
        console.log("Error when getting status "+params.index)
    }
}

export const getStatuses = async () => {
    try {    
        const response = await fetch ("https://getstatuses-rzoj3yjecq-uc.a.run.app")
        const set = await response.json()
        return set
    } catch (error) {
        console.log("Error when getting statuses")
    }
}

export const addStatus = async (params) => {
    try {
        const response = await fetch("https://addstatus-rzoj3yjecq-uc.a.run.app"
            +"?index="+encodeURIComponent(params.index)
            +"&name="+encodeURIComponent(params.name)
            +"&color="+encodeURIComponent(params.color)
        )
        const set = response.text()
        return set;
    } catch (error) {
        return "Echec lors de l'ajout -> " + error
    }
}

export const updateGame = async (params) => {
    try {
        const response = await fetch("https://updategame-rzoj3yjecq-uc.a.run.app"
            + "?index=" + params.index
            + (params.name !== undefined ? "&name=" + encodeURIComponent(params.name) : "")
            + (params.platformId !== undefined ? "&platformId=" + params.platformId : "")
            + (params.statusId !== undefined ? "&statusId=" + params.statusId : "")
            + (params.purchaseDate ? "&purchaseDate=" + params.purchaseDate : "")
            + (params.releaseDate ? "&releaseDate=" + params.releaseDate : "")
            + (params.startDate ? "&startDate=" + params.startDate : "")
            + (params.endDate ? "&endDate=" + params.endDate : "")
            + (params.seriesId !== undefined ? "&seriesId=" + params.seriesId : "")
            + (params.collectionFlag !== undefined ? "&collectionFlag=" + params.collectionFlag : "")
            + (params.DLCFlag !== undefined ? "&DLCFlag=" + params.DLCFlag : "")
            + (params.episodicFlag !== undefined ? "&episodicFlag=" + params.episodicFlag : "")
            + (params.collectionGames !== undefined ? "&collectionGames=" + encodeURIComponent(JSON.stringify(params.collectionGames)) : "")
            + (params.DLCGames !== undefined ? "&DLCGames=" + encodeURIComponent(JSON.stringify(params.DLCGames)) : "")
            + (params.episodicGames !== undefined ? "&episodicGames=" + encodeURIComponent(JSON.stringify(params.episodicGames)) : "")
        );

        const message = await response.text();
        return message;

    } catch (error) {
        return "Echec lors de la mise à jour -> " + error;
    }
}

export const updatePlatform = async (params) => {
    try {
        const response = await fetch("https://updateplatform-rzoj3yjecq-uc.a.run.app"
            +"?index="+encodeURIComponent(params.index)
            +"&name="+encodeURIComponent(params.name)
            +"&color="+encodeURIComponent(params.color)
        )
        const set = response.text()
        return set;
    } catch (error) {
        return "Echec lors de la mise à jour -> " + error
    }
}

export const updateStatus = async (params) => {
    try {
        const response = await fetch("https://updatestatus-rzoj3yjecq-uc.a.run.app"
            +"?index="+encodeURIComponent(params.index)
            +"&name="+encodeURIComponent(params.name)
            +"&color="+encodeURIComponent(params.color)
        )
        const set = response.text()
        return set;
    } catch (error) {
        return "Echec lors de la mise à jour -> " + error
    }
}

export const addSeries = async (params) => {
    try {
        const response = await fetch("https://addseries-rzoj3yjecq-uc.a.run.app"
            +"?index="+params.index
            +"&name="+params.name
        )
        const set = response.text()
        return set;
    } catch (error) {
        return "Echec lors de l'ajout -> " + error
    }
}

export const updateSeries = async (params) => {
    try {
        const response = await fetch("https://updateseries-rzoj3yjecq-uc.a.run.app"
            +"?index="+params.index
            +"&name="+params.name
        )
        const set = response.text()
        return set;
    } catch (error) {
        return "Echec lors de la mise à jour -> " + error
    }
}

export const getSeries = async (params) => {
    try {    
        const response = await fetch ("https://getseries-rzoj3yjecq-uc.a.run.app")
        const set = await response.json()
        return set
    } catch (error) {
        console.log("Error when getting series "+error)
    }
}