import { theme } from "@chakra-ui/core";

// Let's say you want to add custom colors
export default {
    ...theme,
    colors: {
        ...theme.colors,
        primary: '#02c1db',
        secondary: '#33486d',
        danger: '#b93333'
    },
    fonts: {
        overlock: 'Overlock, cursive',
        nunito: 'Nunito, sans-serif',
    },
    fontWeights: {
        light: 100
    },
};