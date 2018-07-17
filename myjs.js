// Javascript file for theorycrunch.com
// Created by Logan Murcott
// github.com/lmurcott

const patch = "8.14.1";
var lang = "en_US", theLang, myChamps = {}, theRunes, theItems, sortedItems, allChamps;

const loadJSON = function (file, callback, args = "") {// Load riot JSON files
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            callback(JSON.parse(xhttp.responseText), args);
        }
    };
    xhttp.open("GET", "http://ddragon.leagueoflegends.com/cdn/" +  patch + "/data/" + lang + "/" + file + ".json", true);
    xhttp.send();
};

// ** MATH FUNCTIONS **

const calc = function (num1, num2, o = 2) {// Calculate decimal equations
    const getDP = function (num) {// Return decimal places
        const numStr = num.toString();
        return (numStr.indexOf(".") === -1)
            ? 0
            : numStr.length - numStr.indexOf(".") - 1;
    };
    const num1DP = getDP(num1), num2DP = getDP(num2);
    const num1Int = (o === 2)
        ? Number(num1 + "e" + num1DP)
        : Number(num1 + "e" + Math.max(num1DP, num2DP));
    const num2Int = (o === 2)
        ? Number(num2 + "e" + num2DP)
        : Number(num2 + "e" + Math.max(num1DP, num2DP));
    switch (o) {
    case 0:// Addition
        //return Number(`${num1Int + num2Int}e-${Math.max(num1DP, num2DP)}`);
        return Number(num1Int + num2Int + "e-" + Math.max(num1DP, num2DP));
    case 1:// Subtraction
        return Number(`${num1Int - num2Int}e-${Math.max(num1DP, num2DP)}`);
    case 2:// Multiplication
        return Number(`${num1Int * num2Int}e-${num1DP + num2DP}`);
    case 3:// Division
        if (num1 === 0 || num2 === 0) {
            return 0;
        }
        return num1Int / num2Int;
    }
};

const round = function (num, places = 0) {// Round number
    return Number(Math.round(Number(num + "e" + places)) + "e-" + places);
};

const calcBaseStats = function (b, g, n) {//base, growth, level
    "use strict";
    return calc(b, calc(calc(g, (n - 1)), calc(0.7025, calc(0.0175, (n - 1)), 0)), 0);
};

const calcBaseAspd = function (delay) {
    "use strict";
    return round(calc(0.625, calc(1, delay, 0), 3),3);
};

// *** UI ***

//Change Language
const newLang = function () {
    if(location.hash.replace("#","") != theLang) {
        location.reload();
    }
};

const showHover = function (txt, x, y) {
  var hoverDiv;
  hoverDiv = document.getElementById("hoverDiv");
  hoverDiv.innerHTML = txt;
  hoverDiv.style.display = "block";
  if ((x + 285) > (window.outerWidth)) {
    hoverDiv.style.left = (x - hoverDiv.scrollWidth - 5) + "px";
  } else {
    hoverDiv.style.left = (x + 5) + "px";
  }
  if ((y + hoverDiv.scrollHeight) > (window.outerHeight - 125)) {
    hoverDiv.style.top = (y - hoverDiv.scrollHeight - 5) + "px";
  } else {
    hoverDiv.style.top = (y + 5) + "px";
  }
};

const hideHover = function () {
    document.getElementById("hoverDiv").style.display = "none";
};

const toogleVisible = function (element) {
    let currEle = document.getElementById(element).style;
    currEle.display = (currEle.display === "none" || !currEle.display) ? "block":"none";
};

// ** PRE LOADER **

const setLocale = function () {
    "use strict";
    if (location.hash) {
        lang = location.hash.split("#")[1];
    }
};

const setLang = function (json) {
    "use strict";
    theLang = json.data;
    // Custom Language
    const findReduction = theLang.rPercentCooldownMod.replace("%", "");
    theLang.Cooldown = findReduction.replace(" ", "");
    theLang.reduction = theLang.CooldownReduction.replace(theLang.Cooldown, "");
    theLang.Regen = theLang.HealthRegen.replace(theLang.Health, "");
    theLang.AttackDamage = theLang.Attack + " " + theLang.Damage;
    theLang.magicDamage = theLang.Magic + " " + theLang.Damage;
    theLang.Next = theLang.NextRank_.replace(theLang.Rank_, "");//Next
    //theLang.Cost = theLang.Cost_.replace(":", "");
    Array.from(document.getElementsByClassName("enemySelectStr")).forEach(function (element) {
        element.innerText = theLang.PlayingAgainst + ": ";
    });
    loadCheck();
};

const setChampList = function (json) {// Create options for selecting new champ
    "use strict";
    var opt, allOptions = document.createDocumentFragment();
    allChamps = json.data;
    Object.keys(json.data).forEach(function (champ) {
        opt = document.createElement("option");
        opt.innerText = json.data[champ].name;
        opt.value = json.data[champ].id;
        allOptions.appendChild(opt);
    });
    document.getElementById("chmpSlct0").appendChild(allOptions.cloneNode(true));
    document.getElementById("chmpSlct1").appendChild(allOptions.cloneNode(true));
    loadCheck();
};

const setItems = function (json) {//atmas and shojin added to remove list
    "use strict";
    const
        delItem = [3029],
        delhideFromAll = [1400, 1401, 1402, 1412, 1413, 1414, 1416, 1419];

    theItems = json.data;
    delItem.forEach(function (itemNo) {
        delete theItems[itemNo];
    });
    delhideFromAll.forEach(function (itemNo) {
        delete theItems[itemNo].hideFromAll;
        theItems[itemNo].tags.push("Jungle");
    });
    theItems[3117].stats.FlatMovementSpeedMod = 25;//mobo boots changed to in combat amount
    theItems[3301].stats.FlatMovementSpeedMod = 5;//ancient coin
    theItems[3096].stats.FlatMovementSpeedMod = 10;//Nomads Medallion
    theItems[3069].stats.FlatMovementSpeedMod = 10;//Remnant of the Ascended
    theItems[3042].gold.total = theItems[3004].gold.total;//Muramana
    theItems[3042].tags = theItems[3004].tags;
    theItems[3040].gold.total = theItems[3003].gold.total;//Seraphs Embrace
    theItems[3040].tags = theItems[3040].tags.concat(theItems[3003].tags);
    //Jungle Items
    theItems[1402].tags.push("SpellDamage");//Runic
    theItems[1414].tags.push("SpellDamage");
    theItems[1402].tags.push("NonbootsMovement");
    theItems[1414].tags.push("NonbootsMovement");
    theItems[1401].tags.push("Health");//Cinderhulk
    theItems[1413].tags.push("Health");
    theItems[1416].tags.push("AttackSpeed");//Bloodrazor
    theItems[1419].tags.push("AttackSpeed");
    theItems[1400].tags.push("CooldownReduction");//Warrior
    theItems[1412].tags.push("CooldownReduction");
    theItems[1400].tags.push("Damage");
    theItems[1412].tags.push("Damage");
    delete theItems[3200].inStore;//viktor base item
    theItems[3200].tags = theItems[3198].tags;
    delete theItems[2003].consumed;//health potion

    sortedItems = Object.keys(theItems).sort(function (a, b) {
        return theItems[a].gold.total - theItems[b].gold.total;
    });
    loadCheck();
};

const setRunes = function (json) {
    theRunes = json;
    loadCheck();
};

const importMatch = function () {
    "use strict";
    if(location.hash.length > 5) {
        let hashChamps = location.hash.split("#");
        hashChamps = hashChamps.slice(2);
        hashChamps.forEach(function (hash) {
            let champId = hash.split("&")[0];
            loadJSON("champion/" + champId, importChamp, hash);
        });
    }
};

const loadCheck = function () {
    if (theItems && theRunes && allChamps && theLang) {
        importMatch();
        toogleVisible("content");
        toogleVisible("sideHead");
    }
};

// ** Matchlist Import/Export **

const getMatches = function () {
    const
        region = document.getElementById("region").value,
        ign = document.getElementById("ign").value;

    document.getElementById("submitBtn").value = theLang.mobilePleaseWait;
    document.getElementById("submitBtn").disabled = true;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            drawMatchList(JSON.parse(xhttp.responseText));
        }
    };
    xhttp.open("GET", "http://match.theorycrunch.com/?r=" + region + "&name=" + ign, true);
    xhttp.send();
    return false;
};

const drawMatchList = function (json) {
    let matchDOM = document.getElementById("matchlist");
    while (matchDOM.childElementCount > 1) {
        matchDOM.removeChild(matchDOM.lastChild);
    }
    if(json.region) {
        Array.from(json.matches).forEach(function (match) {
            let matchAnchor = document.createElement("a");
            matchAnchor.href = "http://match.theorycrunch.com/match?m=" + match.matchId + "&r=" + json.region + "&l=" + lang;
            let matchDiv = document.createElement("div");
            matchDiv.classList.add("match");
            let matchImg = document.createElement("img");
            matchImg.src = "http://ddragon.leagueoflegends.com/cdn/" + patch + "/img/champion/" + allChamps[match.champId].image.full;
            let matchP = document.createElement("p");
            const theDate = new Date(match.timestamp);
            matchP.innerText += theDate.toLocaleString();
            matchDiv.appendChild(matchImg);
            matchDiv.appendChild(matchP);
            matchAnchor.appendChild(matchDiv);
            matchDOM.appendChild(matchAnchor);
        });
    } else {
        matchDOM.innerText = json;
    }
    matchDOM.style.display = "block";
    document.getElementById("submitBtn").value = "Import";
    document.getElementById("submitBtn").disabled = false;
};

const getLink = function () {
    toogleVisible("shareBx");
    if (document.getElementById("shareBx").style.display === "block") {
        let linkStr = "http://www.theorycrunch.com/#" + lang;
        Object.keys(myChamps).forEach(function (uid) {
            linkStr += "#" + myChamps[uid].id;
            linkStr += "&"  + myChamps[uid].side;
            Array.from(document.getElementById(uid).getElementsByClassName("spellLvl")).forEach(function (input) {
                linkStr += input.value;
            });
            linkStr += document.getElementById(uid).querySelector(".champLevel").value;
            linkStr += "&";
            myChamps[uid].items.forEach(function (itemNo){
                linkStr += itemNo;
            });
            linkStr += myChamps[uid].getRuneHash();
        });
        document.getElementById("buildLink").value = linkStr;
        document.getElementById("buildLink").select();
    }
};

// ** UPDATE SCRIPTS **

const update = function () {
    "use strict";
    Object.keys(myChamps).forEach(function (uid) {
        myChamps[uid].setStats();
    });
    Object.keys(myChamps).forEach(function (uid) {
        myChamps[uid].drawStats();
    });
    Object.keys(myChamps).forEach(function (uid) {
        myChamps[uid].drawSkillTxt();
    });
};

// ** CHAMPION SCRIPTS **

const newUID = function () {//Generate Unique Id for Champs
    let uid = "", i = 4, possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    while (i > 0) {
        uid += possible.charAt(Math.floor(Math.random() * possible.length));
        i -= 1;
    }
    return uid;
};

