const isFirefox = typeof browser !== "undefined";
const currentBrowser = isFirefox ? browser : chrome;

async function setETF2LValue(newValue) {
    await currentBrowser.storage.local.set({
        showETF2L: newValue
    });
}

async function setRGLValue(newValue) {
    await currentBrowser.storage.local.set({
        showRGL: newValue
    });
}

async function setRGLTeamValue(newValue) {
    await currentBrowser.storage.local.set({
        showRGLTeam: newValue
    });
}

async function setGetHighestDivision(newValue) {
    await currentBrowser.storage.local.set({
        getHighestDivisionPlayed: newValue
    });
}

async function setDamagePercentTotalOrTeam(newValue) {
    await currentBrowser.storage.local.set({
        damagePercentTotalOrTeam: newValue
    });
}

async function populateETF2LCheckbox(etf2lInput) {
    const showETF2L = await currentBrowser.storage.local.get("showETF2L");
    etf2lInput.checked = showETF2L.showETF2L;
}

async function populateRGLCheckbox(rglInput) {
    const showRGL = await currentBrowser.storage.local.get("showRGL");
    rglInput.checked = showRGL.showRGL;
}

async function populateRGLTeamCheckbox(rglTeamInput) {
    const showRGLTeam = await currentBrowser.storage.local.get("showRGLTeam");
    rglTeamInput.checked = showRGLTeam.showRGLTeam;
}

async function populateHighestDivisionPlayedToggle(getHighestDivisonPlayedInput) {
    const getHighestDivisionPlayed = await currentBrowser.storage.local.get("getHighestDivisionPlayed");
    getHighestDivisonPlayedInput.checked = getHighestDivisionPlayed.getHighestDivisionPlayed;
}

async function populateDamagePercentTotalOrTeamToggle(damagePercentTotalOrTeamInput) {
    const damagePercentTotalOrTeam = await currentBrowser.storage.local.get("damagePercentTotalOrTeam");
    damagePercentTotalOrTeamInput.checked = damagePercentTotalOrTeam.damagePercentTotalOrTeam;
}

document.addEventListener("DOMContentLoaded", async () => {
    const etf2lInput = document.getElementById("etf2l-input");
    const rglInput = document.getElementById("rgl-input");
    const rglTeamInput = document.getElementById("rgl-team-input");
    const getHighestDivisionPlayedInput = document.getElementById("get-highest-division-toggle");
    const damagePercentTotalOrTeamInput = document.getElementById("damage-percent-total-or-team");

    populateETF2LCheckbox(etf2lInput);
    populateRGLCheckbox(rglInput);
    populateRGLTeamCheckbox(rglTeamInput);
    populateHighestDivisionPlayedToggle(getHighestDivisionPlayedInput);
    populateDamagePercentTotalOrTeamToggle(damagePercentTotalOrTeamInput);

    etf2lInput.addEventListener("change", (e) => setETF2LValue(e.target.checked));
    rglInput.addEventListener("change", (e) => setRGLValue(e.target.checked));
    rglTeamInput.addEventListener("change", (e) => setRGLTeamValue(e.target.checked));
    getHighestDivisionPlayedInput.addEventListener("change", (e) => setGetHighestDivision(e.target.checked));
    damagePercentTotalOrTeamInput.addEventListener("change", (e) => setDamagePercentTotalOrTeam(e.target.checked));
});