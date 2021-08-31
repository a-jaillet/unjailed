import { Controller, Get, Param, Post, Res, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { DocumentService } from './document.service';
import { Document } from './document.entity';
import { FilesInterceptor } from '@nestjs/platform-express';
import { DocumentStorageService } from './document-storage.service';
import { PassThrough } from 'stream';

@Controller('document')
export class DocumentController {

    constructor(
        private readonly documentService: DocumentService,
        private readonly documentStorageService: DocumentStorageService,
    ) { }

    @Get()
    public async findAll (): Promise<Document[]> {
        return await this.documentService.findAll();
    }

    @Get('preview/:id')
    async seeUploadedFile(@Param('id') id: string, @Res() res) {
      const document = await this.documentService.findOne(id);

      if(!document){ 
        return res.sendStatus(404);
      }

      const buffer = await this.documentStorageService.getFile(document.id);
      const readStream = new PassThrough();
      readStream.end(buffer);

      const fallbackFileName = document.originalName.normalize('NFKD').replace(/[^a-zA-Z0-9\._-]/g, ''); // wrapping in encodeURIComponent() seems unnecessary after that
      const encodedFileName = encodeURIComponent(document.originalName);

      res.set({
        'Content-Type': document.mime,
        'Content-Disposition': `attachment: filename="${fallbackFileName}; filename*=UTF-8''${ encodedFileName }"`
      });

      readStream.once('error', (err) => {
        console.error(err);
        res.sendStatus(500);
      });
      
      readStream.pipe(res);
      readStream.end();
    }

    @Post('upload')
    @UseInterceptors(FilesInterceptor('file', 10))
    async uploadFile(@UploadedFiles() files: Express.Multer.File[]): Promise<Document[]> {
        return await this.documentService.bulkAddFiles(files);
    }
    // public async addOne ( @Body() doc: File): Promise<Document> {
    //     return await this.documentService.addOne(doc);
    // }
}
