const axios = require('axios');

describe('Fake Store API Tests', () => {
  let products;

  beforeAll(async () => {
    const response = await axios.get('https://fakestoreapi.com/products');
    products = response.data;
  });

  test('Server should return 200 status code', async () => {
    const response = await axios.get('https://fakestoreapi.com/products');
    expect(response.status).toBe(200);
  });

  test('All products should have required attributes', () => {
    const productsWithDefects = [];

    products.forEach((product, index) => {
      const defects = [];

      // Check if title is empty
      if (!product.title || product.title.trim() === '') {
        defects.push('Empty title');
      }

      // Check if price is negative
      if (product.price < 0) {
        defects.push('Negative price');
      }

      // Check if rating.rate exceeds 5
      if (product.rating && product.rating.rate > 5) {
        defects.push('Rating exceeds 5');
      }

      if (defects.length > 0) {
        productsWithDefects.push({
          id: product.id,
          defects
        });
      }
    });

    // Log products with defects
    if (productsWithDefects.length > 0) {
      console.log('\nProducts with defects:');
      productsWithDefects.forEach(product => {
        console.log(`Product ID: ${product.id}`);
        console.log('Defects:', product.defects.join(', '));
        console.log('---');
      });
    }

    expect(productsWithDefects.length).toBe(0);
  });
}); 