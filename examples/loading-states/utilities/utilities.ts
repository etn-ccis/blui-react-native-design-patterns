import { red, yellow, green } from '@pxblue/colors';

export const getIcon = (value: number): string => {
  if (value < 80) {
    return 'C';
  }
  if (value < 90) {
    return 'B';
  }
  return 'A';
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
  if (value < 80) {
    return red[500];
  }
  if (value < 90) {
    return yellow[500];
  }
  return green[500];
};
