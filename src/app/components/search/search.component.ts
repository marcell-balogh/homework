import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from '../../models/movie';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  query: string = '';

  constructor(private route: ActivatedRoute, private router: Router) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.query = params.query;
    });
  }

  submitForm() {
    if (this.query !== undefined) {
      this.query.length;
      this.router.navigate(['/search'], { queryParams: { query: this.query } });
    }
  }
}
