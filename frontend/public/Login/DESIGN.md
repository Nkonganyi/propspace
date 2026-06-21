---
name: PropSpace
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#45464d'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#565e74'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#131b2e'
  on-primary-container: '#7c839b'
  inverse-primary: '#bec6e0'
  secondary: '#0058be'
  on-secondary: '#ffffff'
  secondary-container: '#2170e4'
  on-secondary-container: '#fefcff'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#0b1c30'
  on-tertiary-container: '#75859d'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#d8e2ff'
  secondary-fixed-dim: '#adc6ff'
  on-secondary-fixed: '#001a42'
  on-secondary-fixed-variant: '#004395'
  tertiary-fixed: '#d3e4fe'
  tertiary-fixed-dim: '#b7c8e1'
  on-tertiary-fixed: '#0b1c30'
  on-tertiary-fixed-variant: '#38485d'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 8px
  sm: 16px
  md: 24px
  lg: 40px
  xl: 64px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: auto
  max-width: 1280px
---

## Brand & Style
The brand personality is authoritative yet accessible, positioning itself as a high-trust partner in the real estate journey. The visual style follows a **Corporate / Modern** aesthetic, prioritizing clarity, precision, and structural integrity. 

To evoke confidence in high-value transactions, the UI utilizes generous whitespace to reduce cognitive load and a refined SaaS-inspired finish. The emotional response should be one of "effortless professionalism"—where users feel they are using a sophisticated tool that is both powerful and easy to navigate.

## Colors
The palette is anchored by **Deep Navy (#0F172A)**, used for primary headings and navigation to establish authority. The **Action Blue (#3B82F6)** is reserved strictly for interactive elements—buttons, active states, and links—to create a clear visual path for user intent. 

**Slate Grey (#64748B)** serves as the tertiary color for secondary information and icons, while the background remains a **Crisp White (#FFFFFF)** with **Neutral Off-White (#F8FAFC)** used for sectioning and subtle container backgrounds. This high-contrast approach ensures maximum legibility for pricing and property specifications.

## Typography
This design system utilizes **Inter** for all roles to achieve a systematic, utilitarian feel that excels in data-heavy environments. The hierarchy is strictly enforced through weight and scale. 

Headlines use tight letter-spacing and semi-bold/bold weights to feel grounded. Body text is optimized for readability with a 1.5x line-height ratio. Small labels use increased tracking and uppercase styling to differentiate metadata (like property types or status tags) from narrative content.

## Layout & Spacing
The system follows a **Fixed Grid** philosophy for desktop to maintain a premium, editorial feel, while transitioning to a **Fluid Grid** for mobile. 

- **Desktop (1024px+):** 12-column grid with a 1280px max-width, 24px gutters, and auto-margins.
- **Tablet (768px - 1023px):** 8-column grid with 24px margins.
- **Mobile (Up to 767px):** 4-column grid with 16px margins.

Spacing follows a strict 4px/8px baseline rhythm to ensure alignment across all components. Vertical rhythm between sections should prioritize "breathability," utilizing 64px (xl) spacing to separate major content blocks.

## Elevation & Depth
Depth is conveyed through **Tonal Layers** and **Ambient Shadows**. The design avoids heavy, dark shadows in favor of soft, diffused elevations that use a hint of the primary navy in the shadow color for a more natural integration.

- **Level 0 (Base):** White or Off-white background.
- **Level 1 (Cards/Inputs):** 1px border (#E2E8F0) with no shadow.
- **Level 2 (Hover/Floating):** Subtle shadow (0px 4px 20px rgba(15, 23, 42, 0.08)).
- **Level 3 (Modals/Popovers):** Deep shadow (0px 12px 32px rgba(15, 23, 42, 0.12)).

Interactive elements should feel "lifted" rather than "pushed," maintaining the SaaS aesthetic.

## Shapes
The shape language uses **Rounded** (0.5rem) corners for standard UI components like buttons and input fields. This softens the professional navy-heavy aesthetic, making it feel modern and approachable. 

Larger containers like property cards or image galleries should use `rounded-lg` (1rem) to create a clear visual distinction between small interactive controls and structural layout elements.

## Components
- **Buttons:** Primary buttons use the Action Blue background with white text. Secondary buttons use a Slate Grey outline. State changes (hover/active) are indicated by a 10% brightness shift.
- **Input Fields:** Use a 1px border in Slate-200. Focus state is indicated by a 2px Action Blue ring with a light blue glow.
- **Property Cards:** White background, `rounded-lg` corners, and a 1px border. On hover, the border color shifts to Action Blue and a Level 2 shadow is applied.
- **Chips/Badges:** Used for property status (e.g., "For Sale"). These use a low-opacity background of the status color with high-contrast text (e.g., Light Blue background with Dark Blue text).
- **Icons:** Minimal, 24px stroke-based icons with a 2px stroke weight to match the clean typography.
- **Lists:** Clean rows separated by 1px horizontal lines with 16px padding, ensuring high scanability for property features and pricing.