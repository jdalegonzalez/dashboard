import React from 'react';
import { Metadata } from 'next';
import ProductListClient from './client';

export const metadata: Metadata = {
	title: 'Teramis | Agent List',
};

const ProductListPage = () => {
	return <ProductListClient />;
};

export default ProductListPage;
