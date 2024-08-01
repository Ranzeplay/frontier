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

export type NotebookText = {
    id: string;
    title: string;
    content: string;
}

export type NotebookDrawing = {
    id: string;
    title: string;
    content: string;
}

export type NotebookEntryView = {
    id: string;
    title: string;
    type: "text" | "drawing";
    lastModifiedAt: Date;
}
