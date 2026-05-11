# Image Management Guide for VibePass

## How to Add Images to Your Next.js Application

### Option 1: Using the Public Folder (Recommended for Static Images)

1. **Place images in the `public/` directory**
   - Navigate to: `/home/jojo/Desktop/Repos/vibepass/public/`
   - Create subfolders for organization (e.g., `public/world-cup/`, `public/venues/`, `public/teams/`)
   - Copy your images there

2. **Reference images in your code**
   ```tsx
   // Correct way - using public folder
   <Image 
     src="/world-cup/stadium.jpg" 
     alt="Stadium" 
     width={800} 
     height={600} 
   />
   
   // Or with external URLs (already working)
   <Image 
     src="https://images.unsplash.com/photo-..." 
     alt="Event" 
     width={800} 
     height={600} 
   />
   ```

### Option 2: Using Next.js Image Optimization

The current code already uses Next.js `<Image />` component which automatically:
- Optimizes images (WebP, AVIF formats)
- Lazy loads images
- Resizes images dynamically
- Serves responsive images

### Current Image Setup

Currently, your World Cup pages use Unsplash images (external URLs). These are working fine. If you want to use your own images:

1. **Download FIFA World Cup images from your temp folder**
   ```bash
   # Your downloaded files are in:
   /home/jojo/Desktop/Repos/v/tmp_worldcup/
   ```

2. **Copy images to public folder**
   ```bash
   mkdir -p /home/jojo/Desktop/Repos/vibepass/public/world-cup
   mkdir -p /home/jojo/Desktop/Repos/vibepass/public/venues
   
   # Copy images from your temp folder to public
   cp /home/jojo/Desktop/Repos/v/tmp_worldcup/*.jpg /home/jojo/Desktop/Repos/vibepass/public/world-cup/ 2>/dev/null
   cp /home/jojo/Desktop/Repos/v/tmp_worldcup/*.png /home/jojo/Desktop/Repos/vibepass/public/world-cup/ 2>/dev/null
   ```

3. **Update image URLs in `src/data/worldcup.ts`**
   ```typescript
   // Change from external URL:
   image: "https://images.unsplash.com/photo-1577223625816-7546f2f65e2e?q=80&w=2070&auto=format&fit=crop",
   
   // To local image:
   image: "/world-cup/stadium.jpg",
   ```

### Common Image Errors & Solutions

**Error: "Image not found"**
- Ensure image path starts with `/` (e.g., `/world-cup/image.jpg`)
- Check the file exists in the `public/` folder
- Verify the filename and extension match exactly (case-sensitive)

**Error: "Image width/height required"**
- Next.js requires width/height for local images
- For external URLs with `src` containing a query string, you may need:
  ```tsx
  <Image 
    src="https://example.com/image.jpg" 
    alt="..." 
    width={800} 
    height={600} 
    unoptimized // Add this for external images with issues
  />
  ```

**Error: "Invalid src prop"**
- Ensure src is a string
- Don't use dynamic imports for images in the public folder
- Use absolute paths starting with `/`

### Recommended Image Structure

```
public/
├── world-cup/
│   ├── hero-bg.jpg
│   ├── stadium-atlanta.jpg
│   ├── stadium-boston.jpg
│   └── ...
├── venues/
│   ├── mercedes-benz.jpg
│   ├── sofi-stadium.jpg
│   └── ...
├── teams/
│   ├── brazil.jpg
│   ├── usa.jpg
│   └── ...
└── default/
    └── event-placeholder.jpg
```

### Testing Images

After adding images:
1. Restart your dev server: `npm run dev`
2. Navigate to the page
3. Check browser console for any image errors
4. Inspect the Network tab to see if images are loading

### Current External Images (Working)

Your current setup uses Unsplash images which are working correctly:
- Venue images: `https://images.unsplash.com/photo-...`
- Ticket category images: `https://images.unsplash.com/photo-...`

These will continue to work. You only need to replace them if you want to use your own images.

### For Country Flags

The emoji flags (🇺🇸, 🇧🇷, etc.) are already working with the updated font-family I added. No image files needed for flags.
