import { HttpInterceptorFn } from '@angular/common/http';

export const contentTypeInterceptor: HttpInterceptorFn = (req, next) => {
  let headers = req.headers;

  // On vérifie la méthode HTTP
  if (req.method === 'PATCH') {
    headers = headers.set('Content-Type', 'application/merge-patch+json');
  } else if (req.method === 'POST') {
    headers = headers.set('Content-Type', 'application/json');
  }

  // On clone la requête avec les nouveaux headers
  const modifiedReq = req.clone({ headers });

  return next(modifiedReq);
};
