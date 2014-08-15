

function bindEvents() {
  $("textarea")[0].focus();

  //$("textarea").val("Paní nováková Spor o mikrotužku rekordní odškodnění kvůli jarnímu chybám při porodu ve vinohradské fakultní nemocnici po pěti letech spěje ke konci. Nemocnice a rodina těžce postiženého Vojty podepsaly mimosoudní dohodu, jež chlapci přiznává odškodnění ve výši zhruba 20 milionů korun. Původně jim prvoinstanční soud přiznal víc než 30 milionů. Vázlerovi vezmou zpět žaloby, kterými se odškodnění domáhali.");

  $("textarea").on("keydown", handleChange);
  $("textarea").on("keyup", handleChange);
  $("textarea").on("paste", handleChange);

  handleChange();

}

window.lastText = "";

function handleChange() {
  var text = $("textarea").val();

  if (window.lastText == text) {
    return;
  }

  window.lastText = text;

  text = translate(text);

  $("#translated").text(text);
}


function translate(text) {

  var changed = text + " ";

  changed = changed.replace(/,/g, " ,");
  changed = changed.replace(/\./g, " .");
  changed = changed.replace(/\?/g, " ?");
  changed = changed.replace(/\!/g, " !");

  changed = changed.replace(/\. /g, ".\t");
  changed = changed.replace(/\? /g, "?\t");
  changed = changed.replace(/\! /g, "!\t");


  sentences = changed.split("\t")

  sentences = translateSentences(sentences);

  var ret = sentences.join(" ");

  ret = ret.replace(/ \!/g, "!");
  ret = ret.replace(/ \?/g, "?");
  ret = ret.replace(/ \./g, ".");
  ret = ret.replace(/ \,/g, ",");


  return ret;
}

function insertStr(str, position, ins) {
  var bef = str.substr(0, position);
  var aft = str.substr(position);
  return bef + ins + aft;
}

function randomSentence() {
  var random = [
    "Inferno.",
    "True story.",
    "Epic.",
    "Peklo.",
    "Bloody hell.",
    "Seriously.",
    "V pořádku.",
    "Bohuželky.",
    "Džízis.",
    "Made my day.",
    "Zmikundi."
  ];

  var rand = Math.floor(Math.random() * random.length);

  return " " + random[rand];
}

function translateSentences(sentences) {
  var ret = [];

  if (sentences.length > 3) {
    ret.push("Papka Méra!\n");
  }

  sentences.forEach(function(sen) {

    var ok = true;
    var pos = 0;

    sen = " " + sen;


    pos = sen.search(/ \d\d\d\d /)
    if (pos >= 0) {
      sen = insertStr(sen, pos, " so");
    }


    sen = sen.replace(/ [Vv]oda /, " rum ");
    sen = sen.replace(/ [Vv]ody /, " rumu ");
    sen = sen.replace(/ [Vv]odou /, " rumem ");
    sen = sen.replace(/ [Vv]odě /, " rumu ");

    sen = sen.replace(/ [Vv]odní /, " rumový ");
    sen = sen.replace(/ [Vv]odu /, " rum ");
    sen = sen.replace(/ [Vv]odního /, " rumovýho ");
    sen = sen.replace(/ [Vv]odním /, " rumovým ");
    sen = sen.replace(/ [Vv]odních /, " rumových ");

    sen = sen.replace(/ [A|a]ndroid /, " iPhone ");
    sen = sen.replace(/ [A|a]ndroidu /, " iPhonu ");
    sen = sen.replace(/ [A|a]ndroidem /, " iPhonem ");

    sen = sen.replace(" Jav(a|y|ou|ový|ovský|ě) ", " Objective-C ");

    sen = sen.replace(/ [Mm]ikrotužka /, " pentilka ");
    sen = sen.replace(/ [Mm]ikrotužky /, " pentilky ");
    sen = sen.replace(/ [Mm]ikrotužkou /, " pentilkou ");
    sen = sen.replace(/ [Mm]ikrotužce /, " pentilce ");
    sen = sen.replace(/ [Mm]ikrotužku /, " pentilku ");

    sen = sen.replace(/ [Pp]aní [^ ]+ová /g, " Paní Semerádová ");
    sen = sen.replace(/ [Pp]aní [^ ]+ové /g, " Paní Semerádové ");
    sen = sen.replace(/ [Pp]aní [^ ]+ovou /g, " Paní Semerádovou ");

    pos = sen.search(/ [^ ]+(ší|é|ou|ými|ím|ího|ímu) /)
    if (pos >= 0) {
      sen = insertStr(sen, pos, " nejvíc");
    }

    if ((sentences.length > 1 && sen.length > 3) || sentences.length == 1) {
      sen = sen + randomSentence();
    }


    sen = sen.trim();
    ret.push(sen);
  }, this);

  if (sentences.length > 3) {
    ret.push("\nDuhy a jednorožci!");
  }

  return ret;

}


$(document).ready(bindEvents)
