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
			fontFamily: {
				cairo: ['Segoe UI', 'Tahoma', 'Arial', 'Helvetica', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					dark: 'hsl(var(--primary-dark))',
					light: 'hsl(var(--primary-light))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				'creative-orange': {
					DEFAULT: 'hsl(var(--creative-orange))',
					foreground: 'hsl(var(--creative-orange-foreground))'
				},
				'creative-magenta': {
					DEFAULT: 'hsl(var(--creative-magenta))',
					foreground: 'hsl(var(--creative-magenta-foreground))'
				},
				'creative-cyan': {
					DEFAULT: 'hsl(var(--creative-cyan))',
					foreground: 'hsl(var(--creative-cyan-foreground))'
				},
				'creative-yellow': {
					DEFAULT: 'hsl(var(--creative-yellow))',
					foreground: 'hsl(var(--creative-yellow-foreground))'
				},
				'creative-green': {
					DEFAULT: 'hsl(var(--creative-green))',
					foreground: 'hsl(var(--creative-green-foreground))'
				},
				'creative-purple': {
					DEFAULT: 'hsl(var(--creative-purple))',
					foreground: 'hsl(var(--creative-purple-foreground))'
				},
				success: {
					DEFAULT: 'hsl(var(--success))',
					foreground: 'hsl(var(--success-foreground))'
				},
				warning: {
					DEFAULT: 'hsl(var(--warning))',
					foreground: 'hsl(var(--warning-foreground))'
				},
				danger: {
					DEFAULT: 'hsl(var(--danger))',
					foreground: 'hsl(var(--danger-foreground))'
				},
				info: {
					DEFAULT: 'hsl(var(--info))',
					foreground: 'hsl(var(--info-foreground))'
				},
				purple: {
					DEFAULT: 'hsl(var(--purple))',
					foreground: 'hsl(var(--purple-foreground))'
				},
				'dark-gray': {
					DEFAULT: 'hsl(var(--dark-gray))',
					foreground: 'hsl(var(--dark-gray-foreground))'
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
			backgroundImage: {
				'gradient-primary': 'var(--gradient-primary)',
				'gradient-creative': 'var(--gradient-creative)',
				'gradient-warm': 'var(--gradient-warm)',
				'gradient-cool': 'var(--gradient-cool)',
				'gradient-sunset': 'var(--gradient-sunset)'
			},
			boxShadow: {
				'colorful': 'var(--shadow-colorful)',
				'creative': 'var(--shadow-creative)',
				'glow': 'var(--shadow-glow)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'bounce-in': {
					'0%': {
						transform: 'scale(0.8)',
						opacity: '0'
					},
					'60%': {
						transform: 'scale(1.1)'
					},
					'100%': {
						transform: 'scale(1)',
						opacity: '1'
					}
				},
				'color-shift': {
					'0%, 100%': {
						filter: 'hue-rotate(0deg)'
					},
					'50%': {
						filter: 'hue-rotate(90deg)'
					}
				},
				'glow': {
					'0%, 100%': {
						boxShadow: '0 0 20px hsl(var(--primary) / 0.3)'
					},
					'50%': {
						boxShadow: '0 0 40px hsl(var(--primary) / 0.6)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'bounce-in': 'bounce-in 0.6s ease-out',
				'color-shift': 'color-shift 3s ease-in-out infinite',
				'glow': 'glow 2s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
