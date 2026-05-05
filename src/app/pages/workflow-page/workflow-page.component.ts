import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CdkDragDrop, CdkDropList, CdkDrag, CdkDragPreview, CdkDragPlaceholder, CdkDropListGroup, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Customer, WorkflowService } from './workflow.service';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { Router } from '@angular/router';
import { NewCustomerPageComponent } from '../new-customer-page/new-customer-page.component';
import { KLoadingComponent } from '../../k-loading/k-loading.component';
interface WorkflowColumn {
  id: string;
  name: string;
  color: string;
  headerColor: string;
  cards: Customer[];
}

/** กำหนด column แต่ละขั้นตอน — เก็บแค่ layout ไม่มีข้อมูล customer */
const COLUMN_DEFS: Omit<WorkflowColumn, 'cards'>[] = [
  { id: 'need-analysis', name: 'Need Analysis', color: '#e8f4fd', headerColor: '#414142' },
  { id: 'proposed', name: 'Proposed', color: '#fef9e7', headerColor: '#414142' },
  { id: 'on-going', name: 'On going', color: '#f3e5f5', headerColor: '#414142' },
  { id: 'on-hold-review', name: 'On hold / Review', color: '#e8f5e9', headerColor: '#414142' },
  { id: 'to-be-installed', name: 'To be Installed', color: '#fff3e0', headerColor: '#414142' },
  { id: 'installed', name: 'Installed', color: '#e0f7fa', headerColor: '#414142' },
  { id: 'rejected', name: 'Rejected', color: '#f1f8e9', headerColor: '#414142' },
];

@Component({
  selector: 'app-workflow-page',
  imports: [CommonModule, FormsModule, CdkDropList, CdkDrag, CdkDragPreview, CdkDragPlaceholder, CdkDropListGroup, CdkScrollable, TooltipModule, ButtonModule, DialogModule, NewCustomerPageComponent,KLoadingComponent],
  templateUrl: './workflow-page.component.html',
  styleUrl: './workflow-page.component.scss'
})
export class WorkflowPageComponent implements OnInit {
  constructor(private router: Router) {}

  showNewCustomerDialog = signal(false);

  openNewCustomerDialog(): void {
    this.showNewCustomerDialog.set(true);
  }

  onCustomerSaved(): void {
    this.showNewCustomerDialog.set(false);
    // reload customers หลัง save
    console.log("save.");
    
    this.workflowService.getCustomers().subscribe({
      next: (customers) => {
        this.sourceColumns.set(COLUMN_DEFS.map(def => ({
          ...def,
          cards: customers
            .filter(c => c.statusId === def.id)
            .map(c => ({ ...c, tagsTotal: [...c.tagsCustomer, ...c.tagsSystem] })),
        })));
      },
      error: (err) => console.error('[API] Failed to reload customers after save:', err),
    });
  }

  onCustomerCancelled(): void {
    console.log("cancel.");
    this.showNewCustomerDialog.set(false);
  }
  private workflowService = inject(WorkflowService);

  private sourceColumns = signal<WorkflowColumn[]>(
    COLUMN_DEFS.map(def => ({ ...def, cards: [] }))
  );

  selectedTags = signal<Set<string>>(new Set());

  /** รวม tag ทั้งหมดที่มีในทุก card ไม่ซ้ำกัน เพื่อแสดงใน filter bar */
  allTags = computed<string[]>(() => {
    const tags = new Set<string>();
    this.sourceColumns().forEach(col =>
      col.cards.forEach(card =>
        card.tagsTotal.forEach(tag => tags.add(tag))
      )
    );
    return [...tags].sort();
  });

  /** view ที่กรองแล้ว — ถ้ายังไม่เลือก tag ใด แสดงทั้งหมด, ถ้าเลือกแล้ว แสดงเฉพาะ card ที่มี tag ตรงกัน */
  columns = computed<WorkflowColumn[]>(() => {
    const selected = this.selectedTags();
    if (selected.size === 0) return this.sourceColumns();
    return this.sourceColumns().map(col => ({
      ...col,
      cards: col.cards.filter(card =>
        card.tagsTotal.some(tag => selected.has(tag))
      ),
    }));
  });

  isLoading = signal(true);

  ngOnInit(): void {
    this.workflowService.getCustomers().subscribe({
      next: (customers) => {
        this.sourceColumns.set(COLUMN_DEFS.map(def => ({
          ...def,
          cards: customers
            .filter(c => c.statusId === def.id)
            .map(c => ({ ...c, tagsTotal: [...c.tagsCustomer, ...c.tagsSystem] })),
        })));
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('[API] Failed to load customers:', err);
        this.isLoading.set(false);
      }
    });
  }

