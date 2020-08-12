let btnSearch = document.getElementsByClassName('search')[1];
let btnPP = document.getElementsByClassName('btnPP')[0];
let btnNP = document.getElementsByClassName('btnNP')[0];
let TokenPP;
let TokenNP;


function fetching(url){
    let settings = {
        method : 'GET'
    };
    fetch( url, settings )
    .then( response => {
        if( response.ok ){
            return response.json();
        }
        throw new Error( response.statusText );
    })
    .then( responseJSON => {
        let video = document.querySelector( 'section' );
        
        nextPageToken = responseJSON.nextPageToken;
        prevPageToken = responseJSON.prevPageToken;
        
        video.innerHTML = "";

        for( let i = 0; i < responseJSON.items.length; i ++ ){
            video.innerHTML += `
                <div>
                <a href="https://www.youtube.com/watch?v=${responseJSON.items[i].id.videoId}" target="_blank">
                        <img src="${responseJSON.items[i].snippet.thumbnails.high.url}"/>
                        </a>
                        <h2>${responseJSON.items[i].snippet.title}</h2>
                </div>
                `;
        }
            
        btnPP.style.display = "";
        btnNP.style.display = "";
        
        btnPP.disabled = (responseJSON.prevPageToken === undefined);
        btnNP.disabled = (responseJSON.nextPageToken === undefined);

        TokenPP = responseJSON.prevPageToken;
        TokenNP = responseJSON.nextPageToken;
    })
    .catch( err => {
        console.log( err );
    });
}

function search(){
    let inputSearch;
    const API_KEY = "AIzaSyAxsO1WSPURSIIn_iUB7zFwb8tDAz9gnH0";

    btnPP.disabled = true;
    btnNP.disabled = true;
    btnPP.style.display = "none";
    btnNP.style.display = "none";

    btnSearch.addEventListener( 'click', ( event ) => {
        event.preventDefault();

        
        inputSearch = document.getElementsByClassName('search')[0].value;
        
        let url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${inputSearch}surfing&key=${API_KEY}`
        
        fetching(url);
    });
            
    btnPP.addEventListener('click', (event) => {
        event.preventDefault();
        let url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${inputSearch}surfing&key=${API_KEY}&pageToken=${TokenPP}`

        fetching(url);
    });


    btnNP.addEventListener( 'click', ( event ) => {
        event.preventDefault();
        let url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${inputSearch}surfing&key=${API_KEY}&pageToken=${TokenNP}`

        fetching(url);
    });
}


function init(){
    search();
}

init();