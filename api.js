function addProduct(product) {
  if (product.unit_price){product.unit_price=product.unit_price.charAt(0).toUpperCase()+product.unit_price.charAt(1);}
  const productHTML = `
    <div class="product_storage" id="${product.name}">
      <div id="randomname">
      <img class="production-image" src="data:image/png;base64,${product.image}" alt="${product.name}">
      <p class="product_name">${product.name}</p>
      <h4 class="production-price">${product.unit_price} ${product.price}</h4>
      <p class="product_desc">${product.short_desc}</p>
      <span class="production-sale"><p>${product.discount ? `-${product.discount}%` : `${product.tag}`}</p></span>
      </div>
      <div class="middle">
      <button class="add_to_cart">Add to cart</button>
        <div class="hove">
          <span class="material-symbols-outlined">share</span>
          <p>Share</p>
          <span class="material-symbols-outlined">compare_arrows</span>
          <p>Compare</p>
          <span id="heart" class="material-symbols-outlined">favorite</span>
          <p>Like</p>
        </div>
      </div>
    </div>
  `;

  return productHTML;
}


var start =0;
var limit1 =-1;
var count=0;
async function loadProducts(limit) {
  if (limit1 > 8) {
    start = 0;
    limit1 = limit;
  }
  if (limit1==-1){  
  limit1 = limit;}
  const res = await fetch("data.json");
  const data = await res.json();
  const products = data.product_list.slice(start, limit1);
  start =limit1;
  limit1 += limit;
  const productContainer = document.getElementById("products");

  products.forEach(function (product) {
    const productHTML = addProduct(product);
    productContainer.insertAdjacentHTML("beforeend", productHTML);
  });
  if (count === 40) {
    document.getElementById("showmorebutton").style.display = "none";
    return; 
  }
  localStorage.setItem("products", JSON.stringify(products));
}
loadProducts(8);
count+=8;
document.getElementById("showmorebutton").addEventListener("click",function() {
  loadProducts(4)
  count+=4;
  document.getElementById("countprod").innerHTML = count;
})
///////////
document.addEventListener("click", function(event) {
  if (event.target.id === "heart") {
    const heartElement = event.target;
    const heartId = heartElement.id;
    const isLiked = heartElement.classList.contains("liked");

    if (isLiked) {
      heartElement.classList.remove("liked");
      heartElement.classList.add("disliked");
      localStorage.removeItem(heartId);
    } else {
      heartElement.classList.remove("disliked");
      heartElement.classList.add("liked");
      localStorage.setItem(heartId, "id");
    }
  }
});
countprod = document.getElementById("countprod").innerHTML = count;
countprod = document.getElementById("countprod").innerHTML = count;

document.getElementById("web1input").addEventListener("input", function(event) {
  let web1input = event.target.value;
  loadProducts(parseInt(web1input));
});