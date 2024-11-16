function createStereoCubeMapTexture(imageID, bitmaps){
    if (bitmaps.length !== 12) {
        console.error("Expected 12 bitmaps, but got " + bitmaps.length);
        return;
    }

    let leftEye = createCubeTexture(bitmaps[0], bitmaps[1], bitmaps[2], bitmaps[3], bitmaps[4], bitmaps[5])
    let rightEye = createCubeTexture(bitmaps[6], bitmaps[7], bitmaps[8], bitmaps[9], bitmaps[10], bitmaps[11])

    images[imageID].texture = [leftEye, rightEye]


    makeUIClickable(imageID)
    // myDropzone.emit("success", images[imageID].file)
}



function createCubeMapTexture(imageID, bitmaps) {

    if (bitmaps.length !== 6) {
        console.error("Expected 6 bitmaps, but got " + bitmaps.length);
        return;
    }
    let cubeMapTexture = createCubeTexture(bitmaps[0], bitmaps[1], bitmaps[2], bitmaps[3], bitmaps[4], bitmaps[5]);
    images[imageID].texture = cubeMapTexture

    makeUIClickable(imageID)

    // myDropzone.emit("success", images[imageID].file)
}


//designed to use bitmaps
function createCubeTexture(b1, b2, b3, b4, b5, b6) {
    const bitmapTextures = [
        new THREE.Texture(b1),
        new THREE.Texture(b2),
        new THREE.Texture(b3),
        new THREE.Texture(b4),
        new THREE.Texture(b5),
        new THREE.Texture(b6),
    ];
    
    // Initialize each texture
    if (initializeTexturesOnLoad) {
        bitmapTextures.forEach(texture => {
            texture.needsUpdate = true;
            // renderer.initTexture(texture);
        });
    }

    return bitmapTextures;
}



function createEqrtTexture(imageID, bitmap){
    
    const texture = new THREE.Texture(bitmap);
    if (initializeTexturesOnLoad) {
        texture.needsUpdate = true;
        // renderer.initTexture(texture);
    }

    images[imageID].texture = texture;

    makeUIClickable(imageID)
    // myDropzone.emit("success", images[imageID].file)
}


function createStereoEqrtTexture(imageID, bitmaps){

    const textureLeft = new THREE.Texture(bitmaps[0]);
    const textureRight = new THREE.Texture(bitmaps[1]);

    if (initializeTexturesOnLoad) {
        textureLeft.needsUpdate = true;
        textureRight.needsUpdate = true;
        // renderer.initTexture(textureLeft);
        // renderer.initTexture(textureRight);
    }

    images[imageID].texture = [textureLeft, textureRight];

    makeUIClickable(imageID)
    // myDropzone.emit("success", images[imageID].file)
}