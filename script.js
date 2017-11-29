// variables

var wrapper = document.querySelector("#wrapper"),
    wrapper2 = document.querySelector("#wrapper-2"),
    wrapper3 = document.querySelector("#wrapper-3"),
    backBtn = document.querySelector(".footer__back-button"),
    newsContainer = document.getElementsByClassName("news__content"),
    credDiv = document.querySelector('.footer__cred-div'),
    bookmarkBtn = document.getElementsByClassName('news__bookmark-button'),
    twittBtn = document.getElementsByClassName('twitt-btn');

// EVENT LISTENERS to load news sources

window.addEventListener("load", displayNewsSources);

backBtn.onclick = function() {
    displayNewsSources();
    footerBookmarkBtn.classList.remove('hideFooterBtn');
    viewBtn.classList.remove('footer-view-wrapper');
    credDiv.classList.add('extend-cred-div');
}

//fetch data for news sources on main page

function displayNewsSources() {
    var xhr = new XMLHttpRequest();
    var method = "GET";
    var URL = "https://newsapi.org/v1/sources?language=en";

    xhr.open(method, URL);
    appendSources(xhr);
    xhr.send();
}

// fetch data for  bookmarked news sources

function displayBookmarkedSources() {    
        var xhr = new XMLHttpRequest();
        var method = "GET";
        var URL = "https://newsapi.org/v1/sources?language=en";
    
        xhr.open(method, URL);
        fetchBookmarks(xhr);
        xhr.send();   
}

// fetch articles data for bookmarked news sources

function getBookmarkedArticles(bookmarks, i) {   
        var request = new XMLHttpRequest();
        var method = "GET";  
        var URL = "https://newsapi.org/v1/articles?source="+ bookmarks[i].id +"&sortBy=top&apiKey=f06cf653fb394fc9b33e490f5ff5a9bc";
        request.open(method, URL);
        showArticle(request);
        request.onerror = function() {
            console.log("error");
        }
        request.send();
    }
    
//fetch data 

function getRequest(data, i) {   
        var request = new XMLHttpRequest();
        var method = "GET";  
        var URL = "https://newsapi.org/v1/articles?source="+ data.sources[i].id +"&sortBy=top&apiKey=f06cf653fb394fc9b33e490f5ff5a9bc";
        // request.responseType = "json";
        request.open(method, URL);
        showArticle(request);
        request.onerror = function() {
            console.log("error");
        }
        request.send();
    }

// show news sources on main page

function appendSources(xhr) {
    xhr.onload = function() {
        var data = JSON.parse(xhr.response);

        wrapper.style.display = "flex";
        wrapper2.style.display = "none";
        wrapper3.style.display = "none";
        console.log(data.sources);
        for (var i = 0; i < data.sources.length; i++) {

            wrapper.innerHTML +=        
            "<div class='news__container'>" + 
                "<button class='news__bookmark-button'>" +
                    "<i class='fa fa-heart-o' aria-hidden='true'></i>" +
                "</button>" +
                "<div class='news__content'>" +
                    "<div class='news__img'>" +
                        "<img src='img/"+i+ ".png' alt='' class='inner-img'>" + 
                    "</div>" +
                    "<div class='news__inner'>" +
                        "<span>" + data.sources[i].name + "</span>" +
                    "</div>" +
                "</div>" +
            "</div>";
        }  // first for loop  
        //attach event listener to bookmark button
        
        
        for (var x = 0; x < bookmarkBtn.length; x++) {  
            (function (x) {
                bookmarkBtn[x].onclick = function() {
                    bookmarkNewsSource(this, x, data); 
                }
            })(x);
        }

        //attach event lisetner to news container

        for (var j = 0; j < newsContainer.length; j++) {
            (function (j) {
                newsContent[j].onclick = function() {                   
                    getRequest(data, j);
                    wrapper2.innerHTML +=
                        "<figure class='article__top-image'>" +
                            "<img src='img/"+j+ ".png' alt='' class='inner-img'>" +
                        "</figure>"
                }
            })(j);
        }       
        // change styles of footer buttons and wrappers
        wrapper2.innerHTML = "";
        wrapper3.innerHTML = "";
        backBtn.classList.add('hideFooterBtn');
    } // onload function
}

//show articles 