  get columnIds(): string[] {
    return this.columns().map(c => c.id);
  }

  get isFiltering(): boolean {
    return this.selectedTags().size > 0;
  }

  isTagSelected(tag: string): boolean {
    return this.selectedTags().has(tag);
  }

  toggleTag(tag: string, checked: boolean): void {
    const next = new Set(this.selectedTags());
    checked ? next.add(tag) : next.delete(tag);
    this.selectedTags.set(next);
  }

  drop(event: CdkDragDrop<Customer[]>, targetColumnId: string): void {
    const cols = this.sourceColumns();
    const targetIndex = cols.findIndex(c => c.id === targetColumnId);
    const updated = cols.map(c => ({ ...c, cards: [...c.cards] }));

    // previousIndex / currentIndex คือ index ใน filtered array (ที่กรองแล้ว)
    // ถ้ากำลัง filter อยู่ ต้องแปลงกลับเป็น index จริงใน sourceColumns ก่อน
    if (event.previousContainer === event.container) { //ถ้า drop ใน column เดิม แต่เปลี่ยนตำแหน่งการ์ด
      if (this.isFiltering) {
        const actualCards = updated[targetIndex].cards;
        const draggedCard = event.previousContainer.data[event.previousIndex];
        const actualPrevIdx = actualCards.findIndex(c => c.id === draggedCard.id);

        actualCards.splice(actualPrevIdx, 1);
        const selected = this.selectedTags();
        const filteredAfter = actualCards.filter(c =>
          c.tagsTotal.some(t => selected.has(t))
        );
        const insertIdx =
          filteredAfter.length === 0 || event.currentIndex >= filteredAfter.length
            ? filteredAfter.length === 0
              ? actualCards.length
              : actualCards.findIndex(c => c.id === filteredAfter[filteredAfter.length - 1].id) + 1
            : actualCards.findIndex(c => c.id === filteredAfter[event.currentIndex].id);
        actualCards.splice(insertIdx, 0, draggedCard);
      } else {
        moveItemInArray(updated[targetIndex].cards, event.previousIndex, event.currentIndex);
      }
      this.sourceColumns.set(updated);
      return;
    }

    const sourceId = event.previousContainer.id;
    const sourceIndex = cols.findIndex(c => c.id === sourceId);
    if (sourceIndex === -1) return;

    // previousContainer.data คือ filtered array — index ถูกต้องสำหรับ filtered view
    const draggedCard = event.previousContainer.data[event.previousIndex];

    if (this.isFiltering) {
      const actualPrevIdx = updated[sourceIndex].cards.findIndex(c => c.id === draggedCard.id);
      updated[sourceIndex].cards.splice(actualPrevIdx, 1);

      // container.data คือ filtered cards ของ column ปลายทาง (snapshot ก่อน drop)
      const filteredTarget: Customer[] = event.container.data;
      let actualCurrIdx: number;
      if (filteredTarget.length === 0) {
        actualCurrIdx = updated[targetIndex].cards.length;
      } else if (event.currentIndex >= filteredTarget.length) {
        actualCurrIdx = updated[targetIndex].cards.findIndex(
          c => c.id === filteredTarget[filteredTarget.length - 1].id
        ) + 1;
      } else {
        actualCurrIdx = updated[targetIndex].cards.findIndex(
          c => c.id === filteredTarget[event.currentIndex].id
        );
      }
      updated[targetIndex].cards.splice(actualCurrIdx, 0, draggedCard);
    } else {
      transferArrayItem(
        updated[sourceIndex].cards,
        updated[targetIndex].cards,
        event.previousIndex,
        event.currentIndex
      );
    }

    this.sourceColumns.set(updated);

    this.workflowService.updateCustomerStatus({
      id: draggedCard.id,
      statusId: targetColumnId,
    }).subscribe({
      error: (err) => console.error('[API] Failed to update customer status:', err),
    });
  }

  readonly VISIBLE_TAG_LIMIT = 2;

  visibleTags(tags: string[]): string[] {
    return tags?.slice(0, this.VISIBLE_TAG_LIMIT) ?? [];
  }

  hiddenTagCount(tags: string[]): number {
    return Math.max(0, (tags?.length ?? 0) - this.VISIBLE_TAG_LIMIT);
  }

  formatPrice(price: number): string {
    return '฿' + price.toLocaleString('th-TH');
  }

  avatarLetter(customer: Customer): string {
    return customer.name.toUpperCase();
  }

  cardCount(col: WorkflowColumn): number {
    return col.cards.length;
  }

  openDetail(card: Customer) {
    console.log(card);
    this.router.navigate(['/detail', card.id]); // เปลี่ยนเป็น id จริงของ customer ที่ต้องการแสดงรายละเอียด
  }
}
