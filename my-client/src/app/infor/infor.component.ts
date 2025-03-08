import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-infor',
  templateUrl: './infor.component.html',
  styleUrls: ['./infor.component.css']
})
export class InforComponent implements OnInit {
  id: string = 'brandstory';
  selectedListItem: HTMLElement | null = null;

  ngOnInit() {
    this.id = 'brandstory';
  }

  tabChange(ids: string, event?: Event) {
    this.id = ids;
    if (event) {
      this.addSelectedClass(event.target as HTMLElement);
    }
  }

  addSelectedClass(selectedListItem: HTMLElement) {
    if (this.selectedListItem) {
      this.selectedListItem.classList.remove('selected');
    }  
    selectedListItem.classList.add('selected');
    this.selectedListItem = selectedListItem;
  }
}