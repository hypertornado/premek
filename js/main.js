

function bindEvents() {
  $("textarea")[0].focus();

  $("textarea").val("Spor o rekordní odškodnění kvůli jarnímu chybám při porodu ve vinohradské fakultní nemocnici po pěti letech spěje ke konci. Nemocnice a rodina těžce postiženého Vojty podepsaly mimosoudní dohodu, jež chlapci přiznává odškodnění ve výši zhruba 20 milionů korun. Původně jim prvoinstanční soud přiznal víc než 30 milionů. Vázlerovi vezmou zpět žaloby, kterými se odškodnění domáhali.");

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

  ret.push("Papka Méra!\n");

  sentences.forEach(function(sen) {

    var ok = true;
    var pos = 0;


    pos = sen.search(/ \d\d\d\d /)
    if (pos >= 0) {
      sen = insertStr(sen, pos, " so");
    }

    pos = sen.search(/ [^ ]+(ší|é|ou|ými|ím|ího|ímu) /)
    if (pos >= 0) {
      sen = insertStr(sen, pos, " nejvíc");
    }

    sen = sen + randomSentence();


    sen = sen.trim();
    ret.push(sen);
  }, this);

  ret.push("\nDuhy a jednorožci!");

  return ret;

}


$(document).ready(bindEvents)
