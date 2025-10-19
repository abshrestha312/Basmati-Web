// Product entity for managing grocery products

export class Product {
  constructor(data = {}) {
    this.id = data.id;
    this.name = data.name;
    this.category = data.category;
    this.price = data.price;
    this.unit = data.unit;
    this.description = data.description;
    this.image_url = data.image_url;
    this.in_stock = data.in_stock !== undefined ? data.in_stock : true;
    this.featured = data.featured || false;
    this.created_date = data.created_date;
  }

  // Mock product data for demonstration
  static mockProducts = [
    {
      id: '1',
      name: 'Basmati Rice Premium',
      category: 'rice',
      price: 12.99,
      unit: 'kg',
      description: 'Premium quality aged basmati rice from India',
      image_url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=80',
      in_stock: true,
      featured: true,
      created_date: '2024-01-01T00:00:00Z'
    },
    {
      id: '2',
      name: 'Turmeric Powder',
      category: 'spices',
      price: 4.99,
      unit: '100g',
      description: 'Pure turmeric powder with anti-inflammatory properties',
      image_url: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=400&q=80',
      in_stock: true,
      featured: true,
      created_date: '2024-01-02T00:00:00Z'
    },
    {
      id: '3',
      name: 'Red Lentils (Masoor Dal)',
      category: 'lentils',
      price: 6.99,
      unit: 'kg',
      description: 'High protein red lentils, perfect for dal and curries',
      image_url: 'https://images.unsplash.com/photo-1596040033229-a0b34b36b1ec?w=400&q=80',
      in_stock: true,
      featured: true,
      created_date: '2024-01-03T00:00:00Z'
    },
    {
      id: '4',
      name: 'Samosa (Frozen)',
      category: 'frozen',
      price: 8.99,
      unit: 'pack',
      description: 'Authentic frozen samosas, ready to fry',
      image_url: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80',
      in_stock: true,
      featured: false,
      created_date: '2024-01-04T00:00:00Z'
    },
    {
      id: '5',
      name: 'Mango Lassi',
      category: 'beverages',
      price: 3.99,
      unit: 'bottle',
      description: 'Refreshing mango yogurt drink',
      image_url: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&q=80',
      in_stock: true,
      featured: false,
      created_date: '2024-01-05T00:00:00Z'
    },
    {
      id: '6',
      name: 'Garam Masala',
      category: 'spices',
      price: 5.99,
      unit: '50g',
      description: 'Aromatic blend of ground spices',
      image_url: 'https://images.unsplash.com/photo-1596040033229-a0b34b36b1ec?w=400&q=80',
      in_stock: true,
      featured: true,
      created_date: '2024-01-06T00:00:00Z'
    }
  ];

  // List all products (mock implementation)
  static async list(sortBy = '-created_date') {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const products = this.mockProducts.map(data => new Product(data));
    
    // Simple sorting
    if (sortBy === '-created_date') {
      products.sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
    } else if (sortBy === 'name') {
      products.sort((a, b) => a.name.localeCompare(b.name));
    }
    
    return products;
  }

  // Filter products (mock implementation)
  static async filter(filters = {}, sortBy = '-created_date', limit = null) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    let products = this.mockProducts.map(data => new Product(data));
    
    // Apply filters
    Object.keys(filters).forEach(key => {
      const value = filters[key];
      if (value !== undefined && value !== null) {
        products = products.filter(product => product[key] === value);
      }
    });
    
    // Sort
    if (sortBy === '-created_date') {
      products.sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
    } else if (sortBy === 'name') {
      products.sort((a, b) => a.name.localeCompare(b.name));
    }
    
    // Apply limit
    if (limit) {
      products = products.slice(0, limit);
    }
    
    return products;
  }

  // Get product by ID (mock implementation)
  static async get(id) {
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const productData = this.mockProducts.find(p => p.id === id);
    if (!productData) {
      throw new Error('Product not found');
    }
    
    return new Product(productData);
  }

  // Create product (mock implementation)
  static async create(productData) {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const product = new Product({
      id: Date.now().toString(),
      created_date: new Date().toISOString(),
      ...productData
    });
    
    this.mockProducts.push(product);
    return product;
  }

  // Update product (mock implementation)
  async update(updates) {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    Object.assign(this, updates);
    
    const index = Product.mockProducts.findIndex(p => p.id === this.id);
    if (index !== -1) {
      Product.mockProducts[index] = { ...this };
    }
    
    return this;
  }

  // Delete product (mock implementation)
  async delete() {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const index = Product.mockProducts.findIndex(p => p.id === this.id);
    if (index !== -1) {
      Product.mockProducts.splice(index, 1);
    }
    
    return true;
  }
}