function showArticle(newRequest) {
    newRequest.onload = function() {
        var data = JSON.parse(newRequest.response);

        if (newRequest.status >= 200 && newRequest.status <= 400) {
            wrapper.style.display = "none";
            wrapper2.style.display = "flex";

            // display articles 

            for (var x = 0; x < data.articles.length; x++) {
                (function (x) {
                    wrapper2.innerHTML +=
                        "<div class='article__container'>" +
                            "<img src='" + data.articles[x].urlToImage + "'>" + 
                            "<div class='article__inner'>" +
                                "<a  href='" + data.articles[x].url +"' target='blank'>" + 
                                    "<h4>" + data.articles[x].title + "</h4>" +
                                    "<p>" + data.articles[x].description + "</p>" +
                                "</a>" + 
                                "<div class='icons'>" +
                                    "<i class='fa fa-twitter twitt-btn ' aria-hidden='true'></i>" + 
                                "<div class='fb-share-button' data-href='"+ data.articles[x].url +"' data-layout='button_count' data-size='large' data-mobile-iframe='true'>" +
                                    "<a class='fb-xfbml-parse-ignore' target='_blank' href='https://www.facebook.com/sharer/sharer.php?u="+ encodeURIComponent(data.articles[x].url) +";src=sdkpreparse'>" +
                                        "<i class='fa fa-facebook fb-share-button' aria-hidden='true'></i>" +
                                    "</a></div>" +
                                "</div>" +
                            "</div>" +
                        "</div>";
                })(x);
            } // for loop

            // share article on twitter

            for (var a = 0; a < twittBtn.length; a++) {
                (function (a) {
                    twittBtn[a].onclick = function() {
                        twittArticle(data, a);
                    }
                })(a);
            }
            // change styles of footer buttons

            backBtn.classList.remove('hideFooterBtn');
            viewBtn.classList.add('footer-view-wrapper');
            credDiv.classList.remove('extend-cred-div');
            wrapper.innerHTML = "";
        }
    } //onload function
}

// change view of news sources 

var viewBtn = document.querySelector("#footer__view-button"),
    imgWrapper = document.getElementsByClassName('news__img'),
    newsInner = document.getElementsByClassName('news__inner'),
    newsImg = document.getElementsByClassName('inner-img'),
    newsContainer = document.getElementsByClassName('news__container'),
    newsContent = document.getElementsByClassName('news__content');
    viewIcon1 = document.querySelector('.view-btn1');
    viewIcon2 = document.querySelector('.view-btn2');

function changeView() {
    for (var j = 0; j < newsContainer.length; j++) {
        (function (j) {
            newsContainer[j].classList.toggle("news--view-change");
            imgWrapper[j].classList.toggle("newsImgWrapper--view-change");
            newsInner[j].classList.toggle("newsInner--view-change");
            newsImg[j].classList.toggle("newsImg--view-change");
            newsContent[j].classList.toggle("newsContent--view-change");

            if (wrapper3.style.display == 'flex') {
                removeBookmarkBtn[j].classList.toggle("bookmark-button--position");
            } else {
                bookmarkBtn[j].classList.toggle("bookmark-button--position");
            }
        })(j);       
    }
    viewIcon1.classList.toggle('hide-view-btn1');
    viewIcon2.classList.toggle('show-view-btn2');
}

viewBtn.addEventListener('click', changeView);

// bookmark news sources
function bookmarkNewsSource(that, x, data) {
    myBookmark = {
        imgNum: x,
        id: data.sources[x].id,
        name: data.sources[x].name
    };
    // check if fullTask already exists
    if (localStorage.getItem("bookmarks") === null) {
        //if not init array		
        var bookmarks = [];		
        //add to an array
        bookmarks.push(myBookmark);
        //set localstorage and convert object to a string
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    } else {
        var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));   

        var isPresent = bookmarks.some((bookmark) => {
            if (data.sources[x].name == bookmark.name) {
                return true; //Exit loop and stop going through further elements.
            }
        });
    
        if (!isPresent) {
                 bookmarks.push(myBookmark);
                 localStorage.setItem("bookmarks", JSON.stringify(bookmarks));  
        }
    }
}

//fetch bookmarks from localstorage

