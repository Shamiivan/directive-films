# Video Setup Guide

## Adding Videos to the Landing Page

The landing page features two types of videos:

### 1. Main Showcase Videos
These are the featured videos displayed in the central square that rotate automatically.

**Location**: `/public/videos/`

**Required files**:
- `showcase-1.mp4`
- `showcase-2.mp4`
- `showcase-3.mp4`
- `showcase-4.mp4`
- `showcase-5.mp4`

**Recommendations**:
- Resolution: 1920x1080 (16:9 aspect ratio)
- Duration: 10-30 seconds
- File size: Keep under 5MB each for fast loading
- Format: MP4 (H.264 codec)

### 2. Background Reel Videos
These create the rolling video wall effect behind the content.

**Location**: `/public/videos/`

**Required files**:
- `bg-1.mp4`
- `bg-2.mp4`
- `bg-3.mp4`
- `bg-4.mp4`
- `bg-5.mp4`
- `bg-6.mp4`

**Recommendations**:
- Resolution: 640x480 or smaller (will be displayed small)
- Duration: 5-15 seconds (loops automatically)
- File size: Keep under 2MB each
- Format: MP4 (H.264 codec)
- Content: Clips from your portfolio, behind-the-scenes, or work samples

## How to Add Your Videos

1. Export your videos in MP4 format
2. Place them in `/public/videos/` directory
3. Name them according to the required filenames above
4. Refresh your browser at `http://localhost:3000`

## Customizing Video Behavior

To change video rotation speed, edit `/src/app/client-page.tsx`:

```typescript
// Change 5000 (5 seconds) to your preferred duration in milliseconds
useEffect(() => {
  const interval = setInterval(() => {
    setCurrentVideoIndex((prev) => (prev + 1) % showcaseVideos.length);
  }, 5000); // ← Change this value
  return () => clearInterval(interval);
}, [showcaseVideos.length]);
```

## Adding More Videos

To add more showcase videos:

1. Add the video file to `/public/videos/` (e.g., `showcase-6.mp4`)
2. Update the array in `client-page.tsx`:

```typescript
const showcaseVideos = [
  '/videos/showcase-1.mp4',
  '/videos/showcase-2.mp4',
  '/videos/showcase-3.mp4',
  '/videos/showcase-4.mp4',
  '/videos/showcase-5.mp4',
  '/videos/showcase-6.mp4', // ← Add your new video
];
```

## Brand Logos

Replace the placeholder Corona logo at `/public/logos/corona.svg` with your actual brand partner logos.
