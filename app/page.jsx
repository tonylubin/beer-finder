import Link from 'next/link';
import React from 'react';

const Home = async () => {

  return (
    <>
      <h1>Welcome to my Homepage</h1>
      <Link href="/beers">Enter</Link>
    </>

  )
}

export default Home;