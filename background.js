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
            console.log(`retrying after ${1500 * (i + 1)}ms`);
            await timer(1500 * (i + 1));
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
            console.log(`retrying after ${1500 * (i + 1)}ms`);
            await timer(1500 * (i + 1));
            response = await fetch(uri);
            if (!checkForErrors(response)) return await response.json();
        }
        return "ratelimited";
    } else if (checkForErrors(response)) {
        return;
    }

    return await response.json();
};

const GetETF2LProfile = async (steamID) => {
    const uriETF2L = `https://api-v2.etf2l.org/player/${steamID}`;

    await timer(500);
    let response = await fetch(uriETF2L);
    if (checkForErrors(response) === "ratelimit") {
        for (i = 0; i < 10; i++) {
            console.log(`retrying after ${500 * (i + 1)}ms`);
            await timer(1500 * (i + 1));
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
            console.log(`retrying after ${75 * (i + 1)}ms`);
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

const getAllData = async (ID, messageType) => {
    let data;
    if (messageType === "rgl_profile")
	{
    	data = await getRGLProfile(ID);
		console.log("RGL Profile")
		console.log(data)
    }
	else if (messageType === "etf2l_profile")
	{
    	data = await GetETF2LProfile(ID);
		console.log("ETF2L Profile")
		console.log(data)
    }
	else if (messageType === "rgl_past_teams")
	{
    	data = await getRGLPastTeams(ID);
		console.log("RGL Past Teams")
		console.log(data)
    }
	else if (messageType === "log_info")
	{
    	data = await getLogInfo(ID);
		console.log("Log Info")
		console.log(data)
    }
    return data;
};

currentBrowser.runtime.onInstalled.addListener(async () => {
    await currentBrowser.storage.local.set({
        showRGL: true
    });
    await currentBrowser.storage.local.set({
        showETF2L: true
    });
    await currentBrowser.storage.local.set({
        getHighestDivisionPlayed: true
    });
    await currentBrowser.storage.local.set({
        showRGLTeam: true
    });
    await currentBrowser.storage.local.set({
        damagePercentTotalOrTeam: false
    });
});

currentBrowser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    getAllData(message.steamID, message.type)
        .then((data) => sendResponse(data));
    return true;
});