const isFirefox = typeof browser !== "undefined";
const currentBrowser = isFirefox ? browser : chrome;

const timer = (ms) => new Promise((res) => setTimeout(res, ms));

const getRGLProfile = async (steamID) => await sendMessageAndWait("rgl_profile", steamID);
const getETF2LProfile = async (steamID) => await sendMessageAndWait("etf2l_profile", steamID);
const getRGLPastTeams = async (steamID) => await sendMessageAndWait("rgl_past_teams", steamID);
const getETF2LPastTeams = async (steamID) => await sendMessageAndWait("etf2l_past_teams", steamID);
const getLogInfo = async (logID) => await sendMessageAndWait("log_info", logID);

const sendMessageAndWait = async (type, steamID) =>
    await currentBrowser.runtime.sendMessage({
        type,
        steamID
    })

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

const RGLDivisions = Object.freeze({
    None: 0,
    Newcomer: 1,
    Amateur: 2,
    Intermediate: 3,
    Main: 4,
    Advanced: 5,
    Invite: 6,
});

const RGLDivisionsInverse = Object.freeze({
    0: "None",
    1: "Newcomer",
    2: "Amateur",
    3: "Intermediate",
    4: "Main",
    5: "Advanced",
    6: "Invite",
});

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

const getHighestNumericalDivisionPlayed = (pastTeams, gameMode) => {
    if (pastTeams === undefined || pastTeams === null || pastTeams.length == 0) return RGLDivisions.None;

    let greatestNumericalDivisionPlayed = RGLDivisions.None;
    for (let i = 0; i < pastTeams.length; i++) {
        if (pastTeams[i].formatName != gameMode) continue;

        const numericalValue = RGLDivisions[pastTeams[i].divisionName];
        if (greatestNumericalDivisionPlayed < numericalValue) {
            greatestNumericalDivisionPlayed = numericalValue;
        }
    }
    return greatestNumericalDivisionPlayed;
}

