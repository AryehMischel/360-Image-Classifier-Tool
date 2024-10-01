
self.onmessage = async function (event) {
    const imageFile = event.data.imageFile;
    const imageName = event.data.imageName;
    var bitmap = null;
    console.log("image link received: " + imageFile);

    try {
        // Load the cubemap image as a bitmap
        bitmap = await createImageBitmap(imageFile, {imageOrientation: "flipY"});



        let imageRatio = Math.round((bitmap.width / bitmap.height) * 10) / 10;
        let format = findFormat(imageRatio);



        // console.log("image ratio: " + imageRatio);

    } catch (error) {

        console.error("Error loading image: " + error.message);
        return;
    }


    //find format of image and send it back to main thread

    // if image is a t cubemap then figure out which t map it is



    async function findFormat(imageRatio) {
        switch (imageRatio) { // width/height
            case 12:
                self.postMessage({ work: "setFormat", format: "stereoCubeMap", imageName });
                let bitmaps = await processStereoCubeMap(bitmap);
                self.postMessage({ work: "createTexture", format: "stereoCubeMap", bitmaps, imageName }, bitmaps);
                return "stereoCubeMap";
            //   addFormatIcon(this.name, "stereoCubeMap");
            //   createStereoCubeMapTexture(this); break;

            case 6:
                self.postMessage({ work: "setFormat", format: "stripCubeMap", imageName });
                let cubeStripBitmaps = await processCubeStrip(bitmap);
                self.postMessage({ work: "createTexture", format: "cubeMap", bitmaps: cubeStripBitmaps, imageName }, cubeStripBitmaps);
                return "stripCubeMap";
            //   addFormatIcon(this.name, "stripCubeMap");
            //   createCubeStripTexture(this); break;

            case 2:
                self.postMessage({ work: "setFormat", format: "eqrt", imageName });
                self.postMessage({ work: "createTexture", format: "eqrt", bitmap, imageName }, bitmap);
                return "eqrt";
            //   addFormatIcon(this.name, "eqrt");
            //   createEqrtTexture(this); break;

            case 1.3:

                let processedImage = await processPotentialCubeMap(bitmap);
                console.log("processed image: ", processedImage);
                self.postMessage({ work: "setFormat", format: processedImage.format, imageName })
                if(processedImage.bitmaps){
                    self.postMessage({ work: "createTexture", format: "cubeMap", bitmaps: processedImage.bitmaps, imageName}, processedImage.bitmaps);
                }
                
                return processedImage.format;

                
                // console.log("processed image: ", processedImage);
                // return processedImage.format;
                break;

            case 1:
                self.postMessage({ work: "setFormat", format: "stereoEqrt", imageName });
                let stereoEqrtBitmaps = await processStereoEqrt(bitmap);
               
                self.postMessage({ work: "createTexture", format: "stereoEqrt", bitmaps: stereoEqrtBitmaps, imageName }, stereoEqrtBitmaps);
                return "stereoEqrt";
            // addFormatIcon(this.name, "stereoEqrt"); createStereoEqrtTexture(this); break;
            default:
                self.postMessage({ work: "setFormat", format: "noFormatDetected", imageName });
                return "noFormatDetected";
            // addFormatIcon(this.name, "noFormatDetectedIcon");
            //   break;
        }
    }



    // self.postMessage("image link received");
};




async function processPotentialCubeMap(img) {

    let result = null;
    // format, bitmapGrid = classifyCubeMap(img);
    try {
        result = await classifyCubeMap(img);
        console.log(result.simpleGrid);
        console.log(result.bitmapGrid);
        // Further processing
    } catch (error) {
        console.error("Error processing cube map:", error);
    }

    //HOW CUBEMAP TYPES ARE CLASSIFIED
    // our image is sliced in a 4/3 grid. The color of each cell is averaged and compared to a threshold, 
    // cells are set as follows; 0 = "mostly empty", 1 = "not mostly empty"
    // cells are ordered from left to right, top to bottom    
    //                    0010
    // 001011110010   ->  1111  -> standard cube map 
    //                    0010

    switch (result.simpleGrid) {

        case "010011110100": 
        console.log("HorizontalCross")
        return ({format: "HorizontalCross", 
            bitmaps: [ result.bitmapGrid[6], result.bitmapGrid[4], result.bitmapGrid[9], result.bitmapGrid[1], result.bitmapGrid[5], result.bitmapGrid[7]]
        });
        break;  


        case "000111110001":
        console.log("horizontalT")
        return ({format: "noFormatDetected"})//, bitmapGrid;
        // TODO: createCubeMapTextureFromHorizontalT(img, parent);
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
        return ({format: "noFormatDetected"})//, bitmapGrid;
        // addFormatIcon(img.name, "noFormatDetectedIcon"); 
        //imagesLoading--; 

    }






}


