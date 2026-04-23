const isFirefox = typeof browser !== "undefined";
const currentBrowser = isFirefox ? browser : chrome;

//Alias API fetch requests into easier-to-type functions
//These send the request data to background.js, which has less restrictions on fetch requests than the main script
const getRGLProfile = async (steamID) => await sendMessageAndWait("rgl_profile", steamID);
const getRGLProfilesBulk = async (steamIDList) => await sendMessageAndWait("rgl_profiles_bulk", steamIDList);
const getETF2LProfile = async (steamID) => await sendMessageAndWait("etf2l_profile", steamID);
const getRGLPastTeams = async (steamID) => await sendMessageAndWait("rgl_past_teams", steamID);
const getLogMatchInfo = async (searchParameters) => await sendMessageAndWait("log_match_info", searchParameters);
const getLogMatchInfoBulk = async (searchParameters) => await sendMessageAndWait("log_match_info_bulk", searchParameters);
const getETF2LMatchByID = async (matchID) => (await sendMessageAndWait("etf2l_match_by_id", matchID)).match;
const getETF2LCompetitionByID = async (competitionID) => (await sendMessageAndWait("etf2l_competition_by_id", competitionID)).competition;
const getRGLMatchByID = async (matchID) => await sendMessageAndWait("rgl_match_by_id", matchID);
const getLogInfo = async (logID) => await sendMessageAndWait("log_info", logID);

//Function for sending request data to background.js
const sendMessageAndWait = async (type, inputData) =>
    await currentBrowser.runtime.sendMessage({
        type,
        inputData
    })

//Alias fetching of saved browser flags for convenience
const getShowMatchInfoFlag = async () => (await currentBrowser.storage.local.get("showMatchInfo"))
    .showMatchInfo;
const getShowETF2LNameFlag = async () => (await currentBrowser.storage.local.get("showETF2LName"))
    .showETF2LName;
const getShowETF2LTeamFlag = async () => (await currentBrowser.storage.local.get("showETF2LTeam"))
    .showETF2LTeam;
const getShowETF2LDivisionFlag = async () => (await currentBrowser.storage.local.get("showETF2LDivision"))
    .showETF2LDivision;
const getShowRGLNameFlag = async () => (await currentBrowser.storage.local.get("showRGLName"))
    .showRGLName;
const getShowRGLTeamFlag = async () => (await currentBrowser.storage.local.get("showRGLTeam"))
    .showRGLTeam;
const getShowRGLDivisionFlag = async () => (await currentBrowser.storage.local.get("showRGLDivision"))
    .showRGLDivision;
const getHighestDivisionPlayedFlag = async () =>
    (await currentBrowser.storage.local.get("getHighestDivisionPlayed"))
    .getHighestDivisionPlayed;
const getPlayedGamemodeFlag = async () => (await currentBrowser.storage.local.get("playedGamemode"))
	.playedGamemode;
const getDamagePercentTotalOrTeamFlag = async () => (await currentBrowser.storage.local.get("damagePercentTotalOrTeam"))
	.damagePercentTotalOrTeam;
const getShowDamagePercentFlag = async () => (await currentBrowser.storage.local.get("showDamagePercent"))
	.showDamagePercent;
const getShowDamageEfficiencyFlag = async () => (await currentBrowser.storage.local.get("showDamageEfficiency"))
	.showDamageEfficiency;
const getShowPlayerHPMFlag = async () => (await currentBrowser.storage.local.get("showPlayerHPM"))
	.showPlayerHPM;
const getShowMedicHPMAFlag = async () => (await currentBrowser.storage.local.get("showMedicHPMA"))
	.showMedicHPMA;
const getShowMatchScoresFlag = async () => (await currentBrowser.storage.local.get("showMatchScores"))
	.showMatchScores;
const getShowClassesPlayedFlag = async () => (await currentBrowser.storage.local.get("showClassesPlayed"))
	.showClassesPlayed;
const getShowOfficialMatchesFlag = async () => (await currentBrowser.storage.local.get("showOfficialMatches"))
	.showOfficialMatches;

//Used to convert RGL division names into numerical indexes (for example, to compare which div is higher)
const RGLDivisions = Object.freeze({
    None: 0,
    Newcomer: 1,
    Amateur: 2,
    Intermediate: 3,
    Main: 4,
    Advanced: 5,
    Invite: 6,
});

//Inverse of above, converts indexes back into division names
const RGLDivisionsInverse = Object.freeze({
    0: "None",
    1: "Newcomer",
    2: "Amateur",
    3: "Intermediate",
    4: "Main",
    5: "Advanced",
    6: "Invite",
});

//Used to convert ETF2L division names into numerical indexes (for example, to compare which div is higher)
const ETF2LDivisions = Object.freeze({
    None: 0,
    Fresh: 1,
    Open: 2,
    Low: 3,
    Division4: 4,
    Division3: 5,
    Division2: 6,
    Division1: 7,
    Premiership: 8,
});

//Inverse of above, converts indexes back into division names
const ETF2LDivisionsInverse = Object.freeze({
    0: "None",
    1: "Fresh",
    2: "Open",
    3: "Low",
    4: "Division4",
    5: "Division3",
    6: "Division2",
    7: "Division1",
    8: "Premiership",
});

//Dictates how to show a player's RGL division on single-log pages
const RGLDivisionSpecs = Object.freeze({
    NA: {
        backgroundColor: "#dddddd",
        textColor: "black",
        shortenedName: "N/A",
    },
    None: {
        backgroundColor: "gray",
        textColor: "black",
        shortenedName: "NEW",
    },
    Newcomer: {
        backgroundColor: "#c54c36",
        textColor: "white",
        shortenedName: "NC",
    },
    Amateur: {
        backgroundColor: "#d0cd36",
        textColor: "black",
        shortenedName: "AM",
    },
    Intermediate: {
        backgroundColor: "#4ee16b",
        textColor: "black",
        shortenedName: "IM",
    },
    Main: {
        backgroundColor: "#55d1ce",
        textColor: "black",
        shortenedName: "MAIN",
    },
    Advanced: {
        backgroundColor: "#5f6bf6",
        textColor: "white",
        shortenedName: "ADV",
    },
    Invite: {
        backgroundColor: "#e049b2",
        textColor: "white",
        shortenedName: "INV",
    },
});

//Dictates how to show a player's ETF2L division on single-log pages
const ETF2LDivisionSpecs = Object.freeze({
    NA: {
        backgroundColor: "#dddddd",
        textColor: "black",
        shortenedName: "N/A",
    },
    None: {
        backgroundColor: "gray",
        textColor: "black",
        shortenedName: "NEW",
    },
    Fresh: {
        backgroundColor: "#c44b36",
        textColor: "white",
        shortenedName: "FR",
    },
    Open: {
        backgroundColor: "#cbb934",
        textColor: "black",
        shortenedName: "OPEN",
    },
    Low: {
        backgroundColor: "#70d035",
        textColor: "black",
        shortenedName: "LOW",
    },
    Division4: {
        backgroundColor: "#3ad470",
        textColor: "black",
        shortenedName: "D4",
    },
    Division3: {
        backgroundColor: "#45cad9",
        textColor: "black",
        shortenedName: "D3",
    },
    Division2: {
        backgroundColor: "#465fdd",
        textColor: "white",
        shortenedName: "D2",
    },
    Division1: {
        backgroundColor: "#9e48e0",
        textColor: "white",
        shortenedName: "D1",
    },
    Premiership: {
        backgroundColor: "#e048b2",
        textColor: "white",
        shortenedName: "PRM",
    },
});

//Dictates some stuff for showing class icons/stats on profile pages
const ClassIconFormat = Object.freeze({
    scout: {
        title: "Scout",
        order: 0
    },
    soldier: {
        title: "Soldier",
        order: 1
    },
    pyro: {
        title: "Pyro",
        order: 2
    },
    demoman: {
        title: "Demoman",
        order: 3
    },
    heavyweapons: {
        title: "Heavyweapons",
        order: 4
    },
    engineer: {
        title: "Engineer",
        order: 5
    },
    medic: {
        title: "Medic",
        order: 6
    },
    sniper: {
        title: "Sniper",
        order: 7
    },
    spy: {
        title: "Spy",
        order: 8
    },
});

