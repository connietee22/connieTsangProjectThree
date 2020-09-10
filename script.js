const dumplings = {
  boiled: [
    {
      name: "manti",
      origin: "Turkey",
      filling: "meat",
      recipe: "https://www.panningtheglobe.com/turkish-manti/"
    },
    {
      name: "kartoffelknödel",
      origin: "Germany",
      filling: "veg",
      recipe: "http://www.bavariankitchen.com/sides/knoedel.aspx"
    },
    {
      name: "har gow",
      origin: "China",
      filling: "meat",
      recipe: "https://thewoksoflife.com/har-gow/"
    },
    {
      name: "momos",
      origin: "Tibet",
      filling: "veg",
      recipe: "https://www.yowangdu.com/tibetan-food/momos.html"
    },
    {
      name: "kroppkakor",
      origin: "Sweden",
      filling: "meat",
      recipe: "https://www.marthastewart.com/1142474/kroppkakor"
    },
    {
      name: "fufu",
      origin: "Ghana",
      filling: "veg",
      recipe: "https://www.cdkitchen.com/recipes/recs/262/Fufu_Ghana6978.shtml"
    }
  ], 
  fried: [
    {
      name: "coxinhas",
      origin: "Brazil",
      filling: "meat",
      recipe: "https://tasty.co/recipe/brazilian-chicken-croquettes-coxinha"
    },
    {
      name: "rissóis",
      origin: "Portugal",
      filling: "meat",
      recipe: "https://www.196flavors.com/portugal-rissois-de-camarao/"
    },
    {
      name: "gyoza",
      origin: "Japan",
      filling: "meat",
      recipe: "https://www.chopstickchronicles.com/japanese-gyoza/"
    },
    {
      name: "knish",
      origin: "Jewish",
      filling: "veg",
      recipe: "https://www.allrecipes.com/recipe/212834/sarahs-knish/"
    },
    {
      name: "mandu",
      origin: "korea",
      filling: "veg",
      recipe: "https://kimchimari.com/vegetarian-dumplings-hobak-pyeonsu/"
    },
    {
      name: "empanada",
      origin: "ecuador",
      filling: "veg",
      recipe: "https://www.laylita.com/recipes/mushroom-cheese-empanadas/"
    }
  ]
}

const dumplingApp = {};

dumplingApp.scrollEvents = function() {
  $('a').on('click', function() {
  $('html, body').animate({
    scrollTop: $('#results').offset().top
  }, 1000);
});
}

// check if at least one box has been checked in each section before proceeding
dumplingApp.validateForm = function () {
  $('.dumplingSelection').on('submit', function (e) {
    e.preventDefault();
    const selectedFilling = $('input[name="filling"]:checked').val();
    if (!selectedFilling) {
      $('.errorMessage').toggle();
    } else {
      // this animate scroll copied from various sources on StackOverflow
      $('html, body').animate({
        scrollTop: $('#results').offset().top
      }, 1000);
      return;
    }   
  })
}

dumplingApp.submitChoices = function() {
  $('.dumplingSelection').on('submit', function(e) {
    e.preventDefault();
    // get the value of selected checkboxes in boiled || fried
    dumplingApp.dumplingType = $('input[type=radio]:checked').val();
    // get value of meat || veggie or both and put in variable 
    if ($('input[value=veg]:checked').val() && $('input[value=meat]:checked').val()) {
      dumplingApp.fillingType = "both";
    } else if ($('input[value=meat]:checked').val()) {
      dumplingApp.fillingType = "meat";
    } else {
      dumplingApp.fillingType = "veg";
    }
  // cycle through dumplings arrays to compare user’s selections in variables to fried and/or boiled filling values in dumpling objects.
    const results = [];
    $countries = $('.countries')

    // push results into array
    for (let i = 0; i < dumplings[dumplingApp.dumplingType].length; i++) {
      if (dumplings[dumplingApp.dumplingType][i].filling === dumplingApp.fillingType) {
        results.push(dumplings[dumplingApp.dumplingType][i]);
      }
    }
    // need to find a way to get both in the mix

    // display the country of origin from these results as radio buttons 
    const displayCountries = function(filteredResults) {

      $countries.empty();
      $countries.append(`<p>Choose your dumpling's origin</p>
        <div class="countriesFlex"></div>`);
      filteredResults.forEach((result) => {
          $('.countriesFlex').append(`
            <li>
              <input type="radio" id="${result.origin}" name="country" value="${result.origin}" aria-hidden="true">
              <label for="${result.origin}" aria-label="click to display dumpling with origin of ${result.origin}">${result.origin}</label>
            </li>`);
      })
    }
    
    displayCountries(results);
    // event listener on new form 
    // when button is clicked, the corresponding dumpling + recipe link will appear
    $('[name=country]').on('click', function (e) {
      e.preventDefault();
      const countrySelected = $(this).val();
      console.log(countrySelected);
      console.log(results);
      results.forEach(result => {
        if (result.origin === countrySelected) {
          $('.finalDumpling').empty();
          $('.finalDumpling').append(`<p><a href="${result.recipe}">${result.name}</a></p>`);
        }
      })
      const finalDumpling = results[countrySelected];
      console.log(finalDumpling);
    });

  })



}







dumplingApp.init = function() {
  dumplingApp.validateForm();
  dumplingApp.submitChoices();
  
};

$(document).ready(function(){
  dumplingApp.init();
 
});











  // function findValue(array) {
  //   for (let i = 0; i < array.length; i++) {
  //     if (array[i].filling === "veg"){
  //       return array[i];
  //     }
  //   }
  // }


  // const finalDumplings = [];
  // const valueFromQuiz = "boiled";
  // const typesOfDumplings = dumplings[valueFromQuiz];
  // console.log(dumplings.boiled);
  // for (let i = 0; i < typesOfDumplings.length; i++) {
  //   if (typesOfDumplings[i].filling === "veg") {
  //     finalDumplings.push();
  //   }
  // }

