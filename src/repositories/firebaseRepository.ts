import { Document } from "../models/Document";
import fbData from "../startup/firebase";

/**
 * returns a promise of a document
 *
 * @export
 * @param {string} docId
 * @param {string} uid
 * @returns
 */
export function getDocument(docId: string, uid: string): Promise<Document> {
    if (!docId) {
        throw new Error("No doc id passed");
    }
    if (!uid) {
        throw new Error("No uid passed");
    }
    return fbData.rebase.fetch(`docs/${uid}/${docId}`, {asArray: false});

}

export function getDocuments(uid: string): Promise<Document[]> {
    return fbData.rebase.fetch(`docs/${uid}`,
    {
        asArray: true,
    });
}

export function saveDocument(document: Document, docId: string, uid: string): Promise<any> {
    return fbData.rebase.post(`docs/${uid}/${document}`, {data: document});
}