import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Search from './Search';

const Main = (props) => {
  return (
    <>
      {props.title && <title>{props.title}</title>}
      <meta name="description" content={props.description} />
      <Header />
      <main id="main" role="main">
        <Search />
        {props.children}
      </main>
      <Footer />
    </>
  );
};

export default Main;
