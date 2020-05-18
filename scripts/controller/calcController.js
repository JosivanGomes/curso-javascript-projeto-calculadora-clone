class CalcController{
    constructor(){
        
        this._locale = 'pt-br'

        this._operation = []
        
        this._displayCalcEl = document.querySelector("#display")
        this._dateEl = document.querySelector("#data")
        this._hourEl = document.querySelector("#hora")
        
        this._currentDate
        this.initialize()
        this.initButtonsEvents()
    }

    initialize(){
        this.setDisplayDateTime()
        setInterval(() => {
            this.setDisplayDateTime()            
        }, 1000)        
    }

    addEventListenerAll(element, events, fn){
        events.split(' ').forEach(event => {
            element.addEventListener(event, fn, false)
        })
    }

    clearAll(){
        this._operation = []
    }

    clearEntry(){
        this._operation.pop()
    }

    setLastOperation(value){
        return this._operation[this._operation.length-1] = value
    }

    getLastOperation(){

        return this._operation[this._operation.length-1]
    }

    isOperator(value){
        return (['+', '-', '*','/','%'].indexOf(value) > -1)
    }

    pushOperation(value){
        if (this._operation.length > 3){
            this.calc()
        } 
    }

    calc(){
        let last = this._operation.pop()

        let result = this._operation.join('')

        this._operation = [result, last]
    }

    setNumbertoDisplay(){
    
    }

    addOperation(value){
        if (isNaN(this.getLastOperation())){
            if(this.isOperator(value)){
                if (this._operation.length > 0){
                    this.setLastOperation(value)
                }
                            
            }else if (isNaN(value)){
                //outra coisa
                
            }else{
                this.pushOperation(value)    
            }

        }else{
            if (this.isOperator(value)){
                this.pushOperation(value)
            }else{
                let newValue = this.getLastOperation().toString() + value.toString()
                this.setLastOperation(parseInt(newValue))

                this.setNumbertoDisplay()
                }
            }
            
        }
        console.log(this._operation)
        
    }

    setErro(){
        this.displayCalc = 'Error'
    }

    execBtn(value){
        switch(value){
            case 'ac':
                this.clearAll()
                break
            
            case 'ce':
                this.clearEntry()
                break
            
            case 'soma':
                this.addOperation('+')
                break

            case 'subtracao':
                this.addOperation('-')
                break
            
            case 'multiplicacao':
                this.addOperation('*')
                break
                    
            case 'divisao':
                this.addOperation('/')
                break

            case 'porcento':
                this.addOperation('%')
                break

            case 'igual':
                this.setError()
                break

            case 'ponto':
                this.addOperation('.')
                break
            
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':

                this.addOperation(parseInt(value))
                break

        }
    }

    initButtonsEvents(){
        let buttons = document.querySelectorAll("#buttons > g, #parts > g")
        buttons.forEach((btn, index) => {
            this.addEventListenerAll(btn,'click drag', e =>{
                let textBtn = btn.className.baseVal.replace('btn-','')
                this.execBtn(textBtn)
            })

            this.addEventListenerAll(btn, 'mouseover mouseup mousedown', e =>{
                btn.style.cursor = 'pointer'
            })
        })
        
    }

    setDisplayDateTime(){
        this.displayDate = this.currentDate.toLocaleDateString(this._locale,{
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        })
        this.displayHour = this.currentDate.toLocaleTimeString(this._locale)
    }

    get displayDate(){
        return this._dateEl.innerHTML
    }

    set displayDate(value){
        this._dateEl.innerHTML = value
    }

    get displayHour(){
        return this._hourEl.innerHTML
    }

    set displayHour(value){
        return this._hourEl.innerHTML = value
    }



    get displayCalc(){
        return this._displayCalcEl.innerHTML
    }

    set displayCalc(value){
        this._displayCalcEl.innerHTML = value
    }

    get currentDate(){
        return new Date()
    }

    set currentDate(value){
        this._currentDate = value
    }
}