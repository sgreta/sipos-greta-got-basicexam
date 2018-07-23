function getData(url, callbackFunc) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      callbackFunc(this);
    }
  };
  xhttp.open('GET', url, true);
  xhttp.send();
}

function successAjax(xhttp) {
  // itt a json content, benne a data változóban
  var userDatas = JSON.parse(xhttp.responseText)[2].data;
  console.log(sortCharactersByName(userDatas));
  console.log(removeDeadCharacters(userDatas));
  makeElementsForCharacters(userDatas);

  /*
      Pár sorral lejebb majd ezt olvashatod:
      IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ!

      Na azokat a függvényeket ITT HÍVD MEG!

      A userDatas NEM GLOBÁLIS változó, ne is tegyétek ki globálisra. Azaz TILOS!
      Ha valemelyik függvényeteknek kell, akkor paraméterként adjátok át.
    */
}

// Írd be a json fileod nevét/útvonalát úgy, ahogy nálad van
getData('/json/got-characters.json', successAjax);

// Live servert használd mindig!!!!!
/* IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ! */

function sortCharactersByName(names) {
  names.sort(function (a, b) {
    var aName = a.name.toLowerCase();
    var bName = b.name.toLowerCase();
    if (aName < bName) {
      return -1;
    }
    if (bName < aName) {
      return 1;
    }
    return 0;
  });
  return names;
}

function removeDeadCharacters(live) {
  for (var i = 0; i < live.length; i++) {
    if (parseInt(live[i].dead) == 1) {
      live.splice(i, 1);
      i--;
    }
  }
  return live;
}

function makeElementsForCharacters(character) {
  var container = document.querySelector('.div-list');
  for (var i = 0; i < character.length; i++) {
    var smallDiv = document.createElement('div');
    var charImg = document.createElement('img');
    charImg.src = character[i].portrait;
    var charName = document.createElement('p');
    charName.innerText = character[i].name;
    charName.setAttribute('onclick', `getOneCharacter(${i})`);
    container.appendChild(smallDiv);
    smallDiv.appendChild(charImg);
    smallDiv.appendChild(charName);
  }
}

function getOneCharacter(index) {
  getData('/json/got-characters.json', function (arr) {
    showOne(arr, index);
  });
}

function showOne(names, index) {
  var chars = JSON.parse(names.responseText)[2].data;
  displayCharacter(chars[index]);
}

function displayCharacter(character) {
  var movieImg = document.querySelector('.movie-img');
  movieImg.src = character.picture;
  var movieName = document.querySelector('.got-name');
  movieName.innerText = character.name;
  var house = document.querySelector('.house-img');
  house.src = `assets/houses/${character.house}.png`;
  var story = document.querySelector('.bio');
  story.innerText = character.bio;
}

function startSearch(person) {
  var uData = JSON.parse(person.responseText)[2].data;
  var inputValue = document.querySelector('.input-field').value;
  for (var i = 0; i < uData.length; i++) {
    if (inputValue == uData[i].name) {
      displayCharacter(uData[i]);
      break;
    }
  }
  return uData[i];
}

function searchCharacter() {
  getData('/json/got-characters.json', startSearch);
}
