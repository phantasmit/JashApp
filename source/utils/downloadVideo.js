import RNFS from "react-native-fs";
import axios from "axios";
import { Buffer } from "buffer";

export const downloadFile = async (url, fileName) => {
    try {
        if (!url) {
            throw new Error("Missing download url");
        }

        const safeName = fileName && fileName.trim().length > 0
            ? fileName
            : (url.split("?")[0].split("/").pop() || `file_${Date.now()}`);

        const path = `${RNFS.CachesDirectoryPath}/${Date.now()}_${safeName}`;

        console.log("Downloading from URL:", url);
        console.log("Saving to path:", path);

        // Use axios to download with automatic cookie handling
        const response = await axios({
            url: url,
            method: 'GET',
            responseType: 'arraybuffer', // Important for binary files
            timeout: 60000,
        });

        if (response.status === 200 || response.status === 201) {
            // Convert ArrayBuffer to base64 for RNFS
            const base64Data = Buffer.from(response.data).toString('base64');
            // Write the file to disk
            await RNFS.writeFile(path, base64Data, 'base64');
            return path;
        }

        throw new Error(`Download failed with status ${response.status}`);
    } catch (error) {
        const message = error?.message || error?.toString?.() || "Unknown error";
        const status = error?.response?.status || 'N/A';
        console.log("Download error:", message, `Status: ${status}`);
        return null;
    }
};
