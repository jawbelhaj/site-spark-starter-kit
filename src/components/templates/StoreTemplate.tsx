
import React from 'react';
import { WebsiteConfig } from '../WebsiteBuilder';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface StoreTemplateProps {
  config: WebsiteConfig;
}

const products = [
  {
    name: 'Premium Wireless Headphones',
    price: 299,
    originalPrice: 399,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
    rating: 4.8,
    reviews: 124,
    category: 'Electronics'
  },
  {
    name: 'Smart Fitness Watch',
    price: 199,
    originalPrice: 249,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
    rating: 4.6,
    reviews: 89,
    category: 'Wearables'
  },
  {
    name: 'Minimalist Backpack',
    price: 89,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62',
    rating: 4.9,
    reviews: 156,
    category: 'Accessories'
  },
  {
    name: 'Organic Coffee Blend',
    price: 24,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e',
    rating: 4.7,
    reviews: 203,
    category: 'Food & Beverage'
  }
];

export const StoreTemplate: React.FC<StoreTemplateProps> = ({ config }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      {/* Navigation */}
      <nav className="border-b border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="font-bold text-xl">ShopHub</div>
            <div className="hidden md:flex space-x-8">
              <a href="#home" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">Home</a>
              <a href="#products" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">Products</a>
              <a href="#categories" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">Categories</a>
              <a href="#about" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">About</a>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                🛒 Cart (0)
              </Button>
              <Button size="sm" style={{ backgroundColor: config.primaryColor }}>
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="animate-fade-in">
                  🎉 Free Shipping on Orders $50+
                </Badge>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white leading-tight">
                  Discover Amazing Products
                </h1>
                <p className="text-xl text-slate-600 dark:text-slate-300">
                  Shop the latest trends and bestsellers with unbeatable prices and fast delivery.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" style={{ backgroundColor: config.primaryColor }}>
                  Shop Now
                </Button>
                <Button variant="outline" size="lg">
                  View Deals
                </Button>
              </div>
              <div className="flex items-center gap-8 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-slate-600 dark:text-slate-400">Free Returns</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-slate-600 dark:text-slate-400">Secure Payment</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-slate-600 dark:text-slate-400">24/7 Support</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8"
                  alt="Product 1"
                  className="rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300"
                />
                <img
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d"
                  alt="Product 2"
                  className="rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300 mt-8"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="products" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              Handpicked items just for you
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
                <div className="aspect-square overflow-hidden rounded-t-lg relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  {product.originalPrice && (
                    <Badge 
                      className="absolute top-2 left-2"
                      style={{ backgroundColor: config.primaryColor }}
                    >
                      Sale
                    </Badge>
                  )}
                </div>
                <CardContent className="p-6">
                  <Badge variant="outline" className="mb-2 text-xs">
                    {product.category}
                  </Badge>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1 mb-3">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-sm ${
                            i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-slate-300 dark:text-slate-600'
                          }`}
                        >
                          ⭐
                        </span>
                      ))}
                    </div>
                    <span className="text-sm text-slate-500">({product.reviews})</span>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xl font-bold text-slate-900 dark:text-white">
                      ${product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-slate-500 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                  <Button 
                    className="w-full" 
                    style={{ backgroundColor: config.primaryColor }}
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Shop by Category
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              Find exactly what you're looking for
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {['Electronics', 'Fashion', 'Home & Garden', 'Sports'].map((category, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
                <CardContent className="p-8">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {index === 0 && '💻'}
                    {index === 1 && '👕'}
                    {index === 2 && '🏠'}
                    {index === 3 && '⚽'}
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                    {category}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-4">
                    {Math.floor(Math.random() * 500) + 100}+ items
                  </p>
                  <Button variant="outline" className="w-full">
                    Browse
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-800/50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">
              Get Exclusive Deals
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Subscribe to our newsletter and be the first to know about sales, new arrivals, and special offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-slate-900 placeholder-slate-500"
              />
              <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 dark:bg-slate-950 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="font-bold text-xl mb-4">ShopHub</div>
              <p className="text-slate-400 mb-4">
                Your trusted online shopping destination for quality products at great prices.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Customer Service</h3>
              <div className="space-y-2 text-slate-400">
                <p>Help Center</p>
                <p>Returns</p>
                <p>Shipping Info</p>
                <p>Contact Us</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <div className="space-y-2 text-slate-400">
                <p>About Us</p>
                <p>Careers</p>
                <p>Press</p>
                <p>Sustainability</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Connect</h3>
              <div className="space-y-2 text-slate-400">
                <p>Newsletter</p>
                <p>Social Media</p>
                <p>Blog</p>
                <p>Reviews</p>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center">
            <p className="text-slate-500">
              © 2024 ShopHub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
