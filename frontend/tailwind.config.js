/** @type {import("tailwindcss").Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",],
    theme: {
        extend: {
            colors: {
                "p-color": "var(--background-primary)",
                "s-color": "var(--background-secondary)",
            },
        },
    },
    plugins: [],
}
