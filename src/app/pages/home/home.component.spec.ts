import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HomeComponent } from "./home.component"
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Pipe, PipeTransform } from "@angular/core";
import { BookService } from "src/app/services/book.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { Book } from "src/app/models/book.model";
import { of } from "rxjs/internal/observable/of";


//Depurar en chrome con karma abierto ir a inspector soruces context y ya buscar el test al que poner el breakpoint

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

const bookServiceMock = {
    getBooks: () => of(listBook),
}

@Pipe({name: 'reduceText'})
class ReduceTextPipeMock implements PipeTransform{
    transform(value: any, ...args: any[]) {
        return '';
    }
}

//fdescribe ejecuta solo este describe y xdescribe excluye de ejecutar este describe
describe('Home component', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports:[HttpClientTestingModule],
            declarations:[HomeComponent, ReduceTextPipeMock],
            providers:[
                //BookService
                {
                    provide: BookService,
                    useValue: bookServiceMock
                }
            ],
            schemas:[CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
        }).compileComponents()
    })
    
    beforeEach(() => {
        console.log('empezo 1 test')
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    
    beforeAll(() => {
        console.log('empezo')

    });

    afterEach(() => {
        console.log('termino 1 test')

    });

    afterAll(() => {
        console.log('termino')
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it('getBook get books', () => {
        //const bookService = fixture.debugElement.injector.get(BookService);
        //const spy1 = spyOn(bookService, 'getBooks').and.returnValue(of(listBook));
        component.getBooks();
        //expect(spy1).toHaveBeenCalled();
        expect(component.listBook.length).toBe(3);
    });
})