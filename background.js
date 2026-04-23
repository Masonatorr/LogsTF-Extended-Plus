const isFirefox = typeof browser !== "undefined";
const currentBrowser = isFirefox ? browser : chrome;
const timer = (ms) => new Promise((res) => setTimeout(res, ms));

const checkForErrors = (response) => {
    if (response.status === 429) {
        console.log("Rate limited for the following request");
        console.log(response);
        return "ratelimit";
    }
    if (response.status === 404) {
        return true;
    }
    if (!response.ok) {
        console.log("error with response")
        console.log(response.status)
        console.log(response)
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

const getLogMatchInfo = async (logInfo) => {
    //const uriTrends = new URL(`https://trends.tf/api/v1/log/${logID}`);
    const uriTrends = new URL(`https://trends.tf/api/v1/logs`);

    const params = {
        "steamid64": logInfo.players[0],
        "steamid64": logInfo.players[logInfo.players.length - 1],
        "time_from": logInfo.startTime,
        "time_to": logInfo.endTime
    }
    Object.keys(params)
        .forEach(key => uriTrends.searchParams.append(key, params[key]));

    await timer(75);
    let response = await fetch(uriTrends, {
                                            method: 'GET',
                                          });
    const error = checkForErrors(response);
    if (error === "ratelimit") {
        for (i = 0; i < 10; i++) {
            console.log(`retrying after ${2000 * (i + 1)}ms`);
            await timer(2000 * (i + 1));
            response = await fetch(uriTrends, {
                                            method: 'GET',
                                          });
            if (!checkForErrors(response)) return await response.json();
        }
        return "ratelimited";
    } else if (error) {
        return;
    }

    return response.json();
};

const getLogMatchInfoBulk = async (searchInfo) => {
    const uriTrends = new URL("https://trends.tf/api/v1/logs");

    const params = {
        "time_from": searchInfo.startTime,
        "time_to": searchInfo.endTime,
        "limit": "27"
    }
    if (searchInfo.steamID64) params["steamid64"] = searchInfo.steamID64;
    Object.keys(params)
        .forEach(key => uriTrends.searchParams.append(key, params[key]));

    await timer(75);
    let response = await fetch(uriTrends, {
                                            method: 'GET',
                                          });
    const error = checkForErrors(response);
    if (error === "ratelimit") {
        for (i = 0; i < 10; i++) {
            console.log(`retrying after ${2000 * (i + 1)}ms`);
            await timer(2000 * (i + 1));
            response = await fetch(uriTrends, {
                                            method: 'GET',
                                          });
            if (!checkForErrors(response)) return await response.json();
        }
        return "ratelimited";
    } else if (error) {
        return;
    }

    return response.json();
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

const getETF2LMatchByID = async (matchID) => {
    const uriMatch = `https://api-v2.etf2l.org/matches/${matchID}`;

    await timer(500);
    let response = await fetch(uriMatch);
    if (checkForErrors(response) === "ratelimit") {
        for (i = 0; i < 10; i++) {
            console.log(`retrying after ${2000 * (i + 1)}ms`);
            await timer(2000 * (i + 1));
            response = await fetch(uriMatch);
            if (!checkForErrors(response)) return await response.json();
        }
        return "ratelimited";
    } else if (checkForErrors(response)) {
        return;
    }

    return response.json();
};

const getETF2LCompetitionByID = async (competitionID) => {
    const uriCompetition = `https://api-v2.etf2l.org/competition/${competitionID}`;

    await timer(500);
    let response = await fetch(uriCompetition);
    if (checkForErrors(response) === "ratelimit") {
        for (i = 0; i < 10; i++) {
            console.log(`retrying after ${2000 * (i + 1)}ms`);
            await timer(2000 * (i + 1));
            response = await fetch(uriCompetition);
            if (!checkForErrors(response)) return await response.json();
        }
        return "ratelimited";
    } else if (checkForErrors(response)) {
        return;
    }

    return response.json();
};

const getRGLMatchByID = async (matchID) => {
    const uriMatch = `https://api.rgl.gg/v0/matches/${matchID}`;

    await timer(500);
    let response = await fetch(uriMatch);
    if (checkForErrors(response) === "ratelimit") {
        for (i = 0; i < 10; i++) {
            console.log(`retrying after ${2000 * (i + 1)}ms`);
            await timer(2000 * (i + 1));
            response = await fetch(uriMatch);
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
	else if (messageType === "etf2l_matches_in_timeframe")
	{
    	data = await getETF2LMatchesInTimeframe(inputData);
		console.log("ETF2L Matches in Timeframe")
		console.log(data)
    }
	else if (messageType === "log_match_info")
	{
    	data = await getLogMatchInfo(inputData);
		console.log("Match Info For Log")
		console.log(data)
    }
	else if (messageType === "log_match_info_bulk")
	{
    	data = await getLogMatchInfoBulk(inputData);
		console.log("Bulk Match Info For Log")
		console.log(data)
    }
	else if (messageType === "etf2l_match_by_id")
	{
    	data = await getETF2LMatchByID(inputData);
		console.log("ETF2L Match Info")
		console.log(data)
    }
	else if (messageType === "etf2l_competition_by_id")
	{
    	data = await getETF2LCompetitionByID(inputData);
		console.log("ETF2L Competition Info")
		console.log(data)
    }
	else if (messageType === "rgl_match_by_id")
	{
    	data = await getRGLMatchByID(inputData);
		console.log("RGL Match Info")
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
        showMatchInfo: true
    });
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
    await currentBrowser.storage.local.set({
        showOfficialMatches: true
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
    getAllData(message.inputData, message.type)
        .then((data) => sendResponse(data));
    return true;
});