//Lookup table to convert every weapon ID from the logs into their actual ingame names
const WeaponLookupTable = Object.freeze({
    //scout
        //primary
        scattergun: "Scattergun",
        force_a_nature: "Force-A-Nature",
        soda_popper: "Soda Popper",
        pep_brawlerblaster: "Baby Face's Blaster",
        shortstop: "Shortstop",
        back_scatter: "Backscatter",
        //secondary
        pistol_scout: "Pistol",
        the_winger: "Winger",
        pep_pistol: "Pretty Boy's Pocket Pistol",
        guillotine: "Flying Guillotine",
        //melee
        bat: "Bat",
        boston_basher: "Boston Basher",
        lava_bat: "Sun-on-a-Stick",
        holymackerel: "Holy Mackerel",
        warfan: "Fan O'War",
        wrap_assassin: "Wrap Assassin",
        candy_cane: "Candy Cane",
        atomizer: "Atomizer",
        sandman: "Sandman",
        scout_sword: "Three-Rune Blade",
        unarmed_combat: "Unarmed Combat",
    //soldier
        //primary
        tf_projectile_rocket: "Rocket Launcher",
        quake_rl: "Original",
        airstrike: "Airstrike",
        blackbox: "Black Box",
        dumpster_device: "Beggar's Bazooka",
        cow_mangler: "Cow Mangler 5000",
        rocketlauncher_directhit: "Direct Hit",
        liberty_launcher: "Liberty Launcher",
        //secondary
        shotgun_soldier: "Shotgun",
        righteous_bison: "Righteous Bison",
        mantreads: "Mantreads",
        //melee
        shovel: "Shovel",
        market_gardener: "Market Gardener",
        unique_pickaxe_escape: "Escape Plan",
        unique_pickaxe: "Equalizer",
        disciplinary_action: "Disciplinary Action",
    //pyro
        //primary
        flamethrower: "Flamethrower",
        degreaser: "Degreaser",
        rainblower: "Rainblower",
        dragons_fury: "Dragon's Fury",
        backburner: "Backburner",
        phlogistinator: "Phlogistinator",
        ai_flamethrower: "Nostromo Napalmer",
        //secondary
        shotgun_pyro: "Shotgun",
        flaregun: "Flare Gun",
        scorch_shot: "Scorch Shot",
        manmelter: "Manmelter",
        rocketpack: "Thermal Thruster",
        rocketpack_stomp: "Thermal Thruster (Stomp)",
        detonator: "Detonator",
        jar_gas: "Gas Passer",
        //melee
        fireaxe: "Fire Axe",
        thirddegree: "Third Degree",
        powerjack: "Powerjack",
        annihilator: "Neon Annihilator",
        hot_hand: "Hot Hand",
        sledgehammer: "Homewrecker",
        axtinguisher: "Axtinguisher",
        lollichop: "Lollichop",
        lava_axe: "Sharpened Volcano Fragment",
        mailbox: "Postal Plummeter",
        back_scratcher: "Back Scratcher",
        the_maul: "Maul",
    //demoman
        //primary
        tf_projectile_pipe: "Grenade Launcher",
        iron_bomber: "Iron Bomber",
        loch_n_load: "Loch-N-Load",
        loose_cannon: "Loose Cannon",
        //secondary
        tf_projectile_pipe_remote: "Sticky Launcher",
        stickybomb_defender: "Scottish Resistance",
        quickiebomb_launcher: "Quickiebomb Launcher",
        demoshield: "Chargin' Targe",
        splendid_screen: "Splendid Screen",
        tide_turner: "Tide Turner",
        //melee
        bottle: "Bottle",
        sword: "Eyelander",
        battleaxe: "Scotsman's Skullcutter",
        ullapool_caber: "Ullapool Caber",
        headtaker: "Horseless Headless Horsemann's Headtaker",
        scotland_shard: "Scottish Handshake",
        claidheamohmor: "Claidheamh Mòr",
        nessieclub: "Nessie's Nine Iron",
    //heavy
        //primary
        minigun: "Minigun",
        tomislav: "Tomislav",
        long_heatmaker: "Huo-Long Heater",
        brass_beast: "Brass Beast",
        natasch: "Natascha",
        iron_curtain: "Iron Curtian",
        //secondary
        shotgun_hwg: "Shotgun",
        family_business: "Family Business",
        //melee
        fists: "Fists",
        gloves_running_urgently: "Gloves of Running Urgently",
        steel_fists: "Fists of Steel",
        warrior_spirit: "Warrior's Spirit",
        holiday_punch: "holiday Punch",
        eviction_notice: "Eviction Notice",
        apocofists: "Apoco-Fists",
        bread_bite: "Bread Bite",
    //engineer
        //primary
        shotgun_primary: "Shotgun",
        frontier_justice: "Frontier Justice",
        pomson: "Pomson 6000",
        rescue_ranger: "Rescue Ranger",
        widowmaker: "Widowmaker",
        //secondary
        pistol: "Pistol",
        laser_pointer: "Wrangler",
        short_circuit: "Short Circuit",
        giger_counter: "Giger Counter",
        //melee
        wrench: "Wrench",
        wrench_jag: "Jag",
        eureka_effect: "Eureka Effect",
        robot_arm: "Gunslinger",
        southern_hospitality: "Southern Hospitality",
        wrench_golden: "Golden Wrench",
    //medic
        //primary
        syringegun_medic: "Syringe Gun",
        crusaders_crossbow: "Crusader's Crossbow",
        blutsauger: "Blutsauger",
        proto_syringe: "Overdose",
        //melee
        bonesaw: "Bonesaw",
        ubersaw: "Übersaw",
        solemn_vow: "Solemn Vow",
        battleneedle: "Vita-Saw",
        amputator: "Amputator",
    //sniper
        //primary
        sniperrifle: "Sniper Rifle",
        tf_projectile_arrow: "Huntsman",
        compound_bow: "Fortified Compound",
        the_classic: "The Classic",
        sydney_sleeper: "Sydney Sleeper",
        bazaar_bargain: "Bazaar Bargain",
        machina: "Machina",
        pro_rifle: "Hitman's Heatmaker",
        shooting_star: "Shooting Star",
        //secondary
        smg: "SMG",
        pro_smg: "Cleaner's Carbine",
        //melee
        club: "Kukri",
        tribalkukri: "Tribalman's Shiv",
        bushwacka: "Bushwacka",
        shahanshah: "Shahanshah",
    //spy
        //primary
        revolver: "Revolver",
        letranger: "L'Etranger",
        enforcer: "Enforcer",
        ambassador: "Ambassador",
        diamondback: "Diamondback",
        samrevolver: "Big Kill",
        //melee
        knife: "Knife",
        big_earner: "Big Earner",
        eternal_reward: "Your Eternal Reward",
        kunai: "Kunai",
        spy_cicle: "Spy-Cicle",
        black_rose: "Black Rose",
        sharp_dresser: "Sharp Dresser",
        voodoo_pin: "Wanga Prick",
    //miscellaneous
        //multiclass secondary
        panic_attack: "Panic Attack",
        reserve_shooter: "Reserve Shooter",
        the_capper: "C.A.P.P.E.R",
        maxgun: "Lugermorph",
        //multiclass melee
        demokatana: "Half-Zatoichi",
        paintrain: "Pain Train",
        nonnonviolent_protest: "Conscientious Objector",
        fryingpan: "Frying Pan",
        skullbat: "Bat Outta Hell",
        necro_smasher: "Necro Smasher",
        crossing_guard: "Crossing Guard",
        freedom_staff: "Freedom Staff",
        ham_shank: "Ham Shank",
        memory_maker: "Memory Maker",
        prinny_machete: "Prinny Machete",
        saxxy: "Saxxy",
        golden_fryingpan: "Golden Frying Pan",
        //sentry
        obj_sentrygun: "Level 1 Sentry",
        obj_sentrygun2: "Level 2 Sentry",
        obj_sentrygun3: "Level 3 Sentry",
        //etc
        world: "Finished off",
        player: "Player",
        bleed_kill: "Bleed",
        ball: "Ball",
        telefrag: "Telefrag",
});

//Couldn't figure out how to just set the color of the official match icon, so I hue shift it from RGL's orange checkmark
const OfficialCheckmarkColorShifts = Object.freeze({
    rglgg: "0deg",
    etf2l: "180deg"
})

//Takes the player's past teams and current gamemode and returns the highest div they've played in
const getHighestNumericalDivisionPlayed = (pastTeams, gameMode) => {
    if (pastTeams === undefined || pastTeams === null || pastTeams.length == 0) return RGLDivisions.None;

    let greatestNumericalDivisionPlayed = RGLDivisions.None;
    for (let i = 0; i < pastTeams.length; i++) {
        if (pastTeams[i].formatName != gameMode) continue;

        const divisionName = pastTeams[i].divisionName.replace(/RGL-/g, '')
        const numericalValue = RGLDivisions[divisionName];
        if (greatestNumericalDivisionPlayed < numericalValue) {
            greatestNumericalDivisionPlayed = numericalValue;
        }
    }
    return greatestNumericalDivisionPlayed;
}

//Takes the player's past teams and current gamemode and returns the latest div they've played in
const getLatestDivisionPlayed = (pastTeams, gameMode) => {
    if (pastTeams === undefined || pastTeams === null || pastTeams.length == 0) return RGLDivisions.None;

    for (let i = 0; i < pastTeams.length; i++) {
        if (pastTeams[i].formatName != gameMode) continue;
        
        const divisionName = pastTeams[i].divisionName.replace(/RGL-/g, '')
        if (RGLDivisions[divisionName] === undefined) continue; // To account for special division names like "Spec 2-day" from cups
        return RGLDivisions[divisionName];
    }
    return RGLDivisions.None;
}

//Takes the player's past teams and returns their current rgl team if applicable
const getCurrentRGLTeam = async (pastTeams) => {
	let SixesTeam = null;
	let SixesTeamID = null;
	let HighlanderTeam = null;
	let HighlanderTeamID = null;
    if (pastTeams === undefined || pastTeams === null || pastTeams.length == 0) return [
		SixesTeam,
		SixesTeamID,
		HighlanderTeam,
		HighlanderTeamID,
	];
	for (let gamemode = 0; gamemode < 2; gamemode++) {
		for (let i = 0; i < pastTeams.length; i++) {
			if (pastTeams[i].formatName != (gamemode === 0 ? "Sixes" : "Highlander")) continue;
			if (pastTeams[i].leftAt != null) break;
			if (gamemode === 0) {
				SixesTeam = pastTeams[i].teamName
				SixesTeamID = pastTeams[i].teamId
				break
			} else {
				HighlanderTeam = pastTeams[i].teamName
				HighlanderTeamID = pastTeams[i].teamId
				break
			}
		}
	}
	return [
		SixesTeam,
		SixesTeamID,
		HighlanderTeam,
		HighlanderTeamID,
	];
}

//Takes the player's ETF2L profile and returns both their div and team info at the same time
const getETF2LDivAndTeamInfo = async (profile/*, pastTeams*/) => {
    //Default values will all be null
	let SixesHighestDiv = null;
	let SixesLatestDiv = null;
	let SixesTeam = null;
	let SixesTeamID = null;
	let HighlanderHighestDiv = null;
	let HighlanderLatestDiv = null;
	let HighlanderTeam = null;
	let HighlanderTeamID = null;

    //If the player profile is invalid, return all null
    if (profile === undefined || profile === null || profile.length === 0) {
        return [
	        SixesHighestDiv,
	        SixesLatestDiv,
            SixesTeam,
            SixesTeamID,
	        HighlanderHighestDiv,
	        HighlanderLatestDiv,
            HighlanderTeam,
            HighlanderTeamID,
        ];
    }

    //Run once for each gamemode in this player's profile
	for (let gamemode = 0; gamemode < profile.player.teams.length; gamemode++) {
        const gamemodeInfo = profile.player.teams[gamemode];
        const curGamemode = gamemodeInfo.type;
        if (curGamemode === "6v6") { //Collect 6s info
            SixesTeam = gamemodeInfo.name;
            SixesTeamID = gamemodeInfo.urls.self.substring(gamemodeInfo.urls.self.lastIndexOf("/") + 1);

            const competitionsPlayed = Object.keys(gamemodeInfo.competitions);
            let highestDiv = null
            for (let i = competitionsPlayed.length - 1; i >= 0; i--) {
                curCompetition = gamemodeInfo.competitions[competitionsPlayed[i]];
                if (curCompetition.division.name != null) {
                    if (SixesLatestDiv == null) SixesLatestDiv = curCompetition.division.name.replace(/\s/g, '');

                    const divNumber = ETF2LDivisions[curCompetition.division.name];
                    if (divNumber && divNumber > highestDiv) highestDiv = divNumber;
                }
            }
            SixesHighestDiv = ETF2LDivisionsInverse[highestDiv]
        } else if (curGamemode === "Highlander") { //Collect HL info
            HighlanderTeam = gamemodeInfo.name;
            HighlanderTeamID = gamemodeInfo.urls.self.substring(gamemodeInfo.urls.self.lastIndexOf("/") + 1);

            competitionsPlayed = Object.keys(gamemodeInfo.competitions);

            //Calculate highest div
            let highestDiv = null
            for (let i = competitionsPlayed.length - 1; i >= 0; i--) {
                curCompetition = gamemodeInfo.competitions[competitionsPlayed[i]];
                if (curCompetition.division.name != null) {
                    if (HighlanderLatestDiv == null) HLLatestDiv = curCompetition.division.name.replace(/\s/g, '');
                    
                    const divNumber = ETF2LDivisions[curCompetition.division.name];
                    if (divNumber && divNumber > highestDiv) highestDiv = divNumber;
                }
            }
            HighlanderHighestDiv = ETF2LDivisionsInverse[highestDiv]
        }
	}
	return [
	    SixesHighestDiv,
	    SixesLatestDiv,
        SixesTeam,
        SixesTeamID,
	    HighlanderHighestDiv,
	    HighlanderLatestDiv,
        HighlanderTeam,
        HighlanderTeamID,
	];
}

// gamemode = "Sixes" or "Highlander"
// getHighestPlayed
// true = get the user's highest division played
// false = latest division played
const getHighestRGLGamemodeTeam = async (pastTeams) => {
    const highestNumericalDivisionPlayed6s = getHighestNumericalDivisionPlayed(pastTeams, "Sixes");
    const latestNumericalDivisionPlayed6s = getLatestDivisionPlayed(pastTeams, "Sixes");
    const highestNumericalDivisionPlayedHL = getHighestNumericalDivisionPlayed(pastTeams, "Highlander");
    const latestNumericalDivisionPlayedHL = getLatestDivisionPlayed(pastTeams, "Highlander");
    const highestDivisionString6s = RGLDivisionsInverse[highestNumericalDivisionPlayed6s];
    const latestDivisionString6s = RGLDivisionsInverse[latestNumericalDivisionPlayed6s];
    const highestDivisionStringHL = RGLDivisionsInverse[highestNumericalDivisionPlayedHL];
    const latestDivisionStringHL = RGLDivisionsInverse[latestNumericalDivisionPlayedHL];
    return [
        highestDivisionString6s,
        latestDivisionString6s,
        highestDivisionStringHL,
        latestDivisionStringHL,
	];
}

