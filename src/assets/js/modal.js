var modal = document.getElementsByClassName("modal")[0];

// Get the button that opens the modal
var openModal = document.getElementsByClassName("openModal")[0];

// Get the <span> element that closes the modal
var closeModal = document.getElementsByClassName("closeModal")[0];

// When the user clicks on the button, open the modal
openModal.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
closeModal.onclick = function() {
  modal.style.display = "none";
}