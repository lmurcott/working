// Javascript file for theorycrunch.com
// Created by Logan Murcott
// github.com/lmurcott

const patch = "8.9.1";
var lang = "en_US", theLang, myChamps = {}, theRunes, theItems, sortedItems;

const loadJSON = function (file, callback, args = "") {// Load riot JSON files
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            callback(JSON.parse(xhttp.responseText), args);
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

// *** UI ***

const showHover = function (txt, x, y) {
  var hoverDiv;
  hoverDiv = document.getElementById("hoverDiv");
  hoverDiv.innerHTML = txt;
  hoverDiv.style.display = "block";
  if((x + 285) > (window.outerWidth)) {
    hoverDiv.style.left = (x - hoverDiv.scrollWidth - 5) + "px";
  } else {
    hoverDiv.style.left = (x + 5) + "px";
  }
  if((y + hoverDiv.scrollHeight) > (window.outerHeight - 125)) {
    hoverDiv.style.top = (y - hoverDiv.scrollHeight - 5) + "px";
  } else {
    hoverDiv.style.top = (y + 5) + "px";
  }
};

const hideHover = function () {
    document.getElementById("hoverDiv").style.display = "none";
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
    theLang.Reduction = theLang.CooldownReduction.replace(theLang.Cooldown, "");
    theLang.Regen = theLang.HealthRegen.replace(theLang.Health, "");
    theLang.AttackDamage = theLang.Attack + " " + theLang.Damage;
    theLang.MagicDamage = theLang.Magic + " " + theLang.Damage;
    //theLang.Cost = theLang.Cost_.replace(":", "");
};

const setChampList = function (json) {// Create options for selecting new champ
    "use strict";
    var opt, allOptions = document.createDocumentFragment();
    Object.keys(json.data).forEach(function (champ) {
        opt = document.createElement("option");
        opt.innerText = json.data[champ].name;
        opt.value = json.data[champ].id;
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
    delete theItems[3200].inStore;//viktor base item
    theItems[3200].tags = theItems[3198].tags;
    delete theItems[2003].consumed;//health potion

    sortedItems = Object.keys(theItems).sort(function (a, b) {
        return theItems[a].gold.total - theItems[b].gold.total;
    });
};

const setRunes = function (json) {
    theRunes = json;
};

// ** UPDATE SCRIPTS **

const update = function () {
    "use strict";
    Object.keys(myChamps).forEach(function (uid) {
        myChamps[uid].setBaseStats();
        myChamps[uid].setItemStats();
    });
    Object.keys(myChamps).forEach(function (uid) {
        myChamps[uid].drawStats();
    });
    Object.keys(myChamps).forEach(function (uid) {
        myChamps[uid].drawSkillTxt();
    });
};

// ** CHAMPION SCRIPTS **

const champObj = function (obj, side, uid) {// create champion object
    "use strict";
    let {aSpdBonus, buffs, debuffs, sInfoP, sInfo0, sInfo1, sInfo2, sInfo3} = champVars[obj.id],
        {id, image, name, partype, passive, spells, stats} = obj,
        attackdamage = [],
        ap = 0,
        aPen = [],// flat armor reduction, percent armor reduction, percent armor pen, flat armor pen/calulated lethality
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
        mPen = [],// flat magic reduction, percent magic reduction, percent magic pen, flat magic pen/calulated lethality
        mpregen = [stats.mpregen, 0, 0],
        spellblock = [],
        runePaths = [],
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
            
            aPen = [0, 0, 0, 0];
            // Lethality Items
            let lethality = 0;
            if (items.includes(3134)) {// Serrated Dirk
                lethality += 10;
            }
            if (items.includes(3142)) {// Youmuu
                lethality += 18;
            }
            if (items.includes(3147)) {// Duskblade
                lethality += 18;
            }
            if (items.includes(3814)) {// Edge of Night
                lethality += 18;
            }
            aPen[3] = round(calc(lethality, calc(0.6, calc(calc(0.4, level), 18, 3), 0)));
            
            if (items.includes(3036)) {// Lord Dominick's Regards
                aPen[2] = 35;
            } else if (items.includes(3033)) {// Mortal Reminder
                aPen[2] = 25;
            } else if (items.includes(3035)) {// Last Whisper
                aPen[2] = 10;
            }
            
            mPen = [0, 0, 0, 0];
        
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
                let inputDiv, spellInputDOM;
                switch (index) {
                case 0:
                    theNode.getElementsByTagName("h3")[0].innerText = theLang.Attack;
                    break;
                case 1:
                    theNode.getElementsByTagName("h3")[0].innerText = passive.name;
                    break;
                default:
                    theNode.getElementsByTagName("h3")[0].innerText = spells[index - 2].name;
                    if (myChamps[uid]["sInfo" + (index - 2)] && myChamps[uid]["sInfo" + (index - 2)].active) {
                        spellInputDOM = document.createElement("input");
                        spellInputDOM.type = "checkbox";
                        spellInputDOM.id = uid + "Input" + (index - 2);
                        spellInputDOM.addEventListener("change", update);
                        inputDiv = document.getElementById(uid).getElementsByClassName("skillInput")[index - 1];
                        inputDiv.innerText = theLang.Active + " ";
                        inputDiv.appendChild(spellInputDOM);
                    } else if (myChamps[uid]["sInfo" + (index - 2)] && myChamps[uid]["sInfo" + (index - 2)].input) {
                        spellInputDOM = document.createElement("input");
                        spellInputDOM.type = "number";
                        spellInputDOM.id = uid + "Input" + (index - 2);
                        spellInputDOM.min = 0;
                        spellInputDOM.value = 0;
                        if (myChamps[uid]["sInfo" + (index - 2)].input.max) {
                            spellInputDOM.max = myChamps[uid]["sInfo" + (index - 2)].input.max;
                        }
                        spellInputDOM.addEventListener("change", update);
                        inputDiv = document.getElementById(uid).getElementsByClassName("skillInput")[index - 1];
                        inputDiv.appendChild(spellInputDOM);
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
                let selectId;
                if (side === "1") {
                    selectId = "enemy0";
                } else {
                    selectId = "enemy1";
                }
                Array.from(document.getElementById(selectId)).find(function (option) {// remove option from enemy select
                    return option.value === uid;
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


            // Change Drop Box Divs

            let dropBtns = document.getElementById(uid).getElementsByClassName("dropTBar")[0].children;
            Array.from(dropBtns).forEach(function (element, btnIndex) {
                element.addEventListener("click", function () {
                    let dropDiv = document.getElementById(uid).getElementsByClassName("dropContent");
                    Array.from(dropDiv).forEach(function (div, divIndex) {
                        if (divIndex === btnIndex) {
                            div.style.display = "block";
                        } else {
                            div.style.display = "none";
                        }
                    });
                });
            });

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
                            theImg.addEventListener("mouseover", function (e) {
                                let description = theItems[itemNo].description;
                                description = description.replace(/size='\d*'/g, "");
                                showHover(theItems[itemNo].name + "<hr>" + description, e.pageX, e.pageY);
                            });
                            theImg.addEventListener("mouseout", hideHover);
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

            // add runes

            const getRuneObj = function (rune, path) {
                let runeFound;
                let slotNo = -1;
                while (!runeFound) {
                    slotNo += 1;
                    runeFound = theRunes[path].slots[slotNo].runes.find(function (theRune) {
                        return theRune.id === rune;
                    });
                }
                return [runeFound, slotNo];
            };

            const drawPaths = function (rank, exclude) {
                let runeDiv = document.getElementById(uid).getElementsByClassName("runes" + rank)[0];
                while (runeDiv.hasChildNodes()) {
                    runeDiv.removeChild(runeDiv.lastChild);
                }
                theRunes.forEach(function (path, num) {
                    if (!(exclude && exclude === num)) {
                        let pathImg = document.createElement("img");
                        let pathDiv = document.createElement("div");
                        pathDiv.classList.add("runeDiv");
                        pathImg.src = "https://ddragon.leagueoflegends.com/cdn/img/" + path.icon;
                        pathImg.addEventListener("click", function () {
                            runePaths[rank] = num;
                            drawAllRunes(rank, true);
                        });
                        pathDiv.appendChild(pathImg);
                        runeDiv.appendChild(pathDiv);
                    }
                });
            };

            const drawAllRunes = function (rank, newPath) {
               let runeDiv = document.getElementById(uid).getElementsByClassName("runes" + rank)[0];
                while (runeDiv.hasChildNodes()) {
                    runeDiv.removeChild(runeDiv.lastChild);
                }
                if (newPath){// input fresh set of default runes
                    runes[rank] = [];
                    theRunes[runePaths[rank]].slots.forEach(function (slot, num) {
                        if (!(rank === 1 && (num === 0 || num === 3))) {
                            runes[rank].push(slot.runes[0].id);
                        }
                    });
                    if (rank === 0 && (runePaths[1] === runePaths[0] || !runePaths[1])) {
                        drawPaths(1, runePaths[0]);
                    }
                }
                let pathDiv = document.createElement("div");
                pathDiv.classList.add("runeDiv");
                let pathImg = document.createElement("img");
                pathImg.src = "https://ddragon.leagueoflegends.com/cdn/img/" + theRunes[runePaths[rank]].icon;
                pathImg.addEventListener("click", function () {
                    if (rank === 1) {
                        drawPaths(rank, runePaths[0]);
                    } else {
                        drawPaths(rank);
                    }
                });
                pathDiv.appendChild(pathImg);
                runeDiv.appendChild(pathDiv);

                runes[rank].forEach(function (rune, index) {
                    let runeObj = getRuneObj(rune, runePaths[rank]);
                    let singleRuneDiv = document.createElement("div");
                    singleRuneDiv.classList.add("runeDiv");
                    let singleRuneImg = document.createElement("img");
                    singleRuneImg.src = "https://ddragon.leagueoflegends.com/cdn/img/" + runeObj[0].icon;
                    singleRuneImg.addEventListener("click", function () {
                        drawRuneOptions(rank, index);
                    });
                    singleRuneDiv.appendChild(singleRuneImg);
                    runeDiv.appendChild(singleRuneDiv);
                });
            };

            const drawRuneOptions = function (rank, runeSlot) {
                let runeDiv = document.getElementById(uid).getElementsByClassName("runes" + rank)[0];
                while (runeDiv.hasChildNodes()) {
                    runeDiv.removeChild(runeDiv.lastChild);
                }
                const drawRunes = function (slot, champRuneSlot) {
                    theRunes[runePaths[rank]].slots[slot].runes.forEach(function (rune) {
                        let singleRuneDiv = document.createElement("div");
                        singleRuneDiv.classList.add("runeDiv");
                        let singleRuneImg = document.createElement("img");
                        singleRuneImg.addEventListener("click", function () {
                            runes[rank][champRuneSlot] = rune.id;
                            drawAllRunes(rank);
                        });
                        singleRuneImg.src = "https://ddragon.leagueoflegends.com/cdn/img/" + rune.icon;
                        singleRuneDiv.appendChild(singleRuneImg);
                        runeDiv.appendChild(singleRuneDiv);
                    });
                };
                if (rank === 1) {
                    const runeSlot0 = getRuneObj(runes[1][0], runePaths[rank])[1];
                    const runeSlot1 = getRuneObj(runes[1][1], runePaths[rank])[1];

                    switch (runeSlot) {
                        case 0:
                            drawRunes(runeSlot0, runeSlot);
                        break;
                        case 1:
                            drawRunes(runeSlot1, runeSlot);
                        break;
                    }
                    let extraSlotNum = 1;
                    while (extraSlotNum === runeSlot0 || extraSlotNum === runeSlot1) {
                        extraSlotNum += 1;
                    }
                    drawRunes(extraSlotNum, runeSlot);
                } else  {
                    drawRunes(runeSlot, runeSlot);
                }
            };

            drawPaths(0);

            //add enemy select option

            let champOpt = document.createElement("option");
            champOpt.innerText = name;
            champOpt.value = uid;
            if (side === 1) {
                document.getElementById("enemy0").appendChild(champOpt);
            } else {
                document.getElementById("enemy1").appendChild(champOpt);
            }
        },
        drawStats = function () {
            let theLi, oldMaxHP, oldCurrentHP;
            let statBox = document.getElementById(uid).getElementsByClassName("statList")[0],
                frag = document.createDocumentFragment(),
                maxHp = hp[0] + hp[1];
            
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
            statList.push(
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
                theLi = document.createElement("li");
                theLi.innerText = stat[0] + ": " + stat[1];
                frag.appendChild(theLi);
            });
            statBox.appendChild(frag);
        },
        drawSkillTxt = function () {
            const refineTtip = function (spellNo) {
                let riotObj, spellLvl;
                const myObj = myChamps[uid]["sInfo" + spellNo];
                
                var enemyUID;
                
                if (document.getElementById("enemy" + side).length > 0){
                    enemyUID = document.getElementById("enemy" + side).value;
                }

                if (spellNo !== "P") {
                    riotObj = spells[spellNo];
                    spellLvl = document.getElementById(uid).getElementsByClassName("spellLvl")[spellNo].value;
                    spellLvl = (spellLvl < 1)
                        ? 0
                        : spellLvl - 1;
                }
                let tooltip = (spellNo === "P")
                    ? passive.description
                    : spells[spellNo].tooltip;

                if (myObj && myObj.txt) {
                    tooltip += myObj.txt;
                }

                if (myObj && spellNo === "P") {
                    Object.keys(myObj).forEach(function (id) {
                        if (id.length < 3) {
                            tooltip += "<br>" + theLang[myObj[id].info] + ": {{ " + id + " }}";
                        }
                    });
                }

                tooltip = tooltip.replace(/<span.class="\w*\d*.?color......">/g, "");
                tooltip = tooltip.replace(/<\/span>/g, "");
                tooltip = tooltip.replace(/[*][\d.]*/g, "");

                const keys = tooltip.match(/\{\{[^}]*\}\}/g);

                const getVar = function (theVar) {
                    let theCoeff, stat;
                    if (typeof theVar.coeff === "object") {
                        if (theVar.coeff.length > 4) {
                            theCoeff = theVar.coeff[level - 1];
                        } else {
                            theCoeff = theVar.coeff[spellLvl];
                        }
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
                    case "input":
                        if (spellNo === "P" || document.getElementById(uid).getElementsByClassName("spellLvl")[theVar.inputId].value > 0) {
                            stat = document.getElementById(uid + "Input" + theVar.inputId).value;
                        } else {
                            stat = 0;
                        }
                        break;
                    case "maxHp":
                        stat = hp[0] + hp[1];
                        break;
                    case "missingHp":
                        if (document.getElementById(uid + "HP")) {
                            stat = Number((hp[0] + hp[1]) - parseInt(document.getElementById(uid + "HP").value) + "e-2");
                        } else {
                            stat = 0;
                        }
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
case "percentMissingHp":
let missHp;
if (document.getElementById(this.uid + "currHp")) {
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
if (this.myItems.includes(3031) || this.myItems.includes(3371)) {//I Edge
stat = 500;
} else {
stat = 0;
}
break;
case "ashePassive":
let asheMulti = Number(this.crit + "e2");
if (this.myItems.includes(3031) || this.myItems.includes(3371)) {
asheMulti = Number((asheMulti * 15) + "e-1");
}
asheMulti += 10;
stat = Number(((this.attackdamage[0] + this.attackdamage[1]) * asheMulti) + "e-1");
break;
case "caitPassive":
let caitMulti = (this.crit > 1) ? 100:Number(this.crit + "e2");
if (this.myItems.includes(3031) || this.myItems.includes(3371)) {//iedga
caitMulti += 25;
}
stat = Number((this.attackdamage[0] + this.attackdamage[1]) * caitMulti + "e-1");
break;
case "jhinPassive":
stat = Math.round(Number(25 * this.attackspeed[1] + "e-1"));
stat += Number(4 * this.crit + "e2");
break;
case "rengarPassive":
if (document.getElementById(this.uid + "numP")) {
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
if (document.getElementById(this.uid + "numP")) {
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
if (this.myItems.includes(3031) || this.myItems.includes(3371)) {
shacoMulti += 50;
}
stat = Number((this.attackdamage[0] + this.attackdamage[1]) * shacoMulti + "e-1");

*/
                const getValue = function (theKey, no = spellNo) {
                    let value = "";

                    const keyObj = (myChamps[uid]["sInfo" + no])
                        ? myChamps[uid]["sInfo" + no][theKey]
                        : undefined;
                    //put exemption for pre calculated buffs

                    if (theKey.charAt(0) === "e" && (theKey.length === 2 || (theKey.length === 3 && theKey.charAt(2) === "a"))) {
                        value = (theKey.charAt(1) === 0)
                            ? riotObj.effect[10][spellLvl]
                            : riotObj.effect[theKey.charAt(1)][spellLvl];
                    }
                    if (myChamps[uid]["sInfo" + no] && keyObj) {
                        if (keyObj.empty) {
                            return "";
                        }
                        value = (value === "")
                            ? 0
                            : value;
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
                            value = calc(value, getValue(keyObj.valuePair[1], keyObj.valuePair[0]), 0);
                        }
                        if (keyObj.child) {
                            keyObj.child.forEach(function (varKey) {
                                let varObj;
                                if (spellNo !== "P") {
                                    varObj = spells[spellNo].vars.find(function (theVar) {
                                        return theVar.key === varKey;
                                    });
                                }
                                if (!varObj) {
                                    varObj = myObj[varKey];
                                }
                                value = calc(value, getVar(varObj), 0);
                            });
                        }
                        if (keyObj.multiplier) {
                            if (typeof keyObj.value === "object") {
                                value = calc(value, Number(keyObj.multiplier[spellLvl] + "e-2"));
                            } else {
                                value = calc(value, Number(keyObj.multiplier + "e-2"));
                            }
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
                };

                const getDmg = function (rawDmg, type) {
                    let magDmg = 0, physDmg = 0, truDmg = 0;
                    switch (type) {
                    case "phys":
                        physDmg = rawDmg;
                        break;
                    case "mag":
                        magDmg = rawDmg;
                        break;
                    case "tru":
                        truDmg = rawDmg;
                        break;
                    case "hybrid":
                        physDmg = calc(rawDmg, 0.5);
                        magDmg = calc(rawDmg, 0.5);
                        break;
                    case "corkiAuto":
                        physDmg = calc(rawDmg, 0.2);
                        magDmg = calc(rawDmg, 0.8);
                    break;
                    }
                    
                    return [physDmg, magDmg, truDmg];
                };
                
                if (keys !== null) {
                    keys.forEach(function (key) {
                        let rawKey = key.replace(/\{\{./, "");
                        rawKey = rawKey.replace(/.\}\}/, "");
                        
                        let keyValue = getValue(rawKey);
                        
                        const replaceRegEx = new RegExp(key);
                            
//use map() for array sums
                        
                        if (myChamps[uid]["sInfo" + spellNo] && myChamps[uid]["sInfo" + spellNo][rawKey]) {
                            let keyObj = myChamps[uid]["sInfo" + spellNo][rawKey];
                            if (keyObj.apply) {// Remove Percent Sign from jp scaling variables
                                let percentLoc = tooltip.indexOf("%",tooltip.indexOf(rawKey));
                                tooltip = tooltip.slice(0, percentLoc) + tooltip.slice(percentLoc + 1);
                            }
                            if (keyObj.type) {
                                switch (keyObj.type) {
                                case "heal":
                                case "shield":
                                    break;
                                default:
                                    let dmgArray = getDmg(keyValue, keyObj.type);
                                    
                                    //calculate channel spells here....
                                    
                                    if (keyObj.type === "phys") {
                                        keyValue = "<span class='phys'>" + dmgArray[0] + "</span>";
                                        if (dmgArray[1] > 0) {
                                            keyValue += "<span class='mag'>[" + dmgArray[1] + "]</span>";
                                        }
                                        if (dmgArray[2] > 0) {
                                            keyValue += "<span class='tru'>[" + dmgArray[2] + "]</span>";
                                        }
                                    } else if (keyObj.type === "tru") {
                                        keyValue = "<span class='tru'>" + dmgArray[2] + "</span>";
                                        if (dmgArray[1] > 0) {
                                            keyValue += "<span class='mag'>[" + dmgArray[1] + "]</span>";
                                        }
                                        if (dmgArray[0] > 0) {
                                            keyValue += "<span class='phys'>[" + dmgArray[0] + "]</span>";
                                        }
                                    } else {
                                        keyValue = "<span class='mag'>" + dmgArray[1] + "</span>";
                                        if (dmgArray[0] > 0) {
                                            keyValue += "<span class='phys'>[" + dmgArray[0] + "]</span>";
                                        }
                                        if (dmgArray[2] > 0) {
                                            keyValue += "<span class='tru'>[" + dmgArray[2] + "]</span>";
                                        }
                                    }
                                }
                            }
                            
                            //add exception for vars with alternate values
                        }
                        tooltip = tooltip.replace(replaceRegEx, keyValue);
                    });
                }
                tooltip = tooltip.replace(/\(\+%?\)/g, "");
                tooltip = tooltip.replace(/<font.color\='#......'.?size\='..'>/g, "");
                tooltip = tooltip.replace(/\(\+%.Missing.Health\)/g, "");
                
                return tooltip;
            };
            let skillDivs = document.getElementById(uid).getElementsByClassName("skillTxt");
            Array.from(skillDivs).forEach(function (div, count) {
                switch (count) {
                case 0:
                    div.innerText = count;
                    break;
                case 1:
                    div.innerHTML = refineTtip("P");
                    break;
                default:
                    div.innerHTML = refineTtip(count - 2);
                }
            });
        },
        takeDmg = function (amount, type, flatPen = 0, percentPen = 0, bonusPercentPen = 0, ticks) {
            return 0;
        },
        getPercentHP = function (amount, type) {
            const
                maxHp = hp[0] + hp[1],
                currentHP = document.getElementById(uid + "HP").value;
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
        setBaseStats,
        setItemStats,
        drawChampDOM,
        drawStats,
        drawSkillTxt,
        addItem,
        takeDmg,
        getPercentHP
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
    myChamps[myUid] = champObj(json.data[Object.keys(json.data)], side, myUid);
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
loadJSON("runesReforged", setRunes);
loadJSON("champion", setChampList);