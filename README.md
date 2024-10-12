# 360 Image Classifier + Viewer

## Overview
This is a web-based tool designed to detect the format of 360 images, process them, and display them along with their detected formats. The tool supports various 360 image formats and provides a user-friendly interface for uploading and viewing images.
**[Live Demo](https://universal-360-image-classifier.onrender.com/)**
## Features
- **Format Detection**: Automatically detects the format of uploaded 360-degree images.
- **Image Processing**: Processes the images to ensure they are displayed correctly.
- **Image Display**: Displays the processed images along with their detected formats.
- **Drag and Drop Interface**: Easy-to-use drag and drop interface for uploading images.
- **Support for Multiple Formats**: Supports various 360 image formats including CubeMap, Equirectangular, and more.
- **Limited VR Support**: This does technically support VR, but it was not put together with VR in mind. The broader project that this code was frankensteined from is much better suited for VR and it should be finished by early 2025.

## Supported Formats
  <div width="100%">
   • CubeMap's
    <img align="center" src="https://d1ty73zrqoktft.cloudfront.net/360-Image-Classifier-Tool/assets/icons/cubemapIconColored.png"  height="50px"/>
     <img width="220vw"/>
   • Stripe CubeMap's
    <img align="center" src="https://d1ty73zrqoktft.cloudfront.net/360-Image-Classifier-Tool/assets/icons/stripeCubeMap.png" alt="Item 2" height="25px"/>
    </span>
  </div>
   <br /><br /><br />
<div width="100%">
    <span style="margin-right: 10px;">• Stereoscopic CubeMap's</span>
    <img align="center" src="https://d1ty73zrqoktft.cloudfront.net/360-Image-Classifier-Tool/assets/icons/stereoCubeMapColored.png" alt="Item 3" height="25"/>
    <img width="50vw"/>
  </div>
  <br /><br /><br />
  <div style="display: flex; align-items: center; margin: 10px;">
     <span>• Equirectangular(Eqrt) / 360 image's</span>
     <img src="https://d1ty73zrqoktft.cloudfront.net/360-Image-Classifier-Tool/assets/icons/eqrtLogoColored.png" alt="Item 4" height="25"/>
     <img width="50vw"/>
     <span>• Stereoscopic Equirectangular (StereoEqrt)</span>
     <img src="https://d1ty73zrqoktft.cloudfront.net/360-Image-Classifier-Tool/assets/icons/stereoEqrtLogoColored.png" alt="Item 5" height="25"/>
  </div>
  <br /><br /><br />
  
  <div width="100%" >
     <span>• VerticalCross CubeMap's</span>
     <img src="https://d1ty73zrqoktft.cloudfront.net/360-Image-Classifier-Tool/assets/icons/verticalCubeMap.png" alt="Item 5" height="50"/>
     <img width="160vw"/>
    <span>• Horizontal T CubeMap's </span>
    <img src="https://d1ty73zrqoktft.cloudfront.net/360-Image-Classifier-Tool/assets/icons/capitalTCubeMap.png" alt="Item 5" height="50"/>
    </div><br />
  <br /><br />
 
  
  <div style="display: flex; align-items: center; margin: 10px;">
    <span style="margin-right: 10px;">• CubeMapFolder </span>
    <img src="https://d1ty73zrqoktft.cloudfront.net/360-Image-Classifier-Tool/assets/icons/folderIcon.png" alt="Item 5" width="50"/>
  </div>
^ A directory containing a cubemap as 6 seperate images (cube faces).
<br />
->Images must be named as follows "px, nx, py, ny, pz, nz" or "posx, negx, posy, negy, posz, negz"
  
  

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/AryehMischel/360-Image-Classifier-Tool.git
   ```
2. Navigate to the project directory:
   ```bash
   cd 360-Image-Classifier-Tool
   ```
3. Open 

index.html

 in your preferred web browser.

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

## Dependencies
- [Dropzone.js](https://www.dropzone.dev/): Used for drag and drop file uploads.
- [A-Frame](https://aframe.io/): Used for rendering 360-degree images.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgements
- All Icons were created by me, except for the google drive icon and the noFormatDetected Icon were sourced from a free icon library.

## Contact
For any questions or inquiries, please contact [aryehmischel@gmail.com](mailto:aryehmischel@gmail.com).
