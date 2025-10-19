// Product entity for managing grocery products
import { supabase, TABLES, BUCKETS } from '../lib/supabase.js';

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
    this.created_at = data.created_at || data.created_date;
    this.updated_at = data.updated_at;
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
      created_at: '2024-01-01T00:00:00Z'
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

  // List all products
  static async list(sortBy = '-created_at') {
    try {
      let query = supabase.from(TABLES.PRODUCTS).select('*');
      
      // Apply sorting
      if (sortBy === '-created_at' || sortBy === '-created_date') {
        query = query.order('created_at', { ascending: false });
      } else if (sortBy === 'created_at' || sortBy === 'created_date') {
        query = query.order('created_at', { ascending: true });
      } else if (sortBy === 'name') {
        query = query.order('name', { ascending: true });
      } else if (sortBy === '-name') {
        query = query.order('name', { ascending: false });
      }

      const { data, error } = await query;

      if (error) throw error;
      return data.map(product => new Product(product));
    } catch (error) {
      console.warn('Supabase products not available, using mock data:', error.message);
      // Fallback to mock data
      const products = this.mockProducts.map(data => new Product(data));
      
      if (sortBy === '-created_date' || sortBy === '-created_at') {
        products.sort((a, b) => new Date(b.created_at || b.created_date) - new Date(a.created_at || a.created_date));
      } else if (sortBy === 'name') {
        products.sort((a, b) => a.name.localeCompare(b.name));
      }
      
      return products;
    }
  }

  // Filter products
  static async filter(filters = {}, sortBy = '-created_at', limit = null) {
    try {
      let query = supabase.from(TABLES.PRODUCTS).select('*');
      
      // Apply filters
      Object.keys(filters).forEach(key => {
        const value = filters[key];
        if (value !== undefined && value !== null) {
          query = query.eq(key, value);
        }
      });
      
      // Apply sorting
      if (sortBy === '-created_at' || sortBy === '-created_date') {
        query = query.order('created_at', { ascending: false });
      } else if (sortBy === 'created_at' || sortBy === 'created_date') {
        query = query.order('created_at', { ascending: true });
      } else if (sortBy === 'name') {
        query = query.order('name', { ascending: true });
      } else if (sortBy === '-name') {
        query = query.order('name', { ascending: false });
      }
      
      // Apply limit
      if (limit) {
        query = query.limit(limit);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data.map(product => new Product(product));
    } catch (error) {
      console.warn('Supabase products not available, using mock data:', error.message);
      // Fallback to mock data
      let products = this.mockProducts.map(data => new Product(data));
      
      // Apply filters
      Object.keys(filters).forEach(key => {
        const value = filters[key];
        if (value !== undefined && value !== null) {
          products = products.filter(product => product[key] === value);
        }
      });
      
      // Sort
      if (sortBy === '-created_date' || sortBy === '-created_at') {
        products.sort((a, b) => new Date(b.created_at || b.created_date) - new Date(a.created_at || a.created_date));
      } else if (sortBy === 'name') {
        products.sort((a, b) => a.name.localeCompare(b.name));
      }
      
      // Apply limit
      if (limit) {
        products = products.slice(0, limit);
      }
      
      return products;
    }
  }

  // Get product by ID
  static async get(id) {
    try {
      const { data, error } = await supabase
        .from(TABLES.PRODUCTS)
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return new Product(data);
    } catch (error) {
      console.warn('Supabase product not available, using mock data:', error.message);
      // Fallback to mock data
      const productData = this.mockProducts.find(p => p.id === id);
      if (!productData) {
        throw new Error('Product not found');
      }
      return new Product(productData);
    }
  }

  // Create product
  static async create(productData) {
    try {
      const { data, error } = await supabase
        .from(TABLES.PRODUCTS)
        .insert([{
          ...productData,
          created_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) throw error;
      return new Product(data);
    } catch (error) {
      console.error('Create product error:', error.message);
      throw error;
    }
  }

  // Update product
  async update(updates) {
    try {
      const { data, error } = await supabase
        .from(TABLES.PRODUCTS)
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', this.id)
        .select()
        .single();

      if (error) throw error;
      
      Object.assign(this, data);
      return this;
    } catch (error) {
      console.error('Update product error:', error.message);
      throw error;
    }
  }

  // Delete product
  async delete() {
    try {
      const { error } = await supabase
        .from(TABLES.PRODUCTS)
        .delete()
        .eq('id', this.id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Delete product error:', error.message);
      throw error;
    }
  }

  // Upload product image
  async uploadImage(file) {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${this.id}-${Date.now()}.${fileExt}`;
      
      const { data, error } = await supabase.storage
        .from(BUCKETS.PRODUCT_IMAGES)
        .upload(fileName, file);

      if (error) throw error;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from(BUCKETS.PRODUCT_IMAGES)
        .getPublicUrl(fileName);

      // Update product with image URL
      await this.update({ image_url: publicUrl });
      
      return publicUrl;
    } catch (error) {
      console.error('Upload image error:', error.message);
      throw error;
    }
  }
}