'use client'

import React from 'react'

type Props = {pdf_url: string}

const PDFViewer = ({pdf_url}: Props) => {
  
  console.log("Raw PDF URL:", pdf_url);
  //console.log("Encoded PDF URL:", encodeURIComponent(pdf_url));
  console.log("Full iframe src:", `https://docs.google.com/gview?url=${encodeURIComponent(pdf_url)}&embedded=true`);
  

  return (
    <iframe 
  src={`https://mozilla.github.io/pdf.js/web/viewer.html?file=${encodeURIComponent(pdf_url)}`}
  className='w-full h-full'
>
</iframe>
)
}

export default PDFViewer