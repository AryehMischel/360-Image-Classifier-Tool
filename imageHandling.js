

function unFlattenDir(flatArray) {
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

  function processDir(dir){

    dir.forEach((values, keys) => {
      let name = keys;

      while (savedImages.has(name)) {
        name = name + "_"
      }


      if (values.size == 6) { //check if it is a cubemap   //process images //check if images are valid cubemap
        let v = values
       
        try {

          let processedImages = processCubeImages(values)
          addImageUI(name)
          setUI(name, "folderCube")
          processedImages[0].then(() => { createCubeMapTextureFromImages(processedImages[1], name) });
        
        } catch {

          checkCubeMapViable(values).then((Values) => { //I should check even if names are correct?
            Values[0].then((values) => {
              if (values == true) {

                //handle -> cubemap input files not specified 
              } else {

                let imagesTO = Values[1];

                for (let i = 0; i < imagesTO.length; i++) {

                  let img = imagesTO[i]

                  while (savedImages.has(img.name)) {
                    img.name = img.name + "_"

                  }

                  addImageUI(img.name); 
                  savedImages.add(img.name)
                  findformat.call(img)

                }

                v = null
              }
            })
          })
        }
      } else {
        values.forEach((values, keys) => {
          processImage(values)
        })
      }
    });

    dir = null
    flatArray = null
    files = null
  }

  function processCubeImages(values){

    let px = URL.createObjectURL(values.get("px"));
    let nx = URL.createObjectURL(values.get("nx"));
    let py = URL.createObjectURL(values.get("py"));
    let ny = URL.createObjectURL(values.get("ny"));
    let pz = URL.createObjectURL(values.get("pz"));
    let nz = URL.createObjectURL(values.get("nz"));


    
    var img = new Image();  
    var img2 = new Image(); 
    var img3 = new Image();
    var img4 = new Image(); 
    var img5 = new Image(); 
    var img6 = new Image(); 


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
    var img = new Image();  
    var img2 = new Image();
    var img3 = new Image(); 
    var img4 = new Image(); 
    var img5 = new Image(); 
    var img6 = new Image(); 

    img.name =  Array.from(values.keys())[0]
    img2.name = Array.from(values.keys())[1]
    img3.name = Array.from(values.keys())[2]
    img4.name = Array.from(values.keys())[3]
    img5.name = Array.from(values.keys())[4]
    img6.name = Array.from(values.keys())[5]

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



    // list all image widths and heights _after_ the images have loaded:
    const promise = Promise.all(proms).then(data => {
      console.log(img.width / img.height == 1 && allEqual(data))
      answer = img.width / img.height == 1 && allEqual(data)
      return (answer)
    })

    return ([promise, images])
    // if (img.width / img.height == 1 && allEqual(data)) {

  }
  
  
  function processImage(values) {

    var img = new Image(); //img.parentID = this.files[i].name //this is a little hack that can be removed later

    img.name = values.name  //generate id for parent object, current bug when dealing with duplicate image names

    while (savedImages.has(img.name)) {
      img.name = img.name + "_"

    }

    savedImages.add(img.name)


    img.src = URL.createObjectURL(values);
    img.onload = findformat // find the 360 format that best fits this image 

    addImageUI(img.name); // buttonsToEnable.push("button" + img.name); //add button to ui

  }


