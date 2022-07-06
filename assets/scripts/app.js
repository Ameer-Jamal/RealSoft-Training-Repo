storeDisplayStatus=true;
let currentPage = 1
let rowsMax = 8
let storedBooks = JSON.parse(localStorage.getItem('books')) || []
refreshList(storedBooks)
///////////////////////////////////////////////////////////////////

//Open The add Book diaolog
document.getElementById("addBook").addEventListener("click",  () => {
    document.getElementById("backdrop").classList.add('visible');
    document.getElementById("add-modal").classList.add('visible');
});

//close The add Book diaolog
document.getElementById("cancelAddBook").addEventListener("click", () => {
  
    //clear inputs
    document.getElementById("rating").value = "";
    document.getElementById("image-url").value = "";
    document.getElementById("title").value = "";
    
    //Clear Class (Make invisible)
    document.getElementById("backdrop").classList.remove('visible');
    document.getElementById("add-modal").classList.remove('visible');


});

function sortBooks(books){
    let sortedbooks = books
    return sortedbooks.sort((a,b) => (a.rating > b.rating) ? -1 : ((b.rating > a.rating) ? 1 : 0))
}

// Display highest rating first when clicked 
document.getElementById("sortBooks").addEventListener("click", () => {
    // Refresh the book list with the books sorted 
    if(storeDisplayStatus){
        refreshList(sortBooks(storedBooks));
    }
    else{
        refreshList(sortBooks(books));
    }
});

// Display books depending on a filter
document.getElementById("filterBooks").addEventListener("click", () => {
    // Refresh the book list with the books sorted 
    if(storeDisplayStatus){
        storedBooks = JSON.parse(localStorage.getItem('books')) || []
        requiredRating = prompt("Which Rating of books would you like to display?")
        let ratedBooks = storedBooks.filter(books => books.rating == requiredRating);

        refreshList(sortBooks(ratedBooks,rowsMax,1));
    }
    else{

        requiredRating = prompt("Which Rating would you like to display?")
        let ratedBooks = books.filter(x => x.rating == requiredRating);
        refreshList(sortBooks(ratedBooks,rowsMax,1));
    }
});

// THIS HAS BEEN REPLACED TO IMPLEMENT UNIQUE ID 
//defining a global variable for 
//The auto increment of Book ID 
// var id = 0
// The book class object
class Book {
    constructor(title, url, rating) {
        const uid = () => {
            return Date.now().toString(36) + Math.random().toString(36).substr(2);
          };
          
          // Usage. Example, id = khhry2hb7uip12rj2iu
        //set this books attributes to the required attribuites  
        this.id = uid();;
        this.title = title;
        this.rating = rating;
        this.url = url;


    }
}

//////////////////////////////////////////////////////////////////////////////////////////

// This function generates the neccessary amount of buttons depending on the amount of objects to display
function setupPagination(books,rowsPerPage){
    // Whenever we set up we clear the div to make sure page numbers dont get ontop of eachother
    document.getElementById("pageNumber").innerHTML=""
    // we use ceil to make sure any extra book gets displayed 
    // for example if the row size is 5 and we have a total of 32 books 
    // we need 7 pages 6 of those pages will be full and the last page will have
    // the extra 2 books 
    let pageCount = Math.ceil(books.length/rowsPerPage)

    // creat and append buttons depending on how many pages we should have to display all the books
    for(let i = 1;i<pageCount+1;i++){
        let btn = paginationButton(i)
        document.getElementById("pageNumber").appendChild(btn);
    }
}

// Creates Page Buttons and gives them onclick events to navigate through pages
function paginationButton(page){
    // make a button
    let button = document.createElement('button')

    // let this button text be the page number 
    button.innerText=page
    
    //add a class 'active' to this button if its the current page for css purposes
    if (currentPage == page){ button.classList.add ('active')}

    // Adding click listener to each button
    button.addEventListener('click',function() {
        // set the current page to the button we clicked on 
        currentPage = page;

        // if we are accessing all stored books    
        if(storeDisplayStatus){
        refreshList(storedBooks)
        // adding and removing active class on button for css purposes 
        let prevCurrentButton = document.querySelector('#pageNumber button.active')
        prevCurrentButton.classList.remove('active')
        button.classList.add('active')
    }

    // else do the same thing but for the non stored books
    else{
        refreshList(books)
        let prevCurrentButton = document.querySelector('#pageNumber button.active')
        prevCurrentButton.classList.remove('active')
        button.classList.add('active')

    }
})

// return the created button
return button ;
}