const champObj = function (obj, side, uid) {// create champion object
    "use strict";
    let {aSpdBonus, buffs, debuffs, sInfoP, sInfo0, sInfo1, sInfo2, sInfo3} = champVars[obj.id],
        {id, image, name, partype, passive, spells, stats} = obj,
        adaptTyp = "phys",
        attackdamage = [],
        ap = 0,
        aPen = [],// flat reduction, percent reduction, percent pen, flat pen
        armor = [],
        attackspeed = [],
        baseDPS = 0,
        buffStats = {},
        cdr = [],
        crit = 0,
        dmgReduct = [],
        enemyUID,
        hp = [],
        hpregen = [],
        items = [],
        level = 1,
        lifeSteal = 0,
        move = [],
        mp = [stats.mp, 0],
        mPen = [0, 0, 0, 0],// flat reduction, percent reduction, percent pen, flat pen
        mpregen = [stats.mpregen, 0, 0],
        spellblock = [],
        runePaths = [],
        runes = [[], []],
        getAdapt = function () {
            if (ap === attackdamage[1]) {
                const magChamps = ["Ahri","AurelionSol","Alistar","Amumu","Anivia","Annie","Azir","Bard","Brand","Cassiopeia","Chogath",
                "Diana","Ekko","Elise","Evelynn","Fiddlesticks","Fizz","Galio","Gragas","Heimerdinger","Ivern","Janna","Karma","Karthus",
                "Kassadin","Katarina","Kayle","Kennen","Leblanc","Lissandra","Lulu","Lux","Malphite","Malzahar","Maokai","Mordekaiser",
                "Morgana","Nami","Nautilus","Nidalee","Nunu","Orianna","Rakan","Rumble","Ryze","Singed","Sona","Soraka","Swain","Syndra","Taliyah",
                "Taric","TwistedFate","Veigar","Velkoz","Viktor","Vladimir","Xerath","Zac","Ziggs","Zilean","Zoe","Zyra"];
                if (magChamps.includes(id)) {
                    return "mag";
                } else {
                    return "phys";
                }
            } else if (ap > attackdamage[1]) {
                return "mag";
            } else if (ap < attackdamage[1]) {
                return "phys";
            }
        },
        getValue = function (theKey, no, isLookup = false) {
            let riotObj, spellLvl, value = "";
            if (buffStats[no + theKey]) {//return pre calculated buff value
                return buffStats[no + theKey];
            }
            if (no !== "P" && no !== "Attack") {
                riotObj = spells[no];
                spellLvl = document.getElementById(uid).getElementsByClassName("spellLvl")[no].value;
                if (spellLvl > 0 && !isLookup) {
                    spellLvl -= 1;
                }
            }
            const getVar = function (theVar) {
                let theCoeff, stat;
                if (typeof theVar.coeff === "object") {
                    if (theVar.coeff.length > 6) {
                        theCoeff = theVar.coeff[level - 1];
                    } else {
                        theCoeff = theVar.coeff[spellLvl];
                    }
                } else {
                    theCoeff = theVar.coeff;
                }
                switch (theVar.link) {
                case "@cooldownchampion":
                    stat = (cdr[0] > cdr[1]) ? calc(1, cdr[1], 1) : calc(1, cdr[0], 1);
                    break;
                case "armor":
                    stat = armor[0] + armor[1];
                    break;
                case "attackdamage":
                    stat = attackdamage[0] + attackdamage[1];
                    break;
                case "baseAd":
                    stat = attackdamage[0];
                    break;
                case "bonusarmor":
                    stat = armor[1];
                    break;
                case "bonusattackdamage":
                    stat = attackdamage[1];
                    break;
                case "bonusattackspeed"://for jhin, kaisa, and varus
                    stat = Number(attackspeed[1] + "e2");
                break;
                case "bonusHp":
                    stat = hp[1];
                    break;
                case "bonusmovespeed":
                    stat = move[1];
                    break;
                case "bonusmr":
                    stat = spellblock[1];
                    break;
                case "caitPassive":
                    const caitMulti = (crit > 1) ? 1.5 : calc(crit, 1.5);
                    stat = calc(attackdamage[0] + attackdamage[1], caitMulti);
                    break;
                case "champLevel":
                    stat = level;
                    break;
                case "input":
                    if (theVar.inputId === "P" || document.getElementById(uid).getElementsByClassName("spellLvl")[theVar.inputId].value > 0) {
                        stat = document.getElementById(uid + "SpellNum" + theVar.inputId).value;
                    } else {
                        stat = 0;
                    }
                    break;
                case "jhinPassive":
                    const jhinCrit = (crit > 1) ? 1 : crit;
                    stat = round(calc(calc(attackdamage[0], attackdamage[1], 0), calc(calc(jhinCrit, 0.4), calc(attackspeed[1], 0.25), 0)), 1);
                    break;
                case "maxHp":
                    stat = getPercentHP(1);
                    break;
                case "missingHp":
                    if (document.getElementById(uid + "HP")) {
                        stat = Number((getPercentHP(1)) - parseInt(document.getElementById(uid + "HP").value) + "e-2");
                    } else {
                        stat = 0;
                    }
                    break;
                case "mana":
                    stat = mp[0] + mp[1];
                    break;
                case "mr":
                    stat = spellblock[0] + spellblock[1];
                    break;
                case "percentMissingHp":
                    if (document.getElementById(uid + "HP")) {
                        stat = round(Number(calc(getPercentHP(1) - parseInt(document.getElementById(uid + "HP").value), getPercentHP(1), 3) + "e2"));
                    } else {
                        stat = 0;
                    }
                break;
                case "rengarPassive":
                    const adRatio = {
                        "0": 0,
                        "1": 0.01,
                        "2": 0.04,
                        "3": 0.09,
                        "4": 0.16,
                        "5": 0.25,
                        "6": 0.36,
                    };
                    stat = calc(attackdamage[1], adRatio[document.getElementById(uid + "SpellNumP").value]);
                break;
                case "spelldamage":
                    stat = ap;
                    break;
                case "swainFragments":
                    const perFragDmg = calc(calc(ap, 0.27), spells[3].effect[10][spellLvl], 0);
                    stat = calc(perFragDmg, document.getElementById(uid + "SpellNumP").value);
                break;
                default:
                    console.log(theVar.link);
                    stat = 0;
                }
                return calc(theCoeff, stat);
            };
            const keyObj = (myChamps[uid]["sInfo" + no])
                ? myChamps[uid]["sInfo" + no][theKey]
                : undefined;
            //put exemption for pre calculated buffs

            if (theKey.charAt(0) === "e" && (theKey.length === 2 || (theKey.length === 3 && theKey.charAt(2) === "a"))) {
                value = (theKey.charAt(1) === "0")
                    ? riotObj.effect[10][spellLvl]
                    : riotObj.effect[theKey.charAt(1)][spellLvl];
            }
            if (myChamps[uid]["sInfo" + no] && keyObj) {
                if (keyObj.empty) {
                    return "";
                }
                value = (value === "") ? 0 : value;
                if (keyObj.effectNo) {
                    value = calc(value, riotObj.effect[keyObj.effectNo][spellLvl], 0);
                }
                if (keyObj.value) {
                    if (typeof keyObj.value === "object") {
                        value = calc(value, keyObj.value[spellLvl], 0);
                    } else {
                        value = calc(value, keyObj.value, 0);
                    }
                }
                if (keyObj.valuePerLvl) {
                    value = calc(value, keyObj.valuePerLvl[level - 1], 0);
                }
                if (keyObj.valuePair) {
                    value = calc(value, getValue(keyObj.valuePair[1], keyObj.valuePair[0], true), 0);
                }
                if (keyObj.growth) {
                    value = calc(value, round(calcBaseStats(0, keyObj.growth, level), 1), 0);
                }
                if (keyObj.child) {
                    keyObj.child.forEach(function (varKey) {
                        let varObj;
                        if (no !== "P") {
                            varObj = spells[no].vars.find(function (theVar) {
                                return theVar.key === varKey;
                            });
                        }
                        if (!varObj) {
                            varObj = myChamps[uid]["sInfo" + no][varKey];
                        }
                        value = calc(value, getVar(varObj), 0);
                    });
                }
                if (keyObj.multiplier) {
                    if (typeof keyObj.multiplier === "object") {
                        value = calc(value, Number(keyObj.multiplier[spellLvl] + "e-2"));
                    } else {
                        value = calc(value, Number(keyObj.multiplier + "e-2"));
                    }
                }
                if (keyObj.critChanceMulti) {// Xayah E
                    const myCritChance = (crit > 1) ? 0.5 : crit;
                    value = calc(value, calc(calc(keyObj.critChanceMulti, myCritChance), 1, 0));
                }
                if (keyObj.apply) {
                    if (keyObj.type === "heal") {
                        value = 0;
                    } else {
                        if (enemyUID) {
                            value = myChamps[enemyUID].getPercentHP(Number(value + "e-2"), keyObj.apply);
                        } else {
                            value = 0;
                        }
                    }
                }
            }
            return value;
        },
        itemCount = function (itemID) {
            if (document.getElementById(uid + itemID)) {
                return parseInt(document.getElementById(uid + itemID).value);
            }
            return 0;
        },
        itemCheck = function (itemID, status) {
            if (items.includes(itemID)) {
                if (!status || (document.getElementById(uid + itemID) && document.getElementById(uid + itemID).checked)) {
                    return true;
                }
            }
            return false;
        },
        runeCheck = function (runeID, status) {
            if (runes[0].includes(runeID) || runes[1].includes(runeID)) {
                if (status && !document.getElementById(uid + "RCB" + runeID).checked) {
                    return false;
                }
                return true;
            }
            return false;
        },
        setStats = function () {
            const setBaseStats = function () {
                buffStats = [];
                if (document.getElementById("enemy" + side).length > 0) {
                    enemyUID = document.getElementById("enemy" + side).value;
                } else {
                    enemyUID = undefined;
                }
                attackdamage[0] = round(calcBaseStats(stats.attackdamage, stats.attackdamageperlevel, level));
                armor[0] = round(calcBaseStats(stats.armor, stats.armorperlevel, level));
                attackspeed[0] = calcBaseAspd(stats.attackspeedoffset);
                attackspeed[1] = Number(round(calcBaseStats(0, stats.attackspeedperlevel, level)) + "e-2");
                if (aSpdBonus) {
                    attackspeed[1] = calc(attackspeed[1], aSpdBonus, 0);
                }
                if (id === "Jhin") {
                    attackspeed[0] = round(calc(attackspeed[0], calc(attackspeed[1], 1, 0)), 3);
                    attackspeed[1] = 0;
                }
                attackspeed[2] = 2.5;
                if (id === "Kled" && document.getElementById(uid + "InputP").checked) {
                    hp[0] = 0;
                } else {
                    hp[0] = round(calcBaseStats(stats.hp, stats.hpperlevel, level));
                }
                hpregen[0] = round(calcBaseStats(stats.hpregen, stats.hpregenperlevel, level), 1);
                hpregen[2] = 0;
                mpregen[1] = 0;
                mpregen[2] = 0;
                aPen = [0, 0, 0];// percent, flat, lethality
                mPen = [0, 0, 0, 0];
                dmgReduct = [0, 0, 0, 0];
                hp[1] = 0;
                armor[1] = 0;
                spellblock[1] = 0;
                ap = 0;
                attackdamage[1] = 0;
                hpregen[1] = 0;
                crit = 0;
                move = [0, 0, 0, 0, 0];
                if (stats.mpperlevel !== 0) {
                    mp[0] = round(calcBaseStats(stats.mp, stats.mpperlevel, level));
                }
                if (stats.mpregenperlevel !== 0) {
                    mpregen[0] = round(calcBaseStats(stats.mpregen, stats.mpregenperlevel, level), 1);
                }
                spellblock[0] = round(calcBaseStats(stats.spellblock, stats.spellblockperlevel, level));
                cdr = [0, 0.4];
                move[0] = stats.movespeed;
                if (id === "Jhin") {
                    attackspeed[0] = round(calc(attackspeed[0], calc(1, attackspeed[1], 0)), 3);
                    attackspeed[1] = 0;
                }
            };
            const setItemStats = function () {
                let statObj = {};

                if (items.length > 0) {// non unique stats
                    items.forEach(function (itemNo) {
                        const// base hp regen items
                        hp50 = [3801,3096,3107,1006,3097,3077,3305],
                        hp100 = [3074,3401,3194,3065,3748,3309],
                        hp125 = [2053,3060,3512],
                        hp150 = [3056,3382],
                        hp175 = [3069,3306],
                        hp200 = [3083];
                        if (hp50.includes(itemNo)) {
                            hpregen[2] = calc(0.5, hpregen[2], 0);
                        } else if (hp100.includes(itemNo)) {
                            hpregen[2] = calc(1, hpregen[2], 0);
                        } else if (hp125.includes(itemNo)) {
                            hpregen[2] = calc(1.25, hpregen[2], 0);
                        } else if (hp150.includes(itemNo)) {
                            hpregen[2] = calc(1.5, hpregen[2], 0);
                        } else if (hp175.includes(itemNo)) {
                            hpregen[2] = calc(1.75, hpregen[2], 0);
                        } else if (hp200.includes(itemNo)) {
                            hpregen[2] = calc(2, hpregen[2], 0);
                        }
                        const// base mp regen items
                            regen25 = [1004, 3303],
                            regen50 = [3504, 3028, 3092, 3098, 3114,3312],
                            regen100 = [3174, 3222, 2065],
                            regen150 = [3107],
                            regen200 = [3382];
                        if (partype === theLang.Mana) {
                            if (regen25.includes(itemNo)) {
                                mpregen[2] = calc(0.25, mpregen[2], 0);
                            } else if (regen50.includes(itemNo)) {
                                mpregen[2] = calc(0.5, mpregen[2], 0);
                            } else if (regen100.includes(itemNo)) {
                                mpregen[2] = calc(1, mpregen[2], 0);
                            } else if (regen150.includes(itemNo)) {
                                mpregen[2] = calc(1.5, mpregen[2], 0);
                            } else if (regen200.includes(itemNo)) {
                                mpregen[2] = calc(2, mpregen[2], 0);
                            }
                            if (itemNo === 1056) {// Dorans Ring
                                mpregen[1] = calc(5, mpregen[1], 0);
                            }
                        }
                        const//non unique cdr
                            cdr5 = [3301],
                            cdr10  = [3001,3194,3504,3174,3060,3102,3812,3147,3401,3092,3098,3152,3379,3109,3100,3104,3156,3222,3096,3056,3107,3800,3382,3057,3065,3069,1400,1408,1412,3142,3050,3157,3386,3285,3030,3003,3040,3905,1402,1414],
                            cdr20 = [3025,3110,3071,3380,3384,3078,3508];
                        if (cdr5.includes(itemNo)) {
                            cdr[0] = calc(0.05, cdr[0], 0);
                        } else if (cdr10.includes(itemNo)) {
                            cdr[0] = calc(0.1, cdr[0], 0);
                        } else if (cdr20.includes(itemNo)) {
                            cdr[0] = calc(0.2, cdr[0], 0);
                        }

                        //get items stats from object
                        Object.keys(theItems[itemNo].stats).forEach(function (key) {
                            if (statObj.hasOwnProperty(key)) {
                                statObj[key] = calc(theItems[itemNo].stats[key], statObj[key], 0);
                            } else {
                                statObj[key] = theItems[itemNo].stats[key];
                            }
                        });
                    });
                }
                const setStat = function (modStr) {
                    return statObj.hasOwnProperty(modStr)
                        ? statObj[modStr]
                        : 0;
                };
                hp[1] = setStat("FlatHPPoolMod");
                armor[1] = setStat("FlatArmorMod");
                spellblock[1] = setStat("FlatSpellBlockMod");
                ap = setStat("FlatMagicDamageMod");
                attackdamage[1] = setStat("FlatPhysicalDamageMod");
                hpregen[1] = calc(setStat("FlatHPRegenMod"), 5);
                crit = setStat("FlatCritChanceMod");
                move[1] = setStat("FlatMovementSpeedMod");
                move[2] = setStat("PercentMovementSpeedMod");
                lifeSteal = setStat("PercentLifeStealMod");
                if (statObj.hasOwnProperty("PercentAttackSpeedMod")) {// Attack Speed
                    attackspeed[1] = calc(statObj.PercentAttackSpeedMod, attackspeed[1], 0, 2.5);
                }
                if (partype === theLang.Mana) {
                    mp[1] = setStat("FlatMPPoolMod");
                }
                if (items.length > 0) {// unique stats
                    // ** UNIQUE STATS **
                    if (itemCheck(1051)) {// brawlers gloves
                        crit = calc(0.1, crit, 0);
                    }
                    if (itemCheck(3211, true)) {// spectre cowl active
                        hpregen[2] = calc(1.5, hpregen[2], 0);
                    }
                    if (itemCheck(1054, true)) {// dorans shield active
                        hpregen[1] = calc(10, hpregen[1], 0);
                    }
                    if (itemCheck(3742, true)) {// deadmans
                        move[1] = calc(60, move[1], 0);
                    }
                    if (itemCheck(3072)) {// bloodthirster
                        lifeSteal = calc(0.2, lifeSteal, 0);
                    }
                    if (itemCheck(3053)) {// sterak
                        attackdamage[1] = calc(calc(attackdamage[0], 0.5), attackdamage[1], 0);
                    }
                    if (itemCheck(3041)) {// mejai
                        const stacks = itemCount(3041);
                        ap = calc(ap, (stacks * 5), 0);
                        if (stacks > 9) {
                            move[2] = calc(move[2], 0.1, 0);
                        }
                    } else if (itemCheck(1082)) {// dark seal
                        const stacks = itemCount(1082);
                        ap = calc(ap, (stacks * 3), 0);
                    }
                    if (id === "Viktor") {//viktor Items
                        if (itemCheck(3200)) {
                            ap += level * 1 + ap;
                            mp[1] += 10 * level;
                        } else if (itemCheck(3196)) {
                            ap += level * 3 + ap;
                            mp[1] += 15 * level;
                        } else if (itemCheck(3197)) {
                            ap += level * 6 + ap;
                            mp[1] += 20 * level;
                        } else if (itemCheck(3198)) {
                            ap += level * 10 + ap;
                            mp[1] += 25 * level;
                        }
                    }
                    if (itemCheck(3027)) {//rod of ages
                        const roaStacks = itemCount(3027);
                        ap += roaStacks * 4;
                        hp[1] += roaStacks * 20;
                        mp[1] += roaStacks * 10;
                    }
                    if (itemCheck(3907)) {//spellbinder
                        const sbStacks = itemCount(3907);
                        ap += round(calc(0.8, sbStacks));
                        move[2] = calc(move[2], calc(0.005, sbStacks), 0);
                    }
                    if (itemCheck(3091)) {//wits end
                        const witsEndsStacks = itemCount(3091);
                        spellblock[1] += witsEndsStacks * 6;
                    }
                    if (itemCheck(3042) || itemCheck(3004)) {//manamune
                        attackdamage[1] += round(calc(mp[0] + mp[1], 0.02));
                    }
                    if (itemCheck(3003)) {//archangels
                        ap += round(calc(mp[0] + mp[1], 0.01));
                    } else if (itemCheck(3040)) {//archangels
                        ap += round(calc(mp[0] + mp[1], 0.03));
                    }
                    if (itemCheck(3009)) {//swift boots
                        move[3] += 25;
                    }
                    if (itemCheck(3508, true)) {// essence reaver
                        attackspeed[1] = calc(attackspeed[1], 0.5, 0);
                    }
                    if (itemCheck(3194, true)) {
                        dmgReduct[0] += calc(dmgReduct[0], 20, 0);
                    }
                    //Movement Items
                    if (itemCheck(3113)) {// Aether Wisp
                        move[2] = calc(move[2], 0.05, 0);
                    }
                    if (itemCheck(2065)) {// Shurelya
                        move[2] = calc(move[2], 0.05, 0);
                    }
                    if (itemCheck(2065, true)) {// Shurelya Active
                        move[2] = calc(move[2], 0.4, 0);
                    }
                    if (itemCheck(3800, true)) {// Righteous Glory
                        move[2] = calc(move[2], 0.75, 0);
                    }
                    if (itemCheck(3504)) {// Ardent Censor
                        move[2] = calc(move[2], 0.08, 0);
                    }
                    if (itemCheck(3086)) {// Zeal
                        move[2] = calc(move[2], 0.05, 0);
                    }
                    if (itemCheck(3095, true)) {//Stormrazor
                        move[2] = calc(move[2], 0.2, 0);
                    }
                    if (itemCheck(3109, true)) {//Knights Vow
                        move[2] = calc(move[2], 0.15, 0);
                        armor[1] = calc(armor[1], 20, 0);
                    }
                    // unique cdr
                    const
                        uniqCdr10 = [2065,3133,3108,3114,3024,3158,3067,3101,3083],
                        uniqCdr20 = [3115];
                    uniqCdr10.forEach(function (cdrItemNo) {
                        if (items.includes(cdrItemNo)) {
                            cdr[0] = calc(0.1, cdr[0], 0);
                        }
                    });
                    uniqCdr20.forEach(function (cdrItemNo) {
                        if (items.includes(cdrItemNo)) {
                            cdr[0] = calc(0.2, cdr[0], 0);
                        }
                    });
                    if (//haste cdr
                        items.includes(3285)||
                        items.includes(3802)||
                        items.includes(3030)||
                        items.includes(3003)||
                        items.includes(3040)
                    ) {
                        cdr[0] = calc(0.1, cdr[0], 0);
                    }
                    if (items.includes(3174)) {//harmony passive, chalice etc.
                        ap += calc(calc(mpregen[2], 25, 3), 500);
                    } else if (items.includes(3028) || items.includes(3222)) {
                        hpregen[2] = calc(hpregen[2], mpregen[2], 0);
                    }

                    // Armour Penetration

                    if (items.includes(3036)) {// Lord Dominick's Regards
                        aPen[0] = 35;
                    } else if (items.includes(3033)) {// Mortal Reminder
                        aPen[0] = 25;
                    } else if (items.includes(3035)) {// Last Whisper
                        aPen[0] = 10;
                    }
                    // Lethality Items
                    if (items.includes(3134)) {// Serrated Dirk
                        aPen[2] += 10;
                    }
                    if (items.includes(3142)) {// Youmuu
                        aPen[2] += 18;
                    }
                    if (items.includes(3147)) {// Duskblade
                        aPen[2] += 18;
                    }
                    if (items.includes(3814)) {// Edge of Night
                        aPen[2] += 18;
                    }
                    if (items.includes(4004)) {// Edge of Night
                        aPen[2] += 18;
                    }
                    //Magic Penetration
                    if (items.includes(3135)) {// Void Staff
                        mPen[0] = calc(40, mPen[0], 0);
                    }
                    if (items.includes(3916) || items.includes(3165) || items.includes(4010)) {// Cursed Strike
                        mPen[1] = calc(15, mPen[1], 0);
                    }
                    if (items.includes(3020)) {// Sorc Shoes
                        mPen[1] = calc(18, mPen[1], 0);
                    }
                    // *** POTIONS ***
                    const drinkHPPotion = function (amount) {
                        if (itemCheck(1082)) {// dark seal
                            let darkSealCount = 0;
                            items.forEach(function (itemNo) {
                                if (itemNo === 1082) {
                                    darkSealCount += 1;
                                }
                            });
                            hpregen[1] += round(calc(amount, calc(1, calc(darkSealCount, 0.25), 0)));
                        } else {
                            hpregen[1] += amount;
                        }
                    };
                    if (itemCheck(2003, true)) {
                        drinkHPPotion(50);
                    }
                    if (itemCheck(2031, true)) {
                        drinkHPPotion(52);
                    }
                    if (itemCheck(2032, true)) {
                        drinkHPPotion(37);
                        mpregen[1] += 22;
                    }
                    if (itemCheck(2033, true)) {
                        drinkHPPotion(52);
                        mpregen[1] += 31;
                    }
                }
                if (document.getElementById(uid).querySelector(".ardent").value > 0) {// ardent censor
                    const ardent = [0.1, 0.11, 0.12, 0.14, 0.15, 0.16, 0.17, 0.18, 0.19, 0.21, 0.22, 0.23, 0.24, 0.25, 0.26, 0.28, 0.29, 0.3];
                    attackspeed[1] = calc(attackspeed[1], ardent[document.getElementById(uid).querySelector(".ardent").value - 1], 0);
                }
                if (document.getElementById(uid).querySelector(".slctElix").value !== "") {//elixirs
                    switch(document.getElementById(uid).querySelector(".slctElix").value) {
                    case "2138"://Elixir of Iron
                        hp[1] += 300;
                        break;
                    case "2139"://Elixir of Sorcery
                        ap += 50;
                        mpregen[1] += 15;
                        break;
                    case "2140"://Elixir of Wrath
                        attackdamage[1] = calc(30, attackdamage[1], 0);
                        break;
                    }
                }
            };
            const setLevel = function () {
                const levelDOM = document.getElementById(uid).querySelector(".champLevel");
                let lvlRquired = parseInt(levelDOM.value);
                if (lvlRquired < 16) {
                    const abilityLvls = document.getElementById(uid).getElementsByClassName("spellLvl");
                    const rquiredSkillLvl = {
                        "5" : {
                            1 : 1,
                            2 : 3,
                            3 : 5,
                            4 : 7,
                            5 : 9
                        },
                        "6" : {// ryze q & jayce
                            1 : 1,
                            2 : 3,
                            3 : 5,
                            4 : 7,
                            5 : 9,
                            6 : 11
                        },
                        "2" : {// ryze ult
                            2 : 6,
                            3 : 11
                        },
                        "3" : {
                            1 : 6,
                            2 : 11,
                            3 : 16
                        },
                        "4" : {
                            2 : 6,
                            3 : 11,
                            4 : 16
                        },
                        "1" : {// Jayce
                            1 : 1
                        }
                    };
                    Array.from(abilityLvls).forEach(function (theDOM) {
                        if (theDOM.value !== "0") {
                            let theLvl = rquiredSkillLvl[theDOM.max][parseInt(theDOM.value)];
                            if (theLvl > lvlRquired) {
                                lvlRquired = theLvl;
                            }
                        }
                    });
                }
                levelDOM.value = lvlRquired;
                level = lvlRquired;
                // check elder count
                if (document.getElementsByClassName("infernalCount")[side].value > document.getElementsByClassName("elderCount")[side].value) {
                    document.getElementsByClassName("elderCount")[side].value = document.getElementsByClassName("infernalCount")[side].value;
                }
            };
            const setRuneStats = function () {
                adaptTyp = getAdapt();
                if (runeCheck(8230, true)) {//phase rush
                    move[3] += 75;
                    const perLvl = [0.25, 0.26, 0.27, 0.28, 0.29, 0.29, 0.3, 0.31, 0.32, 0.33, 0.34, 0.35, 0.36, 0.36, 0.37, 0.38, 0.39, 0.4];
                    move[2] = calc(move[2], perLvl[level - 1], 0);
                }
                if (runeCheck(8242, true)) {//unflinching
                    move[3] += 15;
                }
                if (runeCheck(8138)) {//eyeball collection
                    const stacks = document.getElementById(uid + "RNUM8138").value;
                    if (adaptTyp === "phys") {
                        attackdamage[1] = (stacks < 20) ? calc(attackdamage[1], calc(0.6, stacks), 0) : calc(attackdamage[1], 18, 0);
                    } else {
                        ap = (stacks < 20) ? calc(ap, stacks, 0) : calc(ap, 30, 0);
                    }
                }
                if (runeCheck(8014, true)) {//coup de grace
                    if (adaptTyp === "phys") {
                        attackdamage[1] += 9;
                    } else {
                        ap += 15;
                    }
                }
                if (runeCheck(8347)) {//cosmic insight
                    cdr[0] = calc(cdr[0], 0.05, 0);
                    cdr[1] = 0.45;
                }
                if (runeCheck(8210)) {//transcendence
                    if (runeCheck(8210, true)) {
                        cdr[0] = calc(cdr[0], 0.1, 0);
                    }
                    if (cdr[0] > cdr[1]) {
                        const excessCdr = Number(calc(cdr[0], cdr[1], 1) + "e2");
                        if (adaptTyp === "phys") {
                          attackdamage[1] += round(calc(excessCdr, 1.2));
                        } else {
                          ap += round(excessCdr, 2);
                        }
                    }
                }
                if (runeCheck(8233)) {//absolute focus
                    if (getPercentHP(1, "currHp") > getPercentHP(0.7)) {
                        if (adaptTyp === "phys") {
                            const perLvlStat = [3,4,5,7,8,9,10,12,13,14,15,17,18,19,20,22,23,24];
                            attackdamage[1] += perLvlStat[level - 1];
                        } else {
                            const perLvlStat = [5,7,9,11,13,15,17,19,21,24,26,28,30,32,34,36,38,40];
                            ap += perLvlStat[level - 1];
                        }
                    }
                }
                if (runeCheck(8232, true)) {//waterwalking
                    move[1] += 25;
                    if (adaptTyp === "phys") {
                        const perLvlStat = [3,3,4,5,6,7,8,9,10,10,11,12,13,14,15,16,17,18];
                        attackdamage[1] += perLvlStat[level - 1];
                    } else {
                        const perLvlStat = [5,6,7,9,10,12,13,15,16,18,19,21,22,24,25,27,28,30];
                        ap += perLvlStat[level - 1];
                    }
                }
                if (runeCheck(8275, true)) {//Nimbus Cloak
                    move[1] += 100;
                }
                if (runeCheck(8236)) {//gathering storm
                    let stacks = parseInt(document.getElementById(uid + "RNUM8236").value);
                    let totalStacks = 0;
                    if (stacks > 0) {
                        while(stacks !== 0) {
                            totalStacks += stacks;
                            stacks -= 1;
                        }
                    }
                    if (adaptTyp === "phys") {
                        attackdamage[1] += calc(totalStacks, 4.8);
                    } else {
                        ap += totalStacks * 8;
                    }
                }
                if (runeCheck(8021, true)) {//fleet footwork
                    move[2] = calc(0.2, move[2], 0);
                }
                if (runeCheck(8008, true)) {//lethal tempo
                    attackspeed[2] = 999;//uncap atk spd
                    attackspeed[1] = calc(attackspeed[1], Number((4 * level) + 36 + "e-2"), 0);
                }
                if (runeCheck(9923, true)) {//Hail of Blades
                    attackspeed[2] = 999;//uncap atk spd
                    const hobPLvl = [0.75, 0.78, 0.81, 0.84, 0.87, 0.9, 0.93, 0.96, 0.99, 1.01, 1.04, 1.07, 1.1, 1.13, 1.16, 1.19, 1.22, 1.25];
                    attackspeed[1] = calc(attackspeed[1], hobPLvl[level - 1], 0);
                }
                if (runeCheck(9104)) {//legend alacrity
                    let legend = parseInt(document.getElementById(uid + "RNUM9104").value);
                    attackspeed[1] = calc(attackspeed[1], calc(calc(legend, 0.015), 0.03, 0), 0);
                }
                if (runeCheck(9103)) {//legend bloodline
                    let legend = parseInt(document.getElementById(uid + "RNUM9103").value);
                    lifeSteal = calc(lifeSteal, calc(legend, 0.008), 0);
                }
                if (runeCheck(8465, true)) {//guardian
                    move[2] = calc(move[2], 0.2, 0);
                }
                if (runeCheck(8143, true)) {//sudden impact
                    aPen[2] += 10;
                    mPen[1] += 8;
                }
                if (runeCheck(8439, true)) {//aftershock
                    const afterShockPLvl = [70,73,76,79,82,85,88,91,64,96,99,102,105,108,111,114,117,120];
                    armor[1] += afterShockPLvl[level - 1];
                    spellblock[1] += afterShockPLvl[level - 1];
                }
                if (runeCheck(8010, true)) {//conqueror
                    const conquerorPLvl = [6,8,9,11,31,15,16,18,20,21,23,25,26,28,30,32,33,35];
                    attackdamage[1] += conquerorPLvl[level - 1];
                }
                if (runeCheck(8429, true)) {//conditioning
                    armor[1] += 8;
                    spellblock[1] += 8;
                }
                if (runeCheck(8234)) {//celerity
                    move[2] = calc(move[2], 0.015, 0);
                }
                if (runeCheck(8437)) {//Grasp
                    const graspStacks = document.getElementById(uid + "RNUM8437").value;
                    if (stats.attackrange > 200) {
                        hp[1] += 3 * graspStacks;//ranged
                    } else {
                        hp[1] += 5 * graspStacks;
                    }
                }
                if (runeCheck(8472)) {//Chrysalis
                    if (runeCheck(8472, true)) {
                        if (adaptTyp === "phys") {
                            attackdamage[1] += 9;
                        } else {
                            ap += 15;
                        }
                    } else {
                        hp[1] += 50;
                    }
                }
                if (runeCheck(8304)) {//fleet footwork
                    if (checkBoots) {
                        move[1] += 10;
                    }
                }
                if (runeCheck(8226)) {
                    if (partype === theLang.Mana) {
                        const flowStacks = document.getElementById(uid + "RNUM8226").value;
                        mp[1] += flowStacks * 25;
                    }
                }
                if (runeCheck(8010, true)) {// Conqueror
                    const conqDmg = [10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35];
                    attackdamage[1] = calc(conqDmg[level - 1], attackdamage[1], 0);
                }
                if (runeCheck(8014, true)) {// Coup de Grace
                    if (adaptTyp === "phys") {
                        attackdamage[1] = calc(9, attackdamage[1], 0);
                    } else {
                        ap += 15;
                    }
                }
                if (runeCheck(8444, true)) {//Second Wind
                    hpregen[1] = calc(hpregen[1], calc(getPercentHP(0.04, "missHp"), 6, 0), 0);
                }
                if (runeCheck(8124, true)) {// Predator
                    move[2] = calc(move[2], 0.45, 0);
                }
            };
            const setTraitStats = function () {
                if (typeof runePaths[0] === "number" && typeof runePaths[1] === "number") {
                    const pathStats = {
                        0: {//Domination
                            1: {
                                "ap": 20,
                                "ad": 12
                            },
                            2: {
                                "ap": 14,
                                "aSpd": 0.055,
                                "ad": 8.4
                            },
                            3: {
                                "ap": 10,
                                "ad": 6,
                                "hp": [15, 22, 29, 36, 43, 50, 57, 64, 71, 79, 86, 93, 100, 107, 114, 121, 128, 135]
                            },
                            4: {
                                "ap": 20,
                                "ad": 12
                            }
                        },
                        1: {//Inspiration
                            0: {
                                "ap": 22,
                                "ad": 13.2
                            },
                            2: {
                                "aSpd": 0.2
                            },
                            3: {
                                "hp": [35, 51, 66, 82, 97, 113, 129, 144, 160, 175, 191, 206, 222, 238, 253, 269, 284, 300]
                            },
                            4: {
                                "ap": 22,
                                "ad": 13.2
                            }
                        },
                        2: {//Precision
                            0: {
                                "ap": 10,
                                "ad": 6,
                                "aSpd": 0.09
                            },
                            1: {
                                "aSpd": 0.18
                            },
                            3: {
                                "aSpd": 0.09,
                                "hp": [15, 22, 29, 36, 43, 50, 57, 64, 71, 79, 86, 93, 100, 107, 114, 121, 128, 135]
                            },
                            4: {
                                "ap": 10,
                                "ad": 6,
                                "aSpd": 0.09
                            }
                        },
                        3: {//Resolve
                            0: {
                                "ap": 9,
                                "ad": 5.4,
                                "hp": [15, 22, 29, 36, 43, 50, 57, 64, 71, 79, 86, 93, 100, 107, 114, 121, 128, 135]
                            },
                            1: {
                                "hp": [30, 44, 58, 72, 86, 101, 115, 129, 143, 157, 171, 185, 199, 214, 228, 242, 256, 270]
                            },
                            2: {
                                "aSpd": 0.09,
                                "hp": [15, 22, 29, 36, 43, 50, 57, 64, 71, 79, 86, 93, 100, 107, 114, 121, 128, 135]
                            },
                            4: {
                                "ap": 10,
                                "ad": 6,
                                "hp": [15, 22, 29, 36, 43, 50, 57, 64, 71, 79, 86, 93, 100, 107, 114, 121, 128, 135]
                            }
                        },
                        4: {//Sorcery
                            0: {
                                "ap": 20,
                                "ad": 12
                            },
                            1: {
                                "ap": 20,
                                "ad": 12
                            },
                            2: {
                                "ap": 14,
                                "ad": 8.4,
                                "aSpd": 0.055
                            },
                            3: {
                                "ap": 10,
                                "ad": 6,
                                "hp": [15, 22, 29, 36, 43, 50, 57, 64, 71, 79, 86, 93, 100, 107, 114, 121, 128, 135]
                            }
                        }
                    };
                    const finalStats = pathStats[runePaths[0]][runePaths[1]];
                    if (finalStats.ap) {
                        if (adaptTyp === "phys") {
                            attackdamage[1] = calc(attackdamage[1], round(finalStats.ad), 0);
                        } else {
                            ap = calc(ap, finalStats.ap, 0);
                        }
                    }
                    if (finalStats.aSpd) {
                        attackspeed[1] = calc(attackspeed[1], finalStats.aSpd, 0);
                    }
                    if (finalStats.hp) {
                        hp[1] = calc(hp[1], finalStats.hp[level - 1], 0);
                    }
                }
            };
            const setBuffStats = function () {
                const addBuff = function (amount, statName, key, spell) {
                    buffStats[spell + key] = amount;
                    switch (statName) {
                    case "abilityPower":
                        ap = calc(ap, round(amount), 0);
                        break;
                    case "attackdamage":
                        attackdamage[1] = calc(attackdamage[1], round(amount), 0);
                        break;
                    case "attackSpeed":
                        attackspeed[1] = calc(attackspeed[1], Number(amount + "e-2"), 0);
                        break;
                    case "armor":
                        armor[1] = calc(armor[1], round(amount), 0);
                        break;
                    case "baseAd":
                        attackdamage[0] = round(calc(attackdamage[0], round(amount), 0));
                        break;
                    case "baseArmor"://Gnar
                        armor[0] = round(calc(armor[0], round(amount), 0), 1);
                        break;
                    case "basemovespeed":
                        move[0] = calc(move[0], amount, 0);
                        break;
                    case "baseMR"://Gnar
                        spellblock[0] = round(calc(spellblock[0], round(amount), 0));
                        break;
                    case "baseHP"://Kled & Gnar
                        hp[0] = round(calc(hp[0], round(amount), 0));
                        break;
                    case "critChance":
                        crit = calc(crit, amount, 0);
                        break;
                    case "dmgReduction":
                        dmgReduct[0] = calc(dmgReduct[0], amount, 0);
                        dmgReduct[1] = calc(dmgReduct[1], amount, 0);
                        break;
                    case "flatmoveSpeed":
                        move[1] = calc(move[1], round(amount), 0);
                        break;
                    case "flatPhysReduction":
                        dmgReduct[2] += calc(dmgReduct[2], amount, 0);
                        break;
                    case "hp":
                        hp[1] = calc(hp[1], round(amount), 0);
                        break;
                    case "hpregen":
                        hpregen[1] = calc(hpregen[1], round(amount, 2), 0);
                        break;
                    case "lifesteal":
                        lifeSteal = calc(Number(amount + "e-2"), lifeSteal, 0);
                        break;
                    case "magDmgReduction":
                        dmgReduct[0] += calc(dmgReduct[0], amount, 0);
                        break;
                    case "mpregen":
                        mpregen[1] = calc(mpregen[1], round(amount, 2), 0);
                        break;
                    case "mp":
                        mp[1] = calc(mp[1], round(amount), 0);
                        break;
                    case "mr":
                        spellblock[1] = calc(spellblock[1], round(amount), 0);
                        break;
                    case "multiMoveSpeed":
                        move[4] = calc(move[4], Number(amount + "e-2"), 0);
                        break;
                    case "percentArmPen":
                        aPen[0] = calc(aPen[0], amount, 0);
                        break;
                    case "percentmoveSpeed":
                        move[2] = calc(move[2], Number(amount + "e-2"), 0);
                        break;
                    case "physDmgReduction":
                        dmgReduct[1] += calc(dmgReduct[1], amount, 0);
                        break;
                    case "uncapAtkSpd":
                        attackspeed[2] = 999;
                        break;
                    default:
                        console.log(statName);
                    }
                };
                if (buffs) {
                    buffs.forEach(function (b) {
                        if (b.spell === "P" || document.getElementById(uid).getElementsByClassName("spellLvl")[b.spell].value > 0) {
                            if (
                                (b.active && document.getElementById(uid + "Input" + b.spell).checked) ||
                                (b.passiveOnly && !document.getElementById(uid + "Input" + b.spell).checked) ||
                                (!b.active && !b.passiveOnly)
                            ) {
                                addBuff(getValue(b.key, b.spell), b.type, b.key, b.spell);
                            }
                        }
                    });
                }
                //Baron Buff
                if (document.getElementsByClassName("baronActive")[side].checked) {
                    const baronStacks = document.getElementsByClassName("baronTime")[side].value;
                    const baronAD = [24, 25, 26, 27, 29, 30, 31, 32, 33, 34, 35, 37, 38, 39, 40, 41, 42, 43, 45, 46, 48];
                    const baronAP = [40, 42, 44, 46, 48, 50, 51, 53, 55, 57, 59, 61, 63, 65, 67, 69, 70, 72, 74, 76, 80];
                    ap = calc(ap, baronAP[baronStacks - 20], 0);
                    attackdamage[1] = calc(attackdamage[1], baronAD[baronStacks - 20], 0);
                }
                if (document.getElementById(uid).querySelector(".knightsVow").checked) {// knights Vow
                    const reduct = (stats.attackrange > 250) ? 6 : 12;
                    dmgReduct[0] = calc(dmgReduct[0], reduct, 0);
                    dmgReduct[1] = calc(dmgReduct[1], reduct, 0);
                }
            };
            const setStatMultis = function () {
                //Blue Buff
                if (document.getElementById(uid).querySelector(".blueBuff").checked) {
                    cdr[0] = calc(cdr[0], 0.1, 0);
                    mpregen[1] = calc(mpregen[1], 1.05);
                    mpregen[1] = calc(5, mpregen[1], 0);
                    mpregen[2] = calc(mpregen[2], 0.01, 0);
                }
                //HP Multis
                let hpMulti = 0;
                let baseHPMulti = 0;

                if (itemCheck(1401) || itemCheck(1413)) {//cinderhulk jungle enhcantment
                    hpMulti = calc(hpMulti, 0.15, 0);
                }
                if (itemCheck(3193, true)) {// Gargolyes Stoneplate
                    hpMulti = calc(hpMulti, 0.4, 0);
                    baseHPMulti = calc(baseHPMulti, 0.4, 0);
                }
                if (runeCheck(8451)) {// Overgrowth
                    const ogHP = calc(0.002, document.getElementById(uid + "RNUM8451").value);
                    hpMulti = calc(hpMulti, ogHP, 0);
                    baseHPMulti = calc(baseHPMulti, ogHP, 0);
                }

                //Calculate Hp multis
                if (id === "Pyke") {//Pyke Passive
                    hp[1] += round(calc(hp[1], hpMulti));
                    hp[1] += round(calc(hp[0], baseHPMulti));
                    buffStats.Pp1 = calc(attackdamage[1], round(calc(hp[1], 0.07145)), 0);//add to buff key
                    attackdamage[1] = calc(attackdamage[1], round(calc(hp[1], 0.07145)), 0);
                    hp[1] = 0;
                } else {
                    hp[0] += round(calc(hp[0], baseHPMulti));
                    hp[1] += round(calc(hp[1], hpMulti));
                }


                if (runeCheck(8453)) {// revitalize
                    if (getPercentHP(0.4) > getPercentHP(1, "currHp")) {//only lifesteal not hp5
                        lifeSteal = calc(lifeSteal, 1.1);
                    }
                }
                if (itemCheck(3065)) {// Spirit Visage
                    lifeSteal = calc(lifeSteal, 1.3);
                    hpregen[0] = calc(hpregen[0], 1.3);
                    hpregen[1] = calc(hpregen[1], 1.3);
                }

                //Kled Not Mounted
                if (id === "Kled" && !document.getElementById(uid + "InputP").checked) {
                    hp[1] = 0;
                }

                //Calculate Lethality
                aPen[1] = round(calc(aPen[2], calc(0.6, calc(calc(0.4, level), 18, 3), 0)));

                if (itemCheck(3031) || itemCheck(3371)) {// double crit chance from IEdge
                    crit = calc(crit, 2);
                }
                if (id === "Yasuo") {// double crit chance from IEdge
                    crit = calc(crit, 2);
                }

                if (runeCheck(8429, true)) {//conditioning
                    armor[1] += round(calc(armor[0] + armor[1], 0.05));
                    spellblock[1] += round(calc(armor[0] + armor[1], 0.05));
                }
                let apMulti = 0, adMulti = 0;
                //Calculate Final Bonus Movement Speed With Caps
                move[1] = round(calc(getMvSpd(), move[0], 1));
                move[2] = 0;
                if (runeCheck(8234)) {//celerity
                    const bonusMoveSpd = move[1];
                    if (adaptTyp === "phys") {
                        attackdamage[1] += round(calc(bonusMoveSpd, 0.096));
                    } else {
                        ap += round(calc(bonusMoveSpd, 0.16));
                    }
                }
                let vladbonusAP;
                if (id === "Vladimir") {// vlad passive
                    vladbonusAP = round(calc(hp[1], 0.025));
                }
                if (itemCheck(3089) || itemCheck(3374)) {//Rabadons
                  apMulti += 40;
                }
                if (itemCheck(3124)) {//guinsoo
                    const stacks = itemCount(3124);
                    attackdamage[1] = round(calc(attackdamage[1], calc(1, calc(stacks, 0.025), 0)));
                    apMulti += calc(stacks, 2.5);
                    attackspeed[1] = calc(calc(stacks, 0.08), attackspeed[1], 0);
                }

                if (id === "Aatrox" &&
                    document.getElementById(uid + "Input3").checked &&
                    parseInt(document.getElementById(uid).getElementsByClassName("spellLvl")[3].value) > 0){
                        let ultAd = [0.2, 0.225, 0.25];
                        adMulti = calc(adMulti, ultAd[document.getElementById(uid).getElementsByClassName("spellLvl")[3].value - 1], 0);
                }
                if (id === "Nunu") {// nunu blood boil ap multiplier
                    if (document.getElementById(uid + "Input1").checked) {
                        const spellLvl = document.getElementById(uid).getElementsByClassName("spellLvl")[1].value;
                        if (spellLvl > 0) {
                            const nunuAPCap = 20 + (20 * spellLvl);
                            if (ap * 0.2 > nunuAPCap) {
                                ap += nunuAPCap;
                            } else {
                                apMulti += 20;
                            }
                        }
                    }
                }
                //put in infernal drakes
                const infernalStacks = document.getElementsByClassName("infernalCount")[side].value;
                if (document.getElementsByClassName("elderActive")[side].checked) {
                    adMulti = calc(adMulti, calc(infernalStacks, 0.12), 0);
                    apMulti += infernalStacks * 12;
                } else {
                    adMulti = calc(adMulti, calc(infernalStacks, 0.08), 0);
                    apMulti += infernalStacks * 8;
                }
                //Calculate Multipliers
                attackdamage[1] = attackdamage[1] + round(calc(adMulti, calc(attackdamage[0], attackdamage[1], 0)));
                ap = round(calc(ap, Number(100 + apMulti + "e-2")));

                if (id === "Vladimir") {// vlad passive
                    hp[1] += round(calc(ap, 1.4));
                    ap += calc(vladbonusAP, Number(100 + apMulti + "e-2"));
                }
            };
            const setDebuffs = function () {// stat reductions
                let perArmorReduct = 0, flatMRReduct = 0;

                if (document.getElementById(uid).querySelector(".cleaver").value > 0) {// cleaver
                    perArmorReduct = calc(perArmorReduct, document.getElementById(uid).querySelector(".cleaver").value, 0);
                }
                if (document.getElementById(uid).querySelector(".wits").value > 0) {// wits end
                    flatMRReduct = calc(flatMRReduct, document.getElementById(uid).querySelector(".wits").value, 0);
                }

                //Attack Speed Reductions
                let aSpdReduction = 1;
                if (document.getElementById(uid).querySelector(".frozenHeart").checked) {// frozen heart
                    aSpdReduction = calc(aSpdReduction, 0.85);
                }
                if (document.getElementById(uid).querySelector(".coldSteel").checked) {// cold steel passive
                    aSpdReduction = calc(aSpdReduction, 0.85);
                }
                if (aSpdReduction < 1) {
                    attackspeed[0] = calc(attackspeed[0], aSpdReduction);
                    attackspeed[1] = calc(attackspeed[1], aSpdReduction);
                }

                // Flat Reductions
                if (flatMRReduct > 0) {
                    spellblock[0] = round(calc(spellblock[0], calc(flatMRReduct, calc(spellblock[0], spellblock[0] + spellblock[1], 3)), 1));
                    spellblock[1] = round(calc(spellblock[1], calc(flatMRReduct, calc(spellblock[1], spellblock[0] + spellblock[1], 3)), 1));
                }

                // Percent Reductions
                if (perArmorReduct > 0) {
                    armor[0] = round(calc(armor[0], calc(1, perArmorReduct, 1)));
                    armor[1] = round(calc(armor[1], calc(1, perArmorReduct, 1)));
                }
            };
            setLevel();
            setBaseStats();
            setItemStats();
            setRuneStats();
            setTraitStats();
            setBuffStats();
            setStatMultis();
            setDebuffs();
        },
        addItem = function (itemNo) {
            let itemDOM = document.getElementById(uid).getElementsByClassName("champItems")[0];
            if (theItems[itemNo] && items.length < 6 && !(theItems[itemNo].tags.includes("Boots") && checkBoots())) {
                const toogleItems = [//items that require check boxes
                    3800,
                    2065,
                    3001,
                    3379,
                    3285,
                    3145,
                    3303,
                    3098,
                    3092,
                    2301,
                    1402,
                    1410,
                    1414,
                    3100,
                    3384,
                    3025,
                    3078,
                    3057,
                    2015,
                    3087,
                    3094,
                    3134,
                    3147,
                    3742,
                    2031,
                    2032,
                    2033,
                    2003,
                    3194,
                    3174,
                    3252,
                    3211,
                    1054,
                    3193,
                    3095,
                    3508,
                    3109
                ];
                const maxValue = {//items that require number inputs
                    1082 : 10,
                    3041 : 25,
                    3091 : 5,
                    3124 : 6,
                    3027 : 10,
                    3151 : 5,
                    3136 : 5,
                    3907 : 100
                };
                let theDiv = document.createElement("div"),
                    theImg = document.createElement("img");
                theImg.src = "http://ddragon.leagueoflegends.com/cdn/" + patch + "/img/item/" + itemNo + ".png";
                const itemSlotNo = items.length;
                const priceDOM = document.getElementById(uid).querySelector(".priceBx");
                let price = parseInt(document.getElementById(uid).querySelector(".priceBx").innerText);
                priceDOM.innerText = price + theItems[itemNo].gold.total;
                theImg.addEventListener("click", function (e) {// remove item
                    let currSlotNo = itemSlotNo;
                    while (items[currSlotNo] !== itemNo) {
                        currSlotNo -= 1;
                    }
                    document.getElementById(uid).getElementsByClassName("itemIcon")[currSlotNo].remove();
                    items.splice(currSlotNo, 1);
                    if (items.indexOf(itemNo) >= currSlotNo) {
                        if (toogleItems.includes(itemNo) || maxValue[itemNo]) {
                            let theInput = document.createElement("input");
                            theInput.id = uid + itemNo;
                            theInput.type = (maxValue[itemNo]) ? "number" : "checkbox";
                            theInput.addEventListener("change", update);
                            if (maxValue[itemNo]) {
                                theInput.min = 0;
                                theInput.value = 0;
                                theInput.max = maxValue[itemNo];
                            }
                            document.getElementById(uid).getElementsByClassName("itemIcon")[items.indexOf(itemNo)].appendChild(theInput);
                        }
                    }
                    price = parseInt(document.getElementById(uid).querySelector(".priceBx").innerText);
                    priceDOM.innerText = price - theItems[itemNo].gold.total;
                    hideHover();
                    update();
                });
                theImg.addEventListener("mouseover", function (e) {
                    let description = theItems[itemNo].name + "<hr>";
                    description += theItems[itemNo].description.replace(/size='\d*'/g, "");
                    if (theItems[itemNo].from) {
                        description += "<hr><h4>" + theLang.Require_ + "</h4>";
                        theItems[itemNo].from.forEach(function (theItemNo) {
                            description += "<img src ='http://ddragon.leagueoflegends.com/cdn/" + patch + "/img/item/" + theItemNo + ".png'>";
                        });
                    }
                    if (theItems[itemNo].into) {
                        description += "<hr><h4>" + theLang.Builds_ + "</h4>";
                        theItems[itemNo].into.forEach(function (theItemNo) {
                            description += "<img src ='http://ddragon.leagueoflegends.com/cdn/" + patch + "/img/item/" + theItemNo + ".png'>";
                        });
                    }
                    showHover(description, e.pageX, e.pageY);
                });
                theImg.addEventListener("mouseout", hideHover);
                theDiv.appendChild(theImg);
                if (!items.includes(itemNo) && (toogleItems.includes(itemNo) || maxValue[itemNo])) {
                    let theInput = document.createElement("input");
                    theInput.id = uid + itemNo;
                    theInput.type = (maxValue[itemNo]) ? "number" : "checkbox";
                    theInput.addEventListener("change", update);
                    if (maxValue[itemNo]) {
                        theInput.min = 0;
                        theInput.value = 0;
                        theInput.max = maxValue[itemNo];
                    }
                    theDiv.appendChild(theInput);
                }
                theDiv.classList.add("itemIcon");
                itemDOM.appendChild(theDiv);
                items.push(itemNo);
            }
        },
        drawChampDOM = function () {
            const
                home = document.getElementById("champs" + side),
                champDOM = document.getElementsByTagName("template")[0].content.cloneNode(true);
            let champDiv = document.createElement("div");
            champDiv.id = uid;
            champDiv.classList.add("champBox");
            champDiv.appendChild(champDOM);
            home.appendChild(champDiv);

            let finalDOM = document.getElementById(uid);
            finalDOM.getElementsByTagName("h2")[0].innerText = name;
            finalDOM.querySelector(".champHead").style.backgroundImage = "url('http://ddragon.leagueoflegends.com/cdn/" + patch + "/img/champion/" + image.full + "')";

            let skillDesc = finalDOM.getElementsByClassName("skillDesc");

            Array.from(skillDesc).forEach(function (theNode, index) {
                let inputDiv = document.getElementById(uid).getElementsByClassName("skillInput")[index - 1];
                let numDiv = document.getElementById(uid).getElementsByClassName("skillNum")[index - 1];
                switch (index) {
                case 0:
                    //theNode.getElementsByTagName("h3")[0].innerText = theLang.Attack;
                    break;
                case 1:
                    theNode.getElementsByTagName("h3")[0].innerText = passive.name;
                    if (sInfoP && sInfoP.active) {
                        let activeDOM = document.createElement("input");
                        activeDOM.id = uid + "InputP";
                        activeDOM.type = "checkbox";
                        activeDOM.addEventListener("change", update);
                        inputDiv.innerText = theLang.Active + " ";
                        inputDiv.appendChild(activeDOM);
                    }
                    if (sInfoP && sInfoP.input) {
                        let numDOM = document.createElement("input");
                        numDOM.id = uid + "SpellNumP";
                        numDOM.type = "number";
                        numDOM.value = 0;
                        numDOM.min = 0;
                        if (sInfoP.input.max) {
                            numDOM.max = sInfoP.input.max;
                        }
                        numDOM.addEventListener("change", update);
                        numDiv.appendChild(numDOM);
                    }
                    break;
                default:
                    theNode.getElementsByTagName("h3")[0].innerText = spells[index - 2].name;
                    if (myChamps[uid]["sInfo" + (index - 2)] && myChamps[uid]["sInfo" + (index - 2)].active) {
                        let activeDOM = document.createElement("input");
                        activeDOM.id = uid + "Input" + (index - 2);
                        activeDOM.type = "checkbox";
                        activeDOM.addEventListener("change", update);
                        inputDiv.innerText = theLang.Active + " ";
                        inputDiv.appendChild(activeDOM);
                    }
                    if (myChamps[uid]["sInfo" + (index - 2)] && myChamps[uid]["sInfo" + (index - 2)].input) {
                        let numDOM = document.createElement("input");
                        numDOM.id = uid + "SpellNum" + (index - 2);
                        numDOM.type = "number";
                        numDOM.value = 0;
                        numDOM.min = 0;
                        if (myChamps[uid]["sInfo" + (index - 2)].input.max) {
                            numDOM.max = myChamps[uid]["sInfo" + (index - 2)].input.max;
                        }
                        numDOM.addEventListener("change", update);
                        numDiv.appendChild(numDOM);
                    }
                }
            });

            let skillImg = finalDOM.getElementsByClassName("skillImg");

            Array.from(skillImg).forEach(function (theNode, index) {
                switch (index) {
                case 0:
                    break;
                case 1:
                    theNode.getElementsByTagName("img")[0].src = "http://ddragon.leagueoflegends.com/cdn/" + patch + "/img/passive/" + passive.image.full;
                    break;
                default:
                    theNode.getElementsByTagName("img")[0].src = "http://ddragon.leagueoflegends.com/cdn/" + patch + "/img/spell/" + spells[index - 2].image.full;
                    if (index !== 5 && spells[0].maxrank !== 5) {
                        theNode.getElementsByTagName("input")[0].max = spells[index - 2].maxrank;
                    }
                    if (index === 5 && spells[3].maxrank !== 3) {
                        theNode.getElementsByTagName("input")[0].max = spells[3].maxrank;
                        if (spells[3].maxrank === 4 || spells[3].maxrank === 1) {
                            theNode.getElementsByTagName("input")[0].min = 1;
                            theNode.getElementsByTagName("input")[0].value = 1;
                        }
                    }
                }
                theNode.getElementsByTagName("img")[0].addEventListener("click", function () {
                    Array.from(skillDesc).forEach(function (box, count) {
                        box.style.display = "none";
                        if (count === index) {
                            box.style.display = "block";
                        }
                    });
                }, false);
            });

            finalDOM.querySelector(".killBtn").addEventListener("click", function () {//delete champion
                finalDOM.remove();// remove main div
                const selectId = "enemy" + (1 - side);
                Array.from(document.getElementById(selectId)).find(function (option) {// remove option from enemy select
                    return option.value === uid;
                }).remove();
                delete myChamps[uid];// remove object
                update();
            }, false);

            finalDOM.querySelector(".cloneBtn").addEventListener("click", function () {//clone current champion
                const newUid = newUID();
                myChamps[newUid] = champObj({id, image, name, partype, passive, spells, stats}, side, newUid);
                if (runePaths[0] !== "") {
                    const myRunes = getRuneHash().substr(1).split("&");
                    myChamps[newUid].importRunes(myRunes[0], myRunes[1]);
                }
                myChamps[newUid].drawChampDOM();
                myChamps[newUid].drawRuneDOM();
                Array.from(document.getElementById(uid).getElementsByClassName("spellLvl")).forEach(function (input, index) {
                    document.getElementById(newUid).getElementsByClassName("spellLvl")[index].value = input.value;
                });
                document.getElementById(newUid).querySelector(".champLevel").value = document.getElementById(uid).querySelector(".champLevel").value;
                items.forEach(function (itemNo) {
                    myChamps[newUid].addItem(itemNo);
                });
                update();
            }, false);

            finalDOM.querySelector(".dropBtn").addEventListener("click", function () {
                let element = finalDOM.getElementsByClassName("dropPanel")[0];
                if (element.style.display === "block") {
                    element.style.display = "none";
                } else {
                    element.style.display = "block";
                }
            }, false);

            // Change Drop Box Divs

            let dropBtns = document.getElementById(uid).querySelector(".dropTBar");
            const btnLabels = [theLang.categoryItem, theLang.categoryRune, theLang.SpecialRecipeLarge];

            btnLabels.forEach(function (label, index) {
                let myBtn = document.createElement("button");
                myBtn.innerText = label;
                myBtn.addEventListener("click", function () {
                    let dropDiv = document.getElementById(uid).getElementsByClassName("dropContent");
                    Array.from(dropDiv).forEach(function (div, divIndex) {
                        if (divIndex === index) {
                            div.style.display = "block";
                        } else {
                            div.style.display = "none";
                        }
                    });
                });
                dropBtns.appendChild(myBtn);
            });

            // Add Item Categories
            let catsDOM = finalDOM.querySelector(".itemCats"),
                catsFrag = document.createDocumentFragment();
            const theCats = [
                "AllItems",
                "SpellDamage",
                "Armor",
                "ArmorPenetration",
                "AttackSpeed",
                "Boots",
                "CooldownReduction",
                "Consumable",
                "CriticalStrike",
                "Damage",
                "Health",
                "HealthRegen",
                "LifeSteal",
                "MagicPenetration",
                "SpellBlock",
                "Mana",
                "ManaRegen",
                "NonbootsMovement"
            ];
            theCats.forEach(function (cat) {
                let theOption = document.createElement("option");
                theOption.value = cat;
                theOption.innerText = theLang[cat];
                catsFrag.appendChild(theOption);
            });
            catsDOM.appendChild(catsFrag);

            // Add item map options
            const itemMap = [[theLang.Map1, 11], [theLang.Map10, 10], [theLang.Map12, 12]];
            let mapDOM = finalDOM.querySelector(".itemMaps"),
                mapFrag = document.createDocumentFragment();
            itemMap.forEach(function (map) {
                let theOption = document.createElement("option");
                theOption.value = map[1];
                theOption.innerText = map[0];
                mapFrag.appendChild(theOption);
            });
            mapDOM.appendChild(mapFrag);
            const searchDOM = finalDOM.querySelector(".itemSearch");

            //Add event handlers to image filtering
            let itemFilters = [
                searchDOM,
                catsDOM,
                mapDOM
            ];
            itemFilters.forEach(function (theNode) {
                theNode.addEventListener("input", function () {
                    const
                        theCat = catsDOM.value,
                        query = new RegExp(searchDOM.value, "i"),
                        map = mapDOM.value;
                    let itemBox = finalDOM.querySelector(".items"),
                        docFrag = document.createDocumentFragment();

                    sortedItems.forEach(function (itemNo) {
                        if (
                            theItems[itemNo].name.search(query) > -1 &&
                            theItems[itemNo].tags.indexOf("Trinket") === -1 &&
                            theItems[itemNo].hideFromAll === undefined &&
                            theItems[itemNo].consumed === undefined &&
                            (theCat === "AllItems" || theItems[itemNo].tags.includes(theCat)) &&
                            (theItems[itemNo].inStore === undefined || theItems[itemNo].specialRecipe) &&
                            theItems[itemNo].maps[map] &&
                            (theItems[itemNo].requiredChampion === undefined || theItems[itemNo].requiredChampion === name)
                        ) {
                            let theImg = document.createElement("img");
                            theImg.src = "http://ddragon.leagueoflegends.com/cdn/" + patch + "/img/item/" + itemNo + ".png";
                            theImg.addEventListener("click", function () {
                                addItem(parseInt(itemNo));
                                update();
                            });
                            theImg.addEventListener("mouseover", function (e) {
                                let description = theItems[itemNo].name + "<hr>";
                                description += theItems[itemNo].description.replace(/size='\d*'/g, "");
                                if (theItems[itemNo].from) {
                                    description += "<hr><h4>" + theLang.Require_ + "</h4>";
                                    theItems[itemNo].from.forEach(function (theItemNo) {
                                        description += "<img src ='http://ddragon.leagueoflegends.com/cdn/" + patch + "/img/item/" + theItemNo + ".png'>";
                                    });
                                }
                                if (theItems[itemNo].into) {
                                    description += "<hr><h4>" + theLang.Builds_ + "</h4>";
                                    theItems[itemNo].into.forEach(function (theItemNo) {
                                        description += "<img src ='http://ddragon.leagueoflegends.com/cdn/" + patch + "/img/item/" + theItemNo + ".png'>";
                                    });
                                }
                                showHover(description, e.pageX, e.pageY);
                                items.push(parseInt(itemNo));
                                update();
                                items.pop();
                            });
                            theImg.addEventListener("mouseout", function() {
                                hideHover();
                                update();
                            });
                            docFrag.appendChild(theImg);
                        }
                    });
                    while (itemBox.hasChildNodes()) {
                        itemBox.removeChild(itemBox.lastChild);
                    }
                    itemBox.appendChild(docFrag);
                }, false);
            });

            //trigger event to build items for the first time
            let drawItems = new CustomEvent(
                "input",
                {
                    detail: "Build Items"
                }
            );
            catsDOM.dispatchEvent(drawItems);
            finalDOM.querySelector(".levelTxt").innerText = theLang.Level;

            // add elixirs

            const elixirID = [2138, 2139, 2140];
            elixirID.forEach(function (id) {
                let elixOpt = document.createElement("option");
                elixOpt.innerText = theItems[id].name;
                elixOpt.value = id;
                finalDOM.querySelector(".slctElix").appendChild(elixOpt);
            });

            //add enemy select option

            let champOpt = document.createElement("option");
            champOpt.innerText = name;
            champOpt.value = uid;

            document.getElementById("enemy" + (1 - side)).appendChild(champOpt);
        },
        importRunes = function (runeHash0, runeHash1) {
            runePaths[0] = parseInt(runeHash0.charAt(0));
            runes[0].push(theRunes[runeHash0.charAt(0)].slots[0].runes[runeHash0.charAt(1)].id);
            runes[0].push(theRunes[runeHash0.charAt(0)].slots[1].runes[runeHash0.charAt(2)].id);
            runes[0].push(theRunes[runeHash0.charAt(0)].slots[2].runes[runeHash0.charAt(3)].id);
            runes[0].push(theRunes[runeHash0.charAt(0)].slots[3].runes[runeHash0.charAt(4)].id);
            if (runeHash1) {
                runePaths[1] = parseInt(runeHash1.charAt(0));
                runes[1].push(theRunes[runeHash1.charAt(0)].slots[runeHash1.charAt(1)].runes[runeHash1.charAt(2)].id);
                runes[1].push(theRunes[runeHash1.charAt(0)].slots[runeHash1.charAt(3)].runes[runeHash1.charAt(4)].id);
            }
        },
        getRuneInfo = function (rank, runeNo) {
            let runeID = runes[rank][runeNo],
                slotIndex, runeIndex = -1;

            const findRune = function () {
                return theRunes[runePaths[rank]].slots[slotIndex].runes.findIndex(function (rune) {
                    return rune.id === runeID;
                });
            };
            if (rank === 0) {
                slotIndex = runeNo;
                runeIndex = findRune();
            } else {
                slotIndex = 0;
                while (runeIndex === -1) {
                    slotIndex += 1;
                    runeIndex = findRune();
                }
            }
            return [slotIndex, runeIndex];
        },
        drawRuneDOM = function () {
            const runeDOM = [
                document.getElementById(uid).getElementsByClassName("runes")[0],
                document.getElementById(uid).getElementsByClassName("runes")[1]
            ];
            const drawRuneSelect = function (rank, slotNo) {
                const runeSelectDOM = document.getElementById(uid).getElementsByClassName("runeSelect")[rank];
                const drawRuneSlot = function (slotObj) {
                    slotObj.forEach(function (rune) {
                        let singleRuneDiv = document.createElement("div");
                        singleRuneDiv.classList.add("runeDiv");
                        let runeImg = document.createElement("img");
                        runeImg.src = "https://ddragon.leagueoflegends.com/cdn/img/" + rune.icon;
                        runeImg.addEventListener("click", function () {
                            hideHover();
                            runes[rank][slotNo] = rune.id;
                            drawRune(rank, slotNo);
                            runeSelectDOM.style.display = "none";
                            runeDOM[rank].style.display = "block";
                            update();
                        });
                        runeImg.addEventListener("mouseover", function (e) {
                            const runeDesc = rune.name + "<br>" + rune.longDesc;
                            showHover(runeDesc, e.pageX, e.pageY);
                        });
                        runeImg.addEventListener("mouseout", hideHover);
                        singleRuneDiv.appendChild(runeImg);
                        runeSelectDOM.appendChild(singleRuneDiv);
                    });
                };
                while (runeSelectDOM.hasChildNodes()) {
                    runeSelectDOM.removeChild(runeSelectDOM.lastChild);
                }
                let theSlots = [];
                if (rank === 0) {
                    theSlots.push(slotNo);
                } else {
                    theSlots.push(getRuneInfo(rank, slotNo)[0]);
                    const excludeRuneSlot = getRuneInfo(rank, 1 - slotNo)[0];
                    let i = 1;
                    while (theSlots.length === 1) {
                        if (!theSlots.includes(i) && i !== excludeRuneSlot) {
                            theSlots.push(i);
                        }
                        i += 1;
                    }
                }
                theSlots.forEach(function (slot) {
                    drawRuneSlot(theRunes[runePaths[rank]].slots[slot].runes);
                });
                runeDOM[rank].style.display = "none";
                runeSelectDOM.style.display = "block";
            };
            const drawRune = function (rank, slotNo) {
                const checkBox = [8112,8124,8128,8126,8143,8005,8008,8010,8437,8242,8429,8214,8472,8229,8210,8014,8439,8237,8232,8021,8230,8465,8410,8473,9923,8275,8444,8136];
                const number = {
                    9103: 10,
                    9104: 10,
                    8437: 99,
                    8451: 999,
                    8243: 5,
                    8128: 999,
                    8138: 20,
                    8236: 12,
                    8226: 10,
                    8106: 6,
                };

                const runeInfo = getRuneInfo(rank, slotNo);
                const runeObj = theRunes[runePaths[rank]].slots[runeInfo[0]].runes[runeInfo[1]];

                let runeImg = document.createElement("img");
                runeImg.src = "https://ddragon.leagueoflegends.com/cdn/img/" + runeObj.icon;
                runeImg.addEventListener("click", function () {
                    hideHover();
                    drawRuneSelect(rank, slotNo);
                });
                runeImg.addEventListener("mouseover", function (e) {
                    const runeDesc = runeObj.name + "<br>" + runeObj.longDesc;
                    showHover(runeDesc, e.pageX, e.pageY);
                });
                runeImg.addEventListener("mouseout", hideHover);

                let singleRuneDiv;
                if (runeDOM[rank].childElementCount === (slotNo + 1)) {
                    singleRuneDiv = document.createElement("div");
                    singleRuneDiv.classList.add("runeDiv");
                } else {
                    singleRuneDiv = runeDOM[rank].children[slotNo + 1];
                    while (singleRuneDiv.hasChildNodes()) {
                        singleRuneDiv.removeChild(singleRuneDiv.lastChild);
                    }
                }
                singleRuneDiv.appendChild(runeImg);
                singleRuneDiv.appendChild(document.createElement("br"));
                if (checkBox.includes(runeObj.id)) {
                    let runeCB = document.createElement("input");
                    runeCB.type = "checkbox";
                    runeCB.id = uid + "RCB" + runeObj.id;
                    runeCB.addEventListener("change", update);
                    singleRuneDiv.appendChild(runeCB);
                }
                if (number[runeObj.id]) {
                    let runeNUM = document.createElement("input");
                    runeNUM.type = "number";
                    runeNUM.value = 0;
                    runeNUM.min = 0;
                    runeNUM.max = number[runeObj.id];
                    runeNUM.id = uid + "RNUM" + runeObj.id;
                    runeNUM.addEventListener("change", update);
                    singleRuneDiv.appendChild(runeNUM);
                }
                if (runeDOM[rank].childElementCount === (slotNo + 1)) {// add new div
                    runeDOM[rank].appendChild(singleRuneDiv);
                }

                //ADD UPDATES
            };
            const drawAllRunes = function (rank) {
                while (runeDOM[rank].hasChildNodes()) {
                    runeDOM[rank].removeChild(runeDOM[rank].lastChild);
                }
                //Draw Path Div
                const thePath = runePaths[rank];
                let pathDiv = document.createElement("div");
                pathDiv.classList.add("runeDiv");
                let pathImg = document.createElement("img");
                pathImg.addEventListener("click", function () {
                    drawPaths(rank);
                });
                pathImg.src = "https://ddragon.leagueoflegends.com/cdn/img/" + theRunes[thePath].icon;
                pathDiv.appendChild(pathImg);
                runeDOM[rank].appendChild(pathDiv);

                //Draw Rune Img
                runes[rank].forEach(function (runeID, slotNo) {
                    drawRune(rank, slotNo);
                });
            };
            const setNewPath = function (rank) {
                const path = runePaths[rank];
                runes[rank] = [];
                theRunes[path].slots.forEach(function (slot, slotNo) {
                    if (!(rank === 1 && (slotNo === 0 || slotNo === 3))) {
                        runes[rank].push(slot.runes[0].id);
                    }
                });
                if (rank === 0 && (runePaths[1] === runePaths[0] || !runePaths[1]) ) {
                    drawPaths(1);
                }
                drawAllRunes(rank);
            };
            const drawPaths = function (rank) {
                while (runeDOM[rank].hasChildNodes()) {
                    runeDOM[rank].removeChild(runeDOM[rank].lastChild);
                }
                runePaths[rank] = "";
                runes[rank] = [];
                runeDOM[rank].style.display = "block";
                document.getElementById(uid).getElementsByClassName("runeSelect")[rank].style.display = "none";// Hide rune select
                theRunes.forEach(function (path, pathNo) {
                    if (rank === 0 || (pathNo !== runePaths[0])) {
                        let pathImg = document.createElement("img");
                        let pathDiv = document.createElement("div");
                        pathDiv.classList.add("runeDiv");
                        pathImg.src = "https://ddragon.leagueoflegends.com/cdn/img/" + path.icon;
                        pathImg.addEventListener("click", function () {
                            hideHover();
                            runePaths[rank] = pathNo;
                            setNewPath(rank);
                            update();
                        });
                        pathImg.addEventListener("mouseover", function (e) {
                            showHover(path.name, e.pageX, e.pageY);
                        });
                        pathImg.addEventListener("mouseout", hideHover);
                        pathDiv.appendChild(pathImg);
                        runeDOM[rank].appendChild(pathDiv);
                    }
                });
            };
            if (runePaths.length > 0) {// Runes exist from import
                drawAllRunes(0);
                if (runePaths.length > 1) {
                    drawAllRunes(1);
                } else {
                    drawPaths(1);
                }
            } else {
                drawPaths(0);
            }
        },
        drawStats = function () {
            let theLi, oldMaxHP, oldCurrentHP;
            let statBox = document.getElementById(uid).getElementsByClassName("statList")[0],
                frag = document.createDocumentFragment();
            const maxHp = getPercentHP(1);
            if (document.getElementById(uid + "HP")) {
                oldMaxHP = parseInt(document.getElementById(uid + "HP").max);
                oldCurrentHP = parseInt(document.getElementById(uid + "HP").value);
            } else {
                oldMaxHP = maxHp;
                oldCurrentHP = maxHp;
            }
            while (statBox.childElementCount > 1) {
                statBox.removeChild(statBox.lastChild);
            }
            theLi = document.createElement("li");
            theLi.innerText = theLang.Health + ": ";
            let theInput = document.createElement("input");
            theInput.type = "number";
            theInput.min = 0;
            theInput.max = maxHp;
            theInput.value = oldCurrentHP + ((maxHp) - oldMaxHP);
            theInput.addEventListener("change", update);
            theInput.id = uid + "HP";
            theLi.appendChild(theInput);
            let theSpan = document.createElement("span");
            theSpan.innerText = "/" + (maxHp);
            theLi.appendChild(theSpan);
            frag.appendChild(theLi);

            let statList = [];
            let theCdr = (cdr[0] > cdr[1]) ? cdr[1] : cdr[0];
            let totalAtkSpd;
            if (id === "Jhin") {
                totalAtkSpd = round(attackspeed[0], 3);
            } else {
                totalAtkSpd = round(calc(attackspeed[0], calc(1, attackspeed[1], 0)), 3);
                if (totalAtkSpd > attackspeed[2]) {
                    totalAtkSpd = attackspeed[2];
                }
            }
            const critTotal = (crit > 1 && id !== "Ashe") ? 100 : Number(crit + "e2");
            const resistTooltip = function (resist, resistStr) {
                const totalResist = resist[0] + resist[1];
                let percentResist, recoHP;
                if (totalResist >= 0) {
                    percentResist = calc(2, calc(100, calc(100, totalResist, 0), 3), 1);
                } else {
                    percentResist = calc(2, calc(2, calc(100, calc(100, totalResist, 1), 3), 1), 1);
                }
                const effHP = round(calc(maxHp, percentResist));
                let tooltip = "<span class='heal'>" + (resist[0] + resist[1]) + "</span> (" +resist[0] + " + <span class='heal'>" + resist[1] + "</span>)<br>";
                tooltip += theLang.reduction + ": " + Number(round(calc(percentResist, 1, 1), 3) + "e2") + "%<br>";
                tooltip += "Effective " + theLang.Health + ": " + effHP + "<br>";
                if (resistStr === theLang.Armor) {
                    recoHP = calc(7.5, (totalResist + 100));
                } else {
                    recoHP = calc(6.75, (totalResist + 100));
                }
                const recoStat = (recoHP > (hp[0] + hp[1])) ? theLang.Health : resistStr;
                tooltip += theLang.RecommendedItems.replace(theLang.categoryItem, "") + ": " + recoStat;
                return tooltip;
            };
            statList.push(
                [theLang.HealthRegen, round(calc(calc(hpregen[0], calc(1, hpregen[2], 0)), hpregen[1], 0), 1)],
                [theLang.Armor, armor[0] + armor[1], resistTooltip(armor, theLang.Armor)],
                [theLang.SpellBlock, spellblock[0] + spellblock[1], resistTooltip(spellblock, theLang.SpellBlock)],
                [theLang.AttackDamage, attackdamage[0] + attackdamage[1]],
                [theLang.AttackSpeed, totalAtkSpd],
                [theLang.CriticalStrike, critTotal + "%"],
                [theLang.LifeSteal, Number(lifeSteal + "e2") + "%"],
                [theLang.SpellDamage, ap],
                [theLang.CooldownReduction, Number(theCdr + "e2") + "%"],
                [theLang.Movement, calc(move[0], move[1], 0)]
            );
            if (partype === theLang.Mana) {
                statList.push(
                    [partype, mp[0] + mp[1]],
                    [theLang.ManaRegen, calc(calc(mpregen[0], calc(1, mpregen[2], 0)), mpregen[1], 0)]
                );
            } else if (mpregen[0] > 0) {//energy
                statList.push(
                    [partype, mp[0]],
                    [theLang.ManaRegen, round(calc(calc(mpregen[0], calc(1, mpregen[2], 0)), mpregen[1], 0), 1)]
                );
            } else if (mp[0] > 0) {
                statList.push(
                    [partype, mp[0]]
                );
            }
            statList.forEach(function (stat) {
                theLi = document.createElement("li");
                if (stat[2]) {
                    theLi.innerHTML = "<span style='text-decoration: underline;text-decoration-style:dotted;'>" + stat[0] + ": " + stat[1] + "</span>";
                    theLi.addEventListener("mouseover", function (e) {
                        showHover(stat[2], e.pageX, e.pageY);
                    });
                    theLi.addEventListener("mouseout", hideHover);
                } else {
                    theLi.innerText = stat[0] + ": " + stat[1];
                }
                frag.appendChild(theLi);
            });
            statBox.appendChild(frag);
        },
        drawSkillTxt = function () {
            const refineTtip = function (spellNo) {
                let riotObj, spellLvl;
                if (spellNo !== "P" && spellNo !== "Attack") {
                    riotObj = spells[spellNo];
                    spellLvl = document.getElementById(uid).getElementsByClassName("spellLvl")[spellNo].value;
                    spellLvl = (spellLvl < 1)
                        ? 0
                        : spellLvl - 1;
                }
                const getCrit = function (dmg, critAmount, isBasicAttack, noSR) {
                    let critMulti;
                    if (itemCheck(3095, true) && isBasicAttack && id !== "Ashe" && !noSR) {//stormrazor
                        const razorBonusMulti = (crit >= 0.3) ? 0.4: round(calc(crit, 1.333333), 3);
                        critMulti = calc(1.6, razorBonusMulti, 0);
                    } else {
                        critMulti = Number(critAmount + "e-2");
                    }
                    if (enemyUID) {
                        critMulti = myChamps[enemyUID].takeCritMulti(critMulti);
                    }
                    return calc(dmg, critMulti);
                };
                const getDPS = function (dmg, frequency = 1) {
                    let dps = [];
                    let totalAtkSpd = calc(attackspeed[0], calc(1, attackspeed[1], 0));
                    if (totalAtkSpd > attackspeed[2]) {
                        totalAtkSpd = attackspeed[2];
                    }
                    if (id === "Jhin") {//add in 2.5secs downtime
                        totalAtkSpd = calc(calc(attackspeed[1], 0.625, 0), 2, 3);
                    }
                    totalAtkSpd = calc(totalAtkSpd, frequency, 3);
                    dmg.forEach(function (value) {
                        dps.push(calc(value, totalAtkSpd));
                    });
                    return dps;
                };
                const avgCritDmg = function (baseDmg, critDmg) {
                    let avgDmg = [];
                    baseDmg.forEach(function (value, index) {
                        let critChance = (crit > 1) ? 1 : crit;
                        if (id === "Jhin") {
                            critChance = calc(0.25, calc(critChance, 0.75), 0);
                        }
                        avgDmg.push(calc(calc(critDmg[index], critChance), calc(value, calc(1, critChance, 1)), 0));
                    });
                    return avgDmg;
                };
                const sortDmg = function (dmg, type) {
                    let magDmg = 0, physDmg = 0, truDmg = 0;
                    switch (type) {
                    case "phys":
                        physDmg = dmg;
                        break;
                    case "mag":
                        magDmg = dmg;
                        break;
                    case "tru":
                        truDmg = dmg;
                        break;
                    case "hybrid":
                        physDmg = calc(dmg, 0.5);
                        magDmg = calc(dmg, 0.5);
                        break;
                    case "corkiAuto":
                        physDmg = calc(dmg, 0.2);
                        magDmg = calc(dmg, 0.8);
                    break;
                    }
                    return [physDmg, magDmg, truDmg];
                };
                const getDmg = function (rawDmg, spellObj, isCrit = false, isTick = false, noProc = false) {
                    let resistedDmg, truDmg = 0;
                    let myDmg = (spellObj.basicAttack && enemyUID) ? myChamps[enemyUID].takeBasicAtk(rawDmg) : rawDmg;// Ninja Tabi
                    if (isCrit) {
                        const critAmount = (typeof spellObj.crit[0] === "object") ? spellObj.crit[0][spellLvl] : spellObj.crit[0];
                        if (spellObj.basicAttack) {
                            if (noProc) {
                                myDmg = calc(myDmg, getCrit(myDmg, critAmount, true, true), 0);
                            } else {
                                myDmg = calc(myDmg, getCrit(myDmg, critAmount, true), 0);
                            }
                        } else {
                            myDmg = calc(myDmg, getCrit(myDmg, critAmount), 0);
                        }
                        if (itemCheck(3031) || itemCheck(3371)) {
                            truDmg = calc(truDmg, calc(myDmg, 0.15), 0);
                            myDmg = calc(myDmg, 0.85);
                        }
                    }
                    const sortedDmg = sortDmg(myDmg, spellObj.type);
                    let physDmg = sortedDmg[0];
                    let magDmg = sortedDmg[1];
                    truDmg = calc(sortedDmg[2], truDmg, 0);

                    if (!isTick && !noProc) {//
                        if (itemCheck(3092, true) || itemCheck(3098, true)) {//FQC
                            magDmg = calc(magDmg, 18, 0);
                        } else if (itemCheck(3303, true)) {
                            magDmg = calc(magDmg, 13, 0);
                        }
                        //Runes added dmg
                        if (runeCheck(8112, true)) {//electrocute
                            const theDmg =  calc(40 + (10 * level), calc(calc(ap, 0.3), calc(attackdamage[1], 0.5), 0), 0);
                            if (adaptTyp === "phys") {
                                physDmg = calc(theDmg, physDmg, 0);
                            } else {
                                magDmg = calc(theDmg, magDmg, 0);
                            }
                        }
                        if (runeCheck(8124, true)) {// Predator
                            let predBase = [60,67,74,81,88,95,102,109,116,124,131,138,145,152,159,166,173,180];
                            const theDmg =  calc(predBase[level - 1], calc(calc(ap, 0.25), calc(attackdamage[1], 0.4), 0), 0);
                            if (adaptTyp === "phys") {
                                physDmg = calc(theDmg, physDmg, 0);
                            } else {
                                magDmg = calc(theDmg, magDmg, 0);
                            }
                        }
                        if (runeCheck(8214, true)) {// Aery
                            let aeryBase = [15,16,18,19,21,22,24,25,27,28,30,31,33,34,36,37,39,40];
                            const theDmg =  calc(aeryBase[level - 1], calc(calc(ap, 0.1), calc(attackdamage[1], 0.15), 0), 0);
                            if (adaptTyp === "phys") {
                                physDmg = calc(theDmg, physDmg, 0);
                            } else {
                                magDmg = calc(theDmg, magDmg, 0);
                            }
                        }
                        if (runeCheck(8126, true)) {// Cheap Shot
                            let chpShotBase = [15, 16, 18, 19, 21, 22, 24, 25, 27, 28, 30, 31, 33, 34, 36, 37, 39, 40];
                            truDmg = calc(truDmg, chpShotBase[level - 1], 0);
                        }
                        if (runeCheck(8136, true)) {// Zombie Ward
                            let zWardBase = [30,34,37,41,44,48,51,55,58,62,65,69,72,76,79,83,86,90];
                            magDmg = calc(magDmg, zWardBase[level - 1], 0);
                        }
                    }
                    
                    if (itemCheck(2033, true) && !isTick) {// Corrupted potion Burn over 3 secs
                        let corruptDmg = [15,16,17,18,19,19,20,21,22,23,24,25,26,26,27,28,29,30];
                        magDmg = calc(magDmg, corruptDmg[level], 0);
                    }
                    
                    //Burn no proc calc
                    let burnRatio;
                    if (noProc) {
                        let totalAtkSpd;
                        if (id === "Jhin") {
                            totalAtkSpd = round(attackspeed[0], 3);
                        } else {
                            totalAtkSpd = round(calc(attackspeed[0], calc(1, attackspeed[1], 0)), 3);
                            if (totalAtkSpd > attackspeed[2]) {
                                totalAtkSpd = attackspeed[2];
                            }
                        }
                        burnRatio = calc(1, totalAtkSpd,3);
                    }
                    
                    if (document.getElementById(uid).querySelector(".slctElix").value === "2139" && !isTick) {// elixir of sorcery Burn over 3 secs
                        if (noProc) {
                            const burnDmg = calc(8.3333, burnRatio);
                            truDmg = calc(truDmg, burnDmg, 0);
                        } else {
                            truDmg = calc(truDmg, 25, 0);
                        }
                    }
                    //red Buff Burn over 3 secs
                    if (spellObj.basicAttack && document.getElementById(uid).querySelector(".redBuff").checked) {
                        const redBuffDmg = [12,18,24,30,36,42,48,54,60,66,72,78,84,90,96,102,108,114];
                        if (noProc) {
                            const burnDmg = calc(calc(redBuffDmg[level - 1], 3), burnRatio);
                            truDmg = calc(truDmg, burnDmg, 0);
                        } else {
                            truDmg = calc(truDmg, redBuffDmg[level - 1], 0);
                        }
                    }
                    
                    
                    //spell effects
                    if (spellObj.spell && !isTick) {
                        if (itemCheck(3285, true)) { //Luden's Echo
                            magDmg = calc(magDmg, calc(100, calc(ap, 0.1), 0), 0);
                        } else if (itemCheck(1402, true) || //Runic Echoes
                            itemCheck(1414, true)) {
                            magDmg = calc(magDmg, calc(60, calc(ap, 0.1), 0), 0);
                        }
                        if (items.includes(3151) && enemyUID) {//Liandry, only grants one tick
                            if (myChamps[enemyUID].isSlowed() || items.includes(3116)) {
                                magDmg = calc(magDmg, myChamps[enemyUID].getPercentHP(0.02), 0);
                            } else {
                                magDmg = calc(magDmg, myChamps[enemyUID].getPercentHP(0.01), 0);
                            }
                        }
                        if (itemCheck(3134, true) ||
                        itemCheck(3252, true)) { //Serated Dirk ***add poachers dirk
                            physDmg = calc(physDmg, 40, 0);
                        }
                        if (runeCheck(8229, true)) {// Comet
                            const cometBase = [30,34,38,42,46,51,55,59,62,67,71,75,79,84,88,92,96,100];
                            const cometDmg = calc(cometBase[level - 1], calc(calc(ap, 0.2), calc(attackdamage[1], 0.35), 0), 0);
                            if (adaptTyp === "phys") {
                                physDmg = calc(physDmg, cometDmg, 0);
                            } else {
                                magDmg = calc(magDmg, cometDmg, 0);
                            }
                        }
                        if (runeCheck(8237, true)) {// Scorch
                            let scorchBase = [20, 22, 25, 27, 29, 32, 34, 36, 39, 41, 44, 46, 48, 51, 53, 55, 58, 60];
                            magDmg = calc(magDmg, scorchBase[level - 1], 0);
                        }
                    }
                    if (spellObj.onHit && !isTick) {
                        let onHitMulti = (spellObj.onHit < 1) ? spellObj.onHit : 1;
                        if (document.getElementsByClassName("elderActive")[side].checked) {//Elder Drake Burn over 3 secs
                            const elderStacks = document.getElementsByClassName("elderCount")[side].value;
                            const elderDmg = 45 + (45 * elderStacks);
                            if (noProc) {
                                const burnDmg = calc(calc(elderDmg, 3, 3), burnRatio);
                                truDmg = calc(truDmg, burnDmg, 0);
                            } else {
                                truDmg = calc(truDmg, elderDmg, 0);
                            }
                            
                        }
                        if (!noProc) {
                            if (itemCheck(3145, true)) {//Hex Revolver
                                let boltDmg = [50,54,58,63,67,72,76,81,85,90,94,99,103,107,112,116,121,125];
                                magDmg = calc(magDmg, calc(boltDmg[level - 1], onHitMulti), 0);
                            }
                            if (itemCheck(3147, true)) {//Duskblade
                                physDmg = calc(physDmg, calc((20 + 10 * level), onHitMulti), 0);
                            }
                            if (itemCheck(3100, true)) {//lichbane
                                magDmg = calc(magDmg, calc(calc(attackdamage[0], 0.75), calc(ap, 0.5), 0), 0);
                            } else if (
                                (itemCheck(3078, true)) ||//triforce
                                (itemCheck(3384, true))
                            ) {
                                let triDmg = calc(calc(attackdamage[0], 2), onHitMulti);
                                if ((itemCheck(3031) || itemCheck(3371))  && isCrit) {//I Edge
                                    triDmg = calc(triDmg, 0.85);
                                    truDmg = calc(truDmg, calc(triDmg, 0.15), 0);
                                }
                                if (spellObj.type === "corkiAuto") {
                                    physDmg = calc(physDmg, calc(triDmg, 0.2), 0);
                                    magDmg = calc(magDmg, calc(triDmg, 0.8), 0);
                                } else {
                                    physDmg = calc(physDmg, triDmg, 0);
                                }
                            } else if (
                                (itemCheck(3025, true)) ||//iceborn/sheen
                                (itemCheck(3057, true))//sheen
                            ) {
                                if (spellObj.type === "corkiAuto") {
                                    physDmg = calc(physDmg, calc(attackdamage[0], 0.2), 0);
                                    magDmg = calc(magDmg, calc(attackdamage[0], 0.8), 0);
                                } else {
                                    if ((itemCheck(3031) || itemCheck(3371)) && isCrit) {
                                        truDmg = calc(truDmg, calc(0.15, calc(attackdamage[0], onHitMulti)) ,0);
                                        physDmg = calc(physDmg, calc(0.85, calc(attackdamage[0], onHitMulti)), 0);
                                    } else {
                                        physDmg = calc(physDmg, calc(attackdamage[0], onHitMulti), 0);
                                    }
                                }
                            }
                            if (itemCheck(3742, true)) {//dead mans
                                magDmg = calc(calc(100, onHitMulti), magDmg, 0);
                            }
                            if (itemCheck(2015, true)) {//Kircheis Shard
                                magDmg = calc(calc(50, onHitMulti), magDmg, 0);
                            }
                            if (itemCheck(3087, true)) {// Static Shiv
                                const shivLvlDmg = [60,60,60,60,60,67,73,79,85,91,97,104,110,116,122,128,134,140];
                                let shivDmg = calc(shivLvlDmg[level - 1], onHitMulti);
                                if (isCrit) {
                                    shivDmg = calc(getCrit(shivDmg, spellObj.crit), shivDmg, 0);
                                    if (itemCheck(3031) || itemCheck(3371)) {
                                        truDmg = calc(truDmg, calc(shivDmg, 0.15), 0);
                                        shivDmg = calc(shivDmg, 0.85);
                                    }
                                }
                                magDmg = calc(magDmg, shivDmg, 0);
                            }
                            if (itemCheck(3094, true)) {//Rapidfire
                                let rfLvlDmg = [60,60,60,60,60,67,73,79,85,91,97,104,110,116,122,128,134,140];
                                magDmg = calc(magDmg, calc(rfLvlDmg[level - 1], onHitMulti), 0);
                            }
                            //Runes
                            if (runeCheck(8128, true)) {//dark harvest
                                const
                                    dhLvl = [40,42,45,47,49,52,54,56,59,61,64,66,68,71,73,75,78,80],
                                    soulStacks = parseInt(document.getElementById(uid + "RNUM8128").value);
                                let dhDmg = calc(soulStacks, calc(dhLvl[level - 1], calc(calc(ap, 0.2), calc(attackdamage[1], 0.25), 0), 0), 0);
                                if (adaptTyp === "phys") {
                                    physDmg = calc(physDmg, dhDmg, 0);
                                } else {
                                    magDmg = calc(magDmg, dhDmg, 0);
                                }
                            }
                            if (runeCheck(8005, true)) {//press the attack
                                const ptaPerLvl = [40,48,56,65,73,81,89,98,106,114,122,131,139,147,155,164,172,180];
                                if (adaptTyp === "phys") {
                                    physDmg = calc(physDmg, ptaPerLvl[level - 1], 0);
                                } else {
                                    magDmg = calc(magDmg, ptaPerLvl[level - 1], 0);
                                }
                            }
                            if (runeCheck(8437, true)) {//graps of the undying
                                if (stats.attackrange > 200) {
                                    magDmg = calc(getPercentHP(0.02), magDmg, 0);
                                } else {
                                    magDmg = calc(getPercentHP(0.04), magDmg, 0);
                                }
                            }
                        }

                        onHitMulti = spellObj.onHit;
                        if (items.includes(1043)) {//Recurve Bow
                            physDmg = calc(calc(15, onHitMulti), physDmg, 0);
                        }
                        if (items.includes(3091)) {//Wits End
                            magDmg = calc(calc(42, onHitMulti), magDmg, 0);
                        }
                        if (items.includes(3124)) {//Guinsoo
                            magDmg = calc(calc(calc(Number(ap + "e-1"), 5, 0), onHitMulti), magDmg, 0);
                            physDmg = calc(calc(calc(Number(attackdamage[1] + "e-1"), 5, 0), onHitMulti), physDmg, 0);
                        }
                        if (items.includes(3115)) {//Nashor
                            magDmg = calc(magDmg, calc(calc(15, calc(0.15, ap), 0), onHitMulti), 0);
                        }
                        if (items.includes(3153) && enemyUID) {//Botrk
                            physDmg = calc(calc(myChamps[enemyUID].getPercentHP(0.08, "currHp"), onHitMulti), physDmg, 0);
                        }
                        if ((items.includes(1416) || items.includes(1419)) && enemyUID) {//Bloodrazer
                            physDmg = calc(calc(myChamps[enemyUID].getPercentHP(0.04), onHitMulti, 0), physDmg, 0);
                        }
                        if (items.includes(3748)) {//Titanic Hydra
                            physDmg = calc(calc(calc(5, calc(getPercentHP(1), 0.01), 0), onHitMulti), physDmg, 0);
                        }
                        if (items.includes(3042) && partype === theLang.Mana) {//Muramana
                            physDmg = calc(calc(mp[0] + mp[1], 0.06), physDmg, 0);
                        }
                        if (document.getElementById(uid).querySelector(".ardent").value > 0) {// ardent censor
                            const ardent = [5,6,7,8,9,9,10,11,12,13,14,15,16,16,17,18,19,20];
                            magDmg = calc(ardent[document.getElementById(uid).querySelector(".ardent").value -1], magDmg, 0);
                        }
                    }

                    if ((items.includes(3136) || items.includes(3151)) && !isTick) {// Liandrys Multiplier
                        let dmgMulti = (items.includes(3151)) ? itemCount(3151) : itemCount(3136);
                        if (dmgMulti > 0) {
                            magDmg = calc(magDmg, calc(1, calc(dmgMulti, 0.02), 0));
                            physDmg = calc(physDmg, calc(1, calc(dmgMulti, 0.02), 0));
                        }
                    }
                    if (// abyssal mask
                        (itemCheck(3001, true)) ||
                        (itemCheck(3379, true))
                    ) {
                        magDmg = calc(magDmg, 1.15);
                    }
                    if (itemCheck(3193, true)) {// Gargoyle Stoneplate
                        magDmg = calc(magDmg, 0.4);
                        physDmg = calc(physDmg, 0.4);
                    }
                    if (enemyUID && runeCheck(8014) && (myChamps[enemyUID].getPercentHP(0.4) > myChamps[enemyUID].getPercentHP(1, "currHp"))) {// Coup de Grace
                        magDmg = calc(magDmg, 1.07);
                        physDmg = calc(physDmg, 1.07);
                    }
                    if (runeCheck(8017) && enemyUID) {// cut down
                        const hpDiff = myChamps[enemyUID].getPercentHP(1) - getPercentHP(1);
                        if (hpDiff > 149) {
                            let multi = 1.12;
                            if (hpDiff < 2000) {
                                multi = calc(calc(0.000043, (hpDiff - 150)), 1.04, 0);
                            }
                            magDmg = round(calc(magDmg, multi), 2);
                            physDmg = round(calc(physDmg, multi), 2);
                        }
                    }
                    if (runeCheck(8299) && getPercentHP(0.6) > getPercentHP(1, "currHp")) {// last stand
                        const currentHP = getPercentHP(1, "currHp");
                        let multi = 1.11;
                        if (currentHP > getPercentHP(0.3)) {
                            multi = 1.05;
                            const additonalPer = calc(0.06, calc(calc(currentHP, getPercentHP(0.3), 1), getPercentHP(0.3), 3));
                            multi = calc(multi, additonalPer, 0);
                        }
                        magDmg = round(calc(magDmg, multi), 2);
                        physDmg = round(calc(physDmg, multi), 2);
                    }
                    if (runeCheck(8010, true)) {// Conqueror
                        truDmg = calc(truDmg, calc(magDmg, 0.2), 0);
                        truDmg = calc(truDmg, calc(physDmg, 0.2), 0);
                        magDmg = calc(magDmg, 0.8);
                        physDmg = calc(physDmg, 0.8);
                    }

                    // calculate damage through resistances
                    if (enemyUID && !isTick) {
                        resistedDmg = myChamps[enemyUID].takeDmg([physDmg, magDmg, truDmg], aPen, mPen);
                        physDmg = resistedDmg[0];
                        magDmg = resistedDmg[1];
                        truDmg = resistedDmg[2];
                    } else {
                        physDmg = round(physDmg, 1);
                        magDmg = round(magDmg, 1);
                        truDmg = round(truDmg, 1);
                    }

                    return [physDmg, magDmg, truDmg];
                };
                const getHealShield = function (amount, spellObj) {
                    let
                        rawAmount = amount,
                        healShieldBonus = 1,
                        myHeal = 0,
                        myShield = 0;
                    if(spellObj.missHp) {
                        rawAmount = getPercentHP(Number(amount + "e-2"), "missHp");
                    }
                    if(spellObj.percentMax) {
                        rawAmount = getPercentHP(Number(amount + "e-2"));
                    }
                    switch(spellObj.type) {
                    case "heal":
                        myHeal = rawAmount;
                        break;
                    case "shield":
                        myShield = rawAmount;
                        break;
                    }
                    if(itemCheck(3114)) {//Idol
                        healShieldBonus = calc(0.05, healShieldBonus, 0);
                    }
                    if(itemCheck(3504)) {//Ardent
                        healShieldBonus = calc(0.08, healShieldBonus, 0);
                    }
                    if(itemCheck(3107)) {//Redemption
                        healShieldBonus = calc(0.8, healShieldBonus, 0);
                    }
                    if(itemCheck(3382)) {//Ornn Salvation
                        healShieldBonus = calc(0.1, healShieldBonus, 0);
                    }
                    if(itemCheck(3222)) {//Mikeal
                        healShieldBonus = calc(0.15, healShieldBonus, 0);
                    }
                    if (runeCheck(8465, true) && !spellObj.selfHeal && !spellObj.selfShield) {// Guardian
                        let guardianLvl = [70,75,79,84,89,94,98,103,108,112,117,122,126,131,136,141,145,150];
                        myShield = calc(calc(myShield, guardianLvl[level -1], 0), calc(calc(ap, 0.25), calc(hp[1], 0.12), 0), 0);
                    }
                    if (runeCheck(8214, true) && !spellObj.selfHeal && !spellObj.selfShield) {// Aery
                        let aeryBase = [30,33,36,39,42,45,48,51,54,56,59,62,65,68,71,74,77,80];
                        myShield = calc(calc(myShield, aeryBase[level -1], 0), calc(calc(ap, 0.25), calc(attackdamage[1], 0.4), 0), 0);
                    }
                    if (runeCheck(8453)) {// revitalize
                        healShieldBonus = calc(0.05, healShieldBonus, 0);
                        if (getPercentHP(0.4) > getPercentHP(1, "currHp")) {
                            myHeal = calc(myHeal, 1.1);
                            myShield = calc(myShield, 1.1);
                        }
                    }
                    if (itemCheck(3065) && !spellObj.allyOnly) {// Spirit Visage
                        myHeal = calc(myHeal, 1.3);
                    }
                    if (itemCheck(3174, true) && !spellObj.selfShield && !spellObj.selfHeal) {// Athenes
                        let atheneBase = [100,108,116,125,134,143,152,161,170,179,188,197,205,214,223,232,241,250];
                        myHeal = calc(myHeal, atheneBase[level - 1], 0);
                    }
                    if (healShieldBonus > 1) {
                        myHeal = calc(myHeal, healShieldBonus);
                        myShield = calc(myShield, healShieldBonus);
                    }

                    return [myHeal, myShield];
                };
                const styleDigits = function (digits, type) {// format key values
                    let theStr = "";
                    switch (type) {
                    case "heal":
                        theStr = "<span class='heal'>" + round(digits[0], 1) + "</span>";
                        if (digits[1] > 0) {
                            theStr += "<span class='shield'>[" + round(digits[1], 1) + "]</span>";
                        }
                        break;
                    case "shield":
                        theStr = "<span class='shield'>" + round(digits[1], 1) + "</span>";
                        if (digits[0] > 0) {
                            theStr += "<span class='heal'>[" + round(digits[0], 1) + "]</span>";
                        }
                        break;
                    case "armor":
                        theStr = "<span class='armor'>" + digits + "</span>";
                        break;
                    case "mr":
                        theStr = "<span class='mr'>" + digits + "</span>";
                        break;
                    default:
                        if (type === "phys") {
                            theStr = "<span class='phys'>" + round(digits[0], 1) + "</span>";
                            if (digits[1] > 0) {
                                theStr += "<span class='mag'>[" + round(digits[1], 1) + "]</span>";
                            }
                            if (digits[2] > 0) {
                                theStr += "<span class='tru'>[" + round(digits[2], 1) + "]</span>";
                            }
                        } else if (type === "tru") {
                            theStr = "<span class='tru'>" + round(digits[2], 1) + "</span>";
                            if (digits[1] > 0) {
                                theStr += "<span class='mag'>[" + round(digits[1], 1) + "]</span>";
                            }
                            if (digits[0] > 0) {
                                theStr += "<span class='phys'>[" + round(digits[0], 1) + "]</span>";
                            }
                        } else {
                            theStr = "<span class='mag'>" + round(digits[1], 1) + "</span>";
                            if (digits[0] > 0) {
                                theStr += "<span class='phys'>[" + round(digits[0], 1) + "]</span>";
                            }
                            if (digits[2] > 0) {
                                theStr += "<span class='tru'>[" + round(digits[2], 1) + "]</span>";
                            }
                        }
                    }
                    return theStr;
                };
                const getTotal = function (dmgArr) {
                    if (dmgArr[1] > 0 || dmgArr[2] > 0) {
                        let totalDmg = 0;
                        dmgArr.forEach(function (damage) {
                            totalDmg = round(calc(damage, totalDmg, 0), 1);
                        });
                        return " <span class='totalDmg'> - (" + totalDmg + ")</span>";
                    }
                    return "";
                };
                // Attack Tooltip
                if (spellNo === "Attack") {
                    let
                        totalAD = calc(attackdamage[0], attackdamage[1], 0),
                        attackObj = {type: "phys", onHit: 1, basicAttack: true, crit:[100]};
                    switch (id) {
                    case "Ashe":
                        attackObj = {type: "phys", onHit: 1, basicAttack: true, crit:[0]};
                        break;
                    case "Graves":
                        let autoDmg = [0.7, 0.71, 0.72, 0.74, 0.75, 0.76, 0.78, 0.8, 0.81, 0.83, 0.85, 0.87, 0.89, 0.91, 0.95, 0.96, 0.97, 1];
                        totalAD = calc(totalAD, autoDmg[level - 1]);
                        attackObj = {type: "phys", onHit: 1, basicAttack: true, crit:[40]};
                        break;
                    case "Corki":
                        attackObj = {type: "corkiAuto", onHit: 1, basicAttack: true, crit:[100]};
                        break;
                    case "Jhin":
                        attackObj = {type: "phys", onHit: 1, basicAttack: true, crit:[50]};
                        break;
                    case "Kalista":
                        totalAD = calc(totalAD, 0.9);
                        break;
                    case "Kled":
                        if (!document.getElementById(uid + "InputP").checked) {
                            totalAD = calc(totalAD, 0.8);
                        }
                        break;
                    case "Yasuo":
                        attackObj = {type: "phys", onHit: 1, basicAttack: true, crit:[80,125]};
                        break;
                    default:
                    }
                    let nonCritDmg = getDmg(totalAD, attackObj);
                    let tooltip = "<h4>" + theLang.Next + theLang.Attack + "</h4>";
                    if (!itemCheck(3095, true) && crit < 1) {
                        tooltip += theLang.Damage + ": " + styleDigits(nonCritDmg, attackObj.type);
                        tooltip += getTotal(nonCritDmg) + "<br>";
                    }
                    if (crit > 0 || id === "Jhin" || itemCheck(3095, true)) {
                        let critDmg = getDmg(totalAD, attackObj, true);
                        tooltip += theLang.CriticalStrike + " " + theLang.Damage + ": " + styleDigits(critDmg, attackObj.type);
                        tooltip += getTotal(critDmg);
                        if (!itemCheck(3095, true) && crit < 1) {
                            let avgDmg = avgCritDmg(nonCritDmg, critDmg);
                            tooltip += "<br>AVG " + theLang.Damage + ": " + styleDigits(avgDmg, attackObj.type);
                            tooltip += getTotal(avgDmg);
                        }
                    }
                    //Non procced attack
                    tooltip += "<hr><h4>" + theLang.Attack + "</h4>";
                    if (id === "Ashe") {
                        let asheCrit = (crit >= 1) ? 2.1 : calc(1.1, crit, 0);
                        totalAD = calc(asheCrit, totalAD);
                    }
                    if (crit < 1) {
                        nonCritDmg = getDmg(totalAD, attackObj, false, false, true);
                        tooltip += theLang.Damage + ": " + styleDigits(nonCritDmg, attackObj.type);
                        tooltip += getTotal(nonCritDmg) + "<br>";
                    }
                    let avgDmg = nonCritDmg;
                    if (crit > 0 || id === "Jhin") {
                        let critDmg = getDmg(totalAD, attackObj, true, false, true);
                        tooltip += theLang.CriticalStrike + " " + theLang.Damage + ": " + styleDigits(critDmg, attackObj.type);
                        tooltip += getTotal(critDmg);
                        tooltip +=  "<br>";
                        if (crit < 1) {
                            avgDmg = avgCritDmg(nonCritDmg, critDmg);
                            tooltip += "AVG " + theLang.Damage + ": " + styleDigits(avgDmg, attackObj.type);
                            tooltip += getTotal(avgDmg) + "<br>";
                        } else {
                            avgDmg = critDmg;
                        }
                    }
                    const thedps = getDPS(avgDmg);
                    tooltip += "DPS: " + styleDigits(thedps, attackObj.type);
                    tooltip += getTotal(thedps);
                    return tooltip;
                }
                
                //Start Rest of Tooltips
                const myObj = myChamps[uid]["sInfo" + spellNo];
                let tooltip = (spellNo === "P")
                    ? passive.description
                    : spells[spellNo].tooltip;
                if (myObj && myObj.txt) {
                    tooltip += myObj.txt;
                }
                if (myObj) {
                    Object.keys(myObj).forEach(function (id) {
                        if (myObj[id].info) {
                            let title = "";
                            if (typeof myObj[id].info === "object") {
                                myObj[id].info.forEach(function (theInfo) {
                                    title += theLang[theInfo] + " ";
                                });
                            } else {
                                title = theLang[myObj[id].info];
                            }
                            if (myObj[id].myInfo) {
                               title += " " + myObj[id].myInfo;
                            }
                            tooltip += "<br>" + title + ": {{ " + id + " }}";
                        }
                    });
                }
                tooltip = tooltip.replace(/<a.href=\'.*\'>/g, "");
                tooltip = tooltip.replace(/<\/a\>/g, "");
                tooltip = tooltip.replace(/[*][\d.]*/g, "");
                tooltip = tooltip.replace(/<scaleAP>.*<\/scaleAP>[\%]/g, "");
                tooltip = tooltip.replace(/<span.class="(size.\S.)?\S*>/g, "");
                tooltip = tooltip.replace(/<\/span>/g, "");
                
                const keys = tooltip.match(/\{\{[^}]*\}\}/g);
                if (keys !== null) {//add values
                    let altKey = [];
                    keys.forEach(function (key) {
                        let rawKey = key.replace(/\{\{./, "");
                        rawKey = rawKey.replace(/.\}\}/, "");
                        if (altKey.includes(rawKey)) {
                            rawKey += "a";
                        }
                        let keyValue = getValue(rawKey, spellNo);
                        const replaceRegEx = new RegExp(key);
                        let placeHoldStr = keyValue;
                        if (myChamps[uid]["sInfo" + spellNo] && myChamps[uid]["sInfo" + spellNo][rawKey]) {
                            let keyObj = myChamps[uid]["sInfo" + spellNo][rawKey];
                            if (keyObj.type === "heal" || keyObj.type === "shield") {
                                keyValue = getHealShield(keyValue, keyObj);
                                placeHoldStr = styleDigits(keyValue, keyObj.type);
                            } else if (keyObj.type === "armor" || keyObj.type === "mr" ) {
                                placeHoldStr = styleDigits(keyValue, keyObj.type);
                            } else if (keyObj.type) {
                                const addDmg = function (dmg1, dmg2) {
                                    const physDmg = round(calc(dmg1[0], dmg2[0], 0) ,1);
                                    const magDmg = round(calc(dmg1[1], dmg2[1], 0) ,1);
                                    const truDmg = round(calc(dmg1[2], dmg2[2], 0), 1);
                                    return [physDmg, magDmg, truDmg];
                                };
                                const getTickDmg = function (tickDmg) {
                                    const totalTicks = (typeof keyObj.ticks === "object") ? keyObj.ticks[spellLvl] - 1 : keyObj.ticks - 1;
                                    let totalDmg = [0, 0, 0];
                                    let ticksPS = (keyObj.duration) ? Math.ceil(calc((totalTicks + 1), keyObj.duration, 3)): totalTicks + 1;
                                    let cleaveStacks = 0;
                                    let liandStacks = 0;
                                    if (items.includes(3151) || items.includes(3136)) {// Liandry
                                        liandStacks = (items.includes(3151)) ? itemCount(3151) : itemCount(3136);
                                    }
                                    let tickCount = 0;
                                    while (tickCount !== totalTicks) {
                                        tickCount += 1;
                                        let myDmg = [tickDmg[0], tickDmg[1], tickDmg[2]];
                                        if (items.includes(3151) || items.includes(3136)) {// Liandry
                                            if ((tickCount) % ticksPS === 0) {
                                                if (liandStacks < 5) {
                                                    liandStacks += 1;
                                                }
                                                if (myChamps[enemyUID] && items.includes(3151)) {//apply liandry burn
                                                    if (myChamps[enemyUID].isSlowed() || items.includes(3116)) {
                                                        myDmg[1] = calc(myDmg[1], myChamps[enemyUID].getPercentHP(0.02), 0);
                                                    } else {
                                                        myDmg[1] = calc(myDmg[1], myChamps[enemyUID].getPercentHP(0.01), 0);
                                                    }
                                                }
                                            }
                                            let liandMulti = calc(1, calc(liandStacks, 0.02), 0);
                                            myDmg = [calc(myDmg[0], liandMulti), calc(myDmg[1], liandMulti), myDmg[2]];
                                        }
                                        if (enemyUID) {
                                            if ((items.includes(3071) || items.includes(3380)) && myDmg[0] > 0) {// Cleaver
                                                cleaveStacks += 1;
                                                myDmg = myChamps[enemyUID].takeDmg(myDmg, aPen, mPen, cleaveStacks);
                                            } else {
                                                myDmg = myChamps[enemyUID].takeDmg(myDmg, aPen, mPen);
                                            }
                                        }
                                        totalDmg = addDmg(totalDmg, myDmg);
                                    }
                                    return totalDmg;
                                };
                                let theDmg = getDmg(keyValue, keyObj);
                                if (keyObj.ticks) {
                                    if (keyObj.tickMulti) {
                                        keyValue = calc(keyValue, keyObj.tickMulti);
                                    }
                                    theDmg = addDmg(theDmg, getTickDmg(getDmg(keyValue, keyObj ,false, true)));
                                }
                                placeHoldStr = styleDigits(theDmg, keyObj.type);

                                if (keyObj.dps) {
                                    placeHoldStr += "[DPS:" + styleDigits(getDPS(theDmg, keyObj.dps), keyObj.type) + "]";
                                }
                                if (keyObj.crit && (crit > 0 || keyObj.crit[1] || (itemCheck(3095, true) && keyObj.basicAttack))) {
                                    const theCritDmg = getDmg(keyValue, keyObj, true);
                                    if (keyObj.ticks) {
                                        const critTickDmg = addDmg(theCritDmg, getTickDmg(getDmg(keyValue, keyObj , true, true)));
                                        placeHoldStr += " [AVG " + theLang.Damage + ": " + styleDigits(avgCritDmg(theDmg, critTickDmg), keyObj.type) + "]";
                                    } else {
                                        placeHoldStr += " [" + theLang.FlatCritDamageMod + ": " + styleDigits(theCritDmg, keyObj.type) + "]";
                                    }
                                }
                            } else {
                                placeHoldStr = keyValue;
                            }
                        }
                        tooltip = tooltip.replace(replaceRegEx, placeHoldStr);
                        if (myChamps[uid]["sInfo" + spellNo] && myChamps[uid]["sInfo" + spellNo][rawKey + "a"]) {// alternate spell vars
                            altKey.push(rawKey);
                        }

                    });
                }
                tooltip = tooltip.replace(/<font.color\='#......'.?size\='..'>/g, "");
                tooltip = tooltip.replace(/\(\+.?\D*\)/g, "");
                tooltip = tooltip.replace(/<\/span>\%/g, "</span>");
                tooltip = tooltip.replace(/<\/span>]\%([\s]\%)?/g, "</span>]");
                tooltip = tooltip.replace(/\s\%/g, "%");
                return tooltip;
            };
            let skillDivs = document.getElementById(uid).getElementsByClassName("skillTxt");
            Array.from(skillDivs).forEach(function (div, count) {
                switch (count) {
                case 0:
                    div.innerHTML = refineTtip("Attack");
                    break;
                case 1:
                    div.innerHTML = refineTtip("P");
                    break;
                default:
                    let spellLvl = document.getElementById(uid).getElementsByClassName("spellLvl")[count - 2].value;
                    spellLvl = (spellLvl < 1)
                        ? 0
                        : spellLvl - 1;
                    let skillCdr = spells[count - 2].cooldown[spellLvl];
                    let theCdr = (cdr[0] > cdr[1]) ? cdr[1] : cdr[0];
                    skillCdr = calc(skillCdr, calc(1, theCdr, 1));
                    const noProcER = ["Nidalee", "Jayce", "Udyr", "Elise"];//Essence Reaver Passive CDR
                    if (count !== 5 && itemCheck(3508, true) && !noProcER.includes(id)) {
                        skillCdr = calc(skillCdr, 0.8);
                    }
                    if (count === 5 && runeCheck(8106)) {// Ultimate Hunter
                        const uHCDR = calc(0.95, calc(0.02, document.getElementById(uid + "RNUM8106").value), 1);
                        skillCdr = calc(skillCdr, uHCDR);
                    }
                    div.innerHTML = theLang.Cooldown + ": " + skillCdr + "<br>";
                    div.innerHTML += refineTtip(count - 2);
                }
            });
        },
        takeDmg = function (dmg, eAPen, eMPen, cleaves) {
            const calcResist = function (resistance, pen) {
                if (resistance >= 0) {
                    return round(calc(100, calc(100, resistance, 0), 3), 4);
                } else {
                    return round(calc(2, calc(100, calc(100, resistance, 1), 3), 1), 4);
                }
            };
            const calcPenResist = function (base, bonus, pen) {
                let basePen = base, bonusPen = bonus;
                if (base > 0) {
                    if (pen[0] > 0) {
                        basePen = calc(basePen, calc(1, Number(pen[0] + "e-2"), 1));
                        bonusPen = calc(bonusPen, calc(1, Number(pen[0] + "e-2"), 1));
                    }
                    if (pen[1] > 0) {
                        const baseRatio = calc(base, calc(base, bonus, 0), 3);
                        basePen = calc(basePen, calc(baseRatio, pen[1]), 1);
                        bonusPen = calc(bonusPen, calc(calc(1, baseRatio, 1), pen[1]), 1);
                    }
                    if (basePen < 0) {
                        basePen = 0;
                    }
                    if (bonusPen < 0) {
                        bonusPen = 0;
                    }
                }
                return calc(basePen, bonusPen, 0);
            };
            let totalArmor;

            if (cleaves) {//apply black cleaver stacks
                let baseArmor = armor[0];
                let bonusArmor = armor[1];
                const currentShred = Number(document.getElementById(uid).querySelector(".cleaver").value);
                if (currentShred > 0) {//remove already debuffed armour
                    baseArmor = round(calc(calc(baseArmor, 100), Number(calc(1, currentShred, 1) + "e2"), 3));
                    bonusArmor = calc(calc(bonusArmor, 100), Number(currentShred + "e2"), 3);
                }
                let shred = calc(calc(cleaves, 0.04), currentShred, 0);//get armor shred %
                shred = (shred > 0.24) ? 0.76 : calc(1, shred, 1);
                baseArmor = calc(baseArmor, shred);
                bonusArmor = calc(bonusArmor, shred);
                totalArmor = calcPenResist(baseArmor, bonusArmor, eAPen);
            } else {
                totalArmor = calcPenResist(armor[0], armor[1], eAPen);
            }
            const totalSBlock = calcPenResist(spellblock[0], spellblock[1], eMPen);
            let physDmg = round(calc(dmg[0], calcResist(totalArmor)), 1);
            let magDmg = round(calc(dmg[1], calcResist(totalSBlock)), 1);
            const truDmg = dmg[2];
            if (dmgReduct[0]) {
                magDmg = calc(magDmg, calc(1, Number(dmgReduct[0] + "e-2"), 1));
            }
            if (dmgReduct[1]) {
                physDmg = calc(physDmg, calc(1, Number(dmgReduct[1] + "e-2"), 1));
            }
            if (runeCheck(8473, true)) {// Bone Plating
                const bPlat = [15, 16, 18, 19, 21, 22, 24, 25, 27, 28, 30, 31, 33, 34, 36, 37, 39, 40];
                dmgReduct[2] = calc(dmgReduct[2], bPlat[level - 1], 0);
                magDmg = calc(magDmg, bPlat[level - 1], 1);
                if (magDmg < 0) {
                    magDmg = 0;
                }
            }
            if (dmgReduct[2]) {
                physDmg = calc(physDmg, dmgReduct[2], 1);
                if (physDmg < 0) {
                    physDmg = 0;
                }
            }
            return [physDmg, magDmg, truDmg];
        },
        takeBasicAtk = function (dmg) {
            let theDmg = dmg;
            if (id === "Fizz") {
                theDmg = calc(theDmg, sInfoP.p1.valuePerLvl[level - 1], 1);
            }
            if (items.includes(3047)) {
                theDmg = calc(theDmg, 0.88);
            }
            return (theDmg);
        },
        takeCritMulti = function (multi) {// Process randuins
            return (items.includes(3143)) ? calc(multi, 0.8) : multi;
        },
        isSlowed = function () {
            if (document.getElementById(uid).querySelector(".slow").value > 0) {
                return true;
            }
            return false;
        },
        getMvSpd = function () {
            //(Base MS + Flat MS bonuses) × (1 + Sum of all Additive Percent MS bonuses) × (1 - Highest Slow ratio) × Product of (1 + any Multiplicative MS bonus)
            //(move[0] + move[1]) * (1 + move[2]) * (1 - slow * (1 - move[3]) * (1 + move[4])

            const flat  = calc(move[0], move[1], 0);
            const percent = calc(1, move[2], 0);
            const slowResist = (move[3] > 1) ? 0 : calc(1, move[3], 1);
            const slow = calc(1, Number(calc(document.getElementById(uid).querySelector(".slow").value, slowResist) + "e-2"), 1);
            const multi = calc(1, move[4], 0);
            let rawSpd = calc(calc(calc(flat, percent), slow), multi);

            if (rawSpd > 490) {
                rawSpd = calc(calc(rawSpd, 0.5), 230, 0);
            } else if (rawSpd > 415){
                rawSpd = calc(calc(rawSpd, 0.8), 83, 0);
            } else if (rawSpd < 220){
                rawSpd = calc(calc(rawSpd, 0.5), 110, 0);
            }

            return rawSpd;
        },
        getPercentHP = function (amount, type = "maxHp") {
            let maxHp = hp[0] + hp[1];
            let currentHP;
            if (document.getElementById(uid + "HP")) {
                currentHP = document.getElementById(uid + "HP").value;
            } else {
                currentHP = maxHp;
            }

            switch (type) {
            case "currHp":
                return calc(currentHP, amount);
            case "maxHp":
                return calc(maxHp, amount);
            case "missHp":
                return calc(maxHp - currentHP, amount);
            default:
                console.log(type);
                return 0;
            }
        },
        getRuneHash = function () {
            if (runePaths[0] !== "") {
                let runeHash = "&" + runePaths[0];
                runes[0].forEach(function (runeID, count) {
                    runeHash += getRuneInfo(0, count)[1];
                });
                if (runePaths[1] !== "") {
                    runeHash += "&" + runePaths[1];
                    runes[1].forEach(function (runeID, count) {
                        runeHash += getRuneInfo(1, count)[0];
                        runeHash += getRuneInfo(1, count)[1];
                    });
                }
                return runeHash;
            }
            return "";
        },
        checkBoots = function () {//used by magical footwear and item check
                return items.some(function (itemNo) {
                    return theItems[itemNo].tags.includes("Boots");
                });
        };

    //script to fix riots disappearing data
    switch (id) {
    case "Rengar":
        spells[0].cooldown = [6, 5.5, 5, 4.5, 4];
        spells[1].cooldown = [16, 14.5, 13, 11.5, 10];
        spells[2].cooldown = [10, 10, 10, 10, 10];
        break;
    }

    return {
        adaptTyp,
        attackdamage,
        ap,
        aPen,
        armor,
        attackspeed,
        aSpdBonus,
        buffs,
        buffStats,
        cdr,
        crit,
        debuffs,
        dmgReduct,
        baseDPS,
        enemyUID,
        hp,
        hpregen,
        id,
        image,
        items,
        level,
        lifeSteal,
        move,
        mp,
        mPen,
        mpregen,
        name,
        partype,
        passive,
        runePaths,
        runes,
        side,
        sInfoP,
        sInfo0,
        sInfo1,
        sInfo2,
        sInfo3,
        spellblock,
        spells,
        stats,
        uid,
        getAdapt,
        getValue,
        itemCheck,
        itemCount,
        runeCheck,
        setStats,
        drawChampDOM,
        importRunes,
        drawRuneDOM,
        drawStats,
        drawSkillTxt,
        addItem,
        takeDmg,
        takeBasicAtk,
        takeCritMulti,
        isSlowed,
        getRuneHash,
        getPercentHP,
        getMvSpd,
        checkBoots,
        getRuneInfo
    };
};

