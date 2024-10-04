//old add format Icon -> update it and then delete addIcon function
function addFormatIcon(name, format) {
  let formatIcon = document.getElementById("formatIcon" + name);
  formatIcon.setAttribute("style", `background-image: url(${formatIcons[format]})`);

  let tooltip = document.getElementById("tooltip" + name);
  tooltip.innerHTML = format

  //set tooltip text



}



function addIcon(imageID, format) {
  let uiElement = document.getElementById("ui" + imageID); //.children[0]

  let greenRectangle = document.createElement("div");
  greenRectangle.style.position = "absolute";
  greenRectangle.style.top = "0";
  greenRectangle.style.left = "0";
  greenRectangle.style.width = "100%";
  greenRectangle.style.height = "25px"; // Adjust the height as needed
  greenRectangle.style.backgroundColor = "white"; 
  greenRectangle.style.opacity = "0.5"; // Adjust the opacity as needed
  greenRectangle.style.zIndex = "1000"; // Ensure the rectangle is on top
  
  // uiElement.appendChild(greenRectangle);
  
  
  let icon = document.createElement("img");
  icon.src = formatIcons[format];
  // icon.style.display = "flex"; // Use flexbox for centering
  // icon.style.alignItems = "center"; // Center vertically
  // icon.style.justifyContent = "center"; // Center horizontally
  icon.style.position = "absolute"; // Ensure the icon is positioned absolutely
  icon.style.zIndex = "1000"; // Ensure the icon is on top
  icon.style.width = "50px"; // Set the width
  icon.style.height = "auto"; // Maintain aspect ratio by setting height to auto
  icon.style.top = "7px"; // Position the icon at the top
  icon.style.left = "8px"; // Position the icon at the left
  icon.style.objectFit = "contain"; // Ensure the image fits within the specified dimensions without stretching
  uiElement.style.position = "relative"; // Ensure the parent has a positioning context
  uiElement.appendChild(icon);
  // Create a tooltip element
  let tooltip = document.createElement("span");
  tooltip.innerHTML = format;
  tooltip.style.position = "absolute";
  tooltip.style.zIndex = "1001"; // Ensure the tooltip is above the icon
  tooltip.style.backgroundColor = "black";
  tooltip.style.color = "white";
  tooltip.style.padding = "5px";
  tooltip.style.borderRadius = "5px";
  tooltip.style.top = "50%"; // Center the tooltip vertically
  tooltip.style.left = "50%"; // Center the tooltip horizontally
  tooltip.style.transform = "translate(-50%, -50%)"; // Center the tooltip by shifting it left and up by 50%
  tooltip.style.visibility = "hidden"; // Hide the tooltip by default
  // Show the tooltip on mouseover
  icon.addEventListener("mouseover", function() {
    tooltip.style.visibility = "visible";
    icon.style.filter = "invert(1)"; // Invert colors on hover
  });

  // Hide the tooltip on mouseout
  icon.addEventListener("mouseout", function() {
    tooltip.style.visibility = "hidden";
    icon.style.filter = "invert(0)";
  });

  // Append the tooltip to the uiElement
  uiElement.appendChild(tooltip);
  uiElement.children[0].removeChild(uiElement.children[0].children[1])
}


function makeUIClickable(imageID) {
  let uiElement = document.getElementById("ui" + imageID).children[0];
  uiElement.addEventListener("click", function () {
    setLayerTexture(imageID);
  })
}

function addRemoveButtonToUIElement(imageID, file) {
  let uiElement = document.getElementById("ui" + imageID);
  let removeButton = document.createElement("button");
  removeButton.onclick = function () {
    event.preventDefault();
    event.stopPropagation();
    console.log("removing")
    
    //remove texture from material if image texture is on visible material
    if (activeImage === imageID) {
      //removeTextureFromMaterial(images[imageID].format)
      console.log("removing texture from material")
      let parent = uiElement.parentNode;
      let index = Array.prototype.indexOf.call(parent.children, uiElement);

      console.log(parent.children.length)
      if (index === parent.children.length - 1) {
        //2 because the parent of the ui elements also has a child for the default text and the button to open explorer
        if (index === 1) {
          removeTextureFromMaterial(images[imageID].format)
        } else {
          // parent.children[index - 1].children[0].click()
          removeTextureFromMaterial(images[imageID].format)
        }

      } else {
        if (parent.children[index + 1].disabled) {
          removeTextureFromMaterial(images[imageID].format)
          console.log("id is ", parent.children[index+1].id.substring(2))
          activeImage = parent.children[index+1].id.substring(2)
        } else {
          parent.children[index + 1].children[0].click()
        }
      }

    }

    // removeFile(file)
    myDropzone.removeFile(file);
    // clear image from images object
    images[imageID] = null;


  }

  removeButton.innerHTML = "&times;"; // HTML entity for "×"
  removeButton.style.position = "absolute"; // Ensure the icon is positioned absolutely
  removeButton.style.zIndex = "1000"; // Ensure the icon is on top
  removeButton.style.width = "21px"; // Set the width (30% smaller than 30px)
  removeButton.style.height = "21px"; // Set the height (30% smaller than 30px)
  removeButton.style.top = "5px"; // Position the icon at the top
  removeButton.style.right = "5px"; // Position the icon at the right
  removeButton.style.border = "none"; // Remove default border
  removeButton.style.borderRadius = "50%"; // Make it a circle
  removeButton.style.backgroundColor = "rgba(255, 255, 255, 0.8)"; // Set semi-transparent white background
  removeButton.style.color = "black"; // Set text color to black
  removeButton.style.fontSize = "14px"; // Set font size (30% smaller than 20px)
  removeButton.style.cursor = "pointer"; // Change cursor to pointer
  removeButton.style.display = "flex"; // Use flexbox for centering
  removeButton.style.alignItems = "center"; // Center vertically
  removeButton.style.justifyContent = "center"; // Center horizontally
  removeButton.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.2)"; // Add a subtle shadow
  
  // Add hover effect using JavaScript
  removeButton.onmouseover = function() {
    removeButton.style.backgroundColor = "rgba(0, 0, 0, 0.8)"; // Change background to semi-transparent black
    removeButton.style.color = "white"; // Change text color to white
  };
  
  removeButton.onmouseout = function() {
    removeButton.style.backgroundColor = "rgba(255, 255, 255, 0.8)"; // Revert background to semi-transparent white
    removeButton.style.color = "black"; // Revert text color to black
  };
  
  // Ensure the parent has a positioning context
  uiElement.style.position = "relative";

  // Append the remove button to the parent element
uiElement.appendChild(removeButton);

}