function fetchBookmarks (xhr) {
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    if (bookmarks !== null) {
        for (var i = 0; i < bookmarks.length; i++) {
            wrapper3.innerHTML += 

                "<div class='news__container'>" + 
                    "<button class='news__bookmarkRemove-button'>" +
                        "<i class='fa fa-recycle' aria-hidden='true'></i>" +
                    "</button>" +
                    "<div class='news__content'>" +
                        "<div class='news__img'>" +
                            "<img src='img/"+ bookmarks[i].imgNum + ".png' alt='' class='inner-img'>" + 
                        "</div>" +
                        "<div class='news__inner'>" +
                            "<span>" + bookmarks[i].name + "</span>" +
                        "</div>" +
                    "</div>" +
                "</div>";
        }
    } else if (bookmarks === null){
        wrapper3.innerHTML = '';
    }
    
    xhr.onload = function() {
        credDiv.classList.add('extend-cred-div');
        var data = JSON.parse(xhr.response);
        if (bookmarks !== null) {
            for (var j = 0; j < bookmarks.length; j++) {
                (function (j) {
                    newsContent[j].onclick = function() {
                        footerBookmarkBtn.classList.remove('hideFooterBtn');
                        getBookmarkedArticles(bookmarks, j);
                        wrapper2.innerHTML +=
                        "<figure class='article__top-image'>" +
                        "<img src='img/"+bookmarks[j].imgNum + ".png' alt='' class='inner-img'>" +
                    "</figure>"
                        wrapper3.style.display = 'none';
                        wrapper3.innerHTML = '';         
                    }
                })(j);
            } // second for loop
        }
    }
    
    // click event to remove bookmarked news source

    for (var i = 0; i < removeBookmarkBtn.length; i++) {
        removeBookmarkBtn[i].style.color = '#531c1c';
        removeBookmarkBtn[i].onclick = function() {
            removeBookmarks(this);
        }
    }
}

// remove bookmarks

var removeBookmarkBtn = document.getElementsByClassName('news__bookmarkRemove-button');

function removeBookmarks(thatBtn) {
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    var sourceName = thatBtn.parentNode.lastChild.lastChild.firstChild.innerHTML;
    var thisNewsContainer = thatBtn.parentNode; 
    
    for (var x = 0; x < bookmarks.length; x++) {
        if (sourceName == bookmarks[x].name) {
            bookmarks.splice(x,1);
            console.log(bookmarks);
        }
    }
    thisNewsContainer.style.display = 'none';
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}


// display bookmarks window

var footerBookmarkBtn = document.querySelector('#footer__bookmark-button');

function showBookmarks () {
    footerBookmarkBtn.classList.add('hideFooterBtn');
    backBtn.classList.remove('hideFooterBtn');
    credDiv.classList.add('extend-cred-div');
    wrapper.style.display = "none";
    wrapper2.style.display = "none";
    wrapper3.style.display = "flex";

    //empty two wrappers
    wrapper.innerHTML = '';
    wrapper2.innerHTML = '';
}

// show bookmarked news sources

footerBookmarkBtn.onclick = function() {
    showBookmarks();
    displayBookmarkedSources();
}

//share article on twitter

function twittArticle (data, x) {
    var articleTwitt = data.articles[x].url;
    var twtLink = 'http://twitter.com/home?status=' + encodeURIComponent(articleTwitt);
    window.open(twtLink,'_blank');
}

// function to display search input

var searchBtn = document.querySelector("#search-btn"),
    searchInput = document.querySelector(".header__search-input"),
    headerTitle = document.querySelector("h1");

function displayInput() {
    searchInput.classList.toggle("showInput");
    headerTitle.classList.toggle('hideHeaderTitle');

    searchInput.focus();
    searchInput.value = "";
}

// close input when it loses focus

searchBtn.addEventListener("click", displayInput);

searchInput.addEventListener('blur', () => {
    searchInput.classList.remove("showInput");
    headerTitle.classList.remove('hideHeaderTitle');
})

//search through news sources

function searchNewsSources(e) {
    var searchValue = searchInput.value.toUpperCase();
    for (var i = 0 ; i < newsContainer.length; i++) {
        var c = newsContainer[i].lastChild.lastChild.innerHTML;
        if (c.toUpperCase().indexOf(searchValue) > -1 ) {
            newsContainer[i].style.display = '';
        } else {
            newsContainer[i].style.display = 'none';
        }
    }
}

searchInput.addEventListener('keyup', searchNewsSources);