var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var productDesc = document.getElementById("productDesc");
var productNameModal = document.getElementById("productNameModal");
var productPriceModal = document.getElementById("productPriceModal");
var productCategoryModal = document.getElementById("productCategoryModal");
var productDescModal = document.getElementById("productDescModal");

var productContainer;
if (localStorage.getItem("productsList") == null) {
  productContainer = [];
} else {
  productContainer = JSON.parse(localStorage.getItem("productsList"));
  displayProducts();
}
//add product

function addProduct() {
  if (
    validateProductName() == true &&
    validateProductPrice() == true &&
    validateProductcategory() == true
  ) {
    var product = {
      name: productName.value,
      price: productPrice.value,
      category: productCategory.value,
      desc: productDesc.value,
    };
    productContainer.push(product);
    localStorage.setItem("productsList", JSON.stringify(productContainer));
    clearForm();
    displayProducts();
    console.log(productContainer);
  } else {
    window.alert(
      "Please enter the name start Uppercase & price 1 : 1000 & product category just tv or mobil or iphone or computer"
    );
  }
}

function clearForm() {
  productName.value = "";
  productPrice.value = "";
  productCategory.value = "";
  productDesc.value = "";
}
function displayProducts() {
  var cartoona = ``;
  for (var i = 0; i < productContainer.length; i++) {
    cartoona += `
    <tr>
    <td> ${i}</td>
    <td> ${productContainer[i].name}</td>
    <td> ${productContainer[i].price}</td>
    <td> ${productContainer[i].category} </td>
    <td> ${productContainer[i].desc} </td>
    <td> <button  onclick="getRowData(${i})"  class=" btn btn-outline-warning"> <a href="#" data-toggle="modal"  data-target="#exampleModal">Update</a>
    </button></td>
    <td> <button onclick="deleteProduct(${i})"  class=" btn btn-outline-danger"> delete </button></td>
    `;
  }
  document.getElementById("tableBody").innerHTML = cartoona;
}

/* delete */
function deleteProduct(productIndex) {
  productContainer.splice(productIndex, 1);
  localStorage.setItem("productsList", JSON.stringify(productContainer));
  displayProducts();
}
/* search */
function searchProduct(searchTerm) {
  var cartoona = ``;
  for (var i = 0; i < productContainer.length; i++) {
    if (
      productContainer[i].name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) == true ||
      productContainer[i].category
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) == true
    ) {
      cartoona += `
      <tr>
      <td> ${i}</td>
      <td> ${productContainer[i].name}</td>
      <td> ${productContainer[i].price}</td>
      <td> ${productContainer[i].category}</td>
      <td> ${productContainer[i].desc}</td>
      <td> <button  class=" btn btn-outline-warning"> ubdate </button></td>
      <td> <button onclick="deleteProduct(${i})"  class=" btn btn-outline-danger"> delete </button></td>
      `;
    } else {
      console.log("no mogod");
    }
  }
  document.getElementById("tableBody").innerHTML = cartoona;
}

/*** update ***/
var updateIndex;
function getRowData(index) {
  console.log(productContainer[index]);
  productNameModal.value = productContainer[index].name;
  productPriceModal.value = productContainer[index].price;
  productCategoryModal.value = productContainer[index].category;
  productDescModal.value = productContainer[index].desc;
  updateIndex = index;
  console.log(updateIndex);
}
function updateForm() {
  var productsList = {
    name: productNameModal.value,
    price: productPriceModal.value,
    category: productCategoryModal.value,
    desc: productDescModal.value,
  };
  productContainer.splice(updateIndex, 1, productsList);

  localStorage.setItem("productsList", JSON.stringify(productContainer));
  displayProducts();
  clearForm();
}

/**************** Regular Expression  *******************/

//Validation => تحقق

// Regular Expression

function validateProductName() {
  var regex = /^[A-Z][a-z]{3,8}$/;
  if (regex.test(productName.value) == true) {
    return true;
  } else {
    return false;
  }
}

function validateProductPrice() {
  var regex = /^([1-9][0-9][0-9]|1000)$/;
  if (regex.test(productPrice.value) == true) {
    return true;
  } else {
    return false;
  }
}

function validateProductcategory() {
  var regex = /^(tv|mobile|iphone|computer)$/;
  if (regex.test(productCategory.value) == true) {
    return true;
  } else {
    return false;
  }
}
