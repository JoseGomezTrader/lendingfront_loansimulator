//Components
Vue.component('loan_simulator', {
    props: ['attributes'],
    template: ``,

});

//Controller
const app = new Vue({
    el : "#app",
    data : {
        dataForm: {
            taxid: '',
            businessname: '',
            requestedamount: '',
        }
    },
    methods:{
        handleClick (dataForm) {
            console.log("Data: ", this.dataForm);
            this.validateData(dataForm);
            this.getLoanDecision(dataForm.requestedamount);
        },
        validateData (data) {
            Object.entries(data).forEach(function(value, key){
                if (!value[1]) {
                    return false;
                }
            });
        },
        getLoanDecision (amount) {
            amount = parseInt(amount);
            let params = {requestedAmount: amount};
            axios.post('http://127.0.0.1:5000/loan_decision', params)
            .then(function (response) {
                app.showResponse(response);
            })
            .catch(function (error) {
                console.log(error);
            })
        },
        showResponse (res) {
            console.log(res.data);
        }
    }
});
