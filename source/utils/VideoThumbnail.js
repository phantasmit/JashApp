import React, { useEffect, useState } from "react";
import { Image, TouchableOpacity } from "react-native";
import { createThumbnail } from "react-native-create-thumbnail";

const VideoThumbnail = ({ videoUrl }) => {
  const [thumbnail, setThumbnail] = useState(null);

  useEffect(() => {
    createThumbnail({
      url: videoUrl, // MP4 URL
      timeStamp: 1000, // 1 second frame
    })
      .then((res) => setThumbnail(res.path))
      .catch((err) => console.log({ err }));
  }, [videoUrl]);

  return (
    <TouchableOpacity>
      {thumbnail && (
        <Image
          source={{ uri: thumbnail }}
          style={{ width: 200, height: 150, borderRadius: 10 }}
        />
      )}
    </TouchableOpacity>
  );
};

export default VideoThumbnail;