//Display ETF2L username on single-log page
const updateETF2LNameOnPage = async (playerInfo, leagueElement) => {
    // Get rid of 'Loading...' message
    if (!getShowRGLTeamFlag()) leagueElement.innerHTML = "";

    if (!playerInfo.etf2l.name) return;

    const etf2lLink = document.createElement("a");
    etf2lLink.innerHTML = playerInfo.etf2l.name;
    etf2lLink.href = `https://etf2l.org/forum/user/${playerInfo.etf2l.id}/`;
    etf2lLink.target = "_blank";
    etf2lLink.style.backgroundColor = "rgb(144, 238, 144)";
    etf2lLink.style.padding = "6px";
    etf2lLink.style.margin = "6px 0px 6px 6px";
	if (getShowRGLTeamFlag()) etf2lLink.style.marginLeft = "6px";
    leagueElement.appendChild(etf2lLink);

    //Determine whether the player is banned, and if so display ban info
    const banInfo = playerInfo.etf2l.banInfo;
    if (banInfo == null) return;
    const banEndDate = banInfo.end;
    const banWarning = (banEndDate > (Date.now() / 1000));

    if (!banWarning) return;

    const banWarningSpan = document.createElement("span");
    banWarningSpan.innerHTML = " (BANNED)";
    etf2lLink.style.backgroundColor = "rgb(137, 0, 0)";

    etf2lLink.appendChild(banWarningSpan);

	etf2lLink.style.color = "rgb(255, 255, 255)"

    etf2lLink.classList.add("tip")
    etf2lLink.setAttribute("data-original-title", `Banned from ETF2L until ${new Date(banEndDate * 1000).toLocaleDateString()} for: ${banInfo.reason/*.replace(/\s/g, ' ')*/}`)
}

//Display ETF2L team on single-log page
const updateETF2LTeamOnPage = async (gamemode, playerInfo, leagueElement) => {
	if (!playerInfo.etf2l.name) return;
	const teamName = (gamemode === "6s" ? playerInfo.etf2l.currentTeam6s : playerInfo.etf2l.currentTeamHL);
	const teamID = (gamemode === "6s" ? playerInfo.etf2l.currentTeamID6s : playerInfo.etf2l.currentTeamIDHL);
	if (!teamName) return;
    //Copied from RGL team code, dunno if necessary
    if (teamName.includes("Free Agent -")) return;


	const etf2lTeamLink = document.createElement("a");
	etf2lTeamLink.innerHTML = teamName;
	etf2lTeamLink.href = `https://etf2l.org/teams/${teamID}`;
	etf2lTeamLink.target = "_blank";
	etf2lTeamLink.style.backgroundColor = "rgb(38, 217, 38)";
	etf2lTeamLink.style.padding = "6px";
	etf2lTeamLink.style.margin = "6px 0px 6px 0px";

	leagueElement.appendChild(etf2lTeamLink);
}

//Display ETF2L division on single-log page
const updateETF2LDivisionOnPage = async (playedGamemode, playerInfo, leagueElement) => {
    let division;
    if (!playerInfo.etf2l.name) {
        return;
    } else {
        const getHighestDivison = await getHighestDivisionPlayedFlag();
        division = getHighestDivison ? (playedGamemode === "6s" ? playerInfo.etf2l.division6s : playedGamemode === "HL" ? playerInfo.etf2l.divisionHL : null) : (playedGamemode === "6s" ? playerInfo.etf2l.latestDivision6s : playedGamemode === "HL" ? playerInfo.etf2l.latestDivisionHL : 1);
        if (division == undefined) division = "None";
        if (division && !ETF2LDivisionSpecs[division]) {
            console.log(playerInfo);
            console.log("Error occurred for " + playerInfo.etf2l.name);
            console.log(`The division is not valid. Division: ${division}`);
            return;
        }
    }

    const etf2lDivisionElement = document.createElement("span");
    etf2lDivisionElement.style.backgroundColor = ETF2LDivisionSpecs[division].backgroundColor;
    etf2lDivisionElement.style.color = ETF2LDivisionSpecs[division].textColor;
    etf2lDivisionElement.style.fontWeight = "bold";
    etf2lDivisionElement.style.minWidth = "35px";
    etf2lDivisionElement.style.display = "inline-block";
    etf2lDivisionElement.style.textAlign = "center";
    etf2lDivisionElement.innerHTML = ETF2LDivisionSpecs[division].shortenedName;
    etf2lDivisionElement.style.padding = "2px";
    etf2lDivisionElement.style.marginLeft = "6px";
    if (!playerInfo.rgl.name) etf2lDivisionElement.style.marginRight = "-3px";
    etf2lDivisionElement.style.border = "4px";
    etf2lDivisionElement.style.borderStyle = "solid";
    etf2lDivisionElement.style.borderColor = "rgb(144, 238, 144)";

    leagueElement.appendChild(etf2lDivisionElement);
}

//Display RGL name on single-log page
const updateRGLName = async (steamID, playerInfo, leagueElement, playedGamemode) => {
    if (!playerInfo.rgl.name) {
        //If this log is 6s or HL and this player doesnt have an RGL or ETF2L profile, display "N/A" in place of their div
        if (!(["6s", "HL"].includes(playedGamemode)) && !playerInfo.etf2l.name) {
            const rglLink = document.createElement("a");
            rglLink.target = "_blank";
            rglLink.style.backgroundColor = "rgb(221, 221, 221)";
            rglLink.style.padding = "6px";
            rglLink.style.marginLeft = "6px";
   
            rglLink.innerHTML = "N/A";

            leagueElement.appendChild(rglLink);
        }
        return;
    }

    const rglLink = document.createElement("a");
    rglLink.href = `https://rgl.gg/Public/PlayerProfile?p=${steamID}`;
    rglLink.target = "_blank";
    rglLink.style.backgroundColor = "rgb(255, 203, 108)";
    rglLink.style.padding = "6px";
    rglLink.style.margin = "6px 0px 6px 6px";

    //Determine whether the player is banned, and if so display ban info
    const banWarning = playerInfo.rgl.banInfo;

    rglLink.innerHTML = playerInfo.rgl.name;

    leagueElement.appendChild(rglLink);
    if (!banWarning) return;

    const banWarningSpan = document.createElement("span");
    banWarningSpan.innerHTML = " (BANNED)";
    rglLink.style.backgroundColor = "rgb(137, 0, 0)";

    rglLink.appendChild(banWarningSpan);

	rglLink.style.color = "rgb(255, 255, 255)";

    rglLink.classList.add("tip");
    rglLink.setAttribute("data-original-title", `Banned from RGL until ${new Date(Date.parse(banWarning.endsAt)).toLocaleDateString()} for: ${banWarning.reason.replace(/(<.?br.?>)/g, ' ')}`)
}

//Display RGL team on single-log page
const updateRGLTeamOnPage = async (gamemode, playerInfo, leagueElement) => {
	if (!playerInfo.rgl.name) return;
	const teamName = (gamemode === "6s" ? playerInfo.rgl.currentTeam6s : playerInfo.rgl.currentTeamHL);
	const teamID = (gamemode === "6s" ? playerInfo.rgl.currentTeamID6s : playerInfo.rgl.currentTeamIDHL);
	if (!teamName) return;
    if (teamName.includes("Free Agent -")) return;


	const rglTeamLink = document.createElement("a");
	rglTeamLink.innerHTML = teamName;
	rglTeamLink.href = `https://rgl.gg/Public/Team?t=${teamID}`;
	rglTeamLink.target = "_blank";
	rglTeamLink.style.backgroundColor = "rgb(252, 180, 46)";
	rglTeamLink.style.padding = "6px";
	rglTeamLink.style.margin = "6px 0px 6px 6px";

	leagueElement.appendChild(rglTeamLink);
}

//Display RGL division on single-log page
const updateRGLDivisionOnPage = async (playedGamemode, playerInfo, leagueElement) => {
    let division;
    if (!playerInfo.rgl.name) {
        if (!(["6s", "HL"].includes(playedGamemode))) return;
        if (playerInfo.etf2l.name) return;
        division = "NA";
    } else {
        const getHighestDivison = await getHighestDivisionPlayedFlag();
        division = getHighestDivison ? (playedGamemode === "6s" ? playerInfo.rgl.division6s : playedGamemode === "HL" ? playerInfo.rgl.divisionHL : null) : (playedGamemode === "6s" ? playerInfo.rgl.latestDivision6s : playedGamemode === "HL" ? playerInfo.rgl.latestDivisionHL : 1);
        if (!RGLDivisionSpecs[division]) {
            console.log(playerInfo);
            console.log("Error occurred for " + playerInfo.rgl.name);
            console.log(`The division is not valid. Division: ${division}`);
            return;
        }
    }

    const rglDivisionElement = document.createElement("span");
    rglDivisionElement.style.backgroundColor = RGLDivisionSpecs[division].backgroundColor;
    rglDivisionElement.style.color = RGLDivisionSpecs[division].textColor;
    rglDivisionElement.style.fontWeight = "bold";
    rglDivisionElement.style.minWidth = "35px";
    rglDivisionElement.style.display = "inline-block";
    rglDivisionElement.style.textAlign = "center";
    rglDivisionElement.innerHTML = RGLDivisionSpecs[division].shortenedName;
    rglDivisionElement.style.padding = !(playerInfo.etf2l.name || playerInfo.rgl.name) ? "6px" : "2px";
    rglDivisionElement.style.marginLeft = "6px";
    rglDivisionElement.style.marginRight = "-3px";
    if (playerInfo.etf2l.name || playerInfo.rgl.name) {
        rglDivisionElement.style.border = "4px";
        rglDivisionElement.style.borderStyle = "solid";
        rglDivisionElement.style.borderColor = "rgb(252, 179, 44)";
    }

    //Detect if this element causes a line wrap, if so do some special formatting
    const oldHeight = leagueElement.offsetHeight;
    leagueElement.appendChild(rglDivisionElement);
    const newHeight = leagueElement.offsetHeight;
    if (playerInfo.etf2l.name && newHeight > oldHeight && newHeight > 49) {
        leagueElement.children[leagueElement.children.length - 2].style.marginRight = "-3px";
        leagueElement.insertBefore(document.createElement("br"), rglDivisionElement);
        rglDivisionElement.style.marginTop = "4px";
    }
}

