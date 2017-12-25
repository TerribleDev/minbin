export enum Theme {

}

export interface Document {
    Title?: string,
    Body?: string,
    Theme?: Theme
}
export interface DocumentPlusKey extends Document{key: string}