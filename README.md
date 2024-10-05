# 360 Image Classifier + Viewer

## Overview
This project is a web-based tool designed to detect the format of 360-degree images, process them, and display the images along with their detected formats. The tool supports various 360 image formats and provides a user-friendly interface for uploading and viewing images.

## Features
- **Format Detection**: Automatically detects the format of uploaded 360-degree images.
- **Image Processing**: Processes the images to ensure they are displayed correctly.
- **Image Display**: Displays the processed images along with their detected formats.
- **Drag and Drop Interface**: Easy-to-use drag and drop interface for uploading images.
- **Support for Multiple Formats**: Supports various 360 image formats including CubeMap, Equirectangular, and more.
- **Limited VR Support**: This does technically support VR, but it was not put together with VR in mind. The broader project that this code was frankensteined from is much better suited for VR and it should be finished by early 2025.

## Supported Formats
- CubeMap
- StripCubeMap
- StereoCubeMap
- Equirectangular (Eqrt)
- StereoEquirectangular (StereoEqrt)
- HorizontalCross
- HorizontalT
- CubeMapFolder (6 seperate images representing sides of a cubemap in the same directory)

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/360-image-format-detector.git
   ```
2. Navigate to the project directory:
   ```bash
   cd 360-image-format-detector
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
- Icons used in this project are sourced from various free icon libraries.

## Contact
For any questions or inquiries, please contact [aryehmischel@gmail.com](mailto:aryehmischel@gmail.com).
