import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';

declare const cornerstoneWADOImageLoader: any;
declare const cornerstone: any;

@Injectable({
  providedIn: 'root',
})
export class CornerstoneService {
  constructor() {
    cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
  }

  fetchDicomFile(imageId: string): Observable<any> {
    return from(cornerstone.loadAndCacheImage(`wadouri:${imageId}`));
  }

  loadDicomFile(imageId: string): Observable<any> {
    return from(cornerstone.loadImage(imageId));
  }

  getImageIdFromLocalFile(file: any) {
    return cornerstoneWADOImageLoader.wadouri.fileManager.add(file);
  }

  displayImage(element: any, image: any, viewport: any) {
    cornerstone.displayImage(element, image, viewport);
  }

  enableElement(element: any) {
    cornerstone.enable(element);
  }
  getEnabledElement(element: any) {
    return cornerstone.getEnabledElement(element);
  }

  isEnabledElement(element: any) {
    let enableElements = cornerstone.getEnabledElements();

    for (const enableElement of enableElements) {
      if (enableElement.element === element) {
        return true;
      }
    }
    return false;
  }

  getDefaultViewport(element: any, image: any) {
    return cornerstone.getDefaultViewportForImage(element, image);
  }
}
