//functions that are not called in our application but are used to help with debugging and testing
function printActiveImages() {
    globalImageFiles.forEach((value, key) => {
      console.log(value.name)
    })
  }

  function reformatTest(id) {
    let p = document.getElementById(id)
    for (let i = 0; i < p.object3D.children.length; i++) {
      p.object3D.remove(p.object3D.children[i])
    }

    console.log(globalImageFiles.get(id))

    var img = new Image(); //img.parentID = this.files[i].name //this is a little hack that can be removed later
    img.src = URL.createObjectURL(globalImageFiles.get(id));

    img.onload = createSphere(img, p) // find the 360 format that best fits this image 
  }