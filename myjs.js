// Javascript file for theorycrunch.com
// Created by Logan Murcott
// github.com/lmurcott

const patch = "8.9.1";
var lang = "en_US", theLang, myChamps = {}, theRunes, theItems, sortedItems;

const loadJSON = function (file, callback, args = "") {// Load riot JSON files
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            callback(JSON.parse(xhttp.responseText).data, args);
        }
    };
    xhttp.open("GET", `http://ddragon.leagueoflegends.com/cdn/${patch}/data/${lang}/${file}.json`, true);
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
        return Number(`${num1Int + num2Int}e-${Math.max(num1DP, num2DP)}`);
    case 1:// Subtraction
        return Number(`${num1Int - num2Int}e-${Math.max(num1DP, num2DP)}`);
    case 2:// Multiplication
        return Number(`${num1Int * num2Int}e-${num1DP + num2DP}`);
    case 3:// Division
        return num1Int / num2Int;
    }
};

const round = function (num, places = 0) {// Round number
    return Number(Math.round(Number(num + "e" + places)) + "e-" + places);
};

const calcBaseStats = function (b, g, n) {
    "use strict";
    return calc(b, calc(calc(g, (n - 1)), calc(0.7025, calc(0.0175, (n - 1)), 0)), 0);
};

const calcBaseAspd = function (delay) {
    "use strict";
    return round(calc(0.625, calc(1, delay, 0), 3),3);
};

const calcMoveSpeed = function (base, flat, percent = 0) {//add slow ratio and Multiplicative MS bonus
    //(Base MS + Flat MS bonuses) × (1 + Sum of all Additive Percent MS bonuses) × (1 - Highest Slow ratio) × Product of (1 + any Multiplicative MS bonus)
    var speed = calc((base + flat), calc(1, percent, 0));

    if (speed > 490) {
        speed = calc(calc(calc(speed, 490, 1), 0.5), 475, 0);
    }

    return speed;
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
    theLang = json;
    // Custom Language
    const findReduction = theLang.rPercentCooldownMod.replace("%", "");
    theLang.Cooldown = findReduction.replace(" ", "");
    theLang.Reduction = theLang.CooldownReduction.replace(theLang.Cooldown, "");
    theLang.Regen = theLang.HealthRegen.replace(theLang.Health, "");
    theLang.AttackDamage = theLang.Attack + " " + theLang.Damage;
    theLang.MagicDamage = theLang.Magic + " " + theLang.Damage;
    //theLang.Cost = theLang.Cost_.replace(":", "");
};

const setChampList = function (json) {// Create options for selecting new champ
    "use strict";
    var opt, allOptions = document.createDocumentFragment();
    Object.keys(json).forEach(function (champ) {
        opt = document.createElement("option");
        opt.innerText = json[champ].name;
        opt.value = json[champ].id;
        allOptions.appendChild(opt);
    });
    document.getElementById("chmpSlct0").appendChild(allOptions.cloneNode(true));
    document.getElementById("chmpSlct1").appendChild(allOptions.cloneNode(true));
};

const setItems = function (json) {
    "use strict";
    const
        delItem = [3043, 3048, 3007, 3008, 3073, 3029],
        delhideFromAll = [1400, 1401, 1402, 1412, 1413, 1414, 1416, 1419];

    theItems = json;
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
    delete theItems[3200].inStore;//viktor base item
    theItems[3200].tags = theItems[3198].tags;
    delete theItems[2003].consumed;//health potion

    sortedItems = Object.keys(theItems).sort(function (a, b) {
        return theItems[a].gold.total - theItems[b].gold.total;
    });
};

// ** UPDATE SCRIPTS **

const update = function () {
    "use strict";
    Object.keys(myChamps).forEach(function (uid) {
        myChamps[uid].setBaseStats();
        myChamps[uid].setItemStats();
        myChamps[uid].drawStats();
        myChamps[uid].drawSkillTxt();
    });
};

