const isFirefox = typeof browser !== "undefined";
const currentBrowser = isFirefox ? browser : chrome;
const disabledColorDarkmode = "#bbbbbb"
const disabledColorLightmode = "#444444"

async function setETF2LValue(newValue) {
    await currentBrowser.storage.local.set({
        showETF2L: newValue
    });

    const dropdownDiv = document.getElementsByClassName("etf2l-dropdown-div")[0];

    dropdownDiv.style.maxHeight = newValue ? `${dropdownDiv.scrollHeight}px` : "0px";
}

async function setETF2LNameValue(newValue) {
    await currentBrowser.storage.local.set({
        showETF2LName: newValue
    });
}

async function setETF2LTeamValue(newValue) {
    await currentBrowser.storage.local.set({
        showETF2LTeam: newValue
    });
}

async function setETF2LDivisionValue(newValue) {
    await currentBrowser.storage.local.set({
        showETF2LDivision: newValue
    });
}

async function setRGLValue(newValue) {
    await currentBrowser.storage.local.set({
        showRGL: newValue
    });
}

async function setRGLNameValue(newValue) {
    await currentBrowser.storage.local.set({
        showRGLName: newValue
    });
}

async function setRGLTeamValue(newValue) {
    await currentBrowser.storage.local.set({
        showRGLTeam: newValue
    });
}

async function setRGLDivisionValue(newValue) {
    await currentBrowser.storage.local.set({
        showRGLDivision: newValue
    });
}

async function setGetHighestDivision(newValue, grid) {
    await currentBrowser.storage.local.set({
        getHighestDivisionPlayed: newValue
    });

    const themeVal = await currentBrowser.storage.local.get("theme");
    console.log(themeVal);
    const disabledColor = themeVal.theme ? disabledColorDarkmode : disabledColorLightmode;
    const enabledColor = themeVal.theme ? "white" : "black";

    const getHighestDivisionPlayedLeftVal = grid.children[0];
    const getHighestDivisionPlayedRightVal = grid.children[2];
    getHighestDivisionPlayedLeftVal.style.color = newValue ? disabledColor : enabledColor;
    getHighestDivisionPlayedRightVal.style.color = newValue ? enabledColor : disabledColor;
}

async function setDamagePercentTotalOrTeam(newValue, grid) {
    await currentBrowser.storage.local.set({
        damagePercentTotalOrTeam: newValue
    });

    const themeVal = await currentBrowser.storage.local.get("theme");
    const disabledColor = themeVal.theme ? disabledColorDarkmode : disabledColorLightmode;
    const enabledColor = themeVal.theme ? "white" : "black";

    const damagePercentTotalOrTeamLeftVal = grid.children[0];
    const damagePercentTotalOrTeamRightVal = grid.children[2];
    damagePercentTotalOrTeamLeftVal.style.color = newValue ? disabledColor : enabledColor;
    damagePercentTotalOrTeamRightVal.style.color = newValue ? enabledColor : disabledColor;
}

