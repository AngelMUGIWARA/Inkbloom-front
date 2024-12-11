 // Modal logic
 const modal = document.getElementById("myModal");
 const createDocumentBtn = document.getElementById("createDocumentBtn");
 const closeModal = document.getElementById("closeModal");
 const submitName = document.getElementById("submitName");
 const documentNameInput = document.getElementById("documentName");

 // Open the modal when clicking the "Crear Documento" button
 createDocumentBtn.addEventListener("click", function() {
     modal.style.display = "flex";
 });

 // Close the modal when clicking the "Cerrar" button
 closeModal.addEventListener("click", function() {
     modal.style.display = "none";
 });

 // Handle the form submission for naming the document
 submitName.addEventListener("click", function() {
     const documentName = documentNameInput.value.trim();

     if (documentName === "") {
         alert("Por favor, ingresa un nombre para el documento.");
     } else {
         // Redirect to AreaTrabajo.html if name is provided
         window.location.href = "AreaTrabajo.html";
     }
 });