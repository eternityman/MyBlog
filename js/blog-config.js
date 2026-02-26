/**
 * blog-config.js
 * Blog customization settings.
 * Edit this file to customize background, floating images, and more.
 */

const blogConfig = {
  /**
   * Custom background image URL.
   * Set to "" to use the default gradient background.
   * Example: "https://example.com/bg.jpg" or "assets/images/bg.jpg"
   */
  backgroundImage: "",

  /**
   * Background overlay opacity (0 to 1).
   * Higher values make text more readable over busy backgrounds.
   */
  backgroundOverlay: 0.85,

  /**
   * Enable floating animation effects on the page.
   */
  enableFloatingEffects: true,

  /**
   * Floating items configuration.
   * Each item can be an emoji or an image URL.
   * - type: "emoji" or "image"
   * - content: the emoji character or image URL
   * - size: size in pixels (for images) or rem (for emoji)
   *
   * Customize these to display your own floating decorations!
   */
  floatingItems: [
    { type: "emoji", content: "✨", size: 1.5 },
    { type: "emoji", content: "💫", size: 1.2 },
    { type: "emoji", content: "⭐", size: 1.0 },
    { type: "emoji", content: "🌟", size: 1.3 },
    { type: "emoji", content: "🎈", size: 1.4 },
    { type: "emoji", content: "🍀", size: 1.1 },
    { type: "emoji", content: "🌸", size: 1.2 },
    { type: "emoji", content: "🦋", size: 1.3 }
  ],

  /**
   * Maximum number of floating items visible at once.
   */
  floatingMaxCount: 15,

  /**
   * Floating animation speed range in seconds [min, max].
   */
  floatingDuration: [8, 18],

  /**
   * Floating item opacity range [min, max] (0 to 1).
   */
  floatingOpacity: [0.15, 0.5],

  /**
   * Interval in milliseconds between spawning new floating items.
   */
  floatingSpawnInterval: 2000
};
