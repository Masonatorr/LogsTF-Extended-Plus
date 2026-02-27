const isFirefox = typeof browser !== "undefined";
const currentBrowser = isFirefox ? browser : chrome;
const timer = (ms) => new Promise((res) => setTimeout(res, ms));

const checkForErrors = (response) => {
    if (response.status === 429) {
        console.log("Rate limited for the following request");
        console.log(response);
        return "ratelimit";
    }
    if (!response.ok) {
        console.log("error with response")
        console.log(response.status)
        console.log(response)
        //console.log(response.json())
        return true;
    }

    return false;
}

const getRGLPastTeams = async (steamID) => {
    const uri = `https://api.rgl.gg/v0/profile/${steamID}/teams`;

    await timer(500);
    let response = await fetch(uri);
    if (checkForErrors(response) === "ratelimit") {
        for (i = 0; i < 10; i++) {
            console.log(`retrying after ${3000 * (i + 1)}ms`);
            await timer(3000 * (i + 1));
            response = await fetch(uri);
            if (!checkForErrors(response)) return await response.json();
        }
        return "ratelimited";
    } else if (checkForErrors(response)) {
        return;
    }

    return await response.json();
}

const getRGLProfile = async (steamID) => {
    const uri = `https://api.rgl.gg/v0/profile/${steamID}`;

    await timer(500);
    let response = await fetch(uri);
    if (checkForErrors(response) === "ratelimit") {
        for (i = 0; i < 10; i++) {
            console.log(`retrying after ${3000 * (i + 1)}ms`);
            await timer(3000 * (i + 1));
            response = await fetch(uri);
            if (!checkForErrors(response)) return await response.json();
        }
        return "ratelimited";
    } else if (checkForErrors(response)) {
        return;
    }

    return await response.json();
};

const getRGLProfilesBulk = async (steamIDList) => {
    const uri = `https://api.rgl.gg/v0/profile/getmany`;

    await timer(500);
    console.log(JSON.stringify(steamIDList))
    let response = await fetch(uri, {method: "POST",
                                    body: JSON.stringify(steamIDList),
                                    headers: {'accept': '*/*', 'Content-Type': 'application/json'}
                                    });
    if (checkForErrors(response) === "ratelimit") {
        for (i = 0; i < 10; i++) {
            console.log(`retrying after ${3000 * (i + 1)}ms`);
            await timer(3000 * (i + 1));
            response = await fetch(uri, {method: "POST",
                                    body: JSON.stringify(steamIDList),
                                    headers: {'accept': '*/*', 'Content-Type': 'application/json'}
                                    });
            if (!checkForErrors(response)) return await response.json();
        }
        return "ratelimited";
    } else if (checkForErrors(response)) {
        return;
    }

    return await response.json();
};

const getETF2LProfile = async (steamID) => {
    const uriETF2L = `https://api-v2.etf2l.org/player/${steamID}`;

    await timer(500);
    let response = await fetch(uriETF2L);
    if (checkForErrors(response) === "ratelimit") {
        for (i = 0; i < 10; i++) {
            console.log(`retrying after ${3000 * (i + 1)}ms`);
            await timer(3000 * (i + 1));
            response = await fetch(uriETF2L);
            if (!checkForErrors(response)) return await response.json();
        }
        return "ratelimited";
    } else if (checkForErrors(response)) {
        return;
    }

    return await response.json();
};

const getETF2LPastTeams = async (steamID) => {
    const uriETF2L = `https://api-v2.etf2l.org/player/${steamID}/transfers`;

    await timer(500);
    let response = await fetch(uriETF2L);
    if (checkForErrors(response) === "ratelimit") {
        for (i = 0; i < 10; i++) {
            console.log(`retrying after ${3000 * (i + 1)}ms`);
            await timer(3000 * (i + 1));
            response = await fetch(uriETF2L);
            if (!checkForErrors(response)) return await response.json();
        }
        return "ratelimited";
    } else if (checkForErrors(response)) {
        return;
    }

    return await response.json();
};

const getLogInfo = async (logID) => {
    const uriLog = `https://logs.tf/json/${logID}`;

    await timer(75);
    let response = await fetch(uriLog);
    if (checkForErrors(response) === "ratelimit") {
        for (i = 0; i < 10; i++) {
            console.log(`retrying after ${200 * (i + 1)}ms`);
            await timer(200 * (i + 1));
            response = await fetch(uriLog);
            if (!checkForErrors(response)) return await response.json();
        }
        return "ratelimited";
    } else if (checkForErrors(response)) {
        return;
    }

    return response.json();
};

const getAllData = async (inputData, messageType) => {
    let data;
    if (messageType === "rgl_profile")
	{
    	data = await getRGLProfile(inputData);
		console.log("RGL Profile")
		console.log(data)
    }
    if (messageType === "rgl_profiles_bulk")
	{
    	data = await getRGLProfilesBulk(inputData);
		console.log("RGL Profiles Bulk")
		console.log(data)
    }
	else if (messageType === "etf2l_profile")
	{
    	data = await getETF2LProfile(inputData);
		console.log("ETF2L Profile")
		console.log(data)
    }
	else if (messageType === "rgl_past_teams")
	{
    	data = await getRGLPastTeams(inputData);
		console.log("RGL Past Teams")
		console.log(data)
    }
	else if (messageType === "etf2l_past_teams")
	{
    	data = await getETF2LPastTeams(inputData);
		console.log("ETF2L Past Teams")
		console.log(data)
    }
	else if (messageType === "log_info")
	{
    	data = await getLogInfo(inputData);
		console.log("Log Info")
		console.log(data)
    }
    return data;
};

currentBrowser.runtime.onInstalled.addListener(async () => {
    //div settings
    await currentBrowser.storage.local.set({
        showETF2L: true
    });
    await currentBrowser.storage.local.set({
        showETF2LName: true
    });
    await currentBrowser.storage.local.set({
        showETF2LTeam: true
    });
    await currentBrowser.storage.local.set({
        showETF2LDivision: true
    });
    await currentBrowser.storage.local.set({
        showRGL: true
    });
    await currentBrowser.storage.local.set({
        showRGLName: true
    });
    await currentBrowser.storage.local.set({
        showRGLTeam: true
    });
    await currentBrowser.storage.local.set({
        showRGLDivision: true
    });
    await currentBrowser.storage.local.set({
        getHighestDivisionPlayed: true
    });

    //stat settings
    await currentBrowser.storage.local.set({
        damagePercentTotalOrTeam: false
    });
    await currentBrowser.storage.local.set({
        showDamagePercent: true
    });
    await currentBrowser.storage.local.set({
        showDamageEfficiency: true
    });
    await currentBrowser.storage.local.set({
        showPlayerHPM: true
    });
    await currentBrowser.storage.local.set({
        showMedicHPMA: true
    });

    //profile settings
    await currentBrowser.storage.local.set({
        showMatchScores: true
    });
    await currentBrowser.storage.local.set({
        showClassesPlayed: true
    });

    //theme
    await currentBrowser.storage.local.set({
        theme: true
    });

    //collapsibles
    await currentBrowser.storage.local.set({
        leagueDropdown: false
    });
    await currentBrowser.storage.local.set({
        statsDropdown: false
    });
    await currentBrowser.storage.local.set({
        profileDropdown: false
    });
});

currentBrowser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    getAllData(message.steamID, message.type)
        .then((data) => sendResponse(data));
    return true;
});