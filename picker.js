/* exported gapiLoaded */
/* exported gisLoaded */
/* exported handleAuthClick */
/* exported handleSignoutClick */

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.

const SCOPES = 'https://www.googleapis.com/auth/drive';

//These are sent from the brownser to the server, so they can't be kept secret
const CLIENT_ID = '763421155078-nnpvg9kp0hpqded2e83i7fg669d3f5lj.apps.googleusercontent.com';
const API_KEY = 'AIzaSyDekhzQ-TUMsLCivTTbMJA8hoAuzpUhOcE';
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
    }
}



//view all folders and files
function createPicker() {
    var view = new google.picker.DocsView(google.picker.ViewId.DOCS)
        .setParent('root')
        .setIncludeFolders(true)
        .setSelectFolderEnabled(true);

    var picker = new google.picker.PickerBuilder()
        .setDeveloperKey(API_KEY)
        .setAppId(APP_ID)
        .setOAuthToken(accessToken)
        .setSize("650", "470")
        .addView(view)
        .setCallback(pickerCallback)
        .build();

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


        if(obj.docs.length == 1 && obj.docs[0].mimeType === "image/jpeg" || obj.docs.length == 1 && obj.docs[0].mimeType === "image/png"){
            console.log("getting individual image")
            getImages(obj.docs[0].id, obj.docs[0].name)
        }else{
            getSubFolders(obj.docs[0].id)
        }
 

    }


}

async function getSubFolders(rootDir) {
    gapi.client.drive.files.list({
        // give name of the folder to check
        q: `mimeType='application/vnd.google-apps.folder' and parents in '${rootDir}'`
    }).then(function (response) {
        var folders = response.result.files;
        //  imagesLoading -= folders.length
        for (i = 0; i < folders.length; i++) {
            console.log(folders[i].id)

            checkFolder(`${folders[i].id}`)
        }

        checkFolder(rootDir)

        // for(i = 0; i < files.length; i++){


        // }


    })

}


const cubemapFileNames = new Set(['px', 'nx', 'py', 'ny', 'pz', 'nz']);


async function checkFolder(folder) { //pass in folder name
    // const test = '1aOm0_RXTWw9iwm-cm7VHGCrMt20Atc9h'
    gapi.client.drive.files.list({
        // give name of the folder to check
        q: `mimeType contains 'image/' and '${folder}' in parents and trashed = false`,
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

            console.log(n)
            console.log(n1)
            console.log(n2)
            console.log(n3)
            console.log(n4)
            console.log(n5)

            if (cubemapFileNames.has(n) && cubemapFileNames.has(n1) && cubemapFileNames.has(n2) && cubemapFileNames.has(n3) && cubemapFileNames.has(n4) && cubemapFileNames.has(n5)) {
                // addImageUI(folder); 
                // savedImages.add(folder)
                // setUI(folder, "cubeMap")

                // makeCubeMap(parent, [files[0].id, files[1].id, files[2].id, files[3].id, files[4].id, files[5].id], [n, n1, n2, n3, n4, n5], folder)

            } else {
                // imagesLoading += files.length
            }


        } else {



            imagesLoading += files.length

            for (i = 0; i < files.length; i++) {
                console.log("fetching images")
                const name = files[i].name
                console.log("fetching blob " + i + " " + performance.now())

                fetch(`https://www.googleapis.com/drive/v3/files/${files[i].id}?alt=media`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,

                    }
                }).then(response => response.blob())
                    .then(blob => {
                       
                        console.log("got blob " + i + " " + performance.now())
                        blob.name = name
                        blob.originPoint = "gdrive"
                        myDropzone.addFile(blob);

                        // const image = document.createElement("img")
                        // image.name =  name
                        // while (savedImages.has(image.name)) {
                        //     image.name = image.name + "_"
        
                        // }
                        // savedImages.add(image.name)
                        
                        // addImageUI(image.name); 
                        // image.src = URL.createObjectURL(blob)
                        // document.body.appendChild(image);
                        // image.onload = findformat 
                    })
            }
        }



    })
}


async function getImages(fileId, name) {

    fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`, {
        headers: {
            Authorization: `Bearer ${accessToken}`

        }
    }).then(response => response.blob())
        .then(blob => {

            blob.name = name
            blob.originPoint = "gdrive"
            myDropzone.addFile(blob);

            // const image = new Image();

            // image.name = "gdrive_photo" 

            // while (savedImages.has(image.name)) {
            //     image.name = image.name + "_"

            // }
            // savedImages.add(image.name)
            // addImageUI(image.name); 
          
            // image.src = URL.createObjectURL(blob)
            // document.body.appendChild(image);
            // image.onload = findformat 
        })
}



async function makeCubeMap(parent, imageIds, imgNames, folderName) {

    console.log(imageIds)
    console.log(imgNames)

    console.log(imgNames.at('nz'))

    var fetches = [];
    let cubeImages = []
    let cubemapCounter = 0
    //  const cubemapFileNames = new Set(['px', 'nx', 'py', 'ny', 'pz', 'nz']);
    let cubemapFiles = new Map();//[["px", ""], ["nx", ""],["py", ""], ["ny", ""],["pz", ""], ["nz", ""]]
    for (i = 0; i < imageIds.length; i++) {

        const apple = imgNames[i]
        fetches.push(
            fetch(`https://www.googleapis.com/drive/v3/files/${imageIds[i]}?alt=media`, {
                headers: { Authorization: `Bearer ${accessToken}` }
            }).then(response => response.blob())
                .then(blob => {
                    const img = new Image(); //  const img = new Image();
                    cubemapFiles.set(apple, img)

                    
                    img.src = URL.createObjectURL(blob)
                   // document.body.appendChild(image);
                    img.onload = () => {

                        cubemapCounter += 1;
                        if (cubemapCounter == 6) {
                            createCubeMapTextureFromImages([cubemapFiles.get('px'), cubemapFiles.get('nx'), cubemapFiles.get('py'), cubemapFiles.get('ny'), cubemapFiles.get('pz'), cubemapFiles.get('nz')], folderName)
                        }
                    };

                    
                })
                .catch(status, err => { return console.log(status, err); })
        );
    }


    Promise.all(fetches).then(function () {

    });





}






