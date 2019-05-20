//  FETCH
var searchBooks;
//searchBooks = data.books;

fetch("https://api.myjson.com/bins/udbm5")
  .then(response => response.json())
  .then(data => {
    searchBooks = data.books;

    listBooks(searchBooks);
    filterBooks(searchBooks);
  })
  .catch(err => console.log(error));

//end of Fetch

function listBooks(searchBooks) {
  document.getElementById("midsection").innerHTML = "";

  console.log(searchBooks);

  for (var i = 0; i < searchBooks.length; i++) {
    var booktitles = searchBooks[i].titulo;

    var bookcover = searchBooks[i].portada;

    var bookdetail = searchBooks[i].detalle;

    var bookdescr = searchBooks[i].descripcion;

    var booklang = searchBooks[i].idioma;
    //         console.log(booktitles)

    //sample js to remodel

    //dynamically create a div call it filterdiv
    var filterdiv = document.createElement("div");
    //add filter to the midsection
    document.getElementById("midsection").appendChild(filterdiv);

    //assign class name to flipme div
    filterdiv.setAttribute("class", "filterme");

    //dynamically create a div called flipme
    var flipme = document.createElement("div");
    //the flipme div goes inside the filter div
    filterdiv.appendChild(flipme);

    //assign class name to flipme div
    flipme.setAttribute("class", "flipme");

    //create a div call it flipme_inner
    var flipme_inner = document.createElement("div");

    //flipme_inner div goes inside the flipme div
    flipme.appendChild(flipme_inner);

    //assign class name to flipme_inner div
    flipme_inner.setAttribute("class", "flipme_inner");

    //dynamically create a div call it thebooks
    var thebooksdiv = document.createElement("div");

    //thebooksdiv goes inside flipme_inner div
    flipme_inner.appendChild(thebooksdiv);

    //give classes to thebooks divs
    thebooksdiv.setAttribute("class", "thebooks");

    //set attributes to the books
    thebooksdiv.setAttribute("data-title", booktitles);

    thebooksdiv.setAttribute("data-lang", booklang);

    //create div call it backofbooks
    var backofbooksdiv = document.createElement("div");

    //thebackofbooks div goes inside flipme_inner div
    flipme_inner.appendChild(backofbooksdiv);

    //give classes to the backofbooks divs
    backofbooksdiv.setAttribute("class", "backofbooks");

    //set attributes to the back of the books
    //        backofbooksdiv.setAttribute("data-detail", bookdetail);

    //add cover book image
    var coverimg = document.createElement("img");

    coverimg.setAttribute("src", bookcover);

    thebooksdiv.appendChild(coverimg); //this worked

    //add book descrption detail from object
    var makeaptag = document.createElement("p"); //create p element
    var addtext = document.createTextNode(bookdescr);

    makeaptag.appendChild(addtext); //adds bookdescrip text to p tag

    backofbooksdiv.appendChild(makeaptag); //adds p tags to backofbooks divs

    var adda = document.createElement("a");

    adda.setAttribute("href", bookdetail);

    adda.setAttribute("data-fancybox", "images");

    backofbooksdiv.appendChild(adda);

    //add buttons to the back of each book
    var button = document.createElement("button");
    var btntext = document.createTextNode("Book Info");

    button.appendChild(btntext);

    button.setAttribute("class", "morebtn");

    backofbooksdiv.appendChild(button);

    adda.appendChild(button);
  } //end of for loop
} //end of listBooks function

function filterBooks(searchBooks) {
  //filter books
  var searchBar = document.forms["searchbar"].querySelector("input");

  //        //addeventlistener
  searchBar.addEventListener("keyup", function(e) {
    //             get value of text in put in the search bar and convert it to lower case
    var inputext = e.target.value.toLowerCase(); //this works
    //               console.log(inputext)//this works
    console.log(inputext);
    var copyArray = Array.from(searchBooks);

    if (inputext.length == 0) {
      console.log("please enter something to search");
      return listBooks(copyArray);
    }

    var filtered = copyArray.filter(function(book) {
      //            var concat = book.titulo + book.descripcion;
      //                 var concat = book.titulo + book.idioma;

      var title = book.titulo;

      return title.toLowerCase().includes(inputext);
    });

    console.log("filtered", filtered);

    listBooks(filtered);
  }); //function(e)
} //end of function filterBooks

function searchLanguage() {
  var selectedLanguage = []; //empty array where the radio values are stored
  //    console.log(selectedLanguage);
  var copyArray = Array.from(searchBooks);
  var scanRadios = document.querySelectorAll("[type=radio]:checked");
  //    console.log(scanRadios);

  for (var i = 0; i < scanRadios.length; i++) {
    //a loop through the length of the var scanRadios

    selectedLanguage.push(scanRadios[i].value); //will return the values es or en
    console.log(selectedLanguage);
  }

  if (selectedLanguage[0] === "all") {
    console.log("all books");
    return listBooks(copyArray);
  }

  var filtered = copyArray.filter(function(book) {
    return book.idioma == selectedLanguage[0];
  });

  listBooks(filtered);
} //end of  function
