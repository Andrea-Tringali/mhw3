//Key and secret per Spotify OAuth2.0 
const key_client = '6728a4b3132f44f18091ca96ae945411';
const secret_client = 'b36f690b89eb421e8e8f7ae5418fd3d7';

let token;
const form= document.querySelector('#form_2');
form.addEventListener('submit', search);

function onTokenJson(json){

	console.log(json);
    token = json.access_token;
}

function onTokenResponse(response){

    return response.json();
}

fetch("https://accounts.spotify.com/api/token",
        {
            method: "post",
            body: 'grant_type=client_credentials',
            headers: 
            {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(key_client + ':' + secret_client)
            }
        }
).then(onTokenResponse).then(onTokenJson);

function onResponse(response) {
    console.log('Risposta ricevuta');
    return response.json();
}

function onJson(json){
    
    console.log(json);
    const playlist=document.querySelector("#spotify-view");
    playlist.innerHTML=''; 
    let results=json.tracks.total;

    if(results>3){
        results=6;
    }

    for(let i=0; i<results ; i++){
        const result=json.tracks.items[i];
        const title=result.name;
        const albumName=result.album.name;
        const artista=result.artists[0].name;
        const img_album=result.album.images[0].url;

        const track=document.createElement('div');
        track.classList.add('track');
        const img=document.createElement('img');
        img.src=img_album;
        img.classList.add('track_img');
        const titolo=document.createElement('span');
        titolo.textContent=title;
        const cantante=document.createElement('span');
        cantante.textContent=artista;
        const nome_album=document.createElement('span');
        nome_album.textContent=albumName;
        const link=document.createElement('a');
        link.setAttribute('href', result.external_urls.spotify);
        link.textContent=title;

        track.appendChild(titolo);
        track.appendChild(cantante);
        track.appendChild(nome_album);
        track.appendChild(img);
        track.appendChild(link);
        playlist.appendChild(track);
    }

}

function search(event){
    event.preventDefault();
    const text= document.querySelector('#content').value;
    const track_value= encodeURIComponent(text);

fetch("https://api.spotify.com/v1/search?type=track&q=" + track_value,
        {
            headers: 
            {
                'Authorization': 'Bearer ' + token
            }
        }
    ).then(onResponse).then(onJson);
}

function onFocus()
{
  const text = document.querySelector('input');
  text.value = '';
}

function onBlur()
{
  const text = document.querySelector('input');
  if(text.value.length == 0)
  {
    text.value = 'Inserire titolo';
  }
}

const text = document.querySelector("input")
text.addEventListener("focus", onFocus);
text.addEventListener("blur", onBlur);

//icona Spotify
const icon = document.querySelector('#photo1');
icon.addEventListener('click',ClickonSpotify);

function ClickonSpotify(event){
    window.open('https://developer.spotify.com/', 'width=600, height=500, left=0, top=0').creator;
    event.preventDefault();
}

//Seconda API

const button=document.querySelector('#Bottone');
button.addEventListener('click',Generi);

const url="https://binaryjazz.us/wp-json/genrenator/v1/genre/";

function Generi(event){
    event.preventDefault();
    const restURL=url;
    //eseguo il fetch
    fetch(restURL).then(onResponseG).then(onJsonG);
}

function onResponseG(response){
    return response.json();
}

function onJsonG(json){
    //console.log(json);
    const box= document.querySelector('#gen-view');
    box.innerHTML=' ';
    const p = document.createElement('p');
    p.innerHTML = json;

    box.appendChild(p);
}

