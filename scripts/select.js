let checkoutFooter = document.querySelector("FOOTER");
let checkoutButton = checkoutFooter.querySelector("BUTTON");
let selectedMeal;
let selectedDrink;
let selectedDessert;
let selectedArr = [selectedMeal, selectedDrink, selectedDessert];
let selectSectionIDs = ["meals", "drinks", "desserts"];
let orderName;
let orderAddress;
let checkoutScreen = document.querySelector(".checkout-background");
let placeOrder = document.querySelector(".confirm");

function updateCheckoutStatus(selectedArr){
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

checkoutButton.addEventListener("click", (e) => {
  if (checkoutButton.disabled) return;
  // orderName = prompt("Digite o seu nome");
  // orderAddress = prompt("Digite o seu endereco");
  checkoutScreen.classList.remove("d-none");
  let orderBox = document.querySelector(".order");
  let oLine;
  let oItem;
  let oPrice;
  let priceCount = 0;
  let total;
  let totalStr;
  for (let i=0; i<selectedArr.length; i++){
    oLine = document.createElement("DIV");
    oItem = document.createElement("P");
    oItem.appendChild(document.createTextNode(selectedArr[i].querySelector("H3").textContent));
    oLine.appendChild(oItem);
    oItem = document.createElement("P");
    oPrice = selectedArr[i].querySelector(".unit-price").textContent;
    oItem.appendChild(document.createTextNode(oPrice));
    oLine.appendChild(oItem);
    oLine.classList.add("order-line");
    orderBox.appendChild(oLine);
    tempStr = oPrice;
    tempStr = tempStr.replace("R$","");
    tempStr = tempStr.replace(" ", "");
    tempStr = tempStr.replace(",","");
    priceCount += parseInt(tempStr, 10);
    total = priceCount/100;
    totalStr = "R$ " + total.toFixed(2).toString().replace(".",",");
  }
  oLine = document.createElement("DIV");
  oItem = document.createElement("STRONG");
  oItem.appendChild(document.createTextNode("TOTAL"));
  oLine.appendChild(oItem);
  oItem = document.createElement("STRONG");
  oItem.appendChild(document.createTextNode(totalStr));
  oLine.appendChild(oItem);
  oLine.classList.add("order-line");
  orderBox.appendChild(oLine);
});


let cancelOrder = document.querySelector(".cancel");
cancelOrder.addEventListener("click", (e) => {
  checkoutScreen.classList.add("d-none");
});
