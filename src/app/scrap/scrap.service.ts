import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Waste } from '../waste.model';

@Injectable({
  providedIn: 'root',
})
export class ScrapService {
  BACKEND_URL = environment.BACKEND_URL;
  constructor(private http: HttpClient) {}

  getAllScraps() {
    return this.http.get<{ wastes: Waste[]; message: string }>(
      `${this.BACKEND_URL}waste/`
    );
  }

  getWasteById(id: string) {
    return this.http.get<{ waste: Waste; message: string }>(
      `${this.BACKEND_URL}waste/${id}`
    );
  }
}
