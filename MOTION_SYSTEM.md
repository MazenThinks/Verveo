# Verveo Motion System

## Animation Direction Philosophy

### Vertical Movement (Y-axis)
**Used for:** Content reveal on scroll, page transitions
- All scroll-based reveals use downward-to-up motion (positive Y → 0)
- Content enters from below, creating a natural reading flow
- Page transitions: Enter from below (+20px), exit upward (-20px)

**Standard values:**
- Small reveals: `y: 20-30`
- Medium reveals: `y: 30-40`
- Large reveals: `y: 40`

### Horizontal Movement (X-axis)
**Used for:** Lateral navigation indicators, directional hints
- Arrow animations use gentle X movement (4px pulse)
- Hover effects on "View All" links
- Reserved for intentional directional cues

**Standard values:**
- Arrow pulse: `x: [0, 4, 0]`
- Hover shift: `x: 4`

### Scale Animations
**Used for:** Hover interactions, attention-grabbing elements
- Button hover: `scale: 1.02-1.05`
- Button tap: `scale: 0.95-0.98`
- Icon hover: `scale: 1.1`
- Background elements: `scale: 0.9 → 1.0`

### Opacity Animations
**Used for:** Layered reveals, subtle emphasis changes
- Always paired with position/scale
- Never used alone for primary content
- Standard: `opacity: 0 → 1`

## Timing & Easing

### Standard Easing Curve
```javascript
ease: [0.22, 1, 0.36, 1]  // Custom cubic-bezier for smooth, premium feel
```

### Duration Guidelines
- Quick interactions (hover/tap): `0.2s`
- Standard reveals: `0.6-0.7s`
- Hero animations: `0.8-1.0s`
- Ambient/atmospheric: `1.2-2.0s`

### Stagger Delays
- Cards/Grid items: `0.1-0.15s` per item
- List items: `0.1s` per item
- Value props: `0.15-0.2s` per item

## Viewport Configuration

### Margin Values
Controls when animations trigger before element enters viewport:
- Default: `margin: "-50px"` - Trigger 50px before visible
- Large sections: `margin: "-100px"` - Early trigger for big content
- Small elements: `margin: "-60px"` to `"-80px"`

### Always Use
```javascript
viewport={{ once: true, margin: "-50px" }}
```
- `once: true` - Animation plays only once (performance)
- Negative margin - Starts before element is visible (smoother experience)

## Animation Patterns

### Section Reveal
```javascript
initial={{ opacity: 0, y: 30 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: "-100px" }}
transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
```

### Card Hover
```javascript
whileHover={{ y: -6, scale: 1.0 }}
transition={{ duration: 0.3, ease: "easeOut" }}
```

### Button Interaction
```javascript
whileHover={{ scale: 1.05, y: -2 }}
whileTap={{ scale: 0.95 }}
transition={{ duration: 0.2 }}
```

### Image Zoom (on hover)
```javascript
whileHover={{ scale: 1.08-1.1 }}
transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
```

### Arrow Pulse (infinite)
```javascript
animate={{ x: [0, 4, 0] }}
transition={{ 
  duration: 1.5, 
  repeat: Infinity,
  repeatDelay: 1-2,
  ease: "easeInOut"
}}
```

## Don'ts

❌ Never use random animation directions
❌ Avoid horizontal movement for scroll reveals
❌ Don't animate position without opacity
❌ Never use aggressive/flashy animations
❌ Avoid inconsistent easing curves
❌ Don't use different Y values for similar content types
❌ Never skip viewport margins (impacts performance and UX)

## Component-Specific Rules

### FeaturedProducts
- Cards: `y: 40`, stagger `0.15s`
- Images: Scale `1.08` on hover
- Category labels: Delayed fade `index * 0.15 + 0.2`

### Home Page Sections
- Statement: `y: 40`, viewport `-100px`
- Best Sellers: `y: 40`, viewport `-50px`, stagger `0.1s`
- Why Verveo: `y: 40`, viewport `-80px`, stagger `0.2s`
- Final CTA: `y: 40`, viewport `-100px`, layered reveals

### Hero
- Main content: `y: 40`, delay `0.2s`
- Background elements: Scale `0.9 → 1.0`, duration `2s`
- CTAs: `y: 20`, delay `0.7s`

### Page Transitions
- Enter: `y: 20`, duration `0.4s`
- Exit: `y: -20`, duration `0.4s`

## Summary

**Philosophy:** Motion should feel intentional, consistent, and calm. Every animation serves a purpose:
- Vertical movement = Content reveal (reading flow)
- Horizontal movement = Direction indicator
- Scale = Interactive feedback
- Opacity = Layered emphasis

All animations use smooth easing, appropriate timing, and viewport optimization for a premium, polished experience.