const newChamp = function (json, side) {
    "use strict";
    const myUid = newUID();
    myChamps[myUid] = champObj(json.data[Object.keys(json.data)], side, myUid);
    myChamps[myUid].drawChampDOM();
    myChamps[myUid].drawRuneDOM();
    update();
};

const importChamp = function (json, hash) {
    "use strict";
    const myUid = newUID();
    const champData =  hash.split("&");
    myChamps[myUid] = champObj(json.data[Object.keys(json.data)], champData[1].charAt(0), myUid);
    myChamps[myUid].drawChampDOM();

    document.getElementById(myUid).querySelector(".champLevel").value = champData[1].substring(5);//champ level
    let champSpell = 4;
    while (champSpell !== 0) {//spell levels
        champSpell -= 1;
        document.getElementById(myUid).getElementsByClassName("spellLvl")[champSpell].value = champData[1].charAt(champSpell + 1);
    }
    let totalItems = (champData[2].length / 4);
    while (totalItems !== 0) {
        myChamps[myUid].addItem(Number(champData[2].substr((totalItems - 1) * 4, 4)));
        totalItems -= 1;
    }
    if (champData[3] && champData[4]) {
        myChamps[myUid].importRunes(champData[3], champData[4]);
    }
    myChamps[myUid].drawRuneDOM();
    update();
};

