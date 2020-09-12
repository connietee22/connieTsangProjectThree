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
dumplingApp.countryResults = []; // *** HELPCUE - RESULTS WOULD NOT POST UNLESS I PUT THIS IN GLOBAL SCOPE

// check if at least one box has been checked in each section before proceeding
dumplingApp.validateForm = function () {

  $('.dumplingSelection').on('submit', function (e) {
    e.preventDefault();
    if ($('#fillings input').is(':checked')) {
      // to reset the hide if the error is corrected
      $('.errorMessage').hide();
      return;
    } else {
      // shows error message
      $('.errorMessage').show();
    }
  })
}

dumplingApp.submitChoices = function() {
  $countries = $('.countries');
  $finalDumpling = $('.finalDumpling');
  
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

    const chosenDumplingType = dumplings[dumplingApp.dumplingType];
    console.log(chosenDumplingType);
    // filling in countryResults array with appropriate dumplings -- both will have everything with a meat and veg filling
    if (dumplingApp.fillingType === "both") {
      countryResults = chosenDumplingType;
    } else {
    // otherwise, if user selects meat OR veg choice, cycle through dumpling objects to only include appropriately filled dumplings in new countryResults array  
      countryResults = chosenDumplingType.filter((dumpling) => {
        return dumpling.filling === dumplingApp.fillingType;
      })
    }
    // displays countries of all relevant dumplings
    dumplingApp.displayCountries(countryResults) //****HELPCUE Why does this not work in init? DOES NOT SHOW COUNTRIES*/
  });
}  

  //DISPLAYING THE FINAL DUMPLING AS A CHOICE FROM THE COUNTRY BUTTONS
  dumplingApp.displayCountries = function(filteredResults) {
    $('.results').show();
    
    dumplingApp.scrollBottom();
    $countries.empty();
    $finalDumpling.empty();
    $finalDumpling.removeClass('addBg')
    
    $countries.append(`
      <p>Choose your dumpling's origin</p>
      <form class="countriesFlex"></form>
    `);

    filteredResults.forEach((result) => {
      $('.countriesFlex').append(`
          
          <input type="radio" id="${result.origin}" name="country" value="${result.origin}">
          <label for="${result.origin}" aria-label="click to display dumpling with origin of ${result.origin}" tabindex = "0" visibility="hidden"> ${result.origin}</label>
      `);
    });
      dumplingApp.displayFinal();
  }

    // event listener on new form 
    // when button is clicked, the corresponding dumpling + recipe link will appear
  dumplingApp.displayFinal = function() {
    $('input[type=radio]').on('keydown', function (e) {
      if (e.key === "Enter") {
        console.log(this);
        const countrySelected = $(this).val();
        console.log(countryResults);
        countryResults.forEach(result => {
          if (result.origin === countrySelected) {
            $finalDumpling.empty();
            $finalDumpling.append(`<p><span class="finalIntro">Get your dumpling recipe:</span> <a href="${result.recipe}" target="_blank">${result.name}</a></p>`).addClass('addBg');
          }
        })
        dumplingApp.scrollBottom();
      }
    })

    // on change of countries radio button, display corresponding dumpling recipe
    $('[name=country]').on('change', function (e) {
      e.preventDefault();
      
      //get value of country button selected
      const countrySelected = $(this).val();
      console.log(countryResults);
      countryResults.forEach(result => {
        if (result.origin === countrySelected) {
          $finalDumpling.empty();
          $finalDumpling.append(`<p><span class="finalIntro">Get your dumpling recipe:</span> <a href="${result.recipe}" target="_blank">${result.name}</a></p>`).addClass('addBg');
        }
      })
      dumplingApp.scrollBottom();
    });
  };
  

//****ORIGINAL DISPLAY FINAL DUMPLING */
//  dumplingApp.displayFinal = function() {
// $('[name=country]').on('change', function (e) {
//   e.preventDefault();

//   //get value of country button selected
//   const countrySelected = $(this).val();
//   console.log(countryResults);
//   countryResults.forEach(result => {
//     if (result.origin === countrySelected) {
//       $finalDumpling.empty();
//       $finalDumpling.append(`<p><span class="finalIntro">Get your dumpling recipe:</span> <a href="${result.recipe}" target="_blank">${result.name}</a></p>`).addClass('addBg');
//     }
//   })
//   dumplingApp.scrollBottom();
// });
//   };


  
  // scrolling to bottom of page on click
  dumplingApp.scrollBottom = function() {
    const bottom = $(document).height() - $(window).height();
    console.log($(document).height());
    $('html, body').animate({
      scrollTop: bottom
    }, 900);
  };


dumplingApp.init = function() {

  // smooth scrolling - from W3 Schools 
  $('a').on('click', function (event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Store hash
      const hash = this.hash;
      event.preventDefault();
      // animate() method to add smooth scroll
      // 900 milliseconds to scroll to area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 900, function () {
      // Add hash (#) to URL when done scrolling (default click behavior)
      window.location.hash = hash;
      });
    }
  });
    dumplingApp.validateForm();
    dumplingApp.submitChoices();
};

$(document).ready(function(){
  dumplingApp.init();

});