const getLatestDivisionPlayed = (pastTeams, gameMode) => {
    if (pastTeams === undefined || pastTeams === null || pastTeams.length == 0) return RGLDivisions.None;

    for (let i = 0; i < pastTeams.length; i++) {
        if (pastTeams[i].formatName != gameMode) continue;
        if (RGLDivisions[pastTeams[i].divisionName] === undefined) continue; // To account for special division names like "Spec 2-day" from cups
        return RGLDivisions[pastTeams[i].divisionName];
    }
    return RGLDivisions.None;
}

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
	//console.log(pastTeams);
	for (let gamemode = 0; gamemode < 2; gamemode++) {
		//console.log("yes")
		for (let i = 0; i < pastTeams.length; i++) {
			if (pastTeams[i].formatName != (gamemode === 0 ? "Sixes" : "Highlander")) continue;
			//if (RGLDivisions[pastTeams[i].divisionName] === undefined) continue; // To account for special division names like "Spec 2-day" from cups
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
	//console.log(
	//	SixesTeam,
	//	SixesTeamID,
	//	HighlanderTeam,
	//	HighlanderTeamID,
	//)
	return [
		SixesTeam,
		SixesTeamID,
		HighlanderTeam,
		HighlanderTeamID,
	];
}

const getETF2LDivAndTeamInfo = async (profile/*, pastTeams*/) => {
	let SixesHighestDiv = null;
	let SixesLatestDiv = null;
	let SixesTeam = null;
	let SixesTeamID = null;
	let HighlanderHighestDiv = null;
	let HighlanderLatestDiv = null;
	let HighlanderTeam = null;
	let HighlanderTeamID = null;

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

    //console.log("etf2l div and team")
	//console.log(pastTeams);

    //let teamsLeft = []
	for (let gamemode = 0; gamemode < profile.player.teams.length; gamemode++) {
		//for (let i = 0; i < pastTeams.length; i++) {
        //    const curTeam = pastTeams[i];
        //    if (teamsLeft.includes(curTeam.team.name)) continue;
        //    if (curTeam.type === "left") {
        //        teamsLeft.push(curTeam.team.name)
        //        continue;
        //    }
		//	if (curTeam.team.type != (gamemode === 0 ? "6v6" : "Highlander")) continue;
        //    console.log(curTeam.team.url.substring(curTeam.team.url.lastIndexOf("/") + 1))
		//	if (gamemode === 0) {
		//		SixesTeam = curTeam.team.name;
		//		SixesTeamID = curTeam.team.url.substring(curTeam.team.url.lastIndexOf("/") + 1);
		//		break
		//	} else {
		//		HighlanderTeam = curTeam.team.name;
		//		HighlanderTeamID = curTeam.team.url.substring(curTeam.team.url.lastIndexOf("/") + 1);
		//		break
		//	}
		//}

        const gamemodeInfo = profile.player.teams[gamemode];
        //console.log(profile.player.teams[gamemode])
        //console.log(profile.player.name)
        const curGamemode = gamemodeInfo.type;
        if (curGamemode === "6v6") {
            SixesTeam = gamemodeInfo.name;
            SixesTeamID = gamemodeInfo.urls.self.substring(gamemodeInfo.urls.self.lastIndexOf("/") + 1);

            const competitionsPlayed = Object.keys(gamemodeInfo.competitions)
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
        } else if (curGamemode === "Highlander") {
            HighlanderTeam = gamemodeInfo.name;
            HighlanderTeamID = gamemodeInfo.urls.self.substring(gamemodeInfo.urls.self.lastIndexOf("/") + 1);

            competitionsPlayed = Object.keys(gamemodeInfo.competitions)
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

	//console.log(
	//	SixesTeam,
	//	SixesTeamID,
	//	HighlanderTeam,
	//	HighlanderTeamID,
	//)
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
	//console.log("6s highest/latest and HL highest/latest")
	//console.log(highestDivisionString6s, latestDivisionString6s, highestDivisionStringHL, latestDivisionStringHL)
    return [
        highestDivisionString6s,
        latestDivisionString6s,
        highestDivisionStringHL,
        latestDivisionStringHL,
	];
}

const updateETF2LOnPage = async () => {
    for (let i = 0; i < playerRows.length; i++) {
        const steamID = playerRows[i].id.split("_")[1];
        const resETF2L = await getETF2LProfile(steamID);
        if (!resETF2L) return;

        const leagueElement = playerRows[i].firstChild;

        // Get rid of 'Loading...' message
        //leagueElement.innerHTML = "";

        if (resETF2L.status != 200) {
            console.log(resETF2L);
            continue;
        }

        // const data = await resETF2L.json();
        const data = await resETF2L;
        const etf2lLink = document.createElement("a");
        etf2lLink.innerHTML = data.player.name;
        etf2lLink.href = `https://etf2l.org/search/${steamID}/`;
        etf2lLink.target = "_blank";
        etf2lLink.style.backgroundColor = "rgb(144, 238, 144)";
        etf2lLink.style.padding = "6px";
        leagueElement.appendChild(etf2lLink);
    }
}

const updateETF2LNameOnPage = async (steamID, playerInfo, leagueElement) => {
    // Get rid of 'Loading...' message
    if (!getShowRGLTeamFlag()) leagueElement.innerHTML = "";

    if (!playerInfo.etf2l.name) return;

    const etf2lLink = document.createElement("a");
    etf2lLink.innerHTML = playerInfo.etf2l.name;
    etf2lLink.href = `https://etf2l.org/search/${steamID}/`;
    etf2lLink.target = "_blank";
    etf2lLink.style.backgroundColor = "rgb(144, 238, 144)";
    etf2lLink.style.padding = "6px";
	if (getShowRGLTeamFlag()) etf2lLink.style.marginLeft = "6px";
    leagueElement.appendChild(etf2lLink);

    const banInfo = playerInfo.etf2l.banInfo;
    //console.log(`baninfo: ${banInfo}`);
    if (banInfo == null) return;
    const banEndDate = banInfo.end;
    const banWarning = (banEndDate > (Date.now() / 1000));

    if (!banWarning) return;

    const banWarningSpan = document.createElement("span");
    banWarningSpan.innerHTML = " (BANNED)";
    etf2lLink.style.backgroundColor = "rgb(137, 0, 0)";
	//rglLink.style.textColor = "rgb(255, 255, 255)"

    etf2lLink.appendChild(banWarningSpan);

	etf2lLink.style.color = "rgb(255, 255, 255)"

    etf2lLink.classList.add("tip")
    etf2lLink.setAttribute("data-original-title", `Banned until ${new Date(banEndDate * 1000).toLocaleDateString()} for: ${banInfo.reason.replace(/\s/g, ' ')}`)
}

const updateETF2LTeamOnPage = async (gamemode, playerInfo, leagueElement) => {
	//console.log("ran update team")
	if (!playerInfo.etf2l.name) return;
    //console.log(`gamemode: ${gamemode}`)
	const teamName = (gamemode === "6s" ? playerInfo.etf2l.currentTeam6s : playerInfo.etf2l.currentTeamHL);
	const teamID = (gamemode === "6s" ? playerInfo.etf2l.currentTeamID6s : playerInfo.etf2l.currentTeamIDHL);
	if (!teamName) return;
    if (teamName.includes("Free Agent -")) return;


	const etf2lTeamLink = document.createElement("a");
	etf2lTeamLink.innerHTML = teamName;
	etf2lTeamLink.href = `https://etf2l.org/teams/${teamID}`;
	etf2lTeamLink.target = "_blank";
	etf2lTeamLink.style.backgroundColor = "rgb(38, 217, 38)";
	etf2lTeamLink.style.padding = "6px";
	etf2lTeamLink.style.marginLeft = "6px";

	leagueElement.appendChild(etf2lTeamLink);
	
	//console.log("finished team update")

	//if (!banWarning) return;
}

const updateETF2LDivisionOnPage = async (playedGamemode, playerInfo, leagueElement) => {
    let division;
    if (!playerInfo.etf2l.name) {
        return;
        //if (!(["6s", "HL"].includes(playedGamemode))) return;
        //if (!playerInfo.rgl.name) return;
        //division = "NA";
    } else {
        const getHighestDivison = await getHighestDivisionPlayedFlag();
        //console.log(playedGamemode);
        division = getHighestDivison ? (playedGamemode === "6s" ? playerInfo.etf2l.division6s : playedGamemode === "HL" ? playerInfo.etf2l.divisionHL : null) : (playedGamemode === "6s" ? playerInfo.etf2l.latestDivision6s : playedGamemode === "HL" ? playerInfo.etf2l.latestDivisionHL : 1);
        if (division == undefined) division = "None";
        //console.log(division);
        if (!ETF2LDivisionSpecs[division]) {
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

const updateRGLName = async (steamID, playerInfo, leagueElement, playedGamemode) => {
	//console.log("ran update name")
    if (!playerInfo.rgl.name) {
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
    rglLink.style.marginLeft = "6px";

    const banWarning = playerInfo.rgl.banInfo;
    //console.log(playerInfo)
    //console.log(steamID)

    rglLink.innerHTML = playerInfo.rgl.name;

    leagueElement.appendChild(rglLink);

    //console.log("ban warning " + banWarning);
    if (!banWarning) return;

    const banWarningSpan = document.createElement("span");
    banWarningSpan.innerHTML = " (BANNED)";
    rglLink.style.backgroundColor = "rgb(137, 0, 0)";
	//rglLink.style.textColor = "rgb(255, 255, 255)"

    rglLink.appendChild(banWarningSpan);

	rglLink.style.color = "rgb(255, 255, 255)"

    rglLink.classList.add("tip")
    //console.log(Date.parse(banWarning.endsAt))
    rglLink.setAttribute("data-original-title", `Banned until ${new Date(Date.parse(banWarning.endsAt)).toLocaleDateString()} for: ${banWarning.reason.replace(/\s/g, ' ')}`)
}

const updateRGLTeamOnPage = async (gamemode, playerInfo, leagueElement) => {
	//console.log("ran update team")
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
	rglTeamLink.style.marginLeft = "6px";

	leagueElement.appendChild(rglTeamLink);
	
	//console.log("finished team update")

	//if (!banWarning) return;
}

const updateRGLDivisionOnPage = async (playedGamemode, playerInfo, leagueElement) => {
    let division;
    if (!playerInfo.rgl.name) {
        if (!(["6s", "HL"].includes(playedGamemode))) return;
        if (playerInfo.etf2l.name) return;
        division = "NA";
    } else {
        const getHighestDivison = await getHighestDivisionPlayedFlag();
        //console.log(playedGamemode);
        division = getHighestDivison ? (playedGamemode === "6s" ? playerInfo.rgl.division6s : playedGamemode === "HL" ? playerInfo.rgl.divisionHL : null) : (playedGamemode === "6s" ? playerInfo.rgl.latestDivision6s : playedGamemode === "HL" ? playerInfo.rgl.latestDivisionHL : 1);
        //console.log(division);
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

    leagueElement.appendChild(rglDivisionElement);
}

const fetchPlayerInfo = async (steamID) => {
    const RGLProfile = await getRGLProfile(steamID);
    const ETF2LProfile = await getETF2LProfile(steamID);
    const RGLPastTeams = await getRGLPastTeams(steamID);
    //const ETF2LPastTeams = await getETF2LPastTeams(steamID);

    if ((RGLProfile + ETF2LProfile + RGLPastTeams/* + ETF2LPastTeams*/).includes("ratelimited")) return "ratelimited";

    const [
        RGLHighestDivisionString6s,
        RGLLatestDivisionString6s,
        RGLHighestDivisionStringHL,
        RGLLatestDivisionStringHL
	] = await getHighestRGLGamemodeTeam(RGLPastTeams);

    const localPlayerInfo = window.localStorage.getItem(steamID) ?? null;

    const localPlayerInfoJson = JSON.parse(localPlayerInfo);

	const [
		RGLCurrentTeamString6s,
		RGLCurrentTeamIDString6s,
		RGLCurrentTeamStringHL,
		RGLCurrentTeamIDStringHL
	] = await getCurrentRGLTeam(RGLPastTeams);

    const [
        ETF2LHighestDivisionString6s,
        ETF2LLatestDivisionString6s,
        ETF2LCurrentTeamString6s,
        ETF2LCurrentTeamIDString6s,
        ETF2LHighestDivisionStringHL,
        ETF2LLatestDivisionStringHL,
        ETF2LCurrentTeamStringHL,
        ETF2LCurrentTeamIDStringHL,
    ] = await getETF2LDivAndTeamInfo(ETF2LProfile/*, ETF2LPastTeams*/);

    //console.log([
    //    ETF2LHighestDivisionString6s,
    //    ETF2LLatestDivisionString6s,
    //    ETF2LCurrentTeamString6s,
    //    ETF2LCurrentTeamIDString6s,
    //    ETF2LHighestDivisionStringHL,
    //    ETF2LLatestDivisionStringHL,
    //    ETF2LCurrentTeamStringHL,
    //    ETF2LCurrentTeamIDStringHL,
    //]);

	//console.log(await getCurrentRGLTeam(pastTeams));
	
	//console.log(currentTeamString6s);

    //const curTime = Math.floor(Date.now() / 1000);
    //console.log(RGLProfile)
    //console.log(RGLProfile ? RGLProfile.status.isBanned : 'no rgl')
    //console.log(RGLProfile ? (RGLProfile.status.isBanned ? RGLProfile.banInformation : "no ban info") : '')
    const playerInfoToInsert = {
        rgl: {
            name: RGLProfile ? RGLProfile.name : localPlayerInfoJson ? localPlayerInfoJson.rgl.name : null,
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
            latestDivision6s: RGLLatestDivisionString6s,
            latestDivisionHL: RGLLatestDivisionStringHL,
			currentTeam6s: RGLCurrentTeamString6s,
			currentTeamHL: RGLCurrentTeamStringHL,
			currentTeamID6s: RGLCurrentTeamIDString6s,
			currentTeamIDHL: RGLCurrentTeamIDStringHL,
        },
        etf2l: {
            name: ETF2LProfile ? ETF2LProfile.player.name : localPlayerInfoJson ? localPlayerInfoJson.etf2l.name : null,
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
            latestDivision6s: ETF2LLatestDivisionString6s,
            latestDivisionHL: ETF2LLatestDivisionStringHL,
			currentTeam6s: ETF2LCurrentTeamString6s,
			currentTeamHL: ETF2LCurrentTeamStringHL,
			currentTeamID6s: ETF2LCurrentTeamIDString6s,
			currentTeamIDHL: ETF2LCurrentTeamIDStringHL,
        },
    };
    //console.log(playerInfoToInsert.rgl.banInfo)
	//console.log("highestDivisionString6s")
	//console.log(playerInfoToInsert)
    return playerInfoToInsert;
}

const updatePlayerRows = async (playerRows, rglNameHeader) => {
    const listOfSteamIDsInStorageThatMightNeedUpdating = [];
    const arrayOfPlayerRows = [...playerRows];
    const listOfSteamIDs = arrayOfPlayerRows.map((playerRow) => playerRow.id.split("_")[1]);

	const numPlayers = listOfSteamIDs.length;
	const gamemode = numPlayers < 16 && numPlayers >= 10 ? "6s" : numPlayers >= 16 && numPlayers < 22 ? "HL" : null;
    //console.log(gamemode)
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
		//if (await getShowRGLTeamFlag()) rglNameHeader.innerHTML = `<span style="background-color:rgb(252, 180, 46);">RGL Team</span> + `.concat(rglNameHeader.innerHTML);
	}
	else
	{
		rglNameHeader.innerHTML =  `${showETF2L ? '<span style="background-color:rgb(144, 238, 144);">ETF2L</span>' : ''}
                                    ${showETF2L && showRGL ? '/' : ''}
                                    ${showRGL ? '<span style="background-color:rgb(255, 203, 108);">RGL</span>' : ''}`;
	}

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
        }
		else
		{
            const playerInfoToInsert = await fetchPlayerInfo(steamID);
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
        }

        // true/false
        //const showETF2L = await getShowETF2LNameFlag();
        //const showRGL = await getShowRGLNameFlag();
        //const showRGLTeam = await getShowRGLTeamFlag();
        //const showRGLDivision = await getShowRGLDivisionFlag();

        showETF2LTeam && (gamemode === "6s" || gamemode === "HL") && updateETF2LTeamOnPage(gamemode, playerInfo, leagueElement);
        showRGLTeam && (gamemode === "6s" || gamemode === "HL") && updateRGLTeamOnPage(gamemode, playerInfo, leagueElement);
        showETF2L && updateETF2LNameOnPage(steamID, playerInfo, leagueElement);
        showRGL && updateRGLName(steamID, playerInfo, leagueElement, gamemode);
        showETF2LDivision && updateETF2LDivisionOnPage(gamemode, playerInfo, leagueElement);
        showRGLDivision && updateRGLDivisionOnPage(gamemode, playerInfo, leagueElement);
    };
    // Profiles have local versions that might need updating
    for (let i = 0; i < listOfSteamIDsInStorageThatMightNeedUpdating.length; i++) {
        const steamID = listOfSteamIDsInStorageThatMightNeedUpdating[i];
        const playerInfoToInsert = await fetchPlayerInfo(steamID);
        if (playerInfoToInsert === "ratelimited") continue;
        //console.log("playerinfo")
        //console.log(playerInfoToInsert)
        window.localStorage.setItem(steamID, JSON.stringify(playerInfoToInsert));
        //console.log(JSON.parse(window.localStorage.getItem(steamID)))
        //console.log(steamID)
    };
}

const steamID64Base = "76561197960265728";
const steamID64BasePrefix = "7656"
const steamID64BaseShortened = 1197960265728;

const processLogInfo = async (logID) => {
    const logInfo = await getLogInfo(logID);
    //console.log(logInfo);
    if (logInfo === "ratelimited") return "ratelimited";
    //console.log(steamID3);
    delete logInfo.version;
    logInfo.rounds = Object.keys(logInfo.rounds).length;
    delete logInfo.classkills;
    delete logInfo.classdeaths;
    delete logInfo.classkillassists;
    delete logInfo.chat;
    delete logInfo.killstreaks;
    delete logInfo.success
    delete logInfo.info;
    //console.log(logInfo);
    return logInfo;
}

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
        scoreColumn.setAttribute("data-original-title", "Win - Loss - Stalemate")
        logTableHeader.insertBefore(scoreColumn, logTableHeader.children[0]);
    }

    for (let i = 0; i < numLogs; i++) {
        const curLog = logsListed[i];

        if (showClassesPlayed) {
            const classIconsList = document.createElement("td");
            classIconsList.style.width = "auto";
            classIconsList.style.minWidth = "50px";
            //classIconsList.style.maxWidth = "75px";
            classIconsList.style.backgroundColor = "#ffffff00";
            classIconsList.style.fontWeight = "bold";
            classIconsList.classList.add("center", "classlist");
            classIconsList.innerText = "-";
        
            curLog.insertBefore(classIconsList, curLog.children[2]);
        }

        if (showMatchScores) {
            const scorePreview = document.createElement("td");
            //scorePreview.style.width = "75px";
            scorePreview.style.backgroundColor = "#ffffff00";
            scorePreview.style.fontWeight = "bold";
            scorePreview.classList.add("center", "scorecontainer");
            //scorePreview.style.width = "auto !important"
            //scorePreview.style.border = "0px !important"
            //scorePreview.style.padding = "0px !important"
            //scorePreview.style.height = "auto !important"
            //scorePreview.style = "background-color:#ffffff00;font-weight:bold"
            scorePreview.innerText = "-";

            curLog.insertBefore(scorePreview, curLog.children[0]);
        }
    }

    for (let i = 0; i < numLogs; i++) {
        const curLog = logsListed[i];
        const curLogLink = curLog.getElementsByTagName("a")[0].href;
        const curLogID = curLogLink.substring(curLogLink.lastIndexOf("/") + 1, curLogLink.indexOf("#"));
        //console.log(curLogID);

        
        const logInfoStorage = window.sessionStorage.getItem(curLogID);
        let logInfo;
        if (logInfoStorage) {
            console.log("using saved info")
			logInfo = JSON.parse(logInfoStorage);
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
    
        const steamID64 = steamID;
        const steamID64Shortened = steamID64.substring(steamID64.length - 13)
        //console.log(`steamid64shortened: ${steamID64Shortened}`)
        const steamID3 = `[U:1:${steamID64Shortened - steamID64BaseShortened}]`;
        //console.log(`steamid3: ${steamID3}`)
    
        const playerInfo = logInfo.players[steamID3];
        //console.log(playerInfo);
        const playerClassesPlayed = playerInfo.class_stats;
        //console.log(playerClassesPlayed)

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
                //onsole.log(classPlayed.weapon);
                //onsole.log(Object.keys(classPlayed.weapon).length);

                let weaponsUsed = [];
                const weaponsUsedKeys = Object.keys(classPlayed.weapon);
                //console.log(weaponsUsedKeys);
                let hasPistol = false;
                let hasScoutPistol = false;
                let firstPistolIndex = -1
                for (k = 0; k < weaponsUsedKeys.length; k++) {
                    if (weaponsUsedKeys[k] == "pistol") {
                        //console.log("pistol!")
                        hasPistol = true
                        if (hasScoutPistol) {
                            //console.log("merging!")
                            weaponsUsed[firstPistolIndex][1].kills += classPlayed.weapon[weaponsUsedKeys[k]].kills;
                            weaponsUsed[firstPistolIndex][1].dmg += classPlayed.weapon[weaponsUsedKeys[k]].dmg;
                            weaponsUsed[firstPistolIndex][1].avg_dmg += classPlayed.weapon[weaponsUsedKeys[k]].avg_dmg;
                            weaponsUsed[firstPistolIndex][1].shots += classPlayed.weapon[weaponsUsedKeys[k]].shots;
                            weaponsUsed[firstPistolIndex][1].hits += classPlayed.weapon[weaponsUsedKeys[k]].hits;
                            continue;
                        } else {
                            firstPistolIndex = k;
                        }
                    };
                    if (weaponsUsedKeys[k] == "pistol_scout") {
                        //console.log("scout pistol!")
                        hasScoutPistol = true
                        if (hasPistol) {
                            //console.log("merging!")
                            weaponsUsed[firstPistolIndex][1].kills += classPlayed.weapon[weaponsUsedKeys[k]].kills;
                            weaponsUsed[firstPistolIndex][1].dmg += classPlayed.weapon[weaponsUsedKeys[k]].dmg;
                            weaponsUsed[firstPistolIndex][1].avg_dmg += classPlayed.weapon[weaponsUsedKeys[k]].avg_dmg;
                            weaponsUsed[firstPistolIndex][1].shots += classPlayed.weapon[weaponsUsedKeys[k]].shots;
                            weaponsUsed[firstPistolIndex][1].hits += classPlayed.weapon[weaponsUsedKeys[k]].hits;
                            continue;
                        } else {
                            firstPistolIndex = k;
                        }
                    };
                    weaponsUsed.push([weaponsUsedKeys[k], classPlayed.weapon[weaponsUsedKeys[k]]]);
                    //console.log(classPlayed.weapon[weaponsUsedKeys[k]]);
                }
                //console.log(weaponsUsed);
                weaponsUsed = weaponsUsed.sort((a, b) => {
                    //console.log(a[1].kills);
                    //console.log(b[1].kills);
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
                //console.log(weaponsUsed);
                const weaponKeys = Object.keys(weaponsUsed)
                if (weaponKeys.length > 0) {
                    let stringToInsert = ""
                    for (k = 0; k < weaponKeys.length; k++) {
                        const curWeapon = weaponsUsed[k][1]
                        //console.log(curWeapon);
                        if (curWeapon.kills == 0 && curWeapon.dmg == 0 && curWeapon.shots == 0) continue;
                        stringToInsert = `${stringToInsert}<tr><td>${WeaponLookupTable[weaponsUsed[k][0]]}</td><td>${curWeapon.kills}${weaponsUsed.length == 1 ? "" : classPlayed.kills > 0 ? " (" + ((curWeapon.kills / classPlayed.kills) * 100).toFixed(0) + "%)" : ""}</td><td>${weaponsUsed[k][0] == "world" ? "-" : curWeapon.dmg}${weaponsUsed.length == 1 || weaponsUsed[k][0] == "world" ? "" : classPlayed.dmg > 0 ? " (" + ((curWeapon.dmg / classPlayed.dmg) * 100).toFixed(0) + "%)" : ""}<td>${curWeapon.shots > 0 ? (((curWeapon.hits / curWeapon.shots) * 100).toFixed(0)) + "%" : "-"}</td></td></tr>`;
                    }
                    //console.log(stringToInsert);
                    dataString = `${dataString}<hr><table class='log table'><thead><tr><th>Weapon</th><th>K</th><th>DA</th><th>Acc</th></tr></thead><tbody>${stringToInsert}</tbody></table>`;
                }

                if (classPlayedName === "medic" && playerInfo.heal > 0) {
                    const stringToInsert = `<tr><td style="text-align: center">${playerInfo.heal}<br>(${(playerInfo.heal / (gameDuration / 60)).toFixed(0)}/m)</td><td>${playerInfo.ubertypes.hasOwnProperty("medigun") ? playerInfo.ubertypes.medigun : 0}</td><td>${playerInfo.ubertypes.hasOwnProperty("kritzkrieg") ? playerInfo.ubertypes.kritzkrieg : 0}</td><td>${playerInfo.drops}</td><td>${playerInfo.medicstats.avg_time_to_build != undefined ? parseFloat(playerInfo.medicstats.avg_time_to_build).toFixed(1) + "s" : "-"}</td><td>${playerInfo.medicstats.avg_time_before_using != undefined ? parseFloat(playerInfo.medicstats.avg_time_before_using).toFixed(1) + "s" : "-"}</td><td>${playerInfo.medicstats.avg_uber_length != undefined ? parseFloat(playerInfo.medicstats.avg_uber_length).toFixed(1) + "s" : "-"}</td></tr>`;
                    //console.log(stringToInsert);
                    dataString = `${dataString}<hr><table class='log table'><thead><tr><th>Heals</th><th style="text-align: center">Ü</th><th style="text-align: center">Kr</th><th>Drops</th><th style="text-align: center">Time to<br>Build</th><th style="text-align: center">Time to<br>Use</th><th style="text-align: center">Uber<br>Time</th></tr></thead><tbody>${stringToInsert}</tbody></table>`;
                }

                const opacity = ((classPlayed.total_time / gameDuration) + 0.4).toFixed(1);
                classIcon.classList.add("classicon", classPlayedName);
                classIcon.setAttribute("data-order", formatting.order);
                classIcon.setAttribute("style", `opacity: ${opacity}`);
                classIcon.setAttribute("data-title", formatting.title);
                classIcon.setAttribute("data-content", dataString);
                classIcon.onmouseenter = function(){showIconPopover(logInfo, classIcon, formatting.title)};
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
            //scoreElement.style.minWidth = "35px";
            //scoreElement.style.display = "inline";
            scoreElement.style.textAlign = "center";
            scoreElement.innerHTML = `${roundsWon} - ${roundsLost} - ${roundsTied}`;
            scoreElement.style.padding = "6px";
            scoreElement.style.marginLeft = "0px";
            scoreElement.style.marginRight = "0px";
            scoreElement.style.width = "auto !important"

            scorePreview.replaceWith(scoreElement);
        }
    }
}

const showIconPopover = (logInfo, classIcon, title) => {
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

    //console.log(window.devicePixelRatio);
    //console.log(classPopover.offsetWidth);
    //console.log(classPopover.offsetHeight);
    const zoom = window.devicePixelRatio;
    //console.log(zoom);
    //console.log((classPopover.offsetWidth * 0.5) + (30 * zoom))
    //console.log(classIconPos.top);
    //console.log(classIconPos.left);
    //console.log(document.offsetWidth);
    //console.log(document.getElementsByClassName("container main")[0].offsetWidth - document.getElementsByTagName("body")[0].offsetWidth);
    //console.log(document.getElementsByClassName("container main")[0].offsetHeight - document.getElementsByTagName("body")[0].offsetHeight);
    const extraOffsetWidth = Math.max(0, -0.495 * (document.getElementsByClassName("container main")[0].offsetWidth - document.getElementsByTagName("body")[0].offsetWidth));
    //const extraOffsetHeight = Math.max(0, -0.9 * (document.getElementsByClassName("container main")[0].offsetHeight - document.getElementsByTagName("body")[0].offsetHeight));
    classPopover.style.top = `${((classIconPos.top + window.scrollY)) - classPopover.offsetHeight - 75}px`;
    classPopover.style.left = `${((classIconPos.left + window.scrollX) - extraOffsetWidth) - (classPopover.offsetWidth * 0.5) + (8 * zoom)}px`;
    //console.log(classPopover.style.top);
    //console.log(classPopover.style.left);
    classPopover.position = "absolute"
    
    console.log("popover shown");
}

const deleteIconPopover = () => {
    //console.log(document.getElementsByClassName("popover top in"));
    document.getElementsByClassName("popover top in")[0].remove();
}


const pageURL = document.URL
console.log(pageURL);
//window.localStorage.clear();
if (pageURL.includes("logs.tf/") && !(pageURL.includes("json")) && !(pageURL.includes("tf/?p=")) && !(pageURL.includes("uploads"))) {
    if (pageURL.includes("profile")) {
        //console.log(pageURL);
        console.log("Parsing player profile stats and info!")

        const steamID = pageURL.substring(pageURL.indexOf("profile") + 8, pageURL.lastIndexOf("?") != -1 ? pageURL.lastIndexOf("?") : pageURL.length);
        //console.log(steamID);

        const mainElement = document.getElementsByClassName("container main")[0];
        const tableElement = document.getElementsByClassName("clear")[0];
        mainElement.style = "width: fit-content !important; min-width: 980px !important";
        //mainElement.style.minWidth = "980px !important";
        //mainElement.style.width = "auto !important"

        updateLogRows(steamID);
    } else if (pageURL.length > 16) {
        //console.log(pageURL);
        console.log("Parsing single log stats and info!")

        if (!isFirefox) {
            const mainElement = document.getElementsByClassName("container main")[0];
            mainElement.style = "minWidth: 1400px !important; width: fit-content !important";

            const tableBody = document.getElementById("players");

            const playerTableHead = tableBody.children[0].firstElementChild;
            const playerTableBody = tableBody.children[1];

            const rglNameHeader = document.createElement("th");

            playerTableHead.insertBefore(rglNameHeader, playerTableHead.firstChild);

            const playerRows = playerTableBody.children;

            for (let i = 0; i < playerRows.length; i++) {
                const leagueData = document.createElement("td");
                // rglName.innerHTML = "Loading...";
                leagueData.innerHTML = "";
                playerRows[i].insertBefore(leagueData, playerRows[i].firstChild);
            }

            updatePlayerRows(playerRows, rglNameHeader);
        }
    } else {
        console.log("Nothing to do on this page")
    }
} else {
    console.log("Not a logs.tf page, somehow")
}

window.onload = async function() {
    //console.log("onload")
    const pageURL = document.URL
    if (pageURL.includes("logs.tf/") && !(pageURL.includes("json")) && !(pageURL.includes("tf/?p=")) && !(pageURL.includes("uploads"))) {
        console.log("valid page")
        if (pageURL.includes("profile")) {

        } else if (pageURL.length > 17) {
            console.log("onload singlelog")

            if (isFirefox) {
                const mainElement = document.getElementsByClassName("container main")[0];
                mainElement.style = "minWidth: 1400px !important; width: fit-content !important";

                const tableBody = document.getElementById("players");

                const playerTableHead = tableBody.children[0].firstElementChild;
                const playerTableBody = tableBody.children[1];

                const rglNameHeader = document.createElement("th");

                playerTableHead.insertBefore(rglNameHeader, playerTableHead.firstChild);

                const playerRows = playerTableBody.children;

                for (let i = 0; i < playerRows.length; i++) {
                    const leagueData = document.createElement("td");
                    // rglName.innerHTML = "Loading...";
                    leagueData.innerHTML = "";
                    playerRows[i].insertBefore(leagueData, playerRows[i].firstChild);
                }

                updatePlayerRows(playerRows, rglNameHeader);
            }

            //damage % and damage efficiency
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
            //console.log("show damage efficiency")
            //console.log(showDamageEfficiency);

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

            //let DAtotal = parseInt(DARed) + parseInt(DABlu);

            Array.from(rows)
                .forEach(processRow, [DARed, DABlu, teamOrTotalDamage, showDamageEfficiency, showDamagePercent]);

            //heals received per minute
            const logtime = document.getElementById("log-length");
            
            const heal_panels = document.getElementsByClassName("healspread")[0];
            const heal_healtables = heal_panels.getElementsByClassName("healtable");

            const showPlayerHPM = await getShowPlayerHPMFlag();

            if (showPlayerHPM) {
                //console.log("yes")
                //console.log(heal_healtables.length)
                const heal_headerblu = heal_healtables[0].getElementsByClassName("healsort")[0].getElementsByTagName("thead")[0].getElementsByTagName("tr")[0];
                const heal_headerred = heal_healtables[1].getElementsByClassName("healsort")[0].getElementsByTagName("thead")[0].getElementsByTagName("tr")[0];
                const heal_headerbluheals = heal_headerblu.getElementsByTagName("th")[2];
                const heal_headerredheals = heal_headerred.getElementsByTagName("th")[2];

                //let heal_medstats = table.getElementsByClassName("medstats")
                //let heal_medstats

                const HealsBlu = heal_healtables[0].getElementsByClassName("healsort")[0].getElementsByTagName("tbody")[0].getElementsByTagName("tr");
                //console.log(HealsBlu.length)
                //console.log("yes")
                //console.log(HealsBlu[1].getElementsByTagName("td")[2].innerText)
                const HealsRed = heal_healtables[1].getElementsByClassName("healsort")[0].getElementsByTagName("tbody")[0].getElementsByTagName("tr");
                //console.log(HealsRed.length)

                const HPMHeaderBlu = heal_headerbluheals.cloneNode(true);
                HPMHeaderBlu.getElementsByClassName("tablesorter-header-inner")[0].innerText = "HPM";
                HPMHeaderBlu.getElementsByClassName("tablesorter-header-inner")[0].classList.add("tip");
                HPMHeaderBlu.getElementsByClassName("tablesorter-header-inner")[0].setAttribute("data-original-title", "Heals Per Minute");
                heal_headerblu.insertBefore(HPMHeaderBlu, heal_headerblu.getElementsByTagName("th")[3]);

                const HPMHeaderRed = heal_headerredheals.cloneNode(true);
                HPMHeaderRed.getElementsByClassName("tablesorter-header-inner")[0].innerText = "HPM";
                HPMHeaderRed.getElementsByClassName("tablesorter-header-inner")[0].classList.add("tip");
                HPMHeaderRed.getElementsByClassName("tablesorter-header-inner")[0].setAttribute("data-original-title", "Heals Per Minute");
                heal_headerred.insertBefore(HPMHeaderRed, heal_headerred.getElementsByTagName("th")[3]);

                //let HealsBluTotal = parseInt(HealsBlu);
                //console.log("healsblutotal")
                //console.log(HealsBluTotal)
                //let HealsRedTotal = parseInt(HealsRed);

                for (i = 0; i < HealsBlu.length; i++) {
                    let HPMBlu = HealsBlu[i].getElementsByTagName("td")[2].cloneNode(true);
                    //console.log(i)
                    HPMBlu.innerText = (parseFloat(HealsBlu[i].getElementsByTagName("td")[2].innerText) / parseFloat(logtime.innerText)).toFixed(0)
                    //console.log(HPMBlu.innerText)
                    HealsBlu[i].insertBefore(HPMBlu, HealsBlu[i].getElementsByTagName("td")[3])
                }

                for (i = 0; i < HealsRed.length; i++) {
                    let HPMRed = HealsRed[i].getElementsByTagName("td")[2].cloneNode(true);
                    //console.log(i)
                    HPMRed.innerText = (parseFloat(HealsRed[i].getElementsByTagName("td")[2].innerText) / parseFloat(logtime.innerText)).toFixed(0)
                    //console.log(HPMRed.innerText)
                    HealsRed[i].insertBefore(HPMRed, HealsRed[i].getElementsByTagName("td")[3])
                }

                //console.log("width");
                //console.log(heal_healtables[0].style);
                heal_healtables[0].style.width = "350px";
                heal_healtables[1].style.width = "350px";
            }

            const showMedicHPMA = await getShowMedicHPMAFlag();
            if (showMedicHPMA) {
                //console.log(pageURL.lastIndexOf("#"))
                const curLogID = pageURL.substring(pageURL.lastIndexOf("/") + 1, pageURL.lastIndexOf("#") != -1 ? pageURL.lastIndexOf("#") : pageURL.length);
                //console.log("logid");
                //console.log(curLogID);
                const logInfoStorage = window.sessionStorage.getItem(curLogID);
                let logInfo;
                if (logInfoStorage) {
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

                let bluSteamID3;
                let redSteamID3;
                let bluMedicTimePlayed;
                let redMedicTimePlayed;
                let bluMedicDeaths;
                let redMedicDeaths;
                const bluUsername = this.document.getElementsByClassName("healspread")[0].getElementsByClassName("blu")[0].innerText;
                const redUsername = this.document.getElementsByClassName("healspread")[0].getElementsByClassName("red")[0].innerText;

                const listOfSteamIDs = Object.keys(logInfo.names);
                const listOfNames = logInfo.names;
                for (i = 0; i < listOfSteamIDs.length; i++) {
                    if (listOfNames[listOfSteamIDs[i]] === bluUsername) {
                        bluSteamID3 = listOfSteamIDs[i]
                        const bluMedicClassesPlayed = logInfo.players[bluSteamID3].class_stats;
                        for (j = 0; j < bluMedicClassesPlayed.length; j++) {
                            if (bluMedicClassesPlayed[j].type === "medic") {
                                bluMedicTimePlayed = bluMedicClassesPlayed[j].total_time
                                bluMedicDeaths = bluMedicClassesPlayed[j].deaths
                            };
                        }
                    } else if (listOfNames[listOfSteamIDs[i]] === redUsername) {
                        redSteamID3 = listOfSteamIDs[i]
                        const redMedicClassesPlayed = logInfo.players[redSteamID3].class_stats;
                        for (j = 0; j < redMedicClassesPlayed.length; j++) {
                            if (redMedicClassesPlayed[j].type === "medic") {
                                redMedicTimePlayed = redMedicClassesPlayed[j].total_time
                                redMedicDeaths = redMedicClassesPlayed[j].deaths
                            };
                        }
                    };
                }
            
                //const playerInfo = logInfo.players[steamID3];
                
                const heal_medvalblu = heal_healtables[0].getElementsByClassName("medval")[0];
                const heal_medvalred = heal_healtables[1].getElementsByClassName("medval")[0];

                const heal_bluheals = heal_medvalblu.innerHTML.substring(heal_medvalblu.innerHTML.indexOf("strong") + 7, heal_medvalblu.innerHTML.lastIndexOf("strong") - 2);
                //console.log(heal_bluheals);
                const heal_blutimealive = bluMedicTimePlayed - (14 * bluMedicDeaths);
                const heal_bluhealsperminutealive = heal_bluheals / (heal_blutimealive / 60);
                //console.log(heal_bluhealsperminutealive);

                //const bluHPMAElement = this.document.createElement("td");
                //bluHPMAElement.classList.add("tip");
                //bluHPMAElement.innerHTML = `(${heal_bluhealsperminutealive.toFixed(0)}/m alive)`;
                ////bluHPMAElement.setAttribute("style", )
                //bluHPMAElement.style.textAlign = "right !important";
                //bluHPMAElement.style.width = "auto !important";
                //bluHPMAElement.style.borderWidth = "0.8";
                //bluHPMAElement.style.padding = "0px !important";
                //bluHPMAElement.setAttribute("data-original-title", "Heals Per Minute Alive<br>(Estimates 14s Respawn Time per Death)");

                //heal_medvalblu.appendChild(bluHPMAElement)

                heal_medvalblu.innerHTML += `<br><span class="tip" data-original-title="Heals Per Minute Alive (Estimates 14s respawn time per death)">(${heal_bluhealsperminutealive.toFixed(0)}/m alive)</span>`

                const heal_redheals = heal_medvalred.innerHTML.substring(heal_medvalred.innerHTML.indexOf("strong") + 7, heal_medvalred.innerHTML.lastIndexOf("strong") - 2);
                //console.log(heal_redheals);
                const heal_redtimealive = redMedicTimePlayed - (14 * redMedicDeaths);
                const heal_redhealsperminutealive = heal_redheals / (heal_redtimealive / 60);
                //console.log(heal_redhealsperminutealive);

                heal_medvalred.innerHTML += `<br><span class="tip" data-original-title="Heals Per Minute Alive (Estimates 14s respawn time per death)">(${heal_redhealsperminutealive.toFixed(0)}/m alive)</span>`
            }
        }
    }
}

async function processRow(el, index, array) {
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

	//console.log("start enhancer logging");
    //console.log(team);
    //console.log(DARed);
    //console.log(DABlu);
    //console.log(teamOrTotalDamage);
    //console.log(DA.innerText);
    //console.log(DAM.innerText);
    //console.log(DT.innerText);
    //console.log(DTM.innerText);
	//console.log("end enhancer logging");

    if (showDamageEfficiency) {
        let DE = DT.cloneNode(true);
        //DE.setAttribute("data-original-title", "Damage Efficiency");
        DE.innerText = (parseFloat(DA.innerText) / parseFloat(DT.innerText))
            .toFixed(2);
        el.insertBefore(DE, DTM);
    }

    if (showDamagePercent) {
        let DAPercent = DT.cloneNode(true);
        let DATotal = teamOrTotalDamage ? parseFloat(DARed) + parseFloat(DABlu) : team === "RED" ? DARed : DABlu;
        //console.log(DATotal);
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
    console.log(document.styleSheets[0]);

	let rule = null;
	let rules = [];
	styleSheets.forEach(function(thisSheet){
	  let findTheRule = thisSheet.filter(function(rule) {
	    if(rule.selectorText){
            console.log(rule.selectorText);
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