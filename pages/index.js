import React from 'react';
import axios from 'axios';

import ProductList from '../components/Index/ProductList';
import baseURL from '../utils/baseUrl';

function Home({products}) {
  console.log(products);
  return <ProductList products={products} />;
}

Home.getInitialProps = async () => {
  // fetch data on the server
  const url = `${baseURL}/api/products`;
  const response = await axios.get(url);
  // return that response as an object
  return { products: response.data };
  // note: this object will be merged with existing props
}

export default Home;
