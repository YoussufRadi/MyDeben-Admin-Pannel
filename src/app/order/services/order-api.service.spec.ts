import { TestBed, inject } from '@angular/core/testing';

import { OrderApiService } from './order-api.service';

describe('OrderApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderApiService]
    });
  });

  it('should be created', inject([OrderApiService], (service: OrderApiService) => {
    expect(service).toBeTruthy();
  }));
});
