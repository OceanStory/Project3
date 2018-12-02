// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
function responseToJSON(response) {
  return response.json();
}
function displayDialogues(data) {
  console.log(data);
  dialogesList = data
    .map(function (dialogue) {
      return `<div class="dialogue" id="dialogue-${
        dialogue.id
        }"><p>${dialogue.content}</p><a href="/posts/1">Read more</a></div>`;
    })
    .join("");
  const DialogueDiv = document.querySelector("#dialogues");
  console.log(dialogesList);
  DialogueDiv.innerHTML = `${dialogesList}`;
}
function dispalyItems(data) {
  console.log(data);
}
function getDialogues() {
  fetch("/dialogues", {
    headers: { "Content-Type": "application/json", Accept: "application/json" }
  })
    .then(responseToJSON)
    .then(displayDialogues);
}
getDialogues();
