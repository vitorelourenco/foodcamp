//needed for checkout
//global vars used inside functions
let orderName;
let orderAddress;
const checkoutButton = document.querySelector("footer button");
const checkoutScreen = document.querySelector(".checkout-background");
const selectSectionIDs = ["meals", "drinks", "desserts"];
//

function updateCheckoutStatus(){
  const p = checkoutButton.querySelector("P");
  if (!document.querySelector("#meals .selected") 
  || !document.querySelector("#drinks .selected") 
  || !document.querySelector("#desserts .selected")){
    checkoutButton.classList.remove("bg-green");
    checkoutButton.classList.add("bg-grey");
    p.innerHTML = "Selecione os 3 itens<br>para fechar o pedido";
    checkoutButton.classList.remove("pointer");
    checkoutButton.disabled = true;
    return;
  }
  p.innerHTML = "Fechar Pedido";
  checkoutButton.disabled = false;
  checkoutButton.classList.add("pointer");
  checkoutButton.classList.remove("bg-grey");
  checkoutButton.classList.add("bg-green");
}

for (let i=0; i<selectSectionIDs.length; i++){
  const currentGroup = document.getElementById(selectSectionIDs[i]);
  const currentArticles = currentGroup.querySelectorAll("ARTICLE");
  currentArticles.forEach(item => {
    item.addEventListener("click", (e) => {
      let optionSelected = e.target;
      while (optionSelected.tagName != "ARTICLE"){
        optionSelected = optionSelected.parentNode; 
      }

      let currentMenu = optionSelected;
      while (!currentMenu.classList.contains("menu")){
        currentMenu = currentMenu.parentNode;
      }

      const currentSelected = currentMenu.querySelector(".selected");

      let checky;

      if (optionSelected === currentSelected){
        currentSelected.classList.remove("selected");
        checky = currentSelected.querySelector(".checked");
        checky.classList.add("d-none");
        updateCheckoutStatus();
        return;
      }

      if (currentSelected){
        currentSelected.classList.remove("selected");
        checky = currentSelected.querySelector(".checked");
        checky.classList.add("d-none");
      }

      optionSelected.classList.add("selected");
      checky = optionSelected.querySelector(".checked");
      checky.classList.remove("d-none");
      
      updateCheckoutStatus();
    })
  })
}

checkoutButton.addEventListener("click", () => {
  if (checkoutButton.disabled) return;
  orderName = prompt("Digite o seu nome");
  orderAddress = prompt("Digite o seu endereco");
  checkoutScreen.classList.remove("d-none");

  const checkoutLines = document.querySelectorAll(".order-line");
  let priceCount = 0;
  for (let i=0; i<selectSectionIDs.length; i++){
    const firstP = checkoutLines[i].querySelector("p:first-child");
    const lastP = checkoutLines[i].querySelector("p:last-child");

    const selectedItem = document.querySelector(`#${selectSectionIDs[i]} .selected h3`);
    const item = selectedItem.textContent;
    firstP.textContent = item;

    const selectedPrice = document.querySelector(`#${selectSectionIDs[i]} .selected .unit-price`);
    const price = selectedPrice.textContent;
    lastP.textContent = price;

    let tempStr = price;
    tempStr = tempStr.replace("R$","");
    tempStr = tempStr.replace(" ", "");
    tempStr = tempStr.replace(",","");
    priceCount += parseInt(tempStr, 10);
  }

  const total = priceCount/100;
  const totalStr = "R$ " + total.toFixed(2).toString().replace(".",",");
  document.querySelector("#total").textContent = totalStr;
});

const cancelOrder = document.querySelector(".cancel");
cancelOrder.addEventListener("click", () => {
  checkoutScreen.classList.add("d-none");
});

const placeOrder = document.querySelector(".confirm");
placeOrder.addEventListener("click", () => {
  const selectedMeal = document.querySelector("#meals .selected h3").textContent;
  const selectedDrink = document.querySelector("#drinks .selected h3").textContent;
  const selectedDessert = document.querySelector("#desserts .selected h3").textContent;
  const message = 
`Ola, gostaria de fazer o pedido:\n
- Prato: ${selectedMeal}\n
- Bebida: ${selectedDrink}\n
- Sobremesa: ${selectedDessert}\n
Total: ${document.querySelector("#total").textContent}\n\n
Nome: ${orderName}\n
Endereco: ${orderAddress}\n`;
  const encodedOrder = encodeURIComponent(message);
  const fullUrl = "https://wa.me/5521971275567?text=" + encodedOrder;
  checkoutScreen.classList.add("d-none");
  window.open(fullUrl);
});
