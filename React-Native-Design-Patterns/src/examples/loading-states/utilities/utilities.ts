import { red, yellow, green } from '@brightlayer-ui/colors';

export const getIcon = (value: number): string => {
    if (value >= 90) return 'A';
    else if (value >= 80) return 'B';
    return 'C';
};
export const getColor = (value: number): string => {
    if (value < 25) {
        return red[500];
    }
    if (value < 75) {
        return yellow[500];
    }
    return green[500];
};

export const getGradeColor = (value: number): string => {
    if (value >= 90) return green[500];
    else if (value >= 80) return yellow[500];
    return red[500];
};

export const getGradeIcon = (letter: string): string => {
    switch (letter) {
        case 'A':
            return 'grade_a';
        case 'B':
            return 'grade_b';
        case 'C':
            return 'grade_c';
        default:
            return 'grade_a';
    }
};
