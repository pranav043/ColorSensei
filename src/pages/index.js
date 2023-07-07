import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import DisplayImage from '@/Components/DisplayImage'
import ColorThief from 'colorthief'
import { useState, useRef } from 'react'

const gallery = <i className='fas fa-images'></i>

export default function Home() {
  const [uploadedImage, setUploadedImage] = useState(null)
  const [colorPalette, setColorPalette] = useState(null)
  const headerRef = useRef(null)

  const uploadImage = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()

    reader.onload = async (event) => {
      const img = new Image()

      img.onload = () => {
        const colorThief = new ColorThief()
        const colorPalette = colorThief.getPalette(img, 6)
        setUploadedImage(event.target.result)
        setColorPalette(colorPalette)
      }
      img.src = event.target.result
    }

    reader.readAsDataURL(file)
  }

  const handleHeaderClick = () => {
    if (uploadedImage !== null || colorPalette !== null) {
      setUploadedImage(null)
      setColorPalette(null)
    }
  }

  return (
    <>
      <Head>
        <title>ColorSensei</title>
        <meta
          name='description'
          content='Find all color combination that suits your image!'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.svg' />
      </Head>

      <header>
        <h1 ref={headerRef} onClick={handleHeaderClick}>
          <img className='logoImage' src={'/logo.png'} alt='logo' />
          ColorSensei
        </h1>

        <div className='input'>
          <label htmlFor='file'>{gallery} Upload New Image</label>
          <input
            type='file'
            id='file'
            hidden
            onChange={uploadImage}
            accept='image/*'
          />
        </div>
      </header>

      <main className={styles.main}>
        <DisplayImage
          uploadedImage={uploadedImage}
          colorPalette={colorPalette}
        />
      </main>
    </>
  )
}
