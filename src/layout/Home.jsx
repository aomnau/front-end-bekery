import React from 'react'
import Bekery from '../components/card'


export default function Home() {
  return (
    <>
      <div style={{ backgroundColor: 'rgb(36,92,116)', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div>
        <Bekery />
        </div>
      </div>
    </>
  )
}