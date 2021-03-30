let meals = [
  {
    imgsrc : "https://tinyurl.com/4tn6m4r",
    imgalt : "somealt",
    meal : "Frango Yin Yang",
    description : "Um pouco de batata, um pouco de salada",
    price: "R$ 14,90"
  },
  {
    imgsrc : "https://tinyurl.com/4tn6m4r",
    imgalt : "somealt",
    meal : "Frango Yin Yang",
    description : "Um pouco de batata, um pouco de salada",
    price: "R$ 14,90"
  }
];

let drinks = [
  {
    imgsrc : "https://tinyurl.com/4tn6m4r",
    imgalt : "somealt",
    meal : "Frango Yin Yang",
    description : "Um pouco de batata, um pouco de salada",
    price: "R$ 14,90"
  },
  {
    imgsrc : "https://tinyurl.com/4tn6m4r",
    imgalt : "somealt",
    meal : "Frango Yin Yang",
    description : "Um pouco de batata, um pouco de salada",
    price: "R$ 14,90"
  }
];

let desserts = [
  {
    imgsrc : "https://tinyurl.com/4tn6m4r",
    imgalt : "somealt",
    meal : "Frango Yin Yang",
    description : "Um pouco de batata, um pouco de salada",
    price: "R$ 14,90"
  },
  {
    imgsrc : "https://tinyurl.com/4tn6m4r",
    imgalt : "somealt",
    meal : "Frango Yin Yang",
    description : "Um pouco de batata, um pouco de salada",
    price: "R$ 14,90"
  }
];

function makeMenuItem (elem, obj) {
  let node = document.createElement("ARTICLE");
  node.classList.add("menu-item");

  let img = document.createElement("IMG");
  img.src = elem.imgsrc;
  img.alt = elem.imgalt;
  node.appendChild(img);

  let h3 = document.createElement("H3");
  let hNode = document.createTextNode(elem.meal);
  h3.appendChild(hNode);
  node.appendChild(h3);

  let p = document.createElement("P");
  let pNode = document.createTextNode(elem.description);
  p.appendChild(pNode);
  p.classList.add("unit-description");
  node.appendChild(p);

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