//Takes steamID64 and RGL profile (if retrieved by the RGL profile batch fetch) and returns a dictionary of player info
const fetchPlayerInfo = async (steamID, RGLProfile, skipMode = "default") => {
    const showETF2L = await getShowETF2LNameFlag();
    const showETF2LTeam = await getShowETF2LTeamFlag();
    const showETF2LDivision = await getShowETF2LDivisionFlag();
    const showRGL = await getShowRGLNameFlag();
    const showRGLTeam = await getShowRGLTeamFlag();
    const showRGLDivision = await getShowRGLDivisionFlag();

    const localPlayerInfo = window.localStorage.getItem(steamID) ?? null;

    const localPlayerInfoJson = JSON.parse(localPlayerInfo);

    let ETF2LProfile, RGLPastTeams;
    let RGLHighestDivisionString6s, RGLLatestDivisionString6s, RGLHighestDivisionStringHL, RGLLatestDivisionStringHL;
    let RGLCurrentTeamString6s, RGLCurrentTeamIDString6s, RGLCurrentTeamStringHL, RGLCurrentTeamIDStringHL;
    let ETF2LHighestDivisionString6s, ETF2LLatestDivisionString6s, ETF2LCurrentTeamString6s, ETF2LCurrentTeamIDString6s, ETF2LHighestDivisionStringHL, ETF2LLatestDivisionStringHL, ETF2LCurrentTeamStringHL, ETF2LCurrentTeamIDStringHL;

    //Only fetch new info if it was last updated more than a day ago
    if (!localPlayerInfoJson || !localPlayerInfoJson.lastUpdated || (Date.now() - localPlayerInfoJson.lastUpdated) / 1000 > 86400) {

        ETF2LProfile = (skipMode == "skipSome" && ![showETF2L, showETF2LTeam, showETF2LDivision].includes(true)) ||
                             (skipMode == "fetchSkipped" && [showETF2L, showETF2LTeam, showETF2LDivision].includes(true)) ?
                             null :
                             await getETF2LProfile(steamID);
        RGLPastTeams = (skipMode == "skipSome" && ![showRGLTeam, showRGLDivision].includes(true)) ||
                             (skipMode == "fetchSkipped" && [showRGLTeam, showRGLDivision].includes(true)) ||
                             (!RGLProfile) ?
                             null :
                             await getRGLPastTeams(steamID);

        if ([RGLProfile, ETF2LProfile, RGLPastTeams/* + ETF2LPastTeams*/].includes("ratelimited")) return "ratelimited";

        [
            RGLHighestDivisionString6s,
            RGLLatestDivisionString6s,
            RGLHighestDivisionStringHL,
            RGLLatestDivisionStringHL
        ] = (skipMode == "skipSome" && !(showRGLDivision)) || (skipMode == "fetchSkipped" && showRGLDivision) ? new Array(4).fill(null) : await getHighestRGLGamemodeTeam(RGLPastTeams);

        [
            RGLCurrentTeamString6s,
            RGLCurrentTeamIDString6s,
            RGLCurrentTeamStringHL,
            RGLCurrentTeamIDStringHL
        ] = (skipMode == "skipSome" && !(showRGLTeam)) || (skipMode == "fetchSkipped" && showRGLTeam) ? new Array(4).fill(null) : await getCurrentRGLTeam(RGLPastTeams);

        [
            ETF2LHighestDivisionString6s,
            ETF2LLatestDivisionString6s,
            ETF2LCurrentTeamString6s,
            ETF2LCurrentTeamIDString6s,
            ETF2LHighestDivisionStringHL,
            ETF2LLatestDivisionStringHL,
            ETF2LCurrentTeamStringHL,
            ETF2LCurrentTeamIDStringHL,
        ] = (skipMode == "skipSome" && !(showETF2LTeam && showETF2LDivision)) || (skipMode == "fetchSkipped" && (showETF2LTeam || showETF2LDivision)) ? new Array(8).fill(null) : await getETF2LDivAndTeamInfo(ETF2LProfile/*, ETF2LPastTeams*/);
    } else {
        console.log(`Player info was updated less than 1 day ago (${(((Date.now() - localPlayerInfoJson.lastUpdated) / 1000) > 3600 ? ((Date.now() - localPlayerInfoJson.lastUpdated) / 1000) / 3600 : ((Date.now() - localPlayerInfoJson.lastUpdated) / 1000) / 60).toFixed(2)} ${((Date.now() - localPlayerInfoJson.lastUpdated) / 1000) > 3600 ? "hours" : "minutes"} ago), skipping`)
    }

    const playerInfoToInsert = {
        rgl: {
            name: RGLProfile ?
                RGLProfile.name : 
                localPlayerInfoJson ?
                localPlayerInfoJson.rgl.name :
                null,
            banInfo: RGLProfile ?
                (RGLProfile.status.isBanned ? RGLProfile.banInformation : false) :
                localPlayerInfoJson ?
                localPlayerInfoJson.rgl.banInfo :
                false,
            division6s: RGLHighestDivisionString6s ?
                RGLHighestDivisionString6s :
                localPlayerInfoJson ?
                localPlayerInfoJson.rgl.division6s :
                "None",
            divisionHL: RGLHighestDivisionStringHL ?
                RGLHighestDivisionStringHL :
                localPlayerInfoJson ?
                localPlayerInfoJson.rgl.divisionHL :
                "None",
            latestDivision6s: RGLLatestDivisionString6s ?
                RGLLatestDivisionString6s :
                localPlayerInfoJson ?
                localPlayerInfoJson.rgl.latestDivision6s :
                "None",
            latestDivisionHL: RGLLatestDivisionStringHL ?
                RGLLatestDivisionStringHL :
                localPlayerInfoJson ?
                localPlayerInfoJson.rgl.latestDivisionHL :
                "None",
			currentTeam6s: RGLCurrentTeamString6s ?
                RGLCurrentTeamString6s :
                localPlayerInfoJson ?
                localPlayerInfoJson.rgl.currentTeam6s :
                "None",
			currentTeamHL: RGLCurrentTeamStringHL ?
                RGLCurrentTeamStringHL :
                localPlayerInfoJson ?
                localPlayerInfoJson.rgl.currentTeamHL :
                "None",
			currentTeamID6s: RGLCurrentTeamIDString6s ?
                RGLCurrentTeamIDString6s :
                localPlayerInfoJson ?
                localPlayerInfoJson.rgl.currentTeamID6s :
                "None",
			currentTeamIDHL: RGLCurrentTeamIDStringHL ?
                RGLCurrentTeamIDStringHL :
                localPlayerInfoJson ?
                localPlayerInfoJson.rgl.currentTeamIDHL :
                "None",
        },
        etf2l: {
            name: ETF2LProfile ?
                ETF2LProfile.player.name :
                localPlayerInfoJson ?
                localPlayerInfoJson.etf2l.name :
                null,
            id: ETF2LProfile ?
                ETF2LProfile.player.id :
                localPlayerInfoJson ?
                localPlayerInfoJson.etf2l.id :
                null,
            banInfo: ETF2LProfile ?
                (ETF2LProfile.player.bans != null ? ETF2LProfile.player.bans.pop() : null) :
                localPlayerInfoJson ?
                localPlayerInfoJson.etf2l.banInfo :
                null,
            division6s: ETF2LHighestDivisionString6s ?
                ETF2LHighestDivisionString6s :
                localPlayerInfoJson ?
                localPlayerInfoJson.etf2l.division6s :
                "None",
            divisionHL: ETF2LHighestDivisionStringHL ?
                ETF2LHighestDivisionStringHL :
                localPlayerInfoJson ?
                localPlayerInfoJson.etf2l.divisionHL :
                "None",
            latestDivision6s: ETF2LLatestDivisionString6s ?
                ETF2LLatestDivisionString6s :
                localPlayerInfoJson ?
                localPlayerInfoJson.etf2l.latestDivision6s :
                "None",
            latestDivisionHL: ETF2LLatestDivisionStringHL ?
                ETF2LLatestDivisionStringHL :
                localPlayerInfoJson ?
                localPlayerInfoJson.etf2l.latestDivisionHL :
                "None",
			currentTeam6s: ETF2LCurrentTeamString6s ?
                ETF2LCurrentTeamString6s :
                localPlayerInfoJson ?
                localPlayerInfoJson.etf2l.currentTeam6s :
                "None",
			currentTeamHL: ETF2LCurrentTeamStringHL ?
                ETF2LCurrentTeamStringHL :
                localPlayerInfoJson ?
                localPlayerInfoJson.etf2l.currentTeamHL :
                "None",
			currentTeamID6s: ETF2LCurrentTeamIDString6s ?
                ETF2LCurrentTeamIDString6s :
                localPlayerInfoJson ?
                localPlayerInfoJson.etf2l.currentTeamID6s :
                "None",
			currentTeamIDHL: ETF2LCurrentTeamIDStringHL ?
                ETF2LCurrentTeamIDStringHL :
                localPlayerInfoJson ?
                localPlayerInfoJson.etf2l.currentTeamIDHL :
                "None",
        },
        lastUpdated: Date.now(),
    };

    return playerInfoToInsert;
}

//Iterates through each row of a single-log page and updates league info
const updatePlayerRows = async (playerRows, rglNameHeader) => {
    const listOfSteamIDsInStorageThatMightNeedUpdating = [];
    const listOfSteamIDsInStorageThatMightNeedUpdatingIndexes = [];
    const listOfSteamIDsInStorageThatSkippedFetches = [];
    const listOfSteamIDsInStorageThatSkippedFetchesIndexes = [];
    const arrayOfPlayerRows = [...playerRows];
    const listOfSteamIDs = arrayOfPlayerRows.map((playerRow) => playerRow.id.split("_")[1]);

	const numPlayers = listOfSteamIDs.length;
	const gamemode = numPlayers < 16 && numPlayers >= 10 ? "6s" : numPlayers >= 16 && numPlayers < 22 ? "HL" : null;
    
	currentBrowser.storage.local.set({playedGamemode: gamemode});
    
    const showETF2L = await getShowETF2LNameFlag();
    const showETF2LTeam = await getShowETF2LTeamFlag();
    const showETF2LDivision = await getShowETF2LDivisionFlag();
    const showRGL = await getShowRGLNameFlag();
    const showRGLTeam = await getShowRGLTeamFlag();
    const showRGLDivision = await getShowRGLDivisionFlag();


	
	if (gamemode === "6s" || gamemode === "HL")
	{
		rglNameHeader.innerHTML =  `${showETF2LTeam ? '<span style="background-color:rgb(38, 217, 38);">ETF2L</span>' : ''}
                                    ${(showETF2LTeam && showRGLTeam) ? '/' : ''}
                                    ${showRGLTeam ? '<span style="background-color:rgb(252, 180, 46);">RGL</span>' : ''}
                                    ${(showETF2LTeam || showRGLTeam) && (showETF2L || showRGL || showRGLDivision) ? ' Team + ' : ''}
                                    ${showETF2L ? '<span style="background-color:rgb(144, 238, 144);">ETF2L</span>' : ''}
                                    ${showETF2L && showRGL ? '/' : ''}
                                    ${showRGL ? '<span style="background-color:rgb(255, 203, 108);">RGL</span>' : ''}
                                    ${(showETF2L || showRGL) ? ' Username' : ''}
                                    ${(showETF2L || showRGL) && (showRGLDivision || showETF2LDivision) ? ' + ' : ''}
                                    ${showETF2LDivision ? '<span style="background-color:rgb(144, 238, 144);">ETF2L</span>' : ''}
                                    ${(showRGLDivision && showETF2LDivision) ? '/' : ''}
                                    ${showRGLDivision ? '<span style="background-color:rgb(255, 203, 108);">RGL</span>' : ''}
                                    ${(showRGLDivision || showETF2LDivision) ? ' ' + gamemode + ' Division' : ''}`;
	}
	else
	{
		rglNameHeader.innerHTML =  `${showETF2L ? '<span style="background-color:rgb(144, 238, 144);">ETF2L</span>' : ''}
                                    ${showETF2L && showRGL ? '/' : ''}
                                    ${showRGL ? '<span style="background-color:rgb(255, 203, 108);">RGL</span>' : ''}`;
	}

    let allPlayersCached = true;
    for (let i = 0; i < listOfSteamIDs.length; i++) {
        if (!window.localStorage.getItem(listOfSteamIDs[i])) {
            allPlayersCached = false;
            //console.log("all players cached?")
            //console.log(allPlayersCached)
            break;
        }
    }

    
    const allRGLInfoDisabled = ![showRGL, showRGLTeam, showRGLDivision].includes(true)

    let RGLProfileList = null;
    let bulkProfileOffset = 0;
    let bulkProfileIndexes = [];

    if (!allPlayersCached && !allRGLInfoDisabled) {
        RGLProfileList = await getRGLProfilesBulk(listOfSteamIDs);
        for (let i = 0; i < listOfSteamIDs.length; i++) {
            const nextRGLProfile = RGLProfileList[i - bulkProfileOffset];
            const steamID = listOfSteamIDs[i];
            
            if (i - bulkProfileOffset >= RGLProfileList.length || nextRGLProfile.steamId != steamID) {
                bulkProfileOffset++;
                bulkProfileIndexes[i] = null;
                //console.log(`no RGL profile for player ${steamID}`)
            } else {
                bulkProfileIndexes[i] = i - bulkProfileOffset;
            }
        }
    }
    
    //Check if any league info is disabled
    const anyLeagueInfoDisabled = [showETF2L, showETF2LTeam, showETF2LDivision, showRGL, showRGLTeam, showRGLDivision].includes(false)

    for (let i = 0; i < listOfSteamIDs.length; i++) {
        const steamID = listOfSteamIDs[i];
        const leagueElement = arrayOfPlayerRows.find((playerRow) => playerRow.id.split("_")[1] == steamID)
            .firstChild;

        const playerInfoStorage = window.localStorage.getItem(steamID);
        let playerInfo;
        if (playerInfoStorage)
		{
			playerInfo = JSON.parse(playerInfoStorage);
			listOfSteamIDsInStorageThatMightNeedUpdating.push(steamID);
			listOfSteamIDsInStorageThatMightNeedUpdatingIndexes.push(i);
        }
		else
		{
            const playerInfoToInsert = await fetchPlayerInfo(steamID, bulkProfileIndexes[i] != null ? RGLProfileList[bulkProfileIndexes[i]] : null, anyLeagueInfoDisabled ? "skipSome" : "default");
            if (playerInfoToInsert === "ratelimited") {
                const errorElement = document.createElement("span");
                errorElement.style.backgroundColor = "#450707";
                errorElement.style.color = "white";
                errorElement.style.fontWeight = "bold";
                errorElement.style.minWidth = "35px";
                errorElement.style.display = "inline-block";
                errorElement.style.textAlign = "center";
                errorElement.innerHTML = `<span class="tip" data-original-title="Rate limited, wait a few seconds and refresh the page">ERROR</span>`;
                errorElement.style.padding = "6px";
                errorElement.style.marginLeft = "6px";
                errorElement.style.marginRight = "-3px";

                leagueElement.appendChild(errorElement);

                continue;
            }

            window.localStorage.setItem(steamID, JSON.stringify(playerInfoToInsert));
            playerInfo = playerInfoToInsert;

            //If any league info is set to not be shown, it will not be fetched to save load time, so fetch it after everything is loaded
            if (anyLeagueInfoDisabled) {
                listOfSteamIDsInStorageThatSkippedFetches.push(steamID);
                listOfSteamIDsInStorageThatSkippedFetchesIndexes.push(i);
            }
        }

        showETF2LTeam && (gamemode === "6s" || gamemode === "HL") && updateETF2LTeamOnPage(gamemode, playerInfo, leagueElement);
        showRGLTeam && (gamemode === "6s" || gamemode === "HL") && updateRGLTeamOnPage(gamemode, playerInfo, leagueElement);
        showETF2L && updateETF2LNameOnPage(playerInfo, leagueElement);
        showRGL && updateRGLName(steamID, playerInfo, leagueElement, gamemode);
        showETF2LDivision && (gamemode === "6s" || gamemode === "HL") && updateETF2LDivisionOnPage(gamemode, playerInfo, leagueElement);
        showRGLDivision && (gamemode === "6s" || gamemode === "HL") && updateRGLDivisionOnPage(gamemode, playerInfo, leagueElement);
    };

    if (allPlayersCached || allRGLInfoDisabled) {
        RGLProfileList = await getRGLProfilesBulk(listOfSteamIDs);
        for (let i = 0; i < listOfSteamIDs.length; i++) {
            const nextRGLProfile = RGLProfileList[i - bulkProfileOffset];
            const steamID = listOfSteamIDs[i];
            
            if (i - bulkProfileOffset >= RGLProfileList.length || nextRGLProfile.steamId != steamID) {
                bulkProfileOffset++;
                bulkProfileIndexes[i] = null;
                //console.log(`no RGL profile for player ${steamID}`)
            } else {
                bulkProfileIndexes[i] = i - bulkProfileOffset;
            }
        }
    }

    // Profiles have local versions that might need updating
    for (let i = 0; i < listOfSteamIDsInStorageThatMightNeedUpdating.length; i++) {
        const steamID = listOfSteamIDsInStorageThatMightNeedUpdating[i];

        const originalIndex = listOfSteamIDsInStorageThatMightNeedUpdatingIndexes[i];
        if (bulkProfileIndexes[originalIndex] != null && steamID != RGLProfileList[bulkProfileIndexes[originalIndex]].steamId) {
            console.log("error! steamid and profile id do not match!!! if you see this message report this to Masonator w/ the link to this log")
            console.log(steamID)
            console.log(RGLProfileList[bulkProfileIndexes[originalIndex]])
        }
        const playerInfoToInsert = await fetchPlayerInfo(steamID, bulkProfileIndexes[originalIndex] != null ? RGLProfileList[bulkProfileIndexes[originalIndex]] : null);
        if (playerInfoToInsert === "ratelimited") continue;
        
        window.localStorage.setItem(steamID, JSON.stringify(playerInfoToInsert));
    };

    //If any fetches were skipped, do them here
    for (let i = 0; i < listOfSteamIDsInStorageThatSkippedFetches.length; i++) {
        const steamID = listOfSteamIDsInStorageThatSkippedFetches[i];

        const originalIndex = listOfSteamIDsInStorageThatSkippedFetchesIndexes[i];
        if (bulkProfileIndexes[originalIndex] != null && steamID != RGLProfileList[bulkProfileIndexes[originalIndex]].steamId) {
            console.log("error! steamid and profile id do not match!!! if you see this message report this to Masonator w/ the link to this log")
            console.log(steamID)
            console.log(RGLProfileList[bulkProfileIndexes[originalIndex]])
        }
        const playerInfoToInsert = await fetchPlayerInfo(steamID, bulkProfileIndexes[originalIndex] != null ? RGLProfileList[bulkProfileIndexes[originalIndex]] : null , "fetchSkipped");
        if (playerInfoToInsert === "ratelimited") continue;
        
        window.localStorage.setItem(steamID, JSON.stringify(playerInfoToInsert));
    };
}

