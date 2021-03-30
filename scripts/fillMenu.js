let meals = [
  {
    imgsrc : "../assets/images/decarne.jpeg",
    imgalt : "Pastelao de Carne",
    meal : "Pastelao de Carne",
    description : "Sem misterios, aquele que voce ja conhece",
    price: "R$ 6,90"
  },
  {
    imgsrc : "../assets/images/degorgonzola.jpg",
    imgalt : "Pastel de Gorgozola com Tomate Seco",
    meal : "Pastelao de Gorgonzola com Tomate Seco",
    description : "Experimenta!",
    price: "R$ 9,90"
  },
  {
    imgsrc : "../assets/images/depalmito.jpg",
    imgalt : "Pastel de Palmito",
    meal : "Pastelao de Palmito",
    description : "Melhor que o da feira! Juro!",
    price: "R$ 8,90"
  }
];

let drinks = [
  {
    imgsrc : "../assets/images/coca2l.webp",
    imgalt : "Coca 2l",
    meal : "Coca 2l",
    description : "Tem pra todo mundo!",
    price: "R$ 10,00"
  },
  {
    imgsrc : "../assets/images/cocalata.webp",
    imgalt : "Coca 350ml",
    meal : "Coca 350ml",
    description : "Na medida certa",
    price: "R$ 5,00"
  },
  {
    imgsrc : "../assets/images/matte.webp",
    imgalt : "Matte 1.5l",
    meal : "Matte 1.5l",
    description : "Pra quem curte um cha gelado",
    price: "R$ 9,00"
  }
];

let desserts = [
  {
    imgsrc : "../assets/images/dechocolate.png",
    imgalt : "Pastel de Chocolate",
    meal : "Pastel de Chocolate com Morango",
    description : "Indescritivel",
    price: "R$ 8,00"
  },
  {
    imgsrc : "../assets/images/debanana.webp",
    imgalt : "Pastel de Banana",
    meal : "Pastel de Banana",
    description : "Inusitadamente brasileira",
    price: "R$ 6,00"
  },
  {
    imgsrc : "../assets/images/dechocolatebranco.webp",
    imgalt : "Pastel de Chocolate Branco",
    meal : "Pastel de Chocolate Branco",
    description : "Sim, isso existe",
    price: "R$ 8,10"
  }
];

function makeMenuItem (elem, obj) {
  let node = document.createElement("ARTICLE");
  node.classList.add("menu-item");

  let itemWrapper = document.createElement("DIV");
  itemWrapper.classList.add("item-wrapper");
    let img = document.createElement("IMG");
    img.src = elem.imgsrc;
    img.alt = elem.imgalt;
    itemWrapper.appendChild(img);

    let h3 = document.createElement("H3");
    let hNode = document.createTextNode(elem.meal);
    h3.appendChild(hNode);
    itemWrapper.appendChild(h3);

    let p = document.createElement("P");
    let pNode = document.createTextNode(elem.description);
    p.appendChild(pNode);
    p.classList.add("unit-description");
    itemWrapper.appendChild(p);
  node.appendChild(itemWrapper);

  let divWrapper = document.createElement("DIV");
  divWrapper.classList.add("price-wrapper");
    let innerP = document.createElement("P");
    innerP.classList.add("unit-price");
    let innerPNode = document.createTextNode(elem.price);
    innerP.appendChild(innerPNode);
    divWrapper.appendChild(innerP);

    let checkMark = document.createElement("ion-icon");
    checkMark.classList.add("checked");
    checkMark.classList.add("d-none");
    checkMark.name = "checkmark-circle";
    divWrapper.appendChild(checkMark);
  node.appendChild(divWrapper);

  obj.appendChild(node);
}

let sectionArrs = [meals, drinks, desserts];
let sectionIDs = ["meals", "drinks", "desserts"];


for(let i=0; i<sectionIDs.length; i++){
  let currentSection = document.getElementById(sectionIDs[i]);
  let currentMenu = currentSection.querySelector(".menu");
  sectionArrs[i].forEach(elem => makeMenuItem(elem, currentMenu));
}
