import { Button, Divider } from '@material-ui/core'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Box, Typography } from '@mui/material'
import * as React from 'react'
import Cropper, { Crop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { Link } from 'react-router-dom'
import { createAvater } from '../../../apis/user'
import { useStyles } from '../../../utils/style'

const { useState } = React

export const AvaterUpload = () => {
  const classes = useStyles()
  const [src, setSrc] = useState<FileReader['result']>(null)
  const [image, setImage] = useState<File | null>(null)
  const [crop, setCrop] = useState<Crop>({
    unit: 'px',
    x: 0,
    y: 0,
    width: 200,
    height: 200,
    aspect: 1,
  })
  const [imageRef, setImageRef] = useState<HTMLImageElement | null>(null)

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader()
      reader.addEventListener('load', () => {
        setSrc(reader.result)
      })
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const onImageLoaded = (image: HTMLImageElement) => {
    setImageRef(image)
  }

  const onCropChange = (crop: Crop) => {
    setCrop(crop)
  }

  const onCropComplete = (crop: Crop) => {
    if (imageRef && crop.width && crop.height) {
      const canvas = document.createElement('canvas')
      const scaleX = imageRef.naturalWidth / imageRef.width
      const scaleY = imageRef.naturalHeight / imageRef.height
      canvas.width = crop.width
      canvas.height = crop.height
      const ctx = canvas.getContext('2d')
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
          crop.height,
        )
      }
      const contentType = imageRef.src.split(';')[0].split(':')[1]
      const trimmedSrc = canvas.toDataURL(contentType)
      const uploadImage = dataURIConverter(trimmedSrc)
      setImage(uploadImage)
    }
  }

  const createFormData = (): FormData => {
    const formData = new FormData()
    if (src && image) formData.append('image', image)
    return formData
  }

  const handleCreatePost = async () => {
    const data = createFormData()

    await createAvater(data).then(() => {
      setSrc(null)
    })
  }

  const dataURIConverter = (dataURI: string) => {
    const byteString = atob(dataURI.split(',')[1])
    const mimeType = dataURI.split(',')[0].split(':')[1].split(';')[0]
    const buffer = new Uint8Array(byteString.length)
    for (let i = 0; i < byteString.length; i++) {
      buffer[i] = byteString.charCodeAt(i)
    }
    return new File([buffer], 'avater.jpg', { type: mimeType })
  }

  return (
    <>
      <Box
        sx={{
          marginBottom: 2,
          width: '100%',
          maxWidth: 360,
          bgcolor: 'background.paper',
        }}
      >
        <Typography variant="h5" component="div">
          <Link to="/user_setting" className={classes.itemLinkIcon}>
            <ArrowBackIcon />
          </Link>
          <span className={classes.pageTitleText}>
            アバター画像アップロード
          </span>
        </Typography>
      </Box>
      <Divider />
      <Typography variant="subtitle1" display="block" gutterBottom></Typography>
      <form onSubmit={handleCreatePost}>
        <div className={classes.avaterContents}>
          <input
            type="file"
            accept="image/*"
            onChange={onSelectFile}
            className={classes.avaterInput}
          />
          {src && (
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.avaterInput}
            >
              アップロード
            </Button>
          )}
        </div>
        {typeof src == 'string' && (
          <Cropper
            src={src}
            crop={crop}
            circularCrop
            onImageLoaded={onImageLoaded}
            onComplete={onCropComplete}
            onChange={onCropChange}
            className={classes.avaterContents}
          />
        )}
      </form>
    </>
  )
}
