const meals = [
  {
    imgsrc : "assets/images/decarne.jpeg",
    imgalt : "Pastelao de Carne",
    name : "Pastelao de Carne",
    description : "Sem misterios, aquele que voce ja conhece",
    price: "R$ 6,90"
  },
  {
    imgsrc : "assets/images/degorgonzola.jpg",
    imgalt : "Pastel de Gorgozola com Tomate Seco",
    name : "Pastelao de Gorgonzola com Tomate Seco",
    description : "Experimenta!",
    price: "R$ 9,90"
  },
  {
    imgsrc : "assets/images/depalmito.webp",
    imgalt : "Pastel de Palmito",
    name : "Pastelao de Palmito",
    description : "Melhor que o da feira! Juro!",
    price: "R$ 8,90"
  }
];

const drinks = [
  {
    imgsrc : "assets/images/coca2l.webp",
    imgalt : "Coca 2l",
    name : "Coca 2l",
    description : "Tem pra todo mundo!",
    price: "R$ 10,00"
  },
  {
    imgsrc : "assets/images/cocalata.webp",
    imgalt : "Coca 350ml",
    name : "Coca 350ml",
    description : "Na medida certa",
    price: "R$ 5,00"
  },
  {
    imgsrc : "assets/images/matte.webp",
    imgalt : "Matte 1.5l",
    name : "Matte 1.5l",
    description : "Pra quem curte um cha gelado",
    price: "R$ 9,00"
  }
];

const desserts = [
  {
    imgsrc : "assets/images/dechocolate.png",
    imgalt : "Pastel de Chocolate",
    name : "Pastel de Chocolate com Morango",
    description : "Indescritivel",
    price: "R$ 8,00"
  },
  {
    imgsrc : "assets/images/debanana.webp",
    imgalt : "Pastel de Banana",
    name : "Pastel de Banana",
    description : "Inusitadamente brasileira",
    price: "R$ 6,00"
  },
  {
    imgsrc : "assets/images/dechocolatebranco.jpg",
    imgalt : "Pastel de Chocolate Branco",
    name : "Pastel de Chocolate Branco",
    description : "Sim, isso existe",
    price: "R$ 8,10"
  }
];

function fillMenu (obj, item){
  const itemImg = obj.querySelector("IMG");
  itemImg.src = item.imgsrc;
  itemImg.alt = item.imgalt;
  const itemName = obj.querySelector("H3");
  itemName.textContent = item.name;
  const itemDescription = obj.querySelector(".unit-description");
  itemDescription.textContent = item.description;
  const itemPrice = obj.querySelector(".unit-price");
  itemPrice.textContent = item.price;
}

const sectionArrs = [meals, drinks, desserts];
const sectionIDs = ["meals", "drinks", "desserts"];

for(let i=0; i<sectionIDs.length; i++){
  const currentSection = document.getElementById(sectionIDs[i]);
  console.log(currentSection);
  const menuItems = currentSection.querySelectorAll(".menu-item");
  for(let j=0; j<menuItems.length; j++){
    fillMenu(menuItems[j],sectionArrs[i][j]);
  }
}