const keysToRemove = [
                        "version",
                        "classkills",
                        "classdeaths",
                        "classkillassists",
                        "chat",
                        "killstreaks",
                        "success"
                    ]

const processLogInfo = async (logID) => {
    const logInfo = await getLogInfo(logID);
    if (logInfo === "ratelimited") return "ratelimited";

    //Remove a bunch of unnecessary info from the log info before caching it, saves cache space
    for (key of keysToRemove) delete logInfo[key];

    logInfo.rounds = Object.keys(logInfo.rounds).length;

    return logInfo;
}

let markScoreColumnComplete;
const scoreColumnCompleted = new Promise(res => {markScoreColumnComplete = res});

//On profile/main pages, iterate through all listed logs and 
const updateLogRows = async (steamID) => {
    const logTable = document.getElementsByClassName("loglist")[0];

    const logTableHeader = logTable.children[0].firstElementChild;
    const logTableBody = logTable.children[1];

    const logsListed = logTableBody.getElementsByTagName("tr");
    const numLogs = logsListed.length;

    const showClassesPlayed = await getShowClassesPlayedFlag();
    if (showClassesPlayed) {
        const classColumn = document.createElement("th");
        classColumn.innerText = "Class";
        classColumn.style.width = "fit-content";
        classColumn.style.minWidth = "50px";
        classColumn.classList.add("center");
        logTableHeader.insertBefore(classColumn, logTableHeader.children[2]);
    }
    
    const showMatchScores = await getShowMatchScoresFlag();
    if (showMatchScores) {
        const scoreColumn = document.createElement("th");
        scoreColumn.innerText = "Score";
        scoreColumn.style.minWidth = "50px";
        scoreColumn.classList.add("center", "tip");
        scoreColumn.id = "scoreheader"
        scoreColumn.setAttribute("data-original-title", "Win - Loss - Stalemate")
        logTableHeader.insertBefore(scoreColumn, logTableHeader.children[0]);
    }

    for (let i = 0; i < numLogs; i++) {
        const curLog = logsListed[i];

        if (showClassesPlayed) {
            const classIconsList = document.createElement("td");
            classIconsList.style.width = "auto";
            classIconsList.style.minWidth = "50px";
            classIconsList.style.backgroundColor = "#ffffff00";
            classIconsList.style.fontWeight = "bold";
            classIconsList.classList.add("center", "classlist");
            classIconsList.innerText = "-";
        
            curLog.insertBefore(classIconsList, curLog.children[2]);
        }

        if (showMatchScores) {
            const scorePreview = document.createElement("td");
            scorePreview.style.backgroundColor = "#ffffff00";
            scorePreview.style.fontWeight = "bold";
            scorePreview.classList.add("center", "scorecontainer");
            scorePreview.innerText = "-";

            curLog.insertBefore(scorePreview, curLog.children[0]);
        }
    }
    console.log("left column created")
    markScoreColumnComplete();

    //If Jack's Log Combiner is active, shift the combiner buttons so they don't overlap with the match scores
    const combinerButtons = document.getElementsByClassName("log_add_button");
    const combinerButtonsShifted = (await getShowMatchScoresFlag() && combinerButtons.length > 0)

    await combinerOffsetCompleted;

    if (await getShowOfficialMatchesFlag()) {
        const firstLogTimestamp = parseInt(logsListed[0].childNodes[7].getAttribute("data-timestamp")) + 5;
        const lastLogTimestamp = parseInt(logsListed[logsListed.length - 1].childNodes[7].getAttribute("data-timestamp")) - 5;

        const logsOnPage = (await getLogMatchInfoBulk({steamID64: steamID, startTime: lastLogTimestamp, endTime: firstLogTimestamp})).logs

        logsOnPage.forEach(async (log) => {
            let logID = log.logid
            let logElement = document.getElementById(`log_${logID}`)

            if (logElement != null) {
                if (log.league != null) {
                    const formattedMatchInfo = await getOrSaveCachedLogInfo(logID, log);
                    const matchLink = formattedMatchInfo.matchLink;
                    console.log("official found!")

                    const matchHyperlink = document.createElement("a");
                    matchHyperlink.href = matchLink;
                    matchHyperlink.alignItems = "center"
                    matchHyperlink.style.marginRight = "3px";

                    const checkmark = document.createElement("img");
                    checkmark.id = "official-match-icon";
                    checkmark.src = currentBrowser.runtime.getURL("icons/official-match-icon.png");
                    checkmark.width = 16;
                    checkmark.height = 16;
                    checkmark.style.filter = `hue-rotate(${OfficialCheckmarkColorShifts[log.league]})`;
                    checkmark.setAttribute("data-original-title", formattedMatchInfo.matchHeaderText);
                    checkmark.classList.add("tip")
                    checkmark.onmouseenter = function(){showOfficialPopover(formattedMatchInfo, checkmark)};
                    checkmark.onmouseleave = function(){deleteOfficialPopover()};
                    matchHyperlink.appendChild(checkmark);
                    logElement.children[1].insertBefore(matchHyperlink, logElement.children[1].children[0]);
                }
            } else {
                return;
            }
        });
    }

    for (let i = 0; i < numLogs; i++) {
        const curLog = logsListed[i];
        const curLogLink = curLog.children[1].lastChild.href;
        const curLogID = curLogLink.substring(curLogLink.lastIndexOf("/") + 1, curLogLink.indexOf("#"));

        const logInfoParsed = (logInfoStorage = true && window.sessionStorage.getItem(curLogID)) ? JSON.parse(logInfoStorage) : null;
        const logTimestamp = new Date(logInfoParsed && logInfoParsed.hasOwnProperty('info') ? logInfoParsed.info.date * 1000 : 0)
        if (logInfoParsed && logTimestamp.setHours(logTimestamp.getHours() + 2) < Date.now()) {
            console.log("using saved info")
			logInfo = logInfoParsed;
        } else {
            console.log("logging new info")
            logInfo = await processLogInfo(curLogID);
            if (logInfo === "ratelimited") {
                const scorePreview = curLog.getElementsByClassName("scorecontainer")[0];
                const scoreElement = document.createElement("td");
                scoreElement.style.backgroundColor = "#450707";
                scoreElement.style.color = "white";
                scoreElement.style.fontWeight = "bold";
                scoreElement.style.textAlign = "center";
                scoreElement.innerHTML = `<span class="tip" data-original-title="Rate limited, wait a few seconds and refresh the page">ERROR</span>`;
                scoreElement.style.padding = "6px";
                scoreElement.style.marginLeft = "0px";
                scoreElement.style.marginRight = "0px";
                scoreElement.style.width = "auto !important"

                scorePreview.replaceWith(scoreElement)
            }

            window.sessionStorage.setItem(curLogID, JSON.stringify(logInfo));
        }
        const steamID64BaseShortened = 1197960265728;
    
        const steamID64 = steamID;
        const steamID64Shortened = steamID64.substring(steamID64.length - 13)
        const steamID3 = `[U:1:${steamID64Shortened - steamID64BaseShortened}]`;
    
        const playerInfo = logInfo.players[steamID3];
        const playerClassesPlayed = playerInfo.class_stats;

        const gameDuration = logInfo["length"]
        
        if (showClassesPlayed) {
            const classIconsList = curLog.getElementsByClassName("classlist")[0];
            classIconsList.innerText = "";

            for (j = 0; j < playerClassesPlayed.length; j++) {
                const classPlayed = playerClassesPlayed[j];
                const classPlayedName = classPlayed.type;
                const formatting = ClassIconFormat[classPlayedName];
                const classIcon = document.createElement("i");

                let dataString = `<table class='log table'><thead><tr><th>Played</th><th>K</th><th>A</th><th>D</th><th>DA</th><th>DA/M</th></tr></thead><tbody><tr><td>${Math.floor(classPlayed.total_time / 60)}:${(classPlayed.total_time % 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}</td><td>${classPlayed.kills}</td><td>${classPlayed.assists}</td><td>${classPlayed.deaths}</td><td>${classPlayed.dmg}</td><td>${(classPlayed.dmg / (classPlayed.total_time / 60)).toFixed(0)}</td></tr></table>`;

                let weaponsUsed = [];
                const weaponsUsedKeys = Object.keys(classPlayed.weapon);
                
                let alreadyHasPistol = false;
                let hasScoutPistol = false;
                let firstPistolIndex = -1
                for (k = 0; k < weaponsUsedKeys.length; k++) {
                    if (weaponsUsedKeys[k] in ["pistol", "pistol_scout"]) {
                        if (alreadyHasPistol) {
                            weaponsUsed[firstPistolIndex][1].kills += classPlayed.weapon[weaponsUsedKeys[k]].kills;
                            weaponsUsed[firstPistolIndex][1].dmg += classPlayed.weapon[weaponsUsedKeys[k]].dmg;
                            weaponsUsed[firstPistolIndex][1].avg_dmg += classPlayed.weapon[weaponsUsedKeys[k]].avg_dmg;
                            weaponsUsed[firstPistolIndex][1].shots += classPlayed.weapon[weaponsUsedKeys[k]].shots;
                            weaponsUsed[firstPistolIndex][1].hits += classPlayed.weapon[weaponsUsedKeys[k]].hits;
                        } else {
                            firstPistolIndex = k;
                        }
                        alreadyHasPistol = true
                    };
                    weaponsUsed.push([weaponsUsedKeys[k], classPlayed.weapon[weaponsUsedKeys[k]]]);
                }
                weaponsUsed = weaponsUsed.sort((a, b) => {
                    if (a[1].kills > b[1].kills) {
                        return -1
                    } else if (a[1].kills == b[1].kills) {
                        if (a[1].dmg > b[1].dmg) {
                            return -1;
                        } else if (a[1].dmg == b[1].dmg) {
                            if ((a[1].hits / a[1].shots) > (b[1].hits / b[1].shots)) {
                                return -1;
                            }
                        }
                    }
                });
                const weaponKeys = Object.keys(weaponsUsed)
                if (weaponKeys.length > 0) {
                    let stringToInsert = ""
                    for (k = 0; k < weaponKeys.length; k++) {
                        const curWeapon = weaponsUsed[k][1]
                        if (curWeapon.kills == 0 && curWeapon.dmg == 0 && curWeapon.shots == 0) continue;
                        stringToInsert = `${stringToInsert}<tr><td>${WeaponLookupTable[weaponsUsed[k][0]]}</td><td>${curWeapon.kills}${weaponsUsed.length == 1 ? "" : classPlayed.kills > 0 ? " (" + ((curWeapon.kills / classPlayed.kills) * 100).toFixed(0) + "%)" : ""}</td><td>${weaponsUsed[k][0] == "world" ? "-" : curWeapon.dmg}${weaponsUsed.length == 1 || weaponsUsed[k][0] == "world" ? "" : classPlayed.dmg > 0 ? " (" + ((curWeapon.dmg / classPlayed.dmg) * 100).toFixed(0) + "%)" : ""}<td>${curWeapon.shots > 0 ? (((curWeapon.hits / curWeapon.shots) * 100).toFixed(0)) + "%" : "-"}</td></td></tr>`;
                    }
                    dataString = `${dataString}<hr><table class='log table'><thead><tr><th>Weapon</th><th>K</th><th>DA</th><th>Acc</th></tr></thead><tbody>${stringToInsert}</tbody></table>`;
                }

                if (classPlayedName === "medic" && playerInfo.heal > 0) {
                    const stringToInsert = `<tr><td style="text-align: center">${playerInfo.heal}<br>(${(playerInfo.heal / (gameDuration / 60)).toFixed(0)}/m)</td><td>${playerInfo.ubertypes.hasOwnProperty("medigun") ? playerInfo.ubertypes.medigun : 0}</td><td>${playerInfo.ubertypes.hasOwnProperty("kritzkrieg") ? playerInfo.ubertypes.kritzkrieg : 0}</td><td>${playerInfo.drops}</td><td>${playerInfo.medicstats.avg_time_to_build != undefined ? parseFloat(playerInfo.medicstats.avg_time_to_build).toFixed(1) + "s" : "-"}</td><td>${playerInfo.medicstats.avg_time_before_using != undefined ? parseFloat(playerInfo.medicstats.avg_time_before_using).toFixed(1) + "s" : "-"}</td><td>${playerInfo.medicstats.avg_uber_length != undefined ? parseFloat(playerInfo.medicstats.avg_uber_length).toFixed(1) + "s" : "-"}</td></tr>`;
                    dataString = `${dataString}<hr><table class='log table'><thead><tr><th>Heals</th><th style="text-align: center">Ü</th><th style="text-align: center">Kr</th><th>Drops</th><th style="text-align: center">Time to<br>Build</th><th style="text-align: center">Time to<br>Use</th><th style="text-align: center">Uber<br>Time</th></tr></thead><tbody>${stringToInsert}</tbody></table>`;
                }

                const opacity = ((classPlayed.total_time / gameDuration) + 0.4).toFixed(1);
                classIcon.classList.add("classicon", classPlayedName);
                classIcon.setAttribute("data-order", formatting.order);
                classIcon.setAttribute("style", `opacity: ${opacity}`);
                classIcon.setAttribute("data-title", formatting.title);
                classIcon.setAttribute("data-content", dataString);
                classIcon.onmouseenter = function(){showIconPopover(classIcon, formatting.title)};
                classIcon.onmouseleave = function(){deleteIconPopover()};
                classIcon.position = "relative"
                classIconsList.appendChild(classIcon);

                classIconsList.style.fontWeight = "";
            }
        }

        if (showMatchScores) {
            const scorePreview = curLog.getElementsByClassName("scorecontainer")[0];
            
            const redScore = logInfo.teams.Red.score;
            const bluScore = logInfo.teams.Blue.score;
            const roundsTied = logInfo.rounds - (redScore + bluScore);

            const playerTeam = playerInfo.team;

            let roundsWon;
            let roundsLost;

            if (playerTeam == "Red") {
                roundsWon = redScore;
                roundsLost = bluScore;
            } else {
                roundsWon = bluScore;
                roundsLost = redScore;
            }

            const scoreElement = document.createElement("td");
            scoreElement.style.backgroundColor = roundsWon > roundsLost ? "#48a148" : roundsWon < roundsLost ? "#a14848" : "#a1a1a1";
            scoreElement.style.color = "white";
            scoreElement.style.fontWeight = "bold";
            scoreElement.style.textAlign = "center";
            scoreElement.innerHTML = `${roundsWon} - ${roundsLost} - ${roundsTied}`;
            if (combinerButtonsShifted) scoreElement.appendChild(scorePreview.children[0]);
            scoreElement.style.padding = "6px";
            scoreElement.style.marginLeft = "0px";
            scoreElement.style.marginRight = "0px";
            scoreElement.style.width = "auto !important"

            scorePreview.replaceWith(scoreElement);
        }
    }
}

