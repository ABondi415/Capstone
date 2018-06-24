import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { TestBed, inject } from '@angular/core/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { HttpService } from './http.service';

describe('HttpService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpService],
      imports: [HttpClientTestingModule]
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', inject([HttpService], (service: HttpService) => {
    expect(service).toBeTruthy();
  }));
});
