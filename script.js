// declaring dom element variables
var searchBarEl,
  searchEl,
  randomEl,
  resultHeadingEl,
  mealsEl,
  singleMealEl,
  mealsArr,
  mealElArr;

var populateOptions = () => {
  let str = "";
  let len = mealsArr.length;
  for (let i = 0; i <= len / 6; i++) {
    str += '<div class="mealsImgRowDiv" id="mealsImgRowDiv">';
    for (let j = 0; j < 6; j++) {
      if (i * 6 + j == len) break;
      str += `<div class="mealImgDiv" id="mealImgDiv${6 * i + j}"><img src="${
        mealsArr[6 * i + j]["strMealThumb"]
      }" alt="${
        mealsArr[6 * i + j]["strMeal"]
      }" srcset="" class="mealImg"></img><span class="mealName" id="mealName">${
        mealsArr[6 * i + j]["strMeal"]
      }</span></div>`;
    }
    str += "</div>";
  }
  mealsEl.innerHTML = str;
};

//
var getRandMealDesc = (e) => {
  let randMeal = 0;
  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then((res) => res.json())
    .then((data) => {
      randMeal = data.meals[0];
      let str = `<div class="mealNameDesc" id="mealNameDesc">${randMeal["strMeal"]}</div>`;
      str += `<img src="${randMeal["strMealThumb"]}" alt="${randMeal["strMeal"]}" srcset="" class="mealImgDesc" id="mealImgDesc"></img>`;
      str += `<div class="mealCatAreaDesc" id="mealCatAreaDesc"><div class="mealCategoryDesc" id="mealCategoryDesc">${randMeal["strCategory"]}</div><div class="mealAreaDesc" id="mealAreaDesc">${randMeal["strArea"]}</div></div>`;
      str += `<div class="mealIngredientsHeadingDesc" id="mealIngredientsHeadingDesc">Ingredients</div>`;
      str += `<div class="mealIngredientsDesc" id="mealIngredientsDesc">`;
      for (let j = 1; j <= 20; j++) {
        let ing = `strIngredient${j}`;
        if (!randMeal[ing]) break;
        let mes = `strMeasure${j}`;
        str += `<div class="mealIngAmtDesc" id="mealIngAmtDesc">${randMeal[ing]} - ${randMeal[mes]}</div>`;
      }
      str += "</div>";
      str += `<div class="mealInstructionsHeadingDesc" id="mealInstructionsHeadingDesc">Instructions</div>`;
      str += `<div class="mealInstructionsDesc" id="mealInstructionsDesc">${randMeal["strInstructions"]}</div>`;
      singleMealEl.innerHTML = str;
    });
};

//
var getMealDesc = (i, e) => {
  let str = `<div class="mealNameDesc" id="mealNameDesc">${mealsArr[i]["strMeal"]}</div>`;
  str += `<img src="${mealsArr[i]["strMealThumb"]}" alt="${mealsArr[i]["strMeal"]}" srcset="" class="mealImgDesc" id="mealImgDesc"></img>`;
  str += `<div class="mealCatAreaDesc" id="mealCatAreaDesc"><div class="mealCategoryDesc" id="mealCategoryDesc">${mealsArr[i]["strCategory"]}</div><div class="mealAreaDesc" id="mealAreaDesc">${mealsArr[i]["strArea"]}</div></div>`;
  str += `<div class="mealIngredientsHeadingDesc" id="mealIngredientsHeadingDesc">Ingredients</div>`;
  str += `<div class="mealIngredientsDesc" id="mealIngredientsDesc">`;
  for (let j = 1; j <= 20; j++) {
    let ing = `strIngredient${j}`;
    if (!mealsArr[i][ing]) break;
    let mes = `strMeasure${j}`;
    str += `<div class="mealIngAmtDesc" id="mealIngAmtDesc">${mealsArr[i][ing]} - ${mealsArr[i][mes]}</div>`;
  }
  str += "</div>";
  str += `<div class="mealInstructionsHeadingDesc" id="mealInstructionsHeadingDesc">Instructions</div>`;
  str += `<div class="mealInstructionsDesc" id="mealInstructionsDesc">${mealsArr[i]["strInstructions"]}</div>`;
  singleMealEl.innerHTML = str;
};

//
var mealsEventListeners = () => {
  let len = mealsArr.length;
  for (let i = 0; i < len; i++) {
    let mealElId = `mealImgDiv${i}`;
    console.log(mealElId);
    let mealEl = document.getElementById(mealElId);
    mealEl.addEventListener("click", getMealDesc.bind(null, i));
  }
};

// defining what happens on clicking search button
var showResult = (e) => {
  console.log(e.target.id);
  let ipStr = searchBarEl.value.trim();
  mealsEl.innerHTML = "";
  resultHeadingEl.innerHTML = "";
  singleMealEl.innerHTML = "";
  mealElArr = [];
  if (!ipStr && (e.target.id == "search" || e.target.id == "fa-search")) {
    alert("search bar is empty");
    return;
  } else if (!ipStr) {
    return;
  }
  resultHeadingEl.innerHTML = `results for '${ipStr}':`;
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${ipStr}`)
    .then((res) => res.json())
    .then((data) => {
      mealsArr = data.meals;
      populateOptions();
      mealsEventListeners();
    });
};

// defining what happens on clicking random button
var showRandomMeal = () => {
  mealsEl.innerHTML = "";
  resultHeadingEl.innerHTML = "";
  singleMealEl.innerHTML = "";
  mealElArr = [];
  mealsArr = [];
  getRandMealDesc();
};

// initializing dom element variables
var el_init = () => {
  searchBarEl = document.getElementById("searchBar");
  searchEl = document.getElementById("search");
  console.log(searchEl);
  randomEl = document.getElementById("random");
  resultHeadingEl = document.getElementById("resultHeading");
  mealsEl = document.getElementById("meals");
  singleMealEl = document.getElementById("singleMeal");
  mealElArr = [];
  searchBarEl.value = "";
};

// creating event listeners
var eventListeners = () => {
  searchEl.addEventListener("click", showResult);
  searchBarEl.addEventListener("input", showResult);
  randomEl.addEventListener("click", showRandomMeal);
};

// defining init function for application initialization
var init = () => {
  el_init();
  eventListeners();
};

// calling init function
init();
