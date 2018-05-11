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

const newUID = function () {//Generate Unique Id for Champs
    "use strict";
    var uid = "", i = 4, possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    while (i > 0) {
        uid += possible.charAt(Math.floor(Math.random() * possible.length));
        i -= 1;
    }
    return uid;
};

// ** MATH FUNCTIONS **

const getDP = function (num) {// Return decimal places
    "use strict";
    const numStr = num.toString();
    return (numStr.indexOf(".") === -1)
        ? 0
        : numStr.length - numStr.indexOf(".") - 1;
};

const calc = function (num1, num2, o = 2) {// Calculate decimal equations
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

// ** PRE LOADER **

const setLocale = function () {
    "use strict";
    if (location.hash) {
        lang = location.hash.split("#")[1];
    }
};

var setLang = function (json) {
    "use strict";
    theLang = json;
    // Custom Language
    const findReduction = theLang.rPercentCooldownMod.replace("%", "");
    theLang.Cooldown = findReduction.replace(" ", "");
    theLang.Reduction = theLang.CooldownReduction.replace(theLang.Cooldown, "");
    theLang.Regen = theLang.HealthRegen.replace(theLang.Health, "");
    theLang.AttackDamage = theLang.Attack + " " + theLang.Damage;
    theLang.MagicDamage = theLang.Magic + " " + theLang.Damage;
    theLang.Cost = theLang.Cost_.replace(":", "");
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

// ** ADD NEW CHAMP **

const calcBaseStats = function (b, g, n) {
    "use strict";
    return calc(b, calc(calc(g, (n - 1)), calc(0.7025, calc(0.0175, (n - 1)), 0)), 0);
};

const calcBaseAspd = function (delay) {
    "use strict";
    return round(calc(0.625, calc(1, delay, 0), 3),3);
};

const champObj = function (obj, side) {// create champion object
    "use strict";
    let {aSpdBonus} = champVars[obj.id],
        {buffs} = champVars[obj.id],
        {debuffs} = champVars[obj.id],
        {id} = obj,
        {image} = obj,
        {name} = obj,
        {partype} = obj,
        {passive} = obj,
        {pInfo} = champVars[obj.id],
        {sInfo0} = champVars[obj.id],
        {sInfo1} = champVars[obj.id],
        {sInfo2} = champVars[obj.id],
        {sInfo3} = champVars[obj.id],
        {spells} = obj,
        {stats} = obj,
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
        setLevel = function (uid) {
            level = document.getElementById(uid).getElementsByClassName("champLevel")[0].value;
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
            hp[1] = statObj.hasOwnProperty("FlatHPPoolMod")
                ? statObj.FlatHPPoolMod
                : 0;
            if (partype === theLang.Mana) {
                mp[1] = statObj.hasOwnProperty("FlatMPPoolMod")
                    ? statObj.FlatMPPoolMod
                    : 0;
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
        setBaseStats,
        setLevel,
        setItemStats
    };
};

const newChamp = function (json, side) {
    "use strict";
    const myUid = newUID();
    myChamps[myUid] = champObj(json[Object.keys(json)], side);
    myChamps[myUid].setBaseStats();
    drawChampDiv(myUid);
};

const addChamp = function (side) {
    "use strict";
    const champId = document.getElementById("chmpSlct" + side).value;
    loadJSON("champion/" + champId, newChamp, side);
};

const changeSkills = function (uid, index) {
    console.log(uid);
}

const drawChampDiv = function (uid) {
    "use strict";
    const
        champ = myChamps[uid],
        home = document.getElementById("champs" + champ.side),
        champDOM = document.getElementsByTagName("template")[0].content.cloneNode(true);

    let champDiv = document.createElement("div");
    champDiv.id = uid;
    champDiv.classList.add("champBox");
    champDiv.appendChild(champDOM);
    home.appendChild(champDiv);

    let finalDOM = document.getElementById(uid);
    finalDOM.getElementsByTagName("h2")[0].innerText = champ.name;
    finalDOM.getElementsByClassName("champHead")[0].style.backgroundImage = "url('http://ddragon.leagueoflegends.com/cdn/" + patch + "/img/champion/" + champ.image.full + "')";

    let skillDesc = finalDOM.getElementsByClassName("skillDesc");

    Array.from(skillDesc).forEach(function (theNode, index) {
        switch (index) {
        case 0:
            theNode.getElementsByTagName("h3")[0].innerText = theLang.Attack;
            break;
        case 1:
            theNode.getElementsByTagName("h3")[0].innerText = champ.passive.name;
            break;
        default:
            theNode.getElementsByTagName("h3")[0].innerText = champ.spells[index - 2].name;
        }
    });

    let skillImg = finalDOM.getElementsByClassName("skillImg");

    Array.from(skillImg).forEach(function (theNode, index) {
        switch (index) {
        case 0:
            break;
        case 1:
            theNode.getElementsByTagName("img")[0].src = "http://ddragon.leagueoflegends.com/cdn/" + patch + "/img/passive/" + champ.passive.image.full;
            break;
        default:
            theNode.getElementsByTagName("img")[0].src = "http://ddragon.leagueoflegends.com/cdn/" + patch + "/img/spell/" + champ.spells[index - 2].image.full;
            if (index === 5 && champ.spells[3].maxrank !== 3) {
                theNode.getElementsByTagName("input")[0].max = champ.spells[3].maxrank;
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
        finalDOM.remove();
        delete myChamps[uid];
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

    //Add Item Categories
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

    //Add item map options
    const ItemMap = [[theLang.Map1, 11], [theLang.Map10, 10], [theLang.Map12, 12]];
    let mapDOM = finalDOM.getElementsByClassName("itemMaps")[0],
        mapFrag = document.createDocumentFragment();

    ItemMap.forEach(function (map) {
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
            const theCat = catsDOM.value,
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
                    (theItems[itemNo].requiredChampion === undefined || theItems[itemNo].requiredChampion === champ.name)
                ) {
                    let theImg = document.createElement("img");
                    theImg.src = "http://ddragon.leagueoflegends.com/cdn/" + patch + "/img/item/" + itemNo + ".png";
                    theImg.addEventListener("click", function () {
                        addItem(uid, parseInt(itemNo));
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
    update();
};

//** ADD ITEM SCRIPTS **

const checkBoots = function (items){
    return items.some( function (itemNo) {
        return theItems[itemNo].tags.includes("Boots");
    });
}

const addItem = function (uid, itemNo) {
    const toogleItems = [3800,2065,3001,3379,3285,3145,3303,3098,3092,2301,1402,1410,1414,3100,3384,3025,3078,3057,2015,3087,3094,3134,3147,3742,2031,2032,2033,2003,3194,3174],
    stackItems = [3124,3091,1082,3041,3027,3151,3136,3907];

    let itemDOM = document.getElementById(uid).getElementsByClassName("champItems")[0],
        itemObj = myChamps[uid].items;

    if (itemObj.length < 6 && !(theItems[itemNo].tags.includes("Boots") && checkBoots(itemObj))) {
        let theDiv = document.createElement("div"),
            theImg = document.createElement("img");

        theImg.src = "http://ddragon.leagueoflegends.com/cdn/" + patch + "/img/item/" + itemNo + ".png";
        theDiv.appendChild(theImg);

        if (toogleItems.includes(itemNo) && !itemObj.includes(itemNo)) {
            let theInput = document.createElement("input");
            theInput.id = "cb" + uid + itemNo;
            theInput.type = "checkbox";
            theInput.addEventListener("change", update);
            theDiv.appendChild(theInput);
        } else if (stackItems.includes(itemNo) && !itemObj.includes(itemNo)) {
            let theInput = document.createElement("input");
            theInput.id = "num" + uid + itemNo;
            theInput.type = "number";
            theInput.min = 0
            theInput.value = 0;
            switch(itemNo) {
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

        itemObj.push(itemNo);
    }
    update();
};

// ** UPDATE SCRIPTS **

const drawStats = function () {
    Object.keys(myChamps).forEach(function (uid) {
        const champ = myChamps[uid];
        let statBox = document.getElementById(uid).getElementsByClassName("statList")[0],
        frag = document.createDocumentFragment();
        while (statBox.childElementCount > 1) {
            statBox.removeChild(statBox.lastChild);
        }
        let statList = [];
        statList.push(
            [theLang.Health, champ.hp[0]],
            [theLang.HealthRegen, champ.hpregen[0]],
            [theLang.Armor, champ.armor[0]],
            [theLang.SpellBlock, champ.spellblock[0]],
            [theLang.AttackDamage, champ.attackdamage[0]],
            [theLang.AttackSpeed, round(calc(champ.attackspeed[0], calc(1, champ.attackspeed[1], 0)), 3)],
            [theLang.CriticalStrike, champ.crit],
            [theLang.LifeSteal, champ.lifeSteal + "%"],
            [theLang.SpellDamage, champ.ap],
            [theLang.CooldownReduction, champ.cdr + "%"],
            [theLang.Movement, champ.move[0]]
        );

        if (champ.partype === theLang.Mana) {
            statList.push(
            [champ.partype, champ.mp[0]],
            [theLang.ManaRegen, champ.mpregen[0]]
            )
        } else if (champ.mpregen[0] > 0) {
            statList.push(
                [champ.partype, champ.mp[0]],
                [champ.partype + theLang.Regen, champ.mpregen[0]]
            )
        } else if (champ.mp[0] > 0) {
            statList.push(
                [champ.partype, champ.mp[0]]
            )
        }

        //[champ.partype, champ.mp[0]]

        statList.forEach(function (stat) {
            let theLi= document.createElement("li");
            theLi.innerText = stat[0] + ": " + stat[1];
            frag.appendChild(theLi);
        });
        statBox.appendChild(frag);
    });
}


const update = function () {
    Object.keys(myChamps).forEach(function (uid) {
        myChamps[uid].setLevel(uid);
        myChamps[uid].setBaseStats();
        myChamps[uid].setItemStats();
    });
    drawStats();
}

// ** FIRST LOAD SCRIPTS **

setLocale();
loadJSON("language", setLang);
loadJSON("champion", setChampList);
loadJSON("item", setItems);