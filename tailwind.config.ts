
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'gentle-float': {
					'0%, 100%': { transform: 'translate3d(0, 0, 0) rotate(0deg)' },
					'25%': { transform: 'translate3d(5px, -5px, 0) rotate(45deg)' },
					'50%': { transform: 'translate3d(-3px, -10px, 0) rotate(90deg)' },
					'75%': { transform: 'translate3d(-5px, -3px, 0) rotate(135deg)' }
				},
				'soft-glow': {
					'0%, 100%': { 
						boxShadow: '0 0 20px rgba(59, 130, 246, 0.2), 0 0 40px rgba(147, 51, 234, 0.1)'
					},
					'50%': { 
						boxShadow: '0 0 30px rgba(59, 130, 246, 0.4), 0 0 60px rgba(147, 51, 234, 0.2)'
					}
				},
				'gradient-shift': {
					'0%': { backgroundPosition: '0% 50%' },
					'50%': { backgroundPosition: '100% 50%' },
					'100%': { backgroundPosition: '0% 50%' }
				},
				'slide-up-gentle': {
					'0%': { opacity: '0', transform: 'translateY(20px) scale(0.98)' },
					'100%': { opacity: '1', transform: 'translateY(0) scale(1)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'gentle-float': 'gentle-float 8s infinite linear',
				'soft-glow': 'soft-glow 3s ease-in-out infinite',
				'gradient-shift': 'gradient-shift 4s ease-in-out infinite',
				'slide-up-gentle': 'slide-up-gentle 0.6s ease-out forwards'
			},
			fontFamily: {
				'inter': ['Inter', 'system-ui', 'sans-serif'],
				'poppins': ['Poppins', 'system-ui', 'sans-serif']
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-primary': 'linear-gradient(135deg, #3b82f6 0%, #6366f1 50%, #8b5cf6 100%)',
				'gradient-secondary': 'linear-gradient(135deg, #f472b6 0%, #fb7185 100%)',
				'gradient-accent': 'linear-gradient(135deg, #06b6d4 0%, #0ea5e9 100%)',
				'gradient-hero': 'linear-gradient(135deg, rgba(248,250,252,0.95) 0%, rgba(226,232,240,0.9) 25%, rgba(203,213,225,0.85) 50%, rgba(148,163,184,0.8) 100%)',
				'gradient-glass': 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 100%)',
			},
			backdropBlur: {
				'xs': '2px',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
