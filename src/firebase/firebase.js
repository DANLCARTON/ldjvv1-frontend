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
    try {
        const response = await fetch("https://addgame-rzoj3yjecq-uc.a.run.app"
            +"?index="+params.index
            +"&name="+params.name
            +"&platformId="+params.platformId
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
    } catch (error) {
        return "Echec lors de l'ajout ->" + error
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

export const addStatuses = async (params) => {
    try {
        const response = await fetch("https://addstatus-rzoj3yjecq-uc.a.run.app"
            +"?index="+params.index
            +"&name="+params.name
            +"&color="+params.color
        )
    } catch (error) {
        return "Echec lors de l'ajout ->" + error
    }
}