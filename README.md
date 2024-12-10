# 360 Viewer

## Overview
This is a web-based tool designed to detect the format of 360 images, process them, and display them along with their detected formats. The tool supports various 360 image formats and provides a user-friendly interface for uploading and viewing images.
**[Live Demo](https://universal-360-image-classifier.onrender.com/)**
## Features
- **Format Detection**: Automatically detects the format of uploaded 360-degree images.
- **Image Processing**: Processes the images to ensure they are displayed correctly.
- **Image Display**: Displays the processed images along with their detected formats.
- **Drag and Drop Interface**: Easy-to-use drag and drop interface for uploading images.
- **Support for Multiple Formats**: Supports various 360 image formats including CubeMap, Equirectangular, and more.
- **Limited VR Support**: This does technically support VR, but it is not optimized or designed for VR. 

## Supported Formats
  <div width="100%">
    <img align="center" src="https://d1ty73zrqoktft.cloudfront.net/360-Image-Classifier-Tool/assets/icons/cubemapsFrame.png"/>
      <img width=10px>
    <img align="center" src="https://d1ty73zrqoktft.cloudfront.net/360-Image-Classifier-Tool/assets/icons/stereoCubemapFrame.png"/><br />
  </div><br />

<div width="100%">
    <img  src="https://d1ty73zrqoktft.cloudfront.net/360-Image-Classifier-Tool/assets/icons/stripeCubeMapFrame.png"/>
      <img width=10px>
    <img  src="https://d1ty73zrqoktft.cloudfront.net/360-Image-Classifier-Tool/assets/icons/cubeFolderFrame.png"/>
</div><br />

<div width="100%">
    <img  src="https://d1ty73zrqoktft.cloudfront.net/360-Image-Classifier-Tool/assets/icons/eqrtFrame.png"/>
      <img width=10px>
    <img  src="https://d1ty73zrqoktft.cloudfront.net/360-Image-Classifier-Tool/assets/icons/stereoEqrtFrame.png"/>
</div><br />
     


  
## Additional Formats to be added...

<div width="100%">
    <img  src="https://d1ty73zrqoktft.cloudfront.net/360-Image-Classifier-Tool/assets/icons/verticalCubeMapFrame.png"/>
      <img width=10px>
    <img  src="https://d1ty73zrqoktft.cloudfront.net/360-Image-Classifier-Tool/assets/icons/horizontalTCubeMapsFrame.png"/>
</div><br />
<div width="100%">
    <img  src="https://d1ty73zrqoktft.cloudfront.net/360-Image-Classifier-Tool/assets/icons/panoFrame.png"/>
      <img width=10px>
  <span>  ...and more!</span>
      <div><br />
      </div>
</div>

#  Notes on "CUBEMAP FOLDER"
 -**The folder must contain exactly 6 images (cube faces)**  <br /> 
 -**images must be named "px, nx, py, ny, pz, nz" or "posx, negx, posy, negy, posz, negz"** 
 <br /> 

<br />

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/AryehMischel/360-Image-Classifier-Tool.git
   ```
2. Navigate to the project directory:
   ```bash
   cd 360-Image-Classifier-Tool
   ```
3. Install the dependencies:
 ```npm install
 ```
4. Start the server:
 ```npm start
 ```
 in your preferred web browser and navigate to http://localhost:3000

## Usage
1. Open the website in your web browser.
2. Drag and drop a 360-degree image into the designated dropzone area.
3. The tool will automatically detect the format of the image.
4. The processed image along with its detected format will be displayed.

## Project Structure
- **index.html**: Main HTML file containing the structure of the web page.
- **styles**: Directory containing CSS files for styling the web page.
- **scripts**: Directory containing JavaScript files for handling image uploads, format detection, and image processing.
- **assets**: Directory containing icons and other assets used in the project.
- **server.js**:  Node.js server file to serve the application.


## Dependencies
- [Dropzone.js](https://www.dropzone.dev/): Used for drag and drop file uploads.
- [A-Frame](https://aframe.io/): Used for rendering 360-degree images.
- [Express](https://expressjs.com/): Used for serving the web application.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgements
- All Icons were created by me, except for the google drive icon and the noFormatDetected Icon were sourced from a free icon library.

## Contact
For any questions or inquiries, please contact [aryehmischel@gmail.com](mailto:aryehmischel@gmail.com).
