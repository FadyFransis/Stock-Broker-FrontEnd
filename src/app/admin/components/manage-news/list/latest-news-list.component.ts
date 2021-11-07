import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { LatestNews } from 'src/app/models/LatestNewsDTO';
import { LatestNewsService } from 'src/app/services/latestNews.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-latest-news-list',
  templateUrl: './latest-news-list.component.html',
  styleUrls: ['./latest-news-list.component.scss']
})
export class LatestNewsListComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService, private latestnewsService: LatestNewsService) { }

  latestNews: LatestNews[];
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  dataSource: MatTableDataSource<LatestNews>;
  displayedColumns = ['No', 'ImagePath', 'Title', 'Description', 'Actions'];
  ngOnInit(

  ) {
    this.getAll();
  }
  getAll = () => {
    this.spinner.show();
    this.latestnewsService.getLatestNews().subscribe(response => {

      if (response.success) {
        this.latestNews = response.result;
        this.organizeData();
        this.spinner.hide();
      }
      else
        Swal.fire({
          title: 'Error!',
          text: response.errors[0],
          icon: 'error',
        })
    });
    this.spinner.hide();
  }

  search = (filterValue: string) => {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.paginator.firstPage();
  }
  organizeData() {
    this.dataSource = new MatTableDataSource(this.latestNews);
    setTimeout(() => {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }
  delete = (latest?: LatestNews) => {
    Swal.fire({
      title: 'Are you sure you want to delete the selected news',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      //confirmButtonColor: '#3085d6',
      //cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {

        this.latestnewsService.delete(latest.id).subscribe(response => {

          if (response.isSubmitted && response.isSubmittedSuccessfully) {
            this.latestNews = this.latestNews.filter(obj => obj !== latest);
            this.organizeData();
            Swal.fire({
              title: 'success!',
              text: "The selected news deleted successfully",
              icon: 'success',
            })

          }
          else
            Swal.fire({
              title: 'Error!',
              text: response.errors[0],
              icon: 'error',
            })
        });

      }
    })


  }
}
