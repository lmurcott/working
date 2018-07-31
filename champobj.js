const champVars = {
    Aatrox: {
        buffs: [
            {
                spell: 2,
                key: "adBuff",
                type: "attackdamage",
                active: true
            },
            {
                spell: 3,
                key: "moveBuff",
                type: "flatmoveSpeed",
                active: true
            }
        ],
        sInfoP: {
            p1: {
                info: "Damage",
                type: "phys",
                apply: "maxHp",
                valuePerLvl: [8, 8.47, 8.94, 9.41, 9.88, 10.35, 10.82, 11.29, 11.76, 12.24, 12.71, 13.18, 13.65, 14.12, 14.59, 15.06, 15.53, 16]
            },
        },
        sInfo0: {
            qbasedamage: {
                value: [10, 25, 40, 55, 70],
                spell: true,
                type: "phys",
                child: ["f1Var"]
            },
            f1Var: {
                coeff: [0.64, 0.68, 0.72, 0.76, 0.8],
                link: "attackdamage"
            }
        },
        sInfo1: {
            "spell.aatroxw:wbasedamage": {
                effectNo: 1,
                spell: true,
                type: "phys",
                child: ["f1Var"]
            },
            "spell.aatroxw:wslowpercentage-100" : {
                value: [15, 20, 25, 30, 35]
            },
            "spell.aatroxw:wslowduration" : {
                effectNo: 3
            },
            f1Var: {
                coeff: 0.4,
                link: "attackdamage"
            }
        },
        sInfo2: {
            active: true,
            "spell.aatroxe:espellvamp": {
                value: [20, 21.25, 22.5, 23.75, 25]
            },
            adBuff: {
                value: [15, 25, 35, 45, 55]
            },
            txt: "<br>AD: {{ adBuff }}"
        },
        sInfo3: {
            active: true,
            "spell.aatroxr:rduration": {
                value: 12
            },
            moveBuff: {
                value: [120, 180, 240]
            },
            adBuff: {
                value: [20, 22.5, 25]
            },
            txt: "<br>AD: {{ adBuff }}%<br>Movement Speed: {{ moveBuff }}"
        }
    },
    Ahri: { //e damage amp
        buffs: [{
            spell: "P",
            key: "p1",
            type: "percentmoveSpeed",
            active: true
        }],
        sInfoP: {
            active: true,
            p1: {
                info: "PercentMovementSpeedMod",
                value: 20
            },
        },
        sInfo0: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            },
            e1a: {
                type: "tru",
                spell: true,
                child: ["a1"]
            },
            "f1.0": {
                valuePerLvl: [3, 3, 3, 3, 3, 5, 5, 5, 5, 5, 9, 9, 9, 9, 9, 18, 18, 18],
                type: "heal",
                selfHeal: true
            },
            "f4.0": {
                value: 3
            },
            "f3.0": {
                value: 9
            },
        },
        sInfo1: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            },
            f1: {
                effectNo: 1,
                type: "mag",
                spell: true,
                child: ["a1"],
                multiplier: 160
            },
            f1Var: {
                link: "spelldamage",
                coeff: 0.48
            }
        },
        sInfo2: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo3: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        }
    },
    Akali: {
        buffs: [
        {
            spell: 1,
            key: "e6",
            type: "percentmoveSpeed",
            active: true
        },
        {
            spell: "P",
            key: "p2",
            type: "percentmoveSpeed",
            active: true
        }
        ],
        sInfoP: {
            active: true,
            p1: {
                info: "Damage",
                type: "mag",
                valuePerLvl: [39,42,45,48,51,54,57,60,69,78,87,96,105,120,135,150,165,180],
                child: ["p2Var", "p2Var2"],
                spell: true
            },
            p2Var: {
                link: "spelldamage",
                coeff: 0.7
            },
            p2Var2: {
                link: "bonusattackdamage",
                coeff: 0.9
            },
            p2: {
                info: "PercentMovementSpeedMod",
                valuePerLvl: [35, 35, 35, 35, 35, 40, 40, 40, 40, 40, 45, 45, 45, 45, 45, 50, 50, 50]
            }
        },
        sInfo0: {
            basedamagenamed: {
                value: [25, 50, 75, 100, 125],
                type: "mag",
                child: ["v1", "v2"],
                spell: true
            },
            v1: {
                link: "spelldamage",
                coeff: 0.5
            },
            v2: {
                link: "bonusattackdamage",
                coeff: 0.65
            },
            healthrestore: {
                value: [5, 12.5, 22.5, 26.25, 50 ],
                type: "heal",
                selfHeal: true,
                child: ["v3", "v4"],
            },
            v3: {
                link: "spelldamage",
                coeff: [0.1, 0.125, 0.15, 0.175, 0.2]
            },
            v4: {
                link: "bonusattackdamage",
                coeff: [0.13, 0.1625, 0.195, 0.2275, 0.26]
            },
            bonusdamagetominions: {
                value: 133
            }
        },
        sInfo1: {
            active: true,
            baseduration: {
                value: 5
            }
        },
        sInfo2: {
            basedamage1: {
                value: [60, 90, 120, 150, 180],
                spell: true,
                type: "phys",
                child: ["v1"]
            },
            v1: {
                link: "bonusattackdamage",
                coeff: 0.7
            }
        },
        sInfo3: {
            basedamage: {
                value: [120, 180, 240],
                spell: true,
                type: "phys",
                child: ["v1"]
            },
            v1: {
                link: "bonusattackdamage",
                coeff: 0.5
            },
            basedamagea: {
                value: [120, 180, 240],
                spell: true,
                type: "mag",
                child: ["v2"]
            },
            v2: {
                link: "spelldamage",
                coeff: 0.3
            },
            basedamagemax: {
                value: [300, 450, 600],
                spell: true,
                type: "mag",
                child: ["v3"]
            },
            v3: {
                link: "spelldamage",
                coeff: 0.9
            },
        }
    },
    Alistar: {
        buffs: [{
            spell: 3,
            key: "e2",
            type: "dmgReduction",
            active: true
        }],
        sInfoP: {
            p1: {
                info: "spells_Self",
                type: "heal",
                value: 13,
                child: ["p1Var"]
            },
            p1Var: {
                link: "champLevel",
                coeff: 7
            },
            p2: {
                info: "mobileFriends",
                type: "heal",
                value: 13,
                child: ["p1Var"],
                multiplier: 200
            }
        },
        sInfo0: {
            e2: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo1: {
            e2: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo2: {
            f1: {
                effectNo: 1,
                type: "mag",
                spell: true,
                child: ["f2Var"],
                ticks: 5,
                duration: 5,
                multiplier: 20
            },
            f2Var: {
                link: "spelldamage",
                coeff: 0.4
            },
            f3: {
                value: 40,
                type: "mag",
                spell: true,
                child: ["f3Var"]
            },
            f3Var: {
                link: "champLevel",
                coeff: 15
            }
        },
        sInfo3: {
            active: true
        }
    },
    Amumu: {
        aSpdBonus: 0.153,
        buffs: [{
            spell: 2,
            key: "e1",
            type: "flatPhysReduction"
        }],
        debuff: [{
            name: "cursedTouch",
            img: "passive/Amumu_Passive.png",
            value: 1
        }],
        sInfo0: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo1: {
            e2: {
                type: "mag"
            },
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"],
                apply: "maxHp"
            }
        },
        sInfo2: {
            e2: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo3: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        }
    },
    Anivia: {
        buffs: [{
                spell: "P",
                key: "p1",
                type: "armor",
                active: true
            },
            {
                spell: "P",
                key: "p2",
                type: "mr",
                active: true
            }
        ],
        sInfoP: {
            active: true,
            p1: {
                info: "Armor",
                type: "armor",
                valuePerLvl: [-40, -40, -40, -40, -25, -25, -25, -10, -10, -10, -10, 5, 5, 5, 20, 20, 20, 20]
            },
            p2: {
                info: "SpellBlock",
                type: "mr",
                valuePerLvl: [-40, -40, -40, -40, -25, -25, -25, -10, -10, -10, -10, 5, 5, 5, 20, 20, 20, 20]
            }
        },
        sInfo0: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            },
            f1: {
                valuePair: [3, "f1"]
            }
        },
        sInfo2: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo3: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            },
            f1: {
                value: [20, 20, 30, 40]
            }
        }
    },
    Annie: {
        buffs: [{
            spell: 2,
            key: "e1",
            type: "dmgReduction",
            active: true
        }],
        sInfo0: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo1: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo2: {
            active: true,
            e2: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo3: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            },
            e2: {
                type: "mag",
                spell: true,
                child: ["a2"]
            },
            e3: {
                type: "mag",
                child: ["f1Var"]
            },
            f1Var: {
                link: "spelldamage",
                coeff: 0.15
            }
        }
    },
    Ashe: {
        buffs: [{
            spell: 0,
            key: "e4",
            type: "attackSpeed",
            active: true
        }],
        sInfo0: {
            active: true,
            f1: {
                type: "phys",
                child: ["f1Var"],
                basicAttack: true,
                dps: 1
            },
            f1Var: {
                link: "attackdamage",
                coeff: [0.21, 0.22, 0.23, 0.24, 0.25]
            }
        },
        sInfo1: {
            e2: {
                type: "phys",
                spell: true,
                child: ["a1"],
                crit: [0, true, true]
            }
        },
        sInfo3: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        }
    },
    AurelionSol: {
        buffs: [{
            spell: 2,
            key: "e2",
            type: "percentmoveSpeed",
            active: true
        }],
        sInfoP: {
            p1: {
                valuePair: [1, "f3"],
                info: "Damage",
                valuePerLvl: [20, 24, 28, 32, 36, 39, 44, 49, 54, 60, 66, 72, 78, 84, 93, 102, 111, 130],
                type: "mag",
                child: ["p1Var"]
            },
            p1Var: {
                link: "spelldamage",
                coeff: [0.18, 0.19, 0.2, 0.21, 0.22, 0.23, 0.24, 0.25, 0.26, 0.27, 0.28, 0.29, 0.3, 0.31, 0.32, 0.33, 0.34, 0.35]
            }
        },
        sInfo0: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo1: {
            e2: {
                type: "mag"
            },
            f1: {
                effectNo: 2,
                valuePerLvl: [20, 24, 28, 32, 36, 39, 44, 49, 54, 60, 66, 72, 78, 84, 93, 102, 111, 130],
                type: "mag",
                child: ["f2Var"],
                multiplier: 150
            },
            f2Var: {
                link: "spelldamage",
                coeff: [0.18, 0.19, 0.20, 0.21, 0.22, 0.23, 0.24, 0.25, 0.26, 0.27, 0.28, 0.29, 0.30, 0.31, 0.32, 0.33, 0.34, 0.35]
            },
            f3: {
                value: [0, 5, 10, 15, 20, 25]
            } //e2 for passive
        },
        sInfo2: {
            active: true
        },
        sInfo3: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        }
    },
    Azir: {
        buffs: [{
                spell: 1,
                key: "e3",
                type: "attackSpeed"
            },
            {
                spell: 1,
                key: "e7",
                type: "attackSpeed",
                active: true
            }
        ],
        sInfoP: {
            p1: {
                info: "Damage",
                child: ["p1Var"]
            },
            p1Var: {
                link: "spelldamage",
                coeff: 0.15
            }
        },
        sInfo0: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo1: {
            active: true,
            f2: {
                type: "mag",
                valuePerLvl: [60, 62, 64, 66, 68, 70, 72, 75, 80, 85, 90, 100, 110, 120, 130, 140, 150, 160],
                spell: true,
                child: ["a1"]
            },
            f7: {
                valuePerLvl: [25, 25, 25, 25, 25, 50, 50, 50, 50, 50, 75, 75, 75, 75, 75, 100, 100, 100]
            },
            f1: {
                child: ["f1Var"]
            },
            f1Var: {
                coeff: [8, 7.5, 7, 6.5, 6],
                link: "@cooldownchampion"
            },
            maxammo: {
                value: 2
            }
        },
        sInfo2: {
            e4: {
                type: "shield",
                child: ["a2"]
            },
            e3: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo3: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        }
    },
    Bard: {
        buffs: [{
            spell: 2,
            key: "e2",
            type: "percentmoveSpeed",
            active: true
        }],
        sInfoP: {
            input: {
                myInfo: "5X",
                type: "number",
                max: "999"
            },
            p1: {
                info: "Damage",
                type: "mag",
                value: 30,
                child: ["p1Var", "p1Var2"]
            },
            p1Var: {
                link: "spelldamage",
                coeff: 0.3
            },
            p1Var2: {
                inputId: "P",
                link: "input",
                coeff: 15
            }
        },
        sInfo0: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo1: {
            e5: {
                type: "heal",
                child: ["a1"]
            },
            e6: {
                type: "heal",
                child: ["a2"]
            },
            f1: {
                value: 0
            },
            f2: {
                value: 3
            }
        },
        sInfo2: {
            active: true
        }
    },
    Blitzcrank: {
        buffs: [{
                spell: 1,
                key: "e1",
                type: "percentmoveSpeed",
                active: true
            },
            {
                spell: 1,
                key: "e2",
                type: "attackSpeed",
                active: true
            }
        ],
        sInfo0: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo1: {
            active: true
        },
        sInfo3: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            },
            e2: {
                type: "mag",
                spell: true,
                child: ["a2"]
            }
        }
    },
    Brand: {
        sInfoP: {
            p1: {
                value: 4,
                type: "mag",
                spell: true,
                info: "magicDamage",
                myInfo: " [x1]",
                apply: "maxHp",
                ticks: 4,
                duration: 4,
                multiplier: 25
            },
            p2: {
                value: 12,
                type: "mag",
                spell: true,
                info: "magicDamage",
                myInfo: " [x3]",
                apply: "maxHp",
                ticks: 4,
                duration: 4,
                multiplier: 25
            },
            p3: {
                valuePerLvl: [12, 12.5, 13, 13.5, 14, 14.5, 15, 15.5, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16],
                type: "mag",
                spell: true,
                info: "magicDamage",
                apply: "maxHp"
            }
        },
        sInfo0: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo1: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo2: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"],
                ticks: 5,
                duration: 5,
                multiplier: 20
            }
        },
        sInfo3: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        }
    },
    Braum: {
        buffs: [{
                spell: 1,
                key: "f3",
                type: "armor",
                active: true
            },
            {
                spell: 1,
                key: "f4",
                type: "mr",
                active: true
            },
            {
                spell: 2,
                key: "e3",
                type: "dmgReduction",
                active: true
            },
            {
                spell: 2,
                key: "e4",
                type: "percentmoveSpeed",
                active: true
            }
        ],
        sInfoP: {
            p1: {
                info: "magicDamage",
                type: "mag",
                value: 16,
                child: ["p1Var"]
            },
            p1Var: {
                link: "champLevel",
                coeff: 10
            }
        },
        sInfo0: {
            e1: {
                type: "mag",
                spell: true,
                child: ["f1Var"]
            },
            f1Var: {
                link: "maxHp",
                coeff: 0.025
            }
        },
        sInfo1: {
            active: true,
            f3: {
                effectNo: 4,
                type: "armor",
                child: ["f3Var"]
            },
            f3Var: {
                link: "armor",
                coeff: [0.1, 0.115, 0.13, 0.145, 0.16]
            },
            f4: {
                effectNo: 4,
                type: "mr",
                child: ["f4Var"]
            },
            f4Var: {
                link: "mr",
                coeff: [0.1, 0.115, 0.13, 0.145, 0.16]
            }
        },
        sInfo2: {
            active: true
        },
        sInfo3: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        }
    },
    Caitlyn: {
        aSpdBonus: 0.1,
        sInfoP: {
            p1: {
                info: "Damage",
                type: "phys",
                child: ["p1Var", "p2Var"]
            },
            p1Var: {
                link: "attackdamage",
                coeff: [0.5, 0.5294, 0.5588, 0.5882, 0.6176, 0.6471, 0.6765, 0.7059, 0.7353, 0.7627, 0.7941, 0.8235, 0.8529, 0.8824, 0.9118, 0.9412, 0.9706, 1]
            },
            p2Var: {
                link: "caitPassive",
                coeff: 1
            }
        },
        sInfo0: {
            e1: {
                type: "phys",
                spell: true,
                child: ["e1Var"]
            },
            e1Var: {
                link: "attackdamage",
                coeff: [1.3, 1.4, 1.5, 1.6, 1.7]
            }
        },
        sInfo1: {
            e2: {
                type: "phys",
                child: ["e2Var"]
            },
            e2Var: {
                link: "bonusattackdamage",
                coeff: [0.4, 0.55, 0.7, 0.85, 1]
            }
        },
        sInfo2: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo3: {
            e1: {
                type: "phys",
                child: ["f1"]
            }
        }
    },
    Camille: {
        buffs: [{
            spell: 2,
            key: "e2",
            type: "attackSpeed",
            active: true
        }],
        sInfoP: {
            p1: {
                info: "statDefense",
                type: "shield",
                selfShield: true,
                child: ["p1Var"]
            },
            p1Var: {
                link: "maxHp",
                coeff: 0.2
            }
        },
        sInfo0: {
            f1: {
                type: "phys",
                child: ["f1Var"]
            },
            f1Var: {
                link: "attackdamage",
                coeff: [0.2, 0.25, 0.3, 0.35, 0.4]
            },
            f2: {
                type: "phys",
                child: ["f1Var"],
                multiplier: 200
            },
            f3: {
                valuePerLvl: [40, 44, 48, 52, 56, 60, 64, 68, 72, 76, 80, 84, 88, 92, 96, 100, 100, 100]
            }
        },
        sInfo1: {
            e1: {
                type: "phys",
                spell: true,
                child: ["e1Var"]
            },
            e1Var: {
                link: "bonusattackdamage",
                coeff: 0.6
            },
            e5: {
                type: "phys",
                spell: true,
                apply: "maxHp",
                child: ["e5Var"]
            },
            e5Var: {
                link: "bonusattackdamage",
                coeff: 0.03
            }
        },
        sInfo2: {
            active: true,
            e3: {
                type: "phys",
                spell: true,
                child: ["e3Var"]
            },
            e3Var: {
                link: "bonusattackdamage",
                coeff: 0.75
            }
        },
        sInfo3: {
            e2: {
                type: "mag"
            },
            e1: {
                type: "mag",
                apply: "currHp"
            }
        }
    },
    Cassiopeia: {
        buffs: [{
            spell: "P",
            key: "p1",
            type: "basemovespeed"
        }],
        sInfoP: {
            p1: {
                info: "Movement",
                child: ["p1Var"]
            },
            p1Var: {
                link: "champLevel",
                coeff: 4
            }
        },
        sInfo0: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo1: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo2: {
            e1: {
                type: "mag",
                child: ["a2"]
            },
            f1: {
                value: 48,
                type: "mag",
                spell: true,
                child: ["f1Var", "a1"]
            },
            f1Var: {
                link: "champLevel",
                coeff: 4
            },
            f4: {
                value: 4,
                type: "heal",
                selfHeal: true,
                spell: true,
                child: ["f4Var", "a1"]
            },
            f4Var: {
                link: "champLevel",
                coeff: 1
            }
        },
        sInfo3: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        }
    },
    Chogath: {
        buffs: [{
            spell: 3,
            key: "f3Buff",
            type: "hp"
        }],
        sInfoP: {
            p1: {
                value: 17,
                type: "heal",
                selfHeal: true,
                info: "Health",
                child: ["p1Var"]
            },
            p2: {
                value: 3.25,
                info: "Mana",
                child: ["p2Var"]
            },
            p1Var: {
                link: "champLevel",
                coeff: 3
            },
            p2Var: {
                link: "champLevel",
                coeff: 0.25
            }
        },
        sInfo0: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo1: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo2: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"],
                basicAttack: true
            },
            f1: {
                value: 3,
                type: "mag",
                apply: "maxHp",
                child: ["f1Var"],
                basicAttack: true
            },
            f1Var: {
                inputId: "3",
                link: "input",
                coeff: 0.5
            }
        },
        sInfo3: {
            input: {
                type: "number",
                max: "255"
            },
            e1: {
                type: "tru",
                spell: true,
                child: ["a2"]
            },
            e2: {
                type: "tru",
                spell: true,
                child: ["a2", "f2Var"]
            },
            e4a: {
                value: 249
            },
            f2Var: {
                link: "bonusHp",
                coeff: 0.1
            },
            f3Buff: {
                child: ["f3Var"]
            },
            f3Var: {
                inputId: "3",
                link: "input",
                coeff: [80, 120, 160]
            }
        }
    },
    Corki: {
        /*debuff: [{
            name: "FlatArmorMagPen",
            value: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 6, 7, 7.5, 8, 9, 10, 10.5, 12, 12.5, 14, 15, 16, 17.5, 20],//this has been buffed
            img: "spell/GGun.png"
        }],*/
        sInfo0: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1", "a2Var"]
            }, //riot fucked the keys up again
            a2Var: {
                link: "spelldamage",
                coeff: 0.5
            }
        },
        sInfo1: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            },
            f1: {
                valuePerLvl: [30, 30, 30, 30, 30, 30, 30, 35, 40, 45, 50, 55, 60, 65, 70, 80, 90, 100],
                type: "mag",
                spell: true,
                child: ["a2", "f2Var"]
            },
            f2Var: {
                link: "bonusattackdamage",
                coeff: 1.5
            }
        },
        sInfo2: {
            e1: {
                type: "hybrid",
                spell: true,
                child: ["a1"],
                ticks: 4,
                duration: 4,
                multiplier: 25
            }
        },
        sInfo3: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1", "f1Var"]
            },
            f1Var: {
                link: "attackdamage",
                coeff: [0.15, 0.45, 0.75]
            },
            f2: {
                value: 100
            },
            f3: {
                effectNo: 1,
                type: "mag",
                spell: true,
                child: ["a1", "f1Var"],
                multiplier: 200
            }
        }
    },
    Darius: {
        buffs: [{
                spell: "P",
                key: "p3",
                type: "attackdamage",
                active: true
            },
            {
                spell: 2,
                key: "e1",
                type: "percentArmPen"
            }
        ],
        sInfoP: {
            active: true,
            p1: {
                value: 12,
                type: "phys",
                info: "Damage",
                myInfo: " [x1]",
                child: ["p1Var"]
            },
            p1Var: {
                link: "champLevel",
                coeff: 1
            },
            p2: {
                value: 60,
                type: "phys",
                spell: true,
                info: "Damage",
                myInfo: " [x5]",
                child: ["p2Var"]
            },
            p2Var: {
                link: "champLevel",
                coeff: 5
            },
            p3: {
                valuePerLvl: [30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 85, 95, 105, 130, 155, 180, 205, 230],
                info: "AttackDamage"
            }
        },
        sInfo0: {
            e2: {
                type: "phys",
                spell: true,
                child: ["f1Var"]
            },
            e5: {
                type: "heal",
                selfHeal: true,
                missHp: true
            },
            e7: {
                type: "heal",
                selfHeal: true,
                missHp: true
            },
            f1Var: {
                link: "attackdamage",
                coeff: [1, 1.1, 1.2, 1.3, 1.4]
            }
        },
        sInfo1: {
            f1: {
                type: "phys",
                child: ["f1Var"],
                basicAttack: true
            },
            f1Var: {
                link: "attackdamage",
                coeff: [1.4, 1.45, 1.5, 1.55, 1.6]
            }
        },
        sInfo3: {
            e1: {
                type: "tru",
                spell: true,
                child: ["f1"]
            },
            f3: {
                effectNo: 1,
                type: "tru",
                spell: true,
                child: ["f1"],
                multiplier: 200
            }
        }
    },
    Diana: {
        buffs: [{
            spell: "P",
            key: "p1",
            type: "attackSpeed",
            active: true
        }],
        sInfoP: {
            active: true,
            p1: {
                valuePair: [2, "f1"],
                info: "PercentAttackSpeedMod"
            },
            p1Var: {
                link: "champLevel",
                coeff: 1
            },
            p2: {
                valuePerLvl: [20, 25, 30, 35, 40, 50, 60, 70, 80, 90, 105, 120, 135, 155, 175, 200, 225, 250],
                type: "mag",
                info: "magicDamage",
                child: ["p2Var"],
                dps: 3
            },
            p2Var: {
                link: "spelldamage",
                coeff: 0.8
            },
            p3: {
                info: "Mana",
                child: ["p3Var"]
            },
            p3Var: {
                link: "spelldamage",
                coeff: 0.15
            }
        },
        sInfo0: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo1: {
            e2: {
                type: "mag",
                spell: true,
                child: ["a1"]
            },
            e3: {
                type: "shield",
                selfShield: true,
                child: ["a2"]
            }
        },
        sInfo2: {
            f1: {
                value: [30, 50, 60, 70, 80, 90]
            }
        },
        sInfo3: {
            e2: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        }
    },
    Draven: { //w is missing tooltip???[added english]
        buffs: [{
                spell: 1,
                key: "e4",
                type: "attackSpeed",
                active: true
            },
            {
                spell: 1,
                key: "e2",
                type: "percentmoveSpeed",
                active: true
            }
        ],
        sInfo0: {
            f1: {
                effectNo: 5,
                type: "phys",
                child: ["f1Var"],
                basicAttack: true,
                dps: 1
            },
            f1Var: {
                link: "bonusattackdamage",
                coeff: [0.65, 0.75, 0.85, 0.95, 1.05]
            }
        },
        sInfo1: {
            active: true,
            txt: "Draven gains {{ e2 }}% increased Movement Speed for {{ e3 }} seconds and {{ e4 }}% increased Attack Speed for {{ e5 }} seconds. The Movement Speed decreases rapidly over its duration.<br /><br />Catching a Spinning Axe will refresh the cooldown of Blood Rush"
        },
        sInfo2: {
            e1: {
                type: "phys",
                spell: true,
                child: ["f1"]
            }
        },
        sInfo3: {
            e1: {
                type: "phys",
                spell: true,
                child: ["f1"]
            }
        }
    },
    DrMundo: { //mr scaling on e
        aSpdBonus: 0.153,
        buffs: [{
                spell: 2,
                key: "e5",
                type: "attackdamage",
                active: true
            },
            {
                spell: 2,
                key: "f5",
                type: "attackdamage",
                active: true
            },
            {
                spell: 3,
                key: "e3",
                type: "percentmoveSpeed",
                active: true
            }
        ],
        sInfoP: {
            p1: {
                type: "heal",
                selfHeal: true,
                info: "HealthRegen",
                child: ["p1Var"]
            },
            p1Var: {
                link: "maxHp",
                coeff: 0.03
            }
        },
        sInfo0: {
            e2: {
                type: "mag",
                spell: true,
                apply: "currHp"
            },
            e1: {
                type: "mag",
                spell: true
            },
            f1: {
                value: [20, 24, 28, 32, 36],
                type: "heal",
                selfHeal: true,
            },
            f2: {
                value: [40, 48, 56, 64, 72],
                selfHeal: true,
                type: "heal"
            }
        },
        sInfo1: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo2: {
            active: true,
            f3: {
                effectNo: 8,
                multiplier: 300
            },
            f1: {
                type: "phys",
                child: ["f1Var"]
            },
            f1Var: {
                link: "maxHp",
                coeff: [0.03, 0.035, 0.04, 0.045, 0.05]
            },
            f2: {
                value: [0.3, 0.45, 0.6, 0.75, 0.9]
            },
            f5: {
                child: ["f5Var"]
            },
            f5Var: {
                link: "percentMissingHp",
                coeff: [0.3, 0.45, 0.6, 0.75, 0.9]
            }
        },
        sInfo3: {
            active: true,
            e1: {
                type: "heal",
                percentMax: true
            }
        }
    },
    Ekko: {
        aSpdBonus: 0.1,
        buffs: [{
            spell: "P",
            key: "p2",
            type: "percentmoveSpeed",
            active: true
        }],
        sInfoP: {
            active: true,
            p1: {
                valuePerLvl: [30, 40, 50, 60, 70, 80, 85, 90, 95, 100, 105, 110, 115, 120, 125, 130, 135, 140],
                type: "mag",
                info: "magicDamage",
                child: ["p1Var"]
            },
            p1Var: {
                link: "spelldamage",
                coeff: 0.8
            },
            p2: {
                valuePerLvl: [50, 50, 50, 50, 50, 60, 60, 60, 60, 60, 70, 70, 70, 70, 70, 80, 80, 80],
                info: "PercentMovementSpeedMod"
            }
        },
        sInfo0: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            },
            e3: {
                type: "mag",
                spell: true,
                child: ["a2"]
            }
        },
        sInfo1: {
            e3: {
                type: "mag",
                spell: true,
                apply: "missHp",
                child: ["a2"]
            },
            e6: {
                type: "mag"
            },
            e4: {
                type: "shield",
                selfShield: true,
                child: ["a1"]
            }
        },
        sInfo2: {
            e1: {
                type: "mag",
                child: ["a1"]
            }
        },
        sInfo3: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            },
            e3: {
                type: "heal",
                selfHeal: true,
                spell: true,
                child: ["a2"]
            }
        }
    },
    Elise: { //spider form abilities missing [ADD foreign]
        buffs: [{
                spell: 1,
                key: "f2",
                type: "attackSpeed",
                active: true
            },
            {
                spell: 3,
                key: "e3",
                type: "flatmoveSpeed",
                active: true
            }
        ],
        sInfoP: {
            p1: {
                type: "mag",
                valuePair: [3, "f1"],
                info: "magicDamage"
            },
            p2: {
                type: "heal",
                selfHeal: true,
                valuePair: [3, "f2"],
                info: "Regen"
            }
        },
        sInfo0: {
            txt: "<hr>Lunges to a target with a poisonous bite that deals Magic Damage equal to {{ f1 }} plus {{ f2 }}% Health. Max {{ f3 }} bonus damage to monsters.",
            e1: {
                type: "mag",
                spell: true
            },
            e6: {
                type: "mag",
                child: ["a1"],
                apply: "currHp"
            },
            f1: {
                value: [70, 110, 150, 190, 230],
                type: "mag",
                spell: true
            },
            f2: {
                type: "mag",
                value: 8,
                child: ["f2Var"],
                apply: "missHp"
            },
            f2Var: {
                link: "spelldamage",
                coeff: 0.03
            },
            f3: {
                value: [75, 100, 125, 150, 175]
            }
        },
        sInfo1: {
            active: true,
            txt: "<hr>Passive: Spiderlings gain {{ f1 }}% Attack Speed.<br><br>Active: Increases Attack Speed by {{ f2 }}% for Elise and her Spiderlings for 3 seconds.",
            e3: {
                type: "mag",
                spell: true,
                child: ["a1"]
            },
            f1: {
                value: [5, 10, 15, 20, 25]
            },
            f2: {
                value: [60, 80, 100, 120, 140]
            }
        },
        sInfo3: {
            active: true,
            e1: {
                type: "mag",
                spell: true,
                child: ["a2"]
            },
            f1: {
                value: [10, 10, 20, 30, 40],
                child: ["f1Var"]
            },
            f1Var: {
                link: "spelldamage",
                coeff: 0.3
            },
            f2: {
                value: [4, 4, 6, 8, 10],
                child: ["f1Var"]
            },
            f2Var: {
                link: "spelldamage",
                coeff: 0.1
            }
        }
    },
    Evelynn: {
        buffs: [{
            spell: 2,
            key: "e3",
            type: "percentmoveSpeed",
            active: true
        }],
        debuff: [{
            name: "PercentMagPen",
            value: [0, 0.25, 0.275, 0.3, 0.325, 0.35],
            img: "spell/EvelynnW.png"
        }],
        sInfoP: {
            p1: {
                value: 230,
                info: ["Health", "Level"],
                child: ["p1Var", "p1Var2"]
            },
            p1Var: {
                link: "champLevel",
                coeff: 20
            },
            p1Var2: {
                link: "spelldamage",
                coeff: 2.5
            },
            p2: {
                type: "heal",
                valuePerLvl: [15, 19, 22, 26, 29, 33, 36, 40, 43, 47, 50, 54, 57, 61, 64, 68, 71, 75],
                info: "HealthRegen"
            }
        },
        sInfo0: {
            e4: {
                type: "mag",
                spell: true,
                child: ["a1"]
            },
            e5: {
                type: "mag",
                spell: true,
                child: ["a2"]
            }
        },
        sInfo2: {
            active: true,
            f1: {
                type: "mag",
                effectNo: 1,
                spell: true,
                onHit: 1
            },
            e5: {
                type: "mag",
                child: ["a1"],
                apply: "maxHp"
            },
            f2: {
                type: "mag",
                effectNo: 2,
                spell: true,
                onHit: 1
            },
            e6: {
                type: "mag",
                child: ["a2"],
                apply: "maxHp"
            }
        },
        sInfo3: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            },
        }
    },
    Ezreal: {
        buffs: [{
                spell: 1,
                key: "e2",
                type: "attackSpeed",
                active: true
            },
            {
                spell: "P",
                key: "p1",
                type: "attackSpeed"
            }
        ],
        sInfoP: {
            input: {
                type: "number",
                max: "5"
            },
            p1: {
                info: "PercentAttackSpeedMod",
                child: ["p1Var"]
            },
            p1Var: {
                inputId: "P",
                link: "input",
                coeff: 10
            },
        },
        sInfo0: {
            e1: {
                type: "phys",
                spell: true,
                onHit: 1,
                child: ["a1", "a2"]
            }
        },
        sInfo1: {
            active: true,
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo2: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1", "a2"]
            }
        },
        sInfo3: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1", "a2"]
            }
        }
    },
    Fiddlesticks: {
        buffs: [{
            spell: "P",
            key: "p1",
            type: "percentmoveSpeed",
            active: true
        }],
        sInfoP: {
            active: true,
            p1: {
                info: "PercentMovementSpeedMod",
                valuePerLvl: [25, 25, 25, 25, 25, 30, 30, 30, 30, 30, 35, 35, 35, 35, 35, 40, 40, 40]
            }
        },
        sInfo1: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo2: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo3: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            },
            f1: {
                effectNo: 1,
                type: "mag",
                spell: true,
                child: ["a1"],
                duration: 5,
                ticks: 5
            }
        }
    },
    Fiora: { // look into fiora crit damage on e
        debuff: [{
            name: "PercentAtkSpeed",
            value: 0.5,
            img: "spell/FioraW.png"
        }],
        buffs: [{
            spell: "P",
            key: "p3",
            type: "percentmoveSpeed",
            active: true
        }],
        sInfoP: {
            active: true,
            p1: {
                info: "Damage",
                value: 2.5,
                type: "tru",
                apply: "maxHp",
                child: ["p1Var"]
            },
            p1Var: {
                link: "attackdamage",
                coeff: 0.045
            },
            p2: {
                info: "Regen",
                value: 25,
                type: "heal",
                selfHeal: true,
                child: ["p2Var"]
            },
            p2Var: {
                link: "champLevel",
                coeff: 5
            },
            p3: {
                info: "PercentMovementSpeedMod",
                value: 20,
                valuePair: [3, "f1"]
            }
        },
        sInfo0: {
            e1: {
                type: "phys",
                spell: true,
                onHit: 1,
                child: ["f1Var"]
            },
            f1Var: {
                link: "bonusattackdamage",
                coeff: [0.95, 1, 1.05, 1.1, 1.15]
            }
        },
        sInfo1: {
            e1: {
                type: "mag",
                spell: true,
                child: ["f1Var"]
            },
            f1Var: {
                link: "spelldamage",
                coeff: 1
            }
        },
        sInfo2: {
            f4: {
                effectNo: 6
            },
            f3: {
                type: "phys",
                crit: [
                    [140, 155, 170, 185, 200], true
                ],
                child: ["f3Var"],
                basicAttack: true
            },
            f3Var: {
                link: "attackdamage",
                coeff: 1
            }
        },
        sInfo3: {
            e7: {
                type: "heal",
                selfHeal: true,
                child: ["f9Var"]
            },
            f9Var: {
                link: "bonusattackdamage",
                coeff: 0.6
            },
            f6: {
                value: [30, 40, 50]
            },
            f8: {
                value: 10,
                type: "tru",
                apply: "maxHp",
                child: ["f8Var"]
            },
            f8Var: {
                link: "bonusattackdamage",
                coeff: 0.18
            },
            f1: {
                value: [0, 10, 20, 30]
            }
        }
    },
    Fizz: {
        sInfoP: {
            p1: {
                valuePerLvl: [4, 4, 4, 6, 6, 6, 8, 8, 8, 10, 10, 10, 12, 12, 12, 14, 14, 14],
                info: ["Attack", "reduction"]
            }
        },
        sInfo0: {
            a2: {
                type: "phys",
                child: ["a2"]
            },
            e1: {
                type: "mag",
                spell: true,
                onHit: 1,
                child: ["a1"]
            }
        },
        sInfo1: {
            dotdamage: {
                effectNo: 1,
                type: "mag",
                child: ["f1Var"]
            },
            f1Var: {
                link: "spelldamage",
                coeff: 0.4
            },
            bleedduration: {
                effectNo: 4
            },
            activedamage: {
                value: [50, 70, 90, 110, 130],
                type: "mag",
                child: ["f2Var"]
            },
            f2Var: {
                link: "spelldamage",
                coeff: 0.6
            },
            onhitbuffduration: {
                value: 5
            },
            onhitbuffdamage: {
                effectNo: 10,
                type: "mag",
                child: ["f3Var"]
            },
            f3Var: {
                link: "spelldamage",
                coeff: 0.4
            },
            onkillmanarefund: {
                effectNo: 2,
            },
            onkillnewcooldown: {
                value: 1
            },
        },
        sInfo2: {
            edamage: {
                effectNo: 1,
                type: "mag",
                spell: true,
                child: ["f1Var"]
            },
            f1Var: {
                link: "spelldamage",
                coeff: 0.75
            },
        },
        sInfo3: {
            smallsharkdamage: {
                effectNo: 1,
                type: "mag",
                spell: true,
                child: ["f1Var"]
            },
            f1Var: {
                link: "spelldamage",
                coeff: 0.9
            },
            bigsharkdamage : {
                effectNo: 3,
                type: "mag",
                spell: true,
                child: ["f2Var"]
            },
            f2Var: {
                link: "spelldamage",
                coeff: 1.3
            },
        }
    },
    Galio: {
        buffs: [{
                spell: 1,
                key: "e1",
                type: "magDmgReduction",
                active: true
            },
            {
                spell: 1,
                key: "e1Buff2",
                type: "physDmgReduction",
                active: true
            }
        ],
        sInfoP: {
            p1: {
                value: 8,
                info: "magicDamage",
                type: "mag",
                child: ["p1Var", "p1Var2", "p1Var3", "p1Var4"]
            },
            p1Var: {
                link: "champLevel",
                coeff: 4
            },
            p1Var2: {
                link: "attackdamage",
                coeff: 1
            },
            p1Var3: {
                link: "spelldamage",
                coeff: 0.5
            },
            p1Var4: {
                link: "bonusmr",
                coeff: 0.4
            }
        },
        sInfo0: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            },
            e5: {
                type: "mag",
                spell: true,
                child: ["e5Var"]
            },
            e5Var: {
                link: "spelldamage",
                coeff: 0.6
            },
            f9: {
                type: "mag",
                apply: "maxHp",
                child: ["f9Var"]
            },
            f9Var: {
                link: "spelldamage",
                coeff: 0.03
            }
        },
        sInfo1: {
            active: true,
            f3: {
                effectNo: 5,
                type: "shield",
                selfShield: true,
                percentMax: true
            },
            e1: {
                child: ["f2Var", "f4Var"]
            },
            e1Buff2: {
                effectNo: 1,
                child: ["f2Var", "f4Var"],
                multiplier: 50
            },
            f2Var: {
                link: "spelldamage",
                coeff: 0.05
            },
            f4Var: {
                link: "bonusmr",
                coeff: 0.08
            },
            f5: {
                value: 50
            },
            f8: {
                value: [20, 30, 40, 50, 60],
                type: "mag",
                spell: true,
                child: ["f8Var"]
            },
            f8Var: {
                link: "spelldamage",
                coeff: 0.2
            },
            f10: {
                value: [60, 90, 120, 150, 180],
                type: "mag",
                spell: true,
                child: ["f10Var"]
            },
            f10Var: {
                link: "spelldamage",
                coeff: 0.6
            }
        },
        sInfo2: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo3: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            },
            e5: {
                child: ["f2Var"]
            },
            f2Var: {
                link: "bonusmr",
                coeff: 0.08
            },
        }
    },
    Gangplank: { //add damage from different ult items
        buffs: [{
                spell: 2,
                key: "e0",
                type: "percentArmPen",
                active: true
            },
            {
                spell: "P",
                key: "p2",
                type: "percentmoveSpeed",
                active: true
            }
        ],
        sInfoP: {
            active: true,
            p1: {
                type: "tru",
                info: "Damage",
                value: 45,
                child: ["p1Var", "p1Var2"]
            },
            p1Var: {
                link: "bonusattackdamage",
                coeff: 1
            },
            p1Var2: {
                link: "champLevel",
                coeff: 10
            },
            p2: {
                info: "PercentMovementSpeedMod",
                value: 30
            }
        },
        sInfo0: {
            e1: {
                type: "phys",
                spell: true,
                child: ["a1"],
                onHit: 1,
                crit: [100]
            }
        },
        sInfo1: {
            e1: {
                type: "heal",
                selfHeal: true,
                child: ["a1"]
            },
            e2: {
                type: "heal",
                selfHeal: true,
                missHp: true
            }
        },
        sInfo2: {
            active: true,
            e3: {
                type: "phys",
                spell: true
            }
        },
        sInfo3: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            },
            f3: {
                value: 12
            }
        }
    },
    Garen: {
        buffs: [{
                spell: 0,
                key: "e2",
                type: "percentmoveSpeed",
                active: true
            },
            {
                spell: 1,
                key: "f1",
                type: "armor"
            },
            {
                spell: 1,
                key: "f1",
                type: "mr"
            },
            {
                spell: 1,
                key: "e6",
                type: "dmgReduction",
                active: true
            }
        ],
        debuff: [{
            name: "PercentArmorPen",
            value: 0.25,
            img: "spell/GarenE.png"
        }],
        sInfoP: {
            p1: {
                type: "heal",
                info: "HealthRegen",
                child: ["p1Var"]
            },
            p2: {
                type: "heal",
                info: "HealthRegen",
                child: ["p1Var"],
                myInfo: "(low)",
                multiplier: 200
            },
            p1Var: {
                link: "maxHp",
                coeff: [0.004, 0.004, 0.004, 0.004, 0.004, 0.004, 0.004, 0.004, 0.004, 0.004, 0.008, 0.008, 0.008, 0.008, 0.008, 0.008, 0.008, 0.008]
            }
        },
        sInfo0: {
            active: true,
            e1: {
                type: "phys",
                spell: true,
                child: ["a1"],
                basicAttack: true
            }
        },
        sInfo1: {
            input: {
                type: "number",
                max: "160"
            },
            active: true,
            f2: {
                value: 0.25
            },
            f1: {
                child: ["f2Var"]
            },
            f2Var: {
                inputId: "1",
                link: "input",
                coeff: 0.25
            }
        },
        sInfo2: {
            f2: {
                valuePerLvl: [5, 5, 5, 6, 6, 6, 7, 7, 7, 8, 8, 8, 9, 9, 9, 10, 10, 10]
            },
            f3: {
                effectNo: 1,
                type: "phys",
                spell: true,
                child: ["f3Var"],
                crit: [50]
            },
            f3Var: {
                link: "attackdamage",
                coeff: [0.36, 0.37, 0.38, 0.39, 0.4]
            }
        },
        sInfo3: {
            e3: {
                type: "tru",
                apply: "maxHp"
            },
            e1: {
                type: "mag",
                spell: true
            },
            e2: {
                type: "mag",
                apply: "missHp"
            }
        }
    },
    Gnar: {
        aSpdBonus: 0.055,
        buffs: [{
                spell: 1,
                key: "f1",
                type: "percentmoveSpeed",
                active: true
            },
            {
                spell: 2,
                key: "e2",
                type: "attackSpeed",
                active: true
            },
            {
                spell: "P",
                key: "p1",
                type: "flatmoveSpeed",
                passiveOnly: true
            },
            {
                spell: "P",
                key: "p2",
                type: "baseAd",
                active: true
            },
            {
                spell: "P",
                key: "p3",
                type: "baseHP",
                active: true
            },
            {
                spell: "P",
                key: "p4",
                type: "baseArmor",
                active: true
            },
            {
                spell: "P",
                key: "p5",
                type: "baseMR",
                active: true
            },
            {
                spell: "P",
                key: "p6",
                type: "attackSpeed",
                active: true
            },
        ],
        sInfoP: {
            active: true,
            p1: {
                valuePerLvl: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 26, 28, 30],
                info: ["Movement", "reduction"]
            },
            p2: {
                value: 7,
                info: "AttackDamage",
                growth: 2.5
            },
            p3: {
                value: 100,
                info: "Health",
                growth: 43
            },
            p4: {
                value: 3.5,
                info: "Armor",
                growth: 2
            },
            p5: {
                value: 3.5,
                info: "SpellBlock",
                growth: 1.5
            },
            p6: {
                info: ["AttackSpeed", "reduction"],
                myInfo: "%",
                value: -5.5,
                growth: -5.5
            },
        },
        sInfo0: {
            e1: {
                type: "phys",
                spell: true,
                child: ["a1"]
            },
            e2: {
                type: "phys",
                spell: true,
                child: ["a2"]
            },
            f1: {
                value: 45,
                valuePair: [3, "q1"]
            }
        },
        sInfo1: {
            active: true,
            e1: {
                type: "phys",
                child: ["a1"],
                basicAttack: true
            },
            e2: {
                type: "phys",
                apply: "maxHp",
                basicAttack: true
            },
            e3: {
                type: "phys",
                spell: true,
                child: ["a2"]
            },
            f1: {
                value: 30,
                valuePair: [3, "w1"]
            }
        },
        sInfo2: {
            active: true,
            e1: {
                type: "phys",
                child: ["f1Var"],
                spell: true
            },
            f1Var: {
                link: "maxHp",
                coeff: 0.06
            }
        },
        sInfo3: {
            e1: {
                type: "phys",
                spell: true,
                child: ["a1", "a2"]
            },
            q1: {
                value: [0, 5, 10, 15]
            },
            w1: {
                value: [0, 15, 30, 45]
            }
        }
    },
    Gragas: { //active onhit magic damage [procs spells]
        aSpdBonus: 0.08,
        buffs: [{
            spell: 1,
            key: "e1",
            type: "dmgReduction",
            active: true
        }],
        sInfoP: {
            p1: {
                type: "heal",
                selfHeal: true,
                info: "HealthRegen",
                child: ["p1Var"]
            },
            p1Var: {
                link: "maxHp",
                coeff: 0.06
            }
        },
        sInfo0: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo1: {
            active: true,
            e3: {
                type: "mag",
                spell: true,
                child: ["a1"],
                basicAttack: true
            },
            e2: {
                type: "mag",
                apply: "maxHp",
                basicAttack: true
            },
            e1: {
                child: ["f1Var"]
            },
            f1Var: {
                link: "spelldamage",
                coeff: 0.04
            }
        },
        sInfo2: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            },
            f1: {
                value: 3
            }
        },
        sInfo3: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        }
    },
    Graves: { //only show 4 if not crit with passive,add reload speed
        buffs: [{
            spell: 2,
            key: "f5Buff",
            type: "armor"
        }, ],
        sInfoP: {
            p1: {
                type: "phys",
                onHit: 1,
                basicAttack: true,
                info: "Damage",
                myInfo: "[X1]",
                crit: [40],
                child: ["p1Var"]
            },
            p1Var: {
                link: "attackdamage",
                coeff: [0.7, 0.71, 0.72, 0.74, 0.75, 0.76, 0.78, 0.8, 0.81, 0.83, 0.85, 0.87, 0.89, 0.91, 0.95, 0.96, 0.97, 1]
            },
            p2: {
                type: "phys",
                onHit: 1,
                basicAttack: true,
                info: "Damage",
                myInfo: "[X2]",
                crit: [40],
                child: ["p1Var", "p2Var"]
            },
            p2Var: {
                link: "attackdamage",
                coeff: [0.233, 0.237, 0.24, 0.247, 0.25, 0.253, 0.26, 0.267, 0.27, 0.277, 0.283, 0.29, 0.297, 0.303, 0.317, 0.32, 0.323, 0.333]
            },
            p3: {
                type: "phys",
                onHit: 1,
                basicAttack: true,
                info: "Damage",
                myInfo: "[X3]",
                crit: [40],
                child: ["p1Var", "p2Var", "p2Var"]
            },
            p4: {
                type: "phys",
                onHit: 1,
                basicAttack: true,
                info: "Damage",
                myInfo: "[X4]",
                crit: [40],
                child: ["p1Var", "p2Var", "p2Var", "p2Var"]
            },
            p5: {
                type: "phys",
                onHit: 1,
                basicAttack: true,
                info: "Damage",
                myInfo: "[X5]",
                crit: [40],
                child: ["p1Var", "p2Var", "p2Var", "p2Var", "p2Var"]
            },
            p6: {
                type: "phys",
                onHit: 1,
                basicAttack: true,
                info: "Damage",
                myInfo: "[X6]",
                crit: [40],
                child: ["p1Var", "p2Var", "p2Var", "p2Var", "p2Var", "p2Var"]
            }
        },
        sInfo0: {
            e1: {
                type: "phys",
                spell: true,
                child: ["f1Var"]
            },
            f1Var: {
                link: "bonusattackdamage",
                coeff: 1
            },
            e2: {
                type: "phys",
                spell: true,
                child: ["f2Var"]
            },
            f2Var: {
                link: "bonusattackdamage",
                coeff: [0.4, 0.7, 1, 1.3, 1.6]
            }
        },
        sInfo1: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo2: {
            input: {
                type: "number",
                max: "8"
            },
            f5Buff: {
                child: ["f5Var"]
            },
            f5Var: {
                inputId: "2",
                link: "input",
                coeff: [5, 7.5, 10, 12.5, 15]
            }
        },
        sInfo3: {
            e1: {
                type: "phys",
                spell: true,
                child: ["f1Var"]
            },
            f1Var: {
                link: "bonusattackdamage",
                coeff: 1.5
            },
            e2: {
                type: "phys",
                spell: true,
                child: ["f2Var"]
            },
            f2Var: {
                link: "bonusattackdamage",
                coeff: 1.2
            },
        }
    },
    Hecarim: {
        buffs: [{
                spell: 2,
                key: "f1Buff",
                type: "multiMoveSpeed"
            },
            {
                spell: "P",
                key: "p1",
                type: "attackdamage"
            }
        ],
        sInfoP: {
            p1: {
                info: "AttackDamage",
                child: ["p1Var"]
            },
            p1Var: {
                link: "bonusmovespeed",
                coeff: 0.15
            }
        },
        sInfo0: {
            e1: {
                type: "phys",
                spell: true,
                child: ["f1"]
            }
        },
        sInfo1: {
            e2: {
                type: "mag",
                spell: true,
                child: ["a1"],
                ticks: 4,
                duration: 4,
                multiplier: 25
            },
            e4: {
                type: "heal",
                selfHeal: true
            }
        },
        sInfo2: {
            input: {
                type: "number",
                max: "75"
            },
            f1Buff: {
                child: ["f1Var"]
            },
            f1Var: {
                inputId: "2",
                link: "input",
                coeff: 1
            },
            e4: {
                type: "phys",
                child: ["a1"],
                basicAttack: true
            },
            e3: {
                type: "phys",
                child: ["a2"],
                basicAttack: true
            }
        },
        sInfo3: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        }
    },
    Heimerdinger: {
        buffs: [{
            spell: "P",
            key: "p1",
            type: "percentmoveSpeed",
            active: true
        }, ],
        sInfoP: {
            active: true,
            p1: {
                info: "PercentMovementSpeedMod",
                value: 20
            }
        },
        sInfo0: {
            e1: {
                type: "mag",
                child: ["a1"]
            },
            e2: {
                type: "mag",
                child: ["a2"]
            },
            f1: {
                child: ["f1Var"]
            },
            f1Var: {
                coeff: 20,
                link: "@cooldownchampion"
            },
            f4: {
                value: 125,
                child: ["f4Var", "f2Var"]
            },
            f4Var: {
                coeff: 25,
                link: "champLevel"
            },
            f2Var: {
                coeff: [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.085, 0.12, 0.155, 0.19, 0.225, 0.26, 0.295, 0.33, 0.365, 0.4],
                link: "spelldamage"
            }
        },
        sInfo1: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            },
            e2: {
                type: "mag",
                spell: true,
                child: ["a2"]
            },
            e6: {
                type: "mag",
                spell: true
            }
        },
        sInfo2: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo3: {
            e7: {
                type: "mag",
                child: ["a2"]
            },
            e1: {
                type: "mag",
                child: ["a1"]
            },
            e8: {
                type: "mag",
                spell: true,
                child: ["f1Var"]
            },
            f1Var: {
                link: "spelldamage",
                coeff: 0.45
            },
            e5: {
                type: "mag",
                spell: true,
                child: ["f2Var"]
            },
            f2Var: {
                link: "spelldamage",
                coeff: 1.83
            },
            e0: {
                type: "mag",
                spell: true,
                child: ["f4Var"]
            },
            f4Var: {
                link: "spelldamage",
                coeff: 0.75
            },
        }
    },
    Illaoi: {
        sInfoP: {
            p1: {
                info: "Damage",
                type: "phys",
                child: ["p1Var", "p1Var2"]
            },
            p1Var: {
                link: "champLevel",
                coeff: 10
            },
            p1Var2: {
                link: "attackdamage",
                coeff: 1.2
            }
        },
        sInfo0: {
            f1: {
                type: "phys",
                child: ["f1Var", "f1Var2"],
                multiplier: [110, 115, 120, 125, 130]
            },
            f1Var: {
                coeff: 10,
                link: "champLevel"
            },
            f1Var2: {
                coeff: 1.2,
                link: "attackdamage"
            }
        },
        sInfo1: {
            f1: {
                value: [3, 3.5, 4, 4.5, 5],
                type: "phys",
                spell: true,
                child: ["f1Var"],
                apply: "maxHp"
            },
            f1Var: {
                link: "attackdamage",
                coeff: 0.02
            },
            f2: {
                value: 2
            }
        },
        sInfo2: {
            e1: {
                child: ["f5Var"]
            },
            f5Var: {
                link: "attackdamage",
                coeff: 0.08
            },
            f1: {
                value: [5, 5, 5, 5, 5, 5, 4, 4, 4, 4, 4, 4, 3, 3, 3, 3, 3, 3, ]
            }
        },
        sInfo3: {
            e2: {
                type: "phys",
                spell: true,
                child: ["a1"]
            }
        }
    },
    Irelia: {
        buffs: [{
                spell: 1,
                key: "e1",
                type: "dmgReduction",
                active: true
            },
            {
                spell: "P",
                key: "p4",
                type: "attackSpeed",
                active: true
            }
        ],
        sInfoP: {
            active: true,
            p0: {
                info: "magicDamage",
                myInfo: "[X1]",
                type: "mag",
                valuePerLvl: [4,4.8,5.5,6.3,7.1,7.8,8.6,9.4,10.1,10.9,11.6,12.4,13.2,13.9,14.7,15.5,16.2,17],
                child: ["p0Var"]
            },
            p0Var: {
                link: "bonusattackdamage",
                coeff: 0.04
            },
            p1: {
                info: "magicDamage",
                myInfo: "[X4]",
                type: "mag",
                valuePerLvl: [16,19.1,22.1,25.2,28.2,31.3,34.4,37.4,40.5,43.5,46.6,49.6,52.7,55.8,588,61.9,64.9,68],
                child: ["p0Var"],
            },
            p1Var: {
                link: "bonusattackdamage",
                coeff: 0.16
            },
            p3: {
                info: "magicDamage",
                myInfo: "[X4] Shields",
                type: "mag",
                valuePerLvl: [32,38.1,44.2,50.4,56.5,62.6,68.7,74.8,80.9,87.1,93.2,99.3,105.4,111.5,117.6,123.8,129.9,136],
                child: ["p3Var"]
            },
            p3Var: {
                link: "bonusattackdamage",
                coeff: 0.32
            },
            p4: {
                info: "PercentAttackSpeedMod",
                valuePerLvl: [30, 30, 30, 30, 30, 30, 40, 40, 40, 40, 40, 40, 50, 50, 50, 50, 50, 50]
            }
        },
        sInfo0: {
            championdamage: {
                value: [5, 25, 45, 65, 85],
                type: "phys",
                spell: true,
                onHit: 1,
                child: ["f2Var"]
            },
            f2Var: {
                link: "attackdamage",
                coeff: 0.6
            },
            healamount: {
                type: "heal",
                child: ["f1Var"]
            },
            f1Var: {
                link: "attackdamage",
                coeff: [0.12, 0.14, 0.16, 0.18, 0.2]
            }
        },
        sInfo1: {
            active: true,
            finaldr: {
                value: 50,
                child: ["f1Var"]
            },
            f1Var: {
                link: "spelldamage",
                coeff: 0.07
            },
            mindamagecalc: {
                value: [10, 25, 40, 55, 70],
                type: "phys",
                spell: true,
                child: ["f2Var", "f3Var"]
            },
            f2Var: {
                link: "attackdamage",
                coeff: 0.05
            },
            f3Var: {
                link: "spelldamage",
                coeff: 0.04
            },
            maxdamagecalc: {
                value: [10, 25, 40, 55, 70],
                type: "phys",
                spell: true,
                child: ["f2Var", "f3Var"],
                multiplier: 200
            },
            chargetimeformax: {
                value: 1.5
            }
        },
        sInfo2: {
            stunduration: {
                value: 0.75
            },
            markduration: {
                value: 5
            },
            totaldamage: {
                value: [70, 110, 150, 190, 230],
                type: "mag",
                spell: true,
                child: ["f1Var"]
            },
            f1Var: {
                link: "spelldamage",
                coeff: 0.08
            },
        },
        sInfo3: {
            missiledamage: {
                value: [125, 225, 325],
                type: "mag",
                spell: true,
                child: ["f1Var"]
            },
            f1Var: {
                link: "spelldamage",
                coeff: 0.7
            },
            zonedamage: {
                value: [75, 125, 175],
                type: "mag",
                spell: true,
                child: ["f1Var"]
            },
            markduration: {
                value: 5
            },
            zoneduration: {
                value: [2.5, 3, 3.5]
            },
            slowamount: {
                value: 60
            },
            ccduration: {
                value: 1.5
            }
        }
    },
    Ivern: { //find out how much the health cost of passive is, wiki might be incorrect
        sInfoP: {
            //p1: {info: ["Health","Cost"], valuePerLvl: [147,156,167,177,185,193,199,205,209,212,213,213,212,209,203,194,188,176]},
            //p2: {info: ["Mana","Cost"], valuePerLvl: [149,156,162,167,172,176,178,180,180,179,176,172,167,159,150,139,126,111]}
        },
        sInfo0: {
            e5: {
                type: "mag",
                spell: true,
                child: ["f1Var"]
            },
            f1Var: {
                link: "spelldamage",
                coeff: 0.7
            }
        },
        sInfo1: {
            e5: {
                type: "mag",
                child: ["f2Var"]
            },
            f2Var: {
                link: "spelldamage",
                coeff: 0.3
            }
        },
        sInfo2: {
            e1: {
                type: "shield",
                child: ["f3Var"]
            },
            f3Var: {
                link: "spelldamage",
                coeff: 0.8
            },
            e2: {
                type: "mag",
                spell: true,
                child: ["f4Var"]
            },
            f4Var: {
                link: "spelldamage",
                coeff: 0.8
            }
        },
        sInfo3: {
            f6: {
                value: 60
            },
            e1: {
                child: ["f1Var"]
            },
            f1Var: {
                link: "spelldamage",
                coeff: 0.5
            },
            e2: {
                child: ["f2Var"]
            },
            f2Var: {
                link: "spelldamage",
                coeff: 0.05
            },
            f4: {
                value: [70, 100, 170],
                child: ["f3Var"]
            },
            f3Var: {
                link: "spelldamage",
                coeff: 0.3
            }
        }
    },
    Janna: {
        buffs: [{
                spell: "P",
                key: "p1",
                type: "percentmoveSpeed"
            },
            {
                spell: 1,
                key: "e1",
                type: "percentmoveSpeed"
            },
            {
                spell: 2,
                key: "e2",
                type: "attackdamage",
                active: true
            }
        ],
        sInfoP: {
            p1: {
                info: "PercentMovementSpeedMod",
                value: 8
            },
            p2: {
                info: "magicDamage",
                type: "mag",
                child: ["p2Var"]
            },
            p2Var: {
                link: "bonusmovespeed",
                coeff: [0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.35, 0.35, 0.35, 0.35, 0.35, 0.35]
            },
        },
        sInfo0: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            },
            e2: {
                type: "mag",
                child: ["a2"]
            }
        },
        sInfo1: {
            e1: {
                child: ["f1Var"]
            },
            f1Var: {
                link: "spelldamage",
                coeff: 0.02
            },
            e2: {
                type: "mag",
                spell: true,
                child: ["a1"]
            },
            e3: {
                child: ["f2Var"]
            },
            f2Var: {
                link: "spelldamage",
                coeff: 0.06
            }
        },
        sInfo2: {
            active: true,
            e1: {
                type: "shield",
                child: ["a1"]
            },
            e2: {
                child: ["a2"]
            }
        },
        sInfo3: {
            e1: {
                type: "heal",
                child: ["a1"]
            }
        }
    },
    JarvanIV: {
        debuff: [{
            name: "PercentArmorPen",
            value: [0, 0.1, 0.14, 0.18, 0.22, 0.26],
            img: "spell/JarvanIVDragonStrike.png"
        }],
        sInfoP: {
            p0: {
                info: "Damage",
                myInfo: "[Minimum]",
                type: "phys",
                value: 20
            },
            p1: {
                info: "Damage",
                apply: "currHp",
                type: "phys",
                value: 8
            },
            p2: {
                info: ["spells_target_1", "Cooldown"],
                valuePerLvl: [10, 10, 10, 10, 10, 10, 8, 8, 8, 8, 8, 8, 6, 6, 6, 6, 6, 6]
            }
        },
        sInfo0: {
            e1: {
                type: "phys",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo1: {
            e1: {
                type: "shield",
                selfShield: true,
                child: ["f1Var"]
            },
            f1Var: {
                link: "maxHp",
                coeff: [0.02, 0.0225, 0.025, 0.0275, 0.03]
            }
        },
        sInfo2: {
            e2: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo3: {
            e1: {
                type: "phys",
                spell: true,
                child: ["a1"]
            }
        }
    },
    Jax: {
        buffs: [{
                spell: 3,
                key: "f2",
                type: "armor",
                active: true
            },
            {
                spell: 3,
                key: "f1",
                type: "mr",
                active: true
            },
            {
                spell: "P",
                key: "p1",
                type: "attackSpeed"
            },
        ],
        sInfoP: {
            input: {
                type: "number",
                max: "8"
            },
            p1: {
                info: "PercentAttackSpeedMod",
                child: ["p1Var"]
            },
            p1Var: {
                inputId: "P",
                link: "input",
                coeff: [3.5, 3.5, 3.5, 5, 5, 5, 6.5, 6.5, 6.5, 8, 8, 8, 9.5, 9.5, 9.5, 11, 11, 11]
            }
        },
        sInfo0: {
            e1: {
                type: "phys",
                spell: true,
                child: ["a1", "f1"]
            }
        },
        sInfo1: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo2: {
            e1: {
                type: "phys",
                spell: true,
                child: ["f2"]
            }
        },
        sInfo3: {
            active: true,
            e1: {
                type: "mag",
                child: ["a1"],
                basicAttack: true,
                dps: 3
            },
            f2: {
                effectNo: 3,
                type: "armor",
                child: ["f2Var"]
            },
            f2Var: {
                link: "bonusattackdamage",
                coeff: 0.5
            },
            f1: {
                effectNo: 3,
                type: "mr",
                child: ["f1Var"]
            },
            f1Var: {
                link: "spelldamage",
                coeff: 0.2
            }
        }
    },
    Jayce: { //missing other stance[added english]
        buffs: [{
                spell: "P",
                key: "p1",
                type: "flatmoveSpeed",
                active: true
            },
            {
                spell: 2,
                key: "f1",
                type: "percentmoveSpeed",
                active: true
            },
            {
                spell: 3,
                key: "f1",
                type: "armor",
                active: true
            },
            {
                spell: 3,
                key: "f1",
                type: "mr",
                active: true
            },
        ],
        debuff: [{
            name: "PercentArmorMagPen",
            value: [0, 0.1, 0.15, 0.2, 0.25],
            img: "spell/JayceStanceHtG.png"
        }],
        sInfoP: {
            active: true,
            p1: {
                info: "Movement",
                value: 40
            }
        },
        sInfo0: {
            txt: "<hr>Fires an orb of electricity that detonates upon hitting an enemy or reaching the end of its path dealing {{ f1 }}.<br>If Shock Blast is fired through the gate the orb's speed and range will be increased, and its damage will increase by 40% ({{ f2 }}).",
            e1: {
                type: "phys",
                spell: true,
                child: ["a1"]
            },
            f1: {
                value: [70, 120, 170, 220, 270, 320],
                type: "phys",
                spell: true,
                child: ["a1"]
            },
            f2: {
                value: [70, 120, 170, 220, 270, 320],
                type: "phys",
                multiplier: 140,
                spell: true,
                child: ["a1"]
            }
        },
        sInfo1: {
            txt: "<hr>Gains a burst of energy increasing Attack Speed to maximum for 3 attacks. These attacks deal {{ f1 }} damage",
            e4: {
                type: "mag",
                spell: true,
                child: ["a1"],
                ticks: 4,
                duration: 4,
                multiplier: 25
            },
            f1: {
                type: "phys",
                child: ["f1Var"],
                onHit: 1,
                crit: [100]
            },
            f1Var: {
                link: "attackdamage",
                coeff: [0.7, 0.78, 0.86, 0.94, 1.02, 1.1]
            }
        },
        sInfo2: {
            active: true,
            txt: "<hr>Deploys an Acceleration Gate for 4 seconds increasing the Movement Speed of all allied champions who pass through it by {{ f1 }} for 3 seconds (this bonus fades over the duration).",
            f1: {
                value: [30, 35, 40, 45, 50, 55]
            },
            e4: {
                type: "mag",
                spell: true,
                apply: "maxHp"
            },
            a1: {
                type: "mag",
                child: ["a1"]
            }
        },
        sInfo3: {
            active: true,
            txt: "<hr>Transforms the Mercury Cannon into the Mercury Hammer gaining new abilities and {{ f1 }} Armor and Magic Resist.<br>The next attack in Hammer Stance deals an additional {{ f2 }} magic damage",
            f1: {
                valuePerLvl: [5, 5, 5, 5, 5, 15, 15, 15, 15, 15, 25, 25, 25, 25, 25, 35, 35, 35]
            },
            f2: {
                valuePerLvl: [25, 25, 25, 25, 25, 65, 65, 65, 65, 65, 105, 105, 105, 105, 105, 145, 145, 145],
                type: "mag",
                child: ["f2Var"]
            },
            f2Var: {
                link: "bonusattackdamage",
                coeff: 0.25
            },
            f3: {
                valuePerLvl: [10, 10, 10, 10, 10, 15, 15, 15, 15, 15, 20, 20, 20, 20, 20, 25, 25, 25, ]
            }
        }
    },
    Jhin: {
        buffs: [{
            spell: "P",
            key: "p2",
            type: "attackdamage"
        }],
        sInfoP: {
            p1: {
                info: "PercentMovementSpeedMod",
                value: 10,
                child: ["p1Var"]
            },
            p1Var: {
                link: "bonusattackspeed",
                coeff: 0.4
            },
            p2: {
                info: "AttackDamage",
                child: ["p2Var", "p2Var2"]
            },
            p2Var: {
                link: "attackdamage",
                coeff: [0.04, 0.05, 0.06, 0.07, 0.08, 0.09, 0.1, 0.11, 0.12, 0.14, 0.16, 0.2, 0.24, 0.28, 0.32, 0.36, 0.4, 0.44]
            },
            p2Var2: {
                link: "jhinPassive",
                coeff: 1
            },
            p3: {
                info: "Damage",
                myInfo: " [4]",
                type: "phys",
                apply: "missHp",
                valuePerLvl: [15, 15, 15, 15, 15, 20, 20, 20, 20, 20, 25, 25, 25, 25, 25, 25, 25, 25]
            },
        },
        sInfo0: {
            e1: {
                type: "phys",
                spell: true,
                child: ["a1", "f1Var"]
            },
            f1Var: {
                link: "attackdamage",
                coeff: [0.4, 0.475, 0.55, 0.625, 0.7]
            }
        },
        sInfo1: {
            e1: {
                type: "phys",
                spell: true,
                child: ["a1"]
            }
        },

        sInfo2: {
            e2: {
                type: "mag",
                spell: true,
                child: ["a1", "a2"]
            },
            f1: {
                child: ["f1Var"]
            },
            f1Var: {
                coeff: [28, 27, 26, 25, 24],
                link: "@cooldownchampion"
            }
        },
        sInfo3: {
            e1: {
                type: "phys",
                spell: true,
                child: ["a1"]
            },
            f2: {
                effectNo: 1,
                type: "phys",
                spell: true,
                child: ["a1"],
                multiplier: 350
            },
            f1: {
                value: 100
            },
        }

    },
    Jinx: { //add q basic attack buff and atkspd debuff, passive atkspd stacks indefinitely, add total q damage
        staticCd: true,
        buffs: [{
                spell: "P",
                key: "p1",
                type: "percentmoveSpeed",
                active: true
            },
            {
                spell: "P",
                key: "p2",
                type: "attackSpeed",
                active: true
            },
            {
                spell: "P",
                key: "p2",
                type: "uncapAtkSpd",
                active: true
            }, //key is placeholder
            {
                spell: 0,
                key: "f1",
                type: "attackSpeed"
            }
        ],
        sInfoP: {
            active: true,
            //input: {type: "number", max: "255"},
            p1: {
                info: "PercentMovementSpeedMod",
                value: 175
            },
            p2: {
                info: "PercentAttackSpeedMod",
                value: 15
            }
        },
        sInfo0: {
            //active: true,
            input: {
                type: "number",
                max: "3"
            },
            f4: {
                value: [30, 55, 80, 105, 130]
            },
            f1: {
                child: ["f1Var", "f1Var2"]
            },
            f1Var: {
                inputId: "0",
                link: "input",
                coeff: [10, 20, 13, 17, 23]
            },
            f1Var2: {
                inputId: "0",
                link: "input",
                coeff: [0, 1, 1, 2, 3, 3, 5, 7, 8, 10, 12, 13, 15, 17, 18, 20, 22, 23]
            }
        },
        sInfo1: {
            e1: {
                type: "phys",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo2: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo3: {
            e1: {
                type: "phys",
                spell: true,
                child: ["a1"]
            },
            e2: {
                type: "phys",
                spell: true,
                child: ["a2"]
            },
            e3: {
                type: "phys",
                apply: "missHp"
            }
        }
    },
    Kaisa: {
        buffs: [{
            spell: "2",
            key: "e5",
            type: "attackSpeed",
            active: true
        }, ],
        sInfoP: {
            p0: {
                info: "magicDamage",
                myInfo: "[X0]",
                type: "mag",
                valuePerLvl: [4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 8, 8, 8, 9, 9, 9, 10, 10],
                child: ["p0Var"]
            },
            p0Var: {
                link: "spelldamage",
                coeff: 0.1
            },
            p1: {
                info: "magicDamage",
                myInfo: "[X1]",
                type: "mag",
                valuePerLvl: [5, 5, 6, 7, 7, 8, 8, 9, 10, 10, 11, 12, 12, 13, 13, 14, 15, 15],
                child: ["p1Var"]
            },
            p1Var: {
                link: "spelldamage",
                coeff: 0.125
            },
            p2: {
                info: "magicDamage",
                myInfo: "[X2]",
                type: "mag",
                valuePerLvl: [6, 6, 7, 9, 9, 10, 10, 12, 13, 13, 14, 16, 16, 17, 17, 19, 20, 20],
                child: ["p2Var"]
            },
            p2Var: {
                link: "spelldamage",
                coeff: 0.15
            },
            p3: {
                info: "magicDamage",
                myInfo: "[X3]",
                type: "mag",
                valuePerLvl: [7, 7, 8, 11, 11, 12, 12, 15, 16, 16, 17, 20, 20, 21, 21, 24, 25, 25],
                child: ["p3Var"]
            },
            p3Var: {
                link: "spelldamage",
                coeff: 0.175
            },
            p4: {
                info: "magicDamage",
                myInfo: "[X4]",
                type: "mag",
                valuePerLvl: [8, 8, 9, 13, 13, 14, 14, 18, 19, 19, 20, 24, 24, 25, 25, 29, 30, 30],
                child: ["p4Var"]
            },
            p4Var: {
                link: "spelldamage",
                coeff: 0.2
            },
            p5: {
                info: "magicDamage",
                myInfo: "[Detonate DMG]",
                type: "mag",
                valuePerLvl: [15, 15, 15, 16, 16, 16, 17, 17, 17, 18, 18, 18, 19, 19, 19, 20, 20, 20],
                apply: "missHp",
                child: ["p5Var"]
            },
            p5Var: {
                link: "spelldamage",
                coeff: 0.0375
            }
        },
        sInfo0: {
            e1: {
                type: "phys",
                child: ["f1Var", "f7Var"],
                spell: true
            },
            f1Var: {
                link: "bonusattackdamage",
                coeff: 0.35
            },
            f7Var: {
                link: "spelldamage",
                coeff: 0.4
            },
            f3: {
                effectNo: 1,
                type: "phys",
                child: ["f1Var", "f7Var"],
                ticks: 6,
                tickMulti: 0.3,
                spell: true
            },
            f5: {
                child: ["f5Var"]
            },
            f5Var: {
                link: "bonusattackdamage",
                coeff: 1
            },
            txt: "<br><br>x12: {{ f9 }}",
            f9: {
                effectNo: 1,
                type: "phys",
                child: ["f1Var", "f7Var"],
                ticks: 10,
                tickMulti: 0.3,
                spell: true
            }
        },
        sInfo1: {
            e1: {
                type: "mag",
                valuePerLvl: [9, 10, 11, 12, 13, 14, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
                child: ["f1Var", "f2Var"]
            },
            f1Var: {
                link: "attackdamage",
                coeff: 1.5
            },
            f2Var: {
                link: "spelldamage",
                coeff: 1.16
            },
            e1a: {
                type: "mag",
                value: 14,
                child: ["f1Var", "f5Var"],
                valuePerLvl: [13, 16, 18, 21, 23, 26, 28, 30, 33, 35, 38, 40, 43, 45, 48, 50, 53, 55],
                spell: true
            },
            f5Var: {
                link: "spelldamage",
                coeff: 1.37
            },
            f3: {
                child: ["f3Var"]
            },
            f3Var: {
                link: "spelldamage",
                coeff: 1
            }
        },
        sInfo2: {
            active: true,
            f1: {
                value: 1.2,
                kaisaE: true
            },
            f2: {
                child: ["f2Var"]
            },
            f2Var: {
                link: "bonusattackspeed",
                coeff: 1
            },
            f4: {
                value: [55, 60, 65, 70, 75],
                kaisaMulti: true
            }
        },
        sInfo3: {
            e1: {
                type: "shield",
                selfShield: true,
                child: ["f1Var", "f2Var"]
            },
            f1Var: {
                link: "attackdamage",
                coeff: [1, 1.5, 2]
            },
            f2Var: {
                link: "spelldamage",
                coeff: 0.75
            },
        }
    },
    Kalista: { //recharge time on w cooldown based, additional spear damage after the first
        buffs: [{
            spell: 1,
            key: "e8",
            type: "attackdamage",
            active: true
        }],
        sInfo0: {
            e1: {
                type: "phys",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo1: {
            active: true,
            e2: {
                type: "mag",
                apply: "maxHp"
            }
        },
        sInfo2: {
            e1: {
                type: "phys",
                spell: true,
                child: ["a1"]
            }
        }
    },
    Karma: {
        buffs: [{
            spell: 2,
            key: "e3",
            type: "percentmoveSpeed",
            active: true
        }],
        sInfo0: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            },
            f1: {
                valuePair: [3, "f1Q"],
                type: "mag",
                spell: true,
                child: ["a2"]
            },
            f2: {
                valuePair: [3, "f2Q"],
                type: "mag",
                spell: true,
                child: ["a1"]
            },
            f3: {
                value: 50
            }
        },
        sInfo1: {
            effect1amount: {
                effectNo: 1,
                type: "mag",
                spell: true,
                child: ["f4Var"],
                multiplier: 50
            },
            f4Var: {
                link: "spelldamage",
                coeff: 0.45
            },
            f1: {
                value: 20,
                type: "heal",
                selfHeal: true,
                missHp: true,
                child: ["f3Var"]
            },
            f3Var: {
                link: "spelldamage",
                coeff: 0.01
            },
            f2: {
                valuePair: [3, "f2W"]
            }
        },
        sInfo2: {
            active: true,
            e1: {
                type: "shield",
                child: ["a1"]
            },
            f1: {
                valuePair: [3, "f1E"],
                type: "shield",
                child: ["a2"]
            },
            f2: {
                value: 30
            },
            f3: {
                effectNo: 3
            }
        },
        sInfo3: {
            f1Q: {
                value: [25, 25, 75, 125, 175]
            },
            f2Q: {
                value: [35, 35, 140, 245, 350]
            },
            f2W: {
                value: [0.5, 0.5, 0.75, 1, 1.25]
            },
            f1E: {
                value: [30, 30, 90, 150, 210]
            }
        }
    },
    Karthus: {
        debuff: [{
            name: "PercentMagPen",
            value: 0.15,
            img: "spell/KarthusWallOfPain.png"
        }],
        sInfo0: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo2: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo3: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        }
    },
    Kassadin: {
        buffs: [{
            spell: "P",
            key: "p1",
            type: "magDmgReduction"
        }],
        sInfoP: {
            p1: {
                value: 15
            },
        },
        sInfo0: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            },
            e3: {
                type: "shield",
                child: ["a2"]
            }
        },
        sInfo1: {
            e2: {
                type: "mag",
                child: ["a1"],
                dps: 1
            },
            e3: {
                type: "mag",
                spell: true,
                child: ["a2"]
            }
        },
        sInfo2: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo3: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1", "f2Var"]
            },
            f2Var: {
                coeff: 0.02,
                link: "mana"
            },
            e3: {
                type: "mag",
                child: ["f1Var", "f3Var"]
            },
            f1Var: {
                coeff: 0.1,
                link: "spelldamage"
            },
            f3Var: {
                coeff: 0.01,
                link: "mana"
            },
        }
    },
    Katarina: {
        buffs: [{
            spell: 1,
            key: "e4",
            type: "percentmoveSpeed",
            active: true
        }],
        sInfoP: {
            p1: {
                info: ["Magic", "Damage"],
                type: "mag",
                spell: true,
                child: ["p1Var", "p1Var2"],
                valuePerLvl: [68, 72, 77, 82, 89, 96, 103, 112, 121, 131, 142, 154, 166, 180, 194, 208, 224, 240]
            },
            p1Var: {
                link: "bonusattackdamage",
                coeff: 1
            },
            p1Var2: {
                link: "spelldamage",
                coeff: [0.55, 0.55, 0.55, 0.55, 0.55, 0.7, 0.7, 0.7, 0.7, 0.7, 0.85, 0.85, 0.85, 0.85, 0.85, 1, 1, 1]
            },
            p2: {
                info: "rPercentCooldownMod",
                myInfo: "[R]",
                valuePerLvl: [78, 78, 78, 78, 78, 84, 84, 84, 84, 84, 90, 90, 90, 90, 90, 96, 96, 96]
            }
        },
        sInfo0: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo1: {
            active: true
        },
        sInfo2: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1", "a2"]
            }
        },
        sInfo3: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1", "a2"]
            },
            f1: {
                effectNo: 1,
                type: "mag",
                spell: true,
                child: ["a1", "a2"],
                ticks: 15,
                duration: 2.5
            },
        }
    },
    Kayle: {
        aSpdBonus: 0.1,
        buffs: [{
            spell: 1,
            key: "e2",
            type: "percentmoveSpeed",
            active: true
        }],
        debuff: [{
            name: "PercentArmorMagPen",
            value: [0, 0.03, 0.06, 0.09, 0.12, 0.15],
            img: "passive/Kayle_Passive.png"
        }],
        sInfo0: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1", "a2"]
            }
        },
        sInfo1: {
            active: true,
            e2: {
                child: ["a2"]
            },
            e1: {
                type: "heal",
                child: ["a1"]
            }
        },
        sInfo2: {
            e4: {
                type: "mag",
                child: ["a2"],
                dps: 1
            },
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"],
                basicAttack: true,
                dps: 1
            },
            e1a: {
                type: "mag",
                spell: true,
                child: ["a1", "f2Var"],
                dps: 1
            },
            f2Var: {
                coeff: [0.2, 0.25, 0.3, 0.35, 0.4],
                link: "attackdamage"
            }
        }
    },
    Kayn: { //spell0 var incorrect, passive buff onhits etc?
        /*buffs: [
            {spell: "P", key: "p1", type: "kaynShadowPassive", active: true},
        ],*/
        sInfoP: {
            active: true,
            p1: {
                info: ["Assassin", "Magic", "Damage"],
                myInfo: "%",
                valuePerLvl: [12, 14, 16, 18, 20, 21, 23, 25, 27, 29, 31, 33, 35, 37, 39, 40, 42, 44]
            }
        },
        sInfo0: {
            e1: {
                type: "phys",
                spell: true,
                child: ["a1Var"]
            },
            a1Var: {
                coeff: 0.65,
                link: "bonusattackdamage"
            }
        },
        sInfo1: {
            e1: {
                type: "phys",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo2: {
            e7: {
                type: "heal",
                selfHeal: true,
                child: ["a1"]
            }
        },
        sInfo3: {
            e1: {
                type: "phys",
                spell: true,
                child: ["a1"]
            },
        }
    },
    Kennen: {
        buffs: [{
                spell: 2,
                key: "defenses",
                type: "armor",
                active: true
            },
            {
                spell: 2,
                key: "defenses",
                type: "mr",
                active: true
            },
            {
                spell: 2,
                key: "movement speed",
                type: "multiMoveSpeed",
                active: true
            },
        ],
        sInfo0: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo1: {
            e2: {
                type: "mag",
                spell: true,
                child: ["a2", "f1Var"],
                basicAttack: true,
                dps: 5
            },
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            },
            f1Var: {
                coeff: [0.6, 0.7, 0.8, 0.9, 1],
                link: "bonusattackdamage"
            }
        },
        sInfo2: {
            active: true,
            "base damage": {
                effectNo: 1,
                type: "mag",
                spell: true,
                child: ["a1"]
            },
            "duration - as ball": {
                effectNo: 5
            },
            "defenses": {
                effectNo: 3
            },
            "movement speed": {
                value: 100
            }, //effect 4 * 100
            "energy refund": {
                effectNo: 2
            },
            "attack speed": {
                value: [30, 40, 50, 60, 70]
            }, //effect 6 * 100
            "damage to minions": {
                value: 50
            }
        },
        sInfo3: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            },
        }
    },
    Khazix: {
        buffs: [{
            spell: 3,
            key: "e3",
            type: "percentmoveSpeed",
            active: true
        }],
        sInfoP: {
            p1: {
                info: "Damage",
                type: "mag",
                value: 6,
                child: ["p1Var", "p1Var2"]
            },
            p1Var: {
                link: "champLevel",
                coeff: 8
            },
            p1Var2: {
                link: "bonusattackdamage",
                coeff: 0.2
            },
            p2: {
                info: "Slow",
                myInfo: "%",
                value: 25
            }
        },
        sInfo0: {
            e1: {
                type: "phys",
                spell: true,
                child: ["a1"]
            },
            f1: {
                effectNo: 1,
                type: "phys",
                spell: true,
                child: ["a1"],
                multiplier: 165
            }
        },
        sInfo1: {
            e1: {
                type: "phys",
                spell: true,
                child: ["a1"]
            },
            e2: {
                type: "heal",
                selfHeal: true,
                child: ["a2"]
            }
        },
        sInfo2: {
            e1: {
                type: "phys",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo3: {
            active: true,
            f1: {
                value: 3
            },
            f1a: {
                value: 10
            }
        }
    },
    Kindred: {
        buffs: [{
            spell: 0,
            key: "f2",
            type: "attackSpeed",
            active: true
        }],
        sInfoP: {
            input: {
                type: "number",
                max: "9999"
            },
            p1: {
                info: "PercentAttackSpeedMod",
                myInfo: "[Q]",
                child: ["p1Var"]
            },
            p1Var: {
                inputId: "P",
                link: "input",
                coeff: 5
            },
            p2: {
                info: "magicDamage",
                myInfo: "[W]",
                type: "mag",
                apply: "currHp",
                child: ["p2Var"]
            },
            p2Var: {
                inputId: "P",
                link: "input",
                coeff: 1
            },
            p3: {
                info: "Damage",
                myInfo: "[E]",
                type: "phys",
                apply: "missHp",
                child: ["p3Var"]
            },
            p3Var: {
                inputId: "P",
                link: "input",
                coeff: 0.5
            },
        },
        sInfo0: {
            active: true,
            e1: {
                type: "phys",
                spell: true,
                child: ["a1"]
            },
            f2: {
                value: 25,
                child: ["f1Var"]
            },
            f1Var: {
                inputId: "P",
                link: "input",
                coeff: 5
            }
        },
        sInfo1: {
            f1: {
                type: "heal",
                value: 32,
                selfHeal: true,
                child: ["f1Var"]
            },
            f1Var: {
                link: "champLevel",
                coeff: 4
            },
            e5: {
                type: "mag",
                dps: 4,
                spell: true,
                child: ["a1"]
            },
            f3: {
                value: 1.5,
                dps: 4,
                type: "mag",
                apply: "currHp",
                child: ["f3Var"]
            },
            f3Var: {
                inputId: "P",
                link: "input",
                coeff: 1
            }
        },
        sInfo2: {
            e1: {
                type: "phys",
                spell: true,
                child: ["a1"],
                crit: [50, true]
            },
            f2: {
                value: 8,
                type: "phys",
                apply: "missHp",
                crit: [50, true],
                child: ["f2Var"]
            },
            f2Var: {
                inputId: "P",
                link: "input",
                coeff: 0.5
            }
        },
        sInfo3: {
            e1: {
                type: "heal"
            }
        }
    },
    Kled: {
        buffs: [{
                spell: 1,
                key: "e2",
                type: "attackSpeed",
                active: true
            },
            {
                spell: 2,
                key: "e5",
                type: "percentmoveSpeed",
                active: true
            },
            {
                spell: "P",
                key: "p1",
                type: "baseHP",
                active: true
            },
            {
                spell: "P",
                key: "p2",
                type: "flatmoveSpeed",
                passiveOnly: true
            },
        ],
        sInfoP: {
            active: true,
            p1: {
                value: 400,
                info: "Health",
                growth: 60
            },
            p2: {
                value: -60
            },
        },
        sInfo0: {
            e1: {
                type: "phys",
                spell: true,
                child: ["a1"]
            },
            e1a: {
                type: "phys",
                spell: true,
                child: ["a1"],
                multiplier: 200
            }
        },
        sInfo1: {
            active: true,
            e4: {
                type: "phys",
                spell: true
            },
            e1: {
                type: "phys",
                spell: true,
                apply: "maxHp",
                child: ["f1Var"]
            },
            f1Var: {
                link: "bonusattackdamage",
                coeff: 0.05
            }
        },
        sInfo2: {
            active: true,
            e1: {
                type: "phys",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo3: {
            e4: {
                type: "shield",
                selfShield: true,
                child: ["a1"]
            },
            f5: {
                value: [12, 15, 18],
                type: "phys",
                spell: true,
                apply: "maxHp",
                child: ["f1Var"]
            },
            f1Var: {
                link: "bonusattackdamage",
                coeff: 0.12
            },
        }
    },
    KogMaw: {
        buffs: [{
            spell: 0,
            key: "e2",
            type: "attackSpeed"
        }],
        debuff: [{
            name: "PercentArmorMagPen",
            value: [0, 0.20, 0.22, 0.24, 0.26, 0.28],
            img: "spell/KogMawQ.png"
        }],
        sInfoP: {
            p1: {
                info: "Damage",
                type: "tru",
                spell: true,
                value: 100,
                child: ["p1Var"]
            },
            p1Var: {
                link: "champLevel",
                coeff: 25
            }
        },
        sInfo0: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo1: {
            e2: {
                type: "mag",
                apply: "maxHp",
                child: ["f1Var"],
                basicAttack: true,
                dps: 1
            },
            f1Var: {
                coeff: 0.01,
                link: "spelldamage"
            }
        },
        sInfo2: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo3: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1", "a2"]
            },
            effect1amount: {
                effectNo: 1,
                type: "mag",
                spell: true,
                child: ["a1", "a2"],
                multiplier: 150
            },
            f4: {
                effectNo: 1,
                type: "mag",
                spell: true,
                child: ["a1", "a2"],
                multiplier: 200
            }
        }
    },
    Leblanc: {
        sInfo0: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            },
            e2: {
                type: "mag",
                spell: true,
                child: ["a2"]
            }
        },
        sInfo1: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo2: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            },
            e2: {
                type: "mag",
                spell: true,
                child: ["a2"]
            }
        },
        sInfo3: {
            "f1.0": {
                value: [70, 140, 210],
                type: "mag",
                spell: true,
                child: ["f2Var"]
            },
            f2Var: {
                link: "spelldamage",
                coeff: 0.4
            },
            "f3.0": {
                value: [140, 280, 420],
                type: "mag",
                spell: true,
                child: ["f4Var"]
            },
            f4Var: {
                link: "spelldamage",
                coeff: 0.8
            },
            "f5.0": {
                value: [150, 300, 450],
                type: "mag",
                spell: true,
                child: ["f6Var"]
            },
            f6Var: {
                link: "spelldamage",
                coeff: 0.75
            }
        }
    },
    LeeSin: { //lifesteal buff
        buffs: [{
            spell: "P",
            key: "p1",
            type: "attackSpeed",
            active: true
        }, ],
        sInfoP: {
            active: true,
            p1: {
                info: "AttackSpeed",
                value: 40
            }
        },
        sInfo0: {
            e1: {
                type: "phys",
                spell: true,
                child: ["a1"]
            },
            e2: {
                type: "phys",
                spell: true,
                child: ["a1"]
            },
            e3: {
                type: "phys",
                spell: true,
                child: ["a2"]
            }
        },
        sInfo1: {
            e1: {
                type: "shield",
                child: ["a1"]
            }
        },
        sInfo2: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo3: {
            e1: {
                type: "phys",
                spell: true,
                child: ["a1"]
            }
        }
    },
    Leona: {
        buffs: [{
                spell: 1,
                key: "e4",
                type: "armor",
                active: true
            },
            {
                spell: 1,
                key: "e2",
                type: "mr",
                active: true
            },
        ],
        sInfoP: {
            p1: {
                info: "magicDamage",
                value: 18,
                type: "mag",
                spell: true,
                child: ["p1Var"]
            },
            p1Var: {
                link: "champLevel",
                coeff: 7
            }
        },
        sInfo0: {
            e2: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo1: {
            active: true,
            e4: {
                type: "armor",
                child: ["f1Var"]
            },
            e2: {
                type: "mr",
                child: ["f2Var"]
            },
            f1Var: {
                link: "bonusarmor",
                coeff: 0.2
            },
            f2Var: {
                link: "bonusmr",
                coeff: 0.2
            },
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo2: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo3: {
            e4: {
                type: "mag",
                spell: true,
                child: ["a1"]
            },
            e3: {
                type: "mag",
                child: ["a2"]
            }
        }
    },
    Lissandra: {
        sInfo0: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo1: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo2: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo3: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            },
            e6: {
                type: "heal",
                selfHeal: true,
                child: ["a2"]
            }
        }
    },
    Lucian: {
        buffs: [{
            spell: 1,
            key: "e2",
            type: "flatmoveSpeed",
            active: true
        }, ],
        sInfoP: {
            p1: {
                info: "Damage",
                myInfo: "[2]",
                type: "phys",
                onHit: 1,
                basicAttack: true,
                crit: [75],
                child: ["p1Var"]
            },
            p1Var: {
                link: "attackdamage",
                coeff: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.55, 0.55, 0.55, 0.55, 0.55, 0.55, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6]
            }
        },
        sInfo0: {
            e1: {
                type: "phys",
                spell: true,
                child: ["f1Var"]
            },
            f1Var: {
                link: "bonusattackdamage",
                coeff: [0.6, 0.7, 0.8, 0.9, 1]
            }
        },
        sInfo1: {
            active: true,
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo3: {
            e2: {
                type: "phys",
                spell: true,
                child: ["a1", "a2"]
            }
        }
    },
    Lulu: { //passive can proc spellthiefs up to 3 times
        buffs: [{
            spell: 1,
            key: "e1",
            type: "percentmoveSpeed",
            active: true
        }],
        sInfoP: {
            p1: {
                info: "magicDamage",
                myInfo: "[x1]",
                value: 3,
                type: "mag",
                child: ["p1Var", "p1Var2"],
                dps: 1
            },
            p1Var: {
                link: "champLevel",
                coeff: 2
            },
            p1Var2: {
                link: "spelldamage",
                coeff: 0.05
            },
            p2: {
                info: "magicDamage",
                myInfo: "[x3]",
                value: 3,
                type: "mag",
                child: ["p1Var", "p1Var2"],
                multiplier: 300,
                dps: 1
            },
        },
        sInfo0: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            },
            f4: {
                effectNo: 1,
                type: "mag",
                spell: true,
                child: ["a1"],
                multiplier: 70
            },
            f6: {
                effectNo: 1,
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo1: {
            active: true,
            e1: {
                child: ["a2"]
            }
        },
        sInfo2: {
            e2: {
                type: "shield",
                child: ["a1"]
            },
            e4: {
                type: "mag",
                spell: true,
                child: ["a2"]
            }
        },
        sInfo3: {
            e1: {
                child: ["a1"]
            },
        }
    },
    Lux: {
        aSpdBonus: 0.07,
        sInfoP: {
            p1: {
                info: "magicDamage",
                value: 10,
                spell: true,
                type: "mag",
                child: ["p1Var", "p1Var2"]
            },
            p1Var: {
                link: "champLevel",
                coeff: 10
            },
            p1Var2: {
                link: "spelldamage",
                coeff: 0.2
            },
        },
        sInfo0: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo1: {
            e2: {
                type: "shield",
                child: ["a1"]
            }
        },
        sInfo2: {
            e2: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo3: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        }
    },
    Malphite: {
        aSpdBonus: 0.1,
        buffs: [{
                spell: 1,
                key: "f1",
                type: "armor",
                passiveOnly: true
            },
            {
                spell: 1,
                key: "f3",
                type: "armor",
                active: true
            },
        ],
        debuff: [{
            name: "PercentAtkSpeed",
            value: [0, 0.3, 0.35, 0.4, 0.45, 0.5],
            img: "spell/Landslide.png"
        }],
        sInfoP: {
            p1: {
                info: "Defense",
                type: "shield",
                selfShield: true,
                child: ["p1Var"]
            },
            p1Var: {
                link: "maxHp",
                coeff: 0.1
            }
        },
        sInfo0: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo1: {
            active: true,
            e2: {
                type: "phys",
                child: ["a1", "f2Var"],
                basicAttack: true,
                dps: 1
            },
            f2Var: {
                link: "armor",
                coeff: 0.15
            },
            f1: {
                type: "armor",
                child: ["f1Var"]
            },
            "f4.0": {
                effectNo: 1,
                multiplier: 300
            },
            f3: {
                type: "armor",
                child: ["f1Var"],
                multiplier: 300
            },
            f1Var: {
                link: "armor",
                coeff: [0.1, 0.15, 0.2, 0.25, 0.3]
            }
        },
        sInfo2: {
            e2: {
                type: "mag",
                spell: true,
                child: ["a1", "f1Var"]
            },
            f1Var: {
                link: "armor",
                coeff: 0.4
            }
        },
        sInfo3: {
            e2: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        }
    },
    Malzahar: { //% mana returned on e
        sInfo0: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo1: {
            e2: {
                type: "mag",
                child: ["a1", "a2"]
            }
        },
        sInfo2: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"],
                ticks: 4,
                duration: 4,
                multiplier: 25
            }
        },
        sInfo3: {
            e7: {
                type: "mag",
                spell: true,
                child: ["a2"],
                ticks: 5,
                duration: 2.5,
                multiplier: 20
            },
            e1: {
                type: "mag",
                apply: "maxHp",
                child: ["a1"]
            }
        }
    },
    Maokai: {
        aSpdBonus: 0.153,
        sInfoP: {
            p1: {
                info: ["SpecialRecipeLarge", "HealthRegen"],
                type: "heal",
                selfHeal: true,
                child: ["p1Var"],
                valuePerLvl: [5, 5, 5, 5, 5, 15, 15, 15, 25, 25, 35, 35, 45, 45, 55, 55, 65, 65]
            },
            p1Var: {
                link: "maxHp",
                coeff: [0.06, 0.06, 0.06, 0.06, 0.06, 0.075, 0.075, 0.075, 0.09, 0.09, 0.1, 0.1, 0.11, 0.11, 0.12, 0.12, 0.13, 0.13]
            }
        },
        sInfo0: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo1: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo2: {
            e1: {
                type: "mag",
                spell: true
            },
            f1: {
                value: 30
            },
            f2: {
                value: 30,
                child: ["f2Var"]
            },
            f2Var: {
                link: "maxHp",
                coeff: 0.025
            },
            e8: {
                type: "mag",
                child: ["a1"],
                apply: "maxHp"
            }
        },
        sInfo3: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        }
    },
    MasterYi: { //add ult buff
        aSpdBonus: 0.08,
        buffs: [{
                spell: 1,
                key: "e3",
                type: "dmgReduction",
                active: true
            },
            {
                spell: 2,
                key: "f1",
                type: "attackdamage",
                passiveOnly: true
            }
        ],
        sInfoP: {
            p1: {
                info: "Damage",
                myInfo: "[2]",
                type: "phys",
                onHit: 1,
                basicAttack: true,
                crit: [100],
                child: ["p1Var"],
                dps: 4
            },
            p1Var: {
                link: "attackdamage",
                coeff: 0.5
            }
        },
        sInfo0: {
            e1: {
                type: "phys",
                spell: true,
                child: ["a1"],
                crit: [60]
            }
        },
        sInfo1: {
            active: true,
            e1: {
                type: "heal",
                selfHeal: true,
                child: ["a1"]
            },
            e2: {
                multiplier: 100
            }
        },
        sInfo2: {
            active: true,
            f1: {
                child: ["f1Var"]
            },
            f1Var: {
                link: "attackdamage",
                coeff: 0.1
            },
            e3: {
                type: "tru",
                child: ["f2Var"],
                dps: 1
            },
            f2Var: {
                link: "bonusattackdamage",
                coeff: 0.35
            }
        }
    },
    MissFortune: {
        buffs: [{
                spell: 1,
                key: "e2",
                type: "flatmoveSpeed",
                active: true
            },
            {
                spell: 1,
                key: "e1",
                type: "attackSpeed",
                active: true
            }
        ],
        sInfoP: {
            p1: {
                info: "Damage",
                type: "phys",
                basicAttack: true,
                child: ["p1Var"]
            },
            p1Var: {
                link: "attackdamage",
                coeff: [0.5, 0.5, 0.5, 0.6, 0.6, 0.6, 0.7, 0.7, 0.8, 0.8, 0.9, 0.9, 1, 1, 1, 1, 1, 1]
            }
        },
        sInfo0: {
            e2: {
                type: "phys",
                spell: true,
                child: ["a1", "a2"],
                onHit: 1,
                crit: [100, true]
            },
            f1: {
                value: 100
            },
        },
        sInfo1: {
            active: true
        },
        sInfo2: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"],
                duration: 2,
                ticks: 2,
                multiplier: 50
            }
        },
        sInfo3: {
            f1: {
                type: "phys",
                spell: true,
                child: ["a1", "f1Var"],
                crit: [20]
            },
            f1Var: {
                link: "attackdamage",
                coeff: 0.75
            },
            f3: {
                value: 120
            },
            f2: {
                type: "phys",
                spell: true,
                ticks: [12, 14, 16],
                duration: 3,
                child: ["a1", "f1Var"],
                crit: [20]
            }
        }
    },
    MonkeyKing: {
        buffs: [{
                spell: "P",
                key: "p1",
                type: "armor"
            },
            {
                spell: "P",
                key: "p2",
                type: "mr"
            },
        ],
        debuff: [{
            name: "PercentArmorPen",
            value: [0, 0.1, 0.15, 0.2, 0.25, 0.3],
            img: "spell/MonkeyKingDoubleAttack.png"
        }],
        sInfoP: {
            input: {
                type: "number",
                max: 6
            },
            p1: {
                info: "Armor",
                type: "armor",
                child: ["p1Var"]
            },
            p2: {
                info: "SpellBlock",
                type: "mr",
                child: ["p1Var"]
            },
            p1Var: {
                inputId: "P",
                link: "input",
                coeff: [4, 4, 4, 4, 4, 4, 6, 6, 6, 6, 6, 6, 8, 8, 8, 8, 8, 8]
            }
        },
        sInfo0: {
            e1: {
                type: "phys",
                child: ["f1Var"],
                basicAttack: true
            },
            f1Var: {
                link: "attackdamage",
                coeff: [0.1, 0.2, 0.3, 0.4, 0.5]
            }
        },
        sInfo1: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo2: {
            e1: {
                type: "phys",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo3: {
            txt: "<br>Total: {{ f1 }}",
            e1: {
                type: "phys",
                spell: true,
                child: ["a1"]
            },
            f1: {
                effectNo: 1,
                type: "phys",
                spell: true,
                child: ["a1"],
                multiplier: 50,
                ticks: 8,
                duration: 4
            }
        }
    },
    Mordekaiser: { //vars key on spell 2 is wrong
        buffs: [{
            spell: 1,
            key: "e5",
            type: "flatmoveSpeed",
            active: true
        }],
        sInfo0: {
            e3: {
                type: "mag",
                child: ["f1Var", "f2Var"],
                basicAttack: true
            },
            f1Var: {
                link: "spelldamage",
                coeff: 0.6
            },
            f2Var: {
                link: "attackdamage",
                coeff: [0.5, 0.6, 0.7, 0.8, 0.9]
            },
            f5: {
                effectNo: 3,
                type: "mag",
                child: ["f1Var", "f2Var"],
                multiplier: 200,
                basicAttack: true
            }
        },
        sInfo1: {
            active: true,
            e2: {
                type: "mag",
                spell: true,
                child: ["a1"]
            },
            e6: {
                type: "heal",
                selfHeal: true,
                child: ["a2"]
            }
        },
        sInfo2: {
            e3: {
                type: "mag",
                spell: true,
                child: ["a1", "e3Var"]
            },
            e3Var: {
                link: "spelldamage",
                coeff: 0.6
            }
        },
        sInfo3: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"],
                apply: "maxHp",
                ticks: 10,
                duration: 10,
                multiplier: 10
            },
            f1: {
                child: ["f1Var"]
            },
            f1Var: {
                link: "bonusattackdamage",
                coeff: 1
            },
            f2: {
                child: ["f2Var"]
            },
            f2Var: {
                link: "maxHp",
                coeff: 0.1
            }
        }
    },
    Morgana: {
        sInfo0: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo1: {
            e5: {
                type: "mag",
                spell: true,
                child: ["a1"]
            },
            e6: {
                type: "mag",
                spell: true,
                child: ["a2"]
            }
        },
        sInfo2: {
            e1: {
                type: "shield",
                child: ["a1"]
            }
        },
        sInfo3: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        }
    },
    Nami: {
        sInfoP: {
            p1: {
                info: "PercentMovementSpeedMod",
                value: 60,
                child: ["p1Var"]
            },
            p1Var: {
                link: "spelldamage",
                coeff: 0.2
            },
            p2: {
                info: "PercentMovementSpeedMod",
                myInfo: "[R]",
                value: 120,
                child: ["p2Var"]
            },
            p2Var: {
                link: "spelldamage",
                coeff: 0.4
            },
        },
        sInfo0: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo1: {
            e3: {
                type: "heal",
                child: ["a2"]
            },
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            },
            f1: {
                value: 85,
                child: ["f1Var"]
            },
            f1Var: {
                link: "spelldamage",
                coeff: 0.075
            }
        },
        sInfo2: {
            e1: {
                type: "mag",
                child: ["a1"],
                basicAttack: true
            },
            e2: {
                child: ["a2"]
            }
        },
        sInfo3: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        }
    },
    Nasus: {
        buffs: [
            {
                spell: "P",
                key: "p1",
                type: "lifesteal",
            },
            {
                spell: 3,
                key: "e4",
                type: "armor",
                active: true
            },
            {
                spell: 3,
                key: "e4",
                type: "mr",
                active: true
            },
            {
                spell: 3,
                key: "e1",
                type: "hp",
                active: true
            }
        ],
        debuff: [{
                name: "PercentAtkSpeed",
                value: [0, 0.175, 0.235, 0.295, 0.355, 0.415, 0.475],
                img: "spell/NasusW.png"
            },
            {
                name: "PercentArmorPen",
                value: [0, 0.15, 0.2, 0.25, 0.30, 0.35],
                img: "spell/NasusE.png"
            }
        ],
        sInfoP: {
            p1: {
                info: "PercentLifeStealMod",
                valuePerLvl: [12, 12, 12, 12, 12, 12, 18, 18, 18, 18, 18, 18, 24, 24, 24, 24, 24, 24]
            }
        },
        sInfo0: {
            input: {
                type: "number"
            },
            e1: {
                type: "phys",
                spell: true,
                child: ["a2", "f1Var"],
                basicAttack: true
            },
            f1Var: {
                inputId: "0",
                link: "input",
                coeff: 3
            }
        },
        sInfo2: {
            e4: {
                type: "mag",
                spell: true,
                child: ["a2"]
            },
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo3: {
            active: true,
            e3: {
                type: "mag",
                spell: true,
                child: ["a1"],
                apply: "maxHp"
            },
            e5: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        }
    },
    Nautilus: {
        aSpdBonus: 0.15,
        sInfoP: {
            p1: {
                info: "Damage",
                type: "phys",
                value: 2,
                child: ["p1Var"]
            },
            p1Var: {
                link: "champLevel",
                coeff: 6
            }
        },
        sInfo0: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo1: {
            e1: {
                type: "shield",
                selfShield: true,
                child: ["f1Var"]
            },
            f1Var: {
                link: "maxHp",
                coeff: [0.09, 0.11, 0.13, 0.15, 0.17]
            },
            e4: {
                type: "mag",
                child: ["a1"],
                basicAttack: true,
                dps: 1
            }
        },
        sInfo2: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo3: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            },
            e2: {
                type: "mag",
                spell: true,
                child: ["a2"]
            }
        }
    },
    Nidalee: { //missing cougar form damage numbers[english added]
        buffs: [{
                spell: "P",
                key: "p1",
                type: "percentmoveSpeed",
                active: true
            },
            {
                spell: "2",
                key: "e4",
                type: "attackSpeed",
                active: true
            },
        ],
        sInfoP: {
            active: true,
            p1: {
                info: "PercentMovementSpeedMod",
                value: 10
            },
        },
        sInfo0: {
            txt: "<hr>Cougar: Nidalee's next attack deals {{ f1 }} magic damage. Takedown deals {{ f2 }}% additional damage for each 1% Health the target is missing, up to {{ f3 }}.<br>Hunted targets take 40% additional damage from Takedown.",
            e1: {
                type: "mag",
                spell: true,
                child: ["a2"]
            },
            e2: {
                type: "mag",
                spell: true,
                child: ["a1"]
            },
            f1: {
                type: "mag",
                valuePair: [3, "f1Q"],
                child: ["f1Var", "f1Var2"]
            },
            f1Var: {
                link: "spelldamage",
                coeff: 0.4
            },
            f1Var2: {
                link: "attackdamage",
                coeff: 0.75
            },
            f3: {
                type: "mag",
                valuePair: [3, "f1Q"],
                child: ["f1Var", "f1Var2"],
                multiplier: 199
            },
            f2: {
                valuePair: [3, "f2Q"]
            }
        },
        sInfo1: {
            txt: "<hr>Nidalee leaps forward a short distance dealing {{ f1 }} magic damage to enemies as she lands. Killing a unit in Cougar form reduces Pounce's cooldown to {{ f2 }} second(s).<br><br> Hunted targets can be Pounced to at up to double the normal range, and the first Pounce to a Hunted target causes it to only incur a {{ f3 }} second cooldown.",
            e7: {
                type: "mag",
                spell: true,
                child: ["a2"],
                duration: 4,
                ticks: 4,
                multiplier: 25
            },
            f4: {
                valuePair: [3, "f4W"]
            },
            f1: {
                valuePair: [3, "f1W"],
                type: "mag",
                spell: true,
                child: ["f1Var"]
            },
            f1Var: {
                link: "spelldamage",
                coeff: 0.3
            },
            f2: {
                valuePair: [3, "f2W"]
            },
            f3: {
                valuePair: [3, "f2W"]
            }
        },
        sInfo2: {
            active: true,
            txt: "<hr>Nidalee claws at enemies in front of her, dealing {{ f1 }} magic damage.",
            e1: {
                type: "heal",
                child: ["a2"]
            },
            e2: {
                type: "heal",
                child: ["f3Var"]
            },
            f3Var: {
                link: "spelldamage",
                coeff: 0.65
            },
            f1: {
                valuePair: [3, "f1E"],
                type: "mag",
                spell: true,
                child: ["f1Var"]
            },
            f1Var: {
                link: "spelldamage",
                coeff: 0.45
            }
        },
        sInfo3: {
            f4W: {
                value: [4, 4, 6, 8, 10]
            },
            f1Q: {
                value: [5, 5, 30, 55, 80]
            },
            f2Q: {
                value: [1, 1, 1.25, 1.5, 1.75]
            },
            f1W: {
                value: [60, 60, 110, 160, 210]
            },
            f2W: {
                value: 6,
                multiplier: [60, 60, 50, 40, 30]
            },
            f1E: {
                value: [70, 70, 130, 190, 250]
            },
        }
    },
    Nocturne: {//keep an eye on ult var ratio
        aSpdBonus: 0.08,
        buffs: [{
                spell: 0,
                key: "e4",
                type: "attackdamage",
                active: true
            },
            {
                spell: 0,
                key: "e1",
                type: "multiMoveSpeed",
                active: true
            },
            {
                spell: 1,
                key: "e1",
                type: "attackSpeed"
            },
            {
                spell: 1,
                key: "e1",
                type: "attackSpeed",
                active: true
            }
        ],
        sInfoP: {
            p1: {
                info: "Damage",
                type: "phys",
                child: ["p1Var"]
            },
            p1Var: {
                link: "attackdamage",
                coeff: 1.2
            },
            p2: {
                info: ["SpecialRecipeLarge", "HealthRegen"],
                type: "heal",
                selfHeal: true,
                valuePerLvl: [15, 16, 18, 19, 21, 22, 24, 25, 27, 28, 30, 31, 33, 34, 36, 37, 39, 40],
                child: ["p2Var"]
            },
            p2Var: {
                link: "spelldamage",
                coeff: 0.15
            },
        },
        sInfo0: {
            active: true,
            e2: {
                type: "phys",
                spell: true,
                child: ["f1"]
            }
        },
        sInfo1: {
            active: true
        },
        sInfo2: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo3: {
            e3: {
                type: "phys",
                spell: true,
                child: ["f1"]
            }
        }
    },
    Nunu: { //add additonal level for passive
        buffs: [{
                spell: 1,
                key: "e2",
                type: "percentmoveSpeed",
                active: true
            },
            {
                spell: 1,
                key: "e1",
                type: "attackSpeed",
                active: true
            },
        ],
        debuff: [{
                name: "PercentAtkSpeed",
                value: 0.25,
                img: "spell/IceBlast.png"
            },
            {
                name: "PercentAtkSpeed",
                value: 0.25,
                img: "spell/AbsoluteZero.png"
            }
        ],
        sInfo0: {
            e2: {
                type: "heal",
                child: ["a1"]
            },
            f5: {
                value: [50, 55, 60, 65, 70]
            },
            e4: {
                type: "mag",
                child: ["a2"]
            }
        },
        sInfo1: {
            active: true,
            e1: {
                child: ["f1Var"]
            },
            f1Var: {
                link: "spelldamage",
                coeff: 0.05
            }
        },
        sInfo2: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo3: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            },
            f2: {
                effectNo: 1,
                type: "mag",
                spell: true,
                child: ["a1"],
                multiplier: 12.5
            }
        }
    },
    Olaf: {
        buffs: [{
                spell: "P",
                key: "p1",
                type: "attackSpeed"
            },
            {
                spell: 1,
                key: "e1",
                type: "attackSpeed",
                active: true
            },
            {
                spell: 3,
                key: "f1",
                type: "attackdamage",
                active: true
            },
            {
                spell: 3,
                key: "e1",
                type: "armor",
                passiveOnly: true
            },
            {
                spell: 3,
                key: "e1",
                type: "mr",
                passiveOnly: true
            },
            {
                spell: 3,
                key: "e5",
                type: "percentmoveSpeed",
                active: true
            }
        ],
        sInfoP: {
            p1: {
                info: "PercentAttackSpeedMod",
                child: ["p1Var"]
            },
            p1Var: {
                link: "percentMissingHp",
                coeff: 1
            }
        },
        sInfo0: {
            e1: {
                type: "phys",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo1: {
            active: true
        },
        sInfo2: {
            e1: {
                type: "tru",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo3: {
            active: true,
            e1: {
                type: "armor"
            },
            e1a: {
                type: "mr"
            },
            f1: {
                effectNo: 6,
                child: ["f1Var"]
            },
            f1Var: {
                link: "attackdamage",
                coeff: 0.3
            }
        }
    },
    Orianna: {
        buffs: [{
            spell: 1,
            key: "e3",
            type: "percentmoveSpeed",
            active: true
        }],
        sInfoP: {
            p1: {
                info: "magicDamage",
                type: "mag",
                child: ["p1Var"],
                valuePerLvl: [10, 10, 10, 18, 18, 18, 26, 26, 26, 34, 34, 34, 42, 42, 42, 50, 50, 50],
                dps: 1
            },
            p1Var: {
                link: "spelldamage",
                coeff: 0.15
            }
        },
        sInfo0: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo1: {
            active: true,
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo2: {
            e1: {
                type: "shield",
                child: ["a1"]
            },
            e3: {
                type: "mag",
                spell: true,
                child: ["a2"]
            }
        },
        sInfo3: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        }
    },
    Ornn: {
        sInfo0: {
            e1: {
                type: "phys",
                spell: true,
                child: ["f1Var"]
            },
            f1Var: {
                link: "attackdamage",
                coeff: 1
            }
        },
        sInfo1: {
            f5: {
                type: "shield",
                selfShield: true,
                child: ["f1Var"]
            },
            f1Var: {
                link: "maxHp",
                coeff: 0.12
            },
            f9: {
                value: 6
            },
            f8: {
                valuePerLvl: [7, 7, 7, 8, 8, 8, 9, 9, 9, 10, 10, 10, 11, 11, 11, 12, 12, 13],
                type: "mag",
                apply: "maxHp"
            },
            e0: {
                type: "mag",
                apply: "maxHp",
                ticks: 5,
                duration: 2.5,
                multiplier: 20
            },
            e10: {
                type: "mag",
                spell: true,
                apply: "maxHp"
            },
            e3: {
                type: "mag",
                spell: true,
                ticks: 5,
                duration: 2.5,
                multiplier: 20
            }
        },
        sInfo2: {
            e1: {
                type: "phys",
                spell: true,
                child: ["f2Var", "f3Var"]
            },
            e2: {
                type: "phys",
                spell: true,
                child: ["f2Var", "f3Var"]
            },
            f2Var: {
                link: "bonusarmor",
                coeff: 0.4
            },
            f3Var: {
                link: "bonusmr",
                coeff: 0.4
            }
        },
        sInfo3: {
            e2: {
                type: "mag",
                spell: true,
                child: ["f4Var"]
            },
            f4Var: {
                link: "spelldamage",
                coeff: 0.2
            },
            f10: {
                value: 6
            },
        }
    },
    Pantheon: {
        aSpdBonus: 0.08,
        sInfo0: {
            e2: {
                type: "phys",
                spell: true,
                child: ["f1"],
                crit: [50, true]
            }
        },
        sInfo1: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo2: {
            e1: {
                type: "phys",
                spell: true,
                child: ["a1"],
                ticks: 3,
                multiplier: 33.33
            },
            f1: {
                effectNo: 1,
                type: "phys",
                spell: true,
                child: ["a1"],
                multiplier: 33.33
            }
        },
        sInfo3: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        }
    },
    Poppy: {
        buffs: [{
                spell: 1,
                key: "f1",
                type: "armor"
            },
            {
                spell: 1,
                key: "f2",
                type: "mr"
            },
            {
                spell: 1,
                key: "e2",
                type: "percentmoveSpeed",
                active: true
            }
        ],
        sInfoP: {
            p1: {
                info: "magicDamage",
                type: "mag",
                valuePerLvl: [20, 29, 39, 48, 58, 67, 76, 86, 95, 105, 114, 124, 133, 142, 152, 161, 171, 180]
            },
            p2: {
                info: "Defense",
                type: "shield",
                selfShield: true,
                child: ["p2Var"]
            },
            p2Var: {
                link: "maxHp",
                coeff: [0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.175, 0.175, 0.175, 0.175, 0.175, 0.175, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2]
            },
        },
        sInfo0: {
            e1: {
                type: "phys",
                spell: true,
                child: ["a1"]
            },
            e5: {
                type: "phys",
                apply: "maxHp"
            }
        },
        sInfo1: {
            active: true,
            e5: {
                type: "mag",
                spell: true,
                child: ["a1"]
            },
            f1: {
                type: "armor",
                child: ["f1Var"]
            },
            f1Var: {
                link: "armor",
                coeff: 0.1
            },
            f2: {
                type: "mr",
                child: ["f2Var"]
            },
            f2Var: {
                link: "mr",
                coeff: 0.1
            }
        },
        sInfo2: {
            e1: {
                type: "phys",
                spell: true,
                child: ["a1"]
            },
            e2: {
                type: "phys",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo3: {
            e1: {
                type: "phys",
                spell: true,
                child: ["a1"]
            }
        }
    },
    Pyke: {
        sInfoP: {
            p1: {
                info: ["Attack", "Damage"],
                child: ["p1Var"]
            },
            p1Var: {
                link: "bonusHp",
                coeff: 0.07145
            }
        },
        sInfo0: {
            e1: {
                type: "phys",
                child: ["a1"]
            },
            f5: {
                value: [86.25, 143.75, 201.25, 258.75, 316.25],
                type: "phys",
                child: ["f6Var"]
            },
            f6Var: {
                link: "bonusattackdamage",
                coeff: 0.69
            }
        },
        sInfo1: {
            e1: {
                child: ["a1"]
            }
        },
        sInfo2: {
            e1: {
                type: "phys",
                child: ["a1"]
            },
        },
        sInfo3: {
            f8: {
                valuePerLvl: [200, 200, 200, 200, 200, 200, 250, 300, 350, 400, 450, 475, 500, 525, 550, 575, 590, 600],
                child: ["a1"]
            },
            f7: {
                info: "Damage",
                type: "phys",
                valuePerLvl: [200, 200, 200, 200, 200, 200, 250, 300, 350, 400, 450, 475, 500, 525, 550, 575, 590, 600],
                child: ["a1"]
            }
        }
    },
    Quinn: {
        buffs: [{
                spell: 1,
                key: "e2",
                type: "attackSpeed",
                active: true
            },
            {
                spell: 1,
                key: "e3",
                type: "percentmoveSpeed",
                active: true
            }
        ],
        sInfoP: {
            p1: {
                info: "Damage",
                type: "phys",
                value: 5,
                child: ["p1Var", "p1Var2"]
            },
            p1Var: {
                link: "champLevel",
                coeff: 5
            },
            p1Var2: {
                link: "attackdamage",
                coeff: [0.16, 0.18, 0.2, 0.22, 0.24, 0.26, 0.28, 0.3, 0.32, 0.34, 0.36, 0.38, 0.4, 0.42, 0.44, 0.46, 0.48, 0.5]
            },
        },
        sInfo0: {
            e1: {
                type: "phys",
                spell: true,
                child: ["a1", "f2Var"]
            },
            f2Var: {
                link: "attackdamage",
                coeff: [0.8, 0.9, 1, 1.1, 1.2]
            }
        },
        sInfo1: {
            active: true
        },
        sInfo2: {
            e2: {
                type: "phys",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo3: {
            f1: {
                type: "phys",
                spell: true,
                child: ["f1Var"]
            },
            f1Var: {
                link: "attackdamage",
                coeff: 0.4
            },
        }
    },
    Rakan: {
        sInfoP: {
            p1: {
                info: "Defense",
                type: "shield",
                selfShield: true,
                value: 20,
                child: ["p1Var", "p1Var2"]
            },
            p1Var: {
                link: "champLevel",
                coeff: 13
            },
            p1Var2: {
                link: "spelldamage",
                coeff: 0.9
            }
        },
        sInfo0: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            },
            f1: {
                value: 12,
                type: "heal",
                child: ["a2", "f1Var"]
            },
            f1Var: {
                link: "champLevel",
                coeff: 6
            }
        },
        sInfo1: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo2: {
            e1: {
                type: "shield",
                child: ["a1"]
            }
        },
        sInfo3: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        }
    },
    Rammus: {
        buffs: [{
                spell: 1,
                key: "e1",
                type: "armor",
                active: true
            },
            {
                spell: 1,
                key: "f1",
                type: "armor",
                active: true
            },
            {
                spell: 1,
                key: "e8",
                type: "mr",
                active: true
            },
            {
                spell: 1,
                key: "f2",
                type: "mr",
                active: true
            },
            {
                spell: 2,
                key: "e2",
                type: "attackSpeed",
                active: true
            }
        ],
        sInfoP: {
            p1: {
                info: "magicDamage",
                type: "mag",
                valuePerLvl: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 20, 20, 20, 20, 20],
                child: ["p1Var"]
            },
            p1Var: {
                link: "armor",
                coeff: 0.1
            },
            p2: {
                info: ["SpecialRecipeLarge", "magicDamage"],
                type: "mag",
                valuePerLvl: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 20, 20, 20, 20, 20],
                child: ["p1Var"],
                multiplier: 150
            },
        },
        sInfo0: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            },
            f2: {
                value: 145,
                child: ["f2Var"]
            },
            f2Var: {
                link: "champLevel",
                coeff: 5
            }
        },
        sInfo1: {
            active: true,
            e1: {
                type: "armor"
            },
            f1: {
                type: "armor",
                child: ["f1Var"]
            },
            f1Var: {
                link: "armor",
                coeff: [0.5, 0.6, 0.7, 0.8, 0.9]
            },
            e8: {
                type: "mr"
            },
            f2: {
                type: "mr",
                child: ["f2Var"]
            },
            f2Var: {
                link: "mr",
                coeff: [0.25, 0.3, 0.35, 0.4, 0.45]
            }
        },
        sInfo2: {
            active: true
        },
        sInfo3: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        }
    },
    RekSai: {
        sInfoP: {
            p1: {
                info: ["SpecialRecipeLarge", "HealthRegen"],
                type: "heal",
                selfHeal: true,
                child: ["p1Var"],
                value: 10
            },
            p1Var: {
                link: "champLevel",
                coeff: 10
            }
        },
        sInfo0: {
            e1: {
                type: "phys",
                spell: true,
                child: ["a1"],
                basicAttack: true
            },
            e4: {
                type: "phys",
                spell: true,
                child: ["a1", "a2"]
            }
        },
        sInfo1: {
            e2: {
                type: "phys",
                spell: true,
                child: ["a1"]
            },
            f1: {
                valuePerLvl: [15, 15, 15, 15, 15, 20, 20, 20, 20, 20, 25, 25, 25, 25, 25, 30, 30, 30]
            }
        },
        sInfo2: {
            e1: {
                type: "phys",
                spell: true,
                child: ["a1"]
            },
            f2: {
                effectNo: 1,
                type: "tru",
                spell: true,
                child: ["a1"],
                multiplier: 200
            }
        },
        sInfo3: {
            e8: {
                type: "phys",
                spell: true,
                child: ["a2"]
            },
            e9: {
                type: "phys",
                apply: "missHp"
            }
        }
    },
    Renekton: {
        buffs: [{
            spell: 3,
            key: "e1",
            type: "hp",
            active: true
        }],
        debuff: [{
            name: "PercentArmorPen",
            value: [0, 0.15, 0.2, 0.25, 0.30, 0.35],
            img: "spell/RenektonSliceAndDice.png"
        }],
        sInfo0: {
            e1: {
                type: "phys",
                spell: true,
                child: ["a1"]
            },
            e2: {
                type: "heal",
                selfHeal: true,
                child: ["f1Var"]
            },
            f1Var: {
                link: "bonusattackdamage",
                coeff: 0.04
            },
            f2: {
                effectNo: 2,
                type: "heal",
                child: ["f1Var"],
                multiplier: 300
            },
            e4: {
                type: "heal"
            },
            e6: {
                type: "phys",
                spell: true,
                child: ["a2"]
            },
            e7: {
                type: "heal",
                child: ["f4Var"]
            },
            f4Var: {
                link: "bonusattackdamage",
                coeff: 0.12
            },
            f5: {
                effectNo: 7,
                type: "heal",
                child: ["f4Var"],
                multiplier: 300
            },
            e9: {
                type: "heal"
            }
        },
        sInfo1: {
            e1: {
                type: "phys",
                child: ["f1Var"],
                basicAttack: true
            },
            f1Var: {
                link: "attackdamage",
                coeff: 0.75
            },
            e5: {
                type: "phys",
                child: ["f2Var"],
                basicAttack: true
            },
            f2Var: {
                link: "attackdamage",
                coeff: 1.5
            },
            e6: {
                type: "phys",
                child: ["f3Var"],
                basicAttack: true
            },
            f3Var: {
                link: "attackdamage",
                coeff: 2.25
            }
        },
        sInfo2: {
            e1: {
                type: "phys",
                spell: true,
                child: ["f1Var"]
            },
            f1Var: {
                link: "attackdamage",
                coeff: 0.9
            },
            effect1amount: {
                effectNo: 1,
                type: "phys",
                spell: true,
                child: ["f1Var"],
                multiplier: 150
            }
        },
        sInfo3: {
            active: true,
            e2: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        }
    },
    Rengar: { //fix cooldowns most are wrong, add ult bonus damage
        buffs: [{
                spell: "P",
                key: "p1",
                type: "attackdamage"
            },
            {
                spell: 3,
                key: "e1",
                type: "percentmoveSpeed",
                active: true
            }
        ],
        debuff: [{
            name: "FlatArmorPen",
            value: [0, 12, 18, 24],
            img: "spell/RengarR.png"
        }],
        sInfoP: {
            input: {
                type: "number",
                max: "6"
            },
            p1: {
                info: "AttackDamage",
                child: ["p1Var"]
            },
            p1Var: {
                link: "rengarPassive",
                coeff: 1
            }
        },
        sInfo0: {
            e1: {
                type: "phys",
                onHit: 1,
                basicAttack: true,
                child: ["f2Var"]
            },
            f2Var: {
                link: "attackdamage",
                coeff: [1, 1.05, 1.1, 1.15, 1.2]
            },
            f3: {
                valuePerLvl: [30, 45, 60, 75, 90, 105, 120, 135, 150, 160, 170, 180, 190, 200, 210, 220, 230, 240],
                type: "phys",
                basicAttack: true,
                onHit: 1,
                child: ["a2"]
            },
            f4: {
                value: 47,
                child: ["f4Var"]
            },
            f4Var: {
                link: "champLevel",
                coeff: 3
            }
        },
        sInfo1: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            },
            f1: {
                value: 40,
                type: "mag",
                spell: true,
                child: ["f1Var", "a1"]
            },
            f1Var: {
                link: "champLevel",
                coeff: 10
            }
        },
        sInfo2: {
            e1: {
                type: "phys",
                spell: true,
                child: ["a1"]
            },
            f1: {
                value: 35,
                type: "phys",
                spell: true,
                child: ["f1Var", "a1"]
            },
            f1Var: {
                link: "champLevel",
                coeff: 15
            }
        },
        sInfo3: {
            active: true
        }
    },
    Riven: {
        buffs: [{
            spell: 3,
            key: "f3",
            type: "attackdamage",
            active: true
        }],
        sInfoP: {
            p1: {
                type: "phys",
                info: "Damage",
                child: ["p1Var"]
            },
            p1Var: {
                link: "attackdamage",
                coeff: [0.25, 0.25, 0.25, 0.25, 0.25, 0.3, 0.3, 0.3, 0.35, 0.35, 0.35, 0.4, 0.4, 0.4, 0.45, 0.45, 0.45, 0.5]
            }
        },
        sInfo0: {
            e1: {
                type: "phys",
                spell: true,
                child: ["f1Var"]
            },
            f1Var: {
                link: "attackdamage",
                coeff: [0.45, 0.5, 0.55, 0.6, 0.65]
            }
        },
        sInfo1: {
            e1: {
                type: "phys",
                spell: true,
                child: ["f1"]
            }
        },
        sInfo2: {
            e2: {
                type: "shield",
                selfShield: true,
                child: ["f1"]
            }
        },
        sInfo3: {
            active: true,
            f3: {
                child: ["f3Var"]
            },
            f3Var: {
                link: "attackdamage",
                coeff: 0.2
            },
            e1: {
                type: "phys",
                spell: true,
                child: ["f1"]
            },
            e2: {
                type: "phys",
                spell: true,
                child: ["f2"]
            }
        }
    },
    Rumble: {
        buffs: [{
            spell: 1,
            key: "e2",
            type: "percentmoveSpeed",
            active: true
        }],
        sInfoP: {
            p1: {
                info: ["Attack", "magicDamage"],
                value: 20,
                type: "mag",
                child: ["p1Var", "p1Var2"],
                dps: 1
            },
            p1Var: {
                link: "champLevel",
                coeff: 5
            },
            p1Var2: {
                link: "spelldamage",
                coeff: 0.3
            },
        },
        sInfo0: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"],
                duration: 3,
                ticks: 3,
                multiplier: 33
            }
        },
        sInfo1: {
            active: true,
            e1: {
                type: "shield",
                selfShield: true,
                child: ["a1"]
            }
        },
        sInfo2: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo3: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a2"]
            }
        }
    },
    Ryze: {
        buffs: [{
                spell: 0,
                key: "e4",
                type: "percentmoveSpeed",
                active: true
            },
            {
                spell: "P",
                key: "p1",
                type: "mp"
            }
        ],
        sInfoP: {
            p1: {
                info: "Mana",
                child: ["p1Var"]
            },
            p1Var: {
                link: "spelldamage",
                coeff: 0.05
            },
        },
        sInfo0: {
            active: true,
            e1: {
                type: "mag",
                spell: true,
                child: ["a1", "f1Var"]
            },
            f1Var: {
                coeff: 0.02,
                link: "mana"
            },
            f3: {
                value: 60,
                type: "shield",
                selfShield: true,
                spell: true,
                child: ["a2", "f3Var"]
            },
            f3Var: {
                coeff: 5,
                link: "champLevel"
            }
        },
        sInfo1: {
            e2: {
                type: "mag",
                spell: true,
                child: ["a1", "f1Var"]
            },
            f1Var: {
                coeff: 0.01,
                link: "mana"
            }
        },
        sInfo2: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1", "f1Var"]
            },
            f1Var: {
                coeff: 0.02,
                link: "mana"
            },
        }
    },
    Sejuani: {
        buffs: [{
                spell: "P",
                key: "p1",
                type: "armor",
                active: true
            },
            {
                spell: "P",
                key: "p2",
                type: "mr",
                active: true
            }
        ],
        sInfoP: {
            active: true,
            p1: {
                info: "Armor",
                type: "armor",
                valuePerLvl: [20, 20, 20, 20, 20, 20, 70, 70, 70, 70, 70, 70, 70, 120, 120, 120, 120, 120],
                child: ["p1Var"]
            },
            p1Var: {
                link: "armor",
                coeff: 1
            },
            p2: {
                info: "SpellBlock",
                type: "mr",
                valuePerLvl: [20, 20, 20, 20, 20, 20, 70, 70, 70, 70, 70, 70, 70, 120, 120, 120, 120, 120],
                child: ["p2Var"]
            },
            p2Var: {
                link: "mr",
                coeff: 1
            },
            p3: {
                info: "magicDamage",
                type: "mag",
                child: ["p3Var"]
            },
            p3Var: {
                link: "maxHp",
                coeff: [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.2, 0.2, 0.2, 0.2, 0.2]
            }
        },
        sInfo0: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo1: {
            e1: {
                type: "phys",
                spell: true,
                child: ["f1Var", "f3Var"]
            },
            f1Var: {
                coeff: 0.015,
                link: "maxHp"
            },
            f3Var: {
                coeff: 0.2,
                link: "spelldamage"
            },
            e3: {
                type: "phys",
                spell: true,
                child: ["f2Var", "f4Var"]
            },
            f2Var: {
                coeff: 0.045,
                link: "maxHp"
            },
            f4Var: {
                coeff: 0.6,
                link: "spelldamage"
            }
        },
        sInfo2: {
            e3: {
                type: "mag",
                spell: true,
                child: ["a1"]
            },
            f2: {
                valuePerLvl: [10, 10, 10, 10, 10, 10, 9, 9, 9, 9, 9, 9, 9, 8, 8, 8, 8, 8]
            }
        },
        sInfo3: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            },
            e7: {
                type: "mag",
                spell: true,
                child: ["a2"]
            }
        }
    },
    Shaco: { //add passive damage
        sInfoP: {
            p1: {info: "FlatCritDamageMod", type: "phys", basicAttack: true, child: ["p1Var1","p1Var2"], crit: [0, true, true]},
            p1Var1: {link: "attackdamage", coeff: 1.3},
            p1Var2: {link: "spelldamage", coeff: 0.4}
        },
        sInfo0: {
            e1: {
                type: "phys",
                child: ["a1"]
            },
            f3: {
                value: 2.5
            }
        },
        sInfo1: {
            e1: {
                type: "mag",
                child: ["a1"]
            },
            e4: {
                child: ["a2"]
            }
        },
        sInfo2: {
            e1: {
                type: "phys",
                spell: true,
                child: ["a1", "f1Var"]
            },
            f1Var: {
                link: "bonusattackdamage",
                coeff: [0.6, 0.75, 0.9, 1.05, 1.2]
            }
        },
        sInfo3: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            },
            e6: {
                type: "mag",
                child: ["a2"]
            }
        }
    },
    Shen: {
        aSpdBonus: 0.15,
        sInfoP: {
            p1: {
                value: 47,
                info: "Defense",
                type: "shield",
                selfShield: true,
                child: ["p1Var", "p1Var2"]
            },
            p1Var: {
                link: "champLevel",
                coeff: 3
            },
            p1Var2: {
                link: "bonusHp",
                coeff: 0.14
            }
        },
        sInfo0: {
            f1: {
                type: "mag",
                valuePerLvl: [5, 5, 5, 10, 10, 10, 15, 15, 15, 20, 20, 20, 25, 25, 25, 30, 30, 30],
                basicAttack: true
            },
            e2: {
                type: "mag",
                apply: "maxHp",
                child: ["e2Var"],
                basicAttack: true
            },
            e2Var: {
                link: "spelldamage",
                coeff: 0.015
            },
            f2: {
                type: "mag",
                valuePerLvl: [5, 5, 5, 10, 10, 10, 15, 15, 15, 20, 20, 20, 25, 25, 25, 30, 30, 30],
                basicAttack: true
            },
            e6: {
                type: "mag",
                apply: "maxHp",
                child: ["e6Var"],
                basicAttack: true
            },
            e6Var: {
                link: "spelldamage",
                coeff: 0.02
            }
        },
        sInfo2: {
            e2: {
                type: "phys",
                spell: true,
                child: ["f2Var"]
            },
            f2Var: {
                link: "bonusHp",
                coeff: 0.12
            },
            f1: {
                valuePerLvl: [30, 30, 30, 30, 30, 30, 35, 35, 35, 35, 35, 35, 40, 40, 40, 40, 40, 40]
            }
        },
        sInfo3: {
            e1: {
                type: "shield",
                child: ["a1"]
            },
            e8: {
                type: "shield"
            },
            f1: {
                value: 3
            }
        }
    },
    Shyvana: {
        buffs: [{
                spell: "P",
                key: "p1",
                type: "armor"
            },
            {
                spell: "P",
                key: "p1",
                type: "mr"
            },
            {
                spell: 3,
                key: "e0",
                type: "hp",
                active: true
            },
            {
                spell: 1,
                key: "e2",
                type: "percentmoveSpeed",
                active: true
            }
        ],
        sInfoP: {
            input: {
                type: "number",
                max: 5
            },
            p1: {
                info: "Armor",
                type: "armor",
                child: ["p1Var"]
            },
            p1Var: {
                inputId: "P",
                link: "input",
                coeff: 5
            },
            p2: {
                info: "SpellBlock",
                type: "mr",
                child: ["p1Var"]
            },
        },
        sInfo0: {
            f2: {
                type: "phys",
                child: ["f2Var"],
                basicAttack: true
            },
            f1: {
                type: "phys",
                child: ["f1Var"],
                basicAttack: true
            },
            f2Var: {
                link: "attackdamage",
                coeff: 1
            },
            f1Var: {
                link: "attackdamage",
                coeff: [0.2, 0.35, 0.5, 0.65, 0.8]
            }
        },
        sInfo1: {
            active: true,
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            },
            effect1amount: {
                type: "mag",
                value: [5, 8, 11.25, 14.25, 17.5],
                child: ["effVar1", "effVar2"]
            },
            effVar1: {
                link: "bonusattackdamage",
                coeff: 0.05
            },
            effVar2: {
                link: "spelldamage",
                coeff: 0.025
            }
        },
        sInfo2: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1", "f4Var"]
            },
            f4Var: {
                link: "attackdamage",
                coeff: 0.3
            },
            e4: {
                type: "mag",
                apply: "maxHp",
                basicAttack: true
            },
            f1: {
                value: 100,
                type: "mag",
                spell: true,
                child: ["a1", "f4Var", "f1Var"]
            },
            f1Var: {
                link: "champLevel",
                coeff: 5
            },
            f3: {
                value: 60,
                type: "mag",
                child: ["f1Var"]
            },
            f2Var: {
                link: "attackdamage",
                coeff: 0.1
            },
            f6Var: {
                link: "spelldamage",
                coeff: 0.2
            }
        },
        sInfo3: {
            active: true,
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        }
    },
    Singed: {//passive doesn't work with ult active
        buffs: [{
                spell: "P",
                key: "p1",
                type: "percentmoveSpeed"
            },
            {
                spell: 3,
                key: "e1",
                type: "flatmoveSpeed",
                active: true
            },
            {
                spell: 3,
                key: "e1",
                type: "armor",
                active: true
            },
            {
                spell: 3,
                key: "e1",
                type: "mr",
                active: true
            },
            {
                spell: 3,
                key: "e1",
                type: "abilityPower",
                active: true
            },
            {
                spell: 3,
                key: "e1",
                type: "mpregen",
                active: true
            },
            {
                spell: 3,
                key: "e1",
                type: "hpregen",
                active: true
            },
        ],
        sInfoP: {
            input: {
                type: "number",
                max: 25
            },
            p1: {
                info: "PercentMovementSpeedMod",
                child: ["p1Var"]
            },
            p1Var: {
                inputId: "P",
                link: "input",
                coeff: 20
            },
        },
        sInfo0: {
            e1: {
                type: "mag",
                spell: true,
                child: ["e1Var"]
            },
            e1Var: {
                link: "spelldamage",
                coeff: 0.4
            }
        },
        sInfo2: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            },
            e3: {
                type: "mag",
                apply: "maxHp"
            }
        },
        sInfo3: {
            active: true
        }
    },
    Sion: { //add passive
        buffs: [{
            spell: 1,
            key: "f1",
            type: "hp"
        }],
        debuff: [{
            name: "PercentArmorPen",
            value: 0.2,
            img: "spell/SionE.png"
        }],
        sInfo0: {
            e1: {
                type: "phys",
                spell: true,
                child: ["f1Var"]
            },
            f1Var: {
                link: "attackdamage",
                coeff: [0.45, 0.525, 0.6, 0.675, 0.75]
            },
            e4: {
                type: "phys",
                spell: true,
                child: ["f2Var"]
            },
            f2Var: {
                link: "attackdamage",
                coeff: [1.35, 1.5, 1.65, 1.8, 1.95]
            }
        },
        sInfo1: {
            input: {
                type: "number"
            },
            f1: {
                child: ["f1Var"]
            },
            f1Var: {
                inputId: "1",
                link: "input",
                coeff: 1
            },
            e1: {
                type: "shield",
                selfShield: true,
                child: ["a1", "f2Var"]
            },
            f2Var: {
                link: "maxHp",
                coeff: [0.08, 0.09, 0.1, 0.11, 0.12]
            },
            e2: {
                type: "mag",
                spell: true,
                child: ["a1"]
            },
            e4: {
                type: "mag",
                apply: "maxHp"
            }
        },
        sInfo2: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo3: {
            e1: {
                type: "phys",
                spell: true,
                child: ["f1"]
            },
            e2: {
                type: "phys",
                spell: true,
                child: ["f2"]
            }
        }
    },
    Sivir: {
        buffs: [
            {
                spell: 3,
                key: "e4",
                type: "percentmoveSpeed",
                active: true
            },
            {
                spell: 1,
                key: "buff",
                type: "attackSpeed",
                active: true
            },
            {
                spell: "P",
                key: "p1",
                type: "flatmoveSpeed",
                active: true
            }
        ],
        sInfoP: {
            active: true,
            p1: {
                valuePerLvl: [30, 30, 30, 30, 30, 35, 35, 35, 35, 35, 40, 40, 40, 40, 40, 45, 45, 50],
                info: "Movement"
            },
        },
        sInfo0: {
            e1: {
                type: "phys",
                spell: true,
                child: ["a1", "f1Var"]
            },
            f1Var: {
                link: "attackdamage",
                coeff: [0.7, 0.8, 0.9, 1, 1.1]
            }
        },
        sInfo1: {
            active: true,
            buff: {
                valuePair: [3, "f1"]
            },
            f1: {
                type: "phys",
                child: ["f1Var"],
                crit: [100],
                basicAttack: true
            },
            f1Var: {
                link: "attackdamage",
                coeff: [0.5, 0.55, 0.6, 0.65, 0.7]
            }
        },
        sInfo3: {
            active: true,
            f1: {
                value: [0, 30, 45, 60]
            }
        }
    },
    Skarner: {
        buffs: [{
                spell: "P",
                key: "p1",
                type: "flatmoveSpeed",
                active: true
            },
            {
                spell: "P",
                key: "p2",
                type: "attackSpeed",
                active: true
            },
            {
                spell: 1,
                key: "e5",
                type: "percentmoveSpeed",
                active: true
            }
        ],
        sInfoP: {
            active: true,
            p1: {
                info: "Movement",
                valuePerLvl: [70, 72, 74, 76, 78, 80, 82, 85, 88, 91, 94, 97, 100, 104, 108, 112, 116, 120]
            },
            p2: {
                info: "PercentAttackSpeedMod",
                valuePerLvl: [43, 48, 53, 58, 63, 68, 73, 80, 87, 94, 101, 108, 115, 124, 133, 142, 151, 160]
            },
            p3: {
                info: "Mana",
                child: ["p3Var"]
            },
            p3Var: {
                link: "mana",
                coeff: 0.02
            }
        },
        sInfo0: {
            f1: {
                type: "phys",
                child: ["f1Var"]
            },
            f1a: {
                type: "mag",
                child: ["f1Var", "a1"]
            },
            f1Var: {
                link: "attackdamage",
                coeff: [0.33, 0.36, 0.39, 0.42, 0.45]
            }
        },
        sInfo1: {
            active: true,
            f1: {
                type: "shield",
                selfShield: true,
                child: ["f1Var", "a1"]
            },
            f1Var: {
                link: "maxHp",
                coeff: [0.1, 0.11, 0.12, 0.13, 0.14]
            }
        },
        sInfo2: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            },
            e2: {
                type: "phys",
                spell: true,
                basicAttack: true
            }
        },
        sInfo3: {
            e2: {
                type: "mag",
                spell: true,
                child: ["a1"]
            },
            a2: {
                type: "phys",
                spell: true,
                child: ["a2"]
            }
        }
    },
    Sona: { //add debuff on w auto
        buffs: [{
            spell: 2,
            key: "f1",
            type: "percentmoveSpeed",
            active: true
        }],
        sInfoP: {
            p1: {
                info: "magicDamage",
                myInfo: " [Q]",
                type: "mag",
                valuePerLvl: [20, 30, 40, 50, 60, 70, 80, 90, 105, 120, 135, 150, 165, 180, 195, 210, 225, 240],
                child: ["p1Var"],
                multiplier: 140
            },
            p2: {
                info: "magicDamage",
                myInfo: " [W,E]",
                type: "mag",
                valuePerLvl: [20, 30, 40, 50, 60, 70, 80, 90, 105, 120, 135, 150, 165, 180, 195, 210, 225, 240],
                child: ["p1Var"]
            },
            p1Var: {
                link: "spelldamage",
                coeff: 0.2
            },
            p3: {
                info: ["Damage", "reduction"],
                myInfo: "% [W]",
                value: 25,
                child: ["p3Var"]
            },
            p3Var: {
                link: "spelldamage",
                coeff: 0.04
            },
            p4: {
                info: "Slow",
                myInfo: "% [E]",
                value: 40,
                child: ["p3Var"]
            },
            p4Var: {
                link: "spelldamage",
                coeff: 0.04
            }
        },
        sInfo0: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            },
            e4: {
                type: "mag",
                child: ["a2"]
            }
        },
        sInfo1: {
            e1: {
                type: "heal",
                child: ["a1"]
            },
            e4: {
                type: "shield",
                child: ["a2"]
            }
        },
        sInfo2: {
            active: true,
            f1: {
                effectNo: 1,
                child: ["f1Var"]
            },
            f3: {
                effectNo: 1,
                child: ["f1Var"]
            },
            f1Var: {
                link: "spelldamage",
                coeff: 0.06
            },
            f2: {
                value: 6
            }
        },
        sInfo3: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        }
    },
    Soraka: {
        buffs: [{
                spell: "P",
                key: "p1",
                type: "percentmoveSpeed",
                active: true
            },
            {
                spell: 0,
                key: "e9",
                type: "percentmoveSpeed",
                active: true
            }
        ],
        sInfoP: {
            active: true,
            p1: {
                info: "PercentMovementSpeedMod",
                value: 70
            }
        },
        sInfo0: {
            active: true,
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            },
            e3: {
                type: "heal",
                selfHeal: true,
                child: ["f1Var"]
            },
            f1Var: {
                link: "spelldamage",
                coeff: 0.05
            }
        },
        sInfo1: {
            e1: {
                type: "heal",
                spell: true,
                child: ["a1"],
                allyOnly: true
            },
            f1: {
                value: 2.5
            }
        },
        sInfo2: {
            e2: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo3: {
            e1: {
                type: "heal",
                spell: true,
                child: ["a1"]
            }
        }
    },
    Swain: {
        sInfoP: {
            input: {
                type: "number",
                max: 5
            },
            p1: {
                info: "magicDamage",
                value: 15,
                type: "mag",
                child: ["p1Var", "p1Var2"]
            },
            p1Var: {
                link: "spelldamage",
                coeff: 0.3
            },
            p1Var2: {
                link: "champLevel",
                coeff: 5
            },
            p2: {
                info: ["SpecialRecipeLarge", "HealthRegen"],
                type: "heal",
                child: ["p2Var"]
            },
            p2Var: {
                link: "maxHp",
                coeff: [0.04, 0.04, 0.04, 0.04, 0.04, 0.055, 0.055, 0.055, 0.055, 0.055, 0.07, 0.07, 0.07, 0.07, 0.07, 0.07, 0.07, 0.07]
            }
        },
        sInfo0: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            },
            f2: {
                effectNo: 1,
                type: "mag",
                spell: true,
                child: ["a1"],
                multiplier: 160
            },
            f1: {
                child: ["f1Var"]
            },
            f1Var: {
                link: "mana",
                coeff: 0.03
            }
        },
        sInfo1: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            },
            castrange: {
                value: 3500
            }
        },
        sInfo2: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            },
            e2: {
                type: "mag",
                spell: true,
                child: ["a2"]
            }
        },
        sInfo3: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            },
            e4: {
                type: "heal",
                selfHeal: true,
                child: ["a2"]
            },
            f7: {
                valuePerLvl: [125, 125, 125, 125, 125, 125, 125, 125, 125, 125, 300, 300, 300, 300, 300, 450, 450, 450]
            },
            e6: {
                type: "heal",
                selfHeal: true
            },
            e0: {
                type: "mag",
                child: ["f1Var"]
            },
            f1Var: {
                link: "spelldamage",
                coeff: 0.21
            },
            f3: {
                type: "mag",
                child: ["f3Var"]
            },
            f3Var: {
                link: "swainFragments",
                coeff: 1
            },
            f2: {
                effectNo: 10,
                type: "mag",
                child: ["f1Var"],
                multiplier: 500
            },
        }
    },
    Syndra: { //w bonus true damage at max rank
        sInfoP: {
            p1: {
                info: "magicDamage",
                myInfo: "[Q]",
                valuePair: [0, "e1"],
                type: "mag",
                spell: true,
                multiplier: 115
            },
            p2: {
                info: "magicDamage",
                myInfo: "[W]",
                valuePair: [1, "e2"],
                type: "tru",
                multiplier: 20
            },
        },
        sInfo0: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            },
            f1: {
                value: [6, 6, 6, 6, 8]
            }
        },
        sInfo1: {
            e2: {
                type: "mag",
                spell: true,
                child: ["a1"]
            },
            f2: {
                value: 1.5
            }
        },
        sInfo2: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo3: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            },
            e2: {
                type: "mag",
                spell: true,
                child: ["a2"]
            }
        }
    },
    TahmKench: {
        sInfoP: {
            p1: {
                info: "magicDamage",
                myInfo: "[x1]",
                type: "mag",
                child: ["p1Var"]
            },
            p1Var: {
                link: "maxHp",
                coeff: [0.0125, 0.0125, 0.0125, 0.0125, 0.0125, 0.0125, 0.015, 0.015, 0.015, 0.015, 0.015, 0.015, 0.0175, 0.0175, 0.0175, 0.0175, 0.0175, 0.0175]
            },
            p2: {
                info: "magicDamage",
                myInfo: "[x3]",
                type: "mag",
                child: ["p2Var"]
            },
            p2Var: {
                link: "maxHp",
                coeff: [0.0375, 0.0375, 0.0375, 0.0375, 0.0375, 0.0375, 0.045, 0.045, 0.045, 0.045, 0.045, 0.045, 0.0525, 0.0525, 0.0525, 0.0525, 0.0525, 0.0525]
            }
        },
        sInfo0: {
            e3: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo1: {
            e3: {
                type: "mag",
                spell: true,
                child: ["a1"],
                apply: "maxHp"
            },
            e7: {
                type: "mag",
                spell: true,
                child: ["a2"]
            }
        }
    },
    Taliyah: {
        buffs: [{
                spell: 0,
                key: "f2",
                type: "percentmoveSpeed",
                active: true
            },
            {
                spell: "P",
                key: "p1",
                type: "percentmoveSpeed",
                active: true
            }
        ],
        sInfoP: {
            active: true,
            p1: {
                info: "PercentMovementSpeedMod",
                valuePerLvl: [20, 21.47, 22.94, 24.41, 25.88, 27.35, 28.82, 30.29, 31.76, 33.24, 34.71, 36.18, 37.65, 39.12, 40.59, 42.06, 43.43, 45]
            }
        },
        sInfo0: {
            active: true,
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            },
            f1: {
                child: ["f1Var"]
            },
            f1Var: {
                link: "@cooldownchampion",
                coeff: 120
            },
            f2: {
                valuePerLvl: [10, 11, 11.5, 12, 13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5, 17, 17.5, 18.5, 19, 19.5, 20]
            }
        },
        sInfo1: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo2: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            },
            f2: {
                value: 20,
                child: ["f2Var"]
            },
            f2Var: {
                link: "spelldamage",
                coeff: 0.04
            },
            f3: {
                value: [35, 45, 55, 65, 75],
                type: "mag",
                spell: true,
                child: ["f1Var"]
            },
            f1Var: {
                link: "spelldamage",
                coeff: 0.2
            },
            f4: {
                value: 15
            }
        }
    },
    Talon: {
        buffs: [{
            spell: 3,
            key: "e3",
            type: "percentmoveSpeed",
            active: true
        }],
        sInfoP: {
            p1: {
                info: "Damage",
                valuePerLvl: [75, 85, 95, 105, 115, 125, 135, 145, 155, 165, 175, 175, 175, 175, 175, 175, 175, 175],
                type: "phys",
                child: ["p1Var"]
            },
            p1Var: {
                link: "bonusattackdamage",
                coeff: 2
            }
        },
        sInfo0: {
            e1: {
                type: "phys",
                spell: true,
                child: ["a1"],
                crit: [50, true]
            },
            f2: {
                value: 150
            },
            f4: {
                value: 17,
                type: "heal",
                selfHeal: true,
                child: ["f4Var"]
            },
            f4Var: {
                link: "champLevel",
                coeff: 3
            }

        },
        sInfo1: {
            e1: {
                type: "phys",
                spell: true,
                child: ["f1Var"]
            },
            f1Var: {
                link: "bonusattackdamage",
                coeff: 0.4
            },
            e5: {
                type: "phys",
                spell: true,
                child: ["a2"]
            }
        },
        sInfo2: {
            f2: {
                value: 800
            }
        },
        sInfo3: {
            active: true,
            e1: {
                type: "phys",
                spell: true,
                child: ["a1"]
            }
        }
    },
    Taric: {
        buffs: [{
                spell: "P",
                key: "p1",
                type: "attackSpeed",
                active: true
            },
            {
                spell: 1,
                key: "f1",
                type: "armor"
            }
        ],
        sInfoP: {
            active: true,
            p1: {
                info: "PercentAttackSpeedMod",
                value: 100
            },
            p2: {
                info: "magicDamage",
                type: "mag",
                value: 21,
                child: ["p2Var", "p2Var2"]
            },
            p2Var: {
                link: "champLevel",
                coeff: 4
            },
            p2Var2: {
                link: "bonusarmor",
                coeff: 0.15
            },
        },
        sInfo0: {
            e1: {
                type: "heal",
                child: ["a1", "f1Var"]
            },
            f1Var: {
                link: "maxHp",
                coeff: 0.01
            },
            e5: {
                type: "heal",
                child: ["f2Var", "f3Var"]
            },
            f2Var: {
                link: "maxHp",
                coeff: [0.01, 0.02, 0.03, 0.04, 0.05]
            },
            f3Var: {
                link: "spelldamage",
                coeff: [0.2, 0.4, 0.6, 0.8, 1]
            }
        },
        sInfo1: {
            f1: {
                type: "armor",
                child: ["f1Var"]
            },
            f1Var: {
                link: "armor",
                coeff: [0.1, 0.125, 0.15, 0.175, 0.2]
            }
        },
        sInfo2: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1", "f1Var"]
            },
            f1Var: {
                link: "armor",
                coeff: 0.5
            },
        }
    },
    Teemo: {
        buffs: [{
                spell: "P",
                key: "p1",
                type: "attackSpeed",
                active: true
            },
            {
                spell: 1,
                key: "f1",
                type: "percentmoveSpeed",
                active: true
            }
        ],
        sInfoP: {
            active: true,
            p1: {
                info: "PercentAttackSpeedMod",
                valuePerLvl: [20, 20, 20, 20, 40, 40, 40, 40, 40, 60, 60, 60, 60, 60, 80, 80, 80, 80]
            }
        },
        sInfo0: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo1: {
            active: true,
            f1: {
                effectNo: 1,
                multiplier: 200
            }
        },
        sInfo2: {
            e2: {
                type: "mag",
                spell: true,
                child: ["a1"],
                dps: 1
            },
            e1: {
                type: "mag",
                spell: true,
                child: ["a2"]
            }
        },
        sInfo3: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"],
                duration: 4,
                ticks: 4,
                multiplier: 25
            }
        }
    },
    Thresh: {
        buffs: [{
                spell: "P",
                key: "p1",
                type: "armor"
            },
            {
                spell: "P",
                key: "p1",
                type: "abilityPower"
            },
        ],
        sInfoP: {
            input: {
                type: "number",
                max: 999999
            },
            p1: {
                info: "SpellDamage",
                child: ["p1Var"]
            },
            p1Var: {
                inputId: "P",
                link: "input",
                coeff: 0.75
            },
            p2: {
                info: "Armor",
                type: "armor",
                child: ["p1Var"]
            },
        },
        sInfo0: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo1: {
            e1: {
                type: "shield",
                child: ["f6Var"]
            },
            f6Var: {
                inputId: "P",
                link: "input",
                coeff: 1
            }
        },
        sInfo2: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            },
            f3: {
                type: "mag",
                value: 0,
                basicAttack: true,
                child: ["f2Var"]
            },
            f3a: {
                type: "mag",
                child: ["f3Var", "f2Var"],
                basicAttack: true
            },
            f3Var: {
                link: "attackdamage",
                coeff: [1, 1.25, 1.5, 1.75, 2]
            },
            f2Var: {
                inputId: "P",
                link: "input",
                coeff: 1
            },
        },
        sInfo3: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        }
    },
    Tristana: {
        buffs: [{
            spell: 0,
            key: "e1",
            type: "attackSpeed",
            active: true
        }],
        sInfoP: {
            p1: {
                info: ["Attack", "Range"],
                value: 517,
                child: ["p1Var"]
            },
            p1Var: {
                link: "champLevel",
                coeff: 8
            },
        },
        sInfo0: {
            active: true
        },
        sInfo1: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo2: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a2"]
            },
            e4: {
                type: "phys",
                spell: true,
                child: ["a1", "f1Var"]
            },
            f1Var: {
                link: "bonusattackdamage",
                coeff: [0.5, 0.6, 0.7, 0.8, 0.9]
            },
            f5: {
                type: "phys",
                spell: true,
                value: [132, 154, 176, 198, 220],
                child: ["f5Var1", "f5Var2"]
            },
            f5Var1: {
                link: "spelldamage",
                coeff: 1.1
            },
            f5Var2: {
                link: "bonusattackdamage",
                coeff: [1.1, 1.43, 1.76, 2.09, 2.42]
            },
            txt: "<br>4X Damage: {{ f5 }}"
        },
        sInfo3: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        }
    },
    Trundle: {
        buffs: [{
                spell: 0,
                key: "e3",
                type: "attackdamage",
                active: true
            },
            {
                spell: 1,
                key: "e2",
                type: "attackSpeed",
                active: true
            },
            {
                spell: 1,
                key: "e1",
                type: "percentmoveSpeed",
                active: true
            }
        ],
        debuff: [{
                name: "PercentArmorMagPen",
                value: 0.4,
                img: "spell/TrundlePain.png"
            },
            {
                name: "FlatADReduction",
                value: [0, 10, 12.5, 15, 17.5, 20],
                img: "spell/TrundleTrollSmash.png"
            }
        ],
        sInfo0: {
            active: true,
            e1: {
                type: "phys",
                child: ["f1Var"],
                basicAttack: true
            },
            f1Var: {
                link: "attackdamage",
                coeff: [0, 0.05, 0.1, 0.15, 0.2]
            }
        },
        sInfo1: {
            active: true
        },
        sInfo3: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"],
                apply: "maxHp",
                ticks: 4,
                duration: 4,
                multiplier: 25
            }
        }
    },
    Tryndamere: {
        buffs: [{
                spell: 0,
                key: "qAd",
                type: "attackdamage"
            },
            {
                spell: "P",
                key: "p1",
                type: "critChance"
            }
        ],
        debuff: [{
            name: "FlatADReduction",
            value: [0, 20, 35, 50, 65, 80],
            img: "spell/TryndamereW.png"
        }],
        sInfoP: {
            input: {
                type: "number",
                max: 100
            },
            p1: {
                info: "PercentCritChanceMod",
                child: ["p1Var"]
            },
            p1Var: {
                inputId: "P",
                link: "input",
                coeff: 0.35
            },
        },
        sInfo0: {
            qAd: {
                value: [5, 10, 15, 20, 25],
                child: ["qAdVar"]
            },
            qAdVar: {
                link: "percentMissingHp",
                coeff: [0.15, 0.2, 0.25, 0.3, 0.35]
            },
            e3: {
                type: "heal",
                selfHeal: true,
                child: ["a1", "f2Var", "f2Var2"]
            },
            f2Var: {
                link: "spelldamage",
                coeff: 0.012
            },
            f2Var2: {
                inputId: "P",
                link: "input",
                coeff: [0.5, 0.95, 1.4, 1.85, 2.3]
            }
        },
        sInfo2: {
            e1: {
                type: "phys",
                spell: true,
                child: ["a1", "f1Var"]
            },
            f1Var: {
                link: "bonusattackdamage",
                coeff: 1.3
            }
        }
    },
    TwistedFate: {
        sInfo0: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo1: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1", "a2"],
                basicAttack: true
            },
            e4: {
                type: "mag",
                spell: true,
                child: ["a1", "a2"],
                basicAttack: true
            },
            e5: {
                type: "mag",
                spell: true,
                child: ["a1", "a2"],
                basicAttack: true
            }
        },
        sInfo2: {
            e1: {
                type: "mag",
                child: ["a1"],
                basicAttack: true,
                dps: 4
            }
        }
    },
    Twitch: {
        buffs: [{
                spell: 3,
                key: "e1",
                type: "attackdamage",
                active: true
            },
            {
                spell: 0,
                key: "e1",
                type: "attackSpeed",
                active: true
            },
            {
                spell: 0,
                key: "e3",
                type: "percentmoveSpeed",
                active: true
            }
        ],
        sInfoP: {
            input: {
                type: "number",
                max: 6
            },
            p1: {
                info: "Damage",
                type: "tru",
                child: ["p1Var"]
            },
            p1Var: {
                inputId: "P",
                link: "input",
                coeff: [1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5]
            },
            p2: {
                info: "Damage",
                myInfo: "[x6]",
                type: "tru",
                child: ["p1Var"],
                multiplier: 600
            },
        },
        sInfo0: {
            active: true,
        },
        sInfo2: {
            e2: {
                type: "phys",
                spell: true
            },
            e1: {
                type: "phys",
                child: ["a1", "f1Var"]
            },
            f1Var: {
                link: "bonusattackdamage",
                coeff: 0.25
            },
            f2: {
                type: "phys",
                effectNo: 2,
                value: [90, 120, 150, 180, 210],
                child: ["f2Var", "f2Var2"]
            },
            f2Var: {
                link: "bonusattackdamage",
                coeff: 2.1
            },
            f2Var2: {
                link: "spelldamage",
                coeff: 1.2
            }
        },
        sInfo3: {
            active: true
        }
    },
    Udyr: {
        buffs: [{
                spell: "P",
                key: "p1",
                type: "flatmoveSpeed"
            },
            {
                spell: "P",
                key: "p2",
                type: "attackSpeed"
            },
            {
                spell: 0,
                key: "e2",
                type: "attackSpeed",
                active: true
            },
            {
                spell: 2,
                key: "e1",
                type: "percentmoveSpeed",
                active: true
            }
        ],
        sInfoP: {
            input: {
                type: "number",
                max: 3
            },
            p1: {
                info: "Movement",
                child: ["p1Var"]
            },
            p1Var: {
                inputId: "P",
                link: "input",
                coeff: 5
            },
            p2: {
                info: "PercentAttackSpeedMod",
                child: ["p2Var"]
            },
            p2Var: {
                inputId: "P",
                link: "input",
                coeff: 10
            },
        },
        sInfo0: {
            active: true,
            e1: {
                type: "phys",
                spell: true,
                child: ["f2Var"],
                basicAttack: true,
                dps: 3
            },
            f2Var: {
                link: "attackdamage",
                coeff: [1.2, 1.35, 1.5, 1.65, 1.8]
            }
        },
        sInfo1: {
            e3: {
                type: "heal",
                selfHeal: true,
                percentMax: true,
                child: ["f1Var"]
            },
            f1Var: {
                link: "percentMissingHp",
                coeff: 0.025
            },
            e1: {
                type: "shield",
                selfShield: true,
                child: ["a1"]
            }
        },
        sInfo2: {
            active: true
        },
        sInfo3: {
            e2: {
                type: "mag",
                spell: true,
                child: ["a1"],
                basicAttack: true,
                dps: 3
            },
            e1: {
                type: "mag",
                spell: true,
                child: ["a2"]
            }
        }
    },
    Urgot: {
        sInfoP: {
            p1: {
                info: "Damage",
                type: "phys",
                child: ["p1Var"]
            },
            p1Var: {
                link: "attackdamage",
                coeff: [0.4, 0.4, 0.4, 0.4, 0.4, 0.5, 0.5, 0.5, 0.65, 0.65, 0.8, 0.8, 0.9, 0.9, 1, 1, 1, 1]
            },
            p2: {
                info: ["Damage"],
                type: "phys",
                apply: "maxHp",
                valuePerLvl: [2, 2, 2, 2, 2, 3, 3, 3, 4, 4, 6, 6, 8, 8, 8, 8, 8, 8]
            }
        },
        sInfo0: {
            e2: {
                type: "phys",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo1: {
            e9: {
                type: "phys",
                spell: true,
                duration: 0.25,
                onHit: 0.33,
                child: ["f3Var"]
            },
            f3Var: {
                link: "attackdamage",
                coeff: [0.2, 0.24, 0.28, 0.32, 0.36]
            },
            e1: {
                type: "shield",
                selfShield: true,
                child: ["f2Var"]
            },
            f2Var: {
                link: "bonusHp",
                coeff: 0.3
            }
        },
        sInfo2: {
            e1: {
                type: "phys",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo3: {
            e1: {
                type: "phys",
                spell: true,
                child: ["a1"]
            }
        }
    },
    Varus: { //add selectable passive strength
        buffs: [{
            spell: "P",
            key: "p1",
            type: "attackSpeed",
            active: true
        }, ],
        sInfoP: {
            active: true,
            p1: {
                info: "PercentAttackSpeedMod",
                value: 20,
                child: ["p1Var"]
            },
            p1Var: {
                link: "bonusattackspeed",
                coeff: 0.15
            },
            p2: {
                info: ["categoryChampion", "PercentAttackSpeedMod"],
                value: 40,
                child: ["p2Var"]
            },
            p2Var: {
                link: "bonusattackspeed",
                coeff: 0.3
            }
        },
        sInfo0: {
            e1: {
                type: "phys",
                spell: true,
                child: ["a1"]
            },
            e2: {
                type: "phys",
                spell: true,
                child: ["a2"]
            }
        },
        sInfo1: {
            e1: {
                type: "mag",
                child: ["a1"],
                basicAttack: true,
                dps: 1
            },
            e2: {
                type: "mag",
                child: ["a2"],
                apply: "maxHp"
            },
            f2: {
                value: [6, 7, 8, 9, 10],
                type: "mag",
                apply: "missHp"
            },
            f1: {
                value: [9, 10.5, 12, 13.5, 15],
                type: "mag",
                apply: "missHp"
            }
        },
        sInfo2: {
            e1: {
                type: "phys",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo3: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        }
    },
    Vayne: { //add on hits, add selectable passive strength
        buffs: [{
                spell: 3,
                key: "e1",
                type: "attackdamage",
                active: true
            },
            {
                spell: 3,
                key: "e4",
                type: "flatmoveSpeed",
                active: true
            },
            {
                spell: "P",
                key: "p1",
                type: "flatmoveSpeed",
                active: true
            }
        ],
        sInfoP: {
            active: true,
            p1: {
                value: 30,
                info: "Movement"
            },
            p2: {
                value: 90,
                info: "Movement",
                myInfo: "[R]"
            }
        },
        sInfo0: {
            f1: {
                type: "phys",
                child: ["f1Var"]
            },
            f1Var: {
                link: "attackdamage",
                coeff: [0.5, 0.55, 0.6, 0.65, 0.7]
            }
        },
        sInfo1: {
            e1: {
                type: "tru",
                apply: "maxHp",
                dps: 3
            },
            e2: {
                type: "tru",
                dps: 3
            }
        },
        sInfo2: {
            e1: {
                type: "phys",
                spell: true,
                child: ["a1"]
            },
            f1: {
                effectNo: 1,
                type: "phys",
                spell: true,
                child: ["a1"],
                multiplier: 200
            }
        },
        sInfo3: {
            active: true
        }
    },
    Veigar: {
        buffs: [{
            spell: "P",
            key: "p1",
            type: "abilityPower"
        }],
        sInfoP: {
            input: {
                type: "number",
                max: 999999
            },
            p1: {
                info: "SpellDamage",
                child: ["p1Var"]
            },
            p1Var: {
                inputId: "P",
                link: "input",
                coeff: 1
            },
        },
        sInfo0: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo1: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo3: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            },
            e2: {
                type: "mag",
                spell: true,
                child: ["a2"]
            }
        }
    },
    Velkoz: {
        sInfoP: {
            p1: {
                info: "Damage",
                type: "tru",
                value: 25,
                child: ["p1Var", "p1Var2"]
            },
            p1Var: {
                link: "champLevel",
                coeff: 8
            },
            p1Var2: {
                link: "spelldamage",
                coeff: 0.5
            }
        },
        sInfo0: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo1: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            },
            e2: {
                type: "mag",
                spell: true,
                child: ["a2"]
            }
        },
        sInfo2: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo3: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        }
    },
    Vi: { //e is both auto attack and spell
        buffs: [{
            spell: 1,
            key: "e2",
            type: "attackSpeed",
            active: true
        }],
        debuff: [{
            name: "PercentArmorPen",
            value: 0.2,
            img: "spell/ViW.png"
        }],
        sInfoP: {
            p1: {
                info: "Defense",
                type: "shield",
                selfShield: true,
                child: ["p1Var"]
            },
            p1Var: {
                link: "maxHp",
                coeff: 0.1
            }
        },
        sInfo0: {
            e1: {
                type: "phys",
                spell: true,
                child: ["a1"],
                multiplier: 50
            },
            f2: {
                effectNo: 1,
                type: "phys",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo1: {
            active: true,
            e1: {
                type: "phys",
                apply: "maxHp",
                child: ["f1Var"],
                basicAttack: true
            },
            f1Var: {
                link: "bonusattackdamage",
                coeff: 0.029
            }
        },
        sInfo2: {
            e1: {
                type: "phys",
                spell: true,
                child: ["a1", "f3"],
                basicAttack: true
            }
        },
        sInfo3: {
            e1: {
                type: "phys",
                spell: true,
                child: ["a1"]
            }
        }
    },
    Viktor: {
        buffs: [{
            spell: 0,
            key: "e3",
            type: "percentmoveSpeed",
            active: true
        }],
        sInfo0: {
            active: true,
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            },
            e5: {
                type: "mag",
                child: ["a2"],
                basicAttack: true
            },
            f1: {
                type: "shield",
                selfShield: true,
                child: ["f1Var", "f2Var"]
            },
            f1Var: {
                link: "mana",
                coeff: 0.08
            },
            f2Var: {
                link: "spelldamage",
                coeff: 0.15
            }
        },
        sInfo2: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            },
            e2: {
                type: "mag",
                spell: true,
                child: ["a2"]
            }
        },
        sInfo3: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            },
            e2: {
                type: "mag",
                spell: true,
                child: ["a2"]
            }
        }
    },
    Vladimir: { //add debuff for ult damage increase
        sInfo0: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            },
            e2: {
                type: "heal",
                selfHeal: true,
                child: ["a2"]
            },
            e5: {
                child: ["f6Var"]
            },
            f6Var: {
                link: "spelldamage",
                coeff: 0.04
            }
        },
        sInfo1: {
            e1: {
                type: "mag",
                spell: true,
                child: ["f1Var"],
                duration: 2,
                ticks: 2,
                multiplier: 50
            },
            f1Var: {
                link: "maxHp",
                coeff: 0.1
            }
        },
        sInfo2: {
            f3: {
                child: ["f3Var"]
            },
            f3Var: {
                link: "maxHp",
                coeff: 0.08
            },
            e3: {
                type: "mag",
                spell: true,
                child: ["a1", "f2Var"]
            },
            f2Var: {
                link: "maxHp",
                coeff: 0.025
            },
            e0: {
                type: "mag",
                spell: true,
                child: ["a2", "f4Var"]
            },
            f4Var: {
                link: "maxHp",
                coeff: 0.06
            }
        },
        sInfo3: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            },
            f4: {
                effectNo: 1,
                type: "heal",
                selfHeal: true,
                spell: true,
                child: ["a1"]
            }
        }
    },
    Volibear: { //add multiplier based on missing enemy health on w
        buffs: [{
                spell: 0,
                key: "e4",
                type: "percentmoveSpeed",
                active: true
            },
            {
                spell: 1,
                key: "wBuff",
                type: "attackSpeed"
            }
        ],
        sInfoP: {
            p1: {
                info: ["SpecialRecipeLarge", "HealthRegen"],
                type: "heal",
                child: ["p1Var"]
            },
            p1Var: {
                link: "maxHp",
                coeff: 0.3
            }
        },
        sInfo0: {
            active: true,
            e1: {
                type: "phys",
                basicAttack: true
            }
        },
        sInfo1: {
            e3: {
                type: "phys",
                spell: true,
                child: ["f1Var"]
            },
            f1Var: {
                link: "maxHp",
                coeff: 0.15
            },
            input: {
                type: "number",
                max: "3"
            },
            wBuff: {
                child: ["wVar"]
            },
            wVar: {
                inputId: "1",
                link: "input",
                coeff: [4, 8, 12, 16, 20]
            }
        },
        sInfo2: {
            e2: {
                type: "mag",
                spell: true,
                child: ["a1"]
            },
            e5: {
                type: "mag",
                child: ["a2"]
            }
        },
        sInfo3: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            },
            e1a: {
                type: "mag",
                spell: true,
                child: ["a1"],
                basicAttack: true,
                dps: 1
            }
        }
    },
    Warwick: { //add w passive based on enemy missing health, on hit on ult
        buffs: [{
                spell: 1,
                key: "e1",
                type: "percentmoveSpeed",
                active: true
            },
            {
                spell: 1,
                key: "e2",
                type: "attackSpeed",
                active: true
            },
            {
                spell: 2,
                key: "e1",
                type: "dmgReduction",
                active: true
            }
        ],
        sInfoP: {
            p1: {
                info: "magicDamage",
                type: "mag",
                value: 8,
                child: ["p1Var"],
                dps: 1
            },
            p1Var: {
                link: "champLevel",
                coeff: 2
            },
            p2: {
                info: ["SpecialRecipeLarge", "HealthRegen"],
                myInfo: "<50%",
                type: "heal",
                selfHeal: true,
                value: 8,
                child: ["p1Var"]
            },
            p3: {
                info: ["SpecialRecipeLarge", "HealthRegen"],
                myInfo: "<25%",
                type: "heal",
                selfHeal: true,
                value: 24,
                child: ["p3Var"]
            },
            p3Var: {
                link: "champLevel",
                coeff: 6
            },
        },
        sInfo0: {
            a1: {
                type: "mag",
                spell: true,
                onHit: 1,
                child: ["a1", "a2"]
            },
            e1: {
                type: "mag",
                apply: "maxHp"
            }
        },
        sInfo1: {
            active: true
        },
        sInfo2: {
            active: true
        },
        sInfo3: {
            e7: {
                type: "mag",
                spell: true,
                child: ["a1"],
                onHit: 3
            }
        }
    },
    Xayah: { //e scales with crit chance by percent
        buffs: [{
            spell: 1,
            key: "e1",
            type: "attackSpeed",
            active: true
        }],
        sInfo0: {
            f1: {
                effectNo: 1,
                type: "phys",
                child: ["f2Var"]
            },
            f2Var: {
                link: "bonusattackdamage",
                coeff: 1
            }
        },
        sInfo1: {
            active: true,
        },
        sInfo2: {
            e1: {
                type: "phys",
                spell: true,
                critChanceMulti: 0.5,
                child: ["f3Var"]
            },
            f3Var: {
                link: "bonusattackdamage",
                coeff: 0.6
            }
        },
        sInfo3: {
            e1: {
                type: "phys",
                spell: true,
                child: ["a1"]
            }
        }
    },
    Xerath: {
        sInfoP: {
            p1: {
                info: "Mana",
                valuePerLvl: [30, 33, 36, 42, 48, 54, 63, 72, 81, 90, 102, 114, 126, 138, 150, 165, 180, 195]
            },
            p2: {
                info: ["categoryChampion", "Mana"],
                valuePerLvl: [60, 66, 72, 84, 96, 108, 126, 144, 162, 180, 204, 228, 252, 276, 300, 330, 360, 390]
            }
        },
        sInfo0: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo1: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            },
            f1: {
                effectNo: 1,
                type: "mag",
                spell: true,
                child: ["a1"],
                multiplier: 150
            }
        },
        sInfo2: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo3: {
            e3: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        }
    },
    XinZhao: { //cast time reduced by attack speed on spell 1
        buffs: [{
            spell: 2,
            key: "e3",
            type: "attackSpeed",
            active: true
        }],
        sInfoP: {
            p1: {
                info: "Damage",
                type: "phys",
                child: ["p1Var"],
                dps: 3
            },
            p1Var: {
                link: "attackdamage",
                coeff: [0.15, 0.15, 0.15, 0.15, 0.15, 0.25, 0.25, 0.25, 0.25, 0.25, 0.35, 0.35, 0.35, 0.35, 0.35, 0.45, 0.45, 0.45]
            },
            p2: {
                info: ["SpecialRecipeLarge", "HealthRegen"],
                value: 5,
                type: "heal",
                selfHeal: true,
                child: ["p2Var", "p2Var2", "p2Var3"]
            },
            p2Var: {
                link: "attackdamage",
                coeff: 0.1
            },
            p2Var2: {
                link: "spelldamage",
                coeff: 0.4
            },
            p2Var3: {
                link: "champLevel",
                coeff: 3
            },
        },
        sInfo0: {
            e1: {
                type: "phys",
                child: ["f1Var"],
                basicAttack: true
            },
            f1Var: {
                link: "bonusattackdamage",
                coeff: 0.4
            }
        },
        sInfo1: {
            e1: {
                type: "phys",
                spell: true,
                child: ["a1"]
            },
            e2: {
                type: "phys",
                spell: true,
                child: ["a2"]
            }
        },
        sInfo2: {
            active: true,
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo3: {
            e1: {
                type: "phys",
                spell: true,
                child: ["a1"]
            },
            e2: {
                type: "phys",
                apply: "maxHp"
            }
        }
    },
    Yasuo: { //ult gives critical strikes extra armor pen
        aSpdBonus: 0.04,
        sInfoP: {
            p1: {
                info: "Defense",
                type: "shield",
                selfShield: true,
                valuePerLvl: [100, 105, 110, 115, 120, 130, 140, 150, 165, 180, 200, 225, 255, 290, 330, 380, 440, 510]
            }
        },
        sInfo0: {
            "f2.0": {
                value: [20, 45, 70, 95, 120],
                type: "phys",
                spell: true,
                child: ["f3Var"],
                onHit: 1,
                crit: [80]
            },
            f3Var: {
                link: "attackdamage",
                coeff: 1
            }
        },
        sInfo2: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1", "f3Var"]
            },
            f3Var: {
                link: "bonusattackdamage",
                coeff: 0.2
            }
        },
        sInfo3: {
            e1: {
                type: "phys",
                spell: true,
                child: ["a1"]
            }
        }
    },
    Yorick: {
        buffs: [{
            spell: 2,
            key: "e5",
            type: "percentmoveSpeed",
            active: true
        }, ],
        sInfo0: {
            e1: {
                type: "phys",
                spell: true,
                child: ["a1"],
                basicAttack: true
            },
            f1: {
                valuePerLvl: [12, 14, 16, 18, 20, 22, 26, 30, 34, 38, 42, 46, 52, 58, 64, 70, 76, 82],
                selfHeal: true,
                type: "heal"
            }
        },
        sInfo2: {
            active: true,
            e7: {
                type: "mag",
                spell: true,
                apply: "currHp"
            },
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo3: {
            e3: {
                child: ["f1Var"]
            },
            f1Var: {
                link: "maxHp",
                coeff: 0.3
            },
            e4: {
                type: "mag",
                child: ["f2Var"]
            },
            f2Var: {
                link: "attackdamage",
                coeff: 0.5
            },
            e5: {
                type: "mag",
                apply: "maxHp"
            }
        }
    },
    Zac: {
        aSpdBonus: 0.15,
        sInfoP: {
            p1: {
                info: ["SpecialRecipeLarge", "HealthRegen"],
                type: "heal",
                selfHeal: true,
                child: ["p1Var"]
            },
            p1Var: {
                link: "maxHp",
                coeff: 0.04
            },
            p2: {
                info: ["mobileCompanion", "Health"],
                child: ["p2Var"]
            },
            p2Var: {
                link: "maxHp",
                coeff: 0.12
            },
            p3: {
                info: ["mobileCompanion", "Armor"],
                child: ["p3Var"]
            },
            p3Var: {
                link: "armor",
                coeff: 0.5
            },
            p4: {
                info: ["mobileCompanion", "SpellBlock"],
                child: ["p4Var"]
            },
            p4Var: {
                link: "mr",
                coeff: 0.5
            },
        },
        sInfo0: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1", "f1Var"]
            },
            f1Var: {
                link: "maxHp",
                coeff: 0.025
            }
        },
        sInfo1: {
            e1: {
                type: "mag",
                spell: true
            },
            e3: {
                type: "mag",
                apply: "maxHp"
            }
        },
        sInfo2: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            },
            f2: {
                value: 0.5
            },
            f3: {
                value: 1
            }
        },
        sInfo3: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            },
            f1: {
                value: 1
            }
        }
    },
    Zed: { //ult steals percent of enemys ad
        sInfoP: {
            p1: {
                info: "magicDamage",
                type: "mag",
                valuePerLvl: [6, 6, 6, 6, 6, 6, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 10, 10],
                apply: "maxHp"
            },
        },
        sInfo0: {
            e1: {
                type: "phys",
                spell: true,
                child: ["a1"]
            },
            e3: {
                type: "phys",
                spell: true,
                child: ["a2"]
            }
        },
        sInfo2: {
            e1: {
                type: "phys",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo3: {
            a1: {
                type: "phys",
                spell: true,
                child: ["a1"]
            },
            e2: {
                multiplier: 10000
            }
        }
    },
    Ziggs: {
        sInfoP: {
            p1: {
                info: "magicDamage",
                type: "mag",
                valuePerLvl: [20, 24, 28, 32, 26, 40, 48, 56, 64, 72, 80, 88, 100, 112, 124, 136, 148, 160],
                child: ["p1Var"]
            },
            p1Var: {
                link: "spelldamage",
                coeff: [0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 1, 1, 1, 1, 1, 1]
            }
        },
        sInfo0: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo1: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            },
            f1: {
                value: [25, 27.5, 30, 32.5, 35]
            }
        },
        sInfo2: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo3: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        }
    },
    Zilean: {
        buffs: [{
            spell: 2,
            key: "e2",
            type: "percentmoveSpeed",
            active: true
        }],
        sInfo0: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo2: {
            active: true
        },
        sInfo3: {
            e1: {
                type: "heal",
                child: ["a1"]
            }
        }
    },
    Zoe: {
        buffs: [{
            spell: 1,
            key: "e9",
            type: "percentmoveSpeed",
            active: true
        }],
        sInfoP: {
            p1: {
                info: "magicDamage",
                type: "mag",
                valuePerLvl: [12, 15, 20, 25, 30, 35, 48, 53, 67, 73, 79, 86, 93, 100, 109, 117, 126, 135],
                child: ["p1Var"]
            },
            p1Var: {
                link: "spelldamage",
                coeff: 0.325
            }
        },
        sInfo0: {
            f1: {
                effectNo: 1,
                valuePerLvl: [7, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 29, 32, 35, 38, 42, 46, 50],
                spell: true,
                type: "mag",
                child: ["a1"]
            },
            f2: {
                effectNo: 1,
                valuePerLvl: [7, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 29, 32, 35, 38, 42, 46, 50],
                spell: true,
                type: "mag",
                child: ["a1"],
                multiplier: 250
            }
        },
        sInfo1: {
            active: true,
            e8: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        },
        sInfo2: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            },
            e6: {
                type: "tru",
                spell: true,
                child: ["a2"]
            }
        }
    },
    Zyra: {
        sInfo0: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            },
            f1: {
                type: "mag",
                value: 24,
                child: ["a2", "f1Var"],
                spell: true
            },
            f1Var: {
                link: "champLevel",
                coeff: 5
            }
        },
        sInfo1: {
            ammorechargetime: {
                child: ["ammorechargetimeVar"]
            },
            ammorechargetimeVar: {
                coeff: [20, 18, 16, 14, 12],
                link: "@cooldownchampion"
            }
        },
        sInfo2: {
            e1: {
                type: "mag",
                spell: true,
                child: ["a1"]
            },
            f1: {
                type: "mag",
                value: 24,
                child: ["a2", "f1Var"],
                spell: true
            },
            f1Var: {
                link: "champLevel",
                coeff: 5
            }
        },
        sInfo3: {
            e3: {
                type: "mag",
                spell: true,
                child: ["a1"]
            }
        }
    }
};