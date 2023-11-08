let plugin=require("tailwindcss/plugin");
module.exports = {
    content: ["./*.html","./scripts/*.js"],
    theme: {
        extend: {
            colors: {
                'dark-black': '#141414',
                'light-black': '#202020',
                'light-color': '#FDB735',
                'dark-color': '#FAA200',
                'creme': '#f3eee4',
                'dark-creme': '#958E81',
            },
            fontFamily: {
                'jost': ["Jost", 'sans-serif'],
                'train-one': ["Train One", 'display'],
            },
        },
    },
    plugins: [
        plugin(
            function({addVariant}) {
                addVariant("open","&.open");  
                addVariant("current","&.current");
                addVariant("projetsOpen","&.projetsOpen");
            },
        ),
    ],
}