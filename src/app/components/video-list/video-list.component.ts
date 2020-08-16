import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';

import { VideosService } from '../../services/videos.service';
import { VideoViewComponent } from '../video-view/video-view.component';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css'],
})
export class VideoListComponent implements OnInit {
  videos: any[];
  modalRef: NgbModalRef;
  video: string;

  constructor(
    private spinner: NgxSpinnerService,
    private videoService: VideosService,
    private acticatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    private sanitizer: DomSanitizer,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.getSearchTerm();
  }

  getSearchTerm(): void {
    this.acticatedRoute.queryParams.subscribe((params) => {
      this.getVideos(params.q);
    });
  }

  getVideos(searchTerm: string): void {
    this.videoService.getVideos(searchTerm).subscribe(
      (res) => {
        this.createPLayableVideoList(res.body.items);
      },
      (error) => {
        this.spinner.hide();
        this.toastr.error('Could not get videos, Try again!', 'Server Error');
      }
    );
  }

  openViewModal(video): void {
    this.modalRef = this.modalService.open(VideoViewComponent);
    this.modalRef.componentInstance.video = video;
  }

  createPLayableVideoList(videos): void {
    this.videos = [];
    for (let i = 0; i < videos.length; i++) {
      const vid = {
        video: videos[i],
        url: this.sanitizer.bypassSecurityTrustResourceUrl(
          'https://www.youtube.com/embed/' + videos[i].id.videoId
        ),
        id: 'vid' + i,
      };
      this.videos.push(vid);
    }
    setTimeout(() => {
      this.spinner.hide();
    }, 3000);
  }
}
