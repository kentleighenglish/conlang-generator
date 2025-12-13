
export interface LanguageClass {
    name: string;
    translate(input: string): Translation[];
};

export type Translation = {
    rootText: string;
    rootTextIPA: string;
    translatedText: string;
    translatedTextIPA: string;
    chaos: number;
}