const addChamp = function (side) {
    "use strict";
    const champId = document.getElementById("chmpSlct" + side).value;
    loadJSON("champion/" + champId, newChamp, side);
};

// ** FIRST LOAD SCRIPTS **

setLocale();
loadJSON("language", setLang);
loadJSON("item", setItems);
loadJSON("runesReforged", setRunes);
loadJSON("champion", setChampList);

//** TESTING **
/*
const checkArrays = function () {
    Object.keys(champVars).forEach(function (champKey) {
        Object.keys(champVars[champKey]).forEach(function (spellKey) {
            Object.keys(champVars[champKey][spellKey]).forEach(function (valueKey) {
                Object.keys(champVars[champKey][spellKey][valueKey]).forEach(function (value) {
                    if (typeof champVars[champKey][spellKey][valueKey][value] === "object" &&
                        value !== "child" &&
                        value !== "crit" &&
                        value !== "info" &&
                        value !== "valuePair" &&
                        spellKey !== "debuff" &&
                        champVars[champKey][spellKey][valueKey][value].length !== 18 &&
                        champVars[champKey][spellKey][valueKey][value].length !== 5 &&
                        !(champVars[champKey][spellKey][valueKey][value].length === 3 && spellKey === "sInfo3") &&
                        !(champVars[champKey][spellKey][valueKey][value].length === 4 && spellKey === "sInfo3")
                        ) {
                        console.log(champKey + "-" + spellKey + "-" + valueKey + "-" + value);
                        console.log(champVars[champKey][spellKey][valueKey][value]);
                    }
                });
            });   
            
        });
    });
};
checkArrays();
*/
/*
const checkValuePairs = function () {
    Object.keys(champVars).forEach(function (champKey) {
        Object.keys(champVars[champKey]).forEach(function (spellKey) {
            Object.keys(champVars[champKey][spellKey]).forEach(function (valueKey) {
                Object.keys(champVars[champKey][spellKey][valueKey]).forEach(function (value) {
                    if (value === "valuePair") {
                        console.log(champKey + "-" + spellKey + "-" + valueKey + "-" + value);
                        console.log(champVars[champKey]["sInfo" + champVars[champKey][spellKey][valueKey][value][0]][champVars[champKey][spellKey][valueKey][value][1]]);
                    }
                });
            });   
            
        });
    });
};
checkValuePairs();
*/
