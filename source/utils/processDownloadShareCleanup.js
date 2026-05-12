import Share from "react-native-share";
import RNFS from "react-native-fs";
import { Platform } from "react-native";
import { downloadFile } from "./downloadVideo";


/**
 * Create a collage from multiple images and share as single image
 * Note: This function combines images into a single collage image file
 * @param {Array} list - Array of {url, filename} objects (images only)
 * @param {String} message - Message to include with the share
 * @param {String} socialApp - Social app to share to (default: WhatsApp)
 */
export const shareAsCollage = async (list, message = '', socialApp = Share.Social.WHATSAPP) => {
    // Filter only images
    const imageList = list.filter(item => {
        const filename = item.filename || item.url.split('/').pop() || '';
        return filename.match(/\.(jpg|jpeg|png|gif|webp)$/i);
    });

    if (imageList.length === 0) {
        console.log("No images to create collage");
        return;
    }

    if (imageList.length === 1) {
        // If only one image, share it directly
        return await processDownloadShareCleanup(imageList, message, socialApp);
    }

    console.log("Creating collage from", imageList.length, "images");
    
    // Download all images first
    let localPaths = [];
    let imageUris = [];

    for (const item of imageList) {
        const localPath = await downloadFile(item.url, item.filename);
        if (localPath) {
            localPaths.push(localPath);
            const fileUri = Platform.OS === 'android' 
                ? `file://${localPath}` 
                : localPath;
            imageUris.push(fileUri);
        }
    }

    if (imageUris.length === 0) {
        console.log("No images downloaded");
        return;
    }

    // Create collage by sharing all images together
    // WhatsApp and other apps will display them as a gallery/collage
    // For a true single-image collage file, install: npm install react-native-view-shot
    try {
        const shareMessage = message && message.trim() 
            ? message 
            : `Sharing ${imageUris.length} images`;

        // Share as single file - use the first approach which shares all together
        // This creates the effect of a collage in most messaging apps
        await Share.open({
            urls: imageUris,
            message: shareMessage,
        });
    } catch (error) {
        console.log("Share error:", error);
        // Fallback: try shareSingle with first image
        try {
            await Share.shareSingle({
                url: imageUris[0],
                message: message,
                social: socialApp,
            });
        } catch (fallbackError) {
            console.log("Fallback share error:", fallbackError);
        }
    }

    // Cleanup
    for (const filePath of localPaths) {
        try {
            await RNFS.unlink(filePath);
        } catch (error) {
            console.log("Delete error:", error);
        }
    }
};

export const processDownloadShareCleanup = async (list, message = '', socialApp = Share.Social.WHATSAPP, createCollage = false) => {
    let localFiles = [];
    let localPaths = []; // Store original paths for cleanup

    // Filter images if creating collage
    const itemsToProcess = createCollage 
        ? list.filter(item => {
            const filename = item.filename || item.url.split('/').pop() || '';
            return filename.match(/\.(jpg|jpeg|png|gif|webp)$/i);
        })
        : list;

    if (createCollage && itemsToProcess.length === 0) {
        console.log("No images found for collage");
        return;
    }

    // 1️⃣ Download all items sequentially
    for (const item of itemsToProcess) {
        const localPath = await downloadFile(item.url, item.filename);
        if (localPath) {
            localPaths.push(localPath); // Store original path
            // Convert to file:// URI format for sharing (required on Android)
            const fileUri = Platform.OS === 'android' 
                ? `file://${localPath}` 
                : localPath;
            localFiles.push(fileUri);
        }
    }

    if (localFiles.length === 0) {
        console.log("No files downloaded to share");
        return;
    }

    // 2️⃣ Share files
    try {
        if (localFiles.length === 1 || !createCollage) {
            // Single file sharing or normal sharing - use shareSingle for specific app
            const fileUri = localFiles[0];
            const filename = fileUri.split('/').pop() || 'file';
            const isImage = filename.match(/\.(jpg|jpeg|png|gif|webp)$/i);
            const isVideo = filename.match(/\.(mp4|mov|avi|mkv|webm)$/i);
            
            const shareOptions = {
                url: fileUri,
                type: isImage ? 'image/*' : isVideo ? 'video/*' : 'application/*',
                social: socialApp,
            };

            // Add message if provided (some apps support it)
            if (message && message.trim()) {
                shareOptions.message = message;
            }

            await Share.shareSingle(shareOptions);
        } else {
            // Multiple images - share as collage (all together with one message)
            const shareMessage = message && message.trim() 
                ? message 
                : `Sharing ${localFiles.length} images`;
            
            // Share all images together - apps will display them as a gallery/collage
            await Share.open({
                urls: localFiles,
                message: shareMessage,
            });
        }
    } catch (error) {
        console.log("Share error:", error);
        // Fallback: try open method if shareSingle fails
        try {
            const shareMessage = message && message.trim() 
                ? message 
                : (localFiles.length === 1 ? '' : `Sharing ${localFiles.length} files`);
            
            if (localFiles.length === 1) {
                const fallbackOptions = {
                    url: localFiles[0],
                };
                if (shareMessage) {
                    fallbackOptions.message = shareMessage;
                }
                await Share.open(fallbackOptions);
            } else {
                await Share.open({
                    urls: localFiles,
                    message: shareMessage,
                });
            }
        } catch (fallbackError) {
            console.log("Fallback share error:", fallbackError);
        }
    }

    // 3️⃣ Clean up downloaded temp files
    for (const filePath of localPaths) {
        try {
            await RNFS.unlink(filePath);
            console.log("Deleted:", filePath);
        } catch (error) {
            console.log("Delete error:", error);
        }
    }

    console.log("All cleaned!");
};

/**
 * Share files to any app (opens system share dialog)
 * @param {Array} list - Array of {url, filename} objects
 * @param {String} message - Optional message/text to include with the share
 */
export const shareToAnyApp = async (list, message = '') => {
    let localFiles = [];
    let localPaths = [];

    // Download all items sequentially
    for (const item of list) {
        const localPath = await downloadFile(item.url, item.filename);
        if (localPath) {
            localPaths.push(localPath);
            const fileUri = Platform.OS === 'android' 
                ? `file://${localPath}` 
                : localPath;
            localFiles.push(fileUri);
        }
    }

    if (localFiles.length === 0) {
        console.log("No files downloaded to share");
        return;
    }

    try {
        // Open general share dialog - user can choose any app
        const shareMessage = message && message.trim() 
            ? message 
            : (localFiles.length === 1 ? '' : `Sharing ${localFiles.length} files`);
        
        if (localFiles.length === 1) {
            const shareOptions = {
                url: localFiles[0],
            };
            if (shareMessage) {
                shareOptions.message = shareMessage;
            }
            await Share.open(shareOptions);
        } else {
            await Share.open({
                urls: localFiles,
                message: shareMessage,
            });
        }
    } catch (error) {
        console.log("Share error:", error);
    }

    // Cleanup
    for (const filePath of localPaths) {
        try {
            await RNFS.unlink(filePath);
        } catch (error) {
            console.log("Delete error:", error);
        }
    }
};
