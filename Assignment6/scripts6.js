function queryArtist() {
//get the MBID of the artist before we heading to the release page
//(need it to compose the urlfor the albulm)
    let params1 = (new URL(document.location)).searchParams;
    if (params1.has('artist')) {
        let artistName1 = params1.get('artist');
        console.log(artistName1);
        let mbBaseURL1 = "https://musicbrainz.org/ws/2/";
        let mbResource1 = "artist?query=";
        let queryURL1 = mbBaseURL1 + mbResource1 + artistName1;
        console.log(queryURL1);
        httpGet1(queryURL1, getMBID);
        //queryalbumpage(getMBID)
        //console.log("Im in function1:")
        //console.log(getMBID)
            } }
//send the artist name to the server 

function httpGet1(theURL, cbFunction) {
    let xmlHttp1 = new XMLHttpRequest();
                xmlHttp1.open("GET", theURL);
                xmlHttp1.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    cbFunction(this); // Then, we call the callback function to parse the response and render the appropriate results
                }
                };

                xmlHttp1.send();

            }
//get the MBID of the input artist 
function getMBID(xmlHttp1) {
    //console.log(xmlHttp1)
    //console.log("Im in")
    let retrievedData = xmlHttp1.responseXML; // Returns the response as XML data
                console.log(retrievedData);
                let artistData = retrievedData.getElementsByTagName("artist")[0];
                console.log(artistData);
                let artistName = artistData.getElementsByTagName('name')[0].innerHTML; // => Construct this in parts: ('name'), [0], innerHTML
                console.log(artistName);
//now I have the MBID so I can use it to create a second url for the album
                let artistMBID = artistData.id;
                queryalbumpage(artistMBID)
                //console.log(artistMBID)
                
                
}


//Use the same way to create the access to the album page
//first target the url (wait What should I do to bring the artist MBID value to the second URL )
function queryalbumpage(id) {
    //console.log("hello!!!")
        let MBID= id
        //console.log(MBID)
        let mbBaseURL2 = "https://musicbrainz.org/ws/2/";
        let mbResource2 = "release-group?artist=";
        let mbEND ="&type=album|ep";
        let queryURL2 = mbBaseURL2 + mbResource2 + MBID +mbEND;
        console.log(queryURL2);
        httpGet2(queryURL2, getAlbumName);
        /* let params = (new URL(document.location)).searchParams;
        if (params.has('artistMBID')) {
            let artistName2 = params.get('artistMBID');
            console.log(artistName2); // don't know how to make is a inner response of the script 
            let mbBaseURL2 = "https://musicbrainz.org/ws/2/";
            let mbResource2 = "release-group?artist=";
            let mbEND ="&type=album|ep";
            let queryURL2 = mbBaseURL2 + mbResource2 + MBID +mbEND;
            console.log(queryURL2);
            httpGet2(queryURL2, getAlbumName); 
                } 
                */
            }
                
//tbh don't understand .
function httpGet2(theURL, cbFunction) {
    let xmlHttp2 = new XMLHttpRequest();
                xmlHttp2.open("GET", theURL);
                xmlHttp2.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    cbFunction(this); // Then, we call the callback function to parse the response and render the appropriate results
                }
                };

                xmlHttp2.send();

            }
//select the information needed:1st release-group to title; 2nd release-group to release date
function getAlbumName(xhttp2) {
    let retrievedData2 = xhttp2.responseXML; // Returns the response as XML data
    let albumList = [];
    //count how many albums are there
    var nodes = retrievedData2.getElementsByTagName('title'),
    counter = nodes.length
    //copy data to variable albumList
    for (let i = 0; i<counter;i++){
        albumList[i]=retrievedData2.getElementsByTagName("release-group")[i];
    }
    let albumNameList = [];
    let albumDateList = [];
    //put name and release date into arrays
     for (let i=0;i<albumList.length;i++){
        albumNameList[i]=albumList[i].getElementsByTagName('title')[0].innerHTML;
        albumDateList[i]=albumList[i].getElementsByTagName('first-release-date')[0].innerHTML;
    } 
    //print all the elements in the two lists
    var nameAll=""
    let dateAll=""
    for(let i=0;i<counter;i++){
        //console.log("Name:"+albumNameList[i]+" Date:"+albumDateList[i])
        nameAll+=albumNameList[i]+"<br>"
        dateAll+=albumDateList[i]+"<br>"
        
    }

    console.log(nameAll)
    console.log(dateAll)

    let album_name = document.getElementById('album_name');
    album_name.innerHTML = ` ${nameAll} `

    let album_date = document.getElementById('album_date');
    album_date.innerHTML = ` ${dateAll} `
    
    
    // let album_name= document.getElementById('album_name');
    //  album_name = ` 
    //  <b>${nameAll}</b>

    // <ul>
    //     <li><b>Name</b> is <i>${nameAll}</i></li>
    // </ul>
    // `
    
    // let album_date= document.getElementById('album_date');
    // for(let i=p; i<counter ;i++){
    //     album_date.innerHTML = ` <b>${albumDateList[i]}</b>
    // }
    // `
   
    //console.log(document);
}

// Call to the main function at loading
window.onload = queryArtist;
