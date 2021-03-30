let selectedMeal;
let selectedDrink;
let selectedDessert;

function updateCheckoutStatus(){
  if (!selectedMeal) return;
  if (!selectedDrink) return;
  if (!selectedDessert) return;
} 

let mealGroup = document.getElementById("meals");
let mealArticles = mealGroup.querySelectorAll("ARTICLE");
mealArticles.forEach(item => {
  item.addEventListener("click", (e) => {
    let optionSelected = e.target;
    while (optionSelected.tagName != "ARTICLE"){
      optionSelected = optionSelected.parentNode; 
    }

    let checky;

    if (optionSelected === selectedMeal){
      selectedMeal.classList.remove("selected");
      checky = selectedMeal.querySelector(".checked");
      checky.classList.add("d-none");
      selectedMeal = undefined;
      return;
    }

    if (selectedMeal){
      selectedMeal.classList.remove("selected");
      checky = selectedMeal.querySelector(".checked");
      checky.classList.add("d-none");
    }

    selectedMeal = optionSelected;
    selectedMeal.classList.add("selected");
    checky = selectedMeal.querySelector(".checked");
    checky.classList.remove("d-none");
    
    updateCheckoutStatus();
  })
});






function pick(group, item){

}