async function setTheme(newValue, document) {
    await currentBrowser.storage.local.set({
        theme: newValue
    });

    const body = document.getElementsByTagName("body")[0];
    const bodyCSS = getCSSRule("body");

    const themeGrid = document.getElementById("theme-grid");

    const slider = themeGrid.children[1];
    const sliderCSS = getCSSRule(".slider");
    const sliderSquareCSS = getCSSRule(".slider:before");

    const dropdownCSS = getCSSRule(".dropdown");
    
    const dropdownTextCSS = getCSSRule(".dropdown-text");

    const disabledColor = newValue ? disabledColorDarkmode : disabledColorLightmode;
    const enabledColor = newValue ? "white" : "black";

    if (newValue) {
        bodyCSS.style.color = "white";
        bodyCSS.style.backgroundColor = "rgba(30, 30, 30, 255)";
        
        sliderCSS.style.backgroundColor = "rgba(204, 204, 204, 255)";
        sliderSquareCSS.style.backgroundColor = "rgba(0, 0, 0, 255)";

        dropdownCSS.style.backgroundColor = "black"

        dropdownTextCSS.style.color = "white"

        themeGrid.children[0].style.filter="invert(100%)"
        themeGrid.children[2].style.filter="invert(100%)"
    }
    else {
        bodyCSS.style.color = "black";
        bodyCSS.style.backgroundColor = "rgba(225, 225, 225, 255)";

        sliderCSS.style.backgroundColor = "rgba(51, 51, 51, 255)";
        sliderSquareCSS.style.backgroundColor = "rgba(255, 255, 255, 255)";

        dropdownCSS.style.backgroundColor = "white"

        dropdownTextCSS.style.color = "black"

        themeGrid.children[0].style.filter="invert(0%)"
        themeGrid.children[2].style.filter="invert(0%)"
    }
    console.log(sliderCSS.style.backgroundColor);

    const getHighestDivisionPlayedGrid = document.getElementById("division-toggle-grid");
    const divisionFlag = await currentBrowser.storage.local.get("getHighestDivisionPlayed");
    const getHighestDivisionPlayedLeftVal = getHighestDivisionPlayedGrid.children[0];
    const getHighestDivisionPlayedRightVal = getHighestDivisionPlayedGrid.children[2];

    getHighestDivisionPlayedLeftVal.style.color = divisionFlag.getHighestDivisionPlayed ? disabledColor : enabledColor;
    getHighestDivisionPlayedRightVal.style.color = divisionFlag.getHighestDivisionPlayed ? enabledColor : disabledColor;
    console.log(getHighestDivisionPlayedLeftVal.style.color);

    const damagePercentTotalOrTeamGrid = document.getElementById("da%-toggle-grid");
    const damagePercentFlag = await currentBrowser.storage.local.get("damagePercentTotalOrTeam");
    const damagePercentTotalOrTeamLeftVal = damagePercentTotalOrTeamGrid.children[0];
    const damagePercentTotalOrTeamRightVal = damagePercentTotalOrTeamGrid.children[2];

    damagePercentTotalOrTeamLeftVal.style.color = damagePercentFlag.damagePercentTotalOrTeam ? disabledColor : enabledColor;
    damagePercentTotalOrTeamRightVal.style.color = damagePercentFlag.damagePercentTotalOrTeam ? enabledColor : disabledColor;

    const dropdownText = document.getElementsByClassName("dropdown-text");
    //dropdownText[0].parentNode.style.backgroundColor = newValue ? "black" : "white";
    //dropdownText[1].parentNode.style.backgroundColor = newValue ? "black" : "white";
}

async function setLeagueDropdown(newValue, document) {
    await currentBrowser.storage.local.set({
        leagueDropdown: newValue
    });

    const dropdownText = document.getElementsByClassName("dropdown-text-league")[0];
    dropdownText.innerText = newValue ? "Collapse" : "Expand";

    const themeVal = await currentBrowser.storage.local.get("theme");
    //dropdownText.parentNode.style.backgroundColor = themeVal.theme ? "black" : "white";

    const dropdownDiv = document.getElementsByClassName("league-dropdown-div")[0];

    dropdownDiv.style.maxHeight = newValue ? `${dropdownDiv.scrollHeight}px` : "0px";
}

async function setStatsDropdown(newValue, document) {
    await currentBrowser.storage.local.set({
        statsDropdown: newValue
    });

    const dropdownText = document.getElementsByClassName("dropdown-text-stats")[0];
    dropdownText.innerText = newValue ? "Collapse" : "Expand";

    const themeVal = await currentBrowser.storage.local.get("theme");
    //dropdownText.parentNode.style.backgroundColor = themeVal.theme ? "black" : "white";

    const dropdownDiv = document.getElementsByClassName("stats-dropdown-div")[0];

    dropdownDiv.style.maxHeight = newValue ? `${dropdownDiv.scrollHeight}px` : "0px";
}

async function setProfileDropdown(newValue, document) {
    await currentBrowser.storage.local.set({
        profileDropdown: newValue
    });

    const dropdownText = document.getElementsByClassName("dropdown-text-profile")[0];
    dropdownText.innerText = newValue ? "Collapse" : "Expand";

    const themeVal = await currentBrowser.storage.local.get("theme");
    //dropdownText.parentNode.style.backgroundColor = themeVal.theme ? "black" : "white";

    const dropdownDiv = document.getElementsByClassName("profile-dropdown-div")[0];

    dropdownDiv.style.maxHeight = newValue ? `${dropdownDiv.scrollHeight}px` : "0px";
}

