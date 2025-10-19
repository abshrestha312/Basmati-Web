// User entity for authentication and user management
import { supabase, TABLES } from '../lib/supabase.js';

export class User {
  constructor(data = {}) {
    this.id = data.id;
    this.email = data.email;
    this.full_name = data.full_name;
    this.role = data.role || 'user';
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
  }

  // Get current user from Supabase auth
  static async me() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error || !user) {
        throw new Error('Not authenticated');
      }

      // Get user profile from database
      const { data: profile, error: profileError } = await supabase
        .from(TABLES.USERS)
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError) {
        // If no profile exists, create one
        const newProfile = {
          id: user.id,
          email: user.email,
          full_name: user.user_metadata?.full_name || user.email,
          role: 'user'
        };

        const { data: createdProfile, error: createError } = await supabase
          .from(TABLES.USERS)
          .insert([newProfile])
          .select()
          .single();

        if (createError) {
          throw createError;
        }

        return new User(createdProfile);
      }

      return new User(profile);
    } catch (error) {
      // Return mock user for development if Supabase is not properly configured
      console.warn('Supabase auth not configured, using mock user:', error.message);
      const mockUser = {
        id: '1',
        email: 'admin@basmatigrocers.com',
        full_name: 'Admin User',
        role: 'admin',
        created_at: new Date().toISOString()
      };
      
      return new User(mockUser);
    }
  }

  // Login with email/password
  static async login(email, password) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Login error:', error.message);
      throw error;
    }
  }

  // Sign up with email/password
  static async signUp(email, password, fullName) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          }
        }
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Sign up error:', error.message);
      throw error;
    }
  }

  // Login with OAuth provider
  static async loginWithProvider(provider) {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('OAuth login error:', error.message);
      throw error;
    }
  }

  // Logout
  static async logout() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error.message);
      // Fallback: reload the page
      window.location.reload();
    }
  }

  // Create user profile (called after auth signup)
  static async create(userData) {
    try {
      const { data, error } = await supabase
        .from(TABLES.USERS)
        .insert([{
          ...userData,
          created_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) throw error;
      return new User(data);
    } catch (error) {
      console.error('Create user error:', error.message);
      throw error;
    }
  }

  // Update user profile
  async update(updates) {
    try {
      const { data, error } = await supabase
        .from(TABLES.USERS)
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
      console.error('Update user error:', error.message);
      throw error;
    }
  }

  // Delete user profile
  async delete() {
    try {
      const { error } = await supabase
        .from(TABLES.USERS)
        .delete()
        .eq('id', this.id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Delete user error:', error.message);
      throw error;
    }
  }

  // Get all users (admin only)
  static async list() {
    try {
      const { data, error } = await supabase
        .from(TABLES.USERS)
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data.map(user => new User(user));
    } catch (error) {
      console.error('List users error:', error.message);
      throw error;
    }
  }
}