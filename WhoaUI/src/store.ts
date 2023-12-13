import { create } from 'zustand';

interface LeftMenuStore {
    value: string;
    collapsed: boolean;
    checked: string;
    setValue: (value: string) => void;
    setCollapsed: (collapsed: boolean) => void;
    setChecked: (checked: string) => void;
}

const createLeftMenuStore = create<LeftMenuStore>()((set) => ({
    value: '',
    collapsed: true,
    checked: '',
    setValue: (value) => set({ value: value }),
    setCollapsed: (collapsed) =>
        set({
            collapsed: collapsed
        }),
    setChecked: (checked) => set({ checked: checked })
}));

export default createLeftMenuStore;
