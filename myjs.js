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
        //return Number(`${num1Int + num2Int}e-${Math.max(num1DP, num2DP)}`);
        return Number(num1Int + num2Int + "e-" + Math.max(num1DP, num2DP));
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
};

const setRunes = function (json) {
    theRunes = json;
};

// ** UPDATE SCRIPTS **

const update = function () {
    "use strict";
    Object.keys(myChamps).forEach(function (uid) {
        myChamps[uid].setStats();
    });
    Object.keys(myChamps).forEach(function (uid) {
        myChamps[uid].drawStats();
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
        aPen = [],// flat reduction, percent reduction, percent pen, flat pen
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
        mPen = [],// flat reduction, percent reduction, percent pen, flat pen
        mpregen = [stats.mpregen, 0, 0],
        spellblock = [],
        runePaths = [],
        runes = [[],[]],
        getAdapt = function () {
            if(ap === attackdamage[1]) {
                const magChamps = ["Ahri","AurelionSol","Alistar","Amumu","Anivia","Annie","Azir","Bard","Brand","Cassiopeia","Chogath",
                "Diana","Ekko","Elise","Evelynn","Fiddlesticks","Fizz","Galio","Gragas","Heimerdinger","Ivern","Janna","Karma","Karthus",
                "Kassadin","Katarina","Kayle","Kennen","Leblanc","Lissandra","Lulu","Lux","Malphite","Malzahar","Maokai","Mordekaiser",
                "Morgana","Nami","Nautilus","Nidalee","Nunu","Orianna","Rakan","Rumble","Ryze","Singed","Sona","Soraka","Swain","Syndra","Taliyah",
                "Taric","TwistedFate","Veigar","Velkoz","Viktor","Vladimir","Xerath","Zac","Ziggs","Zilean","Zoe","Zyra"];
                if(magChamps.includes(id)) {
                    return "mag";
                } else {
                    return "phys";
                }
            } else if(ap > attackdamage[1]) {
                return "mag";
            } else if(ap < attackdamage[1]) {
                return "phys";
            }
        },
        itemCheck = function (itemID, status) {
            if (items.includes(itemID)) {
                if (status && !document.getElementById(uid + itemID).checked) {
                    return false;
                }
                return true;
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
                cdr = [0, 0.4];
                move[0] = stats.movespeed;
                move[3] = parseInt(document.getElementById(uid).querySelector(".slow").value);// slow
            };
            const setItemStats = function () {
                let statObj = {};
                hpregen[2] = 0;
                mpregen[1] = 0;
                mpregen[2] = 0;

                if (items.length > 0) {
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
                            regen100 = [3174, 3222],
                            regen150 = [3107],
                            regen200 = [3382];
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
                        
                        const//non unique cdr
                            cdr5 = [3301],
                            cdr10  = [3001,3194,3504,3174,3060,3102,3812,3147,3401,3092,3098,3152,3379,3109,3100,3104,3156,3222,3096,3056,3107,3800,3382,3057,3065,3069,1400,1408,1412,3142,3050,3157,3386,3285,3030,3003,3040,3905,1402,1414],
                            cdr20 = [3025,3110,3071,3380,3384,3078];
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
                move[3] = 0;// slow resist
                lifeSteal = setStat("PercentLifeStealMod");
                if (statObj.hasOwnProperty("PercentAttackSpeedMod")) {// Attack Speed
                    attackspeed[1] = calc(statObj.PercentAttackSpeedMod, attackspeed[1], 0);
                }
                if (partype === theLang.Mana) {
                    mp[1] = setStat("FlatMPPoolMod");
                }

                // ** UNIQUE STATS **
                if (itemCheck(3211, true)) {// spectre cowl active
                    hpregen[2] = calc(1.5, hpregen[2], 0);
                }
                if (itemCheck(3742, true)) {// deadmans
                    move[1] = calc(60, move[1], 0);
                }
                // unique cdr
                const
                    uniqCdr10 = [2065,3133,3108,3114,3024,3158,3067,3101,3083,3508],
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
                if(//haste cdr
                    items.includes(3285)||
                    items.includes(3802)||
                    items.includes(3030)||
                    items.includes(3003)||
                    items.includes(3040)
                ) {
                    cdr[0] = calc(0.1, cdr[0], 0);
                }
                
                // Armour Penetration
                aPen = [0, 0, 0, 0];
                if (items.includes(3036)) {// Lord Dominick's Regards
                    aPen[2] = 35;
                } else if (items.includes(3033)) {// Mortal Reminder
                    aPen[2] = 25;
                } else if (items.includes(3035)) {// Last Whisper
                    aPen[2] = 10;
                }
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
                //Magic Penetration
                mPen = [0, 0, 0, 0];
                if (items.includes(3135)) {// Void Staff
                    mPen[2] = calc(40, mPen[2], 0);
                }
                if (items.includes(3916) || items.includes(3165)) {// Cursed Strike
                    mPen[3] = calc(15, mPen[3], 0);
                }
                if (items.includes(3020)) {// Sorc Shoes
                    mPen[3] = calc(18, mPen[3], 0);
                }
                //Slow Resist
                if(items.includes(3009)) {//swift boots
                    move[3] += 25;
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
                        "6" : {// ryze q
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
                        }
                    };
                    Array.from(abilityLvls).forEach(function (theDOM) {
                        if(theDOM.value !== "0") {
                            let theLvl = rquiredSkillLvl[theDOM.max][parseInt(theDOM.value)];
                            if (theLvl > lvlRquired) {
                                lvlRquired = theLvl;
                            }
                        }
                    });
                }
                levelDOM.value = lvlRquired;
                level = lvlRquired;
            };
            const setRuneStats = function () {
                /*
                if(this.myRunes[0].includes(8230) && document.getElementById(this.uid + "cb8230").checked) {//phase rush
                slowResist += 75;
                }
                if((this.myRunes[0].includes(8242) || this.myRunes[1].includes(8242)) && document.getElementById(this.uid + "cb8242").checked) {//unflinching
                slowResist += 15;
                }
                */
            };
            const setRunePathStats = function () {
            };
            const setStatMultis = function () {

            };
            setLevel();
            setBaseStats();
            setItemStats();
            setRuneStats();
            setRunePathStats();
            setStatMultis();
        },
        addItem = function (itemNo) {
            let itemDOM = document.getElementById(uid).getElementsByClassName("champItems")[0];
            const checkBoots = function () {
                return items.some(function (itemNo) {
                    return theItems[itemNo].tags.includes("Boots");
                });
            };
            if (items.length < 6 && !(theItems[itemNo].tags.includes("Boots") && checkBoots())) {
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
                    3211
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
                    hideHover();
                    update();
                });
                theImg.addEventListener("mouseover", function (e) {
                    let description = theItems[itemNo].description;
                    description = description.replace(/size='\d*'/g, "");
                    showHover(theItems[itemNo].name + "<hr>" + description, e.pageX, e.pageY);
                });
                theImg.addEventListener("mouseout", hideHover);
                theDiv.appendChild(theImg);
                if (((toogleItems.includes(itemNo) && !items.includes(itemNo)) || maxValue[itemNo]) && !items.includes(itemNo)) {
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
                let inputDiv, spellInputDOM;
                switch (index) {
                case 0:
                    theNode.getElementsByTagName("h3")[0].innerText = theLang.Attack;
                    break;
                case 1:
                    theNode.getElementsByTagName("h3")[0].innerText = passive.name;
                    if (sInfoP && (sInfoP.active || sInfoP.input)) {
                        spellInputDOM = document.createElement("input");
                        spellInputDOM.type = (sInfoP.active) ? "checkbox" : "number";
                        spellInputDOM.id = uid + "InputP";
                        spellInputDOM.addEventListener("change", update);
                        inputDiv = document.getElementById(uid).getElementsByClassName("skillInput")[index - 1];
                        if (sInfoP.active) {
                            inputDiv.innerText = theLang.Active + " ";
                        } else {
                            spellInputDOM.value = 0;
                            spellInputDOM.min = 0;
                            if (sInfoP.input.max) {
                                spellInputDOM.max = sInfoP.input.max;
                            }
                        }
                        inputDiv.appendChild(spellInputDOM);
                    }
                    break;
                default:
                    theNode.getElementsByTagName("h3")[0].innerText = spells[index - 2].name;
                    if (myChamps[uid]["sInfo" + (index - 2)] && (myChamps[uid]["sInfo" + (index - 2)].active || myChamps[uid]["sInfo" + (index - 2)].input)) {
                        spellInputDOM = document.createElement("input");
                        spellInputDOM.type = (myChamps[uid]["sInfo" + (index - 2)].active) ? "checkbox" : "number";
                        spellInputDOM.id = uid + "Input" + (index - 2);
                        spellInputDOM.addEventListener("change", update);
                        inputDiv = document.getElementById(uid).getElementsByClassName("skillInput")[index - 1];
                        if (myChamps[uid]["sInfo" + (index - 2)].active) {
                            inputDiv.innerText = theLang.Active + " ";
                        } else {
                            spellInputDOM.value = 0;
                            spellInputDOM.min = 0;
                            if (myChamps[uid]["sInfo" + (index - 2)].input.max) {
                                spellInputDOM.max = myChamps[uid]["sInfo" + (index - 2)].input.max;
                            }
                        }
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
                    if (index === 2 && spells[0].maxrank !== 5) {
                        theNode.getElementsByTagName("input")[0].max = spells[0].maxrank;
                    }
                    if (index === 5 && spells[3].maxrank !== 3) {
                        theNode.getElementsByTagName("input")[0].max = spells[3].maxrank;
                        if (spells[3].maxrank === 4) {
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

            finalDOM.querySelector(".killBtn").addEventListener("click", function () {
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

            finalDOM.querySelector(".advOpt").addEventListener("click", function () {
                let element = finalDOM.getElementsByClassName("dropPanel")[0];
                if (element.style.display === "block") {
                    element.style.display = "none";
                } else {
                    element.style.display = "block";
                }
            }, false);

            // Change Drop Box Divs

            let dropBtns = document.getElementById(uid).querySelector(".dropTBar").children;
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
            finalDOM.querySelector(".levelTxt").innerText = theLang.Level;

            // add elixirs

            const elixirID = [2138, 2139, 2140];
            elixirID.forEach(function (id) {
                let elixOpt = document.createElement("option");
                elixOpt.innerText = theItems[id].name;
                elixOpt.value = id;
                finalDOM.querySelector(".slctElix").appendChild(elixOpt);
            });

            // add runes
            const drawPaths = function (rank, exclude) {
                let runeDiv = document.getElementById(uid).getElementsByClassName("runes")[rank];
                runeDiv.style.display = "block";
                document.getElementById(uid).getElementsByClassName("runeSelect")[rank].style.display = "none";// Hide rune select

                const getRuneObj = function (runeId, slotNo) {
                    let runeNo = -1;
                    if (rank === 0) {
                        runeNo = theRunes[runePaths[rank]].slots[slotNo].runes.findIndex(function (rune) {
                            return rune.id === runeId;
                        });
                        return [runeNo, slotNo];
                    } else {
                        let runeSlotNo = 0;
                        const findRune = function () {
                            return theRunes[runePaths[rank]].slots[runeSlotNo].runes.findIndex(function (rune) {
                                return rune.id === runeId;
                            });
                        };
                        
                        while (runeNo === -1) {
                            runeSlotNo += 1;
                            
                            runeNo = findRune();
                            /*
                            runeNo = theRunes[runePaths[rank]].slots[runeSlotNo].runes.findIndex(function (rune) {
                                return rune.id === runeId;
                            });*/
                        }
                        return [runeNo, runeSlotNo];
                    }
                };

                const drawRune = function (slotNo) {

                    const checkBox = [8112,8124,8128,8126,8143,8005,8008,8010,8437,8242,8429,8214,8472,8229,8210,8014,8439,8237,8232,8021,8230,8465,8410,8473];
                    const number = {
                        9103: 10,
                        9104: 10,
                        8437: 99,
                        8451: 999,
                        8243: 5,
                        8128: 999,
                        8138: 20,
                        8236: 12,
                        8226: 10
                    };
                    const theRuneID = runes[rank][slotNo];
                    const theRuneObj = getRuneObj(theRuneID, slotNo);

                    let runeImg = document.createElement("img");
                    runeImg.src = "https://ddragon.leagueoflegends.com/cdn/img/" + theRunes[runePaths[rank]].slots[theRuneObj[1]].runes[theRuneObj[0]].icon;
                    runeImg.addEventListener("click", function () {
                        hideHover();
                        drawRuneSelect(slotNo);
                    });
                    runeImg.addEventListener("mouseover", function (e) {
                        showHover(theRunes[runePaths[rank]].slots[theRuneObj[1]].runes[theRuneObj[0]].name, e.pageX, e.pageY);
                    });
                    runeImg.addEventListener("mouseout", hideHover);

                    let singleRuneDiv;
                    if (runeDiv.childElementCount === (slotNo + 1)) {
                        singleRuneDiv = document.createElement("div");
                        singleRuneDiv.classList.add("runeDiv");
                    } else {
                        singleRuneDiv = runeDiv.children[slotNo + 1];
                        while (singleRuneDiv.hasChildNodes()) {
                            singleRuneDiv.removeChild(singleRuneDiv.lastChild);
                        }
                    }
                    singleRuneDiv.appendChild(runeImg);
                    singleRuneDiv.appendChild(document.createElement("br"));
                    if (checkBox.includes(theRuneID)) {
                        let runeCB = document.createElement("input");
                        runeCB.type = "checkbox";
                        runeCB.id = uid + "RCB" + theRuneID;
                        runeCB.addEventListener("change", update);
                        singleRuneDiv.appendChild(runeCB);
                    }
                    if (number[theRuneID]) {
                        let runeNUM = document.createElement("input");
                        runeNUM.type = "number";
                        runeNUM.value = 0;
                        runeNUM.min = 0;
                        runeNUM.max = number[theRuneID];
                        runeNUM.id = uid + "RNUM" + theRuneID;
                        runeNUM.addEventListener("change", update);
                        singleRuneDiv.appendChild(runeNUM);
                    }
                    if (runeDiv.childElementCount === (slotNo + 1)) {// add new div
                        runeDiv.appendChild(singleRuneDiv);
                    }
                };

                const drawRuneSelect = function (slotNo) {
                    let slotsSelect = [];
                    if (rank === 0) {
                        slotsSelect.push(slotNo);
                    } else {
                        slotsSelect.push(getRuneObj(runes[rank][slotNo])[1]);
                        const excludeRuneSlot = getRuneObj(runes[rank][1 - slotNo])[1];
                        let i = 1;
                        while (slotsSelect.length === 1) {
                            if (!slotsSelect.includes(i) && i !== excludeRuneSlot) {
                                slotsSelect.push(i);
                            }
                            i += 1;
                        }
                    }

                    let runeSelectDiv = document.getElementById(uid).getElementsByClassName("runeSelect")[rank];
                    while (runeSelectDiv.hasChildNodes()) {
                        runeSelectDiv.removeChild(runeSelectDiv.lastChild);
                    }

                    const drawRuneSlot = function (slotObj) {
                        slotObj.forEach(function (rune) {
                            let singleRuneDiv = document.createElement("div");
                            singleRuneDiv.classList.add("runeDiv");
                            let runeImg = document.createElement("img");
                            runeImg.src = "https://ddragon.leagueoflegends.com/cdn/img/" + rune.icon;
                            runeImg.addEventListener("click", function () {
                                hideHover();
                                runes[rank][slotNo] = rune.id;
                                drawRune(slotNo);
                                runeSelectDiv.style.display = "none";
                                runeDiv.style.display = "block";
                                update();
                            });
                            runeImg.addEventListener("mouseover", function (e) {
                                showHover(rune.name, e.pageX, e.pageY);
                            });
                            runeImg.addEventListener("mouseout", hideHover);
                            singleRuneDiv.appendChild(runeImg);
                            runeSelectDiv.appendChild(singleRuneDiv);
                        });
                    };

                    slotsSelect.forEach(function (slot) {
                        drawRuneSlot(theRunes[runePaths[rank]].slots[slot].runes);
                    });

                    runeDiv.style.display = "none";
                    runeSelectDiv.style.display = "block";
                };

                const drawAllRunes = function (path) {// used when new path is selected
                    while (runeDiv.hasChildNodes()) {
                        runeDiv.removeChild(runeDiv.lastChild);
                    }
                    let pathDiv = document.createElement("div");
                    pathDiv.classList.add("runeDiv");
                    let pathImg = document.createElement("img");
                    pathImg.addEventListener("click", function () {
                        if (rank === 1) {
                            drawPaths(rank, runePaths[0]);
                        } else {
                            drawPaths(rank);
                        }
                    });
                    pathImg.src = "https://ddragon.leagueoflegends.com/cdn/img/" + theRunes[path].icon;

                    pathDiv.appendChild(pathImg);
                    runeDiv.appendChild(pathDiv);

                    runes[rank] = [];
                    theRunes[path].slots.forEach(function (slot, slotNo) {
                        if (!(rank === 1 && (slotNo === 0 || slotNo === 3))) {
                            runes[rank].push(slot.runes[0].id);
                            if (rank === 1) {
                                drawRune(slotNo - 1);
                            } else {
                                drawRune(slotNo);
                            }
                        }
                    });
                    if (rank === 0 && (runePaths[1] === undefined || runePaths[1] === path)) {

                        drawPaths(1, path);
                    }
                };

                while (runeDiv.hasChildNodes()) {
                    runeDiv.removeChild(runeDiv.lastChild);
                }

                theRunes.forEach(function (path, pathNo) {
                    if (!(exclude !== undefined && exclude === pathNo)) {
                        let pathImg = document.createElement("img");
                        let pathDiv = document.createElement("div");
                        pathDiv.classList.add("runeDiv");
                        pathImg.src = "https://ddragon.leagueoflegends.com/cdn/img/" + path.icon;
                        pathImg.addEventListener("click", function () {
                            hideHover();
                            runePaths[rank] = pathNo;
                            drawAllRunes(pathNo);
                            update();
                        });
                        pathImg.addEventListener("mouseover", function (e) {
                            showHover(path.name, e.pageX, e.pageY);
                        });
                        pathImg.addEventListener("mouseout", hideHover);
                        pathDiv.appendChild(pathImg);
                        runeDiv.appendChild(pathDiv);
                    }
                });
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
            let theCdr = (cdr[0] > cdr[1]) ? cdr[1] : cdr[0];
            statList.push(
                [theLang.HealthRegen, calc(calc(hpregen[0], calc(1, hpregen[2], 0)), hpregen[1], 0)],
                [theLang.Armor, armor[0] + armor[1]],
                [theLang.SpellBlock, spellblock[0] + spellblock[1]],
                [theLang.AttackDamage, attackdamage[0] + attackdamage[1]],
                [theLang.AttackSpeed, round(calc(attackspeed[0], calc(1, attackspeed[1], 0)), 3)],
                [theLang.CriticalStrike, Number(crit + "e2") + "%"],
                [theLang.LifeSteal, Number(lifeSteal + "e2") + "%"],
                [theLang.SpellDamage, ap],
                [theLang.CooldownReduction, Number(theCdr + "e2") + "%"],
                [theLang.Movement, calcMoveSpeed(move[0], move[1], move[2])]
            );
            if (partype === theLang.Mana) {
                statList.push(
                    [partype, mp[0] + mp[1]],
                    [theLang.ManaRegen, calc(calc(mpregen[0], calc(1, mpregen[2], 0)), mpregen[1], 0)]
                );
            } else if (mpregen[0] > 0) {//energy
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
                var enemyUID;
                if (document.getElementById("enemy" + side).length > 0){
                    enemyUID = document.getElementById("enemy" + side).value;
                }

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
                    case "bonusCritDamage":
                        stat = (items.includes(3031) || items.includes(3371)) ? 50 : 0;
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
                    case "mana":
                        stat = mp[0] + mp[1];
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
                        value = (theKey.charAt(1) === "0")
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
                };

                let riotObj, spellLvl;
                if (spellNo !== "P" && spellNo !== "Attack") {
                    riotObj = spells[spellNo];
                    spellLvl = document.getElementById(uid).getElementsByClassName("spellLvl")[spellNo].value;
                    spellLvl = (spellLvl < 1)
                        ? 0
                        : spellLvl - 1;
                }

                const getCrit = function (dmg, critArr) {
                    let critMulti = (items.includes(3031) || items.includes(3371)) ? critArr[1] : critArr[0];
                    critMulti = Number(critMulti + "e-2");
                    if (enemyUID) {
                        critMulti = myChamps[enemyUID].takeCritMulti(critMulti);
                    }
                    return calc(dmg, calc(dmg, critMulti), 0);
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
                const getDmg = function (rawDmg, spellObj, isCrit = false) {
                    const adaptTyp = getAdapt();
                    let resistedDmg;
                    let myDmg = (spellObj.basicAttack && enemyUID) ? myChamps[enemyUID].takeBasicAtk(rawDmg) : rawDmg;// Ninja Tabi

                    const sortedDmg = sortDmg(myDmg, spellObj.type);
                    let physDmg = sortedDmg[0];
                    let magDmg = sortedDmg[1];
                    let truDmg = sortedDmg[2];

                    if(itemCheck(3092, true) ||// FQC etc
                    itemCheck(3098, true)) {
                        magDmg = calc(magDmg, 18, 0);
                    } else if(itemCheck(3303, true)) {
                        magDmg = calc(magDmg, 13, 0);
                    }

                    if(itemCheck(2033, true)) {// Corrupted potion
                        let corruptDmg = [15,16,17,18,19,19,20,21,22,23,24,25,26,26,27,28,29,30];
                        magDmg = calc(magDmg, corruptDmg[level], 0);
                    }

                    if(document.getElementById(uid).querySelector(".slctElix").value === "2139") {// elixir of sorcery
                        truDmg = calc(truDmg, 25, 0);
                    }

                    //Runes added dmg
                    if (runeCheck(8112, true)) {//electrocute
                        const theDmg =  calc(40 + (10 * level), calc(calc(ap, 0.3), calc(attackdamage[1], 0.5), 0), 0);
                        if(adaptTyp === "phys") {
                            physDmg = calc(theDmg, physDmg, 0);
                        } else {
                            magDmg = calc(theDmg, magDmg, 0);
                        }
                    }
                    if (runeCheck(8124, true)) {// Predator
                        let predBase = [60,67,74,81,88,95,102,109,116,124,131,138,145,152,159,166,173,180];
                        const theDmg =  calc(predBase[level - 1], calc(calc(ap, 0.25), calc(attackdamage[1], 0.4), 0), 0);
                        if(adaptTyp === "phys") {
                            physDmg = calc(theDmg, physDmg, 0);
                        } else {
                            magDmg = calc(theDmg, magDmg, 0);
                        }
                    }
                    if (runeCheck(8214, true)) {// Aery
                        let aeryBase = [15,16,18,19,21,22,24,25,27,28,30,31,33,34,36,37,39,40];
                        const theDmg =  calc(aeryBase[level - 1], calc(calc(ap, 0.1), calc(attackdamage[1], 0.15), 0), 0);
                        if(adaptTyp === "phys") {
                            physDmg = calc(theDmg, physDmg, 0);
                        } else {
                            magDmg = calc(theDmg, magDmg, 0);
                        }
                    }
                    if (runeCheck(8126, true)) {// Cheap Shot
                        let chpShotBase = [15, 16, 18, 19, 21, 22, 24, 25, 27, 28, 30, 31, 33, 34, 36, 37, 39, 40];
                        truDmg = calc(truDmg, chpShotBase[level - 1], 0);
                    }

                    //spell effects
                    if(spellObj.spell) {
                        if(itemCheck(3285, true)) { //Luden's Echo
                            magDmg = calc(magDmg, calc(100, calc(ap, 0.1), 0), 0);
                        } else if(itemCheck(1402, true) || //Runic Echoes
                            itemCheck(1414, true)) {
                            magDmg = calc(magDmg, calc(60, calc(ap, 0.1), 0), 0);
                        }
                        if(items.includes(3151) && enemyUID) {//Liandry, only grants one tick
                            if(myChamps[enemyUID].isSlowed() || items.includes(3116)) {
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
                            if(adaptTyp === "phys") {
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

                    if(spellObj.onHit) {

                        let onHitMulti = (spellObj.onHit < 1)
                            ? spellObj.onHit
                            : 1;
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
                            let triDmg = calc(attackdamage[0], 2);
                            if (spellObj.type === "corkiAuto") {
                                physDmg = calc(physDmg, calc(triDmg, 0.2), 0);
                                magDmg = calc(magDmg, calc(triDmg, 0.8), 0);
                            } else {
                                physDmg = calc(physDmg, calc(triDmg, onHitMulti), 0);
                            }
                        } else if (
                            (itemCheck(3025, true)) ||//iceborn/sheen
                            (itemCheck(3057, true))//sheen
                        ) {
                            if (spellObj.type === "corkiAuto") {
                                physDmg = calc(physDmg, calc(attackdamage[0], 0.2), 0);
                                magDmg = calc(magDmg, calc(attackdamage[0], 0.8), 0);
                            } else {
                                physDmg = calc(physDmg, calc(attackdamage[0], onHitMulti), 0);
                            }
                        }
                        if(itemCheck(3742, true)) {//dead mans
                            magDmg = calc(calc(100, onHitMulti), magDmg, 0);
                        }
                        if(itemCheck(2015, true)) {//Kircheis Shard
                            magDmg = calc(calc(50, onHitMulti), magDmg, 0);
                        }
                        if (itemCheck(3087, true)) {// Static Shiv
                            const shivLvlDmg = [60,60,60,60,60,67,73,79,85,91,97,104,110,116,122,128,134,140];
                            let shivDmg = calc(shivLvlDmg[level - 1], onHitMulti);
                            if (isCrit) {
                                shivDmg = getCrit(shivDmg, spellObj.crit);
                            }
                            magDmg = calc(magDmg, shivDmg, 0);
                        }
                        if(itemCheck(3094, true)) {//Rapidfire
                            let rfLvlDmg = [60,60,60,60,60,67,73,79,85,91,97,104,110,116,122,128,134,140];
                            magDmg = calc(magDmg, calc(rfLvlDmg[level - 1], onHitMulti), 0);
                        }
                        //Runes
                        if (runeCheck(8128, true)) {//dark harvest
                            const
                                dhLvl = [40,42,45,47,49,52,54,56,59,61,64,66,68,71,73,75,78,80],
                                soulStacks = parseInt(document.getElementById(uid + "RNUM8128").value);
                            let dhDmg = calc(soulStacks, calc(dhLvl[level - 1], calc(calc(ap, 0.2), calc(attackdamage[1], 0.25), 0), 0), 0);;
                            if(adaptTyp === "phys") {
                                physDmg = calc(physDmg, dhDmg, 0);
                            } else {
                                magDmg = calc(magDmg, dhDmg, 0);
                            }
                        }
                        if (runeCheck(8005, true)) {//press the attack
                            const ptaPerLvl = [40,48,56,65,73,81,89,98,106,114,122,131,139,147,155,164,172,180];
                            if(adaptTyp === "phys") {
                                physDmg = calc(physDmg, ptaPerLvl[level - 1], 0);
                            } else {
                                magDmg = calc(magDmg, ptaPerLvl[level - 1], 0);
                            }
                        }
                        if (runeCheck(8437, true)) {//graps of the undying
                            if(stats.attackrange > 200) {
                                magDmg = calc(getPercentHP(0.02), magDmg, 0);
                            } else {
                                magDmg = calc(getPercentHP(0.04), magDmg, 0);
                            }
                        }

                        onHitMulti = spellObj.onHit;
                        if(items.includes(1043)) {//Recurve Bow
                            physDmg = calc(calc(15, onHitMulti), physDmg, 0);
                        }
                        if(items.includes(3091)) {//Wits End
                            magDmg = calc(calc(42, onHitMulti), magDmg, 0);
                        }
                        if(items.includes(3124)) {//Guinsoo
                            magDmg = calc(calc(calc(Number(ap + "e-1"), 5, 0), onHitMulti), magDmg, 0);
                            physDmg = calc(calc(calc(Number(attackdamage[1] + "e-1"), 5, 0), onHitMulti), physDmg, 0);
                        }
                        if(items.includes(3115)) {//Nashor
                            magDmg = calc(magDmg, calc(calc(15, calc(0.15, ap), 0), onHitMulti), 0);
                        }
                        if(items.includes(3153) && enemyUID) {//Botrk
                            physDmg = calc(calc(myChamps[enemyUID].getPercentHP(0.08, "currHp"), onHitMulti), physDmg, 0);
                        }
                        if((items.includes(1416) || items.includes(1419)) && enemyUID) {//Bloodrazer
                            physDmg = calc(calc(myChamps[enemyUID].getPercentHP(0.04), onHitMulti, 0), physDmg, 0);
                        }
                        if(items.includes(3748)) {//Titanic Hydra
                            physDmg = calc(calc(calc(5, calc(hp[0] + hp[1], 0.01), 0), onHitMulti), physDmg, 0);
                        }
                        if(items.includes(3042) && partype === theLang.Mana) {//Muramana
                            physDmg = calc(calc(mp[0] + mp[1], 0.06), physDmg, 0);
                        }
                    }

                    if (items.includes(3151)) {// Liandrys Multiplier
                        let dmgMulti = parseInt(document.getElementById(uid + 3151).value);
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

                    // calculate damage through resistances
                    if (enemyUID) {
                        resistedDmg = myChamps[enemyUID].takeDmg([physDmg, magDmg], aPen, mPen);
                        physDmg = resistedDmg[0];
                        magDmg = resistedDmg[1];
                        truDmg = calc(truDmg, resistedDmg[2], 0);
                    } else {
                        physDmg = round(physDmg, 1);
                        magDmg = round(magDmg, 1);
                        truDmg = round(truDmg, 1);
                    }

                    return [physDmg, magDmg, truDmg];
                };
                const styleDigits = function (digits, type) {// format key values
                    let theStr = "";
                    switch (type) {
                    case "heal":
                    case "shield":
                        break;
                    default:
                        if (type === "phys") {
                            theStr = "<span class='phys'>" + digits[0] + "</span>";
                            if (digits[1] > 0) {
                                theStr += "<span class='mag'>[" + digits[1] + "]</span>";
                            }
                            if (digits[2] > 0) {
                                theStr += "<span class='tru'>[" + digits[2] + "]</span>";
                            }
                        } else if (type === "tru") {
                            theStr = "<span class='tru'>" + digits[2] + "</span>";
                            if (digits[1] > 0) {
                                theStr += "<span class='mag'>[" + digits[1] + "]</span>";
                            }
                            if (digits[0] > 0) {
                                theStr += "<span class='phys'>[" + digits[0] + "]</span>";
                            }
                        } else {
                            theStr = "<span class='mag'>" + digits[1] + "</span>";
                            if (digits[0] > 0) {
                                theStr += "<span class='phys'>[" + digits[0] + "]</span>";
                            }
                            if (digits[2] > 0) {
                                theStr += "<span class='tru'>[" + digits[2] + "]</span>";
                            }
                        }
                    }
                    return theStr;
                };

                if (spellNo === "Attack") {
                    let
                        totalAD = calc(attackdamage[0], attackdamage[1], 0),
                        attackObj = {type: "phys", onHit: 1, basicAttack: true, crit:[100,150]};
                    let tooltip = theLang.Attack + ": ";
                    switch (id) {
                    case "Ashe":
                        attackObj = {type: "phys", onHit: 1, basicAttack: true, crit:[Number(crit + "e2") + 10,Number(crit + "e2") + 60]};
                        //critChance += 99;
                        break;
                    case "Graves":
                        let autoDmg = [0.7, 0.71, 0.72, 0.74, 0.75, 0.76, 0.78, 0.8, 0.81, 0.83, 0.85, 0.87, 0.89, 0.91, 0.95, 0.96, 0.97, 1];
                        totalAD = calc(totalAD, autoDmg[level - 1]);
                        attackObj = {type: "phys", onHit: 1, basicAttack: true, crit:[40,60]};
                        break;
                    case "Corki":
                        attackObj = {type: "corkiAuto", onHit: 1, basicAttack: true, crit:[100,150]};
                        break;
                    case "Jhin":
                        attackObj = {type: "phys", onHit: 1, basicAttack: true, crit:[50,88]};
                        //critChance = Math.round(Number(critChance * 75 + "e-2")) + 25;
                        break;
                    case "Kalista":
                        totalAD = calc(totalAD, 0.9);
                        break;
                    case "Kled":
                        if(document.getElementById(uid + "InputP").checked) {
                            totalAD = calc(totalAD, 0.8);
                        }
                        break;
                    case "Yasuo":
                        attackObj = {type: "phys", onHit: 1, basicAttack: true, crit:[80,125]};
                        //critChance *= 2;
                        break;
                    default:

                    }
                    tooltip += styleDigits(getDmg(totalAD, attackObj), attackObj.type) + "<br>";
                    if (crit > 0 || id === "Ashe") {
                        tooltip += theLang.CriticalStrike + " " + theLang.Damage + ": ";
                        tooltip += styleDigits(getDmg(getCrit(totalAD, attackObj.crit), attackObj, true), attackObj.type) + "<br>";
                    }
                    return tooltip;
                }

                const myObj = myChamps[uid]["sInfo" + spellNo];

                let tooltip = (spellNo === "P")
                    ? passive.description
                    : spells[spellNo].tooltip;
                if (myObj && myObj.txt) {
                    tooltip += myObj.txt;
                }
                if (myObj && spellNo === "P") {
                    Object.keys(myObj).forEach(function (id) {
                        if (theLang[myObj[id].info]) {
                            tooltip += "<br>" + theLang[myObj[id].info] + ": {{ " + id + " }}";
                        }
                    });
                }
                tooltip = tooltip.replace(/<span.class="\w*\d*.?color......">/g, "");
                tooltip = tooltip.replace(/<\/span>/g, "");
                tooltip = tooltip.replace(/[*][\d.]*/g, "");
                const keys = tooltip.match(/\{\{[^}]*\}\}/g);
                if (keys !== null) {
                    let altKey = [];
                    keys.forEach(function (key) {
                        let rawKey = key.replace(/\{\{./, "");
                        rawKey = rawKey.replace(/.\}\}/, "");
                        if (altKey.includes(rawKey)) {
                            rawKey += "a";
                        }
                        let keyValue = getValue(rawKey);
                        const replaceRegEx = new RegExp(key);
                        let placeHoldStr = keyValue;
                        if (myChamps[uid]["sInfo" + spellNo] && myChamps[uid]["sInfo" + spellNo][rawKey]) {
                            let keyObj = myChamps[uid]["sInfo" + spellNo][rawKey];
                            if (keyObj.apply) {// Remove Percent Sign from jp scaling variables
                                let percentLoc = tooltip.indexOf("%",tooltip.indexOf(rawKey));
                                tooltip = tooltip.slice(0, percentLoc) + tooltip.slice(percentLoc + 1);
                            }
                            if (keyObj.type === "heal" || keyObj.type === "shield") {
                                //put heal and shield calculations here...
                            } else if (keyObj.type) {
                                const addDmg = function (dmg1, dmg2) {
                                    const physDmg = calc(dmg1[0], dmg2[0], 0);
                                    const magDmg = calc(dmg1[1], dmg2[1], 0);
                                    const truDmg = calc(dmg1[2], dmg2[2], 0);
                                    return [physDmg, magDmg, truDmg];
                                };
                                const getTickDmg = function (tickDmg) {
                                    let tickCount = (typeof keyObj.ticks === "object") ? keyObj.ticks[spellLvl] - 1 : keyObj.ticks - 1;
                                    let currentTickDmg = sortDmg(tickDmg, keyObj.type);
                                    currentTickDmg.push(0);
                                    let totalDmg = [0, 0, 0];

                                    while (tickCount !== 0) {
                                        totalDmg = addDmg(totalDmg, currentTickDmg);
                                        tickCount -= 1;
                                        if (items.includes(3151)) {
                                        }
                                        if (enemyUID) {
                                        }
                                        if (items.includes(3071) || items.includes(3380)) {
                                        }
                                    }
                                    return totalDmg;
                                };
                                let theDmg = getDmg(keyValue, keyObj);
                                if (keyObj.ticks) {
                                    theDmg = addDmg(theDmg, getTickDmg(keyValue));
                                }
                                placeHoldStr = styleDigits(theDmg, keyObj.type);
                                if (keyObj.crit && (crit > 0 || keyObj.crit[2])) {
                                    const theCritDmg = getDmg(getCrit(keyValue, keyObj.crit), keyObj, true);
                                    if (keyObj.ticks) {
                                        let avgDmg = calc(calc(keyValue, calc(1, crit, 1)), calc(getCrit(keyValue, keyObj.crit), crit), 0);
                                        const avgCritTickDmg = addDmg(theCritDmg, getTickDmg(avgDmg));//change crit damage based on crit chance?
                                        placeHoldStr += " [AVG " + theLang.Damage + ": " + styleDigits(avgCritTickDmg, keyObj.type) + "]";
                                    } else {
                                        placeHoldStr += " [" + theLang.FlatCritDamageMod + ": " + styleDigits(theCritDmg, keyObj.type) + "]";
                                    }

                                }
                            } else {
                                placeHoldStr = "<span class='statValue'>" + keyValue + "</span>";
                            }
                        }
                        tooltip = tooltip.replace(replaceRegEx, placeHoldStr);

                        if (myChamps[uid]["sInfo" + spellNo] && myChamps[uid]["sInfo" + spellNo][rawKey + "a"]) {// alternate spell vars
                            altKey.push(rawKey);
                        }

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
                    div.innerHTML = refineTtip("Attack");
                    break;
                case 1:
                    div.innerHTML = refineTtip("P");
                    break;
                default:
                    div.innerHTML = refineTtip(count - 2);
                }
            });
        },
        takeDmg = function (dmg, eAPen, eMPen) {
            
            //put in amumu passive and e passive?
            const calcResist = function (resistance, pen) {
                if (resistance >= 0) {
                    return calc(100, calc(100, resistance, 0), 3);
                } else {
                    return calc(2, calc(100, calc(100, resistance, 1), 3), 1);
                }
            };

            const totalArmor = armor[0] + armor[1];
            const totalSBlock = spellblock[0] + spellblock[1];

            const physDmg = round(calc(dmg[0], calcResist(totalArmor)), 1);
            const magDmg = round(calc(dmg[1], calcResist(totalSBlock)), 1);
            const truDmg = 0;

            return [physDmg, magDmg, truDmg];
        },
        takeBasicAtk = function (dmg) {
            let theDmg = dmg;
            if (id === "Fizz") {
                theDmg = calc(theDmg, sInfoP.p1.valuePerLvl[level - 1], 1);
            }
            if (items.includes(3047)) {
                theDmg = calc(theDmg, 0.88)
            }
            return (theDmg);
        },
        takeCritMulti = function (multi) {// Process randuins
            return (items.includes(3143)) ? calc(multi, 0.8) : multi;
        },
        takeTickDmg = function (dmg, enemyPen, cleaverStacks) {
        },
        isSlowed = function () {
            if (move[3] > 0) {
                return true;
            }
            return false;
        },
        getPercentHP = function (amount, type = "maxHp") {
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
        getAdapt,
        itemCheck,
        runeCheck,
        setStats,
        drawChampDOM,
        drawStats,
        drawSkillTxt,
        addItem,
        takeDmg,
        takeBasicAtk,
        takeCritMulti,
        takeTickDmg,
        isSlowed,
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