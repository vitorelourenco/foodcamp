function updateCheckoutStatus(selectedArr){
  let checkoutFooter = document.querySelector("FOOTER");
  let checkoutButton = checkoutFooter.querySelector("BUTTON");
  let p = checkoutButton.querySelector("P");
  let textNode;

  if (!selectedArr[0] || !selectedArr[1] || !selectedArr[2]){
    checkoutButton.classList.remove("bg-green");
    checkoutButton.classList.add("bg-grey");
    p.innerHTML = "";
    textNode = document.createTextNode("Selecione os 3 itens");
    p.appendChild(textNode);
    p.appendChild(document.createElement("BR"));
    textNode = document.createTextNode("para fechar o pedido");
    p.appendChild(textNode);
    checkoutButton.classList.remove("pointer");
    checkoutButton.disabled = true;
    return;
  }
  p.innerHTML = "";
  textNode = document.createTextNode("Fechar Pedido");
  p.appendChild(textNode);
  checkoutButton.disabled = false;
  checkoutButton.classList.add("pointer");
  checkoutButton.classList.remove("bg-grey");
  checkoutButton.classList.add("bg-green");

} 

let selectedMeal;
let selectedDrink;
let selectedDessert;
let selectedArr = [selectedMeal, selectedDrink, selectedDessert];
let selectSectionIDs = ["meals", "drinks", "desserts"];


for (let i=0; i<selectedArr.length; i++){
  let currentGroup = document.getElementById(selectSectionIDs[i]);
  let currentArticles = currentGroup.querySelectorAll("ARTICLE");
  currentArticles.forEach(item => {
    item.addEventListener("click", (e) => {
      let optionSelected = e.target;
      while (optionSelected.tagName != "ARTICLE"){
        optionSelected = optionSelected.parentNode; 
      }

      let checky;

      if (optionSelected === selectedArr[i]){
        selectedArr[i].classList.remove("selected");
        checky = selectedArr[i].querySelector(".checked");
        checky.classList.add("d-none");
        selectedArr[i] = undefined;
        updateCheckoutStatus(selectedArr);
        return;
      }

      if (selectedArr[i]){
        selectedArr[i].classList.remove("selected");
        checky = selectedArr[i].querySelector(".checked");
        checky.classList.add("d-none");
      }

      selectedArr[i] = optionSelected;
      selectedArr[i].classList.add("selected");
      checky = selectedArr[i].querySelector(".checked");
      checky.classList.remove("d-none");
      
      updateCheckoutStatus(selectedArr);
    })
  })
}



// let mealGroup = document.getElementById("meals");
// let mealArticles = mealGroup.querySelectorAll("ARTICLE");
// mealArticles.forEach(item => {
//   item.addEventListener("click", (e) => {
//     let optionSelected = e.target;
//     while (optionSelected.tagName != "ARTICLE"){
//       optionSelected = optionSelected.parentNode; 
//     }

//     let checky;

//     if (optionSelected === selectedMeal){
//       selectedMeal.classList.remove("selected");
//       checky = selectedMeal.querySelector(".checked");
//       checky.classList.add("d-none");
//       selectedMeal = undefined;
//       return;
//     }

//     if (selectedMeal){
//       selectedMeal.classList.remove("selected");
//       checky = selectedMeal.querySelector(".checked");
//       checky.classList.add("d-none");
//     }

//     selectedMeal = optionSelected;
//     selectedMeal.classList.add("selected");
//     checky = selectedMeal.querySelector(".checked");
//     checky.classList.remove("d-none");
    
//     updateCheckoutStatus();
//   })
// });






function pick(group, item){

}