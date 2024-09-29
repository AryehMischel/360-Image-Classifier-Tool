function process360Image(){}

function processCubeMap(img, parent) {

    let format = classifyCubeMap(img);

    //HOW CUBEMAP TYPES ARE CLASSIFIED
        // our image is sliced in a 4/3 grid. The color of each cell is averaged and compared to a threshold, 
        // cells are set as follows; 0 = "mostly empty", 1 = "not mostly empty"
        // cells are ordered from left to right, top to bottom    
        //                    0010
        // 001011110010   ->  1111  -> standard cube map 
        //                    0010

    switch (format) {

        case "010011110100": 
        createCubeMapTextureFromHorizontalCross(img);
        addFormatIcon(img.name, "HorizontalCross")        
        break;  //Format is a horizontal cross 
       
        
        case "000111110001":
        createCubeMapTextureFromHorizontalT(img); 
        addFormatIcon(img.name, "HorizontalT")
        break;  
        

        // etc, etc
        // case "001011110010": 
        // createCubeMapTextureFromVerticalCross(img, parent); 
        // addFormatIcon(img.name, "VerticalCross")
        // break;  
        //  
        //
        /////////

        default: 
        addFormatIcon(img.name, "noFormatDetectedIcon"); 
        //imagesLoading--; 
    
    }

    




}

function classifyCubeMap(img) {

    let canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d");
    
    canvas.height = img.height 
    canvas.width = img.width 
    ctx.drawImage(img, 0, 0);
    let imgData = ctx.getImageData(0, 0, img.width, img.height);
    let RGB_D = blurImageGrid(4, 3, imgData)

    let tarr = []

    for (i = 0; i < RGB_D.length; i += 3) {
        let col = RGB_D[i] + RGB_D[i + 1] + RGB_D[i + 2]
        // console.log(col)
        if (col > 750 || col < 20) {
            tarr.push(0)
        } else {
            tarr.push(1)
        }
    }

    let tString = tarr.join("")
    RGB_D = null
    canvas = null
    return (tString)

}

function blurImageGrid(X_Seg, Y_Seg, imgData) {

    let RGB_D = []

    let CellY = Math.floor(imgData.height / Y_Seg) //height of each cell in pixels
    let CellX = Math.floor(imgData.width / X_Seg)//width of each cell in pixels


    // console.log("X : " + CellX + " Y: " + CellY)


    let hOff = 0
    for (h = 0; h < Y_Seg; h++) {
        let xOff = 0;
        for (w = 0; w < X_Seg; w++) {
            let cell1 = [0, 0, 0]
            let yOff = 0;
            for (y = 0; y < CellY; y++) {


                for (x = 0; x < (CellX * 4); x += 4) {
                    cell1[0] += imgData.data[x + yOff + xOff + hOff]
                    cell1[1] += imgData.data[x + 1 + yOff + xOff + hOff]
                    cell1[2] += imgData.data[x + 2 + yOff + xOff + hOff]

                }
                yOff += imgData.width * 4
            }
            xOff += (CellX * 4)

            cell1[0] = cell1[0] / (CellY * CellX)
            cell1[1] = cell1[1] / (CellY * CellX)
            cell1[2] = cell1[2] / (CellY * CellX)

            //xOff += CellX * 4

            //let co = "rgb(" + cell1[0] + "," + cell1[1] + "," + cell1[2] + ")"
            RGB_D.push(cell1[0])
            RGB_D.push(cell1[1])
            RGB_D.push(cell1[2])

            //console.log(co)
            //drawCell(0,0, co)
        }



        hOff += (imgData.width * 4) * CellY
    }

    return RGB_D


    // for (y = 0; y < Y_Seg; y++) {
    // 	for (x = 0; x < X_Seg; x++) {
    // 		let yOff = y * (RGB_D.length / Y_Seg);
    // 		let col = "rgb(" + RGB_D[0 + (x * 3) + yOff] + "," + RGB_D[1 + (x * 3) + yOff] + "," + RGB_D[2 + (x * 3) + yOff] + ")"
    // 		dCell(CellX * x, CellY * y, CellX, CellY, col, ctx)
    // 	}
    // }



    //spliceRGB(X_Seg, Y_Seg)

    // splitRGB(segments)
    // let answer = classifyCubeMap(RGB_D)
    // return answer

}

