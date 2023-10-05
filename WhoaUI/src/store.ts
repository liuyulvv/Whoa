import { create } from 'zustand';

interface LeftMenuStore {
    value: string;
    opened: boolean;
    checked: string;
    setValue: (value: string) => void;
    setOpened: (opened: boolean) => void;
    setChecked: (checked: string) => void;
}

const createLeftMenuStore = create<LeftMenuStore>()((set) => ({
    value: '',
    opened: false,
    checked: '',
    setValue: (value) => set({ value: value }),
    setOpened: (opened) =>
        set({
            opened: opened
        }),
    setChecked: (checked) => set({ checked: checked })
}));

export default createLeftMenuStore;
