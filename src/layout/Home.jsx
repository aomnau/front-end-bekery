import React, { useState } from 'react'
import Header from './Header';
import Bekery from '../components/card'


export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
    <Header searchTerm={searchTerm} handleSearchChange={handleSearchChange}/>
        <div>
        <Bekery searchTerm={searchTerm}/>
        </div>
      
    </>
  )
}