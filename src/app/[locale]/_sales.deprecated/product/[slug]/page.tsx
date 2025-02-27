import React from 'react';
import ProductPageClient from '@/app/[locale]/_sales.deprecated/product/[slug]/client';

const ProductPage = async (props: { params: Promise<{ slug: string }> }) => {
    const params = await props.params;
    return <ProductPageClient params={params} />;
};

export default ProductPage;