async function setShowDamagePercent(newValue) {
    await currentBrowser.storage.local.set({
        showDamagePercent: newValue
    });
}

async function setShowDamageEfficiency(newValue) {
    await currentBrowser.storage.local.set({
        showDamageEfficiency: newValue
    });
}

async function setShowPlayerHPM(newValue) {
    await currentBrowser.storage.local.set({
        showPlayerHPM: newValue
    });
}

async function setShowMedicHPMA(newValue) {
    await currentBrowser.storage.local.set({
        showMedicHPMA: newValue
    });
}

async function setShowMatchScores(newValue) {
    await currentBrowser.storage.local.set({
        showMatchScores: newValue
    });
}

async function setShowClassesPlayed(newValue) {
    await currentBrowser.storage.local.set({
        showClassesPlayed: newValue
    });
}

async function populateETF2LCheckbox(etf2lInput) {
    const showETF2L = await currentBrowser.storage.local.get("showETF2L");
    const value = showETF2L.showETF2L;
    etf2lInput.checked = value;
    setETF2LValue(value)
}

async function populateETF2LNameCheckbox(etf2lNameInput) {
    const showETF2LName = await currentBrowser.storage.local.get("showETF2LName");
    etf2lNameInput.checked = showETF2LName.showETF2LName;
}

async function populateETF2LTeamCheckbox(etf2lTeamInput) {
    const showETF2LTeam = await currentBrowser.storage.local.get("showETF2LTeam");
    etf2lTeamInput.checked = showETF2LTeam.showETF2LTeam;
}

async function populateETF2LDivisionCheckbox(etf2lDivisionInput) {
    const showETF2LDivision = await currentBrowser.storage.local.get("showETF2LDivision");
    etf2lDivisionInput.checked = showETF2LDivision.showETF2LDivision;
}

async function populateRGLCheckbox(rglInput) {
    const showRGL = await currentBrowser.storage.local.get("showRGL");
    rglInput.checked = showRGL.showRGL;
}

async function populateRGLNameCheckbox(rglNameInput) {
    const showRGLName = await currentBrowser.storage.local.get("showRGLName");
    rglNameInput.checked = showRGLName.showRGLName;
}

async function populateRGLTeamCheckbox(rglTeamInput) {
    const showRGLTeam = await currentBrowser.storage.local.get("showRGLTeam");
    rglTeamInput.checked = showRGLTeam.showRGLTeam;
}

async function populateRGLDivisionCheckbox(rglDivisionInput) {
    const showRGLDivision = await currentBrowser.storage.local.get("showRGLDivision");
    rglDivisionInput.checked = showRGLDivision.showRGLDivision;
}

async function populateHighestDivisionPlayedToggle(getHighestDivisonPlayedInput, grid) {
    const getHighestDivisionPlayed = await currentBrowser.storage.local.get("getHighestDivisionPlayed");
    const value = getHighestDivisionPlayed.getHighestDivisionPlayed
    getHighestDivisonPlayedInput.checked = value;

    const themeVal = await currentBrowser.storage.local.get("theme");
    const disabledColor = themeVal.theme ? disabledColorDarkmode : disabledColorLightmode;
    const enabledColor = themeVal.theme ? "white" : "black";

    const getHighestDivisionPlayedLeftVal = grid.children[0];
    const getHighestDivisionPlayedRightVal = grid.children[2];
    getHighestDivisionPlayedLeftVal.style.color = value ? disabledColor : enabledColor;
    getHighestDivisionPlayedRightVal.style.color = value ? enabledColor : disabledColor;
}

async function populateDamagePercentTotalOrTeamToggle(damagePercentTotalOrTeamInput, grid) {
    const damagePercentTotalOrTeam = await currentBrowser.storage.local.get("damagePercentTotalOrTeam");
    const value = damagePercentTotalOrTeam.damagePercentTotalOrTeam
    damagePercentTotalOrTeamInput.checked = value;

    const themeVal = await currentBrowser.storage.local.get("theme");
    const disabledColor = themeVal.theme ? disabledColorDarkmode : disabledColorLightmode;
    const enabledColor = themeVal.theme ? "white" : "black";

    const damagePercentTotalOrTeamLeftVal = grid.children[0];
    const damagePercentTotalOrTeamRightVal = grid.children[2];
    damagePercentTotalOrTeamLeftVal.style.color = value ? disabledColor : enabledColor;
    damagePercentTotalOrTeamRightVal.style.color = value ? enabledColor : disabledColor;
}

