function addImageUI(imageName) {

    let scrollingButtonContainer = document.querySelector("#scrollingButtonContainer")

    let newDiv = document.createElement("div")
    newDiv.setAttribute("class", 'flex-container')
    newDiv.setAttribute("id", "div" + imageName)

    let deleteImageButton = document.createElement("button")
    deleteImageButton.setAttribute("id", "delete" + imageName)
    deleteImageButton.setAttribute("class", "deleteWindowButton");
    deleteImageButton.innerHTML = '<i class="fas fa-times"></i>'
    deleteImageButton.disabled = true;


    let button = document.createElement("button")
    button.setAttribute("id", "button" + imageName)
    button.setAttribute("class", "selectImageButton");
    button.innerHTML = imageName
    button.disabled = true;



    let icon = document.createElement("img");
    icon.setAttribute("class", "formatIcon")
    icon.setAttribute("id", "formatIcon" + imageName);


    newDiv.appendChild(button)
    newDiv.appendChild(deleteImageButton)
    newDiv.appendChild(icon)

    scrollingButtonContainer.appendChild(newDiv)

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
    console.log(command)
    eval(command)


}


//call when image format is discovered
function addFormatIcon(name, format) {
    let formatIcon = document.getElementById("formatIcon" + name);
    console.log(formatIcon, format)
    formatIcon.setAttribute("style", `background-image: url(${formatIcons[format]})`);

}