async function classifyCubeMap(bitmap) {
    let bitmapGrid = [];
    let simpleGrid = [];
    let cellWidth = Math.floor(bitmap.width / 4);
    let cellHeight = Math.floor(bitmap.height / 3);

    // Create a single OffscreenCanvas
    const offscreenCanvas = new OffscreenCanvas(cellWidth, cellHeight);
    const ctx = offscreenCanvas.getContext('2d', { willReadFrequently: true });

    let promises = [];

    for (let y = 0; y < 3; y++) {
        for (let x = 0; x < 4; x++) {
            // Draw the current cell onto the OffscreenCanvas
            ctx.clearRect(0, 0, cellWidth, cellHeight); // Clear the canvas
            ctx.drawImage(bitmap, x * cellWidth, y * cellHeight, cellWidth, cellHeight, 0, 0, cellWidth, cellHeight);

            // Get the image data for the current cell
            const imgData = ctx.getImageData(0, 0, cellWidth, cellHeight);
            const avgColor = calculateAverageColor(imgData);



            // Create an ImageBitmap for the current cell
            let subBitmap = await createImageBitmap(offscreenCanvas);
            bitmapGrid.push(subBitmap);
            let zeroOrOne = evaluateCell(avgColor);
            simpleGrid.push(zeroOrOne);


          }  // Create an ImageBitmap for the current cell
    }

    return { simpleGrid: simpleGrid.join(""), bitmapGrid };
    
}



async function processStereoCubeMap(bitmap){
    let subBitmaps = [];
    let subBitmapWidth = Math.floor(bitmap.width / 12);

    for (let i = 0; i < 12; i++) {
        let subBitmap = await createImageBitmap(bitmap, i * subBitmapWidth, 0, subBitmapWidth, bitmap.height);
        subBitmaps[i] = subBitmap;
    }

    return subBitmaps;

}

async function processCubeStrip(bitmap){
    let subBitmaps = [];
    let subBitmapWidth = Math.floor(bitmap.width / 6);

    for (let i = 0; i < 6; i++) {
        let subBitmap = await createImageBitmap(bitmap, i * subBitmapWidth, 0, subBitmapWidth, bitmap.height);
        subBitmaps[i] = subBitmap;
    }

    return subBitmaps;
}




function calculateAverageColor(imgData) {
    const data = imgData.data;
    let r = 0, g = 0, b = 0;
    const totalPixels = imgData.width * imgData.height;

    for (let i = 0; i < data.length; i += 4) {
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
    }

    r = Math.round(r / totalPixels);
    g = Math.round(g / totalPixels);
    b = Math.round(b / totalPixels);

    return { r, g, b };



    // self.postMessage({ work: "bitmapGrid", bitmapGrid });
}


function evaluateCell(avgColor) {
    let total = avgColor.r + avgColor.g + avgColor.b;
    if (total > 750 || total < 20) {
        return 0;
    } else {
        return 1;
    }
}



async function processStereoEqrt(bitmap) {
    let subBitmaps = [];
    let subBitmapHeight = Math.floor(bitmap.height / 2);

    for (let i = 0; i < 2; i++) {
        let subBitmap = await createImageBitmap(bitmap, 0, i * subBitmapHeight, bitmap.width, subBitmapHeight);
        subBitmaps[i] = subBitmap;
    }

    return subBitmaps;
}




