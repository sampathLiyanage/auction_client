import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  public static readonly API_BASE_URL = 'http://127.0.0.1:8000/api/';
  constructor() { }
}
