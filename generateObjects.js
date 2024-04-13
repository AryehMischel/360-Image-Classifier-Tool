//create stereo cube from flat 12 : 1 image
function createStereoSphere(img, parent) {


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


    const Rtexture = new THREE.CanvasTexture(canvas);
    const material = new THREE.MeshPhongMaterial();
    material.side = THREE.BackSide
    material.map = Rtexture;

    const Ltexture = new THREE.CanvasTexture(canvas2);
    const material2 = new THREE.MeshPhongMaterial();
    material2.side = THREE.BackSide
    material2.map = Ltexture;


    const geo = new THREE.SphereGeometry(30, 64, 32);
    //   const geo = new THREE.BoxGeometry( 15, 32, 16 ); 

    const mesh = new THREE.Mesh(geo, material);
    const mesh2 = new THREE.Mesh(geo, material2);

    mesh.layers.set(2)
    mesh2.layers.set(1)

    parent.object3D.add(mesh, mesh2)

    canvas = null
    canvas2 = null
    imagesLoaded += 1;
    if(imagesLoaded == imagesLoading){
        setupLayers()
    }
}

function createSphere(img, parent) {
    const texture = new THREE.TextureLoader().load(img.src);

    const material = new THREE.MeshPhongMaterial();
    material.side = THREE.BackSide
    material.map = texture;

    const geo = new THREE.SphereGeometry(30, 64, 32);
    const mesh = new THREE.Mesh(geo, material);

    parent.object3D.add(mesh)
    imagesLoaded += 1;
    if(imagesLoaded == imagesLoading){
        setupLayers()
    }
}


function createTest(px, nx,py, ny, pz, nz, parent) {

    // const textureImage = require('../assets/images/image.png');

       const geometry = new THREE.BoxGeometry(20, 20, 20);
       const loader = new THREE.TextureLoader();
   
       const cubeMaterials = [
   
        new THREE.MeshBasicMaterial({ map: loader.load(px), side: THREE.BackSide }), //left side
        new THREE.MeshBasicMaterial({ map: loader.load(nx), side: THREE.BackSide }), //left side
        new THREE.MeshBasicMaterial({ map: loader.load(py), side: THREE.BackSide }), //left side
        new THREE.MeshBasicMaterial({ map: loader.load(ny), side: THREE.BackSide }), //left side
        new THREE.MeshBasicMaterial({ map: loader.load(pz), side: THREE.BackSide }), //left side
        new THREE.MeshBasicMaterial({ map: loader.load(nz), side: THREE.BackSide }), //left side

       ];
   
       cubeMaterials.BackSide = true;
   
   
   
       //create material, color, or image texture
       let cube = new THREE.Mesh(geometry, cubeMaterials);
       parent.object3D.add(cube) //append cubes to parent element
       layers.appendChild(parent)
    imagesLoaded += 1;
    if(imagesLoaded == imagesLoading){
        setupLayers()
    }




    // const texture = new THREE.TextureLoader().load(img.src);

    // const material = new THREE.MeshPhongMaterial();
    // material.side = THREE.BackSide
    // material.map = texture;

    // const geo = new THREE.SphereGeometry(30, 64, 32);
    // const mesh = new THREE.Mesh(geo, material);

    // parent.object3D.add(mesh)
    // imagesLoaded += 1;
    // if(imagesLoaded == imagesLoading){
    //     setupLayers()
    // }
}



function createStereoCube(img, parent) {
    console.log(performance.now())

    console.log(img)

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

    console.log(performance.now())


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




    const geometry = new THREE.BoxGeometry(20, 20, 20);

    var cubeMaterials = [



        new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(canvas), side: THREE.BackSide }),
        new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(canvas2), side: THREE.BackSide }),


        new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(canvas3), side: THREE.BackSide }),
        new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(canvas4), side: THREE.BackSide }),

        new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(canvas5), side: THREE.BackSide }),
        new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(canvas6), side: THREE.BackSide }),
    ];



    var cubeMaterials2 = [

        new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(canvas7), side: THREE.BackSide }),
        new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(canvas8), side: THREE.BackSide }),


        new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(canvas9), side: THREE.BackSide }),
        new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(canvas10), side: THREE.BackSide }),

        new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(canvas11), side: THREE.BackSide }),
        new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(canvas12), side: THREE.BackSide }),
    ];


    cubeMaterials.BackSide = true;
    cubeMaterials2.BackSide = true;

    //create material, color, or image texture
    let cube = new THREE.Mesh(geometry, cubeMaterials);
    let cube2 = new THREE.Mesh(geometry, cubeMaterials2);

    cube.layers.set(1)
    cube2.layers.set(2)
    parent.object3D.add(cube2, cube) //append cubes to parent element



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

    cubeMaterials = null
    cubeMaterials2 = null

    imagesLoaded += 1;
    if(imagesLoaded == imagesLoading){
        setupLayers()
    }
}



function processCubeStrip(img, parent) {

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


    createCube(parent, canvas, canvas2, canvas3, canvas4, canvas5, canvas6) //create a cubemap from 6 canvas's

}

function processCubeMap(img, parent) {

    let format = classifyCubeMap(img);//format is an array of 0 & 1s representing our image as empty (0) and occupied (1) cells where the image is segmented into a 4/3 grid
    //                              0010
    // 001011110010 represents      1111   which means the underlaying img is a standard cube map -> https://docs.unity3d.com/Manual/class-Cubemap.html
    //                              0010

    switch (format) {

        case "010011110100": drawt(img, parent); break;  //drawt 
        case "000111110001": drawbackwardst(img, parent); break;  //drawCapitalT
        case "001011110010": drawbackwardst(img, parent); break;  //drawbackwardst

        default: console.log("NA"); imagesLoading--; if (imagesLoaded == imagesLoading) { setupLayers() }; document.getElementById("label" + img.name).innerHTML = "no format detected... click to reselect" // make sky a default sky that says to reformat 
    }

    




}


async function drawbackwardst(img, parent) {

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

    createCube(parent, canvas, canvas2, canvas3, canvas4, canvas5, canvas6) //create a cubemap from 6 canvas's
}

async function drawt(img, parent) {

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


    createCube(parent, canvas, canvas2, canvas3, canvas4, canvas5, canvas6) //create a cubemap from 6 canvas's
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




function createCube(parent, c, c2, c3, c4, c5, c6) {

    const geometry = new THREE.BoxGeometry(20, 20, 20);
    const loader = new THREE.TextureLoader();

    const cubeMaterials = [

        new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(c), side: THREE.BackSide }),
        new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(c2), side: THREE.BackSide }),


        new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(c3), side: THREE.BackSide }),
        new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(c4), side: THREE.BackSide }),

        new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(c5), side: THREE.BackSide }),
        new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(c6), side: THREE.BackSide }),
    ];

    cubeMaterials.BackSide = true;



    //create material, color, or image texture
    let cube = new THREE.Mesh(geometry, cubeMaterials);
    parent.object3D.add(cube) //append cubes to parent element

    //delete canvas's 
   
    c = null
    c2 = null
    c3 = null
    c4 = null
    c5 = null
    c6 = null

    imagesLoaded += 1;
    if(imagesLoaded == imagesLoading){
        setupLayers()
    }



}