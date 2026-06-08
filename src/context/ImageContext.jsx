import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

import { API_BASE_URL } from "../config";

const ImageContext = createContext(null);

export const useImages = () => {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error("useImages must be used within an ImageProvider");
  }
  return context;
};

export const ImageProvider = ({ children }) => {
  const [imageMap, setImageMap] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchImages = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/images.php`);
      const list = response.data || [];
      const map = {};
      list.forEach((img) => {
        if (img.location) {
          map[img.location] = img.url;
        }
      });
      setImageMap(map);
    } catch (error) {
      console.error("Failed to load image configurations:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const getImageUrl = (location, fallback) => {
    return imageMap[location] || fallback;
  };

  return (
    <ImageContext.Provider value={{ getImageUrl, refreshImages: fetchImages, imageMap, loading }}>
      {children}
    </ImageContext.Provider>
  );
};
