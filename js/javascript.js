var currentPageIndex = 1;
function showCustomer(str) {
  var xhttp;    
  if (str == "") {
    document.getElementById("txtHint").innerHTML = "";
    return;
  }
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
	var myArr = JSON.parse(this.responseText);
	myFunction(myArr);
    }
  };
  var gender_val = "";
  if (document.getElementById('boys').checked) {
  gender_val = "gender=" + document.getElementById('boys').value;
}
  if (document.getElementById('girls').checked) {
  gender_val = "gender=" + document.getElementById('girls').value;
}

var limit_val = ",_limit=" + str;

  xhttp.open("GET", "https://journal.dumyah.com/coding-test/products?_page=1," + gender_val + limit_val, true);
  xhttp.send();
}

function myFunction(arr) {
    var out = "";
    var i;
    for(i = 0; i < arr.length; i++) {
        // out += '<a href="' + arr[i].image + '">' + arr[i].name + '</a><br>';
		if (arr[i].sale)
		{
			out += '<li class="col-xs-7 col-sm-6 col-lg-3"><div class="ProductTxt">' + 
			'<img src="' + arr[i].image + '" width="250" height="250" alt="product1" /> <br />' + arr[i].name + '<hr />   price: <span style="text-decoration: line-through; color:#c3272a">' + arr[i].price + '</span> / ' + arr[i].sale + '<br/> rating:' + arr[i].rating + '</div> </li>';
			
		}
		else{
			out += '<li class="col-xs-7 col-sm-6 col-lg-3"><div class="ProductTxt">' + 
			'<img src="' + arr[i].image + '" width="250" height="250" alt="product1" /> <br />' + arr[i].name + '<hr /> price:' + arr[i].price + '<br />rating:' + arr[i].rating + '</div> </li>';
		}
		  
    }
    document.getElementById("txtHint").innerHTML = out;
}


	function displayObjects() {
		var xhttp;
		xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				var myArr = JSON.parse(this.responseText);
				myFunction(myArr);
			}
		};
		var gender_val = "";
		if (document.getElementById('boys').checked) {
			gender_val = "&gender=" + document.getElementById('boys').value;
		}
		if (document.getElementById('girls').checked) {
			gender_val = "&gender=" + document.getElementById('girls').value;
		}

		var limit_val = "&_limit=" + document.getElementById('_limit').value;
		
		var sort_val = "&_sort=" + document.getElementById('_sort').value;
		
		var range_val = "&price_lte=" + document.getElementById('price_lte').value;
		
		var brand_val;
		
		if (document.getElementById('huge_list').firstChild.id != undefined )
			brand_val = "&brand.manufacturer_id=" + document.getElementById('huge_list').firstChild.id;
			else
			brand_val = "";

		
		
		var page_val = "_page=" + currentPageIndex;

		xhttp.open("GET", "https://journal.dumyah.com/coding-test/products?" + page_val + gender_val + limit_val + sort_val + range_val + brand_val, true);
		xhttp.send();
		
	}
	
	window.addEventListener("load", function(){

    // Add a keyup event listener to our input element
    var name_input = document.getElementById('name_input');
    name_input.addEventListener("keyup", function(event){hinter(event)});

    // create one global XHR object 
    // so we can abort old requests when a new one is make
    window.hinterXHR = new XMLHttpRequest();
});

// Autocomplete for form
function hinter(event) {

    // retireve the input element
    var input = event.target;

    // retrieve the datalist element
    var huge_list = document.getElementById('huge_list');

    // minimum number of characters before we start to generate suggestions
    var min_characters = 0;

    if (input.value.length < min_characters ) { 
        return;
    } else { 

        // abort any pending requests
        window.hinterXHR.abort();

        window.hinterXHR.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {

                // We're expecting a json response so we convert it to an object
                var response = JSON.parse( this.responseText ); 

                // clear any previously loaded options in the datalist
                huge_list.innerHTML = "";

                response.forEach(function(item) {
                    // Create a new <option> element.
                    var option = document.createElement('option');
                    // option.value = item.name;
					option.text  = item.name;
					option.id  = item.manufacturer_id;
					option.selected = true;

                    // attach the option to the datalist element
                    huge_list.appendChild(option);
                });
            }
        };

        window.hinterXHR.open("GET", "https://journal.dumyah.com/coding-test/brands?name_like=" + input.value, true);
        window.hinterXHR.send()
    }
}