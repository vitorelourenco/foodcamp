function updateCheckoutStatus(selectedArr){
  const p = checkoutButton.querySelector("P");
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

const checkoutFooter = document.querySelector("FOOTER");
const checkoutButton = checkoutFooter.querySelector("BUTTON");
const checkoutScreen = document.querySelector(".checkout-background");

const selectSectionIDs = ["meals", "drinks", "desserts"];
const selectedArr = [undefined, undefined, undefined];

for (let i=0; i<selectedArr.length; i++){
  const currentGroup = document.getElementById(selectSectionIDs[i]);
  const currentArticles = currentGroup.querySelectorAll("ARTICLE");
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

let totalStr;
let orderName;
let orderAddress;

const orderBox = document.querySelector(".order");

checkoutButton.addEventListener("click", (e) => {
  if (checkoutButton.disabled) return;
  orderName = prompt("Digite o seu nome");
  orderAddress = prompt("Digite o seu endereco");
  checkoutScreen.classList.remove("d-none");
  orderBox.innerHTML = "";

  let oLine;
  let oItem;
  let oPrice;
  let priceCount = 0;
  let total;
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
  }

  total = priceCount/100;
  totalStr = "R$ " + total.toFixed(2).toString().replace(".",",");

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

const cancelOrder = document.querySelector(".cancel");
cancelOrder.addEventListener("click", (e) => {
  checkoutScreen.classList.add("d-none");
});

const placeOrder = document.querySelector(".confirm");
placeOrder.addEventListener("click", (e) => {
  const message = 
`Ola, gostaria de fazer o pedido:\n
- Prato: ${selectedArr[0].querySelector("H3").textContent}\n
- Bebida: ${selectedArr[1].querySelector("H3").textContent}\n
- Sobremesa: ${selectedArr[2].querySelector("H3").textContent}\n
Total: ${totalStr}\n\n
Nome: ${orderName}\n
Endereco: ${orderAddress}\n`;
  const encodedOrder = encodeURIComponent(message);
  const fullUrl = "https://wa.me/5521971275567?text=" + encodedOrder;
  checkoutScreen.classList.add("d-none");
  window.open(fullUrl);
});