const getMatchData = async (playersInLog, logTime, gamemode, logID) => {
    const startTime = logTime.setHours(logTime.getHours()-1)/1000
    const endTime = logTime.setHours(logTime.getHours()+1)/1000
    const possibleMatches = (await getLogMatchInfo({players: playersInLog, startTime: startTime, endTime: endTime, gamemode: gamemode === "6s" ? "sixes" : "highlander"})).logs;
    correctMatch = findDictInArray(possibleMatches, "logid", logID);
    return correctMatch;
}

const showMatchInfo = async (playerRows) => {
    if (!(await getShowMatchInfoFlag())) return;
    const arrayOfPlayerRows = [...playerRows];
    const listOfSteamIDs = arrayOfPlayerRows.map((playerRow) => playerRow.id.split("_")[1]);

    const dateTime = document.getElementsByClassName("datefield")[0];
    const timestamp = new Date(dateTime.getAttribute("data-timestamp") * 1000);

    const gamemode = await getPlayedGamemodeFlag();

    const logID = pageURL.substring(pageURL.lastIndexOf("/") + 1, pageURL.lastIndexOf("#") != -1 ? pageURL.lastIndexOf("#") : pageURL.length);

    const logDateHeader = document.getElementById("log-date");

    const competitionHeader = document.createElement("h3");
    const competitionHeaderHyperlink = document.createElement("a");

    competitionHeader.appendChild(competitionHeaderHyperlink);
    logDateHeader.after(competitionHeader);

    const matchHeader = document.createElement("h3");
    const matchHeaderHyperlink = document.createElement("a");

    matchHeader.appendChild(matchHeaderHyperlink);
    competitionHeader.after(matchHeader);

    const logInfo = await getOrSaveCachedLogInfo(logID, null, listOfSteamIDs, timestamp, gamemode, matchHeader);
    if (logInfo == null) return;

    competitionHeaderHyperlink.href = logInfo.competitionLink;
    competitionHeaderHyperlink.innerText = logInfo.competitionHeaderText;
    
    matchHeaderHyperlink.href = logInfo.matchLink;
    matchHeaderHyperlink.innerText = logInfo.matchHeaderText;
}

const showIconPopover = (classIcon, title) => {
    classPopover = document.createElement("div");
    classPopover.classList.add("popover", "top", "in");
    classPopover.style.display = "block";

    classPopoverArrow = document.createElement("div");
    classPopoverArrow.classList.add("arrow");
    classPopover.appendChild(classPopoverArrow);

    classPopoverTitle = document.createElement("h3");
    classPopoverTitle.classList.add("popover-title");
    classPopoverTitle.innerText = title;
    classPopover.appendChild(classPopoverTitle);

    classPopoverContent = document.createElement("div");
    classPopoverContent.classList.add("popover-content");
    classPopoverContent.innerHTML = classIcon.getAttribute("data-content");
    classPopover.appendChild(classPopoverContent);
    
    classIconPos = classIcon.getBoundingClientRect();

    classIcon.after(classPopover);

    const zoom = window.devicePixelRatio;
    const extraOffsetWidth = Math.max(0, -0.495 * (document.getElementsByClassName("container main")[0].offsetWidth - document.getElementsByTagName("body")[0].offsetWidth));
    classPopover.style.top = `${((classIconPos.top + window.scrollY)) - classPopover.offsetHeight - 75}px`;
    classPopover.style.left = `${((classIconPos.left + window.scrollX) - extraOffsetWidth) - (classPopover.offsetWidth * 0.5) + (8 * zoom)}px`;
    classPopover.position = "absolute"
    
    //console.log("popover shown");
}

const deleteIconPopover = () => {
    document.getElementsByClassName("popover top in")[0].remove();
}

