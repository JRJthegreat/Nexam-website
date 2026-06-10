/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'neon-primary': '#116780',
        'neon-secondary': '#260865',
        'bg-dark': '#04070D',
        'surface-100': 'rgba(255,255,255,0.03)',
        'surface-200': 'rgba(255,255,255,0.05)',
      },
      fontFamily: {
        heading: ["'Space Grotesk'", 'sans-serif'],
        body: ["'Inter'", 'sans-serif'],
        mono: ["'JetBrains Mono'", 'monospace'],
      },
      safelist: [
        'text-neon-primary', 'text-neon-secondary', 'bg-neon-primary', 'bg-neon-secondary',
        'border-neon-primary', 'border-neon-secondary',
      ],
    },
  },
  plugins: [],
}
