import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Main = (props) => {
  return (
    <>
      {props.title && <title>{props.title}</title>}
      <meta name="description" content={props.description} />
      <Header />
      <main id="main" role="main">
        {props.children}
      </main>
      <Footer />
    </>
  );
};

export default Main;
