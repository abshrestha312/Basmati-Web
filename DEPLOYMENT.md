# Deployment Guide

## Supabase Setup

### 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Note down your project URL and anon key from the project settings

### 2. Set up the Database

1. Go to the SQL Editor in your Supabase dashboard
2. Copy and paste the contents of `lib/database-schema.sql`
3. Run the SQL commands to create tables, policies, and sample data

### 3. Configure Storage

The schema will automatically create storage buckets for:
- `product-images` - For product photos
- `flyer-images` - For sales flyer uploads

### 4. Environment Variables

Update your `.env` file with your Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

## Deployment Options

### Option 1: Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Option 2: Netlify

1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Configure environment variables in Netlify dashboard

### Option 3: Traditional Hosting

1. Build the project: `npm run build`
2. Upload the contents of `dist` folder to your web server
3. Configure your web server to serve the `index.html` for all routes (SPA routing)

## Post-Deployment Checklist

- [ ] Verify Supabase connection works
- [ ] Test user authentication
- [ ] Verify product loading (with real data or fallback to mock)
- [ ] Test admin functionality (if applicable)
- [ ] Check responsive design on different devices
- [ ] Verify all images load correctly

## Production Considerations

### Performance
- Enable gzip compression on your server
- Consider implementing image optimization
- Use a CDN for static assets

### Security
- Review Supabase Row Level Security policies
- Ensure environment variables are properly configured
- Set up proper CORS policies if needed

### Monitoring
- Set up error tracking (e.g., Sentry)
- Monitor Supabase usage and performance
- Set up uptime monitoring

## Troubleshooting

### Common Issues

1. **White screen after deployment**
   - Check browser console for errors
   - Verify environment variables are set correctly
   - Ensure routing is configured for SPA

2. **Supabase connection errors**
   - Verify URL and API key are correct
   - Check network connectivity
   - Review browser console for specific error messages

3. **Authentication not working**
   - Verify Supabase auth settings
   - Check redirect URLs in Supabase dashboard
   - Ensure RLS policies are correctly configured

4. **Images not loading**
   - Check storage bucket policies
   - Verify image URLs are correct
   - Ensure storage buckets are public if needed