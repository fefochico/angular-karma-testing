import { ReduceTextPipe } from "./reduce-text.pipe"

describe('ReducePipeText', () =>{
    let pipe: ReduceTextPipe;

    beforeEach(() => {
        pipe =  new ReduceTextPipe();
    })

    it('should create', ()=> {
        expect(pipe).toBeTruthy();
    })

    it('use transform', ()=> {
        const texto = 'Hello this is a test to check the pipe';
        const newText = pipe.transform(texto, 1);
        expect(newText.length).toBe(1);
    })
})