const showOfficialPopover = (matchInfo, checkmark) => {
    officialPopover = document.createElement("div");
    officialPopover.classList.add("popover", "top", "in");
    officialPopover.style.display = "block";
    officialPopover.style.padding = "6px";

    officialPopoverArrow = document.createElement("div");
    officialPopoverArrow.classList.add("arrow");
    officialPopover.appendChild(officialPopoverArrow);

    officialPopoverContent = document.createElement("div");
    officialPopoverContent.classList.add("popover-content");
    officialPopoverContent.innerText = `${matchInfo.competitionHeaderText.replace(/\s/g, ' ')}
                                        ${matchInfo.matchHeaderText.replace(/\s/g, ' ')}`;
    officialPopoverContent.style.textAlign = "center";
    officialPopoverContent.style.lineHeight = "1.8";
    officialPopover.appendChild(officialPopoverContent);
    
    checkmarkPos = checkmark.getBoundingClientRect();

    checkmark.after(officialPopover);
    
    const zoom = window.devicePixelRatio;
    
    const extraOffsetWidth = Math.max(0, -0.495 * (document.getElementsByClassName("container main")[0].offsetWidth - document.getElementsByTagName("body")[0].offsetWidth));
    officialPopover.style.top = `${((checkmarkPos.top + window.scrollY)) - officialPopover.offsetHeight - 75}px`;
    officialPopover.style.left = `${((checkmarkPos.left + window.scrollX) - extraOffsetWidth) - (officialPopover.offsetWidth * 0.51) + (8 * zoom)}px`;
    
    officialPopover.position = "absolute"
    
    //("popover shown");
}

const deleteOfficialPopover = () => {
    document.getElementsByClassName("popover top in")[0].remove();
}


const pageURL = document.URL
if (pageURL.includes("logs.tf/") && !(pageURL.includes("json")) && !(pageURL.includes("uploads"))) {
    if (pageURL.includes("profile")) {
        console.log("Parsing player profile stats and info!")

        const steamID = pageURL.substring(pageURL.indexOf("profile") + 8, pageURL.lastIndexOf("?") != -1 ? pageURL.lastIndexOf("?") : pageURL.length);

        const mainElement = document.getElementsByClassName("container main")[0];
        mainElement.style = "width: fit-content !important; min-width: 980px !important";

        updateLogRows(steamID);
    } else if (pageURL.length > 16 && !(pageURL.includes("tf/?p=")) && !(pageURL.includes("tf/popular"))) {
        console.log("Parsing single log stats and info!")

        let classIcons = document.getElementsByClassName("classicon");

        for (let icon of classIcons) {
            let dataToDisplay = icon.getAttribute("data-content");

            let timePlayed = dataToDisplay.match(/((?<=<tbody><tr><td>)\d+:\d+)/g)[0].split(":");
            let secondsPlayed = (parseInt(timePlayed[0]) * 60) + parseInt(timePlayed[1]);
            let damageDone = dataToDisplay.match(/(\d+(?=<\/td><\/tr><\/table>))/g)[0];

            if (damageDone == 0 || secondsPlayed == 0) continue;

            dataToDisplay = dataToDisplay.replace(/((?<=<th>D<\/th><th>DA)<\/th>)/g, `</th><th>DA\/M</th>`); //add dpm header
            dataToDisplay = dataToDisplay.replace(/(<\/td>(?=<\/tr><\/table>))/g, `</td><td>${(parseInt(damageDone) / (secondsPlayed / 60)).toFixed(0)}</td>`);

            icon.setAttribute("data-content", dataToDisplay);
        }

        if (!isFirefox) {
            const mainElement = document.getElementsByClassName("container main")[0];
            mainElement.style = "minWidth: 1400px !important; width: fit-content !important";

            const logBackground = this.document.getElementById("log-section-players");
            logBackground.style.paddingLeft = "0px";
            logBackground.style.paddingRight = "20px";

            const tableBody = document.getElementById("players");

            const playerTableHead = tableBody.children[0].firstElementChild;
            const playerTableBody = tableBody.children[1];

            const rglNameHeader = document.createElement("th");

            playerTableHead.insertBefore(rglNameHeader, playerTableHead.firstChild);

            const playerRows = playerTableBody.children;

            for (let i = 0; i < playerRows.length; i++) {
                const leagueData = document.createElement("td");
                leagueData.innerHTML = "";
                leagueData.style.padding = "2px 10px 2px";
                playerRows[i].insertBefore(leagueData, playerRows[i].firstChild);
            }

            updatePlayerRows(playerRows, rglNameHeader);

            showMatchInfo(playerRows);
        }
    } else if (!(pageURL.length <= 16 || pageURL.includes("tf/?p=") || pageURL.includes("tf/popular"))) {
        console.log("Nothing to do on this page")
    }
} else {
    console.log("Not a logs.tf page, somehow")
}

let markCombinerOffsetComplete;
const combinerOffsetCompleted = new Promise(res => {markCombinerOffsetComplete = res});

window.onload = async function() {
    const pageURL = document.URL
    if (pageURL.includes("logs.tf/") && !(pageURL.includes("json")) && !(pageURL.includes("uploads"))) {
        console.log("valid page")
        if (pageURL.includes("profile")) {
            const combinerButtons = document.getElementsByClassName("log_add_button");
            if (await getShowMatchScoresFlag() && combinerButtons.length > 0) {
                await scoreColumnCompleted;
                console.log("offsetting log combiner buttons!");
                this.document.getElementsByClassName("loglist")[0].style.marginLeft = "11px"
                for (let element of combinerButtons) {
                    let parentElement = element.parentNode;
                    let previousElement = parentElement.previousElementSibling;
                    previousElement.appendChild(element);
                    element.style.left = "44px"
                }
                markCombinerOffsetComplete();
            } else {
                console.log("no log combiner buttons to offset");
                markCombinerOffsetComplete();
            }
        } else if (pageURL.length > 17 && !(pageURL.includes("tf/?p=")) && !(pageURL.includes("tf/popular"))) {
            console.log("onload singlelog")

            if (isFirefox) {
                const mainElement = document.getElementsByClassName("container main")[0];
                mainElement.style = "minWidth: 1400px !important; width: fit-content !important";

                const logBackground = this.document.getElementById("log-section-players");
                logBackground.style.paddingLeft = "0px";
                logBackground.style.paddingRight = "20px";

                const tableBody = document.getElementById("players");

                const playerTableHead = tableBody.children[0].firstElementChild;
                const playerTableBody = tableBody.children[1];

                const rglNameHeader = document.createElement("th");

                playerTableHead.insertBefore(rglNameHeader, playerTableHead.firstChild);

                const playerRows = playerTableBody.children;

                for (let i = 0; i < playerRows.length; i++) {
                    const leagueData = document.createElement("td");
                    leagueData.innerHTML = "";
                    leagueData.style.padding = "2px 10px 2px";
                    playerRows[i].insertBefore(leagueData, playerRows[i].firstChild);
                }

                updatePlayerRows(playerRows, rglNameHeader);

                showMatchInfo(playerRows);
            }
            const table = document.getElementById("players");
            const headers = table.getElementsByClassName("tablesorter-headerRow")[0];
            const rows = table.getElementsByTagName("tbody")[0].getElementsByTagName("tr");
            const headerDTM = headers.getElementsByTagName("th")[12];
            const headerDAM = headers.getElementsByTagName("th")[8];

            const DARed = document.getElementById("teams")
                .getElementsByTagName("tbody")[0].getElementsByTagName("tr")[0].getElementsByTagName("td")[2].innerText;
            const DABlu = document.getElementById("teams")
                .getElementsByTagName("tbody")[0].getElementsByTagName("tr")[1].getElementsByTagName("td")[2].innerText;
            
            const teamOrTotalDamage = await getDamagePercentTotalOrTeamFlag();

            const showDamageEfficiency = await getShowDamageEfficiencyFlag();

            const showDamagePercent = await getShowDamagePercentFlag();

            if (showDamageEfficiency) {
                let headerDE = headerDTM.cloneNode(true);
                headerDE.getElementsByClassName("tip")[0].innerText = "DE";
                headerDE.getElementsByClassName("tip")[0].setAttribute("data-original-title", "Damage / Damage Taken"); //"Damage Efficiency (Damage / Damage Taken)"
                headers.insertBefore(headerDE, headerDTM);
            }

            if (showDamagePercent) {
                let headerDAPercent = headerDAM.cloneNode(true);
                headerDAPercent.getElementsByClassName("tip")[0].innerText = "DA%";
                headerDAPercent.getElementsByClassName("tip")[0].setAttribute("data-original-title", `Damage / Total ${teamOrTotalDamage ? "Match" : "Team"} Damage`); //`Damage Done over Total ${teamOrTotalDamage ? "Match" : "Team"} Damage (Damage / Total ${teamOrTotalDamage ? "Match" : "Team"} Damage)`
                headers.insertBefore(headerDAPercent, headerDAM);
            }

            Array.from(rows)
                .forEach(processRow, [DARed, DABlu, teamOrTotalDamage, showDamageEfficiency, showDamagePercent]);
            const logtime = document.getElementById("log-length");

            const showPlayerHPM = await getShowPlayerHPMFlag();
            const showMedicHPMA = await getShowMedicHPMAFlag();

            if (showMedicHPMA || showPlayerHPM) {
                const curLogID = pageURL.substring(pageURL.lastIndexOf("/") + 1, pageURL.lastIndexOf("#") != -1 ? pageURL.lastIndexOf("#") : pageURL.length);
                const logInfoStorage = window.sessionStorage.getItem(curLogID);
                let logInfo;
                const logTimestamp = new Date(parseInt(document.getElementsByClassName("datefield")[0].getAttribute("data-timestamp")) * 1000);
                if (logInfoStorage && logTimestamp.setHours(logTimestamp.getHours() + 2)< Date.now()) {
                    console.log("using saved info")
                    logInfo = JSON.parse(logInfoStorage);
                } else {
                    console.log("logging new info")
                    logInfo = await processLogInfo(curLogID);
                    if (logInfo === "ratelimited") {
                        let heal_medvalblu = heal_healtables[0].getElementsByClassName("medval")[0];
                        heal_medvalblu.innerHTML += `<br><span class="tip" data-original-title="Rate limited, wait a few seconds and refresh the page"><strong>ERROR</strong></span>`
                        return;
                    }

                    window.sessionStorage.setItem(curLogID, JSON.stringify(logInfo));
                }

                const healtables = document.getElementsByClassName("healtable");

                for (let healtable of healtables) {
                    let healerSteamID3;
                    let healerTimePlayed;
                    let healerDeaths;
                    const healerUsername = healtable.getElementsByTagName("h6")[0].innerText;
                    
                    const healerHealsDisplay = healtable.getElementsByClassName("medval")[0];

                    const healerHeals = healerHealsDisplay.innerHTML.substring(healerHealsDisplay.innerHTML.indexOf("strong") + 7, healerHealsDisplay.innerHTML.lastIndexOf("strong") - 2);

                    const listOfSteamIDs = Object.keys(logInfo.names);
                    const listOfNames = logInfo.names;
                    for (let steamID of listOfSteamIDs) {
                        if (listOfNames[steamID] === healerUsername) {
                            healerSteamID3 = steamID
                            const healerClassesPlayed = logInfo.players[healerSteamID3].class_stats;
                            for (let classPlayed of healerClassesPlayed) {
                                if (classPlayed.type === "medic" || healerClassesPlayed.length == 1) {
                                    healerTimePlayed = classPlayed.total_time
                                    healerDeaths = classPlayed.deaths
                                };
                            }
                            break;
                        }
                    }
                    const healerTimeAlive = healerTimePlayed - (14 * healerDeaths);
                    if (healerTimeAlive <= 0) continue;

                    const healerHealsPerMinuteAlive = healerHeals / (healerTimeAlive / 60);

                    if (showMedicHPMA) healerHealsDisplay.innerHTML += `<br><span class="tip" data-original-title="Heals Per Minute Alive (Estimates 14s respawn time per death)">(${healerHealsPerMinuteAlive.toFixed(0)}/m alive)</span>`
                
                    if (showPlayerHPM) {
                        const healHeader = healtable.getElementsByClassName("healsort")[0].getElementsByTagName("thead")[0].getElementsByTagName("tr")[0];
                        const HPMHeader = healHeader.getElementsByTagName("th")[2].cloneNode(true);
                        HPMHeader.getElementsByClassName("tablesorter-header-inner")[0].innerText = "HPM";
                        HPMHeader.getElementsByClassName("tablesorter-header-inner")[0].classList.add("tip");
                        HPMHeader.getElementsByClassName("tablesorter-header-inner")[0].setAttribute("data-original-title", "Heals Per Minute");
                        healHeader.insertBefore(HPMHeader, healHeader.getElementsByTagName("th")[3]);

                        const healRows = healtable.getElementsByClassName("healsort")[0].getElementsByTagName("tbody")[0].getElementsByTagName("tr");

                        for (row of healRows) {
                            let HPM = row.getElementsByTagName("td")[2].cloneNode(true);
                            HPM.innerText = (parseFloat(row.getElementsByTagName("td")[2].innerText) / (healerTimePlayed / 60)).toFixed(0)
                            row.insertBefore(HPM, row.getElementsByTagName("td")[3])
                        }
                        healtable.style.width = "auto";
                    }
                } 
            }
        } else if (pageURL.length <= 16 || pageURL.includes("tf/?p=") || pageURL.includes("tf/popular")) {
            if (await getShowOfficialMatchesFlag()) {
                const logTable = document.getElementsByClassName("loglist")[0];

                const logTableHeader = logTable.children[0].firstElementChild;
                const logTableBody = logTable.children[1];

                const logsListed = logTableBody.getElementsByTagName("tr");

                let allLogsCached = true;
                let logsDisplayed = []
                for (let log of logsListed) {
                    if (!(window.localStorage.getItem(log.children[0].lastChild.href.substring(16)))) {
                        allLogsCached = false;
                        console.log("not all visible logs cached");
                    }
                    logsDisplayed.push(log.children[0].lastChild.href.substring(16));
                };
                const firstLogTimestamp = parseInt(logsListed[0].childNodes[5].getAttribute("data-timestamp")) + 5;
                const lastLogTimestamp = parseInt(logsListed[logsListed.length - 1].childNodes[5].getAttribute("data-timestamp")) - 5;

                const logsOnPage = allLogsCached ? logsDisplayed : ((await getLogMatchInfoBulk({startTime: lastLogTimestamp, endTime: firstLogTimestamp})).logs);

                logsOnPage.forEach(async (log) => {
                    let logID = allLogsCached ? log : log.logid
                    let logElement = document.getElementById(`log_${logID}`)
                    let cachedMatchInfo = ''
                    if (allLogsCached) {
                        cachedMatchInfo = await getOrSaveCachedLogInfo(logID);
                    }
                    if (cachedMatchInfo == null) return;
                    let league = allLogsCached ? (cachedMatchInfo.competitionHeaderText.substring(0, 2).toLowerCase() == "rgl" ? "rglgg" : "etf2l") : log.league;

                    if (logElement != null) {
                        if (!allLogsCached) await getOrSaveCachedLogInfo(logID, log);
                        if (league != null) {
                            const formattedMatchInfo = allLogsCached ? cachedMatchInfo : await getOrSaveCachedLogInfo(logID, log);
                            const matchLink = formattedMatchInfo.matchLink;
                            console.log("official found!")
                            const matchHyperlink = document.createElement("a");
                            matchHyperlink.href = matchLink;
                            matchHyperlink.alignItems = "center"
                            matchHyperlink.style.marginRight = "3px";
                            const checkmark = document.createElement("img");
                            checkmark.id = "official-match-icon";
                            checkmark.src = currentBrowser.runtime.getURL("icons/official-match-icon.png");
                            checkmark.width = 16;
                            checkmark.height = 16;
                            checkmark.style.filter = `hue-rotate(${OfficialCheckmarkColorShifts[log.league]})`;
                            checkmark.setAttribute("data-original-title", formattedMatchInfo.matchHeaderText);
                            checkmark.classList.add("tip")
                            checkmark.onmouseenter = function(){showOfficialPopover(formattedMatchInfo, checkmark)};
                            checkmark.onmouseleave = function(){deleteOfficialPopover()};
                            matchHyperlink.appendChild(checkmark);
                            logElement.children[0].insertBefore(matchHyperlink, logElement.children[0].children[0]);
                        }
                    } else {
                        return;
                    }
                });
            }
        }
    }
}

