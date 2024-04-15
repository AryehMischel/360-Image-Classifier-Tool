/* exported gapiLoaded */
/* exported gisLoaded */
/* exported handleAuthClick */
/* exported handleSignoutClick */

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = 'https://www.googleapis.com/auth/drive';

// TODO(developer): Set to client ID and API key from the Developer Console
const CLIENT_ID = '763421155078-nnpvg9kp0hpqded2e83i7fg669d3f5lj.apps.googleusercontent.com';
const API_KEY = 'AIzaSyDekhzQ-TUMsLCivTTbMJA8hoAuzpUhOcE';

// TODO(developer): Replace with your own project number from console.developers.google.com.
const APP_ID = 'winter-origin-386003';

let tokenClient;
let accessToken = null;
let pickerInited = false;
let gisInited = false;


//document.getElementById('authorize_button').style.visibility = 'hidden';
//document.getElementById('signout_button').style.visibility = 'hidden';

/**
 * Callback after api.js is loaded.
 */
function gapiLoaded() {
    gapi.load('client:picker', initializePicker);
}

/**
 * Callback after the API client is loaded. Loads the
 * discovery doc to initialize the API.
 */
async function initializePicker() {
    await gapi.client.load('https://www.googleapis.com/discovery/v1/apis/drive/v3/rest');
    pickerInited = true;
    maybeEnableButtons();
}

/**
 * Callback after Google Identity Services are loaded.
 */
function gisLoaded() {
    tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: '', // defined later
    });
    gisInited = true;
    maybeEnableButtons();
}

/**
 * Enables user interaction after all libraries are loaded.
 */
