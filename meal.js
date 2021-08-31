
const searchFood = () =>{
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);
    // clear input value
    searchField.value = '';
    // load data
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`

     fetch(url)
    .then (res => res.json())
    .then (data => displaySearchresult(data.meals) )
}
 
const displaySearchresult = meals =>{
    
    const searchResult = document.getElementById('search-result');
    searchResult.innerHTML = '';
    //for (meal of meals)
    meals.forEach(meal => {
        // console.log(meal);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div onclick="loadMealDetails(${meal.idMeal})" class="card h-100">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text">${meal.strInstructions.slice(0,200)}</p>
            </div>
        </div>
        `;
      searchResult.appendChild(div);
    })
}

const loadMealDetails = mealId =>{
   
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    fetch (url)
    .then(res => res.json())
    .then(data => displayMealDetails(data.meals[0]))
}
const displayMealDetails = meal => {
    const mealDetails = document.getElementById('meal-details');
    const div = document.createElement('div');
    div.classList.add('card','mb-4');
    div.innerHTML = `
            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${meal.strMeal}</h5>
              <p class="card-text">${meal.strInstructions.slice(0,150)}</p>
              <a href="${meal.strYoutube}" class="btn btn-primary">Go somewhere</a>
            </div>
    `;
    mealDetails.appendChild(div);
}