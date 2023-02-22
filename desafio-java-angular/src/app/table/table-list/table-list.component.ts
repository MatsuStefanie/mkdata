
import { Router, ActivatedRoute } from '@angular/router';
import { DialogComponent } from './../../dialog/dialog.component';
import { TableService } from './../table.service';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Custumer } from 'src/app/register/custumer';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class TableListComponent implements OnInit{
  @Input()
  dataSource!: Array<Custumer>;
  columnsToDisplay = ['id', 'nome', 'tipoFederativo'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'situacao', 'expand'];
  expandedElement?: Custumer | null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tableService: TableService,
    public dialog: MatDialog
  ) {}

  @Output()
  deleteItem = new EventEmitter<boolean>();

  ngOnInit() {

  }

  openConfirm(id: number) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        message: 'Tem certeza disso?',
        title: 'Confirmação',
        true: 'Sim',
        false: 'Não',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      result ? this.delete(id) : this.openCancel();
    });
  }

  openSuccess() {
    this.dialog.open(DialogComponent, {
      data: {
        message: 'Cliente deletado com sucesso',
        title: 'Sucesso',
        true: 'Ok',
      },
    });
  }

  openCancel() {
    this.dialog.open(DialogComponent, {
      data: {
        message: 'Operação cancelada',
        title: 'Interrompido',
        true: 'Ok',
      },
    });
  }

  delete(id: number) {
    this.tableService.deletarUser(id).subscribe({
      next: () => {
        this.openSuccess();
        this.deleteItem.emit(true);
      },
      error: (error) => {
        //openDialog error
      },
    });
  }

  editClient(id: number) {
    this.router.navigate(['/edit',  id ]);
  }
}
