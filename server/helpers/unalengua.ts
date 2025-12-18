
import type { ValidLanguage } from "../../types/translate";

export async function fetchIPA(input: string, lang: ValidLanguage): Promise<string> {
    const response = await fetch("https://api2.unalengua.com/ipav3", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            text: input,
            lang,
            mode: true,
        }),
    });

    const body = await response.json();

    if (body.ipa) {
        return body.ipa;
    } else {
        throw Error("Could not fetch IPA");
    }
}