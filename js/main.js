

function bindEvents() {
  $("textarea")[0].focus();

  //$("textarea").val("Paní nováková Spor o mikrotužku rekordní odškodnění kvůli jarnímu chybám při porodu ve vinohradské fakultní nemocnici po pěti letech spěje ke konci. Nemocnice a rodina těžce postiženého Vojty podepsaly mimosoudní dohodu, jež chlapci přiznává odškodnění ve výši zhruba 20 milionů korun. Původně jim prvoinstanční soud přiznal víc než 30 milionů. Vázlerovi vezmou zpět žaloby, kterými se odškodnění domáhali.");

  $("textarea").on("keydown", handleChange);
  $("textarea").on("keyup", handleChange);
  $("textarea").on("paste", handleChange);

  handleChange();

}

function handleChange() {
  var text = $("textarea").val();

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


    sen = sen.replace(" voda ", " rum ");
    sen = sen.replace(" vody ", " rumu ");
    sen = sen.replace(" vodou ", " rumem ");
    sen = sen.replace(" vodě ", " rumu ");

    sen = sen.replace(" vodní ", " rumový ");
    sen = sen.replace(" vodního ", " rumovýho ");
    sen = sen.replace(" vodním ", " rumovým ");
    sen = sen.replace(" vodních ", " rumových ");

    sen = sen.replace(/ [A|a]ndroid /, " iPhone ");
    sen = sen.replace(/ [A|a]ndroidu /, " iPhonu ");
    sen = sen.replace(/ [A|a]ndroidem /, " iPhonem ");

    sen = sen.replace(" Jav(a|y|ou|ový|ovský|ě) ", " Objective-C ");

    sen = sen.replace(" mikrotužka ", " pentilka ");
    sen = sen.replace(" mikrotužky ", " pentilky ");
    sen = sen.replace(" mikrotužkou ", " pentilkou ");
    sen = sen.replace(" mikrotužce ", " pentilce ");
    sen = sen.replace(" mikrotužku ", " pentilku ");

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
