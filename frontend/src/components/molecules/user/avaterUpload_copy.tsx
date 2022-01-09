import { Button } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles, styled, Theme } from '@material-ui/core/styles'
import CancelIcon from '@material-ui/icons/Cancel'
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera'
import * as React from 'react'
import { Crop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { createAvater } from '../../../apis/user'

const { useEffect, useRef, useCallback, useState } = React

const useStyles = makeStyles((theme: Theme) => ({
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    width: 320,
  },
  inputFileBtn: {
    marginTop: '10px',
  },
  submitBtn: {
    marginTop: '10px',
    marginLeft: 'auto',
  },
  box: {
    margin: '2rem 0 4rem',
    width: 320,
  },
  preview: {
    width: '100%',
  },
}))

const Input = styled('input')({
  display: 'none',
})

const borderStyles = {
  bgcolor: 'background.paper',
  border: 1,
}

export const AvaterUpload = () => {
  const classes = useStyles()
  const [image, setImage] = useState<File>()
  const [preview, setPreview] = useState<string>('')

  const [crop, setCrop] = useState<Crop>({
    unit: 'px',
    x: 0,
    y: 0,
    width: 200,
    height: 200,
    aspect: 1,
  })
  const [imageRef, setImageRef] = useState<HTMLImageElement | null>(null)

  const createFormData = (): FormData => {
    const formData = new FormData()
    if (image) formData.append('image', image)
    console.log(formData)
    return formData
  }

  const uploadImage = useCallback((e) => {
    const file = e.target.files[0]
    setImage(file)
  }, [])

  const previewImage = useCallback((e) => {
    const file = e.target.files[0]
    setPreview(window.URL.createObjectURL(file))
  }, [])

  const handleCreatePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const data = createFormData()

    await createAvater(data).then(() => {
      setPreview('')
      setImage(undefined)
    })
  }

  return (
    <>
      <form className={classes.form} noValidate onSubmit={handleCreatePost}>
        <div className={classes.inputFileBtn}>
          <label htmlFor="icon-button-file">
            <Input
              accept="image/*"
              id="icon-button-file"
              type="file"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                uploadImage(e)
                previewImage(e)
              }}
            />
            <IconButton color="inherit" component="span">
              <PhotoCameraIcon />
            </IconButton>
          </label>
        </div>
        <div className={classes.submitBtn}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            color="inherit"
            className={classes.submitBtn}
          >
            Post
          </Button>
        </div>
      </form>
      {preview ? (
        <Box className={classes.box}>
          <IconButton color="inherit" onClick={() => setPreview('')}>
            <CancelIcon />
          </IconButton>
          <img src={preview} alt="preview img" className={classes.preview} />
        </Box>
      ) : null}
    </>
  )
}
