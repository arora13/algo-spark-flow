
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
				},
				'algo-blue': '#667eea',
				'algo-purple': '#764ba2',
				'algo-pink': '#f093fb',
				'algo-cyan': '#4facfe',
				'cosmic-purple': '#2d1b69',
				'cosmic-blue': '#1a1a3e',
				'cosmic-dark': '#0f0f23',
				'neon-blue': '#00f2fe',
				'neon-purple': '#a855f7',
				'chrome-silver': '#c0c0c0'
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
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'glow': {
					'0%, 100%': { boxShadow: '0 0 20px rgba(102, 126, 234, 0.3)' },
					'50%': { boxShadow: '0 0 40px rgba(102, 126, 234, 0.6)' }
				},
				'particle-float': {
					'0%, 100%': { transform: 'translate3d(0, 0, 0) rotate(0deg)' },
					'25%': { transform: 'translate3d(10px, -10px, 0) rotate(90deg)' },
					'50%': { transform: 'translate3d(-5px, -20px, 0) rotate(180deg)' },
					'75%': { transform: 'translate3d(-10px, -5px, 0) rotate(270deg)' }
				},
				'cosmic-drift': {
					'0%': { transform: 'translateY(0px) translateX(0px)', opacity: '0.3' },
					'50%': { transform: 'translateY(-20px) translateX(10px)', opacity: '0.8' },
					'100%': { transform: 'translateY(-40px) translateX(-5px)', opacity: '0.1' }
				},
				'glow-pulse': {
					'0%, 100%': { 
						boxShadow: '0 0 20px rgba(102, 126, 234, 0.4), 0 0 40px rgba(102, 126, 234, 0.2)'
					},
					'50%': { 
						boxShadow: '0 0 30px rgba(102, 126, 234, 0.8), 0 0 60px rgba(102, 126, 234, 0.4), 0 0 80px rgba(102, 126, 234, 0.2)'
					}
				},
				'morphing-gradient': {
					'0%': { backgroundPosition: '0% 50%' },
					'50%': { backgroundPosition: '100% 50%' },
					'100%': { backgroundPosition: '0% 50%' }
				},
				'slide-up-fade': {
					'0%': { opacity: '0', transform: 'translateY(30px) scale(0.95)' },
					'100%': { opacity: '1', transform: 'translateY(0) scale(1)' }
				},
				'bounce-subtle': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-5px)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'float': 'float 3s ease-in-out infinite',
				'glow': 'glow 2s ease-in-out infinite',
				'particle-float': 'particle-float 6s infinite linear',
				'cosmic-drift': 'cosmic-drift 8s infinite linear',
				'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
				'morphing-gradient': 'morphing-gradient 3s ease-in-out infinite',
				'slide-up-fade': 'slide-up-fade 0.6s ease-out forwards',
				'bounce-subtle': 'bounce-subtle 2s ease-in-out infinite'
			},
			fontFamily: {
				'inter': ['Inter', 'system-ui', 'sans-serif'],
				'poppins': ['Poppins', 'system-ui', 'sans-serif']
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-primary': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
				'gradient-secondary': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
				'gradient-accent': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
				'gradient-hero': 'linear-gradient(135deg, rgba(15,15,35,0.95) 0%, rgba(26,26,62,0.9) 25%, rgba(45,27,105,0.85) 50%, rgba(102,126,234,0.8) 100%)',
				'gradient-cosmic': 'linear-gradient(135deg, #0f0f23 0%, #1a1a3e 25%, #2d1b69 50%, #667eea 100%)',
				'gradient-glass': 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
				'gradient-neon': 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%)',
				'gradient-morphing': 'linear-gradient(270deg, #667eea, #764ba2, #f093fb, #4facfe)',
			},
			backdropBlur: {
				'xs': '2px',
			},
			spacing: {
				'18': '4.5rem',
				'88': '22rem',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
