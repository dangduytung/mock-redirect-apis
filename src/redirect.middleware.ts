import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class RedirectMiddleware implements NestMiddleware {
  private readonly logger = new Logger(RedirectMiddleware.name);
  private URL_REDIRECT = process.env.URL_REDIRECT || 'https://example.com';

  constructor(private readonly httpService: HttpService) {
    this.logger.log(`URL_REDIRECT = ${this.URL_REDIRECT}`);
  }

  async use(req: Request, res: Response, next: NextFunction): Promise<void> {
    // Define your redirection URL
    const redirectUrl = this.URL_REDIRECT;

    // Get the request method and URL
    const { method, originalUrl, body, headers } = req;
    this.logger.log(method + ' ' + originalUrl);
    this.logger.log(body);
    // this.logger.log(headers);

    try {
      // Make the request to the redirect URL using HttpService
      const axiosResponse: AxiosResponse<any> = await firstValueFrom(
        this.httpService.request({
          method,
          url: redirectUrl + originalUrl,
          data: body,
          // headers,
        }),
      );

      // Handle the response here, if needed
      this.logger.log(axiosResponse.data);
      // You can also set the response data to the Express response if you want
      // res.send(axiosResponse.data);
    } catch (error) {
      // Handle any errors that occurred during the request
      this.logger.error('Error occurred:', error);
      // You can also send an error response to the client if needed
      // res.status(500).send('Internal Server Error');
    }

    // Continue with the next middleware in the chain
    next();
  }
}
