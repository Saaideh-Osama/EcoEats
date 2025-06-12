import React, { useEffect, useState } from "react";

const SafeImage = ({ src, alt, ...props }) => {
  const [safeUrl, setSafeUrl] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchImage = async () => {
      try {
        const res = await fetch(src, {
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
          signal: controller.signal,
        });

        if (!res.ok) throw new Error("Image fetch failed");

        const blob = await res.blob();
        setSafeUrl(URL.createObjectURL(blob));
      } catch (err) {
        console.error("Image load failed:", err);
      }
    };

    fetchImage();

    return () => controller.abort(); // clean up
  }, [src]);

  if (!safeUrl) return <div style={{ height: "150px", background: "#eee" }} />;

  return <img src={safeUrl} alt={alt} {...props} />;
};

export default SafeImage;
