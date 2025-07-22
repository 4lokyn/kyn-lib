import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import {Product} from '../models/product';

/**
 * A mock service that simulates fetching product data from a server.
 *
 * It is provided in the root injector, making it available application-wide.
 * This service is intended for development and testing purposes, providing a
 * consistent set of data and simulating network latency.
 */
@Injectable({
  providedIn: 'root',
})
export class MockProduct {

  /**
   * A private, hardcoded list of products to be used as mock data.
   * In a real application, this data would come from a backend API.
   */
  private mockProducts: Product[] = [
    {
      id: 1,
      name: 'Wireless Keyboard K850',
      description: 'Ergonomic wireless keyboard with backlighting and quiet keys.',
      price: 79.99,
      category: 'Peripherals',
      imageUrl: 'https://picsum.photos/id/8/400/300',
      stock: 45,
      rating: 4.8,
    },
    {
      id: 2,
      name: '4K Ultra HD Monitor 27"',
      description: 'A 27-inch monitor with an IPS panel and 3840x2160 resolution.',
      price: 345.00,
      category: 'Monitors',
      imageUrl: 'https://picsum.photos/id/12/400/300',
      stock: 22,
      rating: 4.6,
    },
    {
      id: 3,
      name: 'Gaming Mouse G502',
      description: 'A high-precision gaming mouse with adjustable weight and 11 programmable buttons.',
      price: 54.90,
      category: 'Peripherals',
      imageUrl: 'https://picsum.photos/id/40/400/300',
      stock: 110,
      rating: 4.9,
    },
    {
      id: 4,
      name: 'SSD Drive 1TB NVMe',
      description: 'A fast 1TB M.2 NVMe SSD drive, ideal for operating systems and games.',
      price: 128.50,
      category: 'Components',
      imageUrl: 'https://picsum.photos/id/180/400/300',
      stock: 78,
      rating: 4.7,
    }
  ];

  /**
   * Fetches the complete list of mock products.
   * Simulates a network delay of 500ms to mimic a real API call.
   *
   * @returns An Observable that emits an array of all products.
   */
  getProducts(): Observable<Product[]> {
    console.log('MockProductService: Fetching all products...');
    return of(this.mockProducts).pipe(
      delay(500) // Simulate network latency
    );
  }

  /**
   * Finds and returns a single product by its unique ID.
   * Simulates a network delay of 300ms.
   *
   * @param id The numerical ID of the product to fetch.
   * @returns An Observable that emits the found Product, or `undefined` if no product with the given ID exists.
   */
  getProductById(id: number): Observable<Product | undefined> {
    console.log(`MockProductService: Fetching product with id: ${id}...`);
    const product = this.mockProducts.find(p => p.id === id);
    return of(product).pipe(
      delay(300) // Simulate network latency
    );
  }
}
