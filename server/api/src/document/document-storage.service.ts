import { Injectable } from '@nestjs/common';
import { promises as fsPromise } from 'fs';
@Injectable()
export class DocumentStorageService {

    public async putFile(filename: string, buffer: Buffer): Promise<void> {
        await fsPromise.writeFile(`files/${filename}`, buffer);
    }

    public async getFile(filename: string): Promise<Buffer> {
        return await fsPromise.readFile(`files/${filename}`);
    }

    public async removeFile(filename: string): Promise<void> {
        return await fsPromise.unlink(`files/${filename}`);
    }


}
