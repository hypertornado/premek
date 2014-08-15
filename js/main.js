

function bindEvents() {
  $("textarea")[0].focus();

  $("textarea").on("keydown", handleChange);
  $("textarea").on("paste", handleChange);

}

function handleChange() {
  var text = $("textarea").val();

  text = translate(text);

  $("#translated").text(text);
}


function translate(text) {
  return text + "EE";
}

$(document).ready(bindEvents)
