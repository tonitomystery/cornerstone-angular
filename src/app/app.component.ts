import { Component } from '@angular/core';
import { CornerstoneService } from './services/cornerstone.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'cornerstone-app';

  constructor(private cornerstoneService: CornerstoneService) {}

  handleFileSelect(evt: any) {
    evt.stopPropagation();
    evt.preventDefault();

    const files = evt.dataTransfer.files;

    // this UI is only built for a single file so just dump the first one
    let file = files[0];

    const imageId = this.cornerstoneService.getImageIdFromLocalFile(file);

    this.loadAndViewImage(imageId);
  }

  handleDragOver(event: any) {
    event.stopPropagation();
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
  }

  loadAndViewImage(imageId: any) {
    this.cornerstoneService.loadDicomFile(imageId).subscribe({
      next: (image: any) => this.displayImage(image),
      error: (error: any) => {
        console.log('Error loading DICOM file:', error);
      },
    });
  }

  displayImage(image: any) {
    const element = document.getElementById('dicomImage');

    const isEnable = this.cornerstoneService.isEnabledElement(element);

    if (!isEnable) {
      this.cornerstoneService.enableElement(element);
    }
    
    const viewport = this.cornerstoneService.getDefaultViewport(element, image);

    this.cornerstoneService.displayImage(element, image, viewport);
  }
}