function maybeEnableButtons() {
    if (pickerInited && gisInited) {
        // document.getElementById('authorize_button').style.visibility = 'visible';
    }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick() {
    tokenClient.callback = async (response) => {
        if (response.error !== undefined) {
            throw (response);
        }
        accessToken = response.access_token;
        // document.getElementById('signout_button').style.visibility = 'visible';
        // document.getElementById('authorize_button').innerText = 'Refresh';
        await createPicker();
    };

    if (accessToken === null) {
        // Prompt the user to select a Google Account and ask for consent to share their data
        // when establishing a new session.
        tokenClient.requestAccessToken({ prompt: 'consent' });
    } else {
        // Skip display of account chooser and consent dialog for an existing session.
        tokenClient.requestAccessToken({ prompt: '' });
    }
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick() {
    if (accessToken) {
        accessToken = null;
        google.accounts.oauth2.revoke(accessToken);
        // document.getElementById('content').innerText = '';
        // document.getElementById('authorize_button').innerText = 'Authorize';
        // document.getElementById('signout_button').style.visibility = 'hidden';
    }
}

/**
 *  Create and render a Picker object for searching images.
 */
function createPicker() {
    var view = new google.picker.DocsView().setMimeTypes('application/vnd.google-apps.folder').setParent('root').setSelectFolderEnabled(true);
    //view().setMimeTypes('application/vnd.google-apps.folder')
    //view.setMimeTypes('image/png,image/jpeg,image/jpg');

    //.setMimeTypes('application/vnd.google-apps.folder')

    var picker = new google.picker.PickerBuilder()
        .setDeveloperKey(API_KEY)
        .setAppId(APP_ID)
        .setOAuthToken(accessToken)

        .setSize("650", "470")
        //    .setSelectableMimeTypes('application/vnd.google-apps.folder') //not sure about this Mime type
        .addView(view)
        // .setOrigin(google.script.host.origin)
        .setCallback(pickerCallback)
        .build()
    picker.setVisible(true);
}



/**
 * Displays the file details of the user's selection.
 * @param {object} data - Containers the user selection from the picker
 */
async function pickerCallback(data) {
    if (data.action === google.picker.Action.PICKED) {

        try {
            console.log(data['docs']['id'])

        } catch {
            console.log("nar")
        }



        let text = `Picker response: \n${JSON.stringify(data, null, 2)}\n`;

        let jObj = JSON.stringify(data)
        const obj = JSON.parse(jObj);
        //let json = JSON.stringify(data)
        console.log(text)
        console.log(obj)
        console.log(obj.docs)

        console.log(obj.docs[0].id)


        getSubFolders()
        //       checkFolder();
        //retrieveAllFiles()
        // const Res = await fetch(`https://www.googleapis.com/drive/v3/files?q=${folderID}parents`, {
        //   headers: {
        //       Authorization: `Bearer ${accessToken}`

        //   }}).then( response => response.blob())
        //   .then(blob =>{
        //       console.log(performance.now())
        //       const reader = new FileReader() ;
        //       reader.onload = function(){
        //        console.log(this.result)
        //         addImage(this.result)
        //       } ; // <--- `this.result` contains a base64 data URI
        //       return reader.readAsDataURL(blob) ;
        //   })//%2710oCPwjGlp8ArZGP0nk2jnvztniaCRdH4%27%20in%20


        // const document = data[google.picker.Response.DOCUMENTS][0];
        // const fileId = document[google.picker.Document.ID];
        // console.log(fileId);
        // const res = await gapi.client.drive.files.get({
        //   'fileId': fileId,
        //   'fields': '*',
        // });
        // text += `Drive API response for first document: \n${JSON.stringify(res.result, null, 2)}\n`;
        // window.document.getElementById('content').innerText = text;
        // console.log(performance.now())
        // const Res = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`, {
        //   headers: {
        //       Authorization: `Bearer ${accessToken}`

        //   }}).then( response => response.blob())
        //   .then(blob =>{
        //       console.log(performance.now())
        //       const reader = new FileReader() ;
        //       reader.onload = function(){
        //        console.log(this.result)
        //         addImage(this.result)
        //       } ; // <--- `this.result` contains a base64 data URI
        //       return reader.readAsDataURL(blob) ;
        //   })



    }


}

async function getSubFolders() {
    const test = '1aOm0_RXTWw9iwm-cm7VHGCrMt20Atc9h'
    gapi.client.drive.files.list({
        // give name of the folder to check
        q: `mimeType='application/vnd.google-apps.folder' and parents in '${test}'`
    }).then(function (response) {
        var folders = response.result.files;
        //  imagesLoading -= folders.length
        for (i = 0; i < folders.length; i++) {
            console.log(folders[i].id)

            checkFolder(`${folders[i].id}`)
        }

        checkFolder(test)

        // for(i = 0; i < files.length; i++){


        // }


    })

}


const cubemapFileNames = new Set(['px', 'nx', 'py', 'ny', 'pz', 'nz']);


async function checkFolder(test) { //pass in folder name
    // const test = '1aOm0_RXTWw9iwm-cm7VHGCrMt20Atc9h'
    gapi.client.drive.files.list({
        // give name of the folder to check
        q: `mimeType contains 'image/' and '${test}' in parents`,
    }).then(function (response) {
        var files = response.result.files;
        console.log("response incame")
        console.log(files.length)


        if (files.length == 6) {
            console.log("might be a cubemap??")

            let n = files[0].name.substring(0, files[0].name.lastIndexOf('.'))
            let n1 = files[1].name.substring(0, files[1].name.lastIndexOf('.'))
            let n2 = files[2].name.substring(0, files[2].name.lastIndexOf('.'))
            let n3 = files[3].name.substring(0, files[3].name.lastIndexOf('.'))
            let n4 = files[4].name.substring(0, files[4].name.lastIndexOf('.'))
            let n5 = files[5].name.substring(0, files[5].name.lastIndexOf('.'))

            if (cubemapFileNames.has(n) && cubemapFileNames.has(n1) && cubemapFileNames.has(n2) && cubemapFileNames.has(n3) && cubemapFileNames.has(n4) && cubemapFileNames.has(n5)) {

                let parent = document.createElement("a-entity"); //this object will be the parent of any 3d meshes generated from the current image     
                parent.setAttribute("id", test)
                layers.appendChild(parent)
                addButton(setLayer, test); // buttonsToEnable.push("button" + img.name); //add button to ui
                activeButtons.add(test)
                watch(test, "folderCube")
                imagesLoading += 1
                console.log("cubemap!!")

                makeCubeMap(parent, [files[0].id, files[1].id,files[2].id, files[3].id, files[4].id, files[5].id], [n, n1, n2, n3, n4, n5])

                //get blobs of each image
                //turn into images and onload store in array :: cubeimages process ++ 
                // after all six images are process in array
                //createCubeMapFromFolder(images, parent)


            } else {
                console.log("boo map")
                imagesLoading += files.length
            }


        } else {

            imagesLoading += files.length

            for (i = 0; i < files.length; i++) {
                console.log(files[i])
                let name = files[i].name
                console.log(name.substring(0, name.lastIndexOf('.')))

                getImages(files[i].id)

            }
        }


        // const Res = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`, {
        //   headers: {
        //       Authorization: `Bearer ${accessToken}`

        //   }}).then( response => response.blob())
        //   .then(blob =>{
        //       console.log(performance.now())
        //       const reader = new FileReader() ;
        //       reader.onload = function(){
        //        console.log(this.result)
        //         addImage(this.result)
        //       } ; // <--- `this.result` contains a base64 data URI
        //       return reader.readAsDataURL(blob) ;
        //   })

    })
}

async function getImages(fileId) {

    const Res = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`, {
        headers: {
            Authorization: `Bearer ${accessToken}`

        }
    }).then(response => response.blob())
        .then(blob => {
            console.log(performance.now())
            const reader = new FileReader();
            reader.onload = function () {
                addImage(this.result)
            }; // <--- `this.result` contains a base64 data URI
            return reader.readAsDataURL(blob);
        })
}



async function makeCubeMap(parent, imageIds, imgNames) {
    let cubeImages = []
    let cubemapCounter = 0
  //  const cubemapFileNames = new Set(['px', 'nx', 'py', 'ny', 'pz', 'nz']);
    let cubemapFiles = new Map([["px", ""], ["nx", ""],["py", ""], ["ny", ""],["pz", ""], ["nz", ""]]);
    for (i = 0; i < imageIds.length; i++) {


        const Res = await fetch(`https://www.googleapis.com/drive/v3/files/${imageIds[i]}?alt=media`, {
            headers: {
                Authorization: `Bearer ${accessToken}`

            }
        }).then(response => response.blob())
            .then(blob => {
                console.log(performance.now())
                const reader = new FileReader();
                reader.onload = function () {
                    var img = new Image();
                    img.name = imgNames[i]
                    img.src = this.result
                    cubemapFiles.set( imgNames[i], img); 
                    const myPromise = new Promise((resolve, reject) => {
                         cubemapFiles.set( imgNames[i], img); 
                        
                      });


                    img.onload = () => { console.log("muddy waters"); myPromise.then(()=>{
                        cubemapCounter += 1;
                         if(cubemapCounter == 6){ 
                            console.log("should be working")
                            createCubeMapFromFolder([cubemapFiles.get('px'), cubemapFiles.get('nx'), cubemapFiles.get('py'), cubemapFiles.get('ny'), cubemapFiles.get('pz'), cubemapFiles.get('nz')], parent) ; 
                         } 
                        });


                    }
                }; // <--- `this.result` contains a base64 data URI
                return reader.readAsDataURL(blob);
            })
    }


  
    console.log("all done?")
    console.log(cubeImages.length)



}