function createCubeMapTextureFromHorizontalT(img){
    let canvas = document.createElement("canvas")
    let canvas2 = document.createElement("canvas")
    let canvas3 = document.createElement("canvas")
    let canvas4 = document.createElement("canvas")
    let canvas5 = document.createElement("canvas")
    let canvas6 = document.createElement("canvas")

    canvas.style.display = "none";
    canvas2.style.display = "none";
    canvas3.style.display = "none";
    canvas4.style.display = "none";
    canvas5.style.display = "none";
    canvas6.style.display = "none";

    const ctx = canvas.getContext("2d");
    const ctx2 = canvas2.getContext("2d");
    const ctx3 = canvas3.getContext("2d");
    const ctx4 = canvas4.getContext("2d");
    const ctx5 = canvas5.getContext("2d");
    const ctx6 = canvas6.getContext("2d");

    // let divisor = 6 // let w = img.naturalWidth / divisor


    canvas.height = img.naturalHeight / 3
    canvas.width = img.naturalWidth / 4
    canvas2.height = img.naturalHeight / 3
    canvas2.width = img.naturalWidth / 4
    canvas3.height = img.naturalHeight / 3
    canvas3.width = img.naturalWidth / 4
    canvas4.height = img.naturalHeight / 3
    canvas4.width = img.naturalWidth / 4
    canvas5.height = img.naturalHeight / 3
    canvas5.width = img.naturalWidth / 4
    canvas6.height = img.naturalHeight / 3
    canvas6.width = img.naturalWidth / 4


    //image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)

    ctx.drawImage(img, img.width * .75, img.height / 3, img.width / 4, img.height / 3, 0, 0, img.width / 4, img.height / 3); //-x
    ctx2.drawImage(img, img.width * .25, img.height / 3, img.width / 4, img.height / 3, 0, 0, img.width / 4, img.height / 3); //+x
    ctx3.drawImage(img, img.width * .5, 0, img.width / 4, img.height / 3, 0, 0, img.width / 4, img.height / 3); //+y
    ctx4.drawImage(img, img.width * .5, (img.height / 3) * 2, img.width / 4, img.height / 3, 0, 0, img.width / 4, img.height / 3); //-y
    ctx5.drawImage(img, img.width / 2, img.height / 3, img.width / 4, img.height / 3, 0, 0, img.width / 4, img.height / 3); //+x
    ctx6.drawImage(img, 0, img.height / 3, img.width / 4, img.height / 3, 0, 0, img.width / 4, img.height / 3); //-x

    let cubeTexture = createCubeTexture(canvas, canvas2, canvas3, canvas4, canvas5, canvas6) //create a cubemap from 6 canvas's
    cubeMapTextures[img.name] = cubeTexture

    canvas = null
    canvas2 = null
    canvas3 = null
    canvas4 = null
    canvas5 = null
    canvas6 = null


    
    setUI(img.name, "cubeMap");
    imagesLoaded += 1;
}

function createCubeMapTextureFromHorizontalCross(img){
    let canvas = document.createElement("canvas")
    let canvas2 = document.createElement("canvas")
    let canvas3 = document.createElement("canvas")
    let canvas4 = document.createElement("canvas")
    let canvas5 = document.createElement("canvas")
    let canvas6 = document.createElement("canvas")

    canvas.style.display = "none";
    canvas2.style.display = "none";
    canvas3.style.display = "none";
    canvas4.style.display = "none";
    canvas5.style.display = "none";
    canvas6.style.display = "none";

    const ctx = canvas.getContext("2d");
    const ctx2 = canvas2.getContext("2d");
    const ctx3 = canvas3.getContext("2d");
    const ctx4 = canvas4.getContext("2d");
    const ctx5 = canvas5.getContext("2d");
    const ctx6 = canvas6.getContext("2d");

    // let divisor = 6 // let w = img.naturalWidth / divisor


    canvas.height = img.naturalHeight / 3
    canvas.width = img.naturalWidth / 4
    canvas2.height = img.naturalHeight / 3
    canvas2.width = img.naturalWidth / 4
    canvas3.height = img.naturalHeight / 3
    canvas3.width = img.naturalWidth / 4
    canvas4.height = img.naturalHeight / 3
    canvas4.width = img.naturalWidth / 4
    canvas5.height = img.naturalHeight / 3
    canvas5.width = img.naturalWidth / 4
    canvas6.height = img.naturalHeight / 3
    canvas6.width = img.naturalWidth / 4


    //image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
    ctx.drawImage(img, img.width / 2, img.height / 3, img.width / 4, img.height / 3, 0, 0, img.width / 4, img.height / 3); //+x
    ctx2.drawImage(img, 0, img.height / 3, img.width / 4, img.height / 3, 0, 0, img.width / 4, img.height / 3); //-x
    ctx3.drawImage(img, img.width / 4, 0, img.width / 4, img.height / 3, 0, 0, img.width / 4, img.height / 3); //+y
    ctx4.drawImage(img, img.width / 4, (img.height / 3) * 2, img.width / 4, img.height / 3, 0, 0, img.width / 4, img.height / 3); //-y
    ctx5.drawImage(img, img.width * .25, img.height / 3, img.width / 4, img.height / 3, 0, 0, img.width / 4, img.height / 3); //+z
    ctx6.drawImage(img, img.width * .75, img.height / 3, img.width / 4, img.height / 3, 0, 0, img.width / 4, img.height / 3); //-z

    let cubeTexture = createCubeTexture(canvas, canvas2, canvas3, canvas4, canvas5, canvas6) //create a cubemap from 6 canvas's
    cubeMapTextures[img.name] = cubeTexture
    

    canvas = null
    canvas2 = null
    canvas3 = null
    canvas4 = null
    canvas5 = null
    canvas6 = null

    setUI(img.name, "cubeMap");
    // imagesLoaded += 1;
}

