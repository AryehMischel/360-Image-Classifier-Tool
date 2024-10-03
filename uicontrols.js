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


//call when image format is discovered
function addFormatIcon(name, format) {
    let formatIcon = document.getElementById("formatIcon" + name);
    formatIcon.setAttribute("style", `background-image: url(${formatIcons[format]})`);

    let tooltip = document.getElementById("tooltip" + name);
    tooltip.innerHTML = format

    //set tooltip text
    
   

}