// ** CHAMPION SCRIPTS **

const champObj = function (obj, side, uid) {// create champion object
    "use strict";
    let {aSpdBonus, buffs, debuffs, pInfo, sInfo0, sInfo1, sInfo2, sInfo3} = champVars[obj.id],
        {id, image, name, partype, passive, spells, stats} = obj,
        attackdamage = [],
        ap = 0,
        aPen = [],
        armor = [],
        attackspeed = [calcBaseAspd(stats.attackspeedoffset)],
        buffStats = [],
        cdr = [],
        crit = 0,
        dmgReduc = [],
        hp = [],
        hpregen = [],
        items = [],
        level = 1,
        lifeSteal = 0,
        move = [],
        mp = [stats.mp, 0],
        mPen = [],
        mpregen = [stats.mpregen, 0, 0],
        spellblock = [],
        rPaths = [],
        rSlots = [],
        runes = [],
        setBaseStats = function () {
            level = document.getElementById(uid).getElementsByClassName("champLevel")[0].value;
            attackdamage[0] = round(calcBaseStats(stats.attackdamage, stats.attackdamageperlevel, level));
            armor[0] = round(calcBaseStats(stats.armor, stats.armorperlevel, level));
            attackspeed[1] = Number(round(calcBaseStats(0, stats.attackspeedperlevel, level)) + "e-2");
            hp[0] = round(calcBaseStats(stats.hp, stats.hpperlevel, level));
            hpregen[0] = round(calcBaseStats(stats.hpregen, stats.hpregenperlevel, level), 1);
            if (stats.mpperlevel !== 0) {
                mp[0] = round(calcBaseStats(stats.mp, stats.mpperlevel, level));
            }
            if (stats.mpregenperlevel !== 0) {
                mpregen[0] = round(calcBaseStats(stats.mpregen, stats.mpregenperlevel, level), 1);
            }
            spellblock[0] = round(calcBaseStats(stats.spellblock, stats.spellblockperlevel, level));
            cdr[0] = 0;
            move[0] = stats.movespeed;
        },
        setItemStats = function () {
            let statObj = {};

            if (items.length > 0) {
                items.forEach(function (itemNo) {
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
            //add unique item additive stats

            hp[1] = setStat("FlatHPPoolMod");
            armor[1] = setStat("FlatArmorMod");
            spellblock[1] = setStat("FlatSpellBlockMod");
            ap = setStat("FlatMagicDamageMod");
            attackdamage[1] = setStat("FlatPhysicalDamageMod");
            hpregen[1] = setStat("FlatHPRegenMod");
            crit = setStat("FlatCritChanceMod");
            move[1] = setStat("FlatMovementSpeedMod");
            move[2] = setStat("PercentMovementSpeedMod");
            lifeSteal = setStat("PercentLifeStealMod");
            if (statObj.hasOwnProperty("PercentAttackSpeedMod")) {// Attack Speed
                attackspeed[1] = calc(statObj.PercentAttackSpeedMod, attackspeed[1], 0);
            }
            if (partype === theLang.Mana) {
                mp[1] = setStat("FlatMPPoolMod");
            }
        },
        addItem = function (itemNo) {
            const
                toogleItems = [3800, 2065, 3001, 3379, 3285, 3145, 3303, 3098, 3092, 2301, 1402, 1410, 1414, 3100, 3384, 3025, 3078, 3057, 2015, 3087, 3094, 3134, 3147, 3742, 2031, 2032, 2033, 2003, 3194, 3174, 3252],
                stackItems = [3124, 3091, 1082, 3041, 3027, 3151, 3136, 3907];
            let itemDOM = document.getElementById(uid).getElementsByClassName("champItems")[0];
            const checkBoots = function (items) {
                return items.some(function (itemNo) {
                    return theItems[itemNo].tags.includes("Boots");
                });
            };
            if (items.length < 6 && !(theItems[itemNo].tags.includes("Boots") && checkBoots(items))) {
                let theDiv = document.createElement("div"),
                    theImg = document.createElement("img");

                theImg.src = "http://ddragon.leagueoflegends.com/cdn/" + patch + "/img/item/" + itemNo + ".png";
                theDiv.appendChild(theImg);

                let theInput;
                if (toogleItems.includes(itemNo) && !items.includes(itemNo)) {
                    theInput = document.createElement("input");
                    theInput.id = "cb" + uid + itemNo;
                    theInput.type = "checkbox";
                    theInput.addEventListener("change", update);
                    theDiv.appendChild(theInput);
                } else if (stackItems.includes(itemNo) && !items.includes(itemNo)) {
                    theInput = document.createElement("input");
                    theInput.id = "num" + uid + itemNo;
                    theInput.type = "number";
                    theInput.min = 0;
                    theInput.value = 0;
                    switch (itemNo) {
                    case 1082:
                        theInput.max = 10;
                        break;
                    case 3041:
                        theInput.max = 25;
                        break;
                    case 3091:
                        theInput.max = 5;
                        break;
                    case 3124:
                        theInput.max = 6;
                        break;
                    case 3027://roa
                        theInput.max = 10;
                        break;
                    case 3151://liandry
                    case 3136://haunting guise
                        theInput.max = 5;
                        break;
                    case 3907://spellbinder
                        theInput.max = 100;
                        break;
                    }
                    theInput.addEventListener("change", update);
                    theDiv.appendChild(theInput);
                }
                theDiv.classList.add("itemIcon");
                itemDOM.appendChild(theDiv);
                items.push(itemNo);
            }
            update();
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
            finalDOM.getElementsByClassName("champHead")[0].style.backgroundImage = "url('http://ddragon.leagueoflegends.com/cdn/" + patch + "/img/champion/" + image.full + "')";

            let skillDesc = finalDOM.getElementsByClassName("skillDesc");

            Array.from(skillDesc).forEach(function (theNode, index) {
                switch (index) {
                case 0:
                    theNode.getElementsByTagName("h3")[0].innerText = theLang.Attack;
                    break;
                case 1:
                    theNode.getElementsByTagName("h3")[0].innerText = passive.name;
                    break;
                default:
                    theNode.getElementsByTagName("h3")[0].innerText = spells[index - 2].name;
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
                    if (index === 5 && spells[3].maxrank !== 3) {
                        theNode.getElementsByTagName("input")[0].max = spells[3].maxrank;
                        theNode.getElementsByTagName("input")[0].min = 1;
                        theNode.getElementsByTagName("input")[0].value = 1;
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

            finalDOM.getElementsByClassName("killBtn")[0].addEventListener("click", function () {
                finalDOM.remove();// remove main div
                Array.from(document.getElementById("enemy" + side)).find(function (option) {// remove option from enemy select
                    return option.value = uid;
                }).remove();
                delete myChamps[uid];// remove object
                update();
            }, false);

            finalDOM.getElementsByClassName("advOpt")[0].addEventListener("click", function () {
                let element = finalDOM.getElementsByClassName("dropPanel")[0];
                if (element.style.display === "block") {
                    element.style.display = "none";
                } else {
                    element.style.display = "block";
                }
            }, false);

            // Add Item Categories
            let catsDOM = finalDOM.getElementsByClassName("itemCats")[0],
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
            let mapDOM = finalDOM.getElementsByClassName("itemMaps")[0],
                mapFrag = document.createDocumentFragment();

            itemMap.forEach(function (map) {
                let theOption = document.createElement("option");
                theOption.value = map[1];
                theOption.innerText = map[0];
                mapFrag.appendChild(theOption);
            });
            mapDOM.appendChild(mapFrag);

            const searchDOM = finalDOM.getElementsByClassName("itemSearch")[0];

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
                    let itemBox = finalDOM.getElementsByClassName("items")[0],
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
            finalDOM.getElementsByClassName("levelTxt")[0].innerText = theLang.Level;
            
            //add enemy select option
            
            let champOpt = document.createElement("option");
            champOpt.innerText = name;
            champOpt.value = uid;
            document.getElementById("enemy" + side).appendChild(champOpt);
        },
        drawStats = function () {
            let statBox = document.getElementById(uid).getElementsByClassName("statList")[0],
                frag = document.createDocumentFragment();
            while (statBox.childElementCount > 1) {
                statBox.removeChild(statBox.lastChild);
            }
            let statList = [];
            statList.push(
                [theLang.Health, hp[0] + hp[1]],
                [theLang.HealthRegen, hpregen[0] + hpregen[1]],
                [theLang.Armor, armor[0] + armor[1]],
                [theLang.SpellBlock, spellblock[0] + spellblock[1]],
                [theLang.AttackDamage, attackdamage[0] + attackdamage[1]],
                [theLang.AttackSpeed, round(calc(attackspeed[0], calc(1, attackspeed[1], 0)), 3)],
                [theLang.CriticalStrike, Number(crit + "e2") + "%"],
                [theLang.LifeSteal, Number(lifeSteal + "e2") + "%"],
                [theLang.SpellDamage, ap],
                [theLang.CooldownReduction, cdr + "%"],
                [theLang.Movement, calcMoveSpeed(move[0], move[1], move[2])]
            );

            if (partype === theLang.Mana) {
                statList.push(
                    [partype, mp[0] + mp[1]],
                    [theLang.ManaRegen, mpregen[0]]
                );
            } else if (mpregen[0] > 0) {
                statList.push(
                    [partype, mp[0]],
                    [partype + theLang.Regen, mpregen[0]]
                );
            } else if (mp[0] > 0) {
                statList.push(
                    [partype, mp[0]]
                );
            }

            statList.forEach(function (stat) {
                let theLi = document.createElement("li");
                theLi.innerText = stat[0] + ": " + stat[1];
                frag.appendChild(theLi);
            });
            statBox.appendChild(frag);
        },
        drawSkillTxt = function () {
            let skillDivs = document.getElementById(uid).getElementsByClassName("skillTxt");

            const refineTtip = function (spellNo) {
                const
                    riotObj = spells[spellNo],
                    myObj = myChamps[uid]["sInfo" + spellNo];

                let tooltip = spells[spellNo].tooltip,
                    spellLvl = document.getElementById(uid).getElementsByClassName("spellLvl")[spellNo].value;

                spellLvl = (spellLvl < 1)
                    ? 0
                    : spellLvl - 1;

                if (myObj && myObj.txt) {
                    tooltip += myObj.txt;
                }
                tooltip = tooltip.replace(/<span.class="\w*\d*.?color......">/g, "");
                tooltip = tooltip.replace(/<\/span>/g, "");
                tooltip = tooltip.replace(/[*][\d.]*/g, "");

                const keys = tooltip.match(/\{\{[^}]*\}\}/g);
                
                const getVar = function (theVar) {
                    let theCoeff, stat;
                    if(typeof theVar.coeff === "object") {
                        theCoeff = theVar.coeff[spellLvl];
                    } else {
                        theCoeff = theVar.coeff;
                    }
                    switch (theVar.link) {
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
                    case "bonusHp":
                        stat = hp[1];
                        break;
                    case "bonusmr":
                        stat = spellblock[1];
                        break;
                    case "champLevel":
                        stat = level;
                        break;
                    case "maxHp":
                        stat = hp[0] + hp[1];
                        break;
                    case "mr":
                        stat = spellblock[0] + spellblock[1];
                        break;
                    case "spelldamage":
                        stat = ap;
                        break;
                    default:
                        console.log(theVar.link);
                        stat = 0;
                    }
                    return calc(theCoeff, stat);
                };
                    
/*

case "baseGrowth":
case "baseGrowthAtkSpd":
break;
case "bonusattackspeed"://for jhin, kaisa, and varus
stat = Number(this.attackspeed[1]);
break;
case "bonusmovespeed":
stat = Number(this.getMoveSpeed() - this.movespeed[0] + "e1");
break;
case "mana":
stat = Number(this.mp[0] + "e1") + Number(this.mp[1] + "e1");
break;
case "missingHp":
stat = Math.round(Number(Number(this.hp[0] + "e1") + Number(this.hp[1] + "e1") - Number(document.getElementById(this.uid + "currHp").value + "e1") + "e-2"));
break;
case "percentMissingHp":
let missHp;
if(document.getElementById(this.uid + "currHp")) {
missHp = document.getElementById(this.uid + "currHp").value / (this.hp[0] + this.hp[1]);
} else {
missHp = 1;
}
stat = 1000 - Math.floor(Number(missHp + "e3"));
break;
case "@cooldownchampion":
stat = (this.cdr[0] > this.cdr[1]) ? 100 - this.cdr[1]:100 - this.cdr[0];
break;
case "critChance":
stat = (this.crit > 1)? 1000:Number(this.crit + "e3");
break;
case "bonusCritDamage":
if(this.myItems.includes(3031) || this.myItems.includes(3371)) {//I Edge
stat = 500;
} else {
stat = 0;
}
break;
case "input":
if(theVars.inputId === "P" ||
document.getElementById(this.uid + "skillLvl" + theVars.inputId).value > 0) {//check level for stacks that scale other abilities
stat = Number(document.getElementById(this.uid + "num" + theVars.inputId).value + "e1");
} else {
stat = 0;
}
break;
case "ashePassive":
let asheMulti = Number(this.crit + "e2");
if(this.myItems.includes(3031) || this.myItems.includes(3371)) {
asheMulti = Number((asheMulti * 15) + "e-1");
}
asheMulti += 10;
stat = Number(((this.attackdamage[0] + this.attackdamage[1]) * asheMulti) + "e-1");
break;
case "caitPassive":
let caitMulti = (this.crit > 1) ? 100:Number(this.crit + "e2");
if(this.myItems.includes(3031) || this.myItems.includes(3371)) {//iedga
caitMulti += 25;
}
stat = Number((this.attackdamage[0] + this.attackdamage[1]) * caitMulti + "e-1");
break;
case "jhinPassive":
stat = Math.round(Number(25 * this.attackspeed[1] + "e-1"));
stat += Number(4 * this.crit + "e2");
break;
case "rengarPassive":
if(document.getElementById(this.uid + "numP")) {
switch(document.getElementById(this.uid + "numP").value) {
case "0":
stat = 0;
break;
case "1":
stat = Math.round(Number(this.attackdamage[1] + "e-2"));
break;
case "2":
stat = Math.round(Number(this.attackdamage[1] * 4 + "e-2"));
break;
case "3":
stat = Math.round(Number(this.attackdamage[1] * 9 + "e-2"));
break;
case "4":
stat = Math.round(Number(this.attackdamage[1] * 16 + "e-2"));
break;
case "5":
stat = Math.round(Number(this.attackdamage[1] * 25 + "e-2"));
break;
case "6":
stat = Math.round(Number(this.attackdamage[1] * 36 + "e-2"));
break;
default:
stat = 0;
}
} else {
stat = 0;
}
break;
case "swainFragments":
if(document.getElementById(this.uid + "numP")) {
let baseFragDmg = Math.round(Number(this.ap * 27 + "e-2"));
let ultLvl = document.getElementById(this.uid + "skillLvl3").value;
ultLvl = (ultLvl > 0) ? ultLvl - 1:0;
baseFragDmg += this.spells[3].effect[10][ultLvl];
stat = Number(baseFragDmg * parseInt(document.getElementById(this.uid + "numP").value) + "e1");
} else {
stat = 0;
}
break;
case "shacoPassive":
let shacoMulti = 130;
if(this.myItems.includes(3031) || this.myItems.includes(3371)) {
shacoMulti += 50;
}
stat = Number((this.attackdamage[0] + this.attackdamage[1]) * shacoMulti + "e-1");

*/
                const getValue = function (theKey) {
                    let value = "";

                    //put exemption for pre calculated buffs

                    if (theKey.charAt(0) === "e" && (theKey.length === 2 || (theKey.length === 3 && theKey.charAt(2) === "a"))) {
                        value = (theKey.charAt(1) === 0)
                            ? riotObj.effect[10][spellLvl]
                            : riotObj.effect[theKey.charAt(1)][spellLvl];
                    }
                    if (myObj && myObj[theKey]) {
                        if (myObj[theKey].empty) {
                            return "";
                        }
                        value = (value === "")
                            ? 0
                            : value;
                        if (myObj[theKey].effectNo) {
                            value = calc(value, riotObj.effect[myObj[theKey].effectNo][spellLvl], 0);
                        }
                        if (myObj[theKey].value) {
                            if(typeof myObj[theKey].value === "object") {
                                value = calc(value, myObj[theKey].value[spellLvl], 0);
                            } else {
                                value = calc(value, myObj[theKey].value, 0);
                            }
                        }
                        if (myObj[theKey].valuePerLvl) {
                            value = calc(value, myObj[theKey].valuePerLvl[level - 1], 0);
                        }
                        if (myObj[theKey].child) {
                            myObj[theKey].child.forEach(function (varKey){
                                let varObj = spells[spellNo].vars.find( function (theVar) {
                                    return theVar.key === varKey;
                                });
                                if (!varObj) {
                                    varObj = myObj[varKey];
                                }
                                value = calc(value, getVar(varObj), 0);
                            });
                            
                        }
                        if (myObj[theKey].multiplier) {
                            if(typeof myObj[theKey].value === "object") {
                                value = calc(value, Number(myObj[theKey].multiplier[spellLvl] + "e-2"));
                            } else {
                                value = calc(value, Number(myObj[theKey].multiplier + "e-2"));
                            }
                        }
                    }
                    return value;
                };
                keys.forEach(function (key) {
                    let rawKey = key.replace(/\{\{./, "");
                    rawKey = rawKey.replace(/.\}\}/, "");
                    const
                        keyValue = getValue(rawKey),
                        replaceRegEx = new RegExp(key);

                    tooltip = tooltip.replace(replaceRegEx, keyValue);
                    tooltip = tooltip.replace(/\(\+\%?\)/g, "");
                    tooltip = tooltip.replace(/<font.color\=\'\#......\'.?size\=\'..\'>/g, "");
                    tooltip = tooltip.replace(/\(\+\%.Missing.Health\)/g, "");
                });
                return tooltip;
            };

            Array.from(skillDivs).forEach(function (div, count) {
                switch (count) {
                case 0:
                    div.innerText = count;
                    break;
                case 1:
                    div.innerHTML = passive.description;
                    break;
                default:
                    div.innerHTML = refineTtip(count - 2);
                }
            });
        };
    return {
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
        dmgReduc,
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
        pInfo,
        rPaths,
        rSlots,
        runes,
        side,
        sInfo0,
        sInfo1,
        sInfo2,
        sInfo3,
        spellblock,
        spells,
        stats,
        uid,
        setBaseStats,
        setItemStats,
        drawChampDOM,
        drawStats,
        drawSkillTxt,
        addItem
    };
};

const newChamp = function (json, side) {
    "use strict";
    const newUID = function () {//Generate Unique Id for Champs
        let uid = "", i = 4, possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        while (i > 0) {
            uid += possible.charAt(Math.floor(Math.random() * possible.length));
            i -= 1;
        }
        return uid;
    };
    const myUid = newUID();
    myChamps[myUid] = champObj(json[Object.keys(json)], side, myUid);
    myChamps[myUid].drawChampDOM();
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
loadJSON("champion", setChampList);