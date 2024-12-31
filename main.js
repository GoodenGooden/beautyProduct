const slideContainer = document.querySelector('.section-slider');
const slide = document.querySelector('.slides');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const interval = 3000;
const productSection = document.getElementById('product-section');
const incrementButton = document.querySelector('section-button-plus');
const burgerNav = document.querySelector('.burger-nav');
const menuIcon = document.querySelector('.menu-icon');
const closeTab = document.querySelector(".close-tab");

 let basket = JSON.parse(localStorage.getItem("data")) || [];

// starting here is for the automatic slider
/*
let slides = document.querySelectorAll('.slide');
let index = 1;
let slideId;

const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);

firstClone.id = 'first-clone';
lastClone.id = 'last-clone';

slide.append(firstClone);
slide.prepend(lastClone);

const slideWidth = slides[index].clientWidth;

slide.style.transform = `translateX(${-slideWidth * index}px)`;

console.log(slides);

const startSlide = () => {
  slideId = setInterval(() => {
    moveToNextSlide();
  }, interval);
};

const getSlides = () => document.querySelectorAll('.slide');

slide.addEventListener('transitionend', () => {
  slides = getSlides();
  if (slides[index].id === firstClone.id) {
    slide.style.transition = 'none';
    index = 1;
    slide.style.transform = `translateX(${-slideWidth * index}px)`;
  }

  if (slides[index].id === lastClone.id) {
    slide.style.transition = 'none';
    index = slides.length - 2;
    slide.style.transform = `translateX(${-slideWidth * index}px)`;
  }
});

const moveToNextSlide = () => {
  slides = getSlides();
  if (index >= slides.length - 1) return;
  index++;
  slide.style.transition = '.7s ease-out';
  slide.style.transform = `translateX(${-slideWidth * index}px)`;
};

const moveToPreviousSlide = () => {
  if (index <= 0) return;
  index--;
  slide.style.transition = '.7s ease-out';
  slide.style.transform = `translateX(${-slideWidth * index}px)`;
};

slideContainer.addEventListener('mouseenter', () => {
  clearInterval(slideId);
});

slideContainer.addEventListener('mouseleave', startSlide);
nextBtn.addEventListener('click', moveToNextSlide);
prevBtn.addEventListener('click', moveToPreviousSlide);

startSlide();

    */ 
// end here 

menuIcon.addEventListener('click', function () {
  menuIcon.style.visibility = "hidden";
  burgerNav.style.display = "block";
  closeTab.style.visibility = "visible";
})

closeTab.addEventListener("click", function () {
  burgerNav.style.display = "none";
  menuIcon.style.visibility = " visible";
  closeTab.style.visibility = "hidden";
})


let generateproductSection = () => {
return (productSection.innerHTML = productData
.map((x)=> {
  let { id, name, price, desc, img } = x;
  let search = basket.find((x) => x.id === id) || []; 
  return `
  <div id= ${id}>

  <div class="product-container">
  <img class="img-section" src="${img}">

<div">
<div class="flex-section">
  <button onclick= decrement(${id}) class="section-button-minus" >
    <svg class="icon-section">
      <use xlink:href="/sprite.svg#icon-minus"></use>
    </svg>
  </button >
  <div class="number"  id="number-${id}"> ${search.item === undefined ? 0 : search.item}
  </div>
  <button onclick= increment(${id}) class="section-button-plus">
<svg class="icon-section">
  <use xlink:href="/sprite.svg#icon-plus"></use>
</svg>
</button>
<div> <p class="button-cart"> Add To Cart</p>  </div>
</div>
</div>

<div class="product">
<h4 class="product-name">${name}</h4>
<div class="product-price"> # ${price}</div>
</div>
</div>
</div>
  `

}).join(" "));

};
generateproductSection();

//increase button

let increment = id => {
let selectedItem = id;     //this gives us all the properities associated with the id but we need just the id only 
let search = basket.find((x) => x.id === selectedItem.id)  //this gives us specific the id only
if (search === undefined) {
  basket.push ({
    id: selectedItem.id,
    item: 1,
  })
}else{
  search.item += 1;
}
update(selectedItem.id);
localStorage.setItem("data", JSON.stringify(basket));

};

//decrease button 

let decrement = id => {
  selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id)
  
  if (search === undefined) return;
  else if (search.item === 0) return;
  else{
    search.item -= 1;
  }
 
 basket =  basket.filter((x) => x.item !== 0);
 update(selectedItem.id);
  localStorage.setItem("data", JSON.stringify(basket));
  
  };

  let update = (id) => {
    let search = basket.find((x) => x.id === id);
    let numberElement = document.getElementById(`number-${id}`);

  if (search) {
    numberElement.textContent = search.item;

  }  else {
    numberElement.textContent = '1';
  }
  calculation()
};

let calculation = (id) => {
  let shoppingBag = document.getElementById("shoppingBag");
shoppingBag.innerHTML = basket.map((x) =>x.item).reduce((x,y) => x + y, 0);

};

calculation() ;



