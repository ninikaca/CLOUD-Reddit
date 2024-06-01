export interface PostQueryData {
    Page: number;
    PageSize: number;
    Sort: string;
    SearchQuery: string;
    UserId: string;
}

export const defaultPostQueryData: PostQueryData = {
    Page: 1,
    PageSize: 5,
    Sort: "",
    SearchQuery: "",
    UserId: ""
};
