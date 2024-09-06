export interface Listing {
    id: number;
    author_id: number;
    type: ListingType;
    message: string;
    contact: string;
    reward: number;
    status: ListingStatus;
}

export interface StagedListing {
    id?: number;
    author_id: number;
    type: ListingType;
    message: string;
    contact: string;
    reward: number;
    status: ListingStatus;
}

export type ListingType = "offer" | "request";

export type ListingStatus = "active" | "complete" | "delisted";