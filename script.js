//DATA OBJECTS FOR DUMPLINGS -- BOILED + FRIED
const dumplings = {
  boiled: [
    {
      name: "manti",
      origin: "Turkey",
      filling: "meat",
      recipe: "https://www.panningtheglobe.com/turkish-manti/"
    },
    {
      name: "kartoffel knödel",
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

//****CREATING APP
const dumplingApp = {};
dumplingApp.countryResults = [];
//DECLARING GLOBAL VARIABLES
$countries = $('.countries');
$finalDumpling = $('.finalDumpling');
$errorMessage = $('.errorMessage');

//****TO DETECT IF THERE ARE ANY MISSING CHECKBOXES
dumplingApp.validateForm = function () {
  // when to show error message
  if ($('#fillings input').is(':checked')) {
    // to reset the hide if the error is corrected
    $errorMessage.hide();
    return;
  } else {
    dumplingApp.errorHandling();
  }
}

//****TO HANDLE ERRORS
dumplingApp.errorHandling = function() {

  // shows error message and removes information from 
  $errorMessage.show();
  $('.resultContainer').hide();
  $countries.empty();
  $finalDumpling.empty();
  $('.bottomButton').empty();
}

//****SUBMITTING CHOICES */
dumplingApp.submitChoices = function() {
  //
  $('form').on('change', function () {
    $('.resultContainer').hide(); //switch from show
    // EMPTYING ALL RESULTS ON ANY CHANGE
    $countries.empty();
    $finalDumpling.empty();
    $('.bottomButton').empty();
    $('.finalDumpling').removeClass('addBg');
  });

  $('.dumplingSelection').on('submit', function(e) {
    e.preventDefault();
    // get the value of selected checkboxes in boiled || fried
    dumplingApp.dumplingType = $('input[type=radio]:checked').val();
    $('.resultContainer').show(); //test
    // get value of meat || veggie or both and put in variables
    if ($('input[value=veg]:checked').val() && $('input[value=meat]:checked').val()) {
      dumplingApp.fillingType = "both";
    } else if ($('input[value=meat]:checked').val()) {
      dumplingApp.fillingType = "meat";
    } else {
      dumplingApp.fillingType = "veg";
    }

    const chosenDumplingType = dumplings[dumplingApp.dumplingType];
    // populates countryResults array with appropriate dumplings -- a selection of "both" will include everything in the chosenDumplingType array
    if (dumplingApp.fillingType === "both") {
      countryResults = chosenDumplingType;
    } else {
    // if user selects meat OR veg choice, this cycles through the object for relevant filling choices  
      countryResults = chosenDumplingType.filter((dumpling) => {
        return dumpling.filling === dumplingApp.fillingType;
      })
    }
    // displays countries of all relevant dumplings
    dumplingApp.displayCountries(countryResults)
  });
}  

//****DISPLAYS THE COUNTRY BUTTONS 
dumplingApp.displayCountries = function(filteredResults) {
  $('.results').show();
  // to scroll the results into view as it's populated
  if (!$errorMessage.is(':visible')) {
    dumplingApp.scrollBottom();
  };
  
  // clearing containers for new searches
  $countries.empty();
  $finalDumpling.empty();
  $('.bottomButton').empty();

  // to remove the white background when contents are emptied
  $finalDumpling.removeClass('addBg')

  // adds title and fieldset for country radio buttons
  $countries.append(`
    <p>Choose dumpling origin <span>⬇ ⬇ ⬇</span></p>
    <form>
      <fieldset class="countriesFlex"></fieldset>
    </form>
  `);

  // goes through filtered results array and appends each one to the fieldset 
  filteredResults.forEach((result) => {
    // >>tab index not needed as radio buttons cycle through with left and right arrows<<
    $('.countriesFlex').append(`
        <input type="radio" id="${result.origin}" name="country" value="${result.origin}">
        <label for="${result.origin}" aria-label="click to display dumpling with origin of ${result.origin}" visibility="hidden"> ${result.origin}</label>
    `);
  });
  // appends the template for the final dumpling result.
  $finalDumpling
		.html(
			`
          <div class="imageResultContainer">
            <img src="assets/dumplingVecteezyTwo.png" alt="anthropomorphized dumpling from Vecteezy.com"></>
            <div>
              <p class="finalIntro">Make your choice...!
              </p>
              <p class="recipe">
                
              </p>
            </div>
          </div>
        `
		)
    .addClass('addBg');
      
    dumplingApp.displayFinal();
}

  
//***DISPLAY FINAL DUMPLING
//***when change occurs, the corresponding dumpling + recipe link will appear
dumplingApp.displayFinal = function() {

	// on change of country radio button, display corresponding dumpling recipe
	// radio buttons can be selected by tabbing into the first button and clicking left to right arrows, as per radio button navigation
	$('[name=country]').on('change', function (e) {
		e.preventDefault();

		//get value of country button selected
		const countrySelected = $(this).val();
		countryResults.forEach((result) => {
			if (result.origin === countrySelected) {
        $('.recipe').empty();
        $('.bottomButton').empty();

        //adding the recipe + "Start over?" button
        $('.finalIntro').text(`Here's your recipe! ⬇`);
        $('.recipe').html(`<a href="${result.recipe}">${result.name}</a>`);
        
        // adding a start over button
          $('.bottomButton').append(`
              <p class="tryAgain">
                <a href="#startJourney">start over?</a>
              </p>
              <button class="dessert">
                room for dessert?
              </button>
          `);
      }
		});
	});
};
  
//***SCROLLING TO BOTTOM ON CLICK
dumplingApp.scrollBottom = function() {
	const bottom = $(document).height() - $(window).height();
	// const bottom = $(document).height();
	$('html, body').animate(
		{
			scrollTop: bottom,
		},
		800
	);
};


//****INIT
dumplingApp.init = function() {

  // TO ADD GLOW AFTER ANIMATE ROLL-IN
  $('header img').on('animationend webkitAnimationEnd', function() {
    $('header img').addClass('glow');
  })

  // SMOOTH ANIMATE SCROLLING - FROM VARIOUS W3 SCHOOLS + STACK OVERFLOW SOURCES  
  $('a').on('click', function (e) {
    // Make sure this's ID hash has a value before overriding default behavior
    if (this.hash !== "") {
    // Store hash
      const hash = this.hash;
      e.preventDefault();
      // animate() method to add smooth scroll
      // 800 milliseconds to scroll to top of ID area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function () {
      // Add hash (#) to URL when done scrolling (default click behavior)
      window.location.hash = hash;
      });
    }
  });

  // ON FORM SUBMIT ON PAGE LOAD
  $('form').on('submit', function(e) {
    e.preventDefault();
    $countries.empty();
    $finalDumpling.empty();
    $('.bottomButton').empty();

    // to check for errors before proceeding
    dumplingApp.validateForm();
  })

  // to submit choices
  dumplingApp.submitChoices();
};


//***DOCUMENT READY - ON PAGE LOAD */
$(document).ready(function(){
  dumplingApp.init();
});
