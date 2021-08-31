import { config } from '../config/config';
import { Document } from '../entites/document.entity';
import axios from 'axios';


class DocumentService {

    public async findAllDocuments (): Promise<Document[] | undefined> {
        try {
            const res = await axios.get(`${config.apiUrl}/document`);
            return res.data.map((doc: Document) => {
                return new Document(doc);
            });
        }
        catch (_) {
            console.error(_);
        }
    }


    public async postDocuments (docs: File[]): Promise<Document[] | undefined> {
        try {
            const formData = new FormData();
            docs.map((doc) => {
                formData.append('file', doc);
            });

            const response = await axios.post(`${config.apiUrl}/document/upload`,
                formData
            );

            return response.data as Document[];
        }
        catch (_) {
            console.error(_);
        }
    }
}

export default new DocumentService();