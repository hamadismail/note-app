export interface INotes {
  title: string,
  content: string,
  category: "Personal" | "Work" | "Study" | "Othrers",
  pinned: boolean,
  tags: {
    label: string,
    color: string,
  }
}
