let productSection = document.getElementById('product-axis');
let shoppingBag = document.getElementById("shoppingBag");
let closingCart = document.getElementById("closing-cart");
let priceSection = document.getElementById('price-section');
let homeIcon = document.querySelector(".home-icon");
let backButton = document.querySelector(".back-button");
let basket = JSON.parse(localStorage.getItem("data")) || [];
let cartButton = document.querySelector(".cart-button");

homeIcon.addEventListener('click', function() {
  window.location.href = '/index.html';
})



let calculation = (id) => {
    
  shoppingBag.innerHTML = basket.map((x) =>x.item).reduce((x,y) => x + y, 0);

  };
  
  calculation() ;
  

  let generateproductSectionItem = () => {
    if (basket.length !== 0) {
return (productSection.innerHTML = basket.map((x) => {
    let { id, item } = x;
    let search = productData.find((x) => x.id === id) || [];        //the data is shpuld be the same with user interface id that will be clicked
    let { img, price, name } = search;


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
  <div class="number"  id="number-${id}"> ${item} 
  </div>
  <button onclick= increment(${id}) class="section-button-plus">
<svg class="icon-section">
  <use xlink:href="/sprite.svg#icon-plus"></use>
</svg>
</button>
<div> <p class="button-cart"> Add To Cart</p>  </div>
</div>
</div>
</div>
`
  }).join(" "));
  }else {
    closingCart.innerHTML = `
    <div id="closing-cart" class="closing-cart">

    <svg class="icon-header2">
      <use xlink:href="/sprite.svg#icon-shopping-bag"></use>
    </svg>
    <div>
      your shopping bag is empty
    </div>
    <button>continue shopping</button>
  </div> 
  `;
  }

  };
  
  generateproductSectionItem();

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
    generateproductSectionItem();
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
 generateproductSectionItem();
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

let totalAmount = () => {
  if (basket.length !== 0) {
    let amount = basket.map((x) => {
let {id, item} = x;
let filterData = productData.find((x) =>  x.id === id)
return filterData.price * item  
    }).reduce((x, y) => x + y, 0);

  return (priceSection.innerHTML =
     `
  <div>
    <div class="price-flex">
      <p id="total=price" class="total-price">Total Amount</p>
      <p id="price-amount" class="price-amount" ># ${amount}</p>
    </div>
<div class="button-flex">
  <div>
<button class="continue-button">Continue Shopping</button>
</div>
<div>
<button class="proceed-button">Proceed to pay</button>
</div>
</div>
  </div>
  `
)
  } else return;


};

totalAmount ();
