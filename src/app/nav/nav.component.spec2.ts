import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NavComponent } from "./nav.component"
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { Router } from "@angular/router";

const routerMock= {
    navigate(){}
}
describe("Nav component", ()=>{
    let component: NavComponent;
    let fixture: ComponentFixture<NavComponent>

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports:[],
            declarations:[NavComponent],
            providers:[{
                provide: Router, useValue: routerMock
            }],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(NavComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () =>{
        expect(component).toBeTruthy();
    });

    it('should navigate', () =>{
        const router= TestBed.inject(Router); //CASO que se puede usar para redux

        const spy = spyOn(router, 'navigate');

        component.navTo('home');
        expect(spy).toHaveBeenCalled();
    });

})