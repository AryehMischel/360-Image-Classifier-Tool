

let cl = 0
const activeButtons = new Set();

function addButton(clickFunction, innerHTML){
	let interface = document.querySelector("#my-interface")

    let newDiv = document.createElement("div")
    // newDiv.setAttribute("style","display: block;")
      // newDiv.innerHTML = 'aasdasdasdasdasdasdasdasdasdasdasd'
     newDiv.setAttribute("class", 'flex-container')
    // let b = document.createElement("button")
    
    let b2 = document.createElement("button")
    b2.innerHTML = "delete image"
	b2.onclick = function() { removeLayer(innerHTML)}
    // newDiv.appendChild(b)
  
    
	let button = document.createElement("button")
	button.setAttribute("style","display: block;")
    let label = document.createElement("label")
    // label.setAttribute("style","display: block;")
    label.setAttribute("id", "label" + innerHTML)
	button.innerHTML = innerHTML
	button.setAttribute("id", "button" + innerHTML)
	// button.addEventListener("click", ()=>{console.log("asdasdasd")})//innerHTML
	button.onclick = function() { clickFunction(innerHTML)}
	// button.addEventListener("click", clickFunction())//innerHTML
	button.disabled = true;
	newDiv.appendChild(button)
    newDiv.appendChild(b2)

    newDiv.appendChild(label)

    interface.appendChild(newDiv)
	//return button

}


function setLayer(layerID){
    document.getElementById(cl).setAttribute("visible", false)
    
    let layer = document.getElementById(layerID)
     layer.setAttribute("visible", true)

     cl = layerID    

}

// const layers = document.querySelector("#layers")
function setupLayers(){
  imagesLoading = 0
  imagesLoaded = 0

    for(i = 0; i < layers.children.length; i++){
        layers.children[i].setAttribute("visible", false)
        // console.log(layers.children[i])
        // cl = layers.children[layers.children.length -1].id   
        //console.log(cl)
        // console.log("asdasdsdaas")
       
    }

     cl = layers.children[layers.children.length -1].id 
     document.getElementById(cl).setAttribute("visible", true)
     document.getElementById('imgInput').value = ''
    // //console.log("huh " + buttonsToEnable.length)
 enableButtons()

}


function enableButtons(){
    
    for(i =0; i < buttonsToEnable.length; i++){
        let b = document.getElementById(buttonsToEnable[i])
        b.disabled = false;
    }

    //buttonsToEnable.forEach(item => activeButtons.add(item))

    buttonsToEnable = []
    
}


function removeLayer(layerID){
    let layer = document.getElementById(layerID)
    let button = document.getElementById("button" + layerID)
    layer.parentNode.removeChild(layer)
//    console.log(button.parentNode.parentNode.children.indexOf(button.parentNode));

// for(i = 0; i < button.parentNode.parentNode.children.length; i++){
//     if(button.parentNode.parentNode.children[i] == button.parentNode){
//         console.log(i + " is a match")
//         break;
//     } else{
//         console.log("noooo!")
//     }
// }

    button.parentNode.parentNode.removeChild(button.parentNode)
    activeButtons.delete(layerID);
     if(layers.children.length > 0){
      if(layerID == cl){
        
        
        cl = layers.children[layers.children.length -1].id //if layerID === cl  //find the button above this one and set that to cl 
        document.getElementById(cl).setAttribute("visible", true)


      }

     } else{

     }
    
    
}


function addDiv(){
    let newDiv = document.createElement("div")
    let childDiv = document.createElement("div")
    childDiv.innerHTML = "ajshdlkjashdlkjahsdlksdsdljhsdlkfjhsdlkfjhsdlkfjhsdlkjhsldkjfhslkdjfhssdfsdfajshdlakjsdh"
    newDiv.appendChild(childDiv)
	let interface = document.querySelector("#my-interface")
    interface.appendChild(newDiv)

}