async function populateThemeToggle(themeInput, document) {
    const theme = await currentBrowser.storage.local.get("theme");
    const value = theme.theme
    themeInput.checked = value;

    setTheme(value, document)
}

async function populateLeagueDropdownToggle(leagueDropdownInput, document) {
    const leagueDropdown = await currentBrowser.storage.local.get("leagueDropdown");
    const value = leagueDropdown.leagueDropdown;
    leagueDropdownInput.checked = value;

    setLeagueDropdown(value, document);
}

async function populateStatsDropdownToggle(statsDropdownInput, document) {
    const statsDropdown = await currentBrowser.storage.local.get("statsDropdown");
    const value = statsDropdown.statsDropdown;
    statsDropdownInput.checked = value;

    setStatsDropdown(value, document);
}

async function populateProfileDropdownToggle(profileDropdownInput, document) {
    const profileDropdown = await currentBrowser.storage.local.get("profileDropdown");
    const value = profileDropdown.profileDropdown;
    profileDropdownInput.checked = value;

    setProfileDropdown(value, document);
}

async function populateShowDamagePercent(showDamagePercentInput) {
    const showDamagePercent = await currentBrowser.storage.local.get("showDamagePercent");
    const value = showDamagePercent.showDamagePercent;
    showDamagePercentInput.checked = value;
}

async function populateShowDamageEfficiency(showDamageEfficiencyInput) {
    const showDamageEfficiency = await currentBrowser.storage.local.get("showDamageEfficiency");
    const value = showDamageEfficiency.showDamageEfficiency;
    showDamageEfficiencyInput.checked = value;
}

async function populateShowPlayerHPM(showPlayerHPMInput) {
    const showPlayerHPM = await currentBrowser.storage.local.get("showPlayerHPM");
    const value = showPlayerHPM.showPlayerHPM;
    showPlayerHPMInput.checked = value;
}

async function populateShowMedicHPMA(showMedicHPMAInput) {
    const showMedicHPMA = await currentBrowser.storage.local.get("showMedicHPMA");
    const value = showMedicHPMA.showMedicHPMA;
    showMedicHPMAInput.checked = value;
}

async function populateShowMatchScores(showMatchScoresInput) {
    const showMatchScores = await currentBrowser.storage.local.get("showMatchScores");
    const value = showMatchScores.showMatchScores;
    showMatchScoresInput.checked = value;
}

async function populateShowClassesPlayed(showClassesPlayedInput) {
    const showClassesPlayed = await currentBrowser.storage.local.get("showClassesPlayed");
    const value = showClassesPlayed.showClassesPlayed;
    showClassesPlayedInput.checked = value;
}

/*window.onload = function() {
    console.log("onload" + Date())

    const leagueDropdownInput = document.getElementById("league-dropdown");
    const statsDropdownInput = document.getElementById("stats-dropdown");

    populateLeagueDropdownToggle(leagueDropdownInput, document);
    populateStatsDropdownToggle(statsDropdownInput, document);
}*/

