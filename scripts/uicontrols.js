function addImageUIToDropZone(imageName) {
    
}

//delete image from ui and memory
function deleteImage(imageName, format) {
    let div = document.getElementById("div" + imageName)
    let parent = div.parentNode;
    if (imageName === activeImage) {
        let index = Array.prototype.indexOf.call(parent.children, div);
        if (index === 0) {
            if (parent.children.length > 1) {
                parent.children[1].children[0].click()
            } else {
                removeTextureFromMaterial(format)
            }
        } else {
            parent.children[index - 1].children[0].click()

        }

    }
    parent.removeChild(div)

    // console.log("deleting " + imageName, "from " + format + "Textures")
    let command = "delete " + format + "Textures[" + "'" + imageName + "'" + "]"
    eval(command)


}


//old add format Icon -> update it and then delete addIcon function
function addFormatIcon(name, format) {
    let formatIcon = document.getElementById("formatIcon" + name);
    formatIcon.setAttribute("style", `background-image: url(${formatIcons[format]})`);

    let tooltip = document.getElementById("tooltip" + name);
    tooltip.innerHTML = format

    //set tooltip text
    
   

}



function addIcon(imageID, format) {
    let uiElement = document.getElementById("ui" + imageID).children[0];
    let icon = document.createElement("img");
    icon.src = formatIcons[format];
    icon.style.position = "absolute"; // Ensure the icon is positioned absolutely
    icon.style.zIndex = "1000"; // Ensure the icon is on top
    icon.style.width = "50px";
    icon.style.height = "50px";
    icon.style.top = "0"; // Position the icon at the top
    icon.style.left = "0"; // Position the icon at the left
    uiElement.style.position = "relative"; // Ensure the parent has a positioning context
    uiElement.appendChild(icon);

  }


  function makeUIClickable(imageID) {
    let uiElement = document.getElementById("ui" + uiElementID).children[0];
    uiElement.addEventListener("click", function () {
      console.log("clicked")
    })

  }

  function addRemove(imageID, file) {
    let uiElement = document.getElementById("ui" + imageID);
    let removeButton = document.createElement("button");
    removeButton.onclick = function () {
      event.preventDefault();
      event.stopPropagation();
      console.log("removing")

      //remove texture from material if image texture is on visible material
      if (activeImage === imageID) {
        removeTextureFromMaterial(images[imageID].format)
      }

      // removeFile(file)
      myDropzone.removeFile(file);
      // clear image from images object
      images[imageID] = null;


    }

    removeButton.innerHTML = "remove";
    removeButton.style.position = "absolute"; // Ensure the icon is positioned absolutely
    removeButton.style.zIndex = "1000"; // Ensure the icon is on top
    removeButton.style.width = "50px";
    removeButton.style.height = "50px";
    removeButton.style.top = "0"; // Position the icon at the top
    removeButton.style.right = "0"; // Position the icon at the left
    uiElement.style.position = "relative"; // Ensure the parent has a positioning context
    uiElement.appendChild(removeButton);

  }

  
  // Add this functionality later when add remove is added at the correct time

  //   function deleteImage2(imageName, format) {
  //     let div = document.getElementById("div" + imageName)
  //     let parent = div.parentNode;
  //     if (imageName === activeImage) {
  //         let index = Array.prototype.indexOf.call(parent.children, div);
  //         if (index === 0) {
  //             if (parent.children.length > 1) {
  //                 parent.children[1].children[0].click()
  //             } else {
  //                 removeTextureFromMaterial(format)
  //             }
  //         } else {
  //             parent.children[index - 1].children[0].click()

  //         }

  //     }
  //     parent.removeChild(div)

  //     // console.log("deleting " + imageName, "from " + format + "Textures")
  //     let command = "delete " + format + "Textures[" + "'" + imageName + "'" + "]"
  //     eval(command)


  // }