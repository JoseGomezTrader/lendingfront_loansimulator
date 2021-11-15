//Components
Vue.component('loan_response', {
    template: `#modal-response`,
});

//Controller
const app = new Vue({
    el : "#app",
    data : {
        dataForm: {
            taxid: '',
            businessname: '',
            requestedamount: '',
        },
        showModal: false,
        loanStatus: false,
        emptyData: [],
        errors: [],
    },
    methods:{
        handleClick (dataForm) {
            if(this.validateData(dataForm)){
                this.getLoanDecision(dataForm.requestedamount);
            }
        },
        validateData (dataForm) { //Add here all validations you need
            this.emptyData = [];
            this.errors = [];
            Object.entries(dataForm).forEach(function(data){
                if(data[1] == ""){
                    let key = data[0];
                    app.emptyData.push(key);
                }
            });

            if (this.emptyData.length === 0) {
                return true;
            }
            else{
                this.emptyData.forEach(empty=>{
                    switch (empty) {
                        case 'taxid':
                            app.errors.push("Tax ID is required.");
                            break;
                        case 'businessname':
                            app.errors.push("Business Name is required.");
                            break;
                        case 'requestedamount':
                            app.errors.push("Requested Amount is required.");
                            break;
                        default:
                            break;
                    }
                });
            }
            return false;
        },
        getLoanDecision (amount) {
            amount = parseInt(amount);
            let params = {requestedAmount: amount};
            axios.post('http://127.0.0.1:5000/loan_decision', params)
            .then(function (response) {
                app.loanStatus = response.data.status;
                app.showResponse();
            })
            .catch(function (error) {
                console.log(error);
                app.errors.push("Error: Failed communication with the server.");
            })
        },
        showResponse () {
            this.showModal = true;
        }
    }
});
