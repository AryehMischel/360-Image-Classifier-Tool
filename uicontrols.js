

let cl = 0
const activeButtons = new Set();

function addButton(imageName) {
    
    let scrollingButtonContainer = document.querySelector("#scrollingButtonContainer")

    let newDiv = document.createElement("div")
    newDiv.setAttribute("class", 'flex-container')
    newDiv.setAttribute("id", "div" + imageName)
  
    let deleteImageButton = document.createElement("button")
    deleteImageButton.setAttribute("id", "delete" + imageName)
    deleteImageButton.setAttribute("class", "deleteWindowButton");
    deleteImageButton.innerHTML = '<i class="fas fa-times"></i>'
    deleteImageButton.disabled = true;
    // deleteImageButton.onclick = function () { deleteImage(imageName) }


    let button = document.createElement("button")
    button.setAttribute("id", "button" + imageName)
    button.setAttribute("class", "selectImageButton");
    button.innerHTML = imageName
    button.disabled = true;



    let icon = document.createElement("img");
    icon.setAttribute("class", "icon")
    icon.setAttribute("id", "label" + imageName);
    // icon.setAttribute("src", "./Load.gif"); // Replace with the actual path to your icon


    // let label = document.createElement("label")
    // label.setAttribute("id", "label" + innerHTML)

    // button.onclick = function() { clickFunction(innerHTML)} 
    newDiv.appendChild(button)
    newDiv.appendChild(deleteImageButton)
    newDiv.appendChild(icon)



    scrollingButtonContainer.appendChild(newDiv)
    //return button

}


function setLayer(layerID) {
    // document.getElementById(cl).setAttribute("visible", false)

    // let layer = document.getElementById(layerID)
    //  layer.setAttribute("visible", true)

    //  cl = layerID    

}



// const layers = document.querySelector("#layers")
function setupLayers() {
    console.log("setting up layers")
    imagesLoading = 0
    imagesLoaded = 0

    for (i = 0; i < layers.children.length; i++) {
        layers.children[i].setAttribute("visible", false)
        // console.log(layers.children[i])
        // cl = layers.children[layers.children.length -1].id   
        //console.log(cl)
        // console.log("asdasdsdaas")

    }

    cl = layers.children[layers.children.length - 1].id
    document.getElementById(cl).setAttribute("visible", true)
    document.getElementById('imgInput').value = ''
    // //console.log("huh " + buttonsToEnable.length)
    enableButtons()

}


function enableButtons() {

    for (i = 0; i < buttonsToEnable.length; i++) {
        let b = document.getElementById(buttonsToEnable[i])
        b.disabled = false;
    }

    //buttonsToEnable.forEach(item => activeButtons.add(item))

    buttonsToEnable = []

}


function deleteImage(imageName, format) {
    let div = document.getElementById("div" + imageName)
    let parent = div.parentNode;
    if(imageName === activeImage){
        let index = Array.prototype.indexOf.call(parent.children, div);
        if(index === 0){
            if(parent.children.length > 1){
                parent.children[1].children[0].click()
            }else{
                removeTextureFromMaterial(format)
            }
        }else{
            parent.children[index - 1].children[0].click()

        }
       
    }
    parent.removeChild(div)

    // console.log("deleting " + imageName, "from " + format + "Textures")
    let command = "delete " + format + "Textures[" + "'" + imageName + "'" + "]"
    console.log(command)
    eval(command)
   
    


            // let layer = document.getElementById(layerID)
    // let button = document.getElementById("button" + layerID)
    // layer.parentNode.removeChild(layer)
    // globalImageFiles.delete(layerID)


    // button.parentNode.parentNode.removeChild(button.parentNode)
    // activeButtons.delete(layerID);
    // if (layers.children.length > 0) {
    //     if (layerID == cl) {


    //         cl = layers.children[layers.children.length - 1].id //if layerID === cl  //find the button above this one and set that to cl 
    //         document.getElementById(cl).setAttribute("visible", true)


    //     }

    // } else {

    // }

    }
   
    




function addDiv() {
    let newDiv = document.createElement("div")
    let childDiv = document.createElement("div")
    childDiv.innerHTML = "ajshdlkjashdlkjahsdlksdsdljhsdlkfjhsdlkfjhsdlkfjhsdlkjhsldkjfhslkdjfhssdfsdfajshdlakjsdh"
    newDiv.appendChild(childDiv)
    let interface = document.querySelector("#my-interface")
    interface.appendChild(newDiv)

}


function disableButtonsWaitForSceneLoad() {
console.log("disabling buttons")
    for (let key of activeButtons)
        document.getElementById("button" + key).setAttribute("disabled", true),
            buttonsToEnable.push("button" + key)  //disabling all existing ui buttons untill new images load in

}