async function processRow(el) {
    const DTM = el.getElementsByTagName("td")[12];
    const DAM = el.getElementsByTagName("td")[8];
    const DT = el.getElementsByTagName("td")[11];
    const DA = el.getElementsByTagName("td")[7];
    const team = el.getElementsByTagName("td")[1].innerText;
    const DARed = this[0];
    const DABlu = this[1];
    const teamOrTotalDamage = this[2];
    const showDamageEfficiency = this[3];
    const showDamagePercent = this[4];

    if (showDamageEfficiency) {
        let DE = DT.cloneNode(true);
        DE.innerText = (parseFloat(DA.innerText) / parseFloat(DT.innerText))
            .toFixed(2);
        el.insertBefore(DE, DTM);
    }

    if (showDamagePercent) {
        let DAPercent = DT.cloneNode(true);
        let DATotal = teamOrTotalDamage ? parseFloat(DARed) + parseFloat(DABlu) : team === "RED" ? DARed : DABlu;
        DAPercent.innerText = (((parseFloat(DA.innerText) / parseFloat(DATotal)) * 100)
            .toFixed(1)) + "%";
        el.insertBefore(DAPercent, DAM);
    }
}


/**
 * dynamicallyAccessCSS 
 *
 * @link    https://github.com/Frazer/dynamicallyAccessCSS.js
 * @license MIT
 *          
 * @author  Frazer Kirkman
 * @published 2016
 */

var returnStyleSheetRules = (function (){  
	if(!document.styleSheets[0]){
			// Create the <style> tag
			var style = document.createElement("style");
			// WebKit hack :(
			style.appendChild(document.createTextNode(""));
			// Add the <style> element to the page
			document.head.appendChild(style);

	}
	if(document.styleSheets[0].cssRules){
		return function (item) {return  item.cssRules;}
	} 
	else if (document.styleSheets[0].rules) {
	    return function (item) {return  item.rules;}
	}
})();

function getCSSRule(search, returnArray) {
	let styleSheets = [].map.call(document.styleSheets[0], function(item) {
	  return [].slice.call(returnStyleSheetRules(item));
	});

	let rule = null;
	let rules = [];
	styleSheets.forEach(function(thisSheet){
	  let findTheRule = thisSheet.filter(function(rule) {
	    if(rule.selectorText){
	    	return rule.selectorText.lastIndexOf(search)===0  && search.length===rule.selectorText.length;	
	    }else return false;
	  });

	  if(findTheRule.length){
			rules = rules.concat(findTheRule);
			rule = findTheRule[findTheRule.length-1];    //findTheRule will contain all rules that reference the selector. findTheRule[findTheRule.length-1] contains the last rule.
	  }
	});
	if (rule){
		if(returnArray){
			return rules;
		}else{
			return rule;
		}
	}else{
		let sheet = document.styleSheets[0];   //if the rule we are looking for doesn't exist, we create it
        var pos = sheet.cssRules.length;
        if("insertRule" in sheet) {
                sheet.insertRule(search + "{  }",pos);
        }
        else if("addRule" in sheet) {
                sheet.addRule(search, "",pos);
        }
		if(returnArray){
			return returnStyleSheetRules(document.styleSheets[0]);
		}else{
			return returnStyleSheetRules(document.styleSheets[0])[pos];
		}
	}
}

function findDictInArray(array, key, value) {
    for (i = 0; i < array.length; i++) {
        if (array[i][key] == value) {
            return array[i];
        }
    }
    console.log(`no match for ${key} in array!`);
    return null;
}

const getOrSaveCachedLogInfo = async (logID, suppliedMatchInfo, listOfSteamIDs, timestamp, gamemode, matchHeader) => {
    const logInfoStorage = window.localStorage.getItem(logID);

    let competitionHeaderText = '';
    let matchHeaderText = '';
    let competitionLink = '';
    let matchLink = '';

    if (!timestamp && suppliedMatchInfo) timestamp = new Date(suppliedMatchInfo.time * 1000);

    if (logInfoStorage) {
        //console.log("existing match info")

        if (logInfoStorage != "none") {
            matchInfo = JSON.parse(logInfoStorage);
            competitionHeaderText = matchInfo.competitionHeaderText;
            matchHeaderText = matchInfo.matchHeaderText;
            competitionLink = matchInfo.competitionLink;
            matchLink = matchInfo.matchLink;
        } else {
            //console.log("no comp match associated")
            if (matchHeader) matchHeader.innerText = "No Match Found";
            return null;
        }
    } else {
        //console.log("new match info")

        let matchInfo;
        matchInfo = suppliedMatchInfo ? suppliedMatchInfo : await getMatchData(listOfSteamIDs, timestamp, gamemode, logID);

        if (matchInfo && matchInfo.league) {
            console.log(`match found! league: ${matchInfo.league}, matchid: ${matchInfo.matchid}`);

            const league = matchInfo.league;
            const matchID = matchInfo.matchid;
            switch(league) {
                case "etf2l":

                    matchLink = `https://etf2l.org/matches/${matchID}/`;

                    const etf2lMatchInfo = await getETF2LMatchByID(matchID);

                    matchHeaderText = `${etf2lMatchInfo.division ? etf2lMatchInfo.division.name : ''}${etf2lMatchInfo.division ? ' - ' : ''}${etf2lMatchInfo.clan1.name} vs ${etf2lMatchInfo.clan2.name} (${etf2lMatchInfo.round})`

                    const competitionID = etf2lMatchInfo.competition.id;
                    const competitionInfo = await getETF2LCompetitionByID(competitionID);

                    competitionHeaderText = `ETF2L: ${competitionInfo.name}`;

                    if (competitionInfo.archived) {
                        competitionLink = `https://etf2l.org/etf2l/archives/${competitionID}/1/`;
                    } else {
                        competitionLink = `https://etf2l.org/${competitionInfo.name.toLowerCase().replace(/(#|\s*:.+|\(|\))/g, '').replace(/\s/, '-')}-tables/`;
                    }
                    break;

                case "rgl":

                    matchLink = `https://rgl.gg/Public/Match?m=${matchID}`;

                    const RGLMatchInfo = await getRGLMatchByID(matchID)

                    competitionHeaderText = `RGL: ${RGLMatchInfo.seasonName}`;
                    competitionLink = `https://rgl.gg/Public/LeagueTable?s=${RGLMatchInfo.seasonId}`

                    matchHeaderText = `${RGLMatchInfo.divisionName} - ${RGLMatchInfo.teams[0].teamName} vs ${RGLMatchInfo.teams[1].teamName} (${RGLMatchInfo.matchName.replace(/\s-\s.+/, '')})`
                    break;
                default:
                    console.log(`unknown league ${league}! report this to me (masonator) on github so I can add support`)
                    return;
            }

            const matchInfoToSave = {
                competitionHeaderText: competitionHeaderText,
                matchHeaderText: matchHeaderText,
                competitionLink: competitionLink,
                matchLink: matchLink
            }

            window.localStorage.setItem(logID, JSON.stringify(matchInfoToSave));
        } else {
            console.log(`no match found for log ${logID}`);
            let timestampPlus30Minutes = new Date(timestamp.getTime());
            timestampPlus30Minutes = timestampPlus30Minutes.setMinutes(timestampPlus30Minutes.getMinutes() + 30);
            if (timestampPlus30Minutes < Date.now()) {
                window.localStorage.setItem(logID, "none");
                //console.log("marking log as not being associated with any competitive matches");
                if (matchHeader) matchHeader.innerText = "No Match Found";
            } else {
                //console.log(`log less than 30 minutes old, will check again for match info later (currently ${Math.floor(((Date.now() - timestamp.getTime())/10)/60)/100} minutes old)`);
                if (matchHeader) matchHeader.innerText = "No Match Found, Check Again Later";
            }
            return null;
        }
    }
    return {competitionHeaderText: competitionHeaderText, matchHeaderText: matchHeaderText, competitionLink: competitionLink, matchLink: matchLink};
}