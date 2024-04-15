const url = "http://localhost:5001/countries";
let countries = []; 
let choosenCountries = [];

// fetch countries 
fetch(url)
	.then(res => res.json())
	.then(json => countries = json.countries)
	.catch(err => console.error('error:' + err));


document.querySelector("#countriesForm").addEventListener("submit", function(e){
    e.preventDefault();  

    const data = Object.fromEntries(new FormData(e.target).entries());
    console.log(data)
    
    fetch(`${url}`, {
        method: "POST",
        body: JSON.stringify({
            ...data
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then((responseJson) => {
        console.log("responseJson", responseJson)
        if (responseJson.ok) {
            return responseJson.json();
          }
        return Promise.reject(response);
      }).then ((json) => {
        choosenCountries = [...json.choosenCountries]
        renderChoosenCountries();
      })
      .catch((error) => {
        console.log(error)
      });
});


cleanResultField = () => {
    let res = document.getElementById("result");
    res.innerHTML = '';
    return res; 
}

autocompleteMatch = (input) => {
    if (input == '') {
        return [];
      }
      var reg = new RegExp(input)
      return countries.filter(function(term) {
          if (term.match(reg)) {
            return term;
          }
      });
}

createListItemWithOnClick = (itemValue, onClickCallback) => {
    const li = document.createElement('li');
    li.innerHTML = `${item}`;
    li.id = 'task-field';
    li.onclick = onCli
    return li
  }

 showResults = (val) => {
    let res = cleanResultField();
    let list = '';
    let terms = autocompleteMatch(val);
    for (i=0; i<terms.length; i++) {
      list += `<li onClick = chooseValue("${terms[i]}")>` + terms[i] + `</li>`;
    }
    console.log("list",list)
    res.innerHTML = '<ul>' + list + '</ul>';
  }

chooseValue = (value) => {
    console.log("here", value);
    let countriesInputEl = document.getElementById("searchCountry");
    countriesInputEl.value = value;
    cleanResultField()
} 

renderChoosenCountries = () =>{
    let res = document.getElementById("choosenCountries");
    let list = '';
    for (i=0; i<choosenCountries.length; i++) {
        list += `<li>` + choosenCountries[i] + `</li>`;
    }
    res.innerHTML = '<ul>' + list + '</ul>';
}