"use client"

import { CldUploadWidget } from "next-cloudinary"
import Image from "next/image"
import { useCallback } from "react"
import { IoImagesOutline } from "react-icons/io5"

declare global {
  var cloudinary: any
}

interface UploadImageProps {
  value: string
  onChange: (value: string) => void
}

const UploadImage: React.FC<UploadImageProps> = ({ value, onChange }) => {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url)
    },
    [onChange]
  )
  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset="emgilg2p"
      options={{
        maxFiles: 1,
      }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className="flex flex-col items-center justify-center gap-2 h-96 border border-light-gray border-dashed relative"
          >
            <IoImagesOutline size={30} />
            <h2 className="text-lg font-semibold">Add your photos here</h2>

            {value && (
              <div className="absolute inset-0 w-full h-full">
                <Image
                  alt="upload"
                  fill
                  style={{ objectFit: "cover" }}
                  src={value}
                />
              </div>
            )}
          </div>
        )
      }}
    </CldUploadWidget>
  )
}

export default UploadImage
