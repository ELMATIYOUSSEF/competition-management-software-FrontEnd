import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompetitionService } from '../service/service.service';

@Component({
  selector: 'app-podium-component',
  templateUrl: './podium-component.component.html',
  styleUrls: ['./podium-component.component.scss']
})
export class PodiumComponentComponent implements OnInit {

  breadCrumbItems: Array<{}> = [{ label: 'Podium' }, { label: 'show winer', active: true }];
  competitionCode: string = '';
  ranks: any[] = [];
  constructor(private service: CompetitionService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.competitionCode = this.router.snapshot.paramMap.get('code');
    this.service.getRanks(this.competitionCode).subscribe({
      next: (res) => {
          this.ranks = res;
      }
    })
  }

}
