import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type Theme = "light" | "dark" | "system";

interface UiState {
  theme: Theme;
  isSidebarOpen: boolean;
  setTheme: (theme: Theme) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
}

export const useUiStore = create<UiState>()(
  devtools(
    persist(
      (set) => ({
        theme: "system",
        isSidebarOpen: false,

        setTheme: (theme) => set({ theme }, false, "ui/setTheme"),

        toggleSidebar: () =>
          set(
            (s) => ({ isSidebarOpen: !s.isSidebarOpen }),
            false,
            "ui/toggleSidebar",
          ),

        setSidebarOpen: (open) =>
          set({ isSidebarOpen: open }, false, "ui/setSidebarOpen"),
      }),
      {
        name: "ui-storage",
        partialize: (state) => ({ theme: state.theme }), // only persist theme
      },
    ),
    { name: "UiStore" },
  ),
);