function createCubeStripTexture(img){
   
    let canvas = document.createElement("canvas")
    let canvas2 = document.createElement("canvas")
    let canvas3 = document.createElement("canvas")
    let canvas4 = document.createElement("canvas")
    let canvas5 = document.createElement("canvas")
    let canvas6 = document.createElement("canvas")

    canvas.style.display = "none";
    canvas2.style.display = "none";
    canvas3.style.display = "none";
    canvas4.style.display = "none";
    canvas5.style.display = "none";
    canvas6.style.display = "none";

    const ctx = canvas.getContext("2d");
    const ctx2 = canvas2.getContext("2d");
    const ctx3 = canvas3.getContext("2d");
    const ctx4 = canvas4.getContext("2d");
    const ctx5 = canvas5.getContext("2d");
    const ctx6 = canvas6.getContext("2d");


    let divisor = 6
    let w = img.naturalWidth / divisor

    //console.log(performance.now())


    canvas.height = img.naturalHeight
    canvas.width = img.naturalWidth / divisor

    canvas2.height = img.naturalHeight
    canvas2.width = img.naturalWidth / divisor


    canvas3.height = img.naturalHeight
    canvas3.width = img.naturalWidth / divisor

    canvas4.height = img.naturalHeight
    canvas4.width = img.naturalWidth / divisor


    canvas5.height = img.naturalHeight
    canvas5.width = img.naturalWidth / divisor

    canvas6.height = img.naturalHeight
    canvas6.width = img.naturalWidth / divisor


    ctx.drawImage(img, 0, 0); //bottom of image
    ctx2.drawImage(img, -w, 0);
    ctx3.drawImage(img, -w * 2, 0);
    ctx4.drawImage(img, -w * 3, 0); //bottom of image
    ctx5.drawImage(img, -w * 4, 0);
    ctx6.drawImage(img, -w * 5, 0);  //bottom of image


    let cubeTexture = createCubeTexture(canvas, canvas2, canvas3, canvas4, canvas5, canvas6) //create a cubemap from 6 canvas's
    cubeMapTextures[img.name] = cubeTexture
    imagesLoaded += 1;


    setUI(img.name, "cubeMap");
    // imagesLoaded += 1;
}

