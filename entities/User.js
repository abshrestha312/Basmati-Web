// User entity for authentication and user management

export class User {
  constructor(data = {}) {
    this.id = data.id;
    this.email = data.email;
    this.full_name = data.full_name;
    this.role = data.role || 'user';
    this.created_date = data.created_date;
  }

  // Get current user (mock implementation)
  static async me() {
    // This is a mock implementation
    // In a real app, this would make an API call to get the current user
    const mockUser = {
      id: '1',
      email: 'admin@basmatigrocers.com',
      full_name: 'Admin User',
      role: 'admin',
      created_date: new Date().toISOString()
    };
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // For demo purposes, return mock admin user
    // In production, this would check actual authentication
    return new User(mockUser);
  }

  // Login with redirect (mock implementation)
  static async loginWithRedirect(redirectUrl) {
    // This is a mock implementation
    // In a real app, this would redirect to an authentication provider
    console.log('Redirecting to login...', redirectUrl);
    
    // For demo purposes, just reload the page
    window.location.reload();
  }

  // Logout (mock implementation)
  static async logout() {
    // This is a mock implementation
    // In a real app, this would clear authentication tokens
    console.log('Logging out...');
    window.location.reload();
  }

  // Create user (mock implementation)
  static async create(userData) {
    // This is a mock implementation
    const user = new User({
      id: Date.now().toString(),
      created_date: new Date().toISOString(),
      ...userData
    });
    
    await new Promise(resolve => setTimeout(resolve, 100));
    return user;
  }

  // Update user (mock implementation)
  async update(updates) {
    // This is a mock implementation
    Object.assign(this, updates);
    await new Promise(resolve => setTimeout(resolve, 100));
    return this;
  }

  // Delete user (mock implementation)
  async delete() {
    // This is a mock implementation
    await new Promise(resolve => setTimeout(resolve, 100));
    return true;
  }
}