document.addEventListener("DOMContentLoaded", async () => {
    //const etf2lInput = document.getElementById("etf2l-input");
    const etf2lNameInput = document.getElementById("etf2l-name-input");
    const etf2lTeamInput = document.getElementById("etf2l-team-input");
    const etf2lDivisionInput = document.getElementById("etf2l-division-input");
    //const rglInput = document.getElementById("rgl-input");
    const rglNameInput = document.getElementById("rgl-name-input");
    const rglTeamInput = document.getElementById("rgl-team-input");
    const rglDivisionInput = document.getElementById("rgl-division-input");
    const getHighestDivisionPlayedInput = document.getElementById("get-highest-division-toggle");
    const getHighestDivisionPlayedGrid = document.getElementById("division-toggle-grid");

    const damagePercentTotalOrTeamInput = document.getElementById("damage-percent-total-or-team");
    const damagePercentTotalOrTeamGrid = document.getElementById("da%-toggle-grid");
    const showDamagePercentInput = document.getElementById("show-damage-percent");
    const showDamageEfficiencyInput = document.getElementById("show-damage-efficiency");
    const showPlayerHPMInput = document.getElementById("show-player-hpm");
    const showMedicHPMAInput = document.getElementById("show-medic-hpma");

    const showMatchScoresInput = document.getElementById("show-match-scores");
    const showClassesPlayedInput = document.getElementById("show-classes-played");

    const themeInput = document.getElementById("theme-toggle");

    const leagueDropdownInput = document.getElementById("league-dropdown");
    const statsDropdownInput = document.getElementById("stats-dropdown");
    const profileDropdownInput = document.getElementById("profile-dropdown");

    populateThemeToggle(themeInput, document);

   // populateETF2LCheckbox(etf2lInput);
    populateETF2LNameCheckbox(etf2lNameInput);
    populateETF2LTeamCheckbox(etf2lTeamInput);
    populateETF2LDivisionCheckbox(etf2lDivisionInput);
    //populateRGLCheckbox(rglInput);
    populateRGLNameCheckbox(rglNameInput);
    populateRGLTeamCheckbox(rglTeamInput);
    populateRGLDivisionCheckbox(rglDivisionInput);
    populateHighestDivisionPlayedToggle(getHighestDivisionPlayedInput, getHighestDivisionPlayedGrid);

    populateDamagePercentTotalOrTeamToggle(damagePercentTotalOrTeamInput, damagePercentTotalOrTeamGrid);
    populateShowDamagePercent(showDamagePercentInput);
    populateShowDamageEfficiency(showDamageEfficiencyInput);
    populateShowPlayerHPM(showPlayerHPMInput);
    populateShowMedicHPMA(showMedicHPMAInput);

    populateShowMatchScores(showMatchScoresInput);
    populateShowClassesPlayed(showClassesPlayedInput);

    populateLeagueDropdownToggle(leagueDropdownInput, document);
    populateStatsDropdownToggle(statsDropdownInput, document);
    populateProfileDropdownToggle(profileDropdownInput, document);

    //etf2lInput.addEventListener("change", (e) => setETF2LValue(e.target.checked));
    etf2lNameInput.addEventListener("change", (e) => setETF2LNameValue(e.target.checked));
    etf2lTeamInput.addEventListener("change", (e) => setETF2LTeamValue(e.target.checked));
    etf2lDivisionInput.addEventListener("change", (e) => setETF2LDivisionValue(e.target.checked));
    //rglInput.addEventListener("change", (e) => setRGLValue(e.target.checked));
    rglNameInput.addEventListener("change", (e) => setRGLNameValue(e.target.checked));
    rglTeamInput.addEventListener("change", (e) => setRGLTeamValue(e.target.checked));
    rglDivisionInput.addEventListener("change", (e) => setRGLDivisionValue(e.target.checked));
    getHighestDivisionPlayedInput.addEventListener("change", (e) => setGetHighestDivision(e.target.checked, getHighestDivisionPlayedGrid));

    damagePercentTotalOrTeamInput.addEventListener("change", (e) => setDamagePercentTotalOrTeam(e.target.checked, damagePercentTotalOrTeamGrid));
    showDamagePercentInput.addEventListener("change", (e) => setShowDamagePercent(e.target.checked));
    showDamageEfficiencyInput.addEventListener("change", (e) => setShowDamageEfficiency(e.target.checked));
    showPlayerHPMInput.addEventListener("change", (e) => setShowPlayerHPM(e.target.checked));
    showMedicHPMAInput.addEventListener("change", (e) => setShowMedicHPMA(e.target.checked));
    
    showMatchScoresInput.addEventListener("change", (e) => setShowMatchScores(e.target.checked));
    showClassesPlayedInput.addEventListener("change", (e) => setShowClassesPlayed(e.target.checked));

    themeInput.addEventListener("change", (e) => setTheme(e.target.checked, document));
    
    leagueDropdownInput.addEventListener("change", (e) => setLeagueDropdown(e.target.checked, document));
    statsDropdownInput.addEventListener("change", (e) => setStatsDropdown(e.target.checked, document));
    profileDropdownInput.addEventListener("change", (e) => setProfileDropdown(e.target.checked, document));
});

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

	let styleSheets = [].map.call(document.styleSheets, function(item) {
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