function createStereoCubeMapTexture(img){
    let canvas = document.createElement("canvas")
    let canvas2 = document.createElement("canvas")
    let canvas3 = document.createElement("canvas")
    let canvas4 = document.createElement("canvas")
    let canvas5 = document.createElement("canvas")
    let canvas6 = document.createElement("canvas")



    let canvas7 = document.createElement("canvas")
    let canvas8 = document.createElement("canvas")
    let canvas9 = document.createElement("canvas")
    let canvas10 = document.createElement("canvas")
    let canvas11 = document.createElement("canvas")
    let canvas12 = document.createElement("canvas")



    canvas.style.display = "none";
    canvas2.style.display = "none";
    canvas3.style.display = "none";
    canvas4.style.display = "none";
    canvas5.style.display = "none";
    canvas6.style.display = "none";


    canvas7.style.display = "none";
    canvas8.style.display = "none";
    canvas9.style.display = "none";
    canvas10.style.display = "none";
    canvas11.style.display = "none";
    canvas12.style.display = "none";



    let ctx = canvas.getContext("2d");
    let ctx2 = canvas2.getContext("2d");
    let ctx3 = canvas3.getContext("2d");
    let ctx4 = canvas4.getContext("2d");
    let ctx5 = canvas5.getContext("2d");
    let ctx6 = canvas6.getContext("2d");


    let ctx7 = canvas7.getContext("2d");
    let ctx8 = canvas8.getContext("2d");
    let ctx9 = canvas9.getContext("2d");
    let ctx10 = canvas10.getContext("2d");
    let ctx11 = canvas11.getContext("2d");
    let ctx12 = canvas12.getContext("2d");


    let divisor = 12
    let w = img.naturalWidth / divisor

    canvas.height = img.naturalHeight
    canvas.width = img.naturalWidth / divisor

    canvas2.height = img.naturalHeight
    canvas2.width = img.naturalWidth / divisor


    canvas3.height = img.naturalHeight
    canvas3.width = img.naturalWidth / divisor

    canvas4.height = img.naturalHeight
    canvas4.width = img.naturalWidth / divisor


    canvas5.height = img.naturalHeight
    canvas5.width = img.naturalWidth / divisor

    canvas6.height = img.naturalHeight
    canvas6.width = img.naturalWidth / divisor


    canvas7.height = img.naturalHeight
    canvas7.width = img.naturalWidth / divisor

    canvas8.height = img.naturalHeight
    canvas8.width = img.naturalWidth / divisor


    canvas9.height = img.naturalHeight
    canvas9.width = img.naturalWidth / divisor

    canvas10.height = img.naturalHeight
    canvas10.width = img.naturalWidth / divisor


    canvas11.height = img.naturalHeight
    canvas11.width = img.naturalWidth / divisor

    canvas12.height = img.naturalHeight
    canvas12.width = img.naturalWidth / divisor


    ctx.drawImage(img, 0, 0); //bottom of image
    ctx2.drawImage(img, -w, 0);
    ctx3.drawImage(img, -w * 2, 0);
    ctx4.drawImage(img, -w * 3, 0); //bottom of image
    ctx5.drawImage(img, -w * 4, 0);
    ctx6.drawImage(img, -w * 5, 0);  //bottom of image
    ctx7.drawImage(img, -w * 6, 0);  //bottom of image
    ctx8.drawImage(img, -w * 7, 0);  //bottom of image
    ctx9.drawImage(img, -w * 8, 0);  //bottom of image
    ctx10.drawImage(img, -w * 9, 0);  //bottom of image
    ctx11.drawImage(img, -w * 10, 0);  //bottom of image
    ctx12.drawImage(img, -w * 11, 0);  //bottom of image



    var cubeTextureLeft = createCubeTexture(canvas, canvas2, canvas3, canvas4, canvas5, canvas6) 
    var cubeTextureRight = createCubeTexture(canvas7, canvas8, canvas9, canvas10, canvas11, canvas12)
    stereoCubeMapTextures[img.name] = [cubeTextureLeft, cubeTextureRight]   

    canvas = null
    canvas2 = null
    canvas3 = null
    canvas4 = null
    canvas5 = null
    canvas6 = null
    canvas7 = null
    canvas8 = null
    canvas9 = null
    canvas10 = null
    canvas11 = null
    canvas12 = null

    ctx = null
    ctx2 = null
    ctx3 = null
    ctx4 = null
    ctx5 = null
    ctx6 = null
    ctx7 = null
    ctx8 = null
    ctx9 = null
    ctx10 = null
    ctx11 = null
    ctx12 = null



    setUI(img.name, "stereoCubeMap");
    // imagesLoaded += 1;

}

function createEqrtTexture(img){
    const texture = new THREE.TextureLoader().load(img.src);
    if(initializeTexturesOnLoad){
    renderer.initTexture(texture)
      
    }
    eqrtTextures[img.name] = texture


    setUI(img.name, "eqrt");
    // imagesLoaded += 1;
}