// Displaying the books in a list helper function
 function refreshList(books,rowsPerPage = rowsMax, page = currentPage) { $(document).ready(function() {
     
     page--;
     let start = rowsPerPage * page;
     let end = start + rowsPerPage
     let paginatedBooks = books.slice(start,end)

     // if not empty (there are currently books)
    if (!!paginatedBooks.length) {

        // empty the book list
        document.getElementById("book-list").innerHTML = "";
        document.getElementById("emptyListParagraph").innerHTML = "";
        

        
        
        // Loop through all books in array and display its attributes
        for (let i = 0; i <paginatedBooks.length; i++){
    $("ul").append(
    '<li class="book-element">'+
        '<div class="book-element__image">'+
            '<img onclick="deleteBook(this.id)" id="'+ paginatedBooks[i].id +'"'+ "src="+paginatedBooks[i].url+'">'+
        '</div>'+
        '<div class="book-element__info">'+
            '<h2>'+ paginatedBooks[i].title + '</h2>' +
            '<p>'+  paginatedBooks[i].rating+'/5 </p>'
        +'</div>'+
    '</li>' 
                    );}
                    setupPagination(books,rowsPerPage)
                }
        else{
            // Empty the list and verbose that the list is empty to user
            document.getElementById("emptyListParagraph").innerHTML = "List Currently Empty!!!";
            document.getElementById("book-list").innerHTML = "";
            
        }
    
});}
////////////////////////////////////////////////////////////////////////////////////////

let books=[]
// Entering a book object into the array of books
document.getElementById("confirmAddBook").addEventListener("click", () => {
    //Get data from input fields 
    let title = document.getElementById("title").value;
    let url = document.getElementById("image-url").value;
    let rating = document.getElementById("rating").value;
   
    //construct the book object
    let book = new Book(title,url,rating)
    
    console.log("==========================================================");
    console.log("the book you just made is:\n")
    console.log(book);

    //adding the just created book into the book array 
    books.push(book);

  

    // logging out the object array 
    console.log("==========================================================");
    console.log("the books in the array right now are:\n")
    for (let i = 0; i < books.length; i++) {
    console.log(books[i])
    }
    
    ///////////////////////////////////////////////////////////////////////////////////////////////
    // get all the books from local storage, add onto it the new book we just made
    // and then push it back into local storage 
    
    storedBooks = JSON.parse(localStorage.getItem('books')) || []
    storedBooks.push(book)
    localStorage.setItem("books", JSON.stringify(storedBooks));

    console.log("==========================================================");
    //show whats stored
    console.log("the stored books are:\n")
    console.log(storedBooks);

    ///////////////////////////////////////////////////////////////////////////////////////////////
    alert("the book "+book+" has been added Successfully ")
    refreshList(storedBooks);
    
});


/////////////////////////////
function deleteBook(bookId){
    //show dialog and backdrop and remove backdrops 
    var showDelete = ()=>{
    document.getElementById("backdrop").classList.add('visible');
    document.getElementById("delete-modal").classList.add('visible');
    }
    var unshowDelete = ()=>{
    document.getElementById("backdrop").classList.remove('visible');
    document.getElementById("delete-modal").classList.remove('visible');
    }
    
    
    showDelete();


    document.getElementById("confirmDel").addEventListener("click",  () => { 
        if(!storeDisplayStatus){
        for(var i = 0; i < books.length; i++) {
        if(books[i].id == bookId) {
            books.splice(i, 1);
            break;
        }
    }


}
    else{
        books = storedBooks
        for(var i = 0; i < books.length; i++) {
            if(books[i].id == bookId) {
                books.splice(i, 1);
                break;
            }
        }

        window.localStorage.clear();
        localStorage.setItem("books", JSON.stringify(storedBooks));
    }

    // console.log(books)   
    refreshList(books) 
    unshowDelete()

    });

    //If cancel is pressed after delete book
    document.getElementById("cancelDel").addEventListener("click",  () => { 
        unshowDelete()
    });

}


///////////////////////////////////////////////////////////////////////////////////////////
// Clearing Local storage and emptying global variable (books)
document.getElementById("clearBooks").addEventListener("click",  () => {
    // Confirmation dialog for Delete book
    if (!window.confirm("Are you sure you would like to delete all books?")) {
    return false;        
    }

else{
    //clear all local storage
    window.localStorage.clear();

    // empty the books array
    books.length = 0

    //redisplay books 
    refreshList(books)

    /////////////////////////////////////////////////////////////////////////
    //Log to make sure local storage has been emptied successfully 
    console.log("==========================================================");
    //show whats stored now
    console.log("the stored books are:\n")
    let storedBooks = JSON.parse(localStorage.getItem('books')) || []
    console.log(storedBooks);
}
});

///////////////////////////////////////////////////////////////////////////////////////////
document.getElementById("showStore").addEventListener("click",  () => {
    storeDisplayStatus=true
    // Getting all books in local storage 
    storedBooks = JSON.parse(localStorage.getItem('books')) || []
    // Displaying the books weve saved 
    refreshList(storedBooks)
})

