/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'admin-dark': '#1a1a2e',
                'admin-darker': '#16162a',
                'admin-card': '#1f1f3a',
                'admin-accent': '#6366f1',
                'admin-success': '#10b981',
                'admin-warning': '#f59e0b',
                'admin-danger': '#ef4444',
                'admin-info': '#3b82f6',
            },
            fontFamily: {
                'display': ['Inter', 'sans-serif'],
                'body': ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
