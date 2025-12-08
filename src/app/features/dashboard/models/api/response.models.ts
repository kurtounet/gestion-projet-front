export interface ApiResponse {
  totalItems: number;
  member: any[];
  search?: ApiResponseSearch;
  view?: ApiResponseview;
}
export interface ApiResponseSearch {
  '@type': string;
  template: string;
  variableRepresentation: string;
  mapping: ApiResponseSearchMapping[];
}
export interface ApiResponseSearchMapping {
  '@type': string;
  variable: string;
  property: string;
  required: true;
}
export interface ApiResponseview {
  '@id': string;
  type: string;
  first: string;
  last: string;
  previous: string;
  next: string;
}