// function retrieveAllFiles(callback) {
//     var retrievePageOfFiles = function (request, result) {
//         request.execute(function (resp) {
//             result = result.concat(resp.items);
//             var nextPageToken = resp.nextPageToken;
//             if (nextPageToken) {
//                 request = gapi.client.drive.files.list({
//                     'pageToken': nextPageToken
//                 });
//                 retrievePageOfFiles(request, result);
//             } else {
//                 callback(result);
//             }
//         });
//     };

//     var initialRequest = gapi.client.drive.files.list({
//         q : "'1aOm0_RXTWw9iwm-cm7VHGCrMt20Atc9h' in parents"
//     });


//     console.log(retrievePageOfFiles(initialRequest, []));
// }






function addImage(src) { //TO-DO pass in image name
    var img = new Image();

    img.src = src

    img.name = "gdrive_photo" //values.name  //generate id for parent object, current bug when dealing with duplicate image names

    while (activeButtons.has(img.name)) {
        img.name = img.name + "_"

    }
    //  globalImageFiles.set(img.name, values) // I should prob set this with a flag showings its a gdrive file and it's id?
    activeButtons.add(img.name)
    addButton(setLayer, img.name); // buttonsToEnable.push("button" + img.name); //add button to ui
    img.onload = findformat // find the 360 format that best fits this image 
    //document.body.appendChild(image); console.log("added phtot")
    //crop(src);
    //document.querySelector("a-assets").append(image)
}