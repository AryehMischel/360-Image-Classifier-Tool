function parseDirectoryHierarchy(flatArray) {
    var dir = new Map();
    for (i = 0; i < flatArray.length; i++) {
      var path = flatArray[i].webkitRelativePath.substring(0, flatArray[i].webkitRelativePath.lastIndexOf("/")) // flatArray[i].webkitRelativePath.substring(flatArray[i].webkitRelativePath.lastIndexOf("/") + 1, flatArray[i].webkitRelativePath.length)
      var file = flatArray[i]//.webkitRelativePath.substring(flatArray[i].webkitRelativePath.lastIndexOf("/") + 1)//);
      var filename = flatArray[i].webkitRelativePath.substring(flatArray[i].webkitRelativePath.lastIndexOf("/") + 1, flatArray[i].webkitRelativePath.lastIndexOf("."))
      //console.log(path)

      if (dir.has(path)) {
        while (dir.get(path).has(filename)) {
          filename = filename + "_"
        }
        dir.get(path).set(filename, file)
      } else {
        let imgMap = new Map()
        imgMap.set(filename, file)
        dir.set(path, imgMap);//[file]
      }

    }

    return dir

  }




  function processCubeImages(values){

    let px = URL.createObjectURL(values.get("px"));
    let nx = URL.createObjectURL(values.get("nx"));
    let py = URL.createObjectURL(values.get("py"));
    let ny = URL.createObjectURL(values.get("ny"));
    let pz = URL.createObjectURL(values.get("pz"));
    let nz = URL.createObjectURL(values.get("nz"));


    
    var img = new Image();  //img.parentID = this.files[i].name     //this is a little hack that can be removed later
    var img2 = new Image(); //img.parentID = this.files[i].name     //this is a little hack that can be removed later
    var img3 = new Image(); //img.parentID = this.files[i].name     //this is a little hack that can be removed later
    var img4 = new Image(); //img.parentID = this.files[i].name     //this is a little hack that can be removed later
    var img5 = new Image(); //img.parentID = this.files[i].name     //this is a little hack that can be removed later
    var img6 = new Image(); //img.parentID = this.files[i].name     //this is a little hack that can be removed later


    //console.log(Array.from(values.keys())[0])
    img.src = px
    img2.src = nx
    img3.src = py
    img4.src = ny
    img5.src = pz
    img6.src = nz


    let CUBEimages = [img, img2, img3, img4, img5, img6]

    // // wait for all images to load

    const proms = CUBEimages.map(im => new Promise(res =>
      im.onload = () => res()
    ))

    const promise = Promise.all(proms);

    return([promise, CUBEimages])
}



async function checkCubeMapViable(values) {
    var img = new Image();  //img.parentID = this.files[i].name     //this is a little hack that can be removed later
    var img2 = new Image(); //img.parentID = this.files[i].name     //this is a little hack that can be removed later
    var img3 = new Image(); //img.parentID = this.files[i].name     //this is a little hack that can be removed later
    var img4 = new Image(); //img.parentID = this.files[i].name     //this is a little hack that can be removed later
    var img5 = new Image(); //img.parentID = this.files[i].name     //this is a little hack that can be removed later
    var img6 = new Image(); //img.parentID = this.files[i].name     //this is a little hack that can be removed later

    img.name = Array.from(values.keys())[0]
    img2.name = Array.from(values.keys())[1]
    img3.name = Array.from(values.keys())[2]
    img4.name = Array.from(values.keys())[3]
    img5.name = Array.from(values.keys())[4]
    img6.name = Array.from(values.keys())[5]



    //console.log(Array.from(values.keys())[0])

    var val = values.get(Array.from(values.keys())[0]);
    var val2 = values.get(Array.from(values.keys())[1]);
    var val3 = values.get(Array.from(values.keys())[2]);
    var val4 = values.get(Array.from(values.keys())[3]);
    var val5 = values.get(Array.from(values.keys())[4]);
    var val6 = values.get(Array.from(values.keys())[5]);


    img.src = URL.createObjectURL(val);
    img2.src = URL.createObjectURL(val2);
    img3.src = URL.createObjectURL(val3);
    img4.src = URL.createObjectURL(val4);
    img5.src = URL.createObjectURL(val5);
    img6.src = URL.createObjectURL(val6);


    let images = [img, img2, img3, img4, img5, img6]

    // wait for all images to load

    const proms = images.map(im => new Promise(res =>
      im.onload = () => res(im.width, im.height)
    ))


    //const promise = Promise.resolve();

    // list all image widths and heights _after_ the images have loaded:
    const promise = Promise.all(proms).then(data => {
      console.log(img.width / img.height == 1 && allEqual(data))
      answer = img.width / img.height == 1 && allEqual(data)
      return (answer)
    })

    //IDs = [1, 2, 3] //[promise, "someothershit"]
    return ([promise, images])

    // if (img.width / img.height == 1 && allEqual(data)) {

  }
 
  function setupCubeMapFolderParent(name){
    let parent = document.createElement("a-entity"); //this object will be the parent of any 3d meshes generated from the current image     
          parent.setAttribute("id", name)
          layers.appendChild(parent)
          addButton(setLayer, name); // buttonsToEnable.push("button" + img.name); //add button to ui
          activeButtons.add(name)
          watch(name, "folderCube" )
          imagesLoading -= 5;

          return parent

  }


  function printActiveImages() {
    globalImageFiles.forEach((value, key) => {
      console.log(value.name)
    })
  }

  
  function processImage(values) {

    var img = new Image(); //img.parentID = this.files[i].name //this is a little hack that can be removed later

    img.name = values.name  //generate id for parent object, current bug when dealing with duplicate image names

    while (activeButtons.has(img.name)) {
      img.name = img.name + "_"

    }

    globalImageFiles.set(img.name, values)
    activeButtons.add(img.name)


    img.src = URL.createObjectURL(values);
    img.onload = findformat // find the 360 format that best fits this image 

    addButton(setLayer, img.name); // buttonsToEnable.push("button" + img.name); //add button to ui

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