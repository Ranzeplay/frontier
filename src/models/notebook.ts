export type Notebook = {
    id: string;
    title: string;
    description: string;
    createdAt: Date;
    content: NotebookContent[];
};

export type NotebookContent = {
    id: string,
    type: "text" | "drawing",
    createdAt: Date;
    lastModifiedAt: Date;
};
