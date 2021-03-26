export type Theme = {
    primary: string;
    secondary: string;
};

export interface IStyled {
    theme: Theme;
}

export const LightTheme: Theme = {
    primary: '#0F0',
    secondary: '#00F',
};
