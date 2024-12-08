import React, { useState, useEffect } from "react";

const StringFlasher = ({ speed, level, totalTimer, currentTimer, onSequenceEnd }) => {
  const [currentString, setCurrentString] = useState(generateStringForLevel(level));
  const [sequenceCount, setSequenceCount] = useState(0);

  useEffect(() => {
    if (currentTimer === 0) {
      setCurrentString(generateStringForLevel(level));
      setSequenceCount((prevCount) => {
        if (prevCount >= 9) {
          onSequenceEnd();
          return 0;
        }
        return prevCount + 1;
      });
    }
  }, [currentTimer, level, onSequenceEnd]);

  const getColor = () => {
    return currentTimer >= totalTimer / 2 ? "white" : "black";
  };

  return (
    <div style={{
      fontSize: "2em", textAlign: "center",
      marginTop: "20px", height: "100px", marginBottom: "20px", color: getColor()
    }}>
      {currentString}
    </div>
  );
};

const getRandomVowel = () => {
  const vowels = ["a", "aa", "au", "e", "ee", "ei", "eu", "i", "ie", "ij", "o", "oe", "oo", "ou", "u", "ui", "uu"];
  return vowels[Math.floor(Math.random() * vowels.length)];
};

const getRandomConsonant = () => {
  const consonants = "bcdfghklmnpqrstvwxyz".split(""); // Update this line with Dutch consonants if needed
  return consonants[Math.floor(Math.random() * consonants.length)];
};

const cvcWords = [
  "laag", "koud", "meel", "zon", "buur", "koor", "pit", "mees", "haar", "zuur", "boer", "poos",
  "taak", "tik", "beer", "doos", "deuk", "foor", "guur", "mier", "haas", "jaar", "kool", "ril",
  "leem", "maan", "noem", "paal", "raar", "lauw", "zool", "som", "kus", "teer", "veer", "gauw",
  "waar", "roos", "boos", "lijk", "taal", "weer", "luik", "baas", "deel", "faam", "goot", "haag",
  "dier", "jaag", "loom", "feit", "muur", "naar", "vos", "puur", "raam", "kees", "vies", "voor",
  "waas", "zaag", "boog", "pas", "deeg", "huur", "ras", "maag", "win", "kuur", "pees", "roep",
  "saus", "vaar", "wees", "les", "zeef", "kaas", "neep", "rook", "beuk", "duur", "buit", "geef",
  "beet", "huid", "dool", "wijs", "geel", "been", "vaal", "bier", "nam", "week", "gaaf", "daas",
  "goud", "baal", "tuk", "kaal", "boom", "teek", "laak", "hout", "heer", "met", "leer", "min",
  "hoog", "gaar", "zout", "lees", "beek", "teen", "soep", "hoor", "look", "fel", "maal", "keel",
  "meid", "veel", "zaal", "baar", "muis", "gaas", "lach", "pak", "geen", "kaak", "sip", "haan",
  "laat", "peen", "weeg", "sul", "reed", "laaf", "koer", "laan", "maat", "kier", "beef", "pil",
  "maak", "leef", "kaap", "peer", "noot", "zeer", "rap", "mat", "boot", "raad", "keer", "mouw",
  "baat", "gil", "tier", "waak", "nies", "geur", "waag", "meer", "zuil", "zaad", "rood", "ken",
  "paar", "put", "veeg", "faal", "hier", "waal", "boor", "meet", "keet", "bil", "dak", "tal",
  "tas", "tak", "tam", "kat", "dag", "das", "man", "kap", "pan", "bad", "tel", "tem", "bel",
  "den", "nel", "del", "vel", "hel", "men", "hem", "rek", "nek", "tol", "top", "tor", "dop",
  "dom", "fop", "mop", "zot", "bom", "bon", "won", "dit", "dik", "lik", "mik", "sik", "kik",
  "wis", "nis", "bil", "vil", "gil", "lis", "dun", "nul", "luk", "buk", "zul", "kun", "puk",
  "vul", "ruk", "hun", "vaak", "daar", "baan", "zaak", "haal", "gaap", "raak", "daal", "teef",
  "meen", "zeep", "neem", "zeem", "keek", "reep", "leeg", "leed", "heen", "neet", "woon", "toog",
  "poot", "doof", "zoon", "hoop", "loop", "toon", "pook", "tuur", "fuut", "vuur", "duif", "duim",
  "buik", "huis", "luis", "kuis", "puik", "duik", "ruik", "kuif", "deur", "reus", "neus", "peuk",
  "geul", "zeur", "beul", "peul", "reuk", "saus", "pauw", "fout", "mouw", "dauw", "vouw", "touw",
  "diep", "dief", "lief", "viel", "wier", "ziel", "zien", "hiel", "riep", "doek", "doel", "zoen",
  "koel", "moer", "poel", "loep", "voel", "boen", "geit", "vijl", "zeil", "fijn", "reis", "hijs",
  "zeis", "heil", "bijl", "pijl"
];

