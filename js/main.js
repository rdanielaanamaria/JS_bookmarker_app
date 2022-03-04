//1 Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark); /*the actual event, 'submit' and then we want to put the function when that happens */

function saveBookmark(e) { /*create function and pass in an event parameter - we can prevent with (e) the flashing in the console- we want to stop it to work with it*/


    //3 Get the values that we pass in - create 2 form values
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;

    // 10
    if(!validateForm(siteName, siteUrl)){
        return false;
    }

    //4 when we submit to local storage, we wanna save it as an array of objects, so we create another variable to get an object ready to submit to local storage

    var bookmark = {
        name: siteName,
        url: siteUrl
    }

    /*// Local storage test (Local storage stores strings)
    localStorage.setItem('test', 'hello');
    // Get an item from local storage
    console.log(localStorage.getItem('test'));
    // Delete from local storage
    localStorage.removeItem('test');
    console.log(localStorage.getItem('test'));*/


    //5 Save the bookmark that we created in local storage, but before we do that we have to actually see if there's a bookmark value there (if it is there we have to fetch it, add to it and then save it again)

    if (localStorage.getItem('bookmarks') === null) {
        var bookmarks = []; /*initialize an array */
        bookmarks.push(bookmark); /*add to array */
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks)); /*set it to localstorage and bc it's a Jason array we need to save it as a string and need to wrap it in a function with JSON.stringify*/
    } else {
        // Get bookmarks from local storage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks')); /*json.parse will turn the string back into json */
        // add bookmark to array
        bookmarks.push(bookmark);
        // Re-set it back to localstorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    //11 Clear the form after we submitted
    document.getElementById('myForm').reset();



    // Re-fetch bookmarks
    fetchBookmarks();


    e.preventDefault(); /*2 prevent default*/
}

// 7 create deleteBookmark function

function deleteBookmark(url) {
    // Get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Loop through bookmarks
    for (var i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].url == url) {
            // Remove from array
            bookmarks.splice(i, 1);
        }
    }
    // Re-set it back to localstorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    // Re-fetch bookmarks
    fetchBookmarks();
}

// 6 Fetch bookmarks
function fetchBookmarks() {
    // Get bookmarks from local storage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    // Get output id
    var bookmarksResults = document.getElementById('bookmarksResults');

    // Build output
    bookmarksResults.innerHTML = '';

    // Loop through the bookmarks in localStorage and output them one by one inside of a div
    for (var i = 0; i < bookmarks.length; i++) {
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarksResults.innerHTML += '<div class="well">' +
            '<h3>' + name +
            ' <a class ="btn btn-default" target=_blank href="' + url + '">Visit</a> ' +
            ' <a onclick ="deleteBookmark(\'' + url + '\')" class ="btn btn-danger"  href="#">Delete</a> ' +
            '</h3>' +
            '</div>';
    }

}
// 8 Validate form ( bc when submitting empty field, they are shown above)
function validateForm(siteName, siteUrl){
    
    if (!siteName || !siteUrl) {
        alert('Please fill in the form');
        return false;
    }

    // 9 url MUST be an url link
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(!siteUrl.match(regex)){
        alert('Please use a valid url');
        return false;
    }

    return true;
}
