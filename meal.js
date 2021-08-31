document.getElementById('error-message').style.display = 'none';
const searchFood = () =>{
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;  
    // console.log(searchText);
    // clear input value
    searchField.value = '';
    document.getElementById('error-message').style.display = 'none';
    // load data
    if (searchText == ''){

    }
    else{
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`

        fetch(url)
       .then (res => res.json())
       .then (data => displaySearchresult(data.meals) )
       .catch(error => displayError(error));
    }
}

 const displayError = error => {
    document.getElementById('error-message').style.display = 'block';
 }
 
const displaySearchresult = meals =>{
    
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    
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
    mealDetails.textContent = '';
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