export interface Listing {
    id: number;
    author_id: number;
    type: "offer" | "request";
    message: string;
    reward: number;
    status: "active" | "complete" | "delisted";
}

export interface StagedListing {
    id?: number;
    author_id: number;
    type: "offer" | "request";
    message: string;
    reward: number;
    status: "active" | "complete" | "delisted";
}