//globals
let orderName;
let orderAddress;
const checkoutButton = document.querySelector("footer button");
const checkoutScreen = document.querySelector(".checkout-background");
const cancelOrder = document.querySelector(".cancel");
const placeOrder = document.querySelector(".confirm");
const selectSectionIDs = ["meals", "drinks", "desserts"];
//

//function that handles the state of the order button
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

//loop through all menu items, adding event listeners to all of them
//the event listener functions looks for and replaces the selected item
//if needed and then updates the checkoutstatus
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

      // uncomment the code bellow to enable item selection toggling
      // if (optionSelected === currentSelected){
      //   currentSelected.classList.remove("selected");
      //   checky = currentSelected.querySelector(".checked");
      //   checky.classList.add("d-none");
      //   updateCheckoutStatus();
      //   return;
      // }

      if (currentSelected !== null){
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

//Add the event listener that requests name/address
//and builds the checkout screen through the selected items
//if the order button is clicked
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
    tempStr = tempStr.replace("R$","").replace(" ", "").replace(",","");
    priceCount += parseInt(tempStr, 10);
  }

  const total = priceCount/100;
  const totalStr = "R$ " + total.toFixed(2).toString().replace(".",",");
  document.querySelector("#total").textContent = totalStr;
});

//Add event listener that closes the checkout screen
//if the cancel button is clicked
cancelOrder.addEventListener("click", () => {
  checkoutScreen.classList.add("d-none");
});

//Add event listener that builds the order message
//if the confirm order button is clicked 
//and shoots it to whatsapp
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
