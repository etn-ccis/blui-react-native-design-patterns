export type ListItem = {
    id: number;
    name: string;
    details: string;
};

export const createItem = (index: number, randomStatus: string): ListItem => ({
    id: index,
    name: `Item ${index}`,
    details: `Status: ${randomStatus}`,
});

export const createRandomItem = (): ListItem => {
    const int = parseInt(`${Math.random() * 100}`, 10);
    const randomStatus = Math.random() >= 0.3 ? 'normal' : 'alarm';
    return createItem(int, randomStatus);
};

export const generateData = (): ListItem[] => {
    const data = [];
    for (let i = 1; i <= 10; i++) {
        data.push(createRandomItem());
    }
    return data;
};