function createStereoEqrtTexture(img){
    let canvas = document.createElement("canvas")
    let canvas2 = document.createElement("canvas")

    canvas.style.display = "none";
    canvas2.style.display = "none";

    const ctx = canvas.getContext("2d");
    const ctx2 = canvas2.getContext("2d");

    canvas.height = img.naturalHeight / 2
    canvas.width = img.naturalWidth

    canvas2.height = img.naturalHeight / 2
    canvas2.width = img.naturalWidth

    ctx.drawImage(img, 0, 0);
    ctx2.drawImage(img, 0, -img.height / 2);


    const textureLeft = new THREE.CanvasTexture(canvas);
    const textureRight = new THREE.CanvasTexture(canvas2);

    canvas = null
    canvas2 = null

    stereoEqrtTextures[img.name] = [textureLeft, textureRight]

    if(initializeTexturesOnLoad){
        renderer.initTexture(textureLeft)
        renderer.initTexture(textureRight)
    }

    setUI(img.name, "stereoEqrt");
    // imagesLoaded += 1;
 
}

function createCubeMapTextureFromImages(images, imageName){
    let canvas = document.createElement("canvas")
    let canvas2 = document.createElement("canvas")
    let canvas3 = document.createElement("canvas")
    let canvas4 = document.createElement("canvas")
    let canvas5 = document.createElement("canvas")
    let canvas6 = document.createElement("canvas")




    canvas.height = images[2].naturalHeight
    canvas.width = images[2].naturalWidth 
    canvas2.height = images[2].naturalHeight
    canvas2.width = images[2].naturalWidth 
    canvas3.height = images[2].naturalHeight 
    canvas3.width = images[2].naturalWidth 
    canvas4.height = images[2].naturalHeight 
    canvas4.width = images[2].naturalWidth 
    canvas5.height = images[2].naturalHeight 
    canvas5.width = images[2].naturalWidth 
    canvas6.height = images[2].naturalHeight 
    canvas6.width = images[2].naturalWidth 

    canvas.style.display = "none";
    canvas2.style.display = "none";
    canvas3.style.display = "none";
    canvas4.style.display = "none";
    canvas5.style.display = "none";
    canvas6.style.display = "none";

    let ctx = canvas.getContext("2d");
    let ctx2 = canvas2.getContext("2d");
    let ctx3 = canvas3.getContext("2d");
    let ctx4 = canvas4.getContext("2d");
    let ctx5 = canvas5.getContext("2d");
    let ctx6 = canvas6.getContext("2d");



    ctx.drawImage(images[0], 0, 0)
    ctx2.drawImage(images[1], 0, 0)
    ctx3.drawImage(images[2], 0, 0)
    ctx4.drawImage(images[3], 0, 0)
    ctx5.drawImage(images[4], 0, 0)
    ctx6.drawImage(images[5], 0, 0)

    let cubeTexture = createCubeTexture(canvas, canvas2, canvas3, canvas4, canvas5, canvas6)
    cubeMapTextures[imageName] = cubeTexture

    canvas = null
    canvas2 = null
    canvas3 = null
    canvas4 = null
    canvas5 = null
    canvas6 = null
    
    // setUI(imageName, "cubeMap");
    addFormatIcon(imageName, "folderCubeMap")
    // imagesLoaded += 1;
}
//could be usefull to change canvasTextures to bitmaps, it would make it easier to add webworkers
function createCubeTexture(c, c2, c3, c4, c5, c6) {
    const canvasTextures = [
        new THREE.CanvasTexture(c),
        new THREE.CanvasTexture(c2),
        new THREE.CanvasTexture(c3),
        new THREE.CanvasTexture(c4),
        new THREE.CanvasTexture(c5),
        new THREE.CanvasTexture(c6),
    ];
    
    // Initialize each texture
    if(initializeTexturesOnLoad){
        canvasTextures.forEach(texture => {
            renderer.initTexture(texture);
        });
    
    }


    return canvasTextures


}

//after an image texture is loaded/initialized, we can enable the select and delete button
function setUI(imgName, format){

    let button = document.getElementById("button" + imgName)
    button.setAttribute("onclick", `setLayerTexture('${imgName}', '${format}')`)


    let deleteButton = document.getElementById("delete" + imgName)
    deleteButton.setAttribute("onclick", `deleteImage('${imgName}', '${format}')`) //deleteButton.onclick
    deleteButton.disabled = false
    button.disabled = false


}



