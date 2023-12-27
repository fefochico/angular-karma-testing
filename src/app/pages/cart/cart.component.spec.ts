import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CartComponent } from "./cart.component"
import { BookService } from "src/app/services/book.service";
import {HttpClientTestingModule} from "@angular/common/http/testing"
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement, NO_ERRORS_SCHEMA } from "@angular/core";
import { Book } from "../../models/book.model";
import { of } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { By } from "@angular/platform-browser";

const listBook: Book[] = [
    {
        name: '',
        author: '',
        isbn: '',
        price: 15,
        amount: 2
    },
    {
        name: '',
        author: '',
        isbn: '',
        price: 20,
        amount: 1
    },
    {
        name: '',
        author: '',
        isbn: '',
        price: 8,
        amount: 7
    }
];

const MatDialogMock = {
    open(){
        return {
            afterClosed: () => {return of(true)}
        };
    }
};
describe('Cart component', () => {
    let component: CartComponent;
    let fixture: ComponentFixture<CartComponent>;
    let service: BookService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            declarations:[
                CartComponent
            ],
            providers:[
                BookService,
                {
                    provide: MatDialog, useValue: MatDialogMock
                }
            ],
            schemas:[
                CUSTOM_ELEMENTS_SCHEMA,
                NO_ERRORS_SCHEMA
            ]
        }).compileComponents();
    });

    beforeEach(()=>{
        fixture = TestBed.createComponent(CartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges(); // Para que entre en OnInit el componente CartComponent
        service = fixture.debugElement.injector.get(BookService);
        spyOn(service, 'getBooksFromCart').and.callFake(()=> listBook); // porque en el onInit se llama a un metodo del servicio.
    });

    it('should create', ()=>{
        expect(component).toBeTruthy();
    });

    it('getTotalPrice returns an amount', () => {
        const totalPrice = component.getTotalPrice(listBook);
        expect(totalPrice).toBeGreaterThan(0);
        expect(totalPrice).not.toBe(0);
    });

    it('onInputNumberChange increment correctly', ()=>{
        const action = 'plus';
        const book =     {
            name: '',
            author: '',
            isbn: '',
            price: 15,
            amount: 2
        };
        
        //const service = (component as any)._bookService; Local malas practicas
        //const service2 = component["_bookService"]; Local malas practicas

        //const service = fixture.debugElement.injector.get(BookService); Local buena practica

        const spy1 = spyOn(service, 'updateAmountBook').and.callFake(() => { //espiamos y fakeamos
            return []
        });

        const spy2 = spyOn(component, 'getTotalPrice').and.callFake(() => { //espiamos y fakeamos
            return 0
        });
        expect(book.amount).toBe(2);

        component.onInputNumberChange(action, book);

        expect(book.amount).toBe(3);

        expect(spy1).toHaveBeenCalled();
        expect(spy2).toHaveBeenCalled();
    });

    it('onInputNumberChange decrement correctly', ()=>{
        const action = 'minus';
        const book:Book =     {
            name: '',
            author: '',
            isbn: '',
            price: 15,
            amount: 3
        };

        const spy1 = spyOn(service, 'updateAmountBook').and.callFake(() => { //espiamos y fakeamos
            return []
        });

        const spy2 = spyOn(component, 'getTotalPrice').and.callFake(() => { //espiamos y fakeamos
            return 0
        });
        expect(book.amount).toBe(3);

        component.onInputNumberChange(action, book);

        expect(book.amount).toBe(2);

        expect(spy1).toHaveBeenCalled();
        expect(spy2).toHaveBeenCalled();
    });

    it('onClearBooks works correctly', () => {
        const spy1 = spyOn((component as any), '_clearListCartBook').and.callThrough();//espiamos y ejecutamos
        const spy2 = spyOn(service, 'removeBooksFromCart').and.callFake(() => {
            return null
        });
        component.listCartBook = listBook;
        component.onClearBooks();
        expect(component.listCartBook.length).toBe(0);
        expect(spy1).toHaveBeenCalled();
        expect(spy2).toHaveBeenCalled();

    })

    it('_clearListCartBook works correctly', () => { //No debe testearse como test unitario una funcion privada porque se debe llamar desde una funcion publica
        const spy1 = spyOn(service, 'removeBooksFromCart').and.callFake(() => {
            return null
        });
        component.listCartBook = listBook;
        component['_clearListCartBook']();
        expect(component.listCartBook.length).toBe(0);
        expect(spy1).toHaveBeenCalled();
    })

    //Ejemplos de test de integracion
    it('The title "The cart is empty" is not displayed when there is a list', () => {
        component.listCartBook = listBook;
        fixture.detectChanges();
        const debugElement: DebugElement = fixture.debugElement.query(By.css('#titleCartEmpty'));
        expect(debugElement).toBeFalsy();
    });

    it('The title "The cart is empty" is displayed correctly when the list is empty', () => {
        component.listCartBook = [];
        fixture.detectChanges();
        const debugElement: DebugElement = fixture.debugElement.query(By.css('#titleCartEmpty'));
        expect(debugElement).toBeTruthy();
        if(debugElement){
            const element: HTMLElement = debugElement.nativeElement;
            expect(element.innerHTML).toContain('The cart is empty');
        }
    });
})