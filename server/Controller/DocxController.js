
import fs from 'fs/promises'

import util from 'util'
import sharp from 'sharp'


import AdmZip from 'adm-zip';
import path from 'path';
import mime from 'mime';

// async function extractImageNamesFromZip(zipFilePath) {
//     const zip = new AdmZip(zipFilePath);
//     const zipEntries = zip.getEntries();
  
//     const imageFiles = zipEntries.filter((entry) => entry.entryName.match(/\.(jpg|jpeg|png|gif)$/i));
  
//     const imageNames = imageFiles.map((entry) => entry.entryName);
  
//     return imageNames;
//   }
  
// export const listImagesInZip=async(req, res)=> {
//     try {
//         if (!req.file) {
//           return res.status(400).json({ error: 'No ZIP file uploaded.' });
//         }
    
//         const zipFilePath = req.file.path;
    
//         // Extract image names from the ZIP file
//         const imageNames = await extractImageNamesFromZip(zipFilePath);
    
//         // Clean up the temporary file (async version)
//         await fs.unlink(zipFilePath);
    
//         // Return the list of image names as a response
//         res.json({ images: imageNames });
//       } catch (error) {
//         res.status(500).json({ error: error.message });
//       }
//     }



// async function extractImageContentsFromZip(zipFilePath) {
//   const zip = new AdmZip(zipFilePath);
//   const zipEntries = zip.getEntries();

//   const imageFiles = zipEntries.filter((entry) => entry.entryName.match(/\.(jpg|jpeg|png|gif)$/i));

//   const imageContents = await Promise.all(
//     imageFiles.map(async (entry) => {
//       const imageBuffer = entry.getData();
//       const imageBase64 = imageBuffer.toString('base64');
//       const mimeType = mime.getType(entry.entryName);
//       return { name: entry.entryName, data: `data:${mimeType};base64,${imageBase64}` };
//     })
//   );

//   return imageContents;
// }

// export const listImagesInZip=async(req, res)=> {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ error: 'No ZIP file uploaded.' });
//     }

//     const zipFilePath = req.file.path;

//     // Extract image contents from the ZIP file
//     const imageContents = await extractImageContentsFromZip(zipFilePath);

//     // Clean up the temporary file (async version)
//     await fs.unlink(zipFilePath);

//     // Return the list of image contents as a response
//     res.json({ images: imageContents });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }



// async function extractImageContentsFromZip(zipFilePath) {
//   const zip = new AdmZip(zipFilePath);
//   const zipEntries = zip.getEntries();

//   const imageFiles = zipEntries.filter((entry) => entry.entryName.match(/\.(jpg|jpeg|png|gif)$/i));

//   const imageContents = [];

//   for (const entry of imageFiles) {
//     try {
//       const imageBuffer = entry.getData();
//       const imageBase64 = imageBuffer.toString('base64');
//       const mimeType = mime.getType(entry.entryName);
//       imageContents.push({ name: entry.entryName, data: `data:${mimeType};base64,${imageBase64}` });
//     } catch (error) {
//       console.error(`Error processing image '${entry.entryName}': ${error.message}`);
//     }
//   }

//   return imageContents;
// }


// export const listImagesInZip=async(req, res)=> {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ error: 'No ZIP file uploaded.' });
//     }

//     const zipFilePath = req.file.path;

//     // Extract image contents from the ZIP file
//     const imageContents = await extractImageContentsFromZip(zipFilePath);

//     // Clean up the temporary file (async version)
//     await fs.unlink(zipFilePath);

//     // Return the list of image contents as a response
//     res.json({ images: imageContents });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }



//save 1
// const UPLOADS_DIR = './uploads';

// async function extractAndSaveImagesFromZip(zipFilePath) {
//   const zip = new AdmZip(zipFilePath);
//   const zipEntries = zip.getEntries();

//   const imageFiles = zipEntries.filter((entry) => entry.entryName.match(/\.(jpg|jpeg|png|gif)$/i));

//   const savedImagePaths = [];

//   for (const entry of imageFiles) {
//     try {
//       const imageBuffer = entry.getData();
//       const imageName = path.basename(entry.entryName);
//       const imagePath = path.join(UPLOADS_DIR, imageName);
      
//       await fs.writeFile(imagePath, imageBuffer);
//       savedImagePaths.push(imagePath);

//       console.log(`Saved image '${entry.entryName}' to '${imagePath}'`);
//     } catch (error) {
//       console.error(`Error saving image '${entry.entryName}': ${error.message}`);
//     }
//   }

//   return savedImagePaths;
// }

// export const listImagesInZip=async(req, res)=> {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ error: 'No ZIP file uploaded.' });
//     }

//     const zipFilePath = req.file.path;

//     // Extract and save images from the ZIP file
//     const savedImagePaths = await extractAndSaveImagesFromZip(zipFilePath);

//     // Clean up the temporary file (async version)
//     await fs.unlink(zipFilePath);

//     // Return the list of saved image paths as a response
//     res.json({ images: savedImagePaths });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }





const UPLOADS_DIR = './uploads';

async function extractAndSaveImagesFromZip(zipFilePath) {
  const zip = new AdmZip(zipFilePath);
  const zipEntries = zip.getEntries();

  const imageFiles = zipEntries.filter((entry) => entry.entryName.match(/\.(jpg|jpeg|png|gif)$/i));

  console.log(`Found ${imageFiles.length} image files in the ZIP`);

  const savedImagePaths = [];

  await Promise.all(
    imageFiles.map(async (entry) => {
      try {
        const imageBuffer = entry.getData();
        const imageName = path.basename(entry.entryName);
        const imagePath = path.join(UPLOADS_DIR, imageName);

        await fs.writeFile(imagePath, imageBuffer);
        savedImagePaths.push(imagePath);

        console.log(`Saved image '${entry.entryName}' to '${imagePath}'`);
      } catch (error) {
        console.error(`Error saving image '${entry.entryName}': ${error.message}`);
      }
    })
  );

  return savedImagePaths;
}

export const listImagesInZip=async(req, res)=> {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No ZIP file uploaded.' });
    }

    const zipFilePath = req.file.path;

    // Extract and save images from the ZIP file
    const savedImagePaths = await extractAndSaveImagesFromZip(zipFilePath);

    // Clean up the temporary file (async version)
    await fs.unlink(zipFilePath);

    // Return the list of saved image paths as a response
    res.json({ images: savedImagePaths });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


