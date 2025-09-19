'use client'
import clsx from 'clsx'
import { useState } from 'react'
import Image, { ImageProps } from 'next/image'
import { Skeleton, SxProps, styled } from '@mui/material'

interface Props {
  sx?: SxProps
  imageProps: ImageProps & { sx?: SxProps }
  className?: string
}

export function ImageWithSkeleton({ sx, className, imageProps }: Props) {
  const [loaded, setLoaded] = useState(false)
  return (
    <Container
      sx={sx}
      className={clsx('relative w-fit overflow-hidden', className)}
    >
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <Image
        {...imageProps}
        className={`${!loaded ? 'opacity-0' : 'opacity-100'} ${imageProps.className}`}
        onLoad={(...data) => {
          setLoaded(true)
          imageProps.onLoad?.(...data)
        }}
      />
      {!loaded && (
        <Skeleton
          sx={{ bgcolor: 'grey.100' }}
          variant="rectangular"
          className="[&&]:absolute [&&]:left-0 [&&]:top-0 [&&]:h-full [&&]:w-full"
          animation="wave"
        />
      )}
    </Container>
  )
}

const Container = styled('div')``
