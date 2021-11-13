import { useState, useCallback } from "react";
import { CustomModal, Button } from "../../common";
import ReactCrop from "react-image-crop";
import "./ImageUploaderModal.css";
import "react-image-crop/dist/ReactCrop.css";

// see demo for further context
// https://codesandbox.io/s/react-image-crop-demo-with-react-hooks-y831o

export const maybeRenderImage = (
  finalCrop,
  imgRef,
  previewCanvasRef,
  setForm
) => {
  if (!finalCrop || !previewCanvasRef.current || !imgRef.current) {
    return;
  }

  const image = imgRef.current;
  const canvas = previewCanvasRef.current;

  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  const ctx = canvas.getContext("2d");
  const pixelRatio = window.devicePixelRatio;

  canvas.width = finalCrop.width * pixelRatio * scaleX;
  canvas.height = finalCrop.height * pixelRatio * scaleY;

  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  ctx.imageSmoothingQuality = "high";

  ctx.drawImage(
    image,
    finalCrop.x * scaleX,
    finalCrop.y * scaleY,
    finalCrop.width * scaleX,
    finalCrop.height * scaleY,
    0,
    0,
    finalCrop.width * scaleX,
    finalCrop.height * scaleY
  );

  // TODO: doesn't always convert to blob fast enough
  canvas.toBlob((blob) => {
    setForm((prevState) => ({
      ...prevState,
      image: blob,
    }));
  });
};

export const ImageUploaderModal = ({
  setFinalCrop,
  showModal,
  onCloseModal,
  imgRef,
}) => {
  const [crop, setCrop] = useState({ unit: "%", width: 100, aspect: 12 / 9 });
  const [upImg, setUpImg] = useState();

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setUpImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  return (
    <CustomModal showModal={showModal} onCloseModal={onCloseModal}>
      <h1>Select a photo</h1>
      <div className="ImageUploaderModal__btnContainer">
        <input type="file" accept="image/*" onChange={onSelectFile} />
        <Button
          btnText="Save Image"
          onClick={() => {
            setFinalCrop(crop);
            onCloseModal();
          }}
          disabled={imgRef.current === null}
        />
      </div>
      <ReactCrop
        src={upImg}
        onImageLoaded={onLoad}
        crop={crop}
        onChange={(c) => setCrop(c)}
      />
    </CustomModal>
  );
};
