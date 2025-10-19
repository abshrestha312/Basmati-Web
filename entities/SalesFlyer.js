// SalesFlyer entity for managing weekly sales flyers
import { supabase, TABLES, BUCKETS } from '../lib/supabase.js';

export class SalesFlyer {
  constructor(data = {}) {
    this.id = data.id;
    this.file_url = data.file_url;
    this.upload_date = data.upload_date;
    this.created_at = data.created_at || data.created_date;
    this.updated_at = data.updated_at;
  }

  // Mock sales flyer data
  static mockFlyers = [
    {
      id: '1',
      file_url: 'https://example.com/sample-flyer.pdf',
      upload_date: '2024-01-15',
      created_at: '2024-01-15T10:00:00Z'
    }
  ];

  // List all flyers
  static async list(sortBy = '-created_at') {
    try {
      let query = supabase.from(TABLES.SALES_FLYERS).select('*');
      
      // Apply sorting
      if (sortBy === '-created_at' || sortBy === '-created_date') {
        query = query.order('created_at', { ascending: false });
      } else if (sortBy === 'created_at' || sortBy === 'created_date') {
        query = query.order('created_at', { ascending: true });
      }

      const { data, error } = await query;

      if (error) throw error;
      return data.map(flyer => new SalesFlyer(flyer));
    } catch (error) {
      console.warn('Supabase flyers not available, using mock data:', error.message);
      // Fallback to mock data
      const flyers = this.mockFlyers.map(data => new SalesFlyer(data));
      
      if (sortBy === '-created_date' || sortBy === '-created_at') {
        flyers.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      }
      
      return flyers;
    }
  }

  // Get current flyer (most recent)
  static async getCurrent() {
    const flyers = await this.list('-created_at');
    return flyers.length > 0 ? flyers[0] : null;
  }

  // Create flyer
  static async create(flyerData) {
    try {
      const { data, error } = await supabase
        .from(TABLES.SALES_FLYERS)
        .insert([{
          ...flyerData,
          created_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) throw error;
      return new SalesFlyer(data);
    } catch (error) {
      console.error('Create flyer error:', error.message);
      throw error;
    }
  }

  // Delete flyer
  static async delete(id) {
    try {
      const { error } = await supabase
        .from(TABLES.SALES_FLYERS)
        .delete()
        .eq('id', id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Delete flyer error:', error.message);
      throw error;
    }
  }

  // Update flyer
  async update(updates) {
    try {
      const { data, error } = await supabase
        .from(TABLES.SALES_FLYERS)
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
      console.error('Update flyer error:', error.message);
      throw error;
    }
  }

  // Upload flyer file
  async uploadFile(file) {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `flyer-${Date.now()}.${fileExt}`;
      
      const { data, error } = await supabase.storage
        .from(BUCKETS.FLYER_IMAGES)
        .upload(fileName, file);

      if (error) throw error;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from(BUCKETS.FLYER_IMAGES)
        .getPublicUrl(fileName);

      // Update flyer with file URL
      await this.update({ file_url: publicUrl });
      
      return publicUrl;
    } catch (error) {
      console.error('Upload flyer error:', error.message);
      throw error;
    }
  }
}