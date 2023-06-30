import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class RedirectMiddleware implements NestMiddleware {
  private readonly logger = new Logger(RedirectMiddleware.name);
  private URL_REDIRECT = process.env.URL_REDIRECT || 'https://example.com';

  constructor(private readonly httpService: HttpService) {
    this.logger.log(`URL_REDIRECT = ${this.URL_REDIRECT}`);
  }

  use(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Observable<AxiosResponse<any>> | void {
    // Define your redirection URL
    const redirectUrl = this.URL_REDIRECT;

    // Get the request method and URL
    const { method, originalUrl, body, headers } = req;
    this.logger.log(method + ' ' + originalUrl);
    this.logger.log(body);
    // this.logger.log(headers);

    // Make the request to the redirect URL using HttpService
    return this.httpService.request({
      method,
      url: redirectUrl + originalUrl,
      data: body,
      headers,
    });
  }
}
