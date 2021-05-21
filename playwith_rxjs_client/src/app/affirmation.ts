export interface Affirmation {
    affirmation: String;
    translation: String;
    imgSrc: String;
}

export interface AffirmationListResponse {
    affirmations: String[];
    page: number;
    total: number;
}