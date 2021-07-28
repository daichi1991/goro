import * as React from 'react';
import Cropper, {Crop} from 'react-image-crop';
import "react-image-crop/dist/ReactCrop.css";
import { createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { uploadImage } from '../../../apis/user';


const {useState, useEffect, useRef} = React;

export const AvaterUpload = () =>{
    const [src, setSrc] = useState<any>(null)
    const [crop, setCrop] = useState<Crop>({
        unit: "px",
        x: 0,
        y: 0,
        width: 200,
        height: 200,
        aspect: 1
    });
    const [imageRef, setImageRef] = useState<HTMLImageElement | null>(null);

    const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if( e.target.files && e.target.files.length > 0){
            const reader = new FileReader();
            reader.addEventListener('load', () =>{
                console.log(reader.result);
                setSrc(reader.result);
            });
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const onImageLoaded = (image: HTMLImageElement) => {
        setImageRef(image);
    };

    const onCropChange = (crop: Crop) => {
        setCrop(crop);
    };

    
    const onCropComplete = (crop: any) => {
        if(imageRef && crop.width && crop.height){
            const canvas = document.createElement("canvas")
            const scaleX = imageRef.naturalWidth / imageRef.width;
            const scaleY = imageRef.naturalHeight / imageRef.height;
            canvas.width = crop.width
            canvas.height = crop.height
            const ctx = canvas.getContext("2d")
            if (ctx !== null) {
                ctx.drawImage(
                    imageRef,
                    crop.x * scaleX,
                    crop.y * scaleY,
                    crop.width * scaleX,
                    crop.height * scaleY,
                    0,
                    0,
                    crop.width,
                    crop.height
                )
            }
        }
    };


    const createFormData = (): FormData => {
        const formData = new FormData()
        if (src) formData.append("image", src)
        console.log(src)
        return formData
    }

    const handleCreatePost =() => {    
        const data = createFormData()
        uploadImage(data)
        .then(() => {
            setSrc(undefined)
        })
    }
    
    return (
        <>
            <input type='file' accept="image/*" onChange={onSelectFile}/>
            { src && ( 
            <Cropper
                src={src}
                crop={crop}
                circularCrop
                onImageLoaded={onImageLoaded}
                onComplete={onCropComplete}
                onChange={onCropChange}
            />
            )}
            <Button onClick={handleCreatePost}>アップロード</Button>
        </>
    );
}


