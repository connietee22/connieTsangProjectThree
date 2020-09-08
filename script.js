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



$(document).ready(function(){
  
  // function findValue(array) {
  //   for (let i = 0; i < array.length; i++) {
  //     if (array[i].filling === "veg"){
  //       return array[i];
  //     }
  //   }
  // }


  const finalDumplings = [];
  const valueFromQuiz = "boiled";
  const typesOfDumplings = dumplings[valueFromQuiz];
  console.log(dumplings.boiled);
  for (let i = 0; i < typesOfDumplings.length; i++) {
    if (typesOfDumplings[i].filling === "veg") {
      finalDumplings.push();
    }
  }

});