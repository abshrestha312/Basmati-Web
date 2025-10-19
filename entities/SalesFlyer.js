// SalesFlyer entity for managing weekly sales flyers

export class SalesFlyer {
  constructor(data = {}) {
    this.id = data.id;
    this.file_url = data.file_url;
    this.upload_date = data.upload_date;
    this.created_date = data.created_date;
  }

  // Mock sales flyer data
  static mockFlyers = [
    {
      id: '1',
      file_url: 'https://example.com/sample-flyer.pdf',
      upload_date: '2024-01-15',
      created_date: '2024-01-15T10:00:00Z'
    }
  ];

  // List all flyers (mock implementation)
  static async list(sortBy = '-created_date') {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const flyers = this.mockFlyers.map(data => new SalesFlyer(data));
    
    // Simple sorting
    if (sortBy === '-created_date') {
      flyers.sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
    }
    
    return flyers;
  }

  // Get current flyer (most recent)
  static async getCurrent() {
    const flyers = await this.list('-created_date');
    return flyers.length > 0 ? flyers[0] : null;
  }

  // Create flyer (mock implementation)
  static async create(flyerData) {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const flyer = new SalesFlyer({
      id: Date.now().toString(),
      created_date: new Date().toISOString(),
      ...flyerData
    });
    
    this.mockFlyers.push(flyer);
    return flyer;
  }

  // Delete flyer (mock implementation)
  static async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const index = this.mockFlyers.findIndex(f => f.id === id);
    if (index !== -1) {
      this.mockFlyers.splice(index, 1);
      return true;
    }
    
    throw new Error('Flyer not found');
  }

  // Update flyer (mock implementation)
  async update(updates) {
    await new Promise(resolve => setTimeout(resolve, 100));
    
    Object.assign(this, updates);
    
    const index = SalesFlyer.mockFlyers.findIndex(f => f.id === this.id);
    if (index !== -1) {
      SalesFlyer.mockFlyers[index] = { ...this };
    }
    
    return this;
  }
}