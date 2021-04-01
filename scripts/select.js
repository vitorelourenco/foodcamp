//needed for checkout
//global vars used inside functions
const selectedArr = [undefined, undefined, undefined];
let totalStr;
let orderName;
let orderAddress;
//

function updateCheckoutStatus(selectedArr){
  const p = checkoutButton.querySelector("P");
  if (!selectedArr[0] || !selectedArr[1] || !selectedArr[2]){
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

const checkoutButton = document.querySelector("footer button");
const checkoutScreen = document.querySelector(".checkout-background");

const selectSectionIDs = ["meals", "drinks", "desserts"];


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

checkoutButton.addEventListener("click", () => {
  if (checkoutButton.disabled) return;
  orderName = prompt("Digite o seu nome");
  orderAddress = prompt("Digite o seu endereco");
  checkoutScreen.classList.remove("d-none");

  const checkoutLines = document.querySelectorAll(".order-line");
  let priceCount = 0;
  for (let i=0; i<selectedArr.length; i++){
    const firstP = checkoutLines[i].querySelector("p:first-child");
    const lastP = checkoutLines[i].querySelector("p:last-child");
    const item = selectedArr[i].querySelector("h3").textContent;
    const price = selectedArr[i].querySelector(".unit-price").textContent;

    firstP.textContent = item;
    lastP.textContent = price;

    let tempStr = price;
    tempStr = tempStr.replace("R$","");
    tempStr = tempStr.replace(" ", "");
    tempStr = tempStr.replace(",","");
    priceCount += parseInt(tempStr, 10);
  }

  const total = priceCount/100;
  totalStr = "R$ " + total.toFixed(2).toString().replace(".",",");
  document.querySelector("#total").textContent = totalStr;
});

const cancelOrder = document.querySelector(".cancel");
cancelOrder.addEventListener("click", () => {
  checkoutScreen.classList.add("d-none");
});

const placeOrder = document.querySelector(".confirm");
placeOrder.addEventListener("click", () => {
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