const ccvcWords = ["stol", "stop", "stof", "staak", "span", "spat", "spar", "spaak", "spaar", "spaan", "knal", "knap", "knak", "knol", "knot", "trom", "trok", "tros", "mens", "lomp", "lacht", "mast", "mals", "zacht", "half", "baard", "zegt", "palm", "balk", "kaars", "tref", "trek", "tram", "kraan", "kraal", "kraag", "kruin", "kruip", "kras", "krap", "krat", "kroon", "kroos", "kroop", "ster", "stel", "slak", "slag", "slaan", "slap", "vlam", "vlek", "vlot", "vloer", "vloot", "bloes", "blos", "bleek", "blik", "slim", "slip", "vlag", "vlam", "vlak", "blaat", "blaar", "kans", "dans", "kilt", "kalk", "puist", "geest", "post", "land", "rest", "merg", "feest", "held", "geld", "valt", "halt", "mond", "mild", "rits", "sloot", "slot", "sluit", "slaat", "slijt", "vlieg", "vloog", "vlug", "vlaag", "blaas", "bloos", "blad", "blus", "blies", "blaf", "blijf", "bluf", "bleef", "bloot", "slaap", "sluis", "sloop", "sloom", "slof", "slok", "slik", "bruin", "pruik", "dreun", "praat", "bril", "prop", "bloem", "prik", "knoop", "spook", "pluim", "proef", "knaap", "troon", "kleur", "kruk", "traan", "drum", "stoel", "krijt", "krom", "spoor", "spot", "blik", "brom", "broek", "troep", "knor", "trap", "dril", "ster", "pret", "spel", "scheen", "kort", "trok", "krul", "pels", "blus", "kurk", "kreuk", "vlek", "mens", "hurk", "vers", "druk", "graaf", "graas", "graat", "groet", "groen", "groep", "gras", "grap", "graf", "grot", "grom", "grof", "brok", "bros", "pruim", "pruik", "pruil", "draaf", "draak", "draag", "droom", "droog", "droop", "speel", "speer", "speet", "spel", "sper", "spin", "spit", "spil", "steen", "steek", "lijst", "lijkt", "stil", "stik", "step", "stem", "stal", "stap", "staf", "staat", "staaf", "staaf", "staal", "stook", "stoom", "bleef", "bloem", "blaar", "blok", "glas", "gluur", "mals", "hals", "melk", "zeurt", "mest", "kast", "help", "hark", "merk", "zaagt", "poets", "mast", "kalf", "park", "darm", "tiert", "merg", "beest", "pest", "koets", "leest", "helm", "warm", "kaft", "klop", "klok", "klos", "klas", "klap", "klam", "klaas", "klaar", "klage", "plat", "plak", "zweep", "zweef", "zweer", "snoep", "snoek", "snoes", "smeet", "smeer", "smeek", "klim", "klip", "vlam", "klik", "pips", "berg", "zorg", "schop", "soms", "gems", "test", "schor", "schil", "schip", "schik", "korf", "durf", "vonk", "plak", "bleek", "denk", "steun", "pluis", "slijp", "pluk", "rups", "stuur", "hark", "verf", "flik", "slak", "vrag", "glas", "fruit", "pont", "vroeg", "dwaal", "kluif", "snuit", "hert", "smul", "kleur", "fluit", "vlug", "kort", "gips", "plan", "braam", "grap", "fris", "grijs", "graf", "druif", "prul", "woest", "haast", "prul", "drop", "stik", "kers", "rasp", "wilg", "slap", "graaf", "draf", "druk", "knip", "bruin", "tril", "kraal", "pomp", "lomp", "step", "wesp", "nors", "snaar", "bots", "stak", "kaats", "staak", "naars", "post", "kust", "rups", "sleep", "sliep", "sloep", "sluip", "bloes", "bloot", "bleek", "blik", "blaat", "blaar", "blaas", "bloos", "blos", "blus", "blies", "blaf", "blijf", "bluf", "bleef", "bloem", "blok", "braam", "bruin", "bril", "broek", "brok", "broos", "breek", "braaf", "bros", "brief", "broer", "bron", "braak", "dwaal", "dweil", "dweep", "draaf", "draak", "draag", "droom", "droog", "druif", "drop", "draf", "druk", "dreun", "drijf", "drum", "flik", "fluit", "fruit", "fris", "friet", "glas", "glad", "gleuf", "gloed", "gleed", "grap", "grijs", "graf", "graaf", "graas", "graat", "groet", "groen", "groep", "gras", "grot", "grom", "grof", "knal", "knap", "knak", "knol", "knot", "knip", "knoop", "knaap", "kneep", "knijp", "kraan", "kraal", "kraag", "kruin", "kruip", "kras", "krab", "krat", "kroon", "kroop", "kruk", "krijt", "krom", "krul", "kreuk", "klop", "klok", "klos", "klas", "klap", "klam", "klaar", "klaag", "klim", "klif", "klik", "kluif", "kleur", "plat", "plak", "pluis", "pluk", "plan", "pluim", "prul", "pruik", "praat", "pret", "prop", "prik", "proef", "pruim", "stop", "stof", "stok", "steek", "stil", "stik", "step", "stem", "stal", "stap", "staf", "staat", "staaf", "staal", "stook", "stoom", "ster", "stel", "steun", "stuur", "stak", "stoel", "steen", "span", "spat", "spar", "spaak", "spaar", "spaan", "spoor", "spot", "spel", "speel", "speer", "spin", "spit", "slak", "slag", "slaan", "slap", "slim", "slip", "slijp", "sleep", "sliep", "sloep", "sluip", "sloot", "slot", "sluit", "slaat", "slijt", "slaap", "sluis", "sloom", "slok", "slik", "spook", "speer", "spoor", "speel", "speur", "snoep", "snoek", "snoes", "snuit", "snaar", "smeet", "smeer", "smeek", "smul", "schop", "schor", "schil", "schip", "schik", "scheef", "scheen", "schep", "schaap", "trom", "trok", "tros", "tref", "trek", "trein", "traan", "trui", "troep", "trap", "vlam", "vlek", "vlot", "vloer", "vloot", "vlag", "vlak", "vlug", "vlieg", "vloog", "vraag", "vroeg", "vries", "vroor", "zweep", "zweef", "zweer", "zwaar", "zweet", "zwijn", "kaft"]
const cvccWords = ["hoofd", "leeft", "beeft", "weeft", "hoeft", "dooft", "zoeft", "larf", "verf", "korf", "durf", "werf", "kerf", "half", "kalf", "wolf", "elf", "zalf", "zelf", "zaagt", "lacht", "zacht", "zegt", "wacht", "ligt", "lucht", "vecht", "zucht", "buigt", "vocht", "zuigt", "legt", "kucht", "vacht", "macht", "veegt", "weegt", "voegt", "wiegt", "lijkt", "reikt", "bukt", "kijkt", "kookt", "bakt", "dekt", "lekt", "maakt", "ruikt", "zoekt", "denk", "vonk", "pink", "vink", "donk", "bink", "kink", "zink", "hark", "merk", "park", "kurk", "kerk", "werk", "vork", "jurk", "hurk", "merk", "perk", "melk", "balk", "kalk", "kolk", "dolk", "volk", "valk", "kelk", "wolk", "hals", "mals", "pels", "pols", "vals", "wals", "hels", "held", "kilt", "geld", "valt", "halt", "mild", "milt", "wilg", "telg", "galg", "walg", "velg", "help", "tulp", "pulp", "welp", "hulp", "palm", "helm", "zalm", "galm", "kalm", "film", "darm", "warm", "ferm", "worm", "vorm", "norm", "berm", "term", "lomp", "pomp", "kamp", "ramp", "lamp", "romp", "soms", "gems", "doms", "komt", "kamt", "gomt", "somt", "hemd", "remt", "rijmt", "lijmt", "land", "mond", "pond", "hand", "tand", "want", "lint", "rond", "hond", "munt", "wint", "vind", "pand", "rand", "band", "lont", "mand", "mens", "kans", "dans", "gans", "lens", "pens", "bons", "wens", "mans", "gips", "pips", "rups", "mops", "paps", "tips", "hapt", "piept", "wipt", "dopt", "tapt", "kapt", "lapt", "mept", "hoopt", "koopt", "gaapt", "loopt", "kaars", "kers", "vers", "nors", "pers", "hars", "bars", "beurs", "baard", "tiert", "hert", "kort", "zeurt", "beurt", "keurt", "kaart", "maart", "waard", "leert", "veert", "paard", "haard", "merg", "berg", "zorg", "terg", "mest", "kast", "mast", "beest", "leest", "pest", "puist", "joost", "rest", "feest", "post", "lijst", "test", "woest", "haast", "kust", "kist", "rasp", "wesp", "hesp", "gesp", "poets", "koets", "bots", "rits", "kaats", "fiets", "muts", "toets", "loods", "reeds", "knots", "klets"];

const vcWords = cvcWords.map(word => word.slice(1)); // Remove the first letter for VC
const cvWords = cvcWords.map(word => word.slice(0, -1)); // Remove the last letter for CV

const generateStringForLevel = (level) => {
  switch (level) {
    case 1:
      return getRandomVowel();
    case 2:
      return vcWords[Math.floor(Math.random() * vcWords.length)]; // Use VC words for level 2
    case 3:
      return cvWords[Math.floor(Math.random() * cvWords.length)]; // Use CV words for level 3
    case 4:
      return cvcWords[Math.floor(Math.random() * cvcWords.length)]; // Use CVC words for level 4
    case 5:
      return ccvcWords[Math.floor(Math.random() * ccvcWords.length)]; // Use CVCC words for level 5
    case 6:
      return cvccWords[Math.floor(Math.random() * cvccWords.length)]; // Use CVCC words for level 6
    default:
      return "";
  }
};

export default StringFlasher;




