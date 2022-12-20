//Two constant values, for names and mbids
const nameList = []
const mbidList = []

function getDataset(){
    
/**
 *  Read JSON file from https://acousticbrainz.org/api/v1/datasets/870d8017-88e3-4591-92de-52cc83c5098c
 *  Since acousticbrainz doesn't provide a  sepcial header required by CORS policy
    Use a proxy to aviod errors
    The proxy we are using is called cors-anywhere, I already download the module and put it in the following directory: .\node_modules\cors-anywhere
    Run the module with following command:
    **************
    npm run start
    **************
    In case you don't have nodejs installed in your computer:
 * -To install node js, open a powershell in admin privilege and run the following command:
        Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
        cinst nodejs install
    -Open a terminal in VScode in current directory, run the following commands:
        cd finalproject\node_modules\cors-anywhere\lib\
        npm run start 
 */
    
    //The proxy is running on localhost:8080
    let baseUrl = 'http://localhost:8080/https://acousticbrainz.org/api/v1/'
    let dataset = 'datasets/870d8017-88e3-4591-92de-52cc83c5098c'
    fetch(baseUrl+dataset, {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
    },
    
})
.then(function(response) { return response.json(); })
.then(function(json) {
  // All the data in the dataset in stored in the variable "json"
  //The Jazz category is located in the sixth class
  let mbid = []
  for(let i = 0; i<json.classes[5].recordings.length; i++){
     mbid[i] = json.classes[5].recordings[i]
    
    
  }
  let queryurl=baseUrl+'low-level?recording_ids='
  
  //Now that 2000 jazz songs in the dataset is stored in the variable "mbid"
  //There is a MAX_ITEMS_PER_BULK_REQUEST limitation seted by acousticbrainz, it is seted to 25.
  //However, I found in tests that requesting 10 items is more stable
  
  //In the following for loop, I regroup mbids by 10.  
    var listMbid = []
    for(let i = 0; i<200; i++){
        for(let k = 0; k<10; k++){
            let counter = k+i*10
            listMbid[i]=listMbid[i]+mbid[counter]+';'
        }
        //Get rid of "undefined"s in the array
        listMbid[i]=listMbid[i].slice(9)
    }

    
    queryurl="http://localhost:8080/https://acousticbrainz.org/api/v1/low-level?recording_ids="
    
    //Acousticbrainz doesn't provide a search api we can use to search directly from their database, so we need to find the keys and titles of thoes 2000 songs by ourselves
    //Request the informations that we need correspond to mbids
    for (let i = 0; i<listMbid.length; i++){
    //Some requests are failed, read in console 429:too many request
    //it is because the ratelimitation of the acouticbrainz api
    //However, we can still get a fairly big amout of data
     finalUrl=queryurl+listMbid[i]+"&features=tonal.key_key;metadata.tags;tonal.key_scale"
     fetch(finalUrl, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
    })
    .then(function(response) { return response.json(); })
    .then(function(json) {
        for(let j = 0; j<10; j++){
            let jsonClass = json[mbid[i*10+j]]
            let songName=jsonClass["0"].metadata.tags.title
            let key=jsonClass["0"].tonal.key_key
            let scale=jsonClass["0"].tonal.key_scale
            nameList[i*10+j] = songName+" :"+key+" "+scale
            mbidList[i*10+j] = mbid[i*10+j]
        }
        
        
    })
 }
});
}


//read user input and generate outputs
function userInput(){
    //Since the array namelist is constant, we need a copy of this array in order to manipulate it
    let songList = nameList
    let tempMbid = mbidList
    let e = document.getElementById("keysig")
    let key_value = e.value
    e = document.getElementById("mode")
    let mode_value = e.value
    //Prepare string variables for the output
    let title = ""
    let key = ""
    //Again, get rid of undefineds
    songList = songList.filter(function( element ) {
        return element !== undefined;
     });
     tempMbid = tempMbid.filter(function( element ) {
        return element !== undefined;
     });
     //Match dataset with user input
      for(let i = 0; i<songList.length; i++){
        let keyName = songList[i].split(':')[1]
        if(keyName.match(key_value+" "+mode_value)){
            //console.log(songList[i]+" mbid: "+tempMbid[i])
            title+=songList[i].split(':')[0]+"<br>"
            key+=key_value+" "+mode_value+"<br>"
        }
    }
    //Generate output
      let song_name = document.getElementById('song_name');
      let song_key = document.getElementById('song_key');
      song_name.innerHTML=` ${title} `
      song_key.innerHTML=` ${key} `

